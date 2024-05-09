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
      <h4 className="font-semibold text-lg md:text-2xl">Business Hours</h4>
      {schedules ? (
        <div className="grid gap-2 mt-3 font-semibold">
          {kDaysArrayData?.map((item, idx) => {
            if (schedules[item]) {
              const { opensAt, closesAt } = schedules[item];
              return (
                <div
                  key={`sched-item-${idx}`}
                  className={cn(
                    'grid sm:flex gap-3 justify-between border bg-neutral-200 hover:dark:bg-neutral-900 rounded-md hover:bg-neutral-200 p-3 dark:bg-neutral-950 transition-all',
                    {
                      'text-white bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 hover:bg-neutral-700 hover:dark:bg-neutral-100':
                        idx === dayNumber,
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
                  key={`sched-item-${idx}`}
                  className={cn(
                    'grid sm:flex gap-3 justify-between border rounded-md p-3 bg-neutral-200 dark:text-neutral-500 hover:dark:bg-neutral-900 hover:bg-neutral-200 dark:bg-neutral-950',
                    {
                      'text-yellow-500 border-yellow-500': idx === dayNumber,
                    }
                  )}
                >
                  <div>{item}</div>
                  <div className="flex gap-5 items-center ">
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
      ) : (
        <div className="h-[400px] w-full flex flex-col items-center justify-center text-sm animate-pulse">
          Please wait... this page is still being managed.
        </div>
      )}
    </div>
  );
}

export default StoreBusinessHoursSection;
