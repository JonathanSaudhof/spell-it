"use client";
import { PropsWithChildren, useMemo, useState } from "react";

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

  const reset = () => {
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

  return (
    <main className="flex flex-col gap-8 mx-auto container min-h-svh py-12">
      <div className="flex gap-8 border-4 border-gray-400 px-4 py-4 rounded-xl">
        <span className="text-6xl text-gray-500">Wort:</span>
        <span className="uppercase text-6xl text-center underline">{word}</span>
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
      <div className="w-full flex">
        <Button onClick={reset}>Zurücksetzen</Button>
      </div>
    </main>
  );
}

const Button = ({
  children,
  onClick,
}: Readonly<PropsWithChildren<{ onClick: () => void }>>) => (
  <button
    className="px-4 py-2 text-gray-900 border-4 border-gray-900 text-5xl uppercase rounded-xl flex-1 flex flex-wrap justify-center items-center"
    onClick={onClick}
  >
    {children}
  </button>
);
