import { DeliveryServiceType } from '@/typings';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { kDeliveryServiceRoleTypes } from '@/constants';
import { LoaderCircleIcon } from 'lucide-react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

function AddDeliveryServiceUserForm({
  deliveryService,
  setClose,
}: {
  deliveryService: DeliveryServiceType;
  setClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSettings, setCurrentSettings] = useAppStore((state) => [
    state.currentSettings,
    state.setCurrentSettings,
  ]);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50).email(),
    roleType: z.string({
      required_error: 'Please select a Role Type.',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      roleType: kDeliveryServiceRoleTypes[0],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const dateTime = moment(new Date()).format('LLL');
    const id = uuidv4();
    const newData = {
      id,
      ...values,
      createdAt: dateTime,
    };
    const updatedUsers = deliveryService.users
      ? [...deliveryService.users, newData]
      : [newData];
    const updatedDeliveryService = { ...deliveryService, users: updatedUsers };
    const updatedDeliveryServices = currentSettings?.delivery_services.map(
      (item: DeliveryServiceType) =>
        item.id === deliveryService.id ? updatedDeliveryService : item
    );
    setCurrentSettings({
      ...currentSettings,
      delivery_services: updatedDeliveryServices,
      isPublished: false,
    });
    toast.success('Added a user to delivery service successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setClose();
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
                <Input placeholder="name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="SaaS Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {kDeliveryServiceRoleTypes.map((item, idx) => {
                      return (
                        <SelectItem
                          className="capitalize"
                          key={`delivery-role-item-${idx}`}
                          value={item}
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
              Add User
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default AddDeliveryServiceUserForm;
