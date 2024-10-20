"use client";
import { PropsWithChildren, useMemo, useState } from "react";

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

  const reset = () => {
    setWord("");
    setAlpha(ALPHABET);
  };

  return (
    <main className="flex flex-col gap-8 mx-auto container min-h-svh py-12">
      <div className="flex gap-8">
        <span className="text-6xl text-gray-500">Word</span>
        <span className="uppercase text-6xl text-center underline">{word}</span>
      </div>
      <div className="flex justify-evenly gap-4 flex-1">
        <Button onClick={handleLeft}>{alpha.slice(0, mid).split("")}</Button>
        {alpha.length > 1 ? (
          <Button onClick={handleRight}>{alpha.slice(mid)}</Button>
        ) : null}
      </div>
    </main>
  );
}

const Button = ({
  children,
  onClick,
}: Readonly<PropsWithChildren<{ onClick: () => void }>>) => (
  <button
    className="px-4 py-2 text-white bg-gray-800 text-5xl uppercase rounded-lg"
    onClick={onClick}
  >
    {children}
  </button>
);