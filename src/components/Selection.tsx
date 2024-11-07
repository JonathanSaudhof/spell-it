"use client";

import wordSections, { Section } from "@/lib/wordsections";
import { PropsWithChildren, useState } from "react";
import { Button } from "./ui/Navgation";
import { useRouter } from "next/navigation";
import { readWord } from "@/lib/accessability";
import pageRoutes from "@/routes.config";

export default function Selection() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const router = useRouter();

  const handleSectionClick = (section: Section) => {
    readWord(section.title);
    setSelectedSection(section);
  };

  return (
    <div className="flex p-8 flex-col gap-8">
      <button
        onClick={() => {
          router.push(pageRoutes.speller);
        }}
        className="text-gray-900 border-2 border-gray-900 rounded-lg w-full p-4 flex gap-4 items-center justify-center"
      >
        <span className="text-5xl">⌨️</span>{" "}
        <span className="text-3xl">Neues Wort</span>
      </button>
      <div className="grid grid-cols-4 grid-flow-row gap-8 grid-rows-4">
        {wordSections.map((section, index) => {
          return (
            <>
              <Tile
                key={`${section.title}-${index}`}
                onClick={() => {
                  handleSectionClick(section);
                }}
              >
                {section.icon ? section.icon : <Text>{section.title}</Text>}
              </Tile>
              {selectedSection?.title === section.title ? (
                <>
                  {section.section?.map((subSection, subIndex) => {
                    return (
                      <Tile
                        key={`${subSection.title}-${subIndex}-${index}`}
                        onClick={() => {
                          handleSectionClick(subSection);
                        }}
                      >
                        {subSection.icon ? (
                          subSection.icon
                        ) : (
                          <Text>{subSection.title}</Text>
                        )}
                      </Tile>
                    );
                  })}
                </>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}

const Tile = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <Button className="text-6xl border-2 h-[150px]" onClick={onClick}>
      {children}
    </Button>
  );
};

const Text = ({ children }: PropsWithChildren) => {
  return (
    <span className="text-2xl text-wrap leading-snug break-words align-top text-center flex">
      {children}
    </span>
  );
};
