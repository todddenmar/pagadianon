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
import { LoaderCircleIcon, MoreHorizontalIcon } from 'lucide-react';
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
import { Button } from '../ui/button';
import { dbUpdateProductImages } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';

function StoreProductsTable() {
  const [currentStoreProducts, setCurrentStoreProducts, currentStoreData] =
    useAppStore((state) => [
      state.currentStoreProducts,
      state.setCurrentStoreProducts,
      state.currentStoreData,
    ]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductType>(
    null
  );
  const [selectedImages, setSelectedImages] = useState<
    null | string[] | undefined
  >(null);
  if (!currentStoreProducts) return <LoadingComponent />;

  const onSaveImages = async () => {
    setIsLoading(true);
    if (!selectedProduct) return;
    const res = await dbUpdateProductImages({
      storeID: currentStoreData.id,
      productID: selectedProduct.id,
      data: selectedImages,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    const updateStoreProduct = { ...selectedProduct, images: selectedImages };
    const updatedProducts = currentStoreProducts.map((item) =>
      item.id === selectedProduct.id ? updateStoreProduct : item
    );
    setCurrentStoreProducts(updatedProducts);
    setIsLoading(false);
    toast.success('Product Images updated successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsOpenImageModal(false);
  };
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
          {isLoading ? (
            <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
              <span>
                <LoaderCircleIcon className="animate-spin" />
              </span>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 gap-5 pt-5">
              <Button onClick={onSaveImages}>Save Images</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default StoreProductsTable;
