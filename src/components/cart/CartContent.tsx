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
import CheckoutSection from '../checkout/CheckoutSection';
function CartContent({ setClose }: { setClose: () => void }) {
  const [currentUserCart, setCurrentUserCart] = useAppStore((state) => [
    state.currentUserCart,
    state.setCurrentUserCart,
  ]);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const onClearCart = () => {
    setCurrentUserCart([]);
    setIsClearingCart(false);
    setClose();
  };
  return (
    <div className="">
      <div className="flex flex-col h-[600px] md:h-screen justify-between flex-1 p-5">
        <div className="flex items-center justify-between md:mt-5">
          <div className="text-2xl font-bold">Cart</div>
          <div className="text-neutral-300 text-sm">
            {currentUserCart.length === 0
              ? 'Your cart is empty'
              : pluralizeNumber({
                  plural: 'Items',
                  singular: 'Item',
                  number: currentUserCart.length,
                })}
          </div>
        </div>
        {currentUserCart.length > 0 && (
          <div className="mt-5 w-full flex-1">
            <ScrollArea className="h-[400px] md:h-[600px] w-full p-2">
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
            <Button
              onClick={() => setIsClearingCart(true)}
              variant={'secondary'}
              className="flex items-center space-x-2"
            >
              <TrashIcon className="h-5" />
              <span>Clear Cart</span>
            </Button>
            <Button
              className="bg-highlight hover:bg-highlight_hover text-neutral-900"
              onClick={() => {
                setIsOpenCheckout(true);
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
      <Dialog open={isOpenCheckout} onOpenChange={setIsOpenCheckout}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Please fill up the required fields.
            </DialogDescription>
          </DialogHeader>
          <CheckoutSection setClose={() => setIsOpenCheckout(false)} />
        </DialogContent>
      </Dialog>
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
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              className="bg-highlight hover:bg-highlight_hover text-neutral-900"
              onClick={onClearCart}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CartContent;
