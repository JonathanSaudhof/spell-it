"use client";
import { PropsWithChildren, useMemo, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdSpaceBar } from "react-icons/md";

// alphabet in half width characters in an 2d array
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function Home() {
  const [alpha, setAlpha] = useState(ALPHABET);
  const [word, setWord] = useState("");

  const mid = useMemo(() => Math.round(alpha.length / 2), [alpha]);

  const addToWord = (char: string) => {
    setWord((prev) => prev + char);
    setAlpha(ALPHABET);
  };

  const handleLeft = () => {
    const nextAlpha = alpha.slice(0, mid);
    console.log(nextAlpha);
    if (nextAlpha.length === 1) {
      addToWord(nextAlpha);
      return;
    }
    setAlpha(() => nextAlpha);
  };

  const handleRight = () => {
    const nextAlpha = alpha.slice(mid);
    if (nextAlpha.length === 1) {
      addToWord(nextAlpha);
      return;
    }

    setAlpha(() => nextAlpha);
  };

  const addSpace = () => {
    setWord((prev) => prev + "_");
  };

  const resetAll = () => {
    setWord("");
    setAlpha(ALPHABET);
  };

  const resetAlphabet = () => {
    setAlpha(ALPHABET);
  };

  return (
    <main className="flex flex-col gap-8  min-h-svh py-12 p-4">
      <div className="flex gap-8 border-4 border-gray-400 px-4 py-4 rounded-xl">
        <div className="border-r-4 content after:animate-pulse">
          <span className="uppercase text-4xl md:text-5xl lg:text-6xl text-center ">
            {word}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly gap-4 flex-1">
        <Button onClick={handleLeft}>
          <div className="flex flex-wrap gap-4 justify-center">
            {alpha
              .slice(0, mid)
              .split("")
              .map((char) => (
                <span key={char} className="p-4 lg:h-24 lg:w-24 font-bold">
                  {char}
                </span>
              ))}
          </div>
        </Button>
        {alpha.length > 1 ? (
          <Button onClick={handleRight}>
            <div className="flex flex-wrap justify-center">
              {alpha
                .slice(mid)
                .split("")
                .map((char) => (
                  <span key={char} className="p-4 lg:h-24 lg:w-24 font-bold">
                    {char}
                  </span>
                ))}
            </div>
          </Button>
        ) : null}
      </div>
      <button
        onClick={addSpace}
        className="flex justify-center items-center gap-4 px-4 py-2 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl"
      >
        <MdSpaceBar />
      </button>
      <div className="w-full flex lg:flex-row gap-4">
        <button
          className="flex items-center gap-4 px-4 py-2 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl flex-1"
          onClick={resetAlphabet}
        >
          <GrPowerReset /> Von Vorne
        </button>
        <button
          className="flex items-center gap-4 px-4 py-2 text-gray-500 border-4 border-gray-500 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl flex-1"
          onClick={resetAll}
        >
          <GrPowerReset /> Wort Löschen
        </button>
      </div>
    </main>
  );
}

const Button = ({
  children,
  onClick,
}: Readonly<PropsWithChildren<{ onClick: () => void }>>) => (
  <button
    className="px-4 py-2 text-gray-900 border-4 border-gray-900 text-3xl md:text-5xl lg:text-6xl uppercase rounded-xl flex-1"
    onClick={onClick}
  >
    {children}
  </button>
);
