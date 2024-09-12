import GamesLoad from "@/components/GamesLoad";
import { BentoGridThirdDemo } from "@/components/Bento";
import Hero from "@/components/Hero";

// import { fetchGamesData } from '@/app/actions'; // Fetch server-side data


export default async function Home() {
  return (
    <div className="max-md:px-10 p-20">
        <div>
          <Hero/>
          <BentoGridThirdDemo/>
        </div>
        <GamesLoad/>
        {/* <GameModal/> */}
    </div>
  );
}
