"use client";

import { readWord } from "@/lib/accessability";
import wordSections, { Section } from "@/lib/wordsections";
import pageRoutes from "@/routes.config";
import React, { useState } from "react";
import { LinkButton, TileButton } from "../ui/buttons";
import { MainWrapper } from "../ui/wrapper";

export default function Selection() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [parentNode, setParentNode] = useState<Section | null>(null);

  const handleSectionClick = (section: Section) => {
    readWord(section.title);
    setParentNode(section);
    setSelectedSection(section);
  };

  return (
    <MainWrapper>
      <LinkButton href={pageRoutes.speller}>
        <span className="text-5xl">⌨️</span>{" "}
        <span className="text-3xl">Neues Wort</span>
      </LinkButton>
      <div className="grid grid-cols-8 grid-flow-row gap-8 grid-rows-4">
        <TileButton
          onClick={() => {
            handleSectionClick({ title: "Ja" });
          }}
          text="Ja"
          className="col-span-2  bg-amber-400"
        />
        <TileButton
          onClick={() => {
            handleSectionClick({ title: "Nein" });
          }}
          text="Nein"
          className="col-span-2 bg-red-400"
        />
        {wordSections.map((section, index) => {
          return (
            <React.Fragment key={`${section.title}-${index}`}>
              <TileButton
                onClick={() => {
                  handleSectionClick(section);
                }}
                icon={section.icon}
                text={section.title}
                className={
                  parentNode?.title === section.title
                    ? "border-2 border-black bg-slate-400"
                    : ""
                }
              />
              {selectedSection?.title === section.title ? (
                <>
                  {section.section?.map((subSection, subIndex) => {
                    return (
                      <TileButton
                        key={`${subSection.title}-${subIndex}-${index}`}
                        onClick={() => {
                          handleSectionClick(subSection);
                        }}
                        icon={subSection.icon}
                        text={subSection.title}
                        className="bg-slate-200"
                      />
                    );
                  })}
                </>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    </MainWrapper>
  );
}
