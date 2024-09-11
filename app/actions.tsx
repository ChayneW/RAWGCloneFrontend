// actions.tsx (Server Component)
'use server'

import GameCard, { GameProp } from "@/components/GameCard";
import { fetchGames, fetchGameDetails } from '../app/lib/api';

// export const fetchGamesData = async () => {
//   try {
//     console.log('calling frontend from asp.net')
//     const games = await fetchGames(); // Fetch list of games from your API
//     console.log(games)
//     return games.map((game: GameProp, index: number) => (
//       <GameCard key={game.id} game={game} index={index} />
//     ));
//   } catch (error) {
//     console.log('ERROR for get games')
//     console.log(error);
//     return null;
//   }
// };


export const fetchGamesData = async () => {
  try {
    console.log('calling frontend from asp.net');
    const games = await fetchGames(); // Fetch list of games from your API
    console.log(games);
    return games.map((game: GameProp) => (
      <GameCard key={game.id} game={game} />
    ));
  } catch (error) {
    console.log('ERROR for get games');
    console.log(error);
    return null;
  }
};


export const fetchGameDetailData = async (id: number) => {
  try {
    console.log('calling details from asp.net')
    const gameDetail = await fetchGameDetails(id); // Fetch details of a game from your API
    console.log(gameDetail)
    return gameDetail;
  } catch (error) {
    console.log('ERROR for get details')
    console.log(error);
    return null;
  }
};
