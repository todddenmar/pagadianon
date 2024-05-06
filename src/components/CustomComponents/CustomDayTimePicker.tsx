import React, { useEffect, useState } from 'react';
import CustomTimePicker from './CustomTimePicker';

function CustomDayTimePicker({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {
  const [opensAt, setOpensAt] = useState(value?.opensAt);
  const [closesAt, setClosesAt] = useState(value?.closesAt);
  useEffect(() => {
    onChange({ opensAt, closesAt });
  }, [opensAt, closesAt]);
  return (
    <div className="grid justify-between gap-5">
      <div className="grid  gap-5 items-center">
        <div className="flex gap-5 items-center">
          <div className="flex-1 text-sm">From:</div>
          <CustomTimePicker
            value={opensAt}
            onChange={(v: any) => setOpensAt(v)}
          />
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex-1 text-sm">To:</div>
          <CustomTimePicker
            value={closesAt}
            onChange={(v: any) => setClosesAt(v)}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomDayTimePicker;
