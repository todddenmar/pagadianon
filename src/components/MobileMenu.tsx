'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAppStore } from '@/lib/store';
import { CollectionType, StoreType } from '@/typings';
import { kSaasCategories } from '@/constants';
import { useAuth } from '@clerk/nextjs';

function MobileMenu() {
  const { userId, orgId, has } = useAuth();
  const [currentUserData, currentSettings] = useAppStore((state) => [
    state.currentUserData,
    state.currentSettings,
  ]);
  let hasAdminPermission = false;
  if (userId && orgId) {
    hasAdminPermission = has({ permission: 'org:admin:access' });
  }
  const components: {
    slug: string;
    title: string;
    path: string;
    description: string;
  }[] = kSaasCategories;
  return (
    <Sheet>
      <SheetTrigger className="border p-1.5 rounded-md">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-center">
        <div className="w-full">
          <ul className="grid">
            <li>
              <Link href={'/'} className="block w-full ">
                Home
              </Link>
            </li>
          </ul>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="no-underline">
                Our Services
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2 grid-cols-1">
                  {currentSettings?.collections?.map(
                    (item: CollectionType, idx: number) => {
                      return (
                        <li key={`store-type-${idx}`}>
                          <Link
                            href={`/collections/${item.slug}`}
                            className="py-2"
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="no-underline">
                Software Services
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2 grid-cols-1">
                  {components.map((component) => (
                    <Link href={component.path} key={component.title}>
                      {component.title}
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {currentUserData?.stores.length > 0 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="no-underline">
                  My Apps
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 grid-cols-1">
                    {currentUserData?.stores.map(
                      (storeID: string, idx: number) => {
                        const store = currentSettings?.stores.find(
                          (item: StoreType) => item.id === storeID
                        );
                        return (
                          <Link
                            href={`/store/${store?.slug}`}
                            key={`stores-${idx}`}
                          >
                            {store?.name}
                          </Link>
                        );
                      }
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {userId && orgId && hasAdminPermission && (
            <Link href="/admin" className="my-4 block w-full">
              Dashboard
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
