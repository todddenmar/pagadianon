'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import ContainerLayout from './layouts/ContainerLayout';
import { ThemeToggler } from './ThemeToggler';
import { CustomNavMenu } from './CustomNavMenu';
import MobileMenu from './MobileMenu';

function Header() {
  return (
    <div className="h-[60px] flex flex-col justify-center shadow-sm px-2 md:px-5">
      <ContainerLayout>
        <div className="flex justify-between items-center">
          <Link href={'/'} className="text-x md:text-sm">
            PAGADIANON
          </Link>
          <div className="flex items-center gap-5">
            <div className="relative z-50 hidden md:block">
              <CustomNavMenu />
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggler />
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <div className="block md:hidden">
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
