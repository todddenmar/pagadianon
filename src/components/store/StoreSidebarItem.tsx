import { cn } from '@/lib/utils';
import React from 'react';

function StoreSidebarItem({
  totalItems,
  onClick,
  text,
  icon,
  isActive,
}: {
  totalItems?: number;
  isActive: boolean;
  onClick: () => void;
  text: string;
  icon?: any;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 rounded-md py-2 w-full items-center text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2 justify-between',
        {
          'dark:bg-neutral-800 bg:bg-neutral-50': isActive,
        }
      )}
    >
      <span className="flex space-x-2">
        <span>{icon}</span>
        <span>{text}</span>
      </span>

      {totalItems ? (
        <span className="text-neutral-400 dark:text-neutral-500 text-xs">
          {totalItems > 0 ? totalItems : null}
        </span>
      ) : null}
    </button>
  );
}

export default StoreSidebarItem;
