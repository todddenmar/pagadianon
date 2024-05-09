'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import ContainerLayout from './layouts/ContainerLayout';
import { ThemeToggler } from './ThemeToggler';
import { CustomNavMenu } from './CustomComponents/CustomNavMenu';
import MobileMenu from './MobileMenu';
import { Button } from './ui/button';
import { useAppStore } from '@/lib/store';
import { ShoppingCartIcon } from 'lucide-react';
import CartContent from './cart/CartContent';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

function Header() {
  const [currentUserCart, setCurrentUserCart] = useAppStore((state) => [
    state.currentUserCart,
    state.setCurrentUserCart,
  ]);
  const [isOpenCartSheet, setIsOpenCartSheet] = useState(false);
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  return (
    <div className="h-[60px] flex flex-col justify-center shadow-sm px-2 md:px-5 sticky top-0 z-50 dark:bg-neutral-950 bg-white">
      <ContainerLayout>
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 items-center">
            <Link href={'/'} className="text-x md:text-sm">
              PAGADIANON
            </Link>
            <div className="relative z-50 hidden lg:block">
              <CustomNavMenu />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsOpenCartSheet(true)}
                variant={'ghost'}
                className="relative hidden md:block"
              >
                {currentUserCart.length > 0 && (
                  <span className="h-[15px] w-[15px] rounded-full absolute top-0 text-white right-[10px] bg-red-500 text-xs flex flex-col items-center justify-center">
                    {currentUserCart.length}
                  </span>
                )}
                <ShoppingCartIcon className="h-5" />
              </Button>
              <Button
                onClick={() => setIsOpenCartDrawer(true)}
                variant={'ghost'}
                className="relative block md:hidden"
              >
                {currentUserCart.length > 0 && (
                  <span className="h-[15px] w-[15px] rounded-full absolute top-0 text-white right-[10px] bg-red-500 text-xs flex flex-col items-center justify-center">
                    {currentUserCart.length}
                  </span>
                )}
                <ShoppingCartIcon className="h-5" />
              </Button>
              <Sheet open={isOpenCartSheet} onOpenChange={setIsOpenCartSheet}>
                <SheetContent className="p-0">
                  <CartContent setClose={() => setIsOpenCartSheet(false)} />
                </SheetContent>
              </Sheet>
              <Drawer
                open={isOpenCartDrawer}
                onOpenChange={setIsOpenCartDrawer}
              >
                <DrawerContent>
                    <CartContent setClose={() => setIsOpenCartDrawer(false)} />
                </DrawerContent>
              </Drawer>

              <ThemeToggler />
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <div className="block lg:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default Header;
