'use client';
import React, { useState } from 'react';
import ContainerLayout from '../layouts/ContainerLayout';
import { Separator } from '@/components/ui/separator';
import StoreSidebar from './StoreSidebar';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { kStoreProductCategories } from '@/constants';
import { PanelBottomOpenIcon } from 'lucide-react';
import { Button } from '../ui/button';
import StoreTabHeader from './StoreTabHeader';
import StoreInfo from './StoreInfo';

function StoreSection() {
  const [tabValue, setTabValue] = useState('store');
  const [isOpenMobileDrawer, setIsOpenMobileDrawer] = useState(false);

  const onMenuTabChange = (tabVal: string) => {
    setTabValue(tabVal);
    setIsOpenMobileDrawer(false);
  };
  return (
    <div className="md:mt-5">
      <div className="md:hidden p-3 sticky top-0 dark:bg-neutral-950 border-b w-full flex justify-between items-center">
        <div className="capitalize font-semibold text-lg">{tabValue}</div>
        <Button
          onClick={() => setIsOpenMobileDrawer(true)}
          className="flex space-x-1 items-center"
        >
          <PanelBottomOpenIcon className="h-[20px]" />
          <span>Discover</span>
        </Button>
      </div>
      <ContainerLayout>
        <div className=" md:border rounded-lg">
          <div className="md:flex h-[600px]">
            <div className="w-[250px] p-3 hidden md:block">
              <StoreSidebar
                value={tabValue}
                onChange={(val) => onMenuTabChange(val)}
              />
            </div>

            <Separator orientation="vertical" className="hidden md:block" />
            <div className="p-3 flex-1">
              <Tabs
                defaultChecked={true}
                defaultValue={tabValue}
                value={tabValue}
                className="w-full"
              >
                <TabsContent value="store">
                  <StoreTabHeader
                    title="Our Store"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  />
                  <StoreInfo />
                </TabsContent>
                {kStoreProductCategories.map((item, idx) => {
                  return (
                    <TabsContent key={`tab-content-${idx}`} value={item.value}>
                      {item.value}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
      </ContainerLayout>
      <Drawer open={isOpenMobileDrawer} onOpenChange={setIsOpenMobileDrawer}>
        <DrawerContent className="px-3">
          <StoreSidebar
            value={tabValue}
            onChange={(val) => onMenuTabChange(val)}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default StoreSection;
