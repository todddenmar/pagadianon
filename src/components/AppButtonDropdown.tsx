import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StoreType } from '@/typings';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import LoadingComponent from './admin/LoadingComponent.';
import { LoaderIcon } from 'lucide-react';
function AppButtonDropdown() {
  const { userId, orgId, has } = useAuth();

  const [isOpenMyApps, setIsOpenMyApps] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [currentUserData, currentSettings] = useAppStore((state) => [
    state.currentUserData,
    state.currentSettings,
  ]);
  if (!currentUserData)
    return (
      <div className="text-sm">
        <LoaderIcon className="h-[16px] animate-spin" />
      </div>
    );
  let hasAdminPermission = false;
  if (userId && orgId) {
    hasAdminPermission = has({ permission: 'org:admin:access' });
  }

  const myStores = currentUserData?.stores.map(
    (storeID: string, idx: number) => {
      const store = currentSettings?.stores.find(
        (item: StoreType) => item.id === storeID
      );
      return store;
    }
  );

  return (
    <div>
      <DropdownMenu open={isOpenDropDown} onOpenChange={setIsOpenDropDown}>
        <DropdownMenuTrigger asChild>
          <button className="text-sm px-3 py-1 rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-700 transition-all">
            Account
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {currentUserData.email.split('@')[0]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenMyApps(true)}>
            Stores
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenDropDown(false)}>
            <Link href="/orders" legacyBehavior passHref>
              Orders
            </Link>
          </DropdownMenuItem>
          {userId && orgId && hasAdminPermission && (
            <DropdownMenuItem onClick={() => setIsOpenDropDown(false)}>
              <Link href="/admin" legacyBehavior passHref>
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {currentUserData?.stores.length > 0 && (
        <Dialog open={isOpenMyApps} onOpenChange={setIsOpenMyApps}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Stores Managed</DialogTitle>
              <DialogDescription>
                A list of stores you manage.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[300px] w-full rounded-md p-2">
              <div className="grid grid-cols-1 gap-2">
                {myStores
                  .sort((a: StoreType, b: StoreType) =>
                    a.name < b.name ? -1 : 1
                  )
                  .map((store: StoreType, idx: number) => {
                    return (
                      <Link
                        href={`/store/${store?.slug}`}
                        key={`stores-${idx}`}
                        className="p-3 rounded-md border  hover:bg-neutral-100 hover:dark:bg-neutral-900 transition-all"
                        onClick={() => setIsOpenMyApps(false)}
                      >
                        <span className="font-semibold">{store?.name}</span>
                      </Link>
                    );
                  })}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default AppButtonDropdown;
