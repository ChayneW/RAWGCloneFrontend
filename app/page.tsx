// import Image from "next/image";
// import { fetchGames } from './lib/api';
import GamesLoad from "@/components/GamesLoad";
// import GameModal from "@/components/GameModal";

// import { fetchGamesData } from '@/app/actions'; // Fetch server-side data


export default async function Home() {


  return (
    <div className="px-10">
        <h1>Games List</h1>
        <GamesLoad/>
        {/* <GameModal/> */}
    </div>
  );
}
