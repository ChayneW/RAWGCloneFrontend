// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { fetchDetails } from "@/app/lib/api";
// import parse from 'html-react-parser'; // Import the library


// interface Screenshot {
//   id: number;
//   image: string;
// }

// interface GameModalProps {
//   gameId: number;
//   onClose: () => void;
//   screenshots: Screenshot[]; // Add this prop
// }

// interface GameDetail {
//   id: number;
//   name: string;
//   description: string;
//   background_image: string;
//   background_image_additional: string; // Add this field to the GameDetail interface
//   metacritic: number;
//   reviews_count: number;

// }

// const GameModal = ({ gameId, onClose }: GameModalProps) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [gameDetail, setGameDetail] = useState<GameDetail | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.8 },
//   };

//   const getData = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('inside GAMEMODAL, PASSING ID:', gameId);
//       const details = await fetchDetails(gameId);
//       console.log('FINISHED making fetchDetails() call:');
//       console.log("details:", details);
//       setGameDetail(details);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [gameId]);

//   useEffect(() => {
//     if (isOpen) {
//       getData();
//     }
//   }, [isOpen, getData]);

//   useEffect(() => {
//     if (!isOpen) {
//       onClose();
//     }
//   }, [isOpen, onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center"
//           variants={modalVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <motion.div
//             className="relative w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden"
//             style={{
//               backgroundImage: gameDetail?.background_image ? `url(${gameDetail.background_image})` : `url(${gameDetail?.background_image_additional})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//             variants={modalVariants}
//           >
//             {/* Overlay to improve text readability */}
//             <div className="absolute inset-0 bg-black/60 z-10" />

//             <div className="relative z-20 p-6 h-full flex flex-col">
//               <div className="absolute right-4 top-4 z-30">
//                 <button
//                   className="p-2 bg-gray-600 rounded-full text-gray-500 hover:text-gray-700"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <X className="h-4 w-4" />
//                   <span className="sr-only">Close</span>
//                 </button>
//               </div>
//               <div className="mt-6 h-full overflow-y-auto text-white">
//                 <h2 className="text-lg font-semibold mb-4">{gameDetail?.name}</h2>
//                 {/* <p className="mb-4">
//                   {gameDetail?.name}
//                 </p> */}
//                 <h2 className="text-lg font-semibold mb-4">Metacritic: {gameDetail?.metacritic}</h2>
//                 <h2 className="text-lg font-semibold mb-4">Reviews: {gameDetail?.reviews_count}</h2>
//                 <p className="mb-4">
//                 {gameDetail?.description ? parse(gameDetail.description) : ""}
//                 </p>
//                 {loading && <p>Loading...</p>}
//                 {error && <p className="text-red-500">Error: {error}</p>}
//                 {/* {gameDetail && <div>{JSON.stringify(gameDetail)}</div>} */}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default GameModal;



// // interface Screenshot {
// //   id: number;
// //   image: string;
// // }

// // interface ScreenshotProps {
// //   screenshots: Screenshot[];
// // }


"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { fetchDetails } from "@/app/lib/api";
import parse from 'html-react-parser'; // Import the library
import Image from "next/image";

interface GameModalProps {
  gameId: number;
  onClose: () => void;
  screenshots: Screenshot[]; // Add this prop
}

interface GameDetail {
  id: number;
  name: string;
  description: string;
  background_image: string;
  background_image_additional: string;
  metacritic: number;
  reviews_count: number;
}

interface Screenshot {
  id: number;
  image: string;
}

const GameModal = ({ gameId, onClose, screenshots }: GameModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [gameDetail, setGameDetail] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('inside GAMEMODAL, PASSING ID:', gameId);
      const details = await fetchDetails(gameId);
      console.log('FINISHED making fetchDetails() call:');
      console.log("details:", details);
      setGameDetail(details);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    if (isOpen) {
      getData();
    }
  }, [isOpen, getData]);

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundImage: gameDetail?.background_image ? `url(${gameDetail.background_image})` : `url(${gameDetail?.background_image_additional})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            variants={modalVariants}
          >
            {/* Overlay to improve text readability */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            <div className="relative z-20 p-6 h-full flex flex-col">
              <div className="absolute right-4 top-4 z-30">
                <button
                  className="p-2 bg-gray-600 rounded-full text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="mt-6 h-full overflow-y-auto text-white">
                <h2 className="text-lg font-semibold mb-4">{gameDetail?.name}</h2>
                <h2 className="text-lg font-semibold mb-4">Metacritic: {gameDetail?.metacritic}</h2>
                <h2 className="text-lg font-semibold mb-4">Reviews: {gameDetail?.reviews_count}</h2>
                <p className="mb-4">
                  {gameDetail?.description ? parse(gameDetail.description) : ""}
                </p>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                
                {/* Display screenshots */}
                <h1 className="text-center font-semibold text-2xl">Screenshots:</h1>

                <div className="grid mt-4 md:grid-cols-2">
                  {screenshots.map((screenshot) => (
                    <>
                      <Image
                        key={screenshot.id}
                        src={screenshot.image}
                        alt={`Screenshot ${screenshot.id}`}
                        width={300} // adjust as needed
                        height={200} // adjust as needed
                        className="mb-2 rounded-lg md:hidden"
                      />
                      <Image
                        key={screenshot.id}
                        src={screenshot.image}
                        alt={`Screenshot ${screenshot.id}`}
                        width={500} // adjust as needed
                        height={300} // adjust as needed
                        className="mb-2 rounded-lg max-md:hidden"
                      />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )}

export default GameModal;