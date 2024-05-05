'use client';
import { kAdminPageDataItems } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function AdminSidebar() {
  const pathname = usePathname();
  return (
    <ul className="flex md:grid grid-cols-1 gap-3 ">
      {kAdminPageDataItems?.map((item, idx) => {
        return (
          <li
            key={`admin-sidebar-item-${idx}`}
            className={cn(
              'hover:text-white text-neutral-300 transition-colors',
              {
                'text-red-500': pathname === item.path,
              }
            )}
          >
            <Link href={item.path}>{item.icon}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default AdminSidebar;
