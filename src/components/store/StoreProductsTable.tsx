import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '../ui/card';
import { useAppStore } from '@/lib/store';
import { ProductType } from '@/typings';
import { MoreHorizontalIcon } from 'lucide-react';
import LoadingComponent from '../admin/LoadingComponent.';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import CustomMultiImagePicker from '../CustomComponents/CustomMultiImagePicker';

function StoreProductsTable() {
  const [currentStoreProducts] = useAppStore((state) => [
    state.currentStoreProducts,
  ]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductType>(
    null
  );
  const [selectedImages, setSelectedImages] = useState<
    null | string[] | undefined
  >(null);
  if (!currentStoreProducts) return <LoadingComponent />;
  return (
    <Card className="p-3">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Compare At Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStoreProducts?.map((item: ProductType, idx: number) => {
            return (
              <TableRow key={`product-item-${idx}`}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.compareAtPrice}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setIsOpenImageModal(true);
                          setSelectedProduct(item);
                          setSelectedImages(item.images);
                        }}
                      >
                        Images
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={isOpenImageModal} onOpenChange={setIsOpenImageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select images for this product</DialogTitle>
            <DialogDescription>
              These images are uploaded by the admin.
            </DialogDescription>
          </DialogHeader>
          <CustomMultiImagePicker
            value={selectedImages}
            onChange={(val) => setSelectedImages(val)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default StoreProductsTable;
