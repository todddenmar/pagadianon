import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

function CustomButton({
  children,
  onClick,
  className,
  type,
}: {
  children: any;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        'bg-highlight hover:bg-highlight_hover transition-colors',
        className
      )}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
