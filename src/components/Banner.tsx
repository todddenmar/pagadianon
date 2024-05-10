import Image from 'next/image';
import React from 'react';
import ContainerLayout from './layouts/ContainerLayout';

function Banner() {
  return (
    <section className="bg-neutral-100 dark:bg-neutral-900 relative lg:h-[500px] flex flex-col items-center justify-center">
      <div
        className="inset-0 absolute z-10"
        style={{ backgroundImage: `url('/images/dot-overlay.webp')` }}
      ></div>
      <ContainerLayout>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 relative">
          <div className="relative flex dark:text-white text-center md:text-start flex-col  justify-center items-start z-20 py-5 md:py-2 ">
            <div className="">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
                Discover Local Gems and Hidden Treasures
              </h1>
              <p className="mt-2 md:mt-5 max-w-xl text-base lg:text-2xl">
                Welcome to Pagadianon, your online resource for navigating and
                thriving in our vibrant city.
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center p-5">
            <Image
              src={'/images/pagadianon-light.svg'}
              height={400}
              width={400}
              alt="image banner"
              className="hidden h-[300px] md:h-[250px] lg:h-[400px] dark:block"
              priority={true}
            />
            <Image
              src={'/images/pagadianon-logo.svg'}
              height={400}
              width={400}
              alt="image banner"
              className=" block h-[300px] md:h-[250px] lg:h-[400px] dark:hidden"
              priority={true}
            />
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default Banner;
