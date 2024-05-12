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
    <div className="flex gap-2 items-center rounded-full bg-neutral-200 dark:bg-neutral-950 p-1 pr-2">
      <a
        href={`tel:+63${mobileNumber}`}
        className="flex gap-2 items-center bg-highlight hover:bg-highlight_hover transition-all dark:text-black w-fit pl-2 pr-3 py-2 rounded-full font-semibold capitalize"
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
