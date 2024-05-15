import { urlFor } from '@/lib/client';
import {
  CartItemType,
  DeliveryServiceType,
  ProductType,
  StoreType,
} from '@/typings';
import _ from 'lodash';

export const checkSlugExists = ({
  slug,
  list,
}: {
  slug: string;
  list: any[];
}) => {
  const res = list?.filter((item) => item.slug === slug);
  if (res) {
    return res.length;
  } else {
    return false;
  }
};
export const checkSlugExistsOnOtherStore = ({
  slug,
  id,
  list,
}: {
  slug: string;
  id: string;
  list: any[];
}) => {
  const res = list?.filter((item) => item.slug === slug && item.id != id);
  if (res) {
    return res.length;
  } else {
    return false;
  }
};

export const checkSlugExistsOnOtherList = ({
  slug,
  id,
  list,
}: {
  slug: string;
  id: string;
  list: any[];
}) => {
  const res = list?.filter((item) => item.slug === slug && item.id != id);
  if (res?.length > 0) {
    return res.length;
  } else {
    return false;
  }
};

export const getImageURLsFromSanityStoreBySlug = ({
  sanityStores,
  slug,
}: {
  sanityStores: any;
  slug: string;
}) => {
  const sanityStore = sanityStores.data.find(
    (item: any) => item.slug.current === slug
  );
  let images: string[] | null = [];
  sanityStore.images?.forEach((item: any) => {
    const src = urlFor(item).url();
    images.push(src);
  });
  return images;
};

export const getAllUniqueTagsFromItems = (
  items: StoreType[] | ProductType[]
) => {
  let tags: string[] = [];
  items.forEach((item) => {
    item.tags?.split(',').forEach((tag: string) => {
      if (!tags.includes(tag)) {
        tags.push(tag.trim());
      }
    });
  });
  return tags;
};

export const compareEqualStrings = (a: string, b: string) => {
  const firstString = _.kebabCase(a.trim());
  const secondString = _.kebabCase(b.trim());
  return firstString === secondString;
};
export const compareIncludesStrings = (a: string, b: string) => {
  const firstString = _.kebabCase(a.trim());
  const secondString = _.kebabCase(b.trim());
  return firstString.includes(secondString);
};

export const pluralizeNumber = ({
  plural,
  singular,
  number,
}: {
  plural: string;
  singular: string;
  number: number;
}) => {
  if (number === 0) {
    return number;
  }
  if (number === 1) {
    return `${number} ${singular}`;
  }
  if (number > 1) {
    return `${number} ${plural}`;
  }
  if (number < 0) {
    return number;
  }
};

export const getCartTotal = ({ cart }: { cart: CartItemType[] }) => {
  let total = 0;
  cart.forEach((item) => {
    total = total + item.totalAmount;
  });
  return total;
};

export const convertStringCoordinatesToObject = (stringCoordinates: string) => {
  return {
    latitude: parseFloat(
      stringCoordinates
        .replaceAll('(', '')
        .replaceAll(')', '')
        .trim()
        .split(',')[0]
    ),
    longitude: parseFloat(
      stringCoordinates
        .replaceAll('(', '')
        .replaceAll(')', '')
        .trim()
        .split(',')[1]
    ),
  };
};

export const getDirectionByCoordinates = (stringCoordinates: string) => {
  return `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${convertStringCoordinatesToObject(stringCoordinates).latitude},${convertStringCoordinatesToObject(stringCoordinates).longitude}`;
};

export const getStoresByCart = ({
  cart,
  stores,
}: {
  cart: CartItemType[];
  stores: StoreType[];
}) => {
  let storesOrdered: any[] = [];
  cart.forEach((cartItem) => {
    const store = stores.find(
      (storeItem: StoreType) => storeItem.id === cartItem.storeID
    );
    if (!storesOrdered.find((x) => x.storeID === cartItem.storeID)) {
      if (store)
        storesOrdered.push({
          storeID: store.id,
          storeName: store.name,
          storeSlug: store.slug,
        });
    }
  });
  const storesCarts = storesOrdered?.map((item: any) => {
    const cartItems = cart.filter(
      (cartItem: CartItemType) => cartItem.storeID === item.storeID
    );
    return { ...item, cart: cartItems };
  });
  return storesCarts;
};

export const getStoreIDsByCart = ({
  cart,
  stores,
}: {
  cart: CartItemType[];
  stores: StoreType[];
}) => {
  let storesOrdered: any[] = [];
  cart.forEach((cartItem) => {
    const store = stores.find(
      (storeItem: StoreType) => storeItem.id === cartItem.storeID
    );
    if (!storesOrdered.find((x) => x.storeID === cartItem.storeID)) {
      if (store)
        storesOrdered.push({
          storeID: store.id,
          storeSlug: store.slug,
          isConfirmed: false,
          isPickedUp: false,
          isReadyForPickUp: false,
        });
    }
  });
  return storesOrdered;
};

export const getDeliveryServiceUserType = ({
  deliveryServices,
  deliveryServiceID,
  currentEmail,
}: {
  deliveryServices: DeliveryServiceType[];
  deliveryServiceID: string | undefined;
  currentEmail: string;
}) => {
  const deliveryUsers = deliveryServices?.find(
    (deliveryItem: DeliveryServiceType) => deliveryItem.id === deliveryServiceID
  )?.users;
  const userType =
    deliveryUsers?.find(
      (deliveryItem: any) => deliveryItem.email === currentEmail
    )?.roleType || null;
  return userType;
};

export const getOrderLinkByDate = ({
  orderID,
  year,
  month,
}: {
  orderID: string;
  year: string;
  month: string;
}) => {
  return `/order/${orderID}?year=${year}&month=${month}`;
};

 export const playNotification = () => {
   const sound = new Audio('/notification.mp3');
   sound.play();
 };