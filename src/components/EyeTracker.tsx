"use client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error

import { PropsWithChildren, useEffect, useState } from "react";

declare global {
  interface Window {
    saveDataAcrossSessions: boolean;
  }
}

export default function EyeTracker({ children }: Readonly<PropsWithChildren>) {
  const [isLoaded, setIsLoaded] = useState(false);

  const isFeatureActive = process.env.NEXT_PUBLIC_FEAT_EYE_TRACKER === "true";
  console.log("isFeatureActive", isFeatureActive);
  useEffect(() => {
    if (typeof window !== "undefined" && isFeatureActive) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      import("@/lib/webgazer").then((webgazer) =>
        webgazer.default
          .showVideoPreview(false)
          .setRegression(
            "ridge"
          ) /* currently must set regression and tracker */
          .setTracker("TFFacemesh")
          .showPredictionPoints(true)
          .saveDataAcrossSessions(true)
          .applyKalmanFilter(true)
          .begin()
          .then(() => {
            setIsLoaded(true);
          })
      );
    }

    // return () => webgazer.end();
  }, [isFeatureActive]);

  return (
    <div className="relative">
      {!isLoaded && isFeatureActive ? (
        <div className="fixed flex justify-center items-center text-lg font-bold animate-pulse py-4 w-full">
          Loading Eyetracker
        </div>
      ) : null}
      {children}
    </div>
  );
}
