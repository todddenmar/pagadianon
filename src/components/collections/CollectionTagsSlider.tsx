import React from 'react';
import { Badge } from '../ui/badge';

function CollectionTagsSlider({ tags }: { tags: string[] }) {
  return (
    <div className="inline-flex flex-wrap gap-2 py-5">
      {tags?.map((tag: string, idx: number) => {
        return <Badge key={`collection-badge-${idx}`}>{tag}</Badge>;
      })}
    </div>
  );
}

export default CollectionTagsSlider;
