import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAppStore } from '@/lib/store';
import { ProductType, VariantStockItemType, VariantType } from '@/typings';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontalIcon } from 'lucide-react';
import UpdateProductVariantForm from '../forms/UpdateProductVariantForm';

function StoreStocksTable() {
  const [currentStoreProducts] = useAppStore((state) => [
    state.currentStoreProducts,
  ]);
  const [isUpdatingStocks, setIsUpdatingStocks] = useState(false);
  const [variantStock, setVariantStock] = useState<VariantStockItemType | null>(
    null
  );
  let productVariants: VariantStockItemType[] = [];
  currentStoreProducts?.forEach((product: ProductType) => {
    product.variants?.map((variant: VariantType) => {
      productVariants.push({
        productID: product.id,
        variantID: variant.id,
        productName: product.name,
        variantName: variant.name,
        stock: variant.stock,
        isAllowingOrder: variant.isAllowingOrder || false,
        isContinueSelling: variant.isContinueSelling || false,
      });
    });
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="grid grid-cols-1 gap-2">
              <CardTitle>Stocks</CardTitle>
              <CardDescription>
                A list of product variants for stocks update
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Variant Type</TableHead>
                <TableHead className="text-center">Allow Order</TableHead>
                <TableHead className="text-center">Stock Quantity</TableHead>
                <TableHead className="text-center">Continue Selling</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productVariants?.map((item: any, idx: number) => {
                return (
                  <TableRow key={`variant-item-${idx}`}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.variantName}</TableCell>
                    <TableCell className="text-center">
                      {item.isAllowingOrder ? (
                        <Badge variant={'default'}>Yes</Badge>
                      ) : (
                        <Badge variant={'destructive'}>No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.stock?.quantity || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.isContinueSelling ? (
                        <Badge variant={'default'}>Yes</Badge>
                      ) : (
                        <Badge variant={'destructive'}>No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setIsUpdatingStocks(true);
                              setVariantStock(item);
                            }}
                          >
                            Update Stocks
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isUpdatingStocks} onOpenChange={setIsUpdatingStocks}>
        {variantStock && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Stock Update</DialogTitle>
              <DialogDescription className="flex items-center gap-1">
                <span>{variantStock.variantName}</span>
                <span>{variantStock.productName}</span>
              </DialogDescription>
            </DialogHeader>
            <div>
              <UpdateProductVariantForm
                variantStock={variantStock}
                setClose={() => setIsUpdatingStocks(false)}
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default StoreStocksTable;
