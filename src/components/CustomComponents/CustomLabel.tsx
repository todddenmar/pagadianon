import React from 'react';

function CustomLabel({ label }: { label: string | null }) {
  return <label className="font-semibold">{label}</label>;
}

export default CustomLabel;
