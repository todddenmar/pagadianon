'use client';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import ContainerLayout from './layouts/ContainerLayout';
import { ThemeToggler } from './ThemeToggler';
import { CustomNavMenu } from './CustomComponents/CustomNavMenu';
import MobileMenu from './MobileMenu';
import { useAppStore } from '@/lib/store';
import { ShoppingCartIcon } from 'lucide-react';
import CartContent from './cart/CartContent';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

import AppButtonDropdown from './AppButtonDropdown';

function Header() {
  const [currentUserCart] = useAppStore((state) => [state.currentUserCart]);
  const [isOpenCartSheet, setIsOpenCartSheet] = useState(false);
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const { userId, orgId, has } = useAuth();
  console.log({
    userId,
    orgId,
    hasAccess: orgId ? has({ permission: 'org:admin:access' }) : false,
  });

  return (
    <div className="h-[60px] flex flex-col justify-center shadow-sm px-2 md:px-5 sticky top-0 z-50 dark:bg-neutral-950 bg-white">
      <ContainerLayout>
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 items-center ">
            <Link
              href={'/'}
              className="text-x md:text-sm  items-center space-x-1 hidden dark:flex "
            >
              <img
                src="/images/pagadianon-light.svg"
                alt="pagadianon-light"
                className="h-[30px] w-[30px] hidden md:block "
              />
              <span className="hidden md:block font-bold">PAGADIANON</span>
              <span className="block md:hidden">
                <img
                  src="/images/pagadianon-light.svg"
                  alt="pagadianon-light"
                  className="h-[30px] w-[30px]"
                />
              </span>
            </Link>
            <Link
              href={'/'}
              className="text-x md:text-sm flex items-center space-x-1  dark:hidden"
            >
              <img
                src="/images/pagadianon-logo.svg"
                alt="pagadianon-logo"
                className="h-[30px] w-[30px] hidden md:block "
              />
              <span className="hidden md:block font-bold">PAGADIANON</span>
              <span className="block md:hidden">
                <img
                  src="/images/pagadianon-logo.svg"
                  alt="pagadianon-logo"
                  className="h-[30px] w-[30px]"
                />
              </span>
            </Link>
            <div className="relative z-50 hidden lg:block">
              <CustomNavMenu />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpenCartSheet(true)}
                className="relative hidden md:block  dark:bg-neutral"
              >
                {currentUserCart.length > 0 && (
                  <span className="h-[15px] w-[15px] rounded-full absolute -top-[10px] text-white right-[2px] bg-red-500 text-xs flex flex-col items-center justify-center">
                    {currentUserCart.length}
                  </span>
                )}
                <ShoppingCartIcon className="h-5" />
              </button>
              <button
                onClick={() => setIsOpenCartDrawer(true)}
                className="relative block md:hidden  dark:bg-neutral"
              >
                {currentUserCart.length > 0 && (
                  <span className="h-[15px] w-[15px] rounded-full absolute -top-[10px] text-white right-[2px] bg-red-500 text-xs flex flex-col items-center justify-center">
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
                <div className="rounded-full border px-3 hover:bg-neutral-50 hover:dark:bg-neutral-800 py-1 text-sm">
                  <SignInButton mode="modal" />
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-1 rounded-full border bg-neutral-200 dark:bg-neutral-900 p-1">
                  <AppButtonDropdown />
                  <UserButton afterSignOutUrl="/" />
                </div>
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
