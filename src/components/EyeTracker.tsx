"use client";

import { env } from "@/env.mjs";
import webgazer from "@/lib/webgazer/index.mjs";
import React, { PropsWithChildren, useEffect, useState } from "react";

declare global {
  interface Window {
    saveDataAcrossSessions: boolean;
  }
}

type TWebgazer = typeof webgazer;

const EyeTrackerContext = React.createContext<{
  isLoaded: boolean;
  webgazer: TWebgazer | null;
}>({
  isLoaded: false,
  webgazer: null,
});

export function useEyeTracker() {
  return React.useContext(EyeTrackerContext);
}

export default function EyeTracker({ children }: Readonly<PropsWithChildren>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [webgazer, setWebgazer] = useState<TWebgazer | null>(null);

  const isFeatureActive = env.NEXT_PUBLIC_FEAT_EYE_TRACKER;
  const isDevelopment = env.NEXT_PUBLIC_ENV === "development";

  useEffect(() => {
    if (typeof window !== "undefined" && isFeatureActive) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      import("@/lib/webgazer").then((webgazer) =>
        webgazer.default
          .showVideoPreview(false)
          .setRegression("ridge")
          .setTracker("TFFacemesh")
          .showPredictionPoints(true)
          .saveDataAcrossSessions(true)
          .applyKalmanFilter(true)

          .begin()
          .then((instance: unknown) => {
            (instance as typeof webgazer).removeMouseEventListeners();
            (instance as typeof webgazer).setCameraConstraints({
              width: { min: 320, ideal: 320, max: 320 },
              height: { min: 240, ideal: 240, max: 240 },
              facingMode: "user",
              resizeMode: "crop-and-scale",
            });

            setWebgazer(instance as TWebgazer);
            console.log("Webgazer started");
            setIsLoaded(true);
          })
      );
    }

    // return () => webgazer.end();
  }, [isDevelopment, isFeatureActive]);

  return (
    <EyeTrackerContext.Provider value={{ isLoaded, webgazer }}>
      <div className="relative">
        {!isLoaded && isFeatureActive ? (
          <div className="fixed bg-white flex justify-center items-center py-4 w-full z-50 shadow">
            <span className="text-lg font-bold animate-pulse ">
              Loading Eyetracker
            </span>
          </div>
        ) : null}
        {children}
      </div>
    </EyeTrackerContext.Provider>
  );
}
