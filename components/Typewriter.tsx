"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectDemo() {

  // Unlock a world of games and dive deep into the ultimate gaming collection with GameVault.
  const words = [
    {
      text: "Unlock",
      className: "text-white"
    },
    {
      text: "a",
      className: "text-white"
    },
    {
      text: "world",
      className: "text-white"
    },
    {
      text: "of",
      className: "text-white"
    },
    {
      text: "games",
      className: "text-white"
    },
    {
      text: "and",
      className: "text-white"
    },
    {
      text: "dive",
      className: "text-white"
    },
    {
      text: "deep",
      className: "text-white"
    },
    {
      text: "into",
      className: "text-white"
    },
    {
      text: "the",
      className: "text-white"
    },
    {
      text: "ultimate",
      className: "text-white"
    },
    {
      text: "gaming",
      className: "text-white"
    },
    {
      text: "collection",
      className: "text-white"
    },
    {
      text: "with",
      className: "text-white"
    },
    {
      text: "GameVault.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    // <div className="h-[600px]">
    <div className="">
      <div className="flex flex-col items-center justify-center h-[30rem] px-10 md:px-20">
        <p className="text-white text-center dark:text-neutral-200 text-base mb-10">
          The road to freedom starts from here
        </p>
        <TypewriterEffect words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          {/* <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Join now
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Signup
          </button> */}
        </div>
      </div>
    </div>
  );
}
