import React from 'react';

function AdminTitle({ text }: { text: any }) {
  return (
    <div>
      <h2 className="text-lg md:text-2xl font-bold">{text}</h2>
    </div>
  );
}

export default AdminTitle;
