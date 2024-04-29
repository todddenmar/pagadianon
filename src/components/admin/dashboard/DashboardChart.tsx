import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DashboardCardHeader from './DashboardCardHeader';

function DashboardChart() {
  return (
    <Card className="w-full">
      <DashboardCardHeader
        title="Overview"
        description={'Monthly overview for this year.'}
      />
      <CardContent></CardContent>
    </Card>
  );
}

export default DashboardChart;
