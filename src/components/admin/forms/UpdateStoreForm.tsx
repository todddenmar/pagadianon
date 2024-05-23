'use client';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import _ from 'lodash';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dbUpdateSettings, dbUpdateStore } from '@/helpers/firebaseHelpers';
import { kSaasTypes } from '@/constants';
import { LoaderCircleIcon } from 'lucide-react';
import { checkSlugExistsOnOtherStore } from '@/helpers/appHelpers';
import { StoreType } from '@/typings';

function UpdateStoreForm({
  store,
  setClose,
}: {
  store: StoreType;
  setClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [updateStore, currentSettings, setCurrentSettings] = useAppStore(
    (state) => [
      state.updateStore,
      state.currentSettings,
      state.setCurrentSettings,
    ]
  );
  const settingsStoreData = currentSettings?.stores?.find(
    (item: StoreType) => item.id === store.id
  );
  const formSchema = z.object({
    saasTypeSlug: z.string({
      required_error: 'Please select a Saas Type.',
    }),
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(50),
    description: z.string().optional().or(z.literal('')),
    branchName: z
      .string()
      .min(2, {
        message: 'Branch name must be at least 2 characters.',
      })
      .max(50),
    address: z
      .string()
      .min(2, {
        message: 'Branch address must be at least 2 characters.',
      })
      .max(100),
    slug: z
      .string()
      .min(2, {
        message: 'Slug must be at least 2 characters.',
      })
      .max(50)
      .refine(
        (val) =>
          checkSlugExistsOnOtherStore({
            slug: val,
            id: store.id,
            list: currentSettings?.stores,
          }) == false,
        {
          message: 'Slug already exists',
        }
      ),
    tags: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(50),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store.name,
      description: store.description || '',
      branchName: store.branchName || '',
      address: store.address || '',
      slug: store.slug,
      saasTypeSlug: store.saasTypeSlug,
      tags: store.tags,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const dateTime = moment(new Date()).format('LLL');
    const newData = {
      ...store,
      ...settingsStoreData,
      name: values.name,
      slug: values.slug,
      description: values.description,
      branchName: values.branchName,
      address: values.address,
      saasTypeSlug: values.saasTypeSlug,
      tags: values.tags,
      updatedAt: dateTime,
    };
    const res = await dbUpdateStore(newData);
    if (res.status === 'success') {
      updateStore(newData);
      const updatedStores = currentSettings?.stores?.map((item: StoreType) =>
        item.id === newData.id ? newData : item
      );
      const updatedSettings = {
        ...currentSettings,
        stores: updatedStores,
        isPublished: true,
      };
      const resUpdate = await dbUpdateSettings(updatedSettings);
      if (resUpdate.status === 'success') {
        setCurrentSettings(updatedSettings);
      } else {
        console.log(resUpdate.error);
        return;
      }
    } else {
      console.log(res.error);
      return;
    }
    setIsLoading(false);
    setClose();
  }
  function onGenerateSlug(e: any) {
    e.preventDefault();
    const generatedSlug = _.kebabCase(form.getValues('name'));
    const sameSlugTotal = checkSlugExistsOnOtherStore({
      slug: generatedSlug,
      id: store.id,
      list: currentSettings?.stores,
    });
    if (sameSlugTotal) {
      form.setValue('slug', `${generatedSlug}-${sameSlugTotal + 1}`);
      return;
    }
    form.setValue('slug', generatedSlug);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="saasTypeSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SaaS Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="SaaS Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {kSaasTypes.map((item, idx) => {
                      return (
                        <SelectItem
                          key={`select-saas-item-${idx}`}
                          value={item.slug}
                        >
                          {item.title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter branch name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex space-x-3 items-end">
                  <Input placeholder="slug" {...field} />
                  <Button onClick={(e) => onGenerateSlug(e)}>Generate</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags here" {...field} />
              </FormControl>
              <FormDescription>Split tags by comma</FormDescription>
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

export default UpdateStoreForm;
