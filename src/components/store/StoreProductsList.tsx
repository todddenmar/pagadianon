import React, { useEffect, useState } from 'react';
import CustomTagsSlider from '../CustomComponents/CustomTagsSlider';
import { ProductType, VariantType } from '@/typings';
import StoreProductVariantCard from './StoreProductVariantCard';
import { compareEqualStrings } from '@/helpers/appHelpers';
import CustomVariantsSlider from '../CustomComponents/CustomVariantsSlider';
function StoreProductsList({
  variants,
  tags,
  products,
}: {
  variants: VariantType[];
  tags: string[];
  products: ProductType[];
}) {
  const [type, setType] = useState('all');
  const [tag, setTag] = useState('all');
  const [filteredProductVariants, setFilteredProductVariants] = useState<
    VariantType[]
  >([]);
  useEffect(() => {
    if (type === 'all') {
      setFilteredProductVariants(variants);
    } else {
      const res = variants.filter((item) =>
        compareEqualStrings(item.name, type)
      );
      setFilteredProductVariants(res);
    }
  }, [variants, type]);

  const getVariantsByProductTag = (tag: string) => {
    let variantsArray: VariantType[] = [];
    products?.forEach((item) => {
      item.tags?.split(',').forEach((tagItem) => {
        if (compareEqualStrings(tagItem, tag)) {
          item.variants?.forEach((variantItem) => {
            variantsArray.push(variantItem);
          });
        }
      });
    });
    return variantsArray;
  };
  return (
    <div>
      <div className="pb-5">
        <CustomVariantsSlider
          variants={variants}
          value={type}
          onChange={(val) => setType(val)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProductVariants.map((variant) => {
          return (
            <StoreProductVariantCard
              key={`prod-card-${variant.id}`}
              variant={variant}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StoreProductsList;
