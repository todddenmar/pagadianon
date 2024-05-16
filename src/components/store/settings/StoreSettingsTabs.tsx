import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreBusinessHoursListCard from '../StoreBusinessHoursListCard';
import StoreSettingsForm from './StoreSettingsForm';
import { Card } from '../../ui/card';
import StoreProductsTable from '../StoreProductsTable';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import StoreSettingSidebar from './StoreSettingSidebar';
import StoreSettingsGallery from './StoreSettingsGallery';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function StoreSettingsTabs() {
  const [tabValue, setTabValue] = useState('contact');
  return (
    <div className="flex gap-5 md:gap-10">
      <div className="hidden md:block">
        <StoreSettingSidebar
          value={tabValue}
          onValueChange={(val) => setTabValue(val)}
        />
      </div>
      <Tabs
        defaultChecked={true}
        value={tabValue}
        onValueChange={(val) => setTabValue(val)}
        className="w-full "
      >
        <div className="block md:hidden">
          <Select value={tabValue} onValueChange={setTabValue}>
            <SelectTrigger className="capitalize">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contact" className="capitalize">
                contact
              </SelectItem>
              <SelectItem value="gallery" className="capitalize">
                gallery
              </SelectItem>
              <SelectItem value="hours" className="capitalize">
                hours
              </SelectItem>
              <SelectItem value="products" className="capitalize">
                products
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="contact">
          <StoreSettingsForm />
        </TabsContent>
        <TabsContent value="gallery">
          <StoreSettingsGallery />
        </TabsContent>
        <TabsContent value="hours">
          <StoreBusinessHoursListCard />
        </TabsContent>
        <TabsContent value="products">
          <StoreProductsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StoreSettingsTabs;
