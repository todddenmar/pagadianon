import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { PackageSearchIcon } from 'lucide-react';

function TrackOrderButton() {
  const [orderLink, setOrderLink] = useState('');
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className="hidden lg:block">
          <Button variant="ghost">Track Order</Button>
        </DialogTrigger>
        <DialogTrigger asChild className="block lg:hidden">
          <Button variant="ghost">
            <PackageSearchIcon className="h-[20px]" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Track Order Here</DialogTitle>
          </DialogHeader>
          <div className="flex space-x-2 items-center">
            <Input
              value={orderLink}
              onChange={(val) => setOrderLink(val.target.value)}
            />
            <a
              className="p-2 bg-highlight hover:bg-highlight_hover rounded-md text-neutral-950"
              href={`/order/${orderLink}`}
            >
              <PackageSearchIcon />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TrackOrderButton;
