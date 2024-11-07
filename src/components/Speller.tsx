"use client";
import { readWord } from "@/lib/accessability";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { MdSpaceBar } from "react-icons/md";
import { Button } from "./ui/Navgation";
import pageRoutes from "@/routes.config";

// alphabet in half width characters in an 2d array
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function Speller() {
  const [alpha, setAlpha] = useState(ALPHABET);
  const [word, setWord] = useState("");
  const router = useRouter();

  const addToWord = (char: string) => {
    setWord((prev) => prev + char);
    setAlpha(ALPHABET);
  };

  const handleLeft = (newAlpha: string) => {
    if (newAlpha.length === 1) {
      addToWord(newAlpha);
      return;
    }

    setAlpha(() => newAlpha);
  };

  const addSpace = () => {
    setWord((prev) => prev + "_");
  };

  const resetAll = () => {
    setWord("");
    setAlpha(ALPHABET);
  };

  function getAlpha(alphaSlice: string): string[] {
    return alphaSlice.split("");
  }

  const buttonSlice = useMemo(() => getAlpha(alpha), [alpha]);

  const deleteLast = () => {
    setWord((prev) => prev.slice(0, -1));
  };

  return (
    <main className="flex flex-col gap-8 mx-auto container min-h-svh p-8">
      <div className="flex gap-8 border-4 border-gray-400 px-4 py-2 rounded-xl">
        <div className="flex grow">
          <div className="border-r-4 content after:animate-pulse h-10">
            <span className="uppercase text-3xl md:text-4xl lg:text-5xl text-center ">
              {word}
            </span>
          </div>
        </div>

        <button className="flex self-end" onClick={deleteLast}>
          <FaDeleteLeft className="text-3xl md:text-4xl lg:text-5xl text-gray-500" />
        </button>
      </div>
      <div className="w-full flex lg:flex-row gap-4">
        <button
          onClick={() => {
            router.push(pageRoutes.selection);
          }}
          onMouseEnter={() => {
            router.prefetch(pageRoutes.selection);
          }}
          className="flex justify-center items-center gap-4 px-4 py-2 w-1/4 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl"
        >
          🗂️
        </button>
        <button
          onClick={addSpace}
          className="flex justify-center items-center gap-4 px-4 py-2 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl flex-1"
        >
          <MdSpaceBar />
        </button>
        <button
          className="flex items-center gap-4 px-8 py-2 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center"
          onClick={() => readWord(word)}
        >
          <span className="h-20 w-20 flex items-center justify-center">🔊</span>
        </button>
        <button
          className="flex items-center gap-4 px-8 py-2 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center"
          onClick={resetAll}
        >
          <GrPowerReset />
        </button>
      </div>
      <div className="grid grid-cols-4 xl:grid-cols-6 gap-12 items-center">
        {buttonSlice.map((slice) => {
          if (slice.length === 0) {
            return null;
          }
          return (
            <Button
              key={slice}
              onClick={() => handleLeft(slice)}
              className="px-4 py-2 text-gray-900 border-4 border-gray-900 text-4xl uppercase rounded-xl flex-1 flex flex-wrap justify-start font-bold hover:bg-slate-300"
            >
              <span
                key={slice}
                className="h-20 w-20 flex items-center justify-center"
              >
                {slice}
              </span>
            </Button>
          );
        })}
      </div>
    </main>
  );
}
