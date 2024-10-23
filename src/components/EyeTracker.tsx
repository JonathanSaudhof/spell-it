"use client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import webgazer from "@/lib/webgazer";
import { PropsWithChildren, useEffect, useState } from "react";

declare global {
  interface Window {
    saveDataAcrossSessions: boolean;
  }
}

export function EyeTracker({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function setup() {
      await webgazer
        .showVideoPreview(false)
        .setRegression("ridge") /* currently must set regression and tracker */
        .setTracker("TFFacemesh")
        .showPredictionPoints(true)
        .saveDataAcrossSessions(true)
        .applyKalmanFilter(true)
        .begin()
        .then(() => {
          setIsLoaded(true);
        });
    }

    if (typeof window !== "undefined") {
      setup();
    }

    // return () => webgazer.end();
  }, []);

  return (
    <div className="relative">
      {!isLoaded ? (
        <div className="fixed flex justify-center items-center text-lg font-bold animate-pulse py-4 w-full">
          Loading Eyetracker
        </div>
      ) : null}
      {children}
    </div>
  );
}
