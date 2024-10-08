export type DashCardData = {
  label: string;
  value: string;
  icon: any;
  description: string;
};

export type SoftwareServiceType = {
  slug: string;
  title: string;
  description: string;
};

export type SettingsType = {
  stores: StoreType[];
};

export type StoreType = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  branchName: string;
  address: string;
  mapEmbedAddress?: string | null;
  coordinates?: string | null;
  saasTypeSlug: string;
  createdAt: any;
  updatedAt?: any;
  users?: any[];
  tags: string;
  logoURL?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  mobileNumber?: string;
  email?: string;
  facebookUsername?: string;
  instagramUsername?: string;
  schedules?: any;
  galleryImages?: string[];
};

export type CollectionType = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  createdAt: any;
  updatedAt?: any;
  stores?: string[];
};

export type UserType = {
  id: string;
  email: string;
  roleType: string;
  stores?: string[];
  deliveryServices?: string[];
  createdAt: any;
  updatedAt?: any;
};
type DaySchedule = { opensAt: Date | null; closesAt: Date | null };
export type DaysSchedType = {
  [key: string]: DaySchedule | boolean | null;
};

export type VariantType = {
  id: string;
  name: string;
  description?: string;
  productID: string;
  price: string;
  compareAtPrice?: string;
  createdAt: any;
  updatedAt?: any;
  stock?: any;
  isAllowingOrder?: boolean;
  isContinueSelling?: boolean;
  images?: string[];
};

export type VariantStockItemType = {
  productID: string;
  variantID: string;
  productName: string;
  variantName: string;
  isAllowingOrder: boolean;
  isContinueSelling: boolean;
  stock?: any;
};

export type ProductType = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  variants?: VariantType[];
  category: string;
  tags?: string;
  createdAt: any;
  updatedAt?: any;
};

export type CartItemType = {
  variantID: string;
  imageURL: string;
  name: string;
  variantName: string;
  price: number;
  totalAmount: number;
  quantity: number;
  storeID: string;
};

export type OrderType = {
  id: string;
  customer: any;
  cart: CartItemType[];
  createdAt: string;
  status: string;
  customerEmail: string;
  paymentMethod: string;
  fulfillmentMethod: string;
  orderReceivedNote?: string;
  deliveryServiceID?: string;
  deliveryServiceInfo?: {
    isConfirmed: boolean;
    confirmedDateTime?: string;
    rider?: any;
    fee?: string;
  } | null;
  deliveryRider?: any;
  storeIDs: string[];
  storesInvolved?: (
    | {
        storeID: string;
        storeSlug: string;
        contactInfo: {
          address: string;
          coordinates: string;
          mobileNumber: string;
        };
        isConfirmed: boolean;
        isPickedUp: boolean;
        isReadyForPickUp: boolean;
      }
    | undefined
  )[];
};

export type CustomerType = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

export type DeliveryServiceType = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  createdAt: any;
  updatedAt?: any;
  users?: any[];
  tags: string;
  logoURL?: string;
  images?: string[];
  isPublished?: boolean;
  facebookUsername: string;
  messengerUsername: string;
};

export type DashCardItemType = {
  label: string;
  icon: any;
  value: string;
  description: string;
};