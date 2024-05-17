import React from 'react';
import DashboardCard from './DashboardCard';
import { DashCardItemType } from '@/typings';

function DashboardCards({ items }: { items: DashCardItemType[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
      {items?.map((item: DashCardItemType, idx: number) => {
        return (
          <DashboardCard
            key={`dash-card-item-${idx}`}
            label={item.label}
            icon={item.icon}
            value={item.value}
            description={item.description}
          />
        );
      })}
    </div>
  );
}

export default DashboardCards;
