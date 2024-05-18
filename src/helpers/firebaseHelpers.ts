import { kOrderProgress } from '@/constants';
import { db, storage } from '@/firebase';
import {
  CustomerType,
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
  addDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import moment from 'moment';

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
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  try {
    await setDoc(
      doc(db, 'orders', String(year), String(month), String(data.id)),
      data
    );
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetOrderData = async ({
  orderID,
  year,
  month,
}: {
  orderID: string;
  year: string;
  month: string;
}) => {
  const docRef = doc(db, 'orders', String(year), String(month), orderID);
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

export const dbUpdateStoreCartStatus = async ({
  orderID,
  storesInvolved,
}: {
  orderID: string;
  storesInvolved: any[] | undefined;
}) => {
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  const userRef = doc(
    db,
    'orders',
    String(year),
    String(month),
    String(orderID)
  );
  try {
    await updateDoc(userRef, {
      storesInvolved: storesInvolved,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbConfirmOrderByDeliveryService = async ({
  orderID,
  data,
  progressStatus,
}: {
  orderID: string;
  data: {
    id: string;
    isConfirmed: boolean;
    rider: any;
    fee: string;
    confirmedDateTime: string;
  };
  progressStatus: string;
}) => {
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  const userRef = doc(
    db,
    'orders',
    String(year),
    String(month),
    String(orderID)
  );
  try {
    await updateDoc(userRef, {
      deliveryServiceInfo: data,
      progressStatus: progressStatus,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetOrderDataByID = async ({ id }: { id: string }) => {
  const docRef = doc(db, 'stores', String(id));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { status: 'success', data: docSnap.data() };
  } else {
    return { status: 'error', error: 'settings not found' };
  }
};

export const dbGetStoreOrdersByID = async ({
  id,
  year,
  month,
}: {
  id: string;
  year: string;
  month: string;
}) => {
  try {
    const q = query(
      collection(db, 'orders', String(year), String(month)),
      where('storeIDs', 'array-contains', String(id))
    );
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

export const dbGetCustomerDataByEmail = async ({
  email,
}: {
  email: string;
}) => {
  const docRef = doc(db, 'customers', String(email));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { status: 'success', data: docSnap.data() };
  } else {
    return { status: 'error', error: 'settings not found' };
  }
};

export const dbSaveCustomerData = async ({ data }: { data: CustomerType }) => {
  try {
    await setDoc(doc(db, 'customers', String(data.email)), data);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetOrdersByEmail = async ({ email }: { email: string }) => {
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  try {
    const q = query(
      collection(db, 'orders', String(year), String(month)),
      where('customerEmail', '==', email)
    );
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

export const dbConfirmOrderReceived = async ({
  orderID,
  orderReceivedNote,
}: {
  orderID: string;
  orderReceivedNote: string;
}) => {
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  const userRef = doc(
    db,
    'orders',
    String(year),
    String(month),
    String(orderID)
  );
  try {
    await updateDoc(userRef, {
      orderReceivedNote: orderReceivedNote,
      status: kOrderProgress.RECEIVED,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbAddStoreImage = async ({
  storeID,
  data,
}: {
  storeID: string;
  data: any;
}) => {
  try {
    const docRef = await addDoc(
      collection(db, 'stores', String(storeID), 'images'),
      data
    );
    return { status: 'success', data: docRef.id };
  } catch (error) {
    return { status: 'error', error };
  }
};
export const dbUpdateStoreImage = async ({
  storeID,
  imageID,
  downloadURL,
}: {
  storeID: string;
  imageID: string;
  downloadURL: string;
}) => {
  const userRef = doc(db, 'stores', String(storeID), 'images', imageID);
  try {
    await updateDoc(userRef, {
      downloadURL: downloadURL,
      imageID,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};
export const dbUpdateStoreGalleryImages = async ({
  storeID,
  images,
}: {
  storeID: string;
  images: string[];
}) => {
  const userRef = doc(db, 'stores', String(storeID));
  try {
    await updateDoc(userRef, {
      galleryImages: images,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetStoreImages = async ({ storeID }: { storeID: string }) => {
  try {
    const q = query(
      collection(db, 'stores', String(storeID), 'images'),
      where('isArchived', '==', false)
    );
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

export const dbDeleteStorageImage = async ({
  storeID,
  imageID,
}: {
  storeID: string;
  imageID: string;
}) => {
  try {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `stores/${storeID}/files/${imageID}`);
    const imageRef = doc(
      db,
      'stores',
      String(storeID),
      'images',
      String(imageID)
    );
    await updateDoc(imageRef, {
      isArchived: true,
    });
    // Delete the file
    await deleteObject(desertRef);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbAddAdminImage = async ({ data }: { data: any }) => {
  try {
    const docRef = await addDoc(
      collection(db, 'root', 'settings', 'images'),
      data
    );
    return { status: 'success', data: docRef.id };
  } catch (error) {
    return { status: 'error', error };
  }
};
export const dbUpdateAdminImage = async ({
  imageID,
  downloadURL,
}: {
  imageID: string;
  downloadURL: string;
}) => {
  const userRef = doc(db, 'root', 'settings', 'images', imageID);
  try {
    await updateDoc(userRef, {
      downloadURL: downloadURL,
      imageID,
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const dbGetRootSettingsImages = async () => {
  try {
    const q = query(
      collection(db, 'root', 'settings', 'images'),
      where('isArchived', '==', false)
    );
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


export const dbUpdateProductVariantStock = async ({
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