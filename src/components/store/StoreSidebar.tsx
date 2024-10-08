'use client';
import { kStoreProductCategories } from '@/constants';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ProductType, StoreType } from '@/typings';
import {
  ClipboardListIcon,
  LayoutListIcon,
  NavigationIcon,
  SettingsIcon,
  StoreIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import CustomFacebookIcon from '../icons/CustomFacebookIcon';
import CustomInstagramIcon from '../icons/CustomInstagramIcon';
import StoreSidebarTitle from './StoreSidebarTitle';
import StoreSidebarItem from './StoreSidebarItem';
import StoreSidebarLinkItem from './StoreSidebarLinkItem';
import { kebabCase } from 'lodash';
import {
  compareEqualStrings,
  getAllUniqueProductCategory,
} from '@/helpers/appHelpers';

function StoreSidebar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const params = useParams<{ slug: string }>();
  const [
    currentStoreData,
    currentUserData,
    currentSettings,
    currentStoreProducts,
  ] = useAppStore((state) => [
    state.currentStoreData,
    state.currentUserData,
    state.currentSettings,
    state.currentStoreProducts,
  ]);
  if (!currentSettings) {
    return <LoadingComponent />;
  }
  const storeSettings = currentSettings.stores.find(
    (item: StoreType) => item.slug === params.slug
  );

  const facebookUsername = storeSettings?.facebookUsername;
  const instagramUsername = storeSettings?.instagramUsername;
  const coordinates = storeSettings?.coordinates;

  const latitude = coordinates?.split(',')[0].replaceAll(' ', '');
  const longitude = coordinates?.split(',')[1].replaceAll(' ', '');

  const uniqueCategories = getAllUniqueProductCategory({
    products: currentStoreProducts,
  });

  function getTotalItemsByCategory(category: string) {
    let totalVariants = 0;
    currentStoreProducts.forEach((product: ProductType) => {
      if (compareEqualStrings(product.category, category)) {
        const length = product.variants ? product.variants?.length : 0;
        totalVariants = totalVariants + length;
      }
    });
    return totalVariants;
  }
  function getTotalVariants() {
    let totalVariants = 0;
    currentStoreProducts.forEach((product: ProductType) => {
      const length = product.variants ? product.variants?.length : 0;
      totalVariants = totalVariants + length;
    });
    return totalVariants;
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col space-y-3">
        <div>
          <StoreSidebarTitle text="Products " />
          <ul className="grid grid-cols-1 gap-1">
            <li>
              <StoreSidebarItem
                totalItems={getTotalVariants()}
                isActive={value === 'all'}
                onClick={() => onChange('all')}
                text={'all'}
                icon={<LayoutListIcon className="h-[16px] w-[16px]" />}
              />
            </li>
            {uniqueCategories.map((item, idx) => {
              const totalItems = getTotalItemsByCategory(item) || 0;
              const icon = kStoreProductCategories.find(
                (cat) => cat.value === item
              )?.icon;
              return (
                <li key={`category-item-${idx}`}>
                  <StoreSidebarItem
                    totalItems={totalItems}
                    isActive={value === item}
                    onClick={() => onChange(item)}
                    text={item}
                    icon={icon}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <StoreSidebarTitle text="Store" />
          <ul className="grid grid-cols-1 gap-1">
            <li>
              <StoreSidebarItem
                isActive={value === 'store'}
                onClick={() => onChange('store')}
                text={'Store Info'}
                icon={<StoreIcon className="h-[16px] w-[16px]" />}
              />
            </li>

            {coordinates && (
              <li>
                <StoreSidebarLinkItem
                  target="_blank"
                  href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${latitude},${longitude}`}
                  icon={<NavigationIcon className="h-[16px] w-[16px]" />}
                  text="Get Direction"
                />
              </li>
            )}
          </ul>
        </div>
        <div>
          <StoreSidebarTitle text="Socials" />
          <ul className="grid grid-cols-1 gap-1">
            {facebookUsername && (
              <li>
                <StoreSidebarLinkItem
                  target="_blank"
                  href={`https://www.facebook.com/${facebookUsername}`}
                  icon={<CustomFacebookIcon className="h-[16px] w-[16px]" />}
                  text="Facebook"
                />
              </li>
            )}
            {instagramUsername && (
              <li>
                <StoreSidebarLinkItem
                  target="_blank"
                  href={`https://www.instagram.com/${instagramUsername}`}
                  icon={<CustomInstagramIcon className="h-[16px] w-[16px]" />}
                  text="Instagram"
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default StoreSidebar;
