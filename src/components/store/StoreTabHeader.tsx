import React from 'react';

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
    </div>
  );
}

export default StoreTabHeader;
