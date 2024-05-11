import { DeliveryServiceType, StoreType, UserType } from '@/typings';
import { create } from 'zustand';

interface AppState {
  isDataFetched: boolean;
  setIsDataFetched: (open: boolean) => void;

  isCreatingModalOpen: boolean;
  setIsCreatingModalOpen: (open: boolean) => void;

  isStoreUsersModalOpen: boolean;
  setIsStoreUsersModalOpen: (open: boolean) => void;

  isSheetCartOpen: boolean;
  setIsSheetCartOpen: (open: boolean) => void;

  isDrawerCartOpen: boolean;
  setIsDrawerCartOpen: (open: boolean) => void;

  currentSettings: any;
  setCurrentSettings: (currentSettings: any) => void;

  currentUserData: any;
  setCurrentUserData: (currentUserData: any) => void;

  currentStoreData: any;
  setCurrentStoreData: (currentStoreData: any) => void;

  currentUserStores: any[];
  setCurrentUserStores: (currentUserStores: any[]) => void;

  currentUserCart: any[];
  setCurrentUserCart: (currentUserCart: any[]) => void;

  currentStoreProducts: any[];
  setCurrentStoreProducts: (currentStoreProducts: any[]) => void;

  currentStoreSanityImages: any[];
  setCurrentStoreSanityImages: (currentStoreSanityImages: any[]) => void;

  currentStores: any[];
  setCurrentStores: (currentStores: any[]) => void;
  addStore: (data: any) => void;
  updateStore: (data: any) => void;

  currentDeliveryServices: any[];
  setCurrentDeliveryServices: (currentDeliveryServices: any[]) => void;
  addDeliveryService: (data: any) => void;
  updateDeliveryService: (data: any) => void;

  currentUsers: any[];
  setCurrentUsers: (currentUsers: any[]) => void;
  addUser: (data: any) => void;
  updateUser: (data: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDataFetched: false,
  setIsDataFetched: (data) => set(() => ({ isDataFetched: data })),

  isCreatingModalOpen: false,
  setIsCreatingModalOpen: (data) => set(() => ({ isCreatingModalOpen: data })),

  isStoreUsersModalOpen: false,
  setIsStoreUsersModalOpen: (data) =>
    set(() => ({ isStoreUsersModalOpen: data })),

  isSheetCartOpen: false,
  setIsSheetCartOpen: (data) => set(() => ({ isSheetCartOpen: data })),

  isDrawerCartOpen: false,
  setIsDrawerCartOpen: (data) => set(() => ({ isDrawerCartOpen: data })),

  currentSettings: null,
  setCurrentSettings: (data: any) => set(() => ({ currentSettings: data })),

  currentUserData: null,
  setCurrentUserData: (data: any) => set(() => ({ currentUserData: data })),

  currentStoreData: null,
  setCurrentStoreData: (data: any) => set(() => ({ currentStoreData: data })),

  currentUserStores: [],
  setCurrentUserStores: (data: any[]) =>
    set(() => ({ currentUserStores: data })),

  currentUserCart: [],
  setCurrentUserCart: (data: any[]) => set(() => ({ currentUserCart: data })),

  currentStoreProducts: [],
  setCurrentStoreProducts: (data: any[]) =>
    set(() => ({ currentStoreProducts: data })),

  currentStoreSanityImages: [],
  setCurrentStoreSanityImages: (data: any[]) =>
    set(() => ({ currentStoreSanityImages: data })),

  currentStores: [],
  setCurrentStores: (data: any[]) => set(() => ({ currentStores: data })),

  addStore: (data: StoreType) =>
    set((state) => ({
      currentStores: [...state.currentStores, data],
    })),

  updateStore: (data: StoreType) =>
    set((state) => ({
      currentStores: state.currentStores.map((item) =>
        item.id === data.id ? data : item
      ),
    })),

  currentDeliveryServices: [],
  setCurrentDeliveryServices: (data: any[]) =>
    set(() => ({ currentDeliveryServices: data })),

  addDeliveryService: (data: DeliveryServiceType) =>
    set((state) => ({
      currentDeliveryServices: [...state.currentDeliveryServices, data],
    })),

  updateDeliveryService: (data: DeliveryServiceType) =>
    set((state) => ({
      currentStores: state.currentStores.map((item) =>
        item.id === data.id ? data : item
      ),
    })),

  currentUsers: [],
  setCurrentUsers: (data: any[]) => set(() => ({ currentUsers: data })),

  addUser: (data: UserType) =>
    set((state) => ({
      currentUsers: [...state.currentUsers, data],
    })),
  updateUser: (data: UserType) =>
    set((state) => ({
      currentUsers: state.currentUsers.map((item) =>
        item.id === data.id ? data : item
      ),
    })),
}));
