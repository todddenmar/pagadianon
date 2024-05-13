import { DeliveryServiceType } from '@/typings';
import React, { useEffect, useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeliveryServiceUsersTable from '../tables/DeliveryServiceUsersTable';

function ManageDeliveryServicesUsersForm({
  deliveryService,
  setClose,
}: {
  deliveryService: DeliveryServiceType;
  setClose: () => void;
}) {
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [users, setUsers] = useState(deliveryService?.users);
  const [tabValue, setTabValue] = useState('form');
  const [currentSettings, setCurrentSettings] = useAppStore((state) => [
    state.currentSettings,
    state.setCurrentSettings,
  ]);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50).email(),
    mobileNumber: z
      .string()
      .length(10, { message: 'Mobile number must have 10 digits after +63' }),
    roleType: z.string({
      required_error: 'Please select a Role Type.',
    }),
  });

  useEffect(() => {
    if (userToEdit) {
      form.setValue('name', userToEdit.name);
      form.setValue('email', userToEdit.email);
      form.setValue('mobileNumber', userToEdit.mobileNumber);
      form.setValue('roleType', userToEdit.roleType);
    }
  }, [userToEdit]);

  const onReset = () => {
    form.setValue('name', '');
    form.setValue('email', '');
    form.setValue('mobileNumber', '');
    form.setValue('roleType', kDeliveryServiceRoleTypes[0]);
    setUserToEdit(null);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      mobileNumber: '',
      roleType: kDeliveryServiceRoleTypes[0],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const dateTime = moment(new Date()).format('LLL');
    const id = uuidv4();
    if (userToEdit) {
      const newData = {
        ...userToEdit,
        ...values,
        updatedAt: dateTime,
      };
      const updatedUsers = deliveryService?.users?.map((item) =>
        item.id === userToEdit.id ? newData : item
      );
      setUsers(updatedUsers);
      toast.success('Updated user successfully', {
        description: moment(new Date()).format('LLL'),
      });
    } else {
      const newData = {
        id,
        ...values,
        createdAt: dateTime,
      };
      const updatedUsers = deliveryService.users
        ? [...deliveryService.users, newData]
        : [newData];
      setUsers(updatedUsers);

      toast.success('Added a user to delivery service successfully', {
        description: moment(new Date()).format('LLL'),
      });
    }
    setTabValue('user_list');
  }

  const onUpdateSettings = () => {
    const updatedDeliveryService = {
      ...deliveryService,
      users: users,
    };
    const updatedDeliveryServices = currentSettings?.delivery_services.map(
      (item: DeliveryServiceType) =>
        item.id === deliveryService.id ? updatedDeliveryService : item
    );
    setCurrentSettings({
      ...currentSettings,
      delivery_services: updatedDeliveryServices,
      isPublished: false,
    });
    toast.success('Publish settings to save updates.', {
      description: moment(new Date()).format('LLL'),
    });
    setClose();
  };
  return (
    <Tabs
      defaultChecked={true}
      value={tabValue}
      onValueChange={setTabValue}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="form">Form</TabsTrigger>
        <TabsTrigger value="user_list">User List</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
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
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <div className="w-full grid grid-cols-2 gap-5 pt-5">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onReset();
                }}
                variant={'secondary'}
              >
                Reset
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight_hover text-neutral-950 transition-colors"
                type="submit"
              >
                {userToEdit ? 'Update User' : 'Add User'}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="user_list">
        {users ? (
          <DeliveryServiceUsersTable
            users={users}
            onEdit={(val) => {
              setUserToEdit(val);
              setTabValue('form');
            }}
          />
        ) : (
          <div>No Users Found</div>
        )}
        <div className="grid grid-cols-2 pt-5 gap-5">
          <Button
            onClick={(e) => {
              setClose();
            }}
            variant={'secondary'}
          >
            Cancel
          </Button>
          <Button
            onClick={onUpdateSettings}
            className="bg-highlight hover:bg-highlight_hover text-neutral-950 transition-colors"
          >
            Update Settings
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default ManageDeliveryServicesUsersForm;
