'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@clerk/nextjs';
import { kSaasCategories, kStoreTypes } from '@/constants';
import { useAppStore } from '@/lib/store';
import { StoreType } from '@/typings';

const components: {
  slug: string;
  title: string;
  path: string;
  description: string;
}[] = kSaasCategories;

export function CustomNavMenu() {
  const { userId, orgId, has } = useAuth();
  const [currentUserData, currentSettings] = useAppStore((state) => [
    state.currentUserData,
    state.currentSettings,
  ]);
  let hasAdminPermission = false;
  if (userId && orgId) {
    hasAdminPermission = has({ permission: 'org:admin:access' });
  }
  console.log({ currentUserData, currentSettings });
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <div className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Our Services
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    We connect businesses and customers in this app.
                  </p>
                </div>
              </li>
              {kStoreTypes.map((item, idx) => {
                return (
                  <Link href={`/${item.slug}`} key={`store-type-${idx}`}>
                    <ListItem title={item.name}>{item.description}</ListItem>
                  </Link>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Software Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <Link href={component.path} key={component.title}>
                  <ListItem title={component.title}>
                    {component.description}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {currentUserData?.stores.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>My Apps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-fit gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {currentUserData?.stores.map((storeID: string, idx: number) => {
                  const store = currentSettings?.stores.find(
                    (item: StoreType) => item.id === storeID
                  );
                  console.log({ store });
                  return (
                    <Link
                      href={`/${store?.saasTypeSlug}/${store?.slug}`}
                      key={`stores-${idx}`}
                    >
                      <ListItem title={store?.name}>
                        {store?.description}
                      </ListItem>
                    </Link>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        {userId && orgId && hasAdminPermission && (
          <NavigationMenuItem>
            <Link href="/admin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
