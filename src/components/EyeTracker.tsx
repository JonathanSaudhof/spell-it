"use client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import webgazer from "@/lib/webgazer";
import localforage from "localforage";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

declare global {
  interface Window {
    saveDataAcrossSessions: boolean;
  }
}

export function EyeTracker({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    localforage.getItem("webgazerGlobalData").then((data) => {
      console.log("data", data);
      if (data === null) {
        router.push("/calibration");
      }
    });
  }, []);

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

  console.log("isLoaded", isLoaded);

  return !isLoaded ? (
    <div className="w-screen h-screen flex justify-center items-center text-4xl animate-pulse">
      Loading Eyetracker
    </div>
  ) : (
    <div className="relative">{children}</div>
  );
}
