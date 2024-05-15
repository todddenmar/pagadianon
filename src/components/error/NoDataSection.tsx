import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

function NoDataSection({
  title,
  href,
  linkText,
}: {
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="h-[500px] w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-3">
        <p className="capitalize">{title}</p>
        <Button
          className="bg-highlight hover:bg-highlight_hover transition-all font-semibold"
          asChild
        >
          <Link href={href || '/'}>{linkText || 'Go Back To Home'}</Link>
        </Button>
      </div>
    </div>
  );
}

export default NoDataSection;
