import React from 'react';

function DashboardCardHeader({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) {
  return (
    <div className="p-3 md:p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
}

export default DashboardCardHeader;
