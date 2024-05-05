'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function StoreInfo() {
  const [tabValue, setTabValue] = useState('hours');
  return (
    <div>
      <Tabs
        defaultChecked={true}
        value={tabValue}
        defaultValue="hours"
        className="w-full"
        onValueChange={(val) => setTabValue(val)}
      >
        <TabsList>
          <TabsTrigger value="hours">Business Hours</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        <TabsContent value="hours">Business Hours</TabsContent>
        <TabsContent value="contact">Contact Information</TabsContent>
        <TabsContent value="location">Map Location</TabsContent>
      </Tabs>
    </div>
  );
}

export default StoreInfo;
