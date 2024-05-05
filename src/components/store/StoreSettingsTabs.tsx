import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreBusinessHoursListCard from './StoreBusinessHoursListCard';
import StoreSettingsForm from './StoreSettingsForm';
import { Card } from '../ui/card';
function StoreSettingsTabs() {
  const [tabValue, setTabValue] = useState('contact');
  return (
    <div>
      <Tabs
        defaultChecked={true}
        value={tabValue}
        onValueChange={(val) => setTabValue(val)}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger onClick={() => setTabValue('contact')} value="contact">
            Contact Information
          </TabsTrigger>
          <TabsTrigger onClick={() => setTabValue('hours')} value="hours">
            Business Hours
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contact">
          <Card className="max-w-md w-full p-3">
            <StoreSettingsForm />
          </Card>
        </TabsContent>
        <TabsContent value="hours">
          <StoreBusinessHoursListCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StoreSettingsTabs;
