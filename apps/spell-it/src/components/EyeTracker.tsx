"use client";

import { env } from "@/env.mjs";
import React, { PropsWithChildren, useEffect, useState } from "react";

declare global {
  interface Window {
    saveDataAcrossSessions: boolean;
  }
}

const EyeTrackerContext = React.createContext<{
  isLoaded: boolean;
  webgazer: object | null;
}>({
  isLoaded: false,
  webgazer: null,
});

export function useEyeTracker() {
  return React.useContext(EyeTrackerContext);
}

export default function EyeTracker({ children }: Readonly<PropsWithChildren>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [webgazer, setWebgazer] = useState<object | null>(null);

  const isFeatureActive = env.NEXT_PUBLIC_FEAT_EYE_TRACKER;
  const isDevelopment = env.NEXT_PUBLIC_ENV === "development";
  const setup = function () {
    //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    const canvas = document.getElementById(
      "plotting_canvas"
    ) as HTMLCanvasElement;

    if (!canvas) {
      console.error("Canvas not found");
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
  };

  useEffect(() => {
    function resize() {
      const canvas = document.getElementById(
        "plotting_canvas"
      ) as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize, false);

    return () => window.removeEventListener("resize", resize, false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isFeatureActive) {
      import("webgazer").then((webgazer) =>
        webgazer.default
          .setRegression("ridge")
          .saveDataAcrossSessions(true)
          .applyKalmanFilter(true)
          .showPredictionPoints(true)
          .showVideoPreview(false)
          .begin()
          .then((instance: typeof webgazer.default) => {
            console.log("Webgazer instance", instance);
            setWebgazer(instance);
            console.log("Webgazer started");
            setup();
            setIsLoaded(true);
          })
      );
    }

    // return () => webgazer.end();
  }, [isDevelopment, isFeatureActive]);

  const contextValue = React.useMemo(
    () => ({ isLoaded, webgazer }),
    [isLoaded, webgazer]
  );

  return (
    <EyeTrackerContext.Provider value={contextValue}>
      <canvas id="plotting_canvas" />
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
