'use client';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/lib/store';
import { DeliveryServiceType, UserType } from '@/typings';
import { CheckIcon, MoreHorizontalIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import LoadingComponent from '../LoadingComponent.';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UpdateDeliveryServiceForm from '../forms/UpdateDeliveryServiceForm';
import ManageDeliveryServicesUsersForm from '../forms/ManageDeliveryServicesUsersForm';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { isMobile } from 'react-device-detect';

function DeliveryServicesTable() {
  const [currentSettings, setCurrentSettings] = useAppStore((state) => [
    state.currentSettings,
    state.setCurrentSettings,
  ]);
  const [selectedDeliveryService, setSelectedDeliveryService] =
    useState<DeliveryServiceType | null>(null);
  const [isEditingDeliveryService, setIsEditingDeliveryService] =
    useState(false);
  const [isShowingUsers, setIsShowingUsers] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null);

  useState(false);
  if (!currentSettings) return <LoadingComponent />;
  const onEditDeliveryService = (data: DeliveryServiceType) => {
    setSelectedDeliveryService(data);
    setIsEditingDeliveryService(true);
  };
  const onAddUser = (data: DeliveryServiceType) => {
    setSelectedDeliveryService(data);
    setIsShowingUsers(true);
  };
  const onUpdatePublish = async (
    deliveryService: DeliveryServiceType,
    isPublished: boolean
  ) => {
    const updatedSettingsDeliveryServices =
      currentSettings?.delivery_services?.map((item: DeliveryServiceType) =>
        item.id === deliveryService.id
          ? { ...item, isPublished: isPublished }
          : item
      );
    const updatedSettings = {
      ...currentSettings,
      delivery_services: updatedSettingsDeliveryServices,
      isPublished: false,
    };
    setCurrentSettings(updatedSettings);
    toast.success(
      isPublished
        ? 'Store published successfully'
        : 'Store unpublished successfully',
      {
        description: 'Publish settings to save updates',
      }
    );
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Is Published</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSettings?.delivery_services?.map(
            (item: DeliveryServiceType, idx: number) => {
              const tags = item.tags?.split(',');
              return (
                <TableRow key={`delivery_services-item-${idx}`}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="text-nowrap">{item.name}</TableCell>
                  <TableCell className="text-nowrap">{item.slug}</TableCell>
                  <TableCell className="capitalize inline-flex flex-wrap gap-2">
                    {tags?.map((tag: string, tagIdx: number) => (
                      <Badge key={`tag-${idx}-${tagIdx}`}>{tag}</Badge>
                    ))}
                  </TableCell>
                  <TableCell className="">
                    {item.isPublished ? (
                      <CheckIcon className="h-5 text-green-500" />
                    ) : (
                      <XIcon className="h-5 text-red-500" />
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
                          onClick={() => onEditDeliveryService(item)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddUser(item)}>
                          Manage Users
                        </DropdownMenuItem>
                        {item.isPublished ? (
                          <DropdownMenuItem
                            onClick={() => onUpdatePublish(item, false)}
                          >
                            Unpublish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => onUpdatePublish(item, true)}
                          >
                            Publish
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      {isMobile ? (
        <div>
          <Drawer open={isShowingUsers} onOpenChange={setIsShowingUsers}>
            {selectedDeliveryService && (
              <DrawerContent className="p-5">
                <DrawerHeader>
                  <DrawerTitle>
                    Manage Users for: {`${selectedDeliveryService.name}`}
                  </DrawerTitle>
                  <DrawerDescription>
                    {' '}
                    Add, remove or update users.
                  </DrawerDescription>
                </DrawerHeader>
                <ManageDeliveryServicesUsersForm
                  deliveryService={selectedDeliveryService}
                  setClose={() => {
                    setIsShowingUsers(false);
                  }}
                />
              </DrawerContent>
            )}
          </Drawer>
          <Drawer
            open={isEditingDeliveryService}
            onOpenChange={setIsEditingDeliveryService}
          >
            {selectedDeliveryService && (
              <DrawerContent className="p-5">
                <DrawerHeader>
                  <DrawerTitle>
                    Edit Delivery Service: {`${selectedDeliveryService.name}`}
                  </DrawerTitle>
                  <DrawerDescription>
                    Please fill in the blank.
                  </DrawerDescription>
                </DrawerHeader>
                <UpdateDeliveryServiceForm
                  deliveryService={selectedDeliveryService}
                  setClose={() => setIsEditingDeliveryService(false)}
                />
              </DrawerContent>
            )}
          </Drawer>
        </div>
      ) : (
        <div>
          <Dialog open={isShowingUsers} onOpenChange={setIsShowingUsers}>
            {selectedDeliveryService && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Manage Users for: {`${selectedDeliveryService.name}`}
                  </DialogTitle>
                  <DialogDescription>
                    Add, remove or update users.
                  </DialogDescription>
                </DialogHeader>
                <div className="w-full overflow-auto">
                  <ManageDeliveryServicesUsersForm
                    deliveryService={selectedDeliveryService}
                    setClose={() => {
                      setIsShowingUsers(false);
                    }}
                  />
                </div>
              </DialogContent>
            )}
          </Dialog>
          <Dialog
            open={isEditingDeliveryService}
            onOpenChange={setIsEditingDeliveryService}
          >
            {selectedDeliveryService && (
              <DialogContent className="p-5">
                <DialogHeader>
                  <DialogTitle>
                    Edit Delivery Service: {`${selectedDeliveryService.name}`}
                  </DialogTitle>
                  <DialogDescription>
                    Please fill in the blank.
                  </DialogDescription>
                </DialogHeader>
                <UpdateDeliveryServiceForm
                  deliveryService={selectedDeliveryService}
                  setClose={() => setIsEditingDeliveryService(false)}
                />
              </DialogContent>
            )}
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default DeliveryServicesTable;
