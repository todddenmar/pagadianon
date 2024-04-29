import { LayoutDashboardIcon, StoreIcon } from 'lucide-react';

export const kAdminPageData = {
  DASHBOARD: {
    path: '/admin',
    icon: <LayoutDashboardIcon />,
  },
  CLIENTS: {
    path: '/admin/clients',
    icon: <StoreIcon />,
  },
};

export const kAdminPageDataItems = [
  kAdminPageData.DASHBOARD,
  kAdminPageData.CLIENTS,
];
