import GamesLoad from "@/components/GamesLoad";
import { BentoGridThirdDemo } from "@/components/Bento";
import Hero from "@/components/Hero";

// import { fetchGamesData } from '@/app/actions'; // Fetch server-side data


export default async function Home() {
  return (
    <div className="max-md:px-10">
        <div className="">
          <Hero/>
          <BentoGridThirdDemo/>
        </div>
        <div>
          <h1 className="text-white text-center text-2xl">Trending:</h1>
        </div>
        <GamesLoad/>
    </div>
  );
}
