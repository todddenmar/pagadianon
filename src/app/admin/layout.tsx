'use client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTitle from '@/components/admin/AdminTitle';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import { kAdminPageDataItems } from '@/constants';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  dbGetDeliveryServices,
  dbGetStores,
  dbGetUsers,
} from '@/helpers/firebaseHelpers';
import AdminPublishSettingsButton from '@/components/admin/AdminPublishSettingsButton';
import { useAuth } from '@clerk/nextjs';
import NoDataSection from '@/components/error/NoDataSection';

function AdminLayout({ children }: any) {
  const pathname = usePathname();
  const pageData = kAdminPageDataItems.find((item) => item.path === pathname);
  const [
    isCreatingModalOpen,
    setIsCreatingModalOpen,
    setCurrentStores,
    setCurrentDeliveryServices,
    setCurrentUsers,
  ] = useAppStore((state) => [
    state.isCreatingModalOpen,
    state.setIsCreatingModalOpen,
    state.setCurrentStores,
    state.setCurrentDeliveryServices,
    state.setCurrentUsers,
  ]);
  useEffect(() => {
    async function getAdminData(): Promise<void> {
      const stores = await dbGetStores();
      const delivery_services = await dbGetDeliveryServices();
      const users = await dbGetUsers();
      if (stores.status !== 'error') {
        setCurrentStores(stores.data || []);
      }
      if (delivery_services.status !== 'error') {
        setCurrentDeliveryServices(delivery_services.data || []);
      }
      if (users.status !== 'error') {
        setCurrentUsers(users.data || []);
      }
    }
    getAdminData();
  }, []);
  const { userId, orgId, has } = useAuth();
  if (!userId) {
    return <NoDataSection title="Not logged in" />;
  }
  if (!orgId && !has({ permission: 'org:admin:access' })) {
    return <NoDataSection title="No Organization found" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 md:p-5">
      <ContainerLayout>
        <div className=" p-2 md:p-6 w-full grid grid-cols-1 md:flex">
          <div className="h-full flex flex-col items-center justify-center bg-neutral-900 rounded-lg rounded-b-none md:rounded-r-none border  border-b-0 md:border-r-0 md:rounded-bl-lg md:border-b-inherit p-4">
            <AdminSidebar />
          </div>
          <div className="border rounded-t-none md:rounded-l-none rounded-lg md:rounded-r-lg p-2 md:p-6 w-full flex-1">
            <div className="grid sm:flex justify-between gap-2">
              <AdminTitle text={pageData?.title} />
              {pageData?.createDialog && (
                <div className="flex gap-2 items-center">
                  <Dialog
                    open={isCreatingModalOpen}
                    onOpenChange={setIsCreatingModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button onClick={() => setIsCreatingModalOpen(true)}>
                        {pageData?.createDialog.buttonText}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {pageData?.createDialog.title}
                        </DialogTitle>
                        <DialogDescription>
                          {pageData?.createDialog.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div>{pageData?.createDialog.form()}</div>
                    </DialogContent>
                  </Dialog>
                  {pageData?.createDialog.isSettings && (
                    <AdminPublishSettingsButton />
                  )}
                </div>
              )}
            </div>
            {children}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default AdminLayout;
