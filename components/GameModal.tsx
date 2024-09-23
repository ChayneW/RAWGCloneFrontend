"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { fetchDetails } from "@/app/lib/api";
import parse from 'html-react-parser'; // Import the library
import Image from "next/image";
import LoaderUI from "./ui/LoaderUI";

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
  rating: number;
  reviews_count: number;
  parent_platforms: Platform[];
  added_by_status: AddedByStatus;
}

interface Screenshot {
  id: number;
  image: string;
}

interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

const platformRef: {[key: string] : string} = {
  mac:"/icons/apple-icon.svg",
  pc:"/icons/windows-icon.svg",
  playstation:"/icons/playstation-icon.svg",
  android:"/icons/android-icon.svg",
  linux:"/icons/linux-icon.svg",
  nintendo:"/icons/nintendo-icon.svg",
  web:"/icons/web-icon.svg",
  xbox:"/icons/xbox-icon.svg",
  // :"/icons/"
}

const GameModal = ({ gameId, onClose, screenshots }: GameModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [gameDetail, setGameDetail] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const getData = useCallback(async () => {
    try {
      // setLoading(true);
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

  // if (loading) {
  //   return <div className='grid justify-center text-white py-32'>
  //     {/* <h1 className='text-center'>Loading...</h1> */}
  //     {/* <MiniLoader/> */}
  //       <div className=''>
  //         <LoaderUI/>
  //       </div>
  //     </div>;
  // }


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
                  className="p-2 bg-gray-300 rounded-full text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="mt-6 h-full overflow-y-auto text-white">

                <h2 className="text-3xl font-semibold mb-4 text-center">{gameDetail?.name}</h2>

                {/* parent platforms: */}
                <div className='flex justify-center py-2'>
                  {gameDetail?.parent_platforms.map((platform) => (
                    <div key={platform.platform.id} className='mr-2'>
                      <Image
                        src={platformRef[platform.platform.slug] || '/icons/web-icon.svg'} // Fallback to a default icon
                        alt={platform.platform.name}
                        width={30}
                        height={30}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="grid justify-center max-md:px-auto items-center md:flex md:justify-around py-5 gap-5">
                  
                  <div className="bg-black px-10 rounded-lg grid text-center items-center">
                    <h2 className="text-lg font-semibold my-2">Metacritic: {gameDetail?.metacritic}</h2>
                    <h2 className="text-lg font-semibold my-2">Reviews: {gameDetail?.reviews_count}</h2>
                  </div>
                  
                  <div className="flex justify-between bg-slate-600 gap-5 p-5 rounded-2xl">
                    <div className="grid justify-center text-center">
                      <Image
                        className="flex mx-auto"
                        alt="want-game-img"
                        width={50}
                        height={50}
                        src={'/icons/clock-icon.svg'}
                      />
                      <h1>Want</h1>
                      <h1 className="text-center">{gameDetail?.added_by_status?.yet}</h1>
                    </div>

                    <div className="grid justify-center text-center">
                      <Image
                        className="flex mx-auto"
                        alt="want-game-img"
                        width={50}
                        height={50}
                        src={'/icons/controller-icon.svg'}
                      />
                      <h1>Playing</h1>
                      <h1>{gameDetail?.added_by_status?.playing}</h1>

                    </div>

                    <div className="grid justify-center text-center">
                      <Image
                        className="flex mx-auto"
                        alt="want-game-img"
                        width={50}
                        height={50}
                        src={'/icons/checked-icon.svg'}
                      />
                      <h1>Have</h1>
                      <h1>{gameDetail?.added_by_status?.beaten}</h1>
                    </div>
                  </div>

                </div>

                <div>  
                  <h3 className="mb-4">
                    {gameDetail?.description ? parse(gameDetail.description) : ""}
                  </h3>
                  {loading && <LoaderUI/>}
                  {error && <p className="text-red-500">Error: {error}</p>}
                </div>
                
                <div className="py-10">
                  {/* Display screenshots */}
                  <h1 className="text-center font-semibold text-2xl">Screenshots:</h1>

                  <div className="grid px-auto justify-center mt-4 gap-10 md:grid-cols-2">
                    {screenshots.map((screenshot) => (
                      <div
                        key={screenshot.id}
                        className="flex justify-center"
                      >
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
                      </div>
                    ))}
                  </div>

                  {/* <FloatingDockScreenshots
                    screenshots={screenshots}
                    desktopClassName="custom-desktop-class"
                    mobileClassName="custom-mobile-class"
                  /> */}

                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )}

export default GameModal;