'use client';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import _ from 'lodash';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import moment from 'moment';
import { dbUpdateStoreSettings } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
const userFormSchema = z.object({
  mobileNumber: z
    .string()
    .length(10, { message: 'Mobile number must have 10 digits after +63' }),
  facebookUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
});
function StoreSettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStoreData, setCurrentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData, state.setCurrentStoreData])
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      mobileNumber: currentStoreData.settings.mobileNumber || '',
      facebookUsername: currentStoreData.settings.facebookUsername || '',
      instagramUsername: currentStoreData.settings.instagramUsername || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newSettings = {
      ...currentStoreData.settings,
      mobileNumber: values.mobileNumber,
      facebookUsername: values.facebookUsername,
      instagramUsername: values.instagramUsername,
    };
    const updatedStoreData = {
      ...currentStoreData,
      settings: newSettings,
      updatedAt: moment(new Date()).format('LLL'),
    };
    const res = await dbUpdateStoreSettings({
      id: currentStoreData.id,
      data: newSettings,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }

    setCurrentStoreData(updatedStoreData);
    toast.success('Store information updated successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>(+63) Mobile Number </FormLabel>
              <FormControl>
                <Input
                  maxLength={10}
                  type="number"
                  placeholder="Enter mobile number here"
                  {...field}
                />
              </FormControl>
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
                <Input placeholder="Enter facebook username here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter instagram username here" {...field} />
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
            <Button type="submit">Update</Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default StoreSettingsForm;
