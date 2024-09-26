'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchGames } from '@/app/lib/api';
import Image from 'next/image';
import GameModal from '@/components/GameModal';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import LoaderUI from './ui/LoaderUI';
import { AnimatedTooltipPreview } from './PeopleLine';
import { dateConvert } from '@/constants';

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


const GamesLoad = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [hoveredGameId, setHoveredGameId] = useState<number | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMoreGames, setIsFetchingMoreGames] = useState<boolean>(false); // Prevent multiple calls
  const [page, setPage] = useState<number>(1);
  const { ref, inView } = useInView();
  const initialLoadRef = useRef(false);

  // Fetch games from the API
  const loadGames = useCallback(async (currentPage: number) => {
    console.log('Fetching games for page:', currentPage);
    setIsFetchingMoreGames(true);

    const fetchedGames = await fetchGames(currentPage);
    setGames((prevGames) => [...prevGames, ...fetchedGames]);

    setIsFetchingMoreGames(false);
  }, []);

  // Initial load
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      loadGames(1); // Load the first page of games
    }
  }, [loadGames]);

  // Infinite scroll effect
  useEffect(() => {
    // if (inView && !isLoading && !isFetchingMoreGames) {
    if (inView && !isFetchingMoreGames) {
      console.log('Loading next page:', page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  // }, [inView, isLoading, isFetchingMoreGames]);
  }, [inView, isFetchingMoreGames, page]);

  // Fetch games when page number changes
  useEffect(() => {
    if (page > 1) {
      loadGames(page); // Only load games after initial page load
    }
  }, [page, loadGames]);

  const handleGameClick = (id: number) => setSelectedGameId(id);
  const handleCloseModal = () => setSelectedGameId(null);

  const selectedGame = games.find((game) => game.id === selectedGameId);

  // if (isLoading && games.length === 0) {
  if (isFetchingMoreGames && games.length === 0) {
    return (
      <div className="grid justify-center text-white py-32">
        <div className="flex justify-center">
          <LoaderUI />
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 md:px-20">
      <div className="grid lg:grid-cols-3 gap-10">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative grid h-[650px] w-full card-grad cursor-pointer text-white rounded-2xl"
            onMouseEnter={() => setHoveredGameId(game.id)}
            onMouseLeave={() => setHoveredGameId(null)}
            onClick={() => handleGameClick(game.id)}
          >
            <div
              className="absolute inset-0 z-0 bg-center opacity-80 rounded-2xl"
              style={{
                backgroundImage: `url('/joshua-kettle-unsplash.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
            <div className="grid z-20 text-center py-2">
              <h1 className="text-white text-xl">{game.name}</h1>
              <div className='px-5'>
                <div className='flex py-2'>
                   {game.parent_platforms.map((platform) => (
                    <div key={platform.platform.id} className='mr-2'>
                      <Image
                        priority
                        src={platformRef[platform.platform.slug] || '/icons/web-icon.svg'}
                        alt={platform.platform.name}
                        width={20}
                        height={20}
                      />
                    </div>
                  ))}
                </div>
                <div className='grid py-2 gap-2'>
                  <div className="games-load-details">
                    <p>Released:</p>
                    <p>{dateConvert(game.released)}</p>
                  </div>
                  <hr />
                  <div className="games-load-details">
                    <p>Metacritic:</p>
                    <p>{game.metacritic}</p>
                  </div>
                  <hr />
                  <div className="games-load-details">
                    <p>Reviews:</p>
                    <p>{game.reviews_count}</p>
                  </div>
                  <hr />
                  <div className='flex justify-between'>
                    <p>Genres:</p>
                    {
                      game.genres.length > 4 
                      ? <p>{game.genres.slice(0, -1).map((genre: Genre) => genre.name).join(', ')}</p> 
                      : <p>{game.genres.map((genre) => genre.name).join(', ')}</p>
                    }
                  </div>
                  {/* <p>Genres: {game.genres.map((genre) => genre.name).join(', ')}</p> */}
                </div> 
              </div>
            </div>
            <AnimatedTooltipPreview />
          </div>
        ))}
      </div>

      <div ref={ref} className="grid justify-center py-10">
        {isFetchingMoreGames && <LoaderUI />}
      </div>

      {selectedGameId !== null && selectedGame && (
        <div className="fixed inset-0 z-50">
          <GameModal
            gameId={selectedGameId}
            onClose={handleCloseModal}
            screenshots={selectedGame.short_screenshots}
          />
        </div>
      )}
    </div>
  );
};

export default GamesLoad;

