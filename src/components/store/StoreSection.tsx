'use client';
import React, { useState } from 'react';
import ContainerLayout from '../layouts/ContainerLayout';
import { Separator } from '@/components/ui/separator';
import StoreSidebar from './StoreSidebar';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { kStoreProductCategories } from '@/constants';
import {
  MailIcon,
  MapPinIcon,
  PanelBottomOpenIcon,
  SmartphoneIcon,
  UtensilsIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import StoreTabHeader from './StoreTabHeader';
import StoreInfo from './StoreInfo';
import { useAppStore } from '@/lib/store';
import { ProductType } from '@/typings';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import CustomEmailLink from '../CustomComponents/CustomEmailLink';
import CustomMobileLink from '../CustomComponents/CustomMobileLink';

function StoreSection() {
  const [tabValue, setTabValue] = useState('store');
  const [isOpenMobileDrawer, setIsOpenMobileDrawer] = useState(false);
  const [currentStoreProducts, currentStoreData] = useAppStore((state) => [
    state.currentStoreProducts,
    state.currentStoreData,
  ]);

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
          <div className="md:flex min-h-[600px] ">
            <div className="w-[250px] p-3 hidden md:block">
              <StoreSidebar
                value={tabValue}
                onChange={(val) => onMenuTabChange(val)}
              />
            </div>

            <div className="p-3 flex-1 md:border-l">
              <Tabs
                defaultChecked={true}
                defaultValue={tabValue}
                value={tabValue}
                className="w-full"
              >
                <TabsContent value="store">
                  <StoreInfo />
                </TabsContent>
                {kStoreProductCategories.map((item, idx) => {
                  const products = currentStoreProducts?.filter(
                    (prod: ProductType) => prod.category === item.value
                  );
                  return (
                    <TabsContent key={`tab-content-${idx}`} value={item.value}>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {products.map((prod) => {
                          return (
                            <div
                              key={`prod-card-${prod.id}`}
                              className="w-full"
                            >
                              <div className="w-full aspect-square flex flex-col items-center justify-center bg-neutral-900 rounded-md overflow-hidden">
                                <UtensilsIcon />
                              </div>
                              <div className="mt-2">
                                <div>{prod.name}</div>
                                <p className="text-sm text-neutral-500 line-clamp-1">
                                  {prod.description}
                                </p>
                                <div className="flex space-x-2 items-end justify-start">
                                  <div className="text-2xl font-semibold">
                                    <CustomPesoIcon />
                                    {prod.price}
                                  </div>
                                  {prod.compareAtPrice && (
                                    <div className="text-destructive line-through">
                                      <CustomPesoIcon />
                                      {prod.compareAtPrice}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
