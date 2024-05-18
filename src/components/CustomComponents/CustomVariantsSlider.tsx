import React from 'react';
import { Badge } from '../ui/badge';
import { VariantType } from '@/typings';
import { compareEqualStrings } from '@/helpers/appHelpers';

function CustomVariantsSlider({
  variants,
  value,
  onChange,
}: {
  variants: VariantType[];
  value: string;
  onChange: (val: string) => void;
}) {
  const uniqueObject: any = {};
  variants.forEach((item: VariantType) => {
    uniqueObject[item.name] = { name: item.name };
  });
  const uniqueVariants = Object.keys(uniqueObject);
  return (
    <div className="inline-flex flex-wrap gap-2 capitalize">
      <Badge
        className="cursor-pointer"
        onClick={() => onChange('all')}
        variant={value === 'all' ? 'default' : 'secondary'}
      >
        all
      </Badge>
      {uniqueVariants
        .sort((a, b) => (a < b ? -1 : 1))
        ?.map((variant: string, idx: number) => {
          return variant === 'default' ? null : (
            <Badge
              className="cursor-pointer"
              onClick={() => onChange(variant)}
              key={`variant-type-tag-${idx}`}
              variant={
                compareEqualStrings(value, variant) ? 'default' : 'secondary'
              }
            >
              {variant}
            </Badge>
          );
        })}
    </div>
  );
}

export default CustomVariantsSlider;
