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
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { kOrderProgress } from '@/constants';
import { Badge } from '../ui/badge';
import moment from 'moment';
import { Button } from '../ui/button';

function CustomerOrdersTable({ orders }: { orders: OrderType[] }) {
  const orderByDate = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getStatusComponent = (status: string) => {
    switch (status) {
      case kOrderProgress.PENDING:
        return <Badge className="bg-orange-400 capitalize">{status}</Badge>;
      case kOrderProgress.DELIVERED:
        return <Badge className="bg-green-400 capitalize">{status}</Badge>;
      default:
        return <Badge className="capitalize">{status}</Badge>;
    }
  };
  return (
    <div>
      <Table>
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
                  {getCartTotal({ cart: order.cart })}
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
    </div>
  );
}

export default CustomerOrdersTable;
