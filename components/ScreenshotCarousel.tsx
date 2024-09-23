import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import LoaderUI from './ui/LoaderUI'; // Make sure to import your loader

interface Screenshot {
  id: number;
  image: string;
}

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
}

const DISPLAY_TIME = 2000; // 2 seconds

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ screenshots }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, [goToNext, currentIndex]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Image and Loader Container */}
      <div className="relative w-full h-full">
        {/* Image */}
        {screenshots.length > 0 && (
          <Image
            className="rounded-t-2xl"
            src={screenshots[currentIndex].image}
            alt={`Screenshot ${currentIndex + 1}`}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}

        {/* Loader */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-[5] px-10">
          <div className='flex justify-center'>
            <LoaderUI />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
