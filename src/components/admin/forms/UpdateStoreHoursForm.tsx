import { useAppStore } from '@/lib/store';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EditIcon, LoaderCircleIcon, MinusIcon, MoonIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { kDaysArrayData } from '@/constants';
import CreateScheduleForm from './CreateScheduleForm';
import CustomDayTimePicker from '@/components/CustomComponents/CustomDayTimePicker';
import { StoreType } from '@/typings';

function UpdateStoreHoursForm({
  store,
  onChange,
}: {
  store: StoreType;
  onChange: (val: any) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [daySelected, setDaySelected] = useState<any | null>(null);
  const [dayTime, setDayTime] = useState<any | null>(null);
  const [schedules, setSchedules] = useState<any>(null);

  useEffect(() => {
    setSchedules(store?.schedules);
  }, [store]);

  const onUpdate = () => {
    if (!schedules) return;
    const updatedSchedule = { ...schedules, [daySelected]: dayTime };
    setSchedules(updatedSchedule);
    setDayTime(null);
    setDaySelected(null);
    setIsEditing(false);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 sm:flex gap-5 justify-between">
            <div className="grid gap-3">
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Assign opening hours of your gym depending on the days of week.
              </CardDescription>
            </div>
            <Dialog open={isAdding} onOpenChange={setIsAdding}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAdding(true)}>
                  Reset Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Schedule</DialogTitle>
                  <DialogDescription>
                    A type of schedule to assign on the days of the week.
                  </DialogDescription>
                </DialogHeader>
                <CreateScheduleForm
                  onChange={(val) => setSchedules(val)}
                  setClose={() => setIsAdding(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {schedules && (
            <div className="grid gap-5">
              {kDaysArrayData?.map((item, idx) => {
                if (schedules[item]) {
                  const { opensAt, closesAt } = schedules[item];
                  return (
                    <div
                      key={`sched-item-${idx}`}
                      className="grid sm:flex justify-between border rounded-md p-3 gap-3"
                    >
                      <div className="text-left">{item}</div>
                      <div className="flex gap-2  md:gap-5 items-center">
                        <div>
                          {opensAt.hour} : {opensAt.minute} {opensAt.period}
                        </div>
                        <MinusIcon className="h-5" />
                        <div>
                          {closesAt.hour} : {closesAt.minute} {closesAt.period}
                        </div>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setDaySelected(item);
                            setDayTime({ opensAt, closesAt });
                          }}
                        >
                          <EditIcon className="h-5 " />
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`sched-item-${idx}`}
                      className="grid sm:flex gap-3 justify-between border rounded-md p-3 text-neutral-500"
                    >
                      <div>{item}</div>
                      <div className="flex gap-2 md:gap-5 items-center ">
                        <div className="flex gap-2 items-center">
                          <MoonIcon className="h-5" /> Closed at this day
                        </div>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setDaySelected(item);
                          }}
                        >
                          <EditIcon className="h-5 " />
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
          <div className="mt-5">
            <Button onClick={() => onChange(schedules)}>
              Save Business Hours
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Time</DialogTitle>
            <DialogDescription>
              Change the business hours for this day
            </DialogDescription>
          </DialogHeader>
          <CustomDayTimePicker value={dayTime} onChange={setDayTime} />
          <Button onClick={onUpdate}>Update</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateStoreHoursForm;
