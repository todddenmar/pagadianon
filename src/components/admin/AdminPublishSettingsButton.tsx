'use client';
import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useAppStore } from '@/lib/store';
import { CheckIcon, LoaderIcon } from 'lucide-react';
import LoadingComponent from './LoadingComponent.';
import { dbUpdateSettings } from '@/helpers/firebaseHelpers';
import LoadingButton from './LoadingButton';

function AdminPublishSettingsButton() {
  const { userId, orgId, has } = useAuth();
  let hasSettingsUpdatePermission = false;
  if (userId && orgId) {
    hasSettingsUpdatePermission = has({ permission: 'org:admin:access' });
  }
  const [isLoading, setIsLoading] = useState(false);
  const [currentSettings, setCurrentSettings] = useAppStore((state) => [
    state.currentSettings,
    state.setCurrentSettings,
  ]);
  if (!currentSettings) {
    return (
      <div>
        <span>
          <LoaderIcon className="animate-spin" />
        </span>
      </div>
    );
  }
  const onPublishSettings = async () => {
    setIsLoading(true);
    await dbUpdateSettings({ ...currentSettings, isPublished: true });
    setCurrentSettings({ ...currentSettings, isPublished: true });
    setIsLoading(false);
  };

  return hasSettingsUpdatePermission ? (
    <div className="flex gap-1 items-center">
      <div className="relative">
        <LoadingButton
          disabled={currentSettings?.isPublished}
          variant={'secondary'}
          text={currentSettings.isPublished ? 'Published' : 'Publish Settings'}
          isLoading={isLoading}
          onClick={onPublishSettings}
        />
        {(currentSettings?.isPublished === false ||
          currentSettings?.isPublished === undefined) &&
          !isLoading && (
            <div className="absolute top-0 right-[5px]">
              <div className="rounded-full h-[8px] w-[8px] bg-yellow-500 absolute"></div>
              <div className="rounded-full h-[8px] w-[8px] bg-yellow-500 absolute animate-ping"></div>
            </div>
          )}
      </div>
      {currentSettings?.isPublished && !isLoading && (
        <CheckIcon className="text-green-500 h-5" />
      )}
    </div>
  ) : null;
}

export default AdminPublishSettingsButton;
