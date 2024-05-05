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
