'use client';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ImageIcon, LoaderCircleIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ProductType, VariantType } from '@/typings';
import { toast } from 'sonner';
import CustomMultiImagePicker from '@/components/CustomComponents/CustomMultiImagePicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import CustomPesoIcon from '@/components/CustomComponents/CustomPesoIcon';
import {
  dbGetStoreImages,
  dbUpdateStoreVariants,
} from '@/helpers/firebaseHelpers';

function CreateProductVariantForm({
  product,
  setClose,
}: {
  product: ProductType;
  setClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    string[] | null | undefined
  >(null);

  const [storeImages, setStoreImages] = useState<any[]>([]);
  const [variants, setVariants] = useState<any>(product?.variants);
  const [tabValue, setTabValue] = useState('form');
  const [toEditVariant, setToEditVariant] = useState<VariantType | null>(null);
  const [currentStoreData, currentStoreProducts, setCurrentStoreProducts] =
    useAppStore((state) => [
      state.currentStoreData,
      state.currentStoreProducts,
      state.setCurrentStoreProducts,
    ]);

  useEffect(() => {
    getStoreImages();
  }, []);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(50),
    description: z.string().max(200).optional(),
    price: z
      .string()
      .refine((val) => parseInt(val) > 0, { message: 'Price must be above 0' }),
    compareAtPrice: z.string().optional(),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      compareAtPrice: '',
    },
  });
  const onReset = () => {
    setSelectedImages(null);
    setToEditVariant(null);
    form.reset();
  };

  const onEditVariant = (item: VariantType) => {
    setTabValue('form');
    setToEditVariant(item);
    form.setValue('name', item.name);
    form.setValue('description', item.description);
    form.setValue('price', item.price);
    form.setValue('compareAtPrice', item.compareAtPrice);
    setSelectedImages(item.images);
  };

  const getStoreImages = async () => {
    const res = await dbGetStoreImages({ storeID: currentStoreData.id });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setStoreImages(res.data || []);
  };

  const onSave = async () => {
    setIsLoading(true);
    const res = await dbUpdateStoreVariants({
      storeID: currentStoreData.id,
      productID: product.id,
      data: variants,
    });
    if (res.status === 'error') {
      console.log(res.error);
    }
    const updatedProducts = currentStoreProducts.map((item: ProductType) =>
      item.id === product.id ? { ...product, variants: variants } : item
    );
    setCurrentStoreProducts(updatedProducts);
    toast.success('Saved variants successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsLoading(false);
    setClose();
  };
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
      productID: product.id,
      images: selectedImages,
      isAllowingOrder: false,
      stock: {
        quantity: 0,
        updatedAt: dateTime,
      },
      createdAt: dateTime,
    };

    if (toEditVariant) {
      const updatedVariants = variants.map((item: VariantType) =>
        item.id === toEditVariant.id
          ? {
              ...toEditVariant,
              ...values,
              isAllowingOrder: false,
              images: selectedImages,
              stock: {
                quantity: 0,
                updatedAt: dateTime,
              },
              updatedAt: dateTime,
            }
          : item
      );
      setVariants(updatedVariants);

      setToEditVariant(null);
    } else {
      const updatedVariants = variants ? [...variants, newData] : [newData];
      setVariants(updatedVariants);
    }
    setIsLoading(false);
    setTabValue('variants');
    setSelectedImages(null);
    form.reset();
  }
  return (
    <Tabs
      defaultChecked={true}
      value={tabValue}
      onValueChange={setTabValue}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="form">Create Form</TabsTrigger>
        <TabsTrigger value="variants">Variants List</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <Card className="p-3">
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
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <CustomMultiImagePicker
                  images={storeImages.map((item) => item.downloadURL)}
                  value={selectedImages}
                  onChange={(val) => setSelectedImages(val)}
                />
              </ScrollArea>

              <div className="w-full grid grid-cols-2 gap-5">
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
                  className="bg-highlight hover:bg-highlight_hover"
                  type="submit"
                >
                  {toEditVariant ? 'Update Variant' : 'Add Variant'}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </TabsContent>
      <TabsContent value="variants">
        <ScrollArea className="h-[400px] w-full rounded-lg border p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {variants?.map((item: VariantType, idx: number) => {
              const firstImage = item.images ? item.images[0] : null;

              return (
                <div
                  key={`variant-${idx}`}
                  onClick={() => onEditVariant(item)}
                  className="cursor-pointer "
                >
                  <div className="w-full aspect-square flex flex-col relative items-center justify-center bg-neutral-200 dark:bg-neutral-900 rounded-md overflow-hidden">
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-contain h-full w-full group-hover:scale-105 transition-all"
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="text-base">{item.name}</div>
                    <p className="text-sm text-neutral-500 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex space-x-2 items-end justify-start">
                      <div className="text-lg font-semibold">
                        <CustomPesoIcon />
                        {item.price}
                      </div>
                      {item.compareAtPrice && (
                        <div className="text-destructive line-through">
                          <CustomPesoIcon />
                          {item.compareAtPrice}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        {isLoading ? (
          <div className="w-full h-[50px] flex flex-col items-center justify-center mt-3">
            <span>
              <LoaderCircleIcon className="animate-spin" />
            </span>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 gap-5 mt-3">
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
              onClick={(e) => {
                e.preventDefault();
                onSave();
              }}
            >
              Save Variants
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default CreateProductVariantForm;
