"use client";

export const readWord = (word: string) => {
  if (typeof window === "undefined") return;
  const synth = window?.speechSynthesis;
  const wordToSay = new SpeechSynthesisUtterance(word);
  wordToSay.lang = "de-DE";
  synth.speak(wordToSay);
};
