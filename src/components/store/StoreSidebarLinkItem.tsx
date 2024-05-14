import { cn } from '@/lib/utils';
import React from 'react';

function StoreSidebarLinkItem({
  text,
  href,
  icon,
  target,
}: {
  text: string;
  href: string;
  icon?: any;
  target?: string;
}) {
  return (
    <a
      target={target}
      href={href}
      className={cn(
        'px-4 pl-3 rounded-md py-2 w-full items-center text-left text-sm dark:hover:bg-neutral-900 transition-all  hover:bg-neutral-100 capitalize flex space-x-2'
      )}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

export default StoreSidebarLinkItem;
