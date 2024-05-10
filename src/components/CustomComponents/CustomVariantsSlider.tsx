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
  return (
    <div className="inline-flex flex-wrap gap-2 capitalize">
      <Badge
        className="cursor-pointer"
        onClick={() => onChange('all')}
        variant={value === 'all' ? 'default' : 'secondary'}
      >
        all
      </Badge>
      {variants
        .sort((a, b) => (a < b ? -1 : 1))
        ?.map((variant: VariantType, idx: number) => {
          return (
            <Badge
              className="cursor-pointer"
              onClick={() => onChange(variant.name)}
              key={`variant-type-tag-${idx}`}
              variant={
                compareEqualStrings(value, variant.name)
                  ? 'default'
                  : 'secondary'
              }
            >
              {variant.name}
            </Badge>
          );
        })}
    </div>
  );
}

export default CustomVariantsSlider;
