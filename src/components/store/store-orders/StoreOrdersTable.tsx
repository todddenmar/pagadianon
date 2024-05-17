import { OrderType } from '@/typings';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getCartTotal, getOrderLinkByDate } from '@/helpers/appHelpers';
import { kOrderProgress } from '@/constants';
import moment from 'moment';
import CustomPesoIcon from '@/components/CustomComponents/CustomPesoIcon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';

function StoreOrdersTable({ orders }: { orders: OrderType[] }) {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);

  const orderByDate = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getStatusComponent = (status: string) => {
    switch (status) {
      case kOrderProgress.PENDING:
        return <Badge className="bg-orange-400 capitalize">{status}</Badge>;
      case kOrderProgress.RECEIVED:
        return <Badge className="bg-green-400 capitalize">{status}</Badge>;
      default:
        return <Badge className="capitalize">{status}</Badge>;
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="grid grid-cols-1 gap-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Store orders for this month</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="text-nowrap">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Fulfillment Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderByDate?.map((order, idx) => {
              const year = moment(new Date(order.createdAt)).format('YYYY');
              const month = moment(new Date(order.createdAt)).format('MM');
              return (
                <TableRow key={`customer-order-item-${idx}`}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell className="capitalize">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="capitalize">
                    {order.fulfillmentMethod}
                  </TableCell>
                  <TableCell>
                    <CustomPesoIcon />
                    {getCartTotal({
                      cart: order.cart.filter(
                        (cartItem) => cartItem.storeID === currentStoreData.id
                      ),
                    })}
                  </TableCell>
                  <TableCell className="capitalize">
                    {getStatusComponent(order.status)}
                  </TableCell>
                  <TableCell>
                    <Button asChild>
                      <a
                        href={getOrderLinkByDate({
                          orderID: order.id,
                          year,
                          month,
                        })}
                      >
                        View Order
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default StoreOrdersTable;
