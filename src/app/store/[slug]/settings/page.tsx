import React from 'react';
import StoreSettingsSection from '@/components/store/settings/StoreSettingsSection';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Store Settings | Pagadianon',
  description: 'Settings for a Pagadianon store',
};

async function StoreSettingsPage() {
  return (
    <div className="relative">
      <StoreSettingsSection />
    </div>
  );
}

export default StoreSettingsPage;
