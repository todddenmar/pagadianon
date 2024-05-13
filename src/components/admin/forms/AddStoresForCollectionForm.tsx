'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useAppStore } from '@/lib/store';
import { CollectionType, StoreType } from '@/typings';
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { dbUpdateSettings } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';

function AddStoresForCollectionForm({
  collection,
  setClose,
}: {
  collection: CollectionType;
  setClose: () => void;
}) {
  const [currentSettings, setCurrentSettings] = useAppStore((state) => [
    state.currentSettings,
    state.setCurrentSettings,
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    stores: z
      .string()
      .array()
      .min(1, {
        message: 'Must select at least 1 store',
      })
      .max(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stores: collection.stores ? collection.stores : [],
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const updatedCollection = { ...collection, stores: values.stores };
    const updatedCollections = currentSettings.collections.map(
      (item: CollectionType) =>
        item.id === collection.id ? updatedCollection : item
    );
    const updatedSettings = {
      ...currentSettings,
      collections: updatedCollections,
    };
    const resUpdate = await dbUpdateSettings(updatedSettings);
    if (resUpdate.status === 'success') {
      setCurrentSettings(updatedSettings);
    } else {
      console.log(resUpdate.error);
      return;
    }
    toast.success('Stores added to collection successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsLoading(false);
    setClose();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="stores"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-2"
                  type="multiple"
                >
                  {currentSettings?.stores?.map(
                    (item: StoreType, idx: number) => {
                      return (
                        <ToggleGroupItem
                          value={item.id}
                          variant={'outline'}
                          key={`store-item-${idx}`}
                          className="flex justify-between items-center gap-5"
                        >
                          <span>{item.name}</span>
                          <span>
                            {field.value.includes(item.id) ? (
                              <CheckIcon className="h-5" />
                            ) : null}
                          </span>
                        </ToggleGroupItem>
                      );
                    }
                  )}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
            <span>
              <LoaderCircleIcon className="animate-spin" />
            </span>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 gap-5 pt-5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setClose();
              }}
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              className="bg-highlight hover:bg-highlight_hover"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default AddStoresForCollectionForm;
