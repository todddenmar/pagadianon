'use client';
import { kStoreProductCategories } from '@/constants';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { StoreType } from '@/typings';
import { SettingsIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import LoadingComponent from '../admin/LoadingComponent.';

function StoreSidebar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const params = useParams<{ slug: string }>();
  const [currentUserData, currentSettings, currentStoreProducts] = useAppStore(
    (state) => [
      state.currentUserData,
      state.currentSettings,
      state.currentStoreProducts,
    ]
  );
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

  return (
    <div className="py-4 flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <div>
          <StoreSidebarTitle text="Discover" />
          <ul className="grid grid-cols-1 gap-1">
            <li>
              <StoreSidebarItem
                isActive={value === 'store'}
                onClick={() => onChange('store')}
                text={'store'}
                icon={<StoreIcon className="w-[16px]" />}
              />
            </li>
          </ul>
        </div>
        <div>
          <StoreSidebarTitle text="Product Categories" />
          <ul className="grid grid-cols-1 gap-1">
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
      </div>
      {isAdmin && (
        <div>
          <div className="text-lg font-semibold px-4 py-2">Admin</div>
          <ul>
            <Link
              href={`/store/${params.slug}/settings`}
              className={cn(
                'px-4 rounded-md py-2 w-full text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2'
              )}
            >
              <span>
                <SettingsIcon className="h-[16px]" />
              </span>
              <span>Settings</span>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

function StoreSidebarTitle({ text }: { text: string }) {
  return <div className="text-lg px-4 py-2">{text}</div>;
}

function StoreSidebarItem({
  onClick,
  text,
  icon,
  isActive,
}: {
  isActive: boolean;
  onClick: () => void;
  text: string;
  icon?: any;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 rounded-md py-2 w-full text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2',
        {
          'dark:bg-neutral-800 bg:bg-neutral-50': isActive,
        }
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
}

export default StoreSidebar;
