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
import { CollectionType } from '@/typings';
import { kSaasCategories } from '@/constants';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

function MobileMenu() {
  const { userId, orgId, has } = useAuth();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
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
    <Sheet open={isOpenMobileMenu} onOpenChange={setIsOpenMobileMenu}>
      <SheetTrigger className="border p-1.5 rounded-md">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-center">
        <div className="w-full">
          <ul className="grid">
            <li>
              <Link
                href={'/'}
                className="block w-full "
                onClick={() => setIsOpenMobileMenu(false)}
              >
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
                <ul className="grid gap-2 grid-cols-1 px-2">
                  {currentSettings?.collections?.map(
                    (item: CollectionType, idx: number) => {
                      return (
                        <Link
                          key={`store-type-${idx}`}
                          href={`/collections/${item.slug}`}
                          className="py-2"
                          onClick={() => setIsOpenMobileMenu(false)}
                        >
                          {item.name}
                        </Link>
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
                <ul className="grid gap-2 grid-cols-1 px-2">
                  {components.map((component) => (
                    <Link
                      href={component.path}
                      key={component.title}
                      className="py-2"
                      onClick={() => setIsOpenMobileMenu(false)}
                    >
                      {component.title}
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {userId && orgId && hasAdminPermission && (
            <Link
              href="/admin"
              className="my-4 block w-full"
              onClick={() => setIsOpenMobileMenu(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
