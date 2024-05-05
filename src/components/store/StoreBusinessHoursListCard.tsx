import { useAppStore } from '@/lib/store';
import React, { useState } from 'react';
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
import CreateScheduleForm from '../admin/forms/CreateScheduleForm';
import { useShallow } from 'zustand/react/shallow';
import CustomDayTimePicker from '../CustomComponents/CustomDayTimePicker';
import { dbUpdateStoreSchedules } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';

function StoreBusinessHoursListCard() {
  const [currentStoreData, setCurrentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData, state.setCurrentStoreData])
  );
  const schedules = currentStoreData?.schedules;
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [daySelected, setDaySelected] = useState<any | null>(null);
  const [dayTime, setDayTime] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const onUpdate = () => {
    const updatedSchedule = { ...schedules, [daySelected]: dayTime };
    setCurrentStoreData({
      ...currentStoreData,
      schedules: updatedSchedule,
      isPublished: false,
    });
    setDayTime(null);
    setDaySelected(null);
    setIsEditing(false);
  };

  const onSave = async () => {
    setIsLoading(true);
    const res = await dbUpdateStoreSchedules({
      id: currentStoreData.id,
      data: currentStoreData.schedules,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    toast.success('Business hours updated successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsLoading(false);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex gap-5 justify-between">
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
                <CreateScheduleForm setClose={() => setIsAdding(false)} />
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
                      className="flex justify-between border rounded-md p-3"
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
                      className="flex justify-between border rounded-md p-3 text-neutral-500"
                    >
                      <div>{item}</div>
                      <div className="flex gap-5 items-center">
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
          {isLoading ? (
            <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
              <span>
                <LoaderCircleIcon className="animate-spin" />
              </span>
            </div>
          ) : (
            <div className="mt-5">
              <Button onClick={onSave}>Save Business Hours</Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-fit">
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

export default StoreBusinessHoursListCard;
