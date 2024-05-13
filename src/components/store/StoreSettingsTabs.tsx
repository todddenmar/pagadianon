import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreBusinessHoursListCard from './StoreBusinessHoursListCard';
import StoreSettingsForm from './StoreSettingsForm';
import { Card } from '../ui/card';
import StoreProductsTable from './StoreProductsTable';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import StoreSettingSidebar from './StoreSettingSidebar';
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
        <TabsList className="block md:hidden">
          <TabsTrigger onClick={() => setTabValue('contact')} value="contact">
            Contact
          </TabsTrigger>
          <TabsTrigger onClick={() => setTabValue('hours')} value="hours">
            Business Hours
          </TabsTrigger>
          <TabsTrigger onClick={() => setTabValue('products')} value="products">
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contact">
          <StoreSettingsForm />
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
