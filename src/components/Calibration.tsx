"use client";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function Calibration() {
  return (
    <div className="w-screen h-screen relative grid grid-cols-3 grid-rows-3 items-center justify-items-center p-4">
      <Square className="justify-self-start self-start" key="left-top" />
      <Link
        href="/"
        className="border px-8 border-gray-700 py-4 text-2xl rounded-lg"
      >
        Zurück
      </Link>
      <Square className="justify-self-end self-start" key="right-top" />
      <div />
      <Square key="middle-middle" />
      <div />

      <Square className="justify-self-start self-end" key="bottom-left" />
      <div />
      <Square className="justify-self-end self-end" key="bottom-right" />
    </div>
  );
}

function Square({ className }: { className?: string }) {
  const [counter, setCounter] = useState<number>(0);

  let color = "bg-red-500";

  if (counter > 1) {
    color = "bg-yellow-500";
  }

  if (counter > 3) {
    color = "bg-green-500";
  }

  return (
    <button
      className={twMerge(className, "w-12 h-12", color)}
      onClick={() => {
        console.log("click");

        setCounter((prev) => prev + 1);
      }}
    >
      {counter}
    </button>
  );
}
