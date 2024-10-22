import Speller from "@/components/Speller";
import dynamic from "next/dynamic";

// alphabet in half width characters in an 2d array

export default function Home() {
  const EyeTracker = dynamic(
    () => import("@/components/EyeTracker").then((mod) => mod.EyeTracker),
    {
      ssr: false,
    }
  );
  return (
    <EyeTracker>
      <Speller />
    </EyeTracker>
  );
}
