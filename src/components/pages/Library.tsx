"use client";

import { readWord } from "@/lib/sound";
import wordSections, { Section } from "@/lib/library";
import pageRoutes from "@/routes.config";
import React, { useState } from "react";
import { LinkButton, TileButton } from "../ui/buttons";
import { Grid, MainWrapper } from "../ui/wrapper";
import { twMerge } from "tailwind-merge";

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
      <Grid>
        <TileButton
          onClick={() => {
            handleSectionClick({ title: "Ja" });
          }}
          text="Ja"
          className="col-span-2  bg-amber-400 h-32"
        />
        <TileButton
          onClick={() => {
            handleSectionClick({ title: "Nein" });
          }}
          text="Nein"
          className="col-span-2 bg-red-400 h-32"
        />
        <LinkButton href={pageRoutes.keyboard}>
          <span className="text-5xl">⌨️</span>{" "}
          <span className="text-3xl">Neues Wort</span>
        </LinkButton>
        {wordSections.map((section, index) => {
          return (
            <React.Fragment key={`${section.title}-${index}`}>
              <TileButton
                onClick={() => {
                  handleSectionClick(section);
                }}
                icon={section.icon}
                text={section.title}
                className={twMerge(
                  parentNode?.title === section.title
                    ? "border-2 border-black bg-orange-400"
                    : "",
                  section.section?.length ? null : "bg-blue-300"
                )}
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
      </Grid>
    </MainWrapper>
  );
}
