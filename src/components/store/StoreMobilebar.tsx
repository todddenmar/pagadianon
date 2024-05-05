'use client';
import { kStoreProductCategories } from '@/constants';
import { StoreIcon } from 'lucide-react';
import React from 'react';

function StoreMobilebar() {
  return (
    <div className="p-3 border-b">
      <ul className="grid grid-cols-6 gap-2 items-center w-fit">
        <li>
          <StoreMobileButtonItem
            icon={<StoreIcon className="w-[20px]" />}
            onClick={() => console.log('Storefront')}
          />
        </li>
        {kStoreProductCategories.map((item, idx) => {
          return (
            <li key={`category-item-button-icon-${idx}`}>
              <StoreMobileButtonItem
                icon={item.icon}
                onClick={() => console.log(item.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function StoreMobileButtonItem({
  icon,
  onClick,
}: {
  icon: any;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md border w-[50px] h-[50px] flex flex-col items-center justify-center "
    >
      {icon}
    </button>
  );
}

export default StoreMobilebar;
