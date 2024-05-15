'use client';
import { kStoreProductCategories } from '@/constants';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { StoreType } from '@/typings';
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
  const storeData = currentSettings.stores.find(
    (item: StoreType) => item.slug === params.slug
  );
  let uniqueStoreCategories: any[] = [];
  currentStoreProducts?.forEach((item) => {
    if (!uniqueStoreCategories.includes(item.category)) {
      const categoryItem = kStoreProductCategories.find(
        (catItem) => catItem.value === item.category
      );
      uniqueStoreCategories.push(categoryItem);
    }
  });
  const isAdmin = currentUserData?.stores.includes(storeData.id);
  const facebookUsername = currentStoreData?.settings?.facebookUsername;
  const instagramUsername = currentStoreData?.settings?.instagramUsername;
  const address = currentStoreData?.settings?.address || 'Pagadian City';
  const coordinates = currentStoreData?.settings?.coordinates;

  const latitude = coordinates?.split(',')[0].replaceAll(' ', '');
  const longitude = coordinates?.split(',')[1].replaceAll(' ', '');
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col space-y-3">
        <div>
          <StoreSidebarTitle text="Products " />
          <ul className="grid grid-cols-1 gap-1">
            <li>
              <StoreSidebarItem
                isActive={value === 'all'}
                onClick={() => onChange('all')}
                text={'all'}
                icon={<LayoutListIcon className="h-[16px] w-[16px]" />}
              />
            </li>
            {uniqueStoreCategories.map((item, idx) => {
              return (
                <li key={`category-item-${idx}`}>
                  <StoreSidebarItem
                    isActive={value === item.value}
                    onClick={() => onChange(item.value)}
                    text={item.value}
                    icon={item.icon}
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
                text={'Store Front'}
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
      {isAdmin && (
        <div className="py-5">
          <StoreSidebarTitle text="Admin" />
          <ul>
            <li>
              <Link
                href={`/store/${params.slug}/orders`}
                className={cn(
                  'px-4 rounded-md items-center py-2 w-full text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2'
                )}
              >
                <span>
                  <ClipboardListIcon className="h-[16px] w-[16px]" />
                </span>
                <span>Store Orders</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/store/${params.slug}/settings`}
                className={cn(
                  'px-4 rounded-md items-center py-2 w-full text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2'
                )}
              >
                <span>
                  <SettingsIcon className="h-[16px] w-[16px]" />
                </span>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}


export default StoreSidebar;
