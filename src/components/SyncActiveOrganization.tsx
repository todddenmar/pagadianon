'use client';

import { useEffect } from 'react';
import { useAuth, useOrganizationList } from '@clerk/nextjs';

export function SyncActiveOrganization({ membership }: any) {
  const { orgId } = useAuth();

  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization ID from the session
  const firstOrgId = Object.keys(membership ?? {})?.[0];

  useEffect(() => {
    // If organizations are not loaded yet or URL orgId is not valid, return
    if (!isLoaded) return;

    if (!orgId || !firstOrgId) {
      void setActive({ organization: firstOrgId });
    }
  }, [orgId, isLoaded, setActive, firstOrgId]); // Include urlOrgId in the dependency array

  return null;
}
