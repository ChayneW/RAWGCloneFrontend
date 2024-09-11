// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { fetchDetails } from "@/app/lib/api";

// interface GameModalProps {
//   gameId: number;
//   onClose: () => void; // Ensure onClose is a function
// }

// const GameModal =({ gameId, onClose }: GameModalProps) => {
//   const [isOpen, setIsOpen] = useState(true); // Assuming modal starts open
//   const [gameDetail, setGameDetail] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.8 },
//   };

//   const getData = async () => {
//     try {
//       setLoading(true);
//       const details = await fetchDetails(gameId);
//       setGameDetail(details);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       getData();
//     }
//   }, [isOpen]);

//   // Call onClose when modal is closed
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
//             className="relative w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] bg-white p-6 rounded-lg shadow-lg"
//             variants={modalVariants}
//           >
//             <div className="absolute right-4 top-4">
//               <button
//                 className="absolute top-4 right-4 p-2 bg-gray-600 rounded-full text-gray-500 hover:text-gray-700"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Close</span>
//               </button>
//             </div>
//             <div className="mt-6 h-full overflow-y-auto text-black">
//               <h2 className="text-lg font-semibold mb-4">Large Modal Content</h2>
//               <p className="mb-4">
//                 This is a large modal that takes up 80% of the screen. You can add any content here.
//               </p>
//               <input placeholder="choose a #:" />

//               {loading && <p>Loading...</p>}
//               {error && <p className="text-red-500">Error: {error}</p>}
//               {gameDetail && <div>{JSON.stringify(gameDetail)}</div>}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export default GameModal;



"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { fetchDetails } from "@/app/lib/api";

interface GameModalProps {
  gameId: number;
  onClose: () => void;
}

interface GameDetail {
  // Define the structure of the game detail object based on your API response
  id: number;
  name: string;
  description: string;
  // Add other fields as necessary
}

const GameModal = ({ gameId, onClose }: GameModalProps) => {
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
      const details = await fetchDetails(gameId);
      console.log( "details:", details)
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
            className="relative w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] bg-white p-6 rounded-lg shadow-lg"
            variants={modalVariants}
          >
            <div className="absolute right-4 top-4">
              <button
                className="absolute top-4 right-4 p-2 bg-gray-600 rounded-full text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="mt-6 h-full overflow-y-auto text-black">
              <h2 className="text-lg font-semibold mb-4">Large Modal Content</h2>
              <p className="mb-4">
                This is a large modal that takes up 80% of the screen. You can add any content here.
              </p>
              {/* <input placeholder="choose a #:" /> */}

              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {gameDetail && <div>{JSON.stringify(gameDetail)}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
