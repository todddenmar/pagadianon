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

      <Link
        href={`/store/${params.slug}/orders`}
        className={cn(
          'px-4 rounded-md items-center py-2 w-full text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2'
        )}
      >
        <span>
          <ClipboardListIcon className="h-[16px] w-[16px]" />
        </span>
        <span>Orders</span>
      </Link>
    </ul>
  );
}

export default StoreSettingSidebar;
