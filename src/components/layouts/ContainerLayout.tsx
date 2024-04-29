import React from 'react';

function ContainerLayout({ children }: any) {
  return (
    <div className="max-w-[1500px] w-full mx-auto p-2 md:px-5 ">{children}</div>
  );
}

export default ContainerLayout;
