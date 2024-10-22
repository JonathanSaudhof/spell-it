"use client";
import Script from "next/script";
import { useEffect } from "react";

export function EyeTracker() {
  useEffect(() => {
    const webgazer = window.webgazer;
    webgazer
      .setGazeListener((data: { x: number; y: number }) => {
        console.log(data.x, data.y);
      })
      .begin();
  }, []);
  return (
    <div className="relative">
      <Script src="https://webgazer.cs.brown.edu/webgazer.js" />
      {}
    </div>
  );
}
