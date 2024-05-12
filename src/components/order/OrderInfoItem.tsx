import React from 'react';

function OrderInfoItem({ label, value }: { label: string; value?: any }) {
  return (
    <div className="text-sm flex space-x-2 justify-between capitalize">
      <label>{label}:</label>
      <div className="text-neutral-400 text-right justify-end">{value}</div>
    </div>
  );
}

export default OrderInfoItem;
