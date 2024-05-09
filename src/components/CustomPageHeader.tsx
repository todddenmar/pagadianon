import React from 'react';

function CustomPageHeader({
  title,
  description,
}: {
  title: String;
  description: string;
}) {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-2xl md:text-4xl font-bold ">{title}</h1>
      <p className="text-sm md:text-base  dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

export default CustomPageHeader;
