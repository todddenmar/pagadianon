import { urlFor } from '@/lib/client';
import { ProductType, StoreType } from '@/typings';

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
  if (res.length > 0) {
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
