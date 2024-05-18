'use client';
import React from 'react';
import DashboardCards from './DashboardCards';
import DashboardChart from './DashboardChart';
import DashboardRecentList from './DashboardRecentList';
import { GroupIcon, StoreIcon, TruckIcon, UsersIcon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { DeliveryServiceType } from '@/typings';
import { pluralizeNumber } from '@/helpers/appHelpers';

function DashboardSection() {
  const [currentStores, currentUsers, currentSettings] = useAppStore(
    (state) => [state.currentStores, state.currentUsers, state.currentSettings]
  );

  const totalStores = currentStores?.length;
  const totalUsers = currentUsers?.length;
  const totalCollections = currentSettings?.collections.length;
  const totalDeliveryServices = currentSettings?.delivery_services.length;
  const totalRiders = getTotalRiders();

  function getTotalRiders() {
    let total = 0;
    currentSettings?.delivery_services?.forEach((item: DeliveryServiceType) => {
      item.users?.forEach((userItem: any) => {
        if (userItem.roleType) total = total + 1;
      });
    });
    return total;
  }
  const cardItems = [
    {
      label: 'Total Stores',
      icon: <StoreIcon />,
      value: `${totalStores}`,
      description: 'Stores added',
    },
    {
      label: 'Total Users',
      icon: <UsersIcon />,
      value: `${totalUsers}`,
      description: 'Users added for store management',
    },
    {
      label: 'Total Collections',
      icon: <GroupIcon />,
      value: `${totalCollections}`,
      description: 'Collection of stores',
    },
    {
      label: 'Total Delivery Services',
      icon: <TruckIcon />,
      value: `${totalDeliveryServices}`,
      description: `${pluralizeNumber({ plural: 'riders', singular: 'rider', number: totalRiders })} overall`,
    },
  ];
  return (
    <section className="mt-2 md:mt-5 flex flex-col">
      <DashboardCards items={cardItems} />
      <div className="mt-2 md:mt-5">
        <div className="grid grid-cols-1 lg:flex gap-2 md:gap-5">
          <DashboardChart />
          <DashboardRecentList />
        </div>
      </div>
    </section>
  );
}

export default DashboardSection;
