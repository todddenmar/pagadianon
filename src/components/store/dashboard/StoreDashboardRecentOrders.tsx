import { OrderType } from '@/typings';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DashboardCardHeader from '@/components/admin/dashboard/DashboardCardHeader';
import { getCartTotal } from '@/helpers/appHelpers';
import { Skeleton } from '@/components/ui/skeleton';
import CustomPesoIcon from '@/components/CustomComponents/CustomPesoIcon';
import moment from 'moment';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/lib/store';
import { kOrderProgress } from '@/constants';
import { Badge } from '@/components/ui/badge';

function StoreDashboardRecentOrders({ orders }: { orders: OrderType[] }) {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
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
  if (!currentStoreData)
    return <Skeleton className="w-full max-w-[500px] h-[600px] rounded-lg" />;
  return (
    <div className="w-full lg:max-w-[500px]">
      <Card className="h-full flex flex-col">
        <DashboardCardHeader
          title="Recent Orders"
          description={'Orders made today.'}
        />
        <CardContent className="flex-1">
          <ScrollArea className="h-full px-4">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order, idx) => {
                  return (
                    <TableRow key={`recent-order-item-${idx}`}>
                      <TableCell className="font-medium">{`${idx + 1}`}</TableCell>
                      <TableCell className="text-nowrap">
                        {moment(new Date(order.createdAt)).format('h:mm a')}
                      </TableCell>
                      <TableCell className="capitalize">
                        {order.fulfillmentMethod}
                      </TableCell>
                      <TableCell className="capitalize">
                        {getStatusComponent(order.status)}
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end">
                        <CustomPesoIcon />{' '}
                        {getCartTotal({
                          cart: order.cart.filter(
                            (cartItem) =>
                              cartItem.storeID === currentStoreData.id
                          ),
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default StoreDashboardRecentOrders;
