import { useAppStore } from '@/lib/store';
import React, { useState } from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import CartContent from './CartContent';

function CartButton() {
  const [
    currentUserCart,
    isSheetCartOpen,
    setIsSheetCartOpen,
    isDrawerCartOpen,
    setIsDrawerCartOpen,
  ] = useAppStore((state) => [
    state.currentUserCart,
    state.isSheetCartOpen,
    state.setIsSheetCartOpen,
    state.isDrawerCartOpen,
    state.setIsDrawerCartOpen,
  ]);
  return (
    <div>
      <button
        onClick={() => setIsSheetCartOpen(true)}
        className="relative hidden md:block  dark:bg-neutral"
      >
        {currentUserCart.length > 0 && (
          <span className="h-[15px] w-[15px] rounded-full absolute -top-[8px] text-white -right-[4px] bg-red-500 text-xs flex flex-col items-center justify-center">
            {currentUserCart.length}
          </span>
        )}
        <ShoppingCartIcon className="h-5" />
      </button>
      <button
        onClick={() => setIsDrawerCartOpen(true)}
        className="relative block md:hidden  dark:bg-neutral"
      >
        {currentUserCart.length > 0 && (
          <span className="h-[15px] w-[15px] rounded-full absolute -top-[8px] text-white -right-[4px] bg-red-500 text-xs flex flex-col items-center justify-center">
            {currentUserCart.length}
          </span>
        )}
        <ShoppingCartIcon className="h-5" />
      </button>
      <Sheet open={isSheetCartOpen} onOpenChange={setIsSheetCartOpen}>
        <SheetContent className="p-0">
          <CartContent setClose={() => setIsSheetCartOpen(false)} />
        </SheetContent>
      </Sheet>
      <Drawer open={isDrawerCartOpen} onOpenChange={setIsDrawerCartOpen}>
        <DrawerContent>
          <CartContent setClose={() => setIsDrawerCartOpen(false)} />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default CartButton;
