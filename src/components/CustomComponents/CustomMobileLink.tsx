import React from 'react';
import CustomCopyButton from './CustomCopyButton';

function CustomMobileLink({
  mobileNumber,
  children,
}: {
  mobileNumber: string;
  children: any;
}) {
  return (
    <div className="flex gap-2 items-center rounded-md bg-neutral-300 dark:bg-neutral-950 p-1">
      <a
        href={`tel:+63${mobileNumber}`}
        className="flex gap-2 items-center hover:dark:bg-neutral-200 bg-white dark:bg-white dark:text-black w-fit pl-2 pr-3 py-2 rounded-md font-bold capitalize"
      >
        {children}
      </a>
      <CustomCopyButton
        text={`+63${mobileNumber}`}
        label={'Copy Mobile Number'}
      />
    </div>
  );
}

export default CustomMobileLink;
