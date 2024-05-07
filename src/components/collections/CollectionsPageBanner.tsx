import React from 'react';
import ContainerLayout from '../layouts/ContainerLayout';

function CollectionsPageBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-neutral-900 w-full h-[300px] flex flex-col justify-center">
      <ContainerLayout>
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default CollectionsPageBanner;
