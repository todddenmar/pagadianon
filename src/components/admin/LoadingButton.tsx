import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

function LoadingButton({
  isLoading,
  onClick,
  text,
  variant,
  className,
  disabled,
}: {
  isLoading: boolean;
  onClick: any;
  text: string;
  variant:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <Button
          className={cn('w-full flex gap-1', className)}
          variant={variant}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </Button>
      )}
    </div>
  );
}

export default LoadingButton;
