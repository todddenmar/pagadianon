'use client';
import LoadingComponent from '@/components/admin/LoadingComponent.';
import DashboardCards from '@/components/admin/dashboard/DashboardCards';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import {
  BoxesIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ShoppingCartIcon,
  UsersIcon,
} from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { AppWindowIcon, DollarSignIcon, StoreIcon } from 'lucide-react';
import {
  getMonthlyChartDataByOrders,
  getOrdersToday,
  getUniqueCustomersByOrders,
} from '@/helpers/appHelpers';
import StoreDashboardChart from './StoreDashboardChart';
import StoreDashboardRecentOrders from './StoreDashboardRecentOrders';
import StoreSettingSidebar from '../settings/StoreSettingSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreSettingsForm from '../settings/StoreSettingsForm';
import StoreSettingsGallery from '../settings/StoreSettingsGallery';
import StoreBusinessHoursListCard from '../StoreBusinessHoursListCard';
import StoreProductsTable from '../StoreProductsTable';
import { useAppStore } from '@/lib/store';
import StoreBanner from '../StoreBanner';
import { useUser } from '@clerk/nextjs';
import NoDataSection from '@/components/error/NoDataSection';
import StoreOrdersTable from '../store-orders/StoreOrdersTable';

function StoreDashboardSection() {
  const [currentStoreProducts, currentStoreData, currentStoreOrders] =
    useAppStore((state) => [
      state.currentStoreProducts,
      state.currentStoreData,
      state.currentStoreOrders,
    ]);
  const [tabValue, setTabValue] = useState<string>('dashboard');

  if (!currentStoreData) {
    return <LoadingComponent />;
  }

  const totalProducts = currentStoreProducts ? currentStoreProducts.length : 0;
  const totalOrdersThisMonth = currentStoreOrders
    ? currentStoreOrders.length
    : 0;
  const ordersToday = getOrdersToday(currentStoreOrders);
  const totalOrdersToday = ordersToday.length;
  const totalCustomers = getUniqueCustomersByOrders(currentStoreOrders).length;
  const dashboardCards = [
    {
      label: 'Total Products',
      icon: <BoxesIcon />,
      value: `${totalProducts}`,
      description: 'Products added',
    },
    {
      label: 'Monthly Orders',
      icon: <CalendarIcon />,
      value: `${totalOrdersThisMonth}`,
      description: 'Orders this month',
    },
    {
      label: 'Daily Orders',
      icon: <CalendarDaysIcon />,
      value: `${totalOrdersToday}`,
      description: 'Orders this day',
    },
    {
      label: 'Total Customers',
      icon: <UsersIcon />,
      value: `${totalCustomers}`,
      description: "Unique for this month's orders",
    },
  ];

  const chartData = getMonthlyChartDataByOrders({
    orders: currentStoreOrders,
    storeID: currentStoreData?.id,
  });
  return (
    <div>
      <StoreBanner
        title={currentStoreData.name}
        description={currentStoreData.description}
        isManager={true}
      />
      <div className="mt-5">
        <ContainerLayout>
          <div className="grid grid-cols-1 md:flex gap-5">
            <div className="mt-2">
              <StoreSettingSidebar
                value={tabValue}
                onValueChange={(val) => setTabValue(val)}
              />
            </div>

            <div className="flex-1">
              <Tabs value={tabValue} onValueChange={setTabValue}>
                <TabsContent value="dashboard">
                  <section className="flex flex-col">
                    <DashboardCards items={dashboardCards} />
                    <div className="mt-2 md:mt-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:flex gap-2 md:gap-5">
                        <StoreDashboardChart data={chartData} />
                        <StoreDashboardRecentOrders orders={ordersToday} />
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="products">
                  <StoreProductsTable />
                </TabsContent>
                <TabsContent value="orders">
                  <StoreOrdersTable orders={currentStoreOrders} />
                </TabsContent>
                <TabsContent value="contact">
                  <StoreSettingsForm />
                </TabsContent>
                <TabsContent value="gallery">
                  <StoreSettingsGallery />
                </TabsContent>
                <TabsContent value="hours">
                  <StoreBusinessHoursListCard />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ContainerLayout>
      </div>
    </div>
  );
}

export default StoreDashboardSection;
