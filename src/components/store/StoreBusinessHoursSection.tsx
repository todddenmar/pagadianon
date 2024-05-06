import { kDaysArrayData } from '@/constants';
import { useAppStore } from '@/lib/store';
import { MinusIcon, MoonIcon } from 'lucide-react';
import React from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import { cn } from '@/lib/utils';

function StoreBusinessHoursSection() {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
  const schedules = currentStoreData?.schedules;
  const dayToday = new Date();
  const dayNumber = dayToday.getDay();
  if (!currentStoreData) return <LoadingComponent />;
  return (
    <div>
      {schedules && (
        <div className="grid gap-5">
          {kDaysArrayData?.map((item, idx) => {
            if (schedules[item]) {
              const { opensAt, closesAt } = schedules[item];
              return (
                <div
                  key={`sched-item-${idx}`}
                  className={cn(
                    'flex justify-between border hover:dark:bg-neutral-900 rounded-md hover:bg-neutral-200 p-3 dark:bg-neutral-950 transition-all',
                    {
                      'text-yellow-500 border-yellow-500': idx === dayNumber,
                    }
                  )}
                >
                  <div>{item}</div>
                  <div className="flex gap-5 items-center">
                    <div>
                      {opensAt.hour} : {opensAt.minute} {opensAt.period}
                    </div>
                    <MinusIcon className="h-5" />
                    <div>
                      {closesAt.hour} : {closesAt.minute} {closesAt.period}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={cn(
                    'flex justify-between border rounded-md p-3 text-neutral-500 hover:dark:bg-neutral-900 hover:bg-neutral-200 dark:bg-neutral-950',
                    {
                      'text-yellow-500 border-yellow-500': idx === dayNumber,
                    }
                  )}
                >
                  <div>{item}</div>
                  <div className="flex gap-5 items-center">
                    <div className="flex gap-2 items-center">
                      <MoonIcon className="h-5" />{' '}
                      {idx === dayNumber ? 'Closed Today' : 'Closed'}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default StoreBusinessHoursSection;
