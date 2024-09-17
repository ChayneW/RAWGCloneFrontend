'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GameModal from '@/components/GameModal';
import { fetchGames } from '@/app/lib/api';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import { AnimatedTooltipPreview } from './PeopleLine';

interface Game {
  id: number;
  name: string;
  background_image: string;
  short_screenshots: Screenshot[];
  metacritic: number;
  reviews_count: number;
  genres: Genre[];
}

interface Screenshot {
  id: number;
  image: string;
}

interface Genre {
  id: number;
  name: string;
}

const GamesLoad = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [hoveredGameId, setHoveredGameId] = useState<number | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      const fetchedGames = await fetchGames();
      setGames(fetchedGames);
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

  return (
    <div>
      GamesLoad
      <div className="grid lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative grid h-[600px] w-full card-grad cursor-pointer text-white rounded-2xl"
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
            <div className='grid z-20 text-center'>
              <h2 className='text-white'>{game.name}</h2>
              <p>Metacritic: {game.metacritic}</p>
              <p>Reviews: {game.reviews_count}</p>
              <p>Genres: {game.genres.map((genre) => genre.name).join(', ')}</p>
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
