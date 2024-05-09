import React, { useState } from 'react';

import { TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useAppStore } from '@/lib/store';
import { getCartTotal, pluralizeNumber } from '@/helpers/appHelpers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CartList from './CartList';
import { ScrollArea } from '@/components/ui/scroll-area';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
function CartContent({ setClose }: { setClose: () => void }) {
  const [currentUserCart, setCurrentUserCart] = useAppStore((state) => [
    state.currentUserCart,
    state.setCurrentUserCart,
  ]);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const onClearCart = () => {
    setCurrentUserCart([]);
    setIsClearingCart(false);
    setClose();
  };
  return (
    <div className="">
      <div className="flex flex-col h-[600px] md:h-screen justify-between flex-1 p-5">
        <div>
          <div className="text-2xl font-bold">Cart</div>
          <div>
            <div className="flex justify-between items-center">
              <div>
                {currentUserCart.length === 0
                  ? 'Your cart is empty'
                  : pluralizeNumber({
                      plural: 'Items',
                      singular: 'Item',
                      number: currentUserCart.length,
                    })}
              </div>
              <div>
                {currentUserCart.length > 0 && (
                  <Button
                    onClick={() => setIsClearingCart(true)}
                    variant={'destructive'}
                    className="flex items-center space-x-2"
                  >
                    <TrashIcon className="h-5" />
                    <span>Clear Cart</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {currentUserCart.length > 0 && (
          <div className="mt-5 w-full flex-1">
            <ScrollArea className="h-full w-full rounded-md border p-2">
              <CartList />
            </ScrollArea>
          </div>
        )}
        {currentUserCart.length > 0 && (
          <div className="flex justify-between mt-5 ">
            <div className="text-xl">Total:</div>
            <div className="text-2xl font-bold">
              <CustomPesoIcon />
              {getCartTotal({ cart: currentUserCart })}
            </div>
          </div>
        )}

        {currentUserCart.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button variant={'destructive'} onClick={setClose}>
              Cancel
            </Button>
            <Button>Checkout</Button>
          </div>
        )}
      </div>
      <Dialog open={isClearingCart} onOpenChange={setIsClearingCart}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently clear the
              cart.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-5">
            <Button
              onClick={() => setIsClearingCart(false)}
              variant={'destructive'}
            >
              Cancel
            </Button>
            <Button onClick={onClearCart} variant={'default'}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CartContent;
