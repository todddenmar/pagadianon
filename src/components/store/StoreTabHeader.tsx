import React from 'react';
import { Separator } from '../ui/separator';

function StoreTabHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full">
      <h3 className="text-4xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm dark:text-neutral-500 text-neutral-700">
        {description}
      </p>
      <Separator className="my-3" />
    </div>
  );
}

export default StoreTabHeader;
