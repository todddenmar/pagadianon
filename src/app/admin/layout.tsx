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
import { dbGetStores, dbGetUsers } from '@/helpers/firebaseHelpers';
import AdminPublishSettingsButton from '@/components/admin/AdminPublishSettingsButton';

function AdminLayout({ children }: any) {
  const pathname = usePathname();
  const pageData = kAdminPageDataItems.find((item) => item.path === pathname);
  const [
    isCreatingModalOpen,
    setIsCreatingModalOpen,
    setCurrentStores,
    setCurrentUsers,
  ] = useAppStore((state) => [
    state.isCreatingModalOpen,
    state.setIsCreatingModalOpen,
    state.setCurrentStores,
    state.setCurrentUsers,
  ]);

  async function getAdminData(): Promise<void> {
    console.log('Get Admin Data');
    const stores = await dbGetStores();
    const users = await dbGetUsers();
    if (stores.status !== 'error') {
      setCurrentStores(stores.data || []);
    }
    if (users.status !== 'error') {
      setCurrentUsers(users.data || []);
    }
  }

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 md:p-5">
      <ContainerLayout>
        <div className=" p-2 md:p-6 w-full grid grid-cols-1 md:flex">
          <div className="h-full flex flex-col items-center justify-center bg-neutral-900 rounded-lg rounded-b-none md:rounded-r-none border  border-b-0 md:border-r-0 md:rounded-bl-lg md:border-b-inherit p-4">
            <AdminSidebar />
          </div>
          <div className="border rounded-t-none md:rounded-l-none rounded-lg md:rounded-r-lg p-2 md:p-6 w-full flex-1">
            <div className="flex justify-between space-x-5">
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
                      <div>{pageData?.createDialog.form}</div>
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
