import { cn } from '@/lib/utils';
import React from 'react';

function ContainerLayout({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={cn('max-w-[1500px] w-full mx-auto p-2 md:px-5 ', className)}
    >
      {children}
    </div>
  );
}

export default ContainerLayout;
