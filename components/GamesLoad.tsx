'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GameModal from '@/components/GameModal';
import { fetchGames } from '@/app/lib/api';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import { AnimatedTooltipPreview } from './PeopleLine';
import LoaderUI from './ui/LoaderUI';

interface Game {
  id: number;
  name: string;
  background_image: string;
  short_screenshots: Screenshot[];
  metacritic: number;
  released: string;
  reviews_count: number;
  rating: number;
  genres: Genre[];
  parent_platforms: Platform[];
  added_by_status: AddedByStatus[];
}

interface Screenshot {
  id: number;
  image: string;
}

interface Genre {
  id: number;
  name: string;
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
// [
//     {"android": "/icons/android-icon.svg"}, 
// ]
//   {"pc": "pc"}, 
//   {"playstation"},
//   {"xbox"},
//   {"ios"},
//   {"mac"},
//   {"linux"},
//   {"nintendo"},
//   {"atari"},
//   {"commodore-amiga"},
//   {"sega"},
//   {"3do"},
//   {"neo-geo"},
//   {"web"},
// ]

const GamesLoad = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [hoveredGameId, setHoveredGameId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGames = async () => {
      const fetchedGames = await fetchGames();
      setGames(fetchedGames);
      setIsLoading(false);
    };

    loadGames();
  }, []);

  const handleGameClick = (id: number) => {
    console.log('Game chosen:' + id);
    setSelectedGameId(id);
  };

  const handleCloseModal = () => {
    console.log('Modal closed');
    setSelectedGameId(null);
  };

  const handleMouseEnter = (id: number) => {
    console.log('Hovering:');
    setHoveredGameId(id);
  };

  const handleMouseLeave = () => {
    setHoveredGameId(null);
  };

  const selectedGame = games.find(game => game.id === selectedGameId);


  if (isLoading) {
    return <div className='grid justify-center text-white py-32'>
      {/* <h1 className='text-center'>Loading...</h1> */}
      {/* <MiniLoader/> */}
        <div className='flex justify-center'>
          <LoaderUI/>
        </div>
      </div>;
  }

  return (
    <div className='py-20 md:px-20'>
      <div className="grid lg:grid-cols-3 gap-10">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative grid h-[650px] w-full card-grad cursor-pointer text-white rounded-2xl"
            onMouseEnter={() => handleMouseEnter(game.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleGameClick(game.id)}
          >
            {/* Background Image with 50% opacity */}
            <div
              className="absolute inset-0 z-0 bg-center opacity-80 rounded-2xl"
              style={{
                backgroundImage: `url('/joshua-kettle-unsplash.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.8,  // 50% opacity
              }}
            />

            {hoveredGameId === game.id ? (
              <ScreenshotCarousel screenshots={game.short_screenshots || []} />
            ) : (
              <div className="relative z-10 w-[100%] h-[300px]">
                <Image
                  className="rounded-t-2xl"
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  alt={game.name}
                  src={game.background_image}
                />
              </div>
            )}
            <div className='grid z-20 text-center py-2'>
              <h1 className='text-white text-2xl'>{game.name}</h1>
              {/* <hr></hr> */}
              <div className='px-5'>
                <div className='flex py-2'>
                  {game.parent_platforms.map((platform) => (
                    <div key={platform.platform.id} className='mr-2'>
                      <Image
                        src={platformRef[platform.platform.slug] || '/icons/web-icon.svg'} // Fallback to a default icon
                        alt={platform.platform.name}
                        width={20}
                        height={20}
                      />
                    </div>
                  ))}
                </div>
                <div className='grid py-2 gap-2'>
                  <div className="games-load-details">
                    <p>released:</p>
                    <p>{game.released}</p>
                  </div>
                  <hr></hr>
                  <div className="games-load-details">
                    <p>Metacritic:</p>
                    <p>{game.metacritic}</p>
                  </div>
                  <hr></hr>
                  <div className="games-load-details">
                    <p>Reviews:</p>
                    <p>{game.reviews_count}</p>
                  </div>
                  <hr></hr>
                  <p>Genres: {game.genres.map((genre) => genre.name).join(', ')}</p>
                </div> 
              </div>
            </div>
            <AnimatedTooltipPreview/>
          </div>
        ))}
      </div>

      {selectedGameId !== null && selectedGame &&(
        <div className='fixed inset-0 z-50'>
        <GameModal gameId={selectedGameId} 
          onClose={handleCloseModal} 
          screenshots={selectedGame.short_screenshots} // Pass screenshots here
        />
        </div>
      )}
    </div>
  );
};

export default GamesLoad;
