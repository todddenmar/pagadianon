import CustomTimePicker from '@/components/CustomComponents/CustomTimePicker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { kDaysArrayData } from '@/constants';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { DaysSchedType } from '@/typings';
import React, { useState } from 'react';

function CreateScheduleForm({ setClose }: { setClose: () => void }) {
  const [currentStoreData, setCurrentStoreData] = useAppStore((state) => [
    state.currentStoreData,
    state.setCurrentStoreData,
  ]);

  const [opensAt, setOpensAt] = useState<Date | null>(null);
  const [closesAt, setClosesAt] = useState<Date | null>(null);
  const [days, setDays] = useState<DaysSchedType>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const onAddSchedule = () => {
    const daySchedules: DaysSchedType = {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    };
    kDaysArrayData.forEach((item) => {
      daySchedules[item] = days[item] ? { opensAt, closesAt } : null;
    });

    const updatedStoreData = {
      ...currentStoreData,
      schedules: daySchedules,
      isPublished: false,
    };
    setCurrentStoreData(updatedStoreData);
    setClose();
  };
  return (
    <div className="grid gap-3">
      <div>
        <div>Select Days:</div>
        <div className="inline-flex  flex-wrap py-2 gap-2">
          {kDaysArrayData?.map((item, idx) => {
            return (
              <Badge
                variant={days[item] ? 'default' : 'outline'}
                className={cn('cursor-pointer')}
                onClick={() => {
                  setDays({ ...days, [item]: !days[item] });
                }}
                key={`day-item-${idx}`}
              >
                {item}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center border p-2 rounded-md">
        <div>From:</div>
        <CustomTimePicker
          value={opensAt}
          onChange={(v: any) => setOpensAt(v)}
        />
      </div>
      <div className="flex justify-between items-center border p-2 rounded-md">
        <div>To:</div>
        <CustomTimePicker
          value={closesAt}
          onChange={(v: any) => setClosesAt(v)}
        />
      </div>
      <div className="mt-2">
        <Button onClick={onAddSchedule} className="w-full">
          Save
        </Button>
      </div>
    </div>
  );
}

export default CreateScheduleForm;
