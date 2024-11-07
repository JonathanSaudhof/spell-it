"use client";
import { readWord } from "@/lib/accessability";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { MdSpaceBar } from "react-icons/md";
import { Button, LinkButton } from "../ui/buttons";
import pageRoutes from "@/routes.config";
import { MainWrapper } from "../ui/wrapper";

// alphabet in half width characters in an 2d array
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function Keyboard() {
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
    <MainWrapper>
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
        <LinkButton href={pageRoutes.selection}>🗂️</LinkButton>
        <button
          onClick={addSpace}
          className="flex justify-center items-center gap-4 px-4 py-2 bg-blue-300  text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl flex-1"
        >
          <MdSpaceBar />
        </button>
        <Button
          className="flex items-center gap-4 px-8 py-2 bg-blue-300 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center"
          onClick={() => readWord(word)}
        >
          <span className="h-20 w-20 flex items-center justify-center">🔊</span>
        </Button>
        <button
          className="flex items-center gap-4 px-8 py-2 bg-blue-300 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center"
          onClick={resetAll}
        >
          <GrPowerReset />
        </button>
      </div>
      <div className="grid grid-cols-5 xl:grid-cols-8 gap-8 items-center">
        {buttonSlice.map((slice) => {
          if (slice.length === 0) {
            return null;
          }
          return (
            <Button
              key={slice}
              onClick={() => handleLeft(slice)}
              className="px-4 py-2 text-gray-900 border-gray-900 text-4xl uppercase rounded-xl flex-1 flex flex-wrap justify-center font-bold "
            >
              <span
                key={slice}
                className="h-24 w-24 flex items-center justify-center"
              >
                {slice}
              </span>
            </Button>
          );
        })}
      </div>
    </MainWrapper>
  );
}
