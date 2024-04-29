import React from 'react';
import DashboardCard from './DashboardCard';
import { AppWindowIcon, DollarSignIcon, StoreIcon } from 'lucide-react';

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
      <DashboardCard
        label={'Total Stores'}
        icon={<StoreIcon className="h-4" />}
        value="+15"
        description="+20.1% from last month"
      />
      <DashboardCard
        label={'Total Softwares'}
        icon={<AppWindowIcon className="h-4" />}
        value="+5"
        description="+20.1% from last month"
      />
      <DashboardCard
        label={'Total Revenue'}
        icon={<DollarSignIcon className="h-4" />}
        value="$45,231.89"
        description="+20.1% from last month"
      />
      <DashboardCard
        label={'Total Revenue'}
        icon={<DollarSignIcon className="h-4" />}
        value="$45,231.89"
        description="+20.1% from last month"
      />
    </div>
  );
}

export default DashboardCards;
