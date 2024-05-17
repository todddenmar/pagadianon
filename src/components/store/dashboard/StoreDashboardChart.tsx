'use client';
import DashboardCardHeader from '@/components/admin/dashboard/DashboardCardHeader';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

function StoreDashboardChart({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <Card className="w-full ">
      <DashboardCardHeader
        title="Overview"
        description={'Daily overview for this month.'}
      />
      <CardContent className="hidden dark:block">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₱${value}`}
            />
            <CartesianGrid stroke="#262626" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="total" stroke="#c1a57c" />
            {/* <Bar dataKey="total" fill="#ffffff" radius={[4, 4, 0, 0]} /> */}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardContent className="block dark:hidden">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₱${value}`}
            />
            <Bar dataKey="total" fill="#000000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>{' '}
    </Card>
  );
}

export default StoreDashboardChart;
