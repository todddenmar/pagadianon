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
import { ShoppingCartIcon, StoreIcon } from 'lucide-react';
import CartContent from './cart/CartContent';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StoreType } from '@/typings';

function Header() {
  const [
    currentUserCart,
    setCurrentUserCart,
    currentUserData,
    currentSettings,
  ] = useAppStore((state) => [
    state.currentUserCart,
    state.setCurrentUserCart,
    state.currentUserData,
    state.currentSettings,
  ]);
  const [isOpenCartSheet, setIsOpenCartSheet] = useState(false);
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const [isOpenMyApps, setIsOpenMyApps] = useState(false);
  return (
    <div className="h-[60px] flex flex-col justify-center shadow-sm px-2 md:px-5 sticky top-0 z-50 dark:bg-neutral-950 bg-white">
      <ContainerLayout>
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 items-center">
            <Link href={'/'} className="text-x md:text-sm">
              <span className="hidden md:block">PAGADIANON</span>
              <span className="block md:hidden">PGDN</span>
            </Link>
            <div className="relative z-50 hidden lg:block">
              <CustomNavMenu />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center space-x-2">
              {currentUserData?.stores.length > 0 && (
                <Dialog open={isOpenMyApps} onOpenChange={setIsOpenMyApps}>
                  <DialogTrigger asChild>
                    <Button variant={'secondary'}>My Stores</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Stores Managed</DialogTitle>
                      <DialogDescription>
                        A list of stores you manage.
                      </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="h-[300px] w-full rounded-md  p-2">
                      <div className="grid w-fit gap-3 ">
                        {currentUserData?.stores.map(
                          (storeID: string, idx: number) => {
                            const store = currentSettings?.stores.find(
                              (item: StoreType) => item.id === storeID
                            );
                            return (
                              <Link
                                href={`/store/${store?.slug}`}
                                key={`stores-${idx}`}
                                className="p-3 rounded-md border hover:bg-neutral-900 transition-all"
                                onClick={() => setIsOpenMyApps(false)}
                              >
                                <span className="font-semibold">
                                  {store?.name}
                                </span>
                                <p className="text-sm text-neutral-400">
                                  {store?.description}
                                </p>
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
              <button
                onClick={() => setIsOpenCartSheet(true)}
                className="relative hidden md:block px-2"
              >
                {currentUserCart.length > 0 && (
                  <span className="h-[15px] w-[15px] rounded-full absolute top-0 text-white right-[10px] bg-red-500 text-xs flex flex-col items-center justify-center">
                    {currentUserCart.length}
                  </span>
                )}
                <ShoppingCartIcon className="h-5" />
              </button>
              <button
                onClick={() => setIsOpenCartDrawer(true)}
                className="relative block md:hidden px-2"
              >
                {currentUserCart.length > 0 && (
                  <span className="h-[15px] w-[15px] rounded-full absolute top-0 text-white right-[10px] bg-red-500 text-xs flex flex-col items-center justify-center">
                    {currentUserCart.length}
                  </span>
                )}
                <ShoppingCartIcon className="h-5" />
              </button>
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
