"use client";
import { PropsWithChildren, useMemo, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete, MdSpaceBar } from "react-icons/md";

// alphabet in half width characters in an 2d array
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function Home() {
  const [alpha, setAlpha] = useState(ALPHABET);
  const [word, setWord] = useState("");

  const addToWord = (char: string) => {
    setWord((prev) => prev + char);
    setAlpha(ALPHABET);
  };

  const handleLeft = (newAlpha: string) => {
    console.log(newAlpha);
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
    const oneThird = Math.ceil(alphaSlice.length / 3);
    const twoThird = Math.ceil((alphaSlice.length / 3) * 2);

    const left = alphaSlice.slice(0, oneThird);
    const mid = alphaSlice.slice(oneThird, twoThird);
    const right = alphaSlice.slice(twoThird);

    return [left, mid, right];
  }

  const buttonSlice = useMemo(() => getAlpha(alpha), [alpha]);

  const resetAlphabet = () => {
    setAlpha(ALPHABET);
  };

  const deleteLast = () => {
    setWord((prev) => prev.slice(0, -1));
  };

  return (
    <main className="flex flex-col gap-8  min-h-svh py-12 p-4">
      <div className="flex gap-8 border-4 border-gray-400 px-4 py-4 rounded-xl">
        <div className="flex grow">
          <div className="border-r-4 content after:animate-pulse h-14">
            <span className="uppercase text-4xl md:text-5xl lg:text-6xl text-center ">
              {word}
            </span>
          </div>
        </div>
        <button className="flex self-end" onClick={deleteLast}>
          <FaDeleteLeft className="ttext-4xl md:text-5xl lg:text-6xl text-gray-500" />
        </button>
      </div>
      <div className="flex justify-evenly gap-4 flex-1">
        {buttonSlice.map((slice) => {
          if (slice.length === 0) {
            return null;
          }
          return (
            <Button key={slice} onClick={() => handleLeft(slice)}>
              {slice.split("").map((char) => (
                <span
                  key={char}
                  className="h-24 w-24 flex items-center justify-center"
                >
                  {char}
                </span>
              ))}
            </Button>
          );
        })}
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
    className="px-4 py-2 text-gray-900 border-4 border-gray-900 text-5xl uppercase rounded-xl flex-1"
    onClick={onClick}
  >
    {children}
  </button>
);
