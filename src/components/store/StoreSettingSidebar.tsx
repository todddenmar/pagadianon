import { cn } from '@/lib/utils';
import React from 'react';

function StoreSettingSidebar({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (val: string) => void;
}) {
  return (
    <ul className="grid grid-cols-1 gap-1 w-[200px]">
      <li>
        <button
          className={cn(
            'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
            {
              'bg-neutral-100 dark:bg-neutral-800': value === 'contact',
            }
          )}
          onClick={() => onValueChange('contact')}
        >
          Contact
        </button>
      </li>
      <li>
        <button
          className={cn(
            'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
            {
              'bg-neutral-100 dark:bg-neutral-800': value === 'hours',
            }
          )}
          onClick={() => onValueChange('hours')}
        >
          Business Hours
        </button>
      </li>
      <li>
        <button
          className={cn(
            'w-full px-4 text-sm py-2 font-semibold rounded-md text-left ',
            {
              'bg-neutral-100 dark:bg-neutral-800': value === 'products',
            }
          )}
          onClick={() => onValueChange('products')}
        >
          Products
        </button>
      </li>
    </ul>
  );
}

export default StoreSettingSidebar;
