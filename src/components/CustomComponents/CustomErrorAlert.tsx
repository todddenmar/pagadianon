import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

function CustomErrorAlert({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Alert className="bg-destructive mb-0">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default CustomErrorAlert;
