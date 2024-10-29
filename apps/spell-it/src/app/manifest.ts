import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spell it",
    short_name: "SpellIt",
    description: "Spell it helps you to spell with your eyes",
    start_url: "/",
    display: "standalone",
    orientation: "landscape",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "./icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "./icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
