// import React, { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';


// interface Screenshot {
//   id: number;
//   image: string;
// }

// interface ScreenshotCarouselProps {
//   screenshots: Screenshot[];
// }

// const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ screenshots }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (screenshots.length > 1) {
//       const id = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
//       }, 2000); // Change image every 2 seconds
//       setIntervalId(id);
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [screenshots, intervalId]);

//   return (
//     <div className="relative w-[100%] h-[200px] overflow-hidden">
//       {screenshots.length > 0 && (
//         <Image
//           className="rounded-2xl"
//           src={screenshots[currentIndex].image}
//           alt="Screenshot"
//           fill
//           priority
//           style={{ objectFit: 'cover' }}
//         />
//       )}
//     </div>
//   );
// };

// export default ScreenshotCarousel;





// import React, { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface Screenshot {
//   id: number;
//   image: string;
// }

// interface ScreenshotCarouselProps {
//   screenshots: Screenshot[];
// }

// const DISPLAY_TIME = 2000; // 2 seconds

// const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ screenshots }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);

//   const goToNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
//     setProgress(0);
//   }, [screenshots.length]);

//   const goToPrevious = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
//     setProgress(0);
//   }, [screenshots.length]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           goToNext();
//           return 0;
//         }
//         return prevProgress + 100 / (DISPLAY_TIME / 100); // Update 10 times per second
//       });
//     }, 100);

//     return () => clearInterval(timer);
//   }, [goToNext]);

//   return (
//     <div className="relative w-[100%] h-[300px] overflow-hidden">
//       <div className="absolute bottom-0 left-0 right-0 flex justify-center">
//         {screenshots.map((_, index) => (
//           <div key={index} className="flex-1 h-1 mx-1 bg-gray-200">
//             <div
//               className="h-full"
//               style={{
//                 width: `${index === currentIndex ? progress : index < currentIndex ? 100 : 0}%`,
//                 transition: "width 0.1s linear",
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       {screenshots.length > 0 && (
//         <Image
//           className="rounded-2xl"
//           src={screenshots[currentIndex].image}
//           alt={`Screenshot ${currentIndex + 1}`}
//           fill
//           priority
//           style={{ objectFit: 'cover' }}
//         />
//       )}
      
//     </div>
//   );
// };

// export default ScreenshotCarousel;


// import React, { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';

// interface Screenshot {
//   id: number;
//   image: string;
// }

// interface ScreenshotCarouselProps {
//   screenshots: Screenshot[];
// }

// const DISPLAY_TIME = 2000; // 2 seconds

// const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ screenshots }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);

//   const goToNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
//     setProgress(0);
//   }, [screenshots.length]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           goToNext();
//           return 0;
//         }
//         return prevProgress + 100 / (DISPLAY_TIME / 100); // Update 10 times per second
//       });
//     }, 100);

//     return () => clearInterval(timer);
//   }, [goToNext]);

//   return (
//     <div className="relative w-full h-[300px] overflow-hidden">
//       {/* Progress Bar */}
//       <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10">
//         <div className="relative w-full h-1 bg-gray-200">
//           <div
//             className="absolute top-0 left-0 h-full bg-blue-500"
//             style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
//           />
//         </div>
//       </div>

//       {screenshots.length > 0 && (
//         <Image
//           className="rounded-2xl"
//           src={screenshots[currentIndex].image}
//           alt={`Screenshot ${currentIndex + 1}`}
//           fill
//           priority
//           style={{ objectFit: 'cover' }}
//         />
//       )}
//     </div>
//   );
// };

// export default ScreenshotCarousel;


import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

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
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    setProgress(0);
  }, [screenshots.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          goToNext();
          return 0;
        }
        return prevProgress + 100 / (DISPLAY_TIME / 100); // Update 10 times per second
      });
    }, 100);

    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Image and Progress Bar Container */}
      <div className="relative w-full h-full">
        {/* Image */}
        {screenshots.length > 0 && (
          <Image
            className="rounded-2xl"
            src={screenshots[currentIndex].image}
            alt={`Screenshot ${currentIndex + 1}`}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}

        {/* Progress Bar */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10 px-10">
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotCarousel;

