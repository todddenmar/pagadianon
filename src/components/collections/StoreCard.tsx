import { cn } from '@/lib/utils';
import { StoreType } from '@/typings';
import {
  CalendarXIcon,
  ClockIcon,
  ImageIcon,
  LoaderCircleIcon,
  LoaderIcon,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { kDaysArrayData } from '@/constants';
import moment from 'moment';

function StoreCard({ store }: { store: StoreType }) {
  console.log({ store });
  const [isclicked, setIsClicked] = useState(false);
  const tags = store?.tags?.split(',');

  const schedToday = getTimeSchedText();

  function getTimeSchedText() {
    const dateToday = new Date();
    const day = dateToday.getDay();
    if (!store.schedules) {
      console.log('no sched');
      return null;
    }
    const dayString = kDaysArrayData[day];
    const storeSched = store.schedules ? store.schedules[dayString] : null;
    if (!storeSched) {
      return null;
    }
    console.log({ storeSched });
    if (!storeSched.opensAt || !storeSched.closesAt) {
      return null;
    }
    const opensAt = `${storeSched.opensAt.hour}:${storeSched.opensAt.minute} ${storeSched.opensAt.period}`;
    const closesAt = `${storeSched.closesAt.hour}:${storeSched.closesAt.minute} ${storeSched.closesAt.period}`;
    console.log({ closesAt });

    const currentTime = dateToday.getTime();
    const closingDate = `${moment(dateToday).format(`MM/DD/YYYY`)} ${closesAt}`;
    const closeDateTime = new Date(closingDate).getTime();
    const timeUntilClose = closeDateTime - currentTime;
    const seconds = timeUntilClose / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    console.log({
      closeDateTime,
      currentTime,
      timeUntilClose,
      seconds,
      minutes,
      hours,
    });
    return { opensAt, closesAt };
  }

  if (!store) return <div>not found</div>;
  return (
    <div className="border rounded-xl overflow-hidden group bg-neutral-100 dark:bg-neutral-900 flex select-none relative">
      <div className="p-3 w-full flex-1">
        <div className="flex gap-3 relative">
          <div className="flex flex-col items-center justify-center relative h-[120px] sm:h-[150px] md:h-[120px] lg:h-[150px] xl:h-[150px] 2xl:h-[150px] aspect-square ">
            {store.logoURL ? (
              <Image
                src={store.logoURL}
                alt={store.name}
                width={150}
                height={150}
                className="object-contain rounded-xl group-hover:scale-105 transition-all"
              />
            ) : (
              <ImageIcon />
            )}
          </div>
          <div className="flex flex-col justify-between flex-1 w-full border-l px-3">
            <div>
              <div
                className={cn(
                  'text-sm sm:text-lg md:text-sm lg:text-lg xl:text-base 2xl:text-lg font-semibold '
                )}
              >
                {store.name}
              </div>
              <div className="text-xs sm:text-sm dark:text-neutral-400 line-clamp-2 md:line-clamp-2 lg:line-clamp-3">
                {store.description}
              </div>
            </div>
            <div className="  grid grid-cols-1 gap-2">
              {schedToday ? (
                <div className="text-xs sm:text-sm text-highlight gap-1 flex items-center">
                  <ClockIcon className="h-[16px]" />
                  <span>
                    {' '}
                    {`${schedToday?.opensAt} - ${schedToday?.closesAt}`}
                  </span>
                </div>
              ) : (
                <div className="text-sm text-red-500 gap-1 flex items-center">
                  <CalendarXIcon className="h-[16px]" />
                  <span>Closed Today</span>
                </div>
              )}
              <div className="inline-flex flex-nowrap gap-2 relative z-0">
                {tags.map((tag, idx) => (
                  <Badge
                    key={`${store.slug}-tag-${idx}`}
                    className="capitalize text-nowrap"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link href={`/store/${store.slug}`} onClick={() => setIsClicked(true)}>
        <div className=" w-[40px] h-full flex relative z-10  border-l transition-all  flex-col justify-center items-center hover:bg-highlight_hover bg-highlight text-neutral-900 font-bold ">
          {isclicked ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <span className="[writing-mode:vertical-lr] rotate-180 text-center flex text-sm">
              View Store
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

export default StoreCard;
