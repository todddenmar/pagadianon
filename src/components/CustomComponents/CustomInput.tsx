import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import CustomLabel from './CustomLabel';
import { Textarea } from '@/components/ui/textarea';

function CustomInput({
  label,
  value,
  onChange,
  icon,
  type,
  maxLength,
  isTextArea,
  prepend,
  rows,
}: {
  label?: string;
  value: number | string;
  onChange: any;
  icon?: any;
  type?: string;
  maxLength?: number | null;
  isTextArea?: boolean;
  prepend?: any;
  rows?: number;
}) {
  return (
    <div className="mb-0 ">
      {label && <CustomLabel label={label} />}
      <div className="relative flex items-center gap-2 ">
        {prepend && (
          <span
            className={cn({
              'pl-4': icon != undefined || icon != null,
              'mt-2': label != undefined || label != null,
            })}
          >
            {prepend}
          </span>
        )}
        <div className="relative w-full">
          {icon && (
            <div
              className={cn(
                'absolute left-1 top-2 bottom-0 flex flex-col items-center justify-center',
                {
                  'top-0': label == undefined || label == null,
                }
              )}
            >
              <span>{icon}</span>
            </div>
          )}
          {isTextArea ? (
            <Textarea
              rows={rows}
              className={cn({
                'pl-[30px]': icon != undefined || icon != null,
                'mt-2': label != undefined || label != null,
              })}
              value={value}
              onChange={(v) => {
                const inpt = v.target.value;
                if (maxLength) {
                  if (inpt.length > maxLength) {
                    return;
                  }
                  onChange(inpt);
                } else {
                  onChange(inpt);
                }

                onChange(inpt);
              }}
            />
          ) : (
            <Input
              type={type || 'text'}
              className={cn({
                'pl-[30px]': icon != undefined || icon != null,
                'mt-2': label != undefined || label != null,
              })}
              value={value}
              onChange={(v) => {
                const inpt = v.target.value;
                if (maxLength) {
                  if (inpt.length > maxLength) {
                    return;
                  }
                  onChange(inpt);
                } else {
                  onChange(inpt);
                }

                onChange(inpt);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomInput;
