import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreBusinessHoursListCard from './StoreBusinessHoursListCard';
import StoreSettingsForm from './StoreSettingsForm';
import { Card } from '../ui/card';
import StoreProductsTable from './StoreProductsTable';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
function StoreSettingsTabs() {
  const [tabValue, setTabValue] = useState('contact');
  return (
    <div className="flex gap-5">
      <div className="hidden md:block">
        <ul className="grid grid-cols-1 gap-1 w-[200px]">
          <li>
            <button
              className={cn(
                'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
                {
                  'bg-neutral-800': tabValue === 'contact',
                }
              )}
              onClick={() => setTabValue('contact')}
            >
              Contact
            </button>
          </li>
          <li>
            <button
              className={cn(
                'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
                {
                  'bg-neutral-800': tabValue === 'hours',
                }
              )}
              onClick={() => setTabValue('hours')}
            >
              Business Hours
            </button>
          </li>
          <li>
            <button
              className={cn(
                'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
                {
                  'bg-neutral-800': tabValue === 'products',
                }
              )}
              onClick={() => setTabValue('products')}
            >
              Products
            </button>
          </li>
        </ul>
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
        <TabsContent value="contact" className="md:mt-0">
          <Card className="w-full p-3">
            <StoreSettingsForm />
          </Card>
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
