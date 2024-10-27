"use client";
import { useRouter } from "next/navigation";
import {
  ElementRef,
  forwardRef,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { useEyeTracker } from "./EyeTracker";
import { Button } from "./ui/Navgation";

const COUNTER_ELEMENT_COUNT = 15;

export function Calibration() {
  const [elementCount, setElementCount] = useState(0);
  const router = useRouter();
  const currElement = useRef<ElementRef<typeof Counter>>(null);
  const { isLoaded, webgazer } = useEyeTracker();

  const handleResetDataClick = async () => {
    if (webgazer) {
      webgazer.addMouseEventListeners();
      webgazer.clearData();
      webgazer.showVideoPreview(true);

      await webgazer;

      setElementCount(0);
      router.refresh();
      currElement.current?.startCounting();
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  const renderCounter = useCallback((): ReactNode => {
    return new Array(COUNTER_ELEMENT_COUNT).fill(0).map((_, i) => (
      <Counter
        key={i}
        ref={i === elementCount ? currElement : null}
        onFinished={() => {
          if (elementCount >= COUNTER_ELEMENT_COUNT) {
            console.log("Calibration finished");
            webgazer.removeMouseEventListeners();
            return;
          }

          setElementCount(i + 1);
        }}
      />
    ));
  }, [elementCount]);

  useEffect(() => {
    if (elementCount < COUNTER_ELEMENT_COUNT && elementCount > 0) {
      console.log("start counting");
      currElement.current?.startCounting();
    }
  }, [elementCount]);

  return (
    <div className="bg-gray-700">
      <div className="fixed w-auto rounded flex gap-4 p-4 z-50 top-1/4 bg-gray-100 left-1/2 -translate-x-1/2 origin-center shadow-lg">
        <Button
          onClick={handleResetDataClick}
          className="py-2 flex-1 w-full"
          disabled={!isLoaded}
        >
          Start
        </Button>
        <Button onClick={handleBackClick} className="flex-1 w-full">
          Zurück
        </Button>
      </div>
      <div
        className="w-screen h-screen relative grid grid-cols-5 grid-rows-3 items-center justify-items-center p-4"
        style={{
          gridTemplateColumns: "min-content auto auto auto min-content",
          gridTemplateRows: "min-content auto min-content",
        }}
      >
        {renderCounter()}
      </div>
    </div>
  );
}

const MAX_COUNT = 3;

const Counter = forwardRef<
  { startCounting: () => void },
  { className?: string; onFinished: () => void }
>(function Counter(
  {
    className,
    onFinished,
  }: {
    className?: string;
    onFinished?: () => void;
  },
  ref
) {
  const [shouldCount, setShouldCount] = useState(false);
  const [counter, setCounter] = useState<number>(0);
  const counterRef = useRef<HTMLButtonElement>(null);

  const triggerClickEvent = () => {
    console.log("trigger click event");
    console.log(counterRef.current?.offsetLeft);

    const x =
      counterRef.current?.offsetLeft ??
      0 + (counterRef.current?.clientWidth ?? 0) / 2;
    const y =
      counterRef.current?.offsetTop ??
      0 + (counterRef.current?.clientHeight ?? 0) / 2;

    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });

    counterRef.current?.dispatchEvent(event);
    counterRef.current?.dispatchEvent(event);
    counterRef.current?.dispatchEvent(event);
    counterRef.current?.dispatchEvent(event);
    counterRef.current?.dispatchEvent(event);
  };

  useEffect(() => {
    if (shouldCount) {
      const interval = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [shouldCount]);

  useEffect(() => {
    if (counter >= MAX_COUNT) {
      triggerClickEvent();
      setShouldCount(false);
      if (typeof onFinished === "function") {
        onFinished();
      }
    }
  }, [counter, onFinished]);

  useImperativeHandle(
    ref,
    () => {
      return {
        startCounting() {
          setShouldCount(true);
        },
      };
    },
    []
  );

  let color = "bg-red-500";

  if (counter > 0) {
    color = "bg-yellow-500";
  }

  if (counter >= MAX_COUNT) {
    color = "bg-green-500";
  }

  return (
    <div
      className={twMerge(
        "flex justify-center items-center px-6 py-6 border-4 border-red-500 bg-red-200",
        shouldCount ? "border-yellow-500 animate-pulse bg-yellow-200" : null,
        counter >= MAX_COUNT ? "border-green-500 bg-green-500" : null
      )}
    >
      <button
        className={twMerge(
          className,
          "w-6 h-6 rounded-full flex justify-center items-center animate-none",
          color
        )}
        onClick={() => {
          console.log("click");
        }}
        ref={counterRef}
      >
        {counter}
      </button>
    </div>
  );
});
