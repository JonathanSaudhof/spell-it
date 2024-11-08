"use client";
import { readWord } from "@/lib/accessability";
import pageRoutes from "@/routes.config";
import { useEffect, useMemo, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { MdSpaceBar } from "react-icons/md";
import { Button, LinkButton } from "../ui/buttons";
import { Grid, MainWrapper } from "../ui/wrapper";

// alphabet in half width characters in an 2d array
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function Keyboard() {
  const [alpha, setAlpha] = useState(ALPHABET);
  const [word, setWord] = useState("");

  const addToWord = (char: string) => {
    setWord((prev) => prev + char);
    setAlpha(ALPHABET);
  };

  useEffect(() => {
    if (word.length > 0) {
      const soundSource = "/click.wav";
      const sound = new Audio(soundSource);
      sound.volume = 0.05;
      sound.play();
    }
  }, [word]);

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
      <div className="flex gap-4">
        <div className="flex grow border-4 border-gray-400 p-4 rounded-xl">
          <div className="border-r-4 content after:animate-pulse h-10">
            <span className="uppercase text-3xl md:text-4xl lg:text-5xl text-center ">
              {word}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full flex lg:flex-row gap-8">
        <LinkButton className="w-1/4" href={pageRoutes.selection}>
          🗂️
        </LinkButton>
        <button
          onClick={addSpace}
          className="flex justify-center items-center gap-4 px-4 py-2 bg-blue-300  text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl flex-1"
        >
          <MdSpaceBar />
        </button>
        <Button
          className="flex items-center gap-4 px-8 py-2 bg-blue-300 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center w-1/4"
          onClick={() => readWord(word)}
        >
          <span className="h-20 w-20 flex items-center justify-center">🔊</span>
        </Button>
      </div>
      <hr />
      <Grid>
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
        <button
          className="flex items-center gap-4 px-8 py-2 bg-blue-300 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center"
          onClick={deleteLast}
        >
          <FaDeleteLeft />
        </button>
        <button
          className="flex items-center gap-4 px-8 py-2 bg-blue-300 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl justify-center"
          onClick={resetAll}
        >
          <GrPowerReset />
        </button>
      </Grid>
    </MainWrapper>
  );
}
