import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger className="border p-1.5 rounded-md">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-center">
        <div className="w-full">
          <ul className="grid">
            <li>
              <Link href={'/'} className="block w-full text-center">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
