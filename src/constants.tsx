import {
  BeerIcon,
  CoffeeIcon,
  CombineIcon,
  HandHelpingIcon,
  LayoutDashboardIcon,
  MusicIcon,
  ShirtIcon,
  StoreIcon,
  UserCircleIcon,
  UtensilsIcon,
} from 'lucide-react';
import CreateStoreForm from './components/admin/forms/CreateStoreForm';
import CreateStoreUserForm from './components/admin/forms/CreateStoreUserForm';
import CreateStoreCollectionForm from './components/admin/forms/CreateStoreCollectionForm';

export const kRoleType = {
  MANAGER: 'manager',
  STAFF: 'staff',
};
export const kRoleTypes = [kRoleType.MANAGER, kRoleType.STAFF];
export const kAdminPageData = {
  DASHBOARD: {
    path: '/admin',
    title: 'Dashboard',
    icon: <LayoutDashboardIcon />,
    createDialog: null,
  },
  STORES: {
    path: '/admin/stores',
    title: 'Stores',
    icon: <StoreIcon />,
    createDialog: {
      buttonText: 'Add Store',
      title: 'Create New Store',
      description: 'Stores are the businesses we give services',
      isSettings: false,
      form: <CreateStoreForm />,
    },
  },
  COLLECTIONS: {
    path: '/admin/collections',
    title: 'Collections',
    icon: <CombineIcon />,
    createDialog: {
      buttonText: 'Add Collection',
      title: 'Create New Collection',
      description: 'A collection of stores',
      isSettings: false,
      form: <CreateStoreCollectionForm />,
    },
  },
  USERS: {
    path: '/admin/users',
    title: 'Users',
    icon: <UserCircleIcon />,
    createDialog: {
      buttonText: 'Add User',
      title: 'Create New User',
      description: 'Users who uses our services',
      isSettings: false,
      form: <CreateStoreUserForm />,
    },
  },
};

export const kAdminPageDataItems = [
  kAdminPageData.DASHBOARD,
  kAdminPageData.STORES,
  kAdminPageData.COLLECTIONS,
  kAdminPageData.USERS,
];
export const kSaasCategory = {
  PRODUCTS_CATALOG: {
    slug: 'products-catalog',
    title: 'Products Catalog',
    path: '/services/products-catalog',
    description: 'Showcase and manage the products of your store.',
  },
  MANAGEMENT_SYSTEM: {
    slug: 'management-system',
    title: 'Management System',
    path: '/services/management-system',
    description: 'We offer management systems to help local businesses.',
  },
};
export const kSaasCategories = [
  kSaasCategory.PRODUCTS_CATALOG,
  kSaasCategory.MANAGEMENT_SYSTEM,
];
export const kSaasType = {
  LAUNDRY: {
    slug: 'laundry',
    title: 'Laundry Shop CRM',
    description: 'Customer Relationship Management system for laundry shops.',
    category: kSaasCategory.MANAGEMENT_SYSTEM,
  },
  STORE: {
    slug: 'store',
    title: 'Store Manager',
    description: 'Store Management system for different kinds of stores.',
    category: kSaasCategory.PRODUCTS_CATALOG,
  },
};

export const kStoreType = {
  SHOP: {
    name: 'Online Shopping',
    slug: 'shops',
    description: 'Find products from people on your city is selling.',
  },
  FOOD_SPOTS: {
    name: 'Food Spots',
    slug: 'food-spots',
    description: 'Know which stores offer your favorite food.',
  },
  SERVICES: {
    name: 'Services',
    slug: 'services',
    description: 'Businesses who offer services you might need.',
  },
};

export const kStoreTypes = [
  kStoreType.SHOP,
  kStoreType.FOOD_SPOTS,
  kStoreType.SERVICES,
];

export const kSaasTypes = [kSaasType.STORE, kSaasType.LAUNDRY];

export const kStoreProductCategories = [
  { value: 'food', icon: <UtensilsIcon className="w-[16px]" /> },
  { value: 'drink', icon: <BeerIcon className="w-[16px]" /> },
  { value: 'coffee', icon: <CoffeeIcon className="w-[16px]" /> },
  { value: 'clothing', icon: <ShirtIcon className="w-[16px]" /> },
  { value: 'service', icon: <HandHelpingIcon className="w-[16px]" /> },
];

export const kDaysArrayData = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
