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
    <div className="flex gap-2 items-center rounded-full bg-neutral-200 dark:bg-neutral-950 p-1  pr-2">
      <a
        href={`mailTo:${email}`}
        className="flex  gap-2 items-center  sm:w-fit bg-highlight hover:bg-highlight_hover dark:text-black  pl-2 pr-3 py-2 rounded-full font-semibold capitalize"
      >
        {children}
      </a>
      <CustomCopyButton text={email} label={'Copy Email'} />
    </div>
  );
}

export default CustomEmailLink;
