import React, { useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';

function CustomTimePicker({ value, onChange }: { value: any; onChange: any }) {
  const hoursArray = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const minuteArray = ['00', '10', '20', '30', '40', '50'];

  const hoursItems = hoursArray.map((item) => ({ label: item, value: item }));
  const minuteItems = minuteArray.map((item) => ({
    label: item,
    value: item,
  }));
  const [hour, setHour] = useState(value?.hour || hoursItems[0].value);
  const [minute, setMinute] = useState(value?.minute || minuteItems[0].value);
  const [period, setPeriod] = useState(value?.period || 'AM');

  useEffect(() => {
    onChange({ hour, minute, period });
  }, [hour, minute, period]);

  return (
    <div>
      <div className="flex gap-5">
        <div className="flex-1 flex gap-2 items-end">
          <div className="w-[60px]">
            <CustomSelect
              items={hoursItems}
              value={hour}
              onValueChange={setHour}
            />
          </div>

          <div className="pb-2">:</div>
          <div className="w-[60px]">
            <CustomSelect
              items={minuteItems}
              value={minute}
              onValueChange={setMinute}
            />
          </div>
          <div className="w-[60px]">
            <CustomSelect
              items={[
                { label: 'AM', value: 'AM' },
                { label: 'PM', value: 'PM' },
              ]}
              value={period}
              onValueChange={setPeriod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTimePicker;
