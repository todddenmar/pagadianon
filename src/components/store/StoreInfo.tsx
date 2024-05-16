'use client';
import React, { useState } from 'react';
import StoreBusinessHoursSection from './StoreBusinessHoursSection';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { cn } from '@/lib/utils';
function StoreInfo() {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:items-start">
        <div>
          <h4 className="font-semibold text-lg md:text-2xl">Gallery</h4>
          <div className="w-full relative rounded-md overflow-hidden mt-3 aspect-square flex flex-col items-center justify-start">
            {currentStoreData?.galleryImages ? (
              <div className="flex w-full relative gap-2">
                <div className="hidden sm:block sm:w-1/6 md:w-[60px] lg:w-1/6">
                  <Swiper
                    className="w-full"
                    spaceBetween={10}
                    modules={[Thumbs]}
                    direction="vertical"
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    slidesPerView="auto"
                    onSlideChange={(e) => setImageIndex(e.activeIndex)}
                  >
                    {currentStoreData?.galleryImages?.map(
                      (item: string, idx: number) => {
                        return (
                          <SwiperSlide
                            key={`image-item-${idx}`}
                            className={cn('h-fit aspect-square')}
                          >
                            <Image
                              src={item}
                              alt={`carousel-item-big-${idx}`}
                              width={80}
                              height={80}
                              className={cn(
                                'border rounded-lg opacity-50 object-contain aspect-square',
                                {
                                  'border-white border opacity-100':
                                    imageIndex === idx,
                                }
                              )}
                            />
                          </SwiperSlide>
                        );
                      }
                    )}
                  </Swiper>
                </div>
                <div className="flex-1 w-[250px] sm:w-5/6 md:w-[250px] lg:w-5/6">
                  <Swiper
                    className="border rounded-lg"
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    slidesPerView={1}
                    onSlideChange={(e) => setImageIndex(e.activeIndex)}
                  >
                    {currentStoreData?.galleryImages?.map(
                      (item: string, idx: number) => {
                        return (
                          <SwiperSlide
                            key={`image-item-${idx}`}
                            className="w-full aspect-square"
                          >
                            <Image
                              src={item}
                              alt={`carousel-item-small-${idx}`}
                              fill
                              sizes="100%"
                              className="w-full h-full object-contain"
                            />
                          </SwiperSlide>
                        );
                      }
                    )}
                  </Swiper>
                </div>
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                <ImageIcon />
              </div>
            )}
          </div>
        </div>
        <StoreBusinessHoursSection />
      </div>
    </div>
  );
}

export default StoreInfo;
