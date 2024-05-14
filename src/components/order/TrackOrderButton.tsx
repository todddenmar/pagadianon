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
import { useRouter } from 'next/navigation';
import moment from 'moment';

function TrackOrderButton() {
  const [orderLink, setOrderLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    const date = new Date();
    const year = moment(date).format('YYYY');
    const month = moment(date).format('MM');
    if (orderLink === '') {
      return;
    }
    setIsOpen(false);
    router.push(`/order/${orderLink}?year=${year}&month=${month}`);
  };
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        className="hidden lg:block"
      >
        Track Order
      </Button>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        className="block lg:hidden"
      >
        <PackageSearchIcon className="h-[20px]" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter order ID here</DialogTitle>
          </DialogHeader>
          <div className="">
            <Input
              value={orderLink}
              onChange={(val) => setOrderLink(val.target.value)}
            />
            <div className="grid grid-cols-2 gap-5 mt-5">
              <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight_hover text-sm font-semibold"
                onClick={onSubmit}
              >
                <PackageSearchIcon className="h-5" /> Track Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TrackOrderButton;
