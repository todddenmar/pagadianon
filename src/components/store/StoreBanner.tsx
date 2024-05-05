import { OmitUndefined } from 'class-variance-authority/types';
import React from 'react';
import ContainerLayout from '../layouts/ContainerLayout';

function StoreBanner({
  title,
  description,
}: {
  title: string;
  description: string | null | undefined;
}) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900">
      <ContainerLayout>
        <div className="h-[200px] md:h-[250px] py-5 flex flex-col justify-center text-center md:text-start">
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
          <p className="mt-2 md:mt-5">{description}</p>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default StoreBanner;
