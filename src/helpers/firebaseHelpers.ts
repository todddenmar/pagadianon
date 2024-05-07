import { db } from '@/firebase';
import { ProductType, StoreType, UserType } from '@/typings';
import { error } from 'console';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

export const dbAddNewStore = async (data: StoreType) => {
  try {
    await setDoc(doc(db, 'stores', String(data.id)), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
};

export const dbAddStoreUser = async (data: UserType) => {
  try {
    await setDoc(doc(db, 'users', String(data.id)), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
};

export const dbUpdateSettings = async (data: any) => {
  try {
    await setDoc(doc(db, 'root', 'settings'), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateUserStores = async ({
  id,
  stores,
}: {
  id: string;
  stores: string[];
}) => {
  const userRef = doc(db, 'users', String(id));
  try {
    await updateDoc(userRef, {
      stores: stores,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateStore = async (data: StoreType) => {
  const userRef = doc(db, 'stores', String(data.id));
  try {
    await updateDoc(userRef, data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateStoreSettings = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const userRef = doc(db, 'stores', String(id));
  try {
    await updateDoc(userRef, {
      settings: data,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateStoreSchedules = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const userRef = doc(db, 'stores', String(id));
  try {
    await updateDoc(userRef, {
      schedules: data,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetRootSettings = async () => {
  const docRef = doc(db, 'root', 'settings');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { status: 'success', data: docSnap.data() };
  } else {
    return { status: 'error', error: 'settings not found' };
  }
};

export const dbGetStores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'stores'));
    let storesArray: any[] = [];
    querySnapshot.forEach((doc) => {
      storesArray.push(doc.data());
    });
    return { status: 'success', data: storesArray };
  } catch (error) {
    return { status: 'error' };
  }
};

export const dbGetUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    let usersArray: any[] = [];
    querySnapshot.forEach((doc) => {
      usersArray.push(doc.data());
    });
    return { status: 'success', data: usersArray };
  } catch (error) {
    return { status: 'error' };
  }
};

export const dbSetUserUpdates = async (data: any) => {
  try {
    await setDoc(doc(db, 'users', String(data.id)), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetUserData = async (email: string) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    let results: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      results.push(doc.data());
    });
    return { status: 'success', data: results[0] };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetStoreData = async (slug: string) => {
  try {
    const q = query(collection(db, 'stores'), where('slug', '==', slug));
    let results: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      results.push(doc.data());
    });
    return { status: 'success', data: results[0] };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetStoreProducts = async (storeID: string) => {
  try {
    const q = query(collection(db, 'stores', storeID, 'products'));
    let results: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      results.push(doc.data());
    });
    return { status: 'success', data: results };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbAddStoreProduct = async ({
  storeID,
  data,
}: {
  storeID: string;
  data: ProductType;
}) => {
  try {
    await setDoc(doc(db, 'stores', storeID, 'products', data.id), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateProductImages = async ({
  storeID,
  productID,
  data,
}: {
  storeID: string;
  productID: string;
  data: string[] | null | undefined;
}) => {
  const userRef = doc(db, 'stores', storeID, 'products', productID);
  try {
    await updateDoc(userRef, {
      images: data,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};