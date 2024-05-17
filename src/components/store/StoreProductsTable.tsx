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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useAppStore } from '@/lib/store';
import { ProductType } from '@/typings';
import { LoaderCircleIcon, MoreHorizontalIcon, PlusIcon } from 'lucide-react';
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
import { Badge } from '../ui/badge';
import CreateProductVariantForm from './forms/CreateProductVariantFrom';
import UpdateStoreProductForm from './forms/UpdateStoreProductForm';
import { Button } from '../ui/button';
import CreateStoreProductForm from './forms/CreateStoreProductForm';

function StoreProductsTable() {
  const [currentStoreProducts, setCurrentStoreProducts, currentStoreData] =
    useAppStore((state) => [
      state.currentStoreProducts,
      state.setCurrentStoreProducts,
      state.currentStoreData,
    ]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isOpenVariantsModal, setIsOpenVariantsModal] = useState(false);
  const [isEditingProductModal, setIsEditingProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductType>(
    null
  );
  const [selectedImages, setSelectedImages] = useState<
    null | string[] | undefined
  >(null);
  if (!currentStoreProducts) return <LoadingComponent />;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="grid grid-cols-1 gap-2">
            <CardTitle>Products</CardTitle>
            <CardDescription>A list of what you sell</CardDescription>
          </div>
          <Button
            className="flex space-x-2 "
            onClick={() => setIsAddingProduct(true)}
          >
            <PlusIcon className="h-[16px]" /> Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStoreProducts?.map((item: ProductType, idx: number) => {
              const tags = item.tags?.split(',');
              return (
                <TableRow key={`product-item-${idx}`}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="text-nowrap">{item.name}</TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell className="inline-flex flex-wrap gap-1">
                    {tags?.map((tag, tagIdx) => (
                      <Badge
                        key={`${idx}-tag-${tagIdx}`}
                        className="text-nowrap"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="capitalize">
                    {item.variants?.length || 'none'}
                  </TableCell>
                  <TableCell className="capitalize text-nowrap">
                    {item.createdAt}
                  </TableCell>
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
                            setIsEditingProductModal(true);
                            setSelectedProduct(item);
                          }}
                        >
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setIsOpenVariantsModal(true);
                            setSelectedProduct(item);
                          }}
                        >
                          Variants
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

      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creating new product</DialogTitle>
            <DialogDescription>
              This product will only be available on this store.
            </DialogDescription>
          </DialogHeader>
          <CreateStoreProductForm setClose={() => setIsAddingProduct(false)} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isEditingProductModal}
        onOpenChange={setIsEditingProductModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Fill the required fields.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <UpdateStoreProductForm
              product={selectedProduct}
              setClose={() => {
                setIsEditingProductModal(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenVariantsModal} onOpenChange={setIsOpenVariantsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Variants</DialogTitle>
            <DialogDescription>
              Variants are the different types of a selected product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <CreateProductVariantForm
              product={selectedProduct}
              setClose={() => {
                setIsOpenVariantsModal(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default StoreProductsTable;
