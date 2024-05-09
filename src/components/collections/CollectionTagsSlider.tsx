import React from 'react';
import { Badge } from '../ui/badge';

function CollectionTagsSlider({
  tags,
  value,
  onChange,
}: {
  tags: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-2 py-5 capitalize">
      <Badge
        className="cursor-pointer"
        onClick={() => onChange('all')}
        variant={value === 'all' ? 'default' : 'secondary'}
      >
        all
      </Badge>
      {tags
        .sort((a, b) => (a < b ? -1 : 1))
        ?.map((tag: string, idx: number) => {
          return (
            <Badge
              className="cursor-pointer"
              onClick={() => onChange(tag)}
              key={`collection-badge-${idx}`}
              variant={value === tag ? 'default' : 'secondary'}
            >
              {tag}
            </Badge>
          );
        })}
    </div>
  );
}

export default CollectionTagsSlider;
