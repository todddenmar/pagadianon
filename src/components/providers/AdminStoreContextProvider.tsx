'use client';
import { createContext } from 'react';

type AdminStoreContextType = {
  data: any[];
};
export const AdminStoreContext = createContext<AdminStoreContextType>({
  data: [],
});

function AdminStoreContextProvider({
  data,
  children,
}: {
  data: any[];
  children: any;
}) {
  return (
    <AdminStoreContext.Provider value={{ data }}>
      {children}
    </AdminStoreContext.Provider>
  );
}

export default AdminStoreContextProvider;
