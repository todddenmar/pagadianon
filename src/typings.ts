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

export type StoreType = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  saasTypeSlug: string;
  createdAt: any;
  updatedAt?: any;
  users?: any[];
  tags: string;
  logoURL?: string;
  images?: string[];
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
  isAlwaysAvailable: true;
  stocks: number;
  price: string;
  compareAtPrice?: string;
  createdAt: any;
  updatedAt?: any;
  images?: string[];
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
  createdAt: string;
};