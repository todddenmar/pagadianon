import { StoreType, UserType } from '@/typings';
import { create } from 'zustand';

interface AppState {
  isDataFetched: boolean;
  setIsDataFetched: (open: boolean) => void;

  isCreatingModalOpen: boolean;
  setIsCreatingModalOpen: (open: boolean) => void;

  isStoreUsersModalOpen: boolean;
  setIsStoreUsersModalOpen: (open: boolean) => void;

  currentSettings: any;
  setCurrentSettings: (currentSettings: any) => void;

  currentUserData: any;
  setCurrentUserData: (currentUserData: any) => void;

  currentStoreData: any;
  setCurrentStoreData: (currentStoreData: any) => void;

  currentUserStores: any[];
  setCurrentUserStores: (currentUserStores: any[]) => void;

  currentStoreProducts: any[];
  setCurrentStoreProducts: (currentStoreProducts: any[]) => void;

  currentStoreSanityImages: any[];
  setCurrentStoreSanityImages: (currentStoreSanityImages: any[]) => void;

  currentStores: any[];
  setCurrentStores: (currentStores: any[]) => void;
  addStore: (Store: any) => void;
  updateStore: (Store: any) => void;

  currentUsers: any[];
  setCurrentUsers: (currentUsers: any[]) => void;
  addUser: (user: any) => void;
  updateUser: (user: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDataFetched: false,
  setIsDataFetched: (data) => set(() => ({ isDataFetched: data })),

  isCreatingModalOpen: false,
  setIsCreatingModalOpen: (data) => set(() => ({ isCreatingModalOpen: data })),

  isStoreUsersModalOpen: false,
  setIsStoreUsersModalOpen: (data) =>
    set(() => ({ isStoreUsersModalOpen: data })),

  currentSettings: null,
  setCurrentSettings: (data: any) => set(() => ({ currentSettings: data })),

  currentUserData: null,
  setCurrentUserData: (data: any) => set(() => ({ currentUserData: data })),

  currentStoreData: null,
  setCurrentStoreData: (data: any) => set(() => ({ currentStoreData: data })),

  currentUserStores: [],
  setCurrentUserStores: (data: any[]) =>
    set(() => ({ currentUserStores: data })),

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
