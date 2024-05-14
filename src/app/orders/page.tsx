import NoDataSection from '@/components/error/NoDataSection';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import CustomerOrdersTable from '@/components/order/CustomerOrdersTable';
import { dbGetOrdersByEmail } from '@/helpers/firebaseHelpers';
import { OrderType } from '@/typings';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function CustomerOrdersPage() {
  const { userId } = auth();
  if (!userId) return <NoDataSection title="Not signed in" />;
  const user = await currentUser();
  let orders: any[] = [];
  if (!user?.primaryEmailAddress?.emailAddress) {
    return <NoDataSection title="Email Not Found" />;
  }
  const res = await dbGetOrdersByEmail({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  if (res.status === 'error') {
    console.log(res.error);
    return;
  }
  orders = res.data || [];
  return (
    <div>
      <ContainerLayout>
        <Card>
          <CardHeader>
            <CardTitle>Customer Orders</CardTitle>
            <CardDescription>These are your orders this month</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerOrdersTable orders={orders} />
          </CardContent>
        </Card>
      </ContainerLayout>
    </div>
  );
}

export default CustomerOrdersPage;
