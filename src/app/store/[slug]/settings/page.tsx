'use client';
import LoadingComponent from '@/components/admin/LoadingComponent.';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import StoreSettingsForm from '@/components/store/StoreSettingsForm';
import StoreSettingsTabs from '@/components/store/StoreSettingsTabs';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React from 'react';

function StoreSettingsPage() {
  const currentStoreData = useAppStore((state) => state.currentStoreData);
  const router = useRouter();
  if (!currentStoreData) {
    router.push('/');
    return <LoadingComponent />;
  }
  return (
    <div>
      <ContainerLayout>
        <Card className="p-3">
          <div>
            <h4 className="text-2xl font-semibold">Settings</h4>
            <p className="text-sm text-neutral-500">
              Store Settings for {currentStoreData.name}
            </p>
          </div>
          <div className="mt-5">
            <StoreSettingsTabs />
          </div>
        </Card>
      </ContainerLayout>
    </div>
  );
}

export default StoreSettingsPage;
