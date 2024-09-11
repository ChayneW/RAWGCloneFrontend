'use client'
// import React, {useState, useEffect} from 'react'
// import { fetchGames } from '@/app/lib/api';
// import Image from 'next/image';
// import GameModal from '@/components/GameModal';



// const GamesLoad = () => {
//     const [games, setGames] = useState<any[]>([]);
//     const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

//     // const games = await fetchGames();
    
//     useEffect(() => {
//         const loadGames = async () => {
//             const fetchedGames = await fetchGames();
//             setGames(fetchedGames);
//         };
//         loadGames();
//     }, [])

//     const handleGameClick = (id: number) => {
//         setSelectedGameId(id);
//     }

//     const handleCloseModal = () => {
//         setSelectedGameId(null);
//     }



//     return (
//     // <div className=''>
//     //     GamesLoad
//     //     <div className='grid lg:grid-cols-3 gap-5'>
//     //         {games.map((game: any) => (
//     //             <div key={game.id} className='grid h-[400px] w-full p-5 bg-gray-500'> {/* needs dark gradient */}
                    
//     //                 <h2>{game.name}</h2>
//     //                 {/* <img src={game.background_image} alt={game.name} width={200} /> */}
//     //                 <div className='relative w-[100%] h-[200px] '
//     //                 >
//     //                     <Image
//     //                         className='rounded-2xl'
//     //                         fill
//     //                         priority
//     //                         style={{ objectFit: 'cover' }}
//     //                         alt={game.name}
//     //                         src={game.background_image}
//     //                     />
//     //                 </div>
//     //                 <p>Metacritic: {game.metacritic}</p>
//     //                 <p>Reviews: {game.reviews_count}</p>
//     //                 <p>Genres: {game.genres.map((genre: any) => genre.name).join(', ')}</p>
//     //             </div>
//     //         ))}
//     //     </div>


//     // </div>

//     <div className="">
//       GamesLoad
//       <div className="grid lg:grid-cols-3 gap-5">
//         {games.map((game: any) => (
//           <div
//             key={game.id}
//             className="grid h-[400px] w-full p-5 bg-gray-500 cursor-pointer"
//             onClick={() => handleGameClick(game.id)}
//           >
//             <h2>{game.name}</h2>
//             <div className="relative w-[100%] h-[200px]">
//               <Image
//                 className="rounded-2xl"
//                 fill
//                 priority
//                 style={{ objectFit: 'cover' }}
//                 alt={game.name}
//                 src={game.background_image}
//               />
//             </div>
//             <p>Metacritic: {game.metacritic}</p>
//             <p>Reviews: {game.reviews_count}</p>
//             <p>Genres: {game.genres.map((genre: any) => genre.name).join(', ')}</p>
//           </div>
//         ))}
//       </div>

//       {selectedGameId !== null && (
//         <GameModal gameId={selectedGameId} onClose={handleCloseModal} />
//       )}
//     </div>
//   )
// }

// export default GamesLoad


// GamesLoad.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import GameModal from '@/components/GameModal';
// import { fetchGames } from '@/app/lib/api';
// import ScreenshotCarousel from '@/components/ScreenshotCarousel';

// const GamesLoad = () => {
//   const [games, setGames] = useState<any[]>([]);
//   const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
//   const [hoveredGameId, setHoveredGameId] = useState<number | null>(null);


//   useEffect(() => {
//     const loadGames = async () => {
//       const fetchedGames = await fetchGames();
//       setGames(fetchedGames);
//     };

//     loadGames();
//   }, []);

//   const handleGameClick = (id: number) => {
//     console.log('Game chosen:' + id)
//     setSelectedGameId(id);
//   };

//   const handleCloseModal = () => {
//     console.log('Modal closed');
//     setSelectedGameId(null);
//   };


//   const handleMouseEnter = (id: number) => {
//     console.log('Hovering:')
//     setHoveredGameId(id);
//   };

//   const handleMouseLeave = () => {
//     setHoveredGameId(null);
//   };

//   return (
//     <div className="">
//       GamesLoad
//       <div className="grid lg:grid-cols-3 gap-5">
//         {games.map((game: any) => (
//           <div
//             key={game.id}
//             className="grid h-[500px] w-full p-5 bg-gray-500 cursor-pointer"
//             onMouseEnter={() => handleMouseEnter(game.id)}
//             onMouseLeave={handleMouseLeave}
//             onClick={() => handleGameClick(game.id)}
//           >
//             <h2>{game.name}</h2>
//             {/* <div className="relative w-[100%] h-[200px]">
//               <Image
//                 className="rounded-2xl"
//                 fill
//                 priority
//                 style={{ objectFit: 'cover' }}
//                 alt={game.name}
//                 src={game.background_image}
//               />
//             </div> */}
//             {hoveredGameId === game.id ? (
//                 <ScreenshotCarousel screenshots={game.short_screenshots || []} />
//               ) : (
//                 <div className="relative w-[100%] h-[300px]">
//                   <Image
//                     className="rounded-2xl"
//                     fill
//                     priority
//                     style={{ objectFit: 'cover' }}
//                     alt={game.name}
//                     src={game.background_image}
//                   />
//                 </div>
//               )}
//             <p>Metacritic: {game.metacritic}</p>
//             <p>Reviews: {game.reviews_count}</p>
//             <p>Genres: {game.genres.map((genre: any) => genre.name).join(', ')}</p>
          
//             {/* {hoveredGameId === game.id && (
//               <ScreenshotCarousel screenshots={game.short_screenshots || []} />
//             )} */}
          
//           </div>
//         ))}
//       </div>

//       {selectedGameId !== null && (
//         <GameModal gameId={selectedGameId} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default GamesLoad;


// ##########

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GameModal from '@/components/GameModal';
import { fetchGames } from '@/app/lib/api';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';

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

  return (
    <div>
      GamesLoad
      <div className="grid lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <div
            key={game.id}
            className="grid h-[500px] w-full p-5 bg-gray-500 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(game.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleGameClick(game.id)}
          >
            <h2>{game.name}</h2>
            {hoveredGameId === game.id ? (
              <ScreenshotCarousel screenshots={game.short_screenshots || []} />
            ) : (
              <div className="relative w-[100%] h-[300px]">
                <Image
                  className="rounded-2xl"
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  alt={game.name}
                  src={game.background_image}
                />
              </div>
            )}
            <p>Metacritic: {game.metacritic}</p>
            <p>Reviews: {game.reviews_count}</p>
            <p>Genres: {game.genres.map((genre) => genre.name).join(', ')}</p>
          </div>
        ))}
      </div>

      {selectedGameId !== null && (
        <GameModal gameId={selectedGameId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default GamesLoad;
