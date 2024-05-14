import { cn } from '@/lib/utils';
import React from 'react';

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
        'px-4 rounded-md py-2 w-full items-center text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2',
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

export default StoreSidebarItem;
