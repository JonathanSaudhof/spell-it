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
    title: "Stadthalle",
  },
  {
    title: "Wende",
  },
];

const sitSection: Section[] = [
  {
    title: "Hinsetzen",
  },
  {
    title: "Hochziehen",
  },
  {
    title: "Armlehne",
  },
  {
    title: "Bein runter/hoch",
  },
  {
    title: "Nacken",
  },
  {
    title: "Arm",
    icon: "💪🏼",
  },
  {
    title: "Rücken",
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
    title: "Sender wechseln",
  },
];

const bedSection: Section[] = [
  {
    title: "Fußteil verstellen",
    icon: "🦵🏼",
  },
  {
    title: "Kopfteil verstellen",
    icon: "💆🏽‍♀️",
  },
];

const medicationSection: Section[] = [
  {
    title: "Macrogol",
  },
  {
    title: "Sativex",
  },
  {
    title: "Tabletten",
  },
  {
    title: "Nasenspray",
  },
  {
    title: "Tropfen",
  },
  {
    title: "Spray",
  },
];

const careSection: Section[] = [
  {
    title: "Augen",
    icon: "👀",
  },
  {
    title: "Nase putzen",
    icon: "🤧",
  },
  {
    title: "Gesicht waschen",
  },
  {
    title: "Puhsten",
    icon: "💨",
  },
  {
    title: "Zähne putzen",
    icon: "🦷",
  },
  {
    title: "Brille auf/ab",
    icon: "👓",
  },
  {
    title: "Schuhe",
    icon: "👟",
  },
];

const root: Section[] = [
  { title: "Toilette", icon: "🚽" },
  { title: "Hose wechseln", icon: "🩲🔁" },
  { title: "Hose aufschneiden", icon: "🩲✂️" },
  { title: "Hinlegen", icon: "😴" },
  { title: "Schmerzen", icon: "🤕" },
  { title: "Sitzen", icon: "🪑", section: sitSection },
  { title: "Flege", icon: "🧍🏽‍♀️", section: careSection },
  {
    title: "Essen",
    icon: "🍝",
    section: eatDrink,
  },
  { title: "Medikamente", icon: "💊", section: medicationSection },
  { title: "Bett", icon: "🛏️", section: bedSection },
  { title: "TV", icon: "📺", section: tvSection },
];

export default root;
