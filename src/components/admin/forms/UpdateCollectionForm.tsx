import { CollectionType } from '@/typings';
import React from 'react';

function UpdateCollectionForm({
  collection,
  setClose,
}: {
  collection: CollectionType;
  setClose: () => void;
}) {
  return <div>{collection.name}</div>;
}

export default UpdateCollectionForm;
