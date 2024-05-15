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
import {
  dbAddDeliveryService,
  dbUpdateSettings,
} from '@/helpers/firebaseHelpers';
import { LoaderCircleIcon } from 'lucide-react';
import { checkSlugExists } from '@/helpers/appHelpers';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

function CreateDeliveryServiceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [
    setIsCreatingModalOpen,
    addDeliveryService,
    currentSettings,
    setCurrentSettings,
  ] = useAppStore((state) => [
    state.setIsCreatingModalOpen,
    state.addDeliveryService,
    state.currentSettings,
    state.setCurrentSettings,
  ]);
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
          checkSlugExists({
            slug: val,
            list: currentSettings?.delivery_services,
          }) == false,
        {
          message: 'Slug already exists',
        }
      ),
    tags: z
      .string()
      .min(2, {
        message: 'Tags must be at least 2 characters.',
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
      name: '',
      description: '',
      slug: '',
      tags: '',
      facebookUsername: '',
      messengerUsername: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const dateTime = moment(new Date()).format('LLL');
    const id = uuidv4();
    const newData = {
      id,
      ...values,
      createdAt: dateTime,
    };
    const res = await dbAddDeliveryService({ data: newData });
    if (res.status === 'success') {
      addDeliveryService(newData);
      const updatedDeliveryServices = currentSettings?.delivery_services
        ? [...currentSettings?.delivery_services, newData]
        : [newData];
      const updatedSettings = {
        ...currentSettings,
        delivery_services: updatedDeliveryServices,
      };
      const resUpdate = await dbUpdateSettings(updatedSettings);
      if (resUpdate.status === 'success') {
        setCurrentSettings(updatedSettings);
        toast.success('Delivery service created successfully', {
          description: moment(new Date()).format('LLL'),
        });
      } else {
        console.log(resUpdate.error);
        return;
      }
    } else {
      console.log('there was an error adding delivery_service to database');
      return;
    }
    setIsCreatingModalOpen(false);
    setIsLoading(false);
  }
  function onGenerateSlug(e: any) {
    e.preventDefault();
    const generatedSlug = _.kebabCase(form.getValues('name'));
    const sameSlugTotal = checkSlugExists({
      slug: generatedSlug,
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
              <FormLabel>Messenger URL</FormLabel>
              <FormControl>
                <Input placeholder="Messenger Username here" {...field} />
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
                setIsCreatingModalOpen(false);
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

export default CreateDeliveryServiceForm;
