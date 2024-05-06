import React from 'react';

function CustomMobileLink({ mobileNumber }: { mobileNumber: string }) {
  return <a href={`tel:+63${mobileNumber}`}>+63{mobileNumber}</a>;
}

export default CustomMobileLink;
