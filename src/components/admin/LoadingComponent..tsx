import { LoaderIcon } from 'lucide-react';
import React from 'react';

function LoadingComponent() {
  return (
    <div className="h-[600px] w-full flex flex-col justify-center items-center">
      <div className="flex-col items-center justify-center text-center">
        <div className="flex gap-2 items-center justify-center">
          <LoaderIcon className="animate-spin" />
          <span className="text-2xl animate-pulse">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingComponent;
