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
  dbUpdateDeliveryService,
  dbUpdateSettings,
} from '@/helpers/firebaseHelpers';
import { LoaderCircleIcon } from 'lucide-react';
import { checkSlugExistsOnOtherList } from '@/helpers/appHelpers';
import { DeliveryServiceType } from '@/typings';
import { toast } from 'sonner';

function UpdateDeliveryServiceForm({
  deliveryService,
  setClose,
}: {
  deliveryService: DeliveryServiceType;
  setClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [updateDeliveryService, currentSettings, setCurrentSettings] =
    useAppStore((state) => [
      state.updateDeliveryService,
      state.currentSettings,
      state.setCurrentSettings,
    ]);
  const settingsDeliveryServiceData = currentSettings?.delivery_services.find(
    (item: DeliveryServiceType) => item.id === deliveryService.id
  );
  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(50),
    description: z.string().optional().or(z.literal('')),
    slug: z
      .string()
      .min(2, {
        message: 'Slug must be at least 2 characters.',
      })
      .max(50)
      .refine(
        (val) =>
          checkSlugExistsOnOtherList({
            slug: val,
            id: deliveryService.id,
            list: currentSettings?.deliveryServices,
          }) == false,
        {
          message: 'Slug already exists',
        }
      ),
    tags: z
      .string()
      .min(2, {
        message: 'tags must be at least 2 characters.',
      })
      .max(50),
    facebookUsername: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .max(50),
    messengerUsername: z
      .string()
      .min(2, {
        message: 'Messenger Username must be at least 2 characters.',
      })
      .max(100),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: deliveryService.name,
      description: deliveryService.description || '',
      slug: deliveryService.slug,
      tags: deliveryService.tags,
      facebookUsername: deliveryService.facebookUsername,
      messengerUsername: deliveryService.messengerUsername,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const dateTime = moment(new Date()).format('LLL');
    const newData = {
      ...deliveryService,
      ...settingsDeliveryServiceData,
      name: values.name,
      slug: values.slug,
      description: values.description,
      tags: values.tags,
      facebookUsername: values.facebookUsername,
      messengerUsername: values.messengerUsername,
      updatedAt: dateTime,
    };
    const res = await dbUpdateDeliveryService(newData);
    if (res.status === 'success') {
      updateDeliveryService(newData);
      const updatedDeliveryServices = currentSettings?.delivery_services.map(
        (item: DeliveryServiceType) => (item.id === newData.id ? newData : item)
      );
      const updatedSettings = {
        ...currentSettings,
        delivery_services: updatedDeliveryServices,
        isPublished: true,
      };
      const resUpdate = await dbUpdateSettings(updatedSettings);
      if (resUpdate.status === 'success') {
        setCurrentSettings(updatedSettings);
        toast.success('Delivery service updated successfully', {
          description: moment(new Date()).format('LLL'),
        });
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
    const sameSlugTotal = checkSlugExistsOnOtherList({
      slug: generatedSlug,
      id: deliveryService.id,
      list: currentSettings?.delivery_services,
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
        <FormField
          control={form.control}
          name="facebookUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook Username</FormLabel>
              <FormControl>
                <Input placeholder="Facebook username here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="messengerUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Messenger Username</FormLabel>
              <FormControl>
                <Input placeholder="Messenger username here" {...field} />
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
              variant={'destructive'}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default UpdateDeliveryServiceForm;
