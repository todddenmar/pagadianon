import React from 'react';

function Banner() {
  return (
    <div className="h-[600px] w-full flex flex-col items-center justify-center relative  dark:bg-black overflow-hidden">
      <div
        className=" bg-cover bg-center inset-0 absolute opacity-20 dark:opacity-35"
        style={{ backgroundImage: `url('/images/pagadian-banner.png')` }}
      ></div>
      <div
        className="inset-0 absolute z-10"
        style={{ backgroundImage: `url('/images/dot-overlay.webp')` }}
      ></div>
      <div className="flex dark:text-white text-center flex-col items-center z-20 p-2 md:p-5 max-w-full">
        <h1 className="text-4xl md:text-6xl font-bold uppercase">
          Discover Local Gems and Hidden Treasures
        </h1>
        <p className="mt-5 max-w-xl text-lg md:text-2xl">
          Welcome to Pagadianon, your online resource for navigating and
          thriving in our vibrant city.
        </p>
      </div>
    </div>
  );
}

export default Banner;
