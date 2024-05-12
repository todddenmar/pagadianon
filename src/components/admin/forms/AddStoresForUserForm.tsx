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
import { UserType } from '@/typings';
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LoaderCircleIcon } from 'lucide-react';
import { dbUpdateUserStores } from '@/helpers/firebaseHelpers';

function AddStoresForUserForm({
  user,
  setClose,
}: {
  user: UserType;
  setClose: () => void;
}) {
  const [currentStores, updateUser] = useAppStore((state) => [
    state.currentStores,
    state.updateUser,
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
      stores: user.stores ? user.stores : [],
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await dbUpdateUserStores({
      id: user.id,
      stores: values.stores,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    updateUser({ ...user, stores: values.stores });
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
                  className="inline-flex flex-wrap gap-2"
                  type="multiple"
                >
                  {currentStores?.map((item, idx) => {
                    return (
                      <ToggleGroupItem
                        value={item.id}
                        variant={'outline'}
                        key={`store-item-${idx}`}
                      >
                        {item.name}
                      </ToggleGroupItem>
                    );
                  })}
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

export default AddStoresForUserForm;
