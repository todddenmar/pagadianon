import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DashboardCardHeader from './DashboardCardHeader';
import { AdminOverview } from '../AdminOverview';

function DashboardChart() {
  return (
    <Card className="w-full">
      <DashboardCardHeader
        title="Overview"
        description={'Monthly overview for this year.'}
      />
      <CardContent>
        <AdminOverview />
      </CardContent>
    </Card>
  );
}

export default DashboardChart;
