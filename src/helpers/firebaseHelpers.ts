import { db } from '@/firebase';
import {
  DeliveryServiceType,
  OrderType,
  ProductType,
  StoreType,
  UserType,
  VariantType,
} from '@/typings';
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

export const dbGetDeliveryServices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'delivery_services'));
    let deliveryServicesArray: any[] = [];
    querySnapshot.forEach((doc) => {
      deliveryServicesArray.push(doc.data());
    });
    return { status: 'success', data: deliveryServicesArray };
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
export const dbUpdateStoreProduct = async ({
  storeID,
  productID,
  data,
}: {
  storeID: string;
  productID: string;
  data: ProductType;
}) => {
  const userRef = doc(
    db,
    'stores',
    String(storeID),
    'products',
    String(productID)
  );
  try {
    await updateDoc(userRef, {
      category: data.category,
      name: data.name,
      description: data.description,
      slug: data.slug,
      tags: data.tags,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateStoreVariants = async ({
  storeID,
  productID,
  data,
}: {
  storeID: string;
  productID: string;
  data: VariantType[];
}) => {
  const userRef = doc(
    db,
    'stores',
    String(storeID),
    'products',
    String(productID)
  );
  try {
    await updateDoc(userRef, {
      variants: data,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateProductImages = async ({
  storeID,
  images,
}: {
  storeID: string;
  images: string[];
}) => {
  const userRef = doc(db, 'stores', String(storeID));
  try {
    await updateDoc(userRef, {
      images: images,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdatePublish = async ({
  storeID,
  isPublished,
}: {
  storeID: string;
  isPublished: boolean;
}) => {
  const userRef = doc(db, 'stores', String(storeID));
  try {
    await updateDoc(userRef, {
      isPublished: isPublished,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbCreateOrder = async ({ data }: { data: OrderType }) => {
  try {
    await setDoc(doc(db, 'orders', String(data.id)), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetOrderData = async (id: string) => {
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { status: 'success', data: docSnap.data() };
  } else {
    return { status: 'error', error: 'settings not found' };
  }
};

export const dbAddDeliveryService = async ({
  data,
}: {
  data: DeliveryServiceType;
}) => {
  try {
    await setDoc(doc(db, 'delivery_services', String(data.id)), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbUpdateDeliveryService = async (data: DeliveryServiceType) => {
  const userRef = doc(db, 'delivery_services', String(data.id));
  try {
    await updateDoc(userRef, data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};