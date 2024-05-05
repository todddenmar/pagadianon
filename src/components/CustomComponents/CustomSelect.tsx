import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import _ from 'lodash';
import { cn } from '@/lib/utils';
import CustomLabel from './CustomLabel';

function CustomSelect({
  items,
  value,
  onValueChange,
  label,
}: {
  items: { label: string; value: string }[];
  value: string;
  onValueChange: any;
  label?: string;
}) {
  return (
    <div className="mb-0 ">
      {label && <CustomLabel label={label} />}
      <Select defaultValue={value} value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn('w-full capitalize', {
            'mt-2': label != undefined || label != null,
          })}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item, idx) => {
            return (
              <SelectItem
                className="capitalize"
                key={`select-item-${idx}-${_.kebabCase(item.value)}`}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelect;
