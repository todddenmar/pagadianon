'use client';
import CustomTagsSlider from '@/components/CustomComponents/CustomTagsSlider';
import CustomPageHeader from '@/components/CustomPageHeader';
import AllCollectionsSection from '@/components/collections/AllCollectionsSection';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import { Input } from '@/components/ui/input';
import { CollectionType } from '@/typings';
import React, { useEffect, useState } from 'react';

function CollectionsPage() {
  return (
    <ContainerLayout>
      <AllCollectionsSection />
    </ContainerLayout>
  );
}

export default CollectionsPage;
