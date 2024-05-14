'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { Separator } from '../../ui/separator';
import NoDataSection from '../../error/NoDataSection';
import StoreOrdersList from './StoreOrdersList';
import { dbGetStoreOrdersByID } from '@/helpers/firebaseHelpers';
import { OrderType } from '@/typings';
import moment from 'moment';
import LoadingComponent from '@/components/admin/LoadingComponent.';

function StoreOrdersSection({ slug }: { slug: string }) {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
  const [orders, setOrders] = useState<any>(null);

  const getStoreOrders = async () => {
    const date = new Date();
    const year = moment(date).format('YYYY');
    const month = moment(date).format('MM');
    const res = await dbGetStoreOrdersByID({
      id: currentStoreData.id,
      year: year,
      month: month,
    });
    if (res.status === 'errors') {
      console.log(res.error);
      return;
    }
    setOrders(res.data);
  };
  useEffect(() => {
    if (currentStoreData) getStoreOrders();
  }, [currentStoreData]);

  if (!currentStoreData) {
    return <NoDataSection title="Store data not found" />;
  }
  if (!orders) {
    return <LoadingComponent />;
  }
  if (orders.length === 0) {
    return <NoDataSection title="No Orders Found" />;
  }

  return (
    <ContainerLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/store/${currentStoreData.slug}`}>
                {currentStoreData.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-5 mt-3">
        <div className="flex justify-between space-x-5">
          <div>
            <h4 className="text-2xl font-semibold">Orders</h4>
            <p className="text-sm text-neutral-500">
              Store Orders for {currentStoreData.name}
            </p>
          </div>
        </div>
        <Separator className="my-5" />
        <div>
          <StoreOrdersList orders={orders} />
        </div>
      </Card>
    </ContainerLayout>
  );
}

export default StoreOrdersSection;
