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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoaderCircleIcon } from 'lucide-react';
import { kRoleTypes } from '@/constants';
import moment from 'moment';
import Link from 'next/link';
import { dbAddStoreUser } from '@/helpers/firebaseHelpers';
import { v4 as uuidv4 } from 'uuid';

const userFormSchema = z.object({
  roleType: z.string({
    required_error: 'Please select a store role.',
  }),
  email: z
    .string()
    .min(2, {
      message: 'Email Address must be at least 2 characters.',
    })
    .max(50)
    .email(),
});
function CreateStoreUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [setIsCreatingModalOpen, currentSettings, addUser] = useAppStore(
    useShallow((state) => [
      state.setIsCreatingModalOpen,
      state.currentSettings,
      state.addUser,
    ])
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      roleType: kRoleTypes[0],
      email: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const id = uuidv4();
    const newData = {
      id,
      ...values,
      createdAt: moment(new Date()).format('LLL'),
    };

    const res = await dbAddStoreUser(newData);
    if (res.status === 'success') {
      addUser(newData);
    }
    setIsCreatingModalOpen(false);
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="roleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {kRoleTypes?.map((item: string, idx: number) => {
                      return (
                        <SelectItem
                          key={`select-role-item-${idx}`}
                          value={item}
                          className="capitalize"
                        >
                          {item}
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email address here"
                  {...field}
                />
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
              variant={'destructive'}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CreateStoreUserForm;
