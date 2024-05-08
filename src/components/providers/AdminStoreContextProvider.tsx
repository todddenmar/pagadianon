'use client';
import { createContext } from 'react';

type AdminStoreContextType = {
  images: string[];
};
export const AdminStoreContext = createContext<AdminStoreContextType>({
  images: [],
});

function AdminStoreContextProvider({
  children,
  images,
}: {
  children: any;
  images: string[];
}) {
  return (
    <AdminStoreContext.Provider value={{ images }}>
      {children}
    </AdminStoreContext.Provider>
  );
}

export default AdminStoreContextProvider;
