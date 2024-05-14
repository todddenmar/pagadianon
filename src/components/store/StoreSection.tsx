'use client';
import React, { useState } from 'react';
import ContainerLayout from '../layouts/ContainerLayout';
import StoreSidebar from './StoreSidebar';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { kStoreProductCategories } from '@/constants';
import { PanelBottomOpenIcon } from 'lucide-react';
import { Button } from '../ui/button';
import StoreInfo from './StoreInfo';
import { useAppStore } from '@/lib/store';
import { ProductType, VariantType } from '@/typings';
import { getAllUniqueTagsFromItems } from '@/helpers/appHelpers';
import StoreProductsList from './StoreProductsList';

function StoreSection() {
  const [tabValue, setTabValue] = useState('all');
  const [isOpenMobileDrawer, setIsOpenMobileDrawer] = useState(false);
  const [currentStoreProducts, currentStoreData] = useAppStore((state) => [
    state.currentStoreProducts,
    state.currentStoreData,
  ]);
  const onMenuTabChange = (tabVal: string) => {
    setTabValue(tabVal);
    setIsOpenMobileDrawer(false);
  };

  let variants: VariantType[] = [];
  currentStoreProducts?.forEach((prod) => {
    prod.variants?.forEach((variant: VariantType) => {
      variants.push(variant);
    });
  });
  const allTags = getAllUniqueTagsFromItems(currentStoreProducts);
  return (
    <div className="md:mt-5 ">
      <div className="md:hidden px-5 py-2 sticky top-[60px] z-10 bg-neutral-900 dark:bg-neutral-800 border-y w-full flex justify-between items-center">
        <div className="font-bold text-base uppercase text-white  ">
          {tabValue}
        </div>
        <Button
          variant={'default'}
          onClick={() => setIsOpenMobileDrawer(true)}
          className="flex space-x-1 items-center bg-white text-neutral-900"
        >
          <PanelBottomOpenIcon className="h-[20px] " />
          <span>Discover</span>
        </Button>
      </div>
      <ContainerLayout>
        <div className=" md:border rounded-lg bg-neutral-50 dark:bg-neutral-950 shadow-lg">
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
                <TabsContent value="all">
                  <StoreProductsList
                    variants={variants}
                    tags={allTags}
                    products={currentStoreProducts}
                  />
                </TabsContent>
                {kStoreProductCategories.map((item, idx) => {
                  const products = currentStoreProducts?.filter(
                    (prod: ProductType) => prod.category === item.value
                  );
                  let variants: VariantType[] = [];
                  products?.forEach((prod) => {
                    prod.variants?.forEach((variant: VariantType) => {
                      variants.push(variant);
                    });
                  });
                  const tags = getAllUniqueTagsFromItems(products);
                  return (
                    <TabsContent key={`tab-content-${idx}`} value={item.value}>
                      <StoreProductsList
                        variants={variants}
                        tags={tags}
                        products={products}
                      />
                    </TabsContent>
                  );
                })}
                <TabsContent value="store">
                  <StoreInfo />
                </TabsContent>
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
