import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { StoreType } from '@/typings';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import CustomMapLocation from '@/components/CustomComponents/CustomMapLocation';
import { Input } from '@/components/ui/input';

function UpdateStoreMapEmbed({
  store,
  setClose,
}: {
  store: StoreType;
  setClose: () => void;
}) {
  const [currentSettings, setCurrentSettings] = useAppStore((state) => [
    state.currentSettings,
    state.setCurrentSettings,
  ]);
  const [mapAddress, setMapAddress] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  useEffect(() => {
    setMapAddress(store.mapEmbedAddress || '');
  }, []);

  const formSchema = z.object({
    mapEmbedAddress: z
      .string()
      .min(2, {
        message: 'Google map embed address must be at least 2 characters.',
      })
      .max(200),
    coordinates: z
      .string()
      .min(2, {
        message: 'Coordinates must be at least 2 characters.',
      })
      .max(200),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mapEmbedAddress: store.mapEmbedAddress || '',
      coordinates: store.coordinates || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedStore: StoreType = {
      ...store,
      mapEmbedAddress: values.mapEmbedAddress,
      coordinates: values.coordinates,
    };
    const updatedSettingsStores = currentSettings?.stores.map(
      (item: StoreType) => (item.id === store.id ? updatedStore : item)
    );
    const updatedSettings = {
      ...currentSettings,
      stores: updatedSettingsStores,
      isPublished: false,
    };
    setCurrentSettings(updatedSettings);
    setClose();
  }
  return (
    <div>
      <CustomMapLocation address={mapAddress} />

      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="mapEmbedAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Map Embed Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinates</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter coordinates here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full grid grid-cols-2 gap-5 pt-5">
              {form.getValues('mapEmbedAddress') && (
                <Button
                  className="bg-highlight hover:bg-highlight_hover"
                  onClick={(e) => {
                    e.preventDefault();
                    setMapAddress(form.getValues('mapEmbedAddress'));
                  }}
                >
                  Find in Map
                </Button>
              )}

              {isConfirmed ? (
                <Button
                  className="bg-highlight hover:bg-highlight_hover"
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className="bg-highlight hover:bg-highlight_hover"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsConfirmed(true);
                  }}
                >
                  Confirm Map
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateStoreMapEmbed;
