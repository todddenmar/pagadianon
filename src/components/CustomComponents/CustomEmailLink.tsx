import React from 'react';

function CustomEmailLink({ email }: { email: string }) {
  return (
    <a className="lowercase" href={`mailTo:${email}`}>
      {email}
    </a>
  );
}

export default CustomEmailLink;
