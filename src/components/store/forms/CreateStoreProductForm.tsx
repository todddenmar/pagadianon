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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  dbAddNewStore,
  dbAddStoreProduct,
  dbUpdateSettings,
} from '@/helpers/firebaseHelpers';
import { kSaasTypes, kStoreProductCategories } from '@/constants';
import { LoaderCircleIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '@/typings';
import { toast } from 'sonner';

function CreateStoreProductForm({ setClose }: { setClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStoreData, currentStoreProducts, setCurrentStoreProducts] =
    useAppStore((state) => [
      state.currentStoreData,
      state.currentStoreProducts,
      state.setCurrentStoreProducts,
    ]);

  const checkProductSlugExists = (slug: string) => {
    const res = currentStoreProducts?.find(
      (item: ProductType) => item.slug === slug
    );
    if (res) {
      return res.length;
    } else {
      return false;
    }
  };

  const formSchema = z.object({
    category: z.string({
      required_error: 'Please select a category.',
    }),
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(50),
    description: z.string().max(100).optional(),
    slug: z
      .string()
      .min(2, {
        message: 'Slug must be at least 2 characters.',
      })
      .max(50)
      .refine((val) => checkProductSlugExists(val) === false, {
        message: 'Slug already exists',
      }),
    price: z.string(),
    compareAtPrice: z.string().optional(),
    tags: z.string().optional(),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      name: '',
      description: '',
      slug: '',
      price: '',
      compareAtPrice: '',
      tags: '',
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
    const updatedProducts = currentStoreProducts
      ? [...currentStoreProducts, newData]
      : [newData];
    const res = await dbAddStoreProduct({
      storeID: currentStoreData.id,
      data: newData,
    });
    if (res.status != 'success') {
      console.log(res.error);
      return;
    }
    setCurrentStoreProducts(updatedProducts);
    toast.success('Added a new product successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsLoading(false);
    setClose();
  }
  function onGenerateSlug(e: any) {
    e.preventDefault();
    const generatedSlug = _.kebabCase(form.getValues('name'));
    const sameSlugTotal = checkProductSlugExists(generatedSlug);
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {kStoreProductCategories.map((item, idx) => {
                      return (
                        <SelectItem
                          key={`select-saas-item-${idx}`}
                          className="capitalize"
                          value={item.value}
                        >
                          {item.value}
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
                <Input placeholder="Enter description here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    placeholder="Enter price here"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="compareAtPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compare At Price</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    placeholder="Enter compare at price here"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                <Input placeholder="Enter compare at price here" {...field} />
              </FormControl>
              <FormDescription>
                Split using comma ex: burger, food, beef
              </FormDescription>
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
            <Button type="submit">Submit</Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CreateStoreProductForm;
