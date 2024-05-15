import { CartItemType } from '@/typings';

export const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const getLocalStorageCart = () => {
  if (typeof window !== 'undefined') {
    const item: any = localStorage.getItem('cart');
    const localCart: any = JSON.parse(item);
    const cart: any =
      localCart?.map((item: any) => ({
        ...item,
        price: parseInt(item.price),
        totalAmount: parseInt(item.totalAmount),
        quantity: parseInt(item.quantity),
      })) || [];
    return item ? cart : [];
  }
  return [];
};
