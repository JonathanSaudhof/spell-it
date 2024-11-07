export type Section = {
  title: string;
  icon?: string;
  section?: Section[];
};

const eatDrink: Section[] = [
  {
    title: "Wasser trinken",
  },
  {
    title: "Wasser in den Mund",
  },
  {
    title: "Essen",
  },
  {
    title: "Küche",
  },
];

const sitSection: Section[] = [
  {
    title: "Sitzen",
  },
  {
    title: "Hinlegen",
  },
  {
    title: "Armlehne",
  },
  {
    title: "Bein runter",
  },
];

const tvSection: Section[] = [
  {
    title: "TV an",
  },
  {
    title: "TV aus",
  },
  {
    title: "Lauter",
  },
  {
    title: "Leiser",
  },
  {
    title: "Sender",
  },
];

const root: Section[] = [
  {
    title: "Nahrung",
    icon: "🍝",
    section: eatDrink,
  },
  { title: "Sitzen", icon: "🪑", section: sitSection },
  { title: "TV", icon: "📺", section: tvSection },
];

export default root;
