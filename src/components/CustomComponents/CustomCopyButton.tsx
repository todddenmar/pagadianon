import React from 'react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CopyIcon } from 'lucide-react';

function CustomCopyButton({ text, label }: { text: string; label: string }) {
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard', {
      action: {
        label: 'Done',
        onClick: () => console.log('copied'),
      },
    });
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={onCopy}>
            <CopyIcon className="h-[18px]" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomCopyButton;
