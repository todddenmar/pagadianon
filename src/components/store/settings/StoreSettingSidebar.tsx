import { cn } from '@/lib/utils';
import { ClipboardListIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

function StoreSettingSidebar({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (val: string) => void;
}) {
  const params = useParams<{ slug: string }>();

  return (
    <ul className="grid grid-cols-1 gap-1 w-[200px]">
      <SettingSidebarItem
        onClick={() => onValueChange('contact')}
        value="contact"
        text="Contact"
        isActive={value === 'contact'}
      />
      <SettingSidebarItem
        onClick={() => onValueChange('gallery')}
        value="gallery"
        text="Gallery"
        isActive={value === 'gallery'}
      />
      <SettingSidebarItem
        onClick={() => onValueChange('hours')}
        value="hours"
        text="Hours"
        isActive={value === 'hours'}
      />
      <SettingSidebarItem
        onClick={() => onValueChange('products')}
        value="products"
        text="Products"
        isActive={value === 'products'}
      />
    </ul>
  );
}

function SettingSidebarItem({
  onClick,
  text,
  isActive,
  value,
}: {
  onClick: (val: string) => void;
  text: string;
  isActive: boolean;
  value: string;
}) {
  return (
    <li>
      <button
        className={cn(
          'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
          {
            'bg-neutral-100 dark:bg-neutral-800': isActive,
          }
        )}
        onClick={() => onClick(value)}
      >
        {text}
      </button>
    </li>
  );
}
export default StoreSettingSidebar;
