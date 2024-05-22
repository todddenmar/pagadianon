import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import {
  BookImageIcon,
  BoxesIcon,
  CalendarCheckIcon,
  ClipboardListIcon,
  ImagesIcon,
  LayoutDashboardIcon,
  NotebookIcon,
  ShoppingBagIcon,
} from 'lucide-react';
import React from 'react';

function StoreSettingSidebar({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (val: string) => void;
}) {
  const { userId, orgId, has } = useAuth();
  if (!userId) {
    return null;
  }
  let isAdmin = false;
  if (orgId && has({ permission: 'org:admin:access' })) {
    isAdmin = true;
  }
  const sidebarItems = [
    {
      value: 'dashboard',
      text: 'Dashboard',
      isActive: value === 'dashboard',
      onClick: () => onValueChange('dashboard'),
      icon: <LayoutDashboardIcon className="h-[16px]" />,
    },
    {
      value: 'products',
      text: 'Products',
      isActive: value === 'products',
      onClick: () => onValueChange('products'),
      icon: <BoxesIcon className="h-[16px]" />,
    },
    {
      value: 'stocks',
      text: 'stocks',
      isActive: value === 'stocks',
      onClick: () => onValueChange('stocks'),
      icon: <ClipboardListIcon className="h-[16px]" />,
    },
    {
      value: 'orders',
      text: 'orders',
      isActive: value === 'orders',
      onClick: () => onValueChange('orders'),
      icon: <ShoppingBagIcon className="h-[16px]" />,
    },
    {
      value: 'contact',
      text: 'contact',
      isActive: value === 'contact',
      onClick: () => onValueChange('contact'),
      icon: <NotebookIcon className="h-[16px]" />,
    },
    {
      value: 'gallery',
      text: 'gallery',
      isActive: value === 'gallery',
      onClick: () => onValueChange('gallery'),
      icon: <BookImageIcon className="h-[16px]" />,
    },
    {
      value: 'hours',
      text: 'business hours',
      isActive: value === 'hours',
      onClick: () => onValueChange('hours'),
      icon: <CalendarCheckIcon className="h-[16px]" />,
    },
  ];

  return (
    <div>
      <ul className="hidden md:flex flex-col gap-1 w-[200px]">
        {sidebarItems.map((item, idx) => {
          return (
            <SettingSidebarItem
              key={`desktop-sidebar-item-${idx}`}
              onClick={item.onClick}
              value={item.value}
              text={item.text}
              isActive={item.isActive}
              icon={item.icon}
            />
          );
        })}

        {isAdmin && (
          <SettingSidebarItem
            value={'images'}
            text={'Images'}
            isActive={value === 'images'}
            onClick={() => onValueChange('images')}
            icon={<ImagesIcon className="h-[16px]" />}
          />
        )}
      </ul>
      <ScrollArea className="w-full py-4 md:hidden">
        <ul className="flex  flex-nowrap">
          {sidebarItems.map((item, idx) => {
            return (
              <SettingSidebarItem
                key={`mobile-sidebar-item-${idx}`}
                onClick={item.onClick}
                value={item.value}
                text={item.text}
                isActive={item.isActive}
                icon={item.icon}
              />
            );
          })}

          {isAdmin && (
            <SettingSidebarItem
              value={'images'}
              text={'Images'}
              isActive={value === 'images'}
              onClick={() => onValueChange('images')}
              icon={<ImagesIcon className="h-[16px]" />}
            />
          )}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function SettingSidebarItem({
  onClick,
  text,
  isActive,
  value,
  icon,
}: {
  onClick: (val: string) => void;
  text: string;
  isActive: boolean;
  value: string;
  icon: any;
}) {
  return (
    <li>
      <button
        className={cn(
          'w-full px-4 text-sm py-2 capitalize font-semibold text-nowrap rounded-md flex  items-center gap-2 text-left ',
          {
            'bg-neutral-100 dark:bg-neutral-800': isActive,
          }
        )}
        onClick={() => onClick(value)}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    </li>
  );
}
export default StoreSettingSidebar;
