import React from 'react';
import CustomCopyButton from './CustomCopyButton';

function CustomEmailLink({
  email,
  children,
}: {
  email: string;
  children: any;
}) {
  return (
    <div className="flex gap-2 items-center rounded-md bg-neutral-300 dark:bg-neutral-950 p-1">
      <a
        href={`mailTo:${email}`}
        className="flex  gap-2 items-center hover:dark:bg-neutral-200 sm:w-fit bg-white dark:bg-white dark:text-black  pl-2 pr-3 py-2 rounded-md font-bold capitalize"
      >
        {children}
      </a>
      <CustomCopyButton text={email} label={'Copy Email'} />
    </div>
  );
}

export default CustomEmailLink;
