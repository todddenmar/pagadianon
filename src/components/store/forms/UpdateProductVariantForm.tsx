import { VariantStockItemType, VariantType } from '@/typings';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/lib/store';
import moment from 'moment';
import { toast } from 'sonner';
import CustomSubmitLoadingButton from '@/components/CustomComponents/CustomSubmitLoadingButton';
import { dbUpdateProductVariantStock } from '@/helpers/firebaseHelpers';

function UpdateProductVariantForm({
  variantStock,
  setClose,
}: {
  variantStock: VariantStockItemType;
  setClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStoreData, currentStoreProducts, setCurrentStoreProducts] =
    useAppStore((state) => [
      state.currentStoreData,
      state.currentStoreProducts,
      state.setCurrentStoreProducts,
    ]);
  const formSchema = z.object({
    quantity: z.string().optional(),
    isAllowingOrder: z.boolean().default(false),
    isContinueSelling: z.boolean().default(false),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: variantStock.stock?.quantity
        ? variantStock.stock?.quantity
        : '',
      isAllowingOrder: variantStock.isAllowingOrder ? true : false,
      isContinueSelling: variantStock.isContinueSelling ? true : false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    const { quantity, isAllowingOrder, isContinueSelling } = values;
    const productToEdit = currentStoreProducts?.find(
      (item) => item.id === variantStock.productID
    );
    const variantToEdit = productToEdit.variants?.find(
      (item: VariantType) => item.id === variantStock.variantID
    );
    const date = moment(new Date()).format('LLL');
    const updatedVariant = {
      ...variantToEdit,
      isAllowingOrder,
      isContinueSelling,
      stock: { quantity: quantity || 0, updatedAt: date },
    };
    const updatedVariants = productToEdit.variants.map((item: VariantType) =>
      item.id === variantStock.variantID ? updatedVariant : item
    );

    const updatedProduct = { ...productToEdit, variants: updatedVariants };

    const updatedStoreProducts = currentStoreProducts?.map((item) =>
      item.id === variantStock.productID ? updatedProduct : item
    );
    const res = await dbUpdateProductVariantStock({
      storeID: currentStoreData.id,
      productID: variantStock.productID,
      data: updatedVariants,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }

    setCurrentStoreProducts(updatedStoreProducts);
    setIsLoading(false);
    setClose();
    toast.success('Stock Updated Successfully!', {
      action: {
        label: 'Done',
        onClick: () => console.log('updated stock'),
      },
    });
  }
  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isContinueSelling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Continue Selling
                    </FormLabel>
                    <FormDescription>
                      Allow customers to buy this item even it is out of stock
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAllowingOrder"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Order?</FormLabel>
                    <FormDescription>
                      Allow customers to add this product variant to cart
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomSubmitLoadingButton
              isLoading={isLoading}
              setClose={setClose}
              text="Update Stock"
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProductVariantForm;
