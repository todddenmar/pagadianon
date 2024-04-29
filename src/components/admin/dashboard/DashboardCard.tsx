import React from 'react';
import { Card } from '@/components/ui/card';
import { DashCardData } from '@/typings';

function DashboardCard(prop: DashCardData) {
  return (
    <Card className="p-3 md:p-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm">{prop.label}</div>
        <span className="h-4 text-base">{prop.icon}</span>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{prop.value}</div>
        <div className="text-xs text-neutral-500 font-semibold">
          {prop.description}
        </div>
      </div>
    </Card>
  );
}

export default DashboardCard;
