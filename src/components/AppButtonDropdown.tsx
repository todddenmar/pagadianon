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
import {
  ExternalLinkIcon,
  LayoutDashboardIcon,
  LoaderIcon,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
function AppButtonDropdown() {
  const { userId, orgId, has } = useAuth();

  const [isOpenMyApps, setIsOpenMyApps] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [currentUserData, currentSettings] = useAppStore((state) => [
    state.currentUserData,
    state.currentSettings,
  ]);
  if (!currentUserData) return null;
  let hasAdminPermission = false;
  if (userId && orgId) {
    hasAdminPermission = has({ permission: 'org:admin:access' });
  }
  const myStores = currentUserData?.stores?.map(
    (storeID: string, idx: number) => {
      const store = currentSettings?.stores?.find(
        (item: StoreType) => item.id === storeID
      );
      return store;
    }
  );

  return (
    <div>
      <DropdownMenu open={isOpenDropDown} onOpenChange={setIsOpenDropDown}>
        <DropdownMenuTrigger asChild>
          <button className="text-sm px-3 py-1 rounded-full bg-highlight hover:bg-highlight_hover text-neutral-950 transition-all">
            Account
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {currentUserData.email.split('@')[0]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {myStores && (
            <DropdownMenuItem onClick={() => setIsOpenMyApps(true)}>
              Stores
            </DropdownMenuItem>
          )}
          <Link href="/orders">
            <DropdownMenuItem onClick={() => setIsOpenDropDown(false)}>
              Orders
            </DropdownMenuItem>
          </Link>

          {userId && orgId && hasAdminPermission && (
            <Link href="/admin">
              <DropdownMenuItem onClick={() => setIsOpenDropDown(false)}>
                Dashboard
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpenMyApps} onOpenChange={setIsOpenMyApps}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stores Managed</DialogTitle>
            <DialogDescription>A list of stores you manage.</DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[300px] w-full rounded-md ">
            <div className="grid grid-cols-1 gap-2">
              {myStores
                ?.sort((a: StoreType, b: StoreType) =>
                  a.name < b.name ? -1 : 1
                )
                .map((store: StoreType, idx: number) => {
                  return (
                    <div
                      key={`stores-${idx}`}
                      className="grid grid-cols-2 p-3 rounded-md border items-center bg-neutral-900"
                    >
                      <div className="font-semibold text-sm flex-1">
                        {store?.name}
                      </div>
                      <div className="flex items-center justify-around gap-2 mt-2">
                        <button
                          onClick={() => setIsOpenMyApps(false)}
                          className="border-l px-3"
                        >
                          <Link
                            href={`/store/${store?.slug}`}
                            className="flex items-center gap-2 text-sm text-highlight"
                          >
                            <ExternalLinkIcon className="h-4" />
                            <span>Page</span>
                          </Link>
                        </button>
                        <button
                          onClick={() => setIsOpenMyApps(false)}
                          className="border-l px-3"
                        >
                          <Link
                            href={`/store/${store?.slug}/dashboard`}
                            className="flex items-center gap-2 text-sm text-highlight"
                          >
                            <LayoutDashboardIcon className="h-4" />
                            <span>Dashboard</span>
                          </Link>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AppButtonDropdown;
