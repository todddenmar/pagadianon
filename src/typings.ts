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