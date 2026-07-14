export const BRAND = {
  name: "Fonda Colombiana",
  shortName: "Fonda",
  legalCity: "San Jose, CA",
  tagline: "Tan rico como en casa",
  domain: "https://fondacolombianasj.com",

  colors: {
    amarillo: "#F5B700",
    amarilloDeep: "#E0A100",
    rojo: "#D6262B",
    rojoDeep: "#A81D22",
    azul: "#0A3D62",
    negro: "#1A1410",
    carbon: "#2B231C",
    crema: "#FBF5E9",
    cremaDeep: "#F2E8D5",
    blanco: "#FFFFFF",
    textPrimary: "#1A1410",
    textOnDark: "#FBF5E9",
    textMuted: "#6B5E50",
  },

  fonts: {
    serifDisplay: '"Playfair Display", "Georgia", serif',
    sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
  },

  social: {
    instagram: "https://www.instagram.com/fondacolombianasj/",
    instagramHandle: "@fondacolombianasj",
    tiktok: "https://www.tiktok.com/@fondacolombianasj",
    tiktokHandle: "@fondacolombianasj",
  },
} as const;

export const STORY = {
  family: "La Familia Ruiz",
  motto: "Tan rico como en casa",
  heroSlogan: "¡Tan rico como en tu segunda casa!",
  heroSubSlogan: "Tu comida colombiana favorita, a un clic de tu puerta.",
  origin: {
    year: 2019,
    text:
      "Todo empezó en 2019 en la mesa de la cocina familiar — la familia Ruiz envolviendo " +
      "tamales auténticos del Huila a mano y vendiéndolos desde casa, vecino a vecino.",
  },
  opening: {
    date: "Enero 2020",
    text:
      "En enero de 2020 abrieron sus primeras puertas. Semanas después el mundo cerró — " +
      "pero la familia siguió cocinando, siguió envolviendo tamales, y la comunidad siguió llegando.",
  },
  today: {
    text:
      "Hoy, la Fonda Colombiana sirve esa misma receta de cocina casera en dos ubicaciones " +
      "en San Jose, con el Tamal Huilense que lo inició todo todavía en cada menú.",
  },
} as const;

export type DayHours = { open: string; close: string } | null;

export interface WeeklyHours {
  mon: DayHours;
  tue: DayHours;
  wed: DayHours;
  thu: DayHours;
  fri: DayHours;
  sat: DayHours;
  sun: DayHours;
}

export interface Location {
  id: "white" | "snell";
  label: string;
  shortLabel: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  mapsQuery: string;
  phone: string;
  phoneHref: string;
  orderUrl: string;
  hours: WeeklyHours;
}

const STANDARD_HOURS: WeeklyHours = {
  mon: { open: "11:00", close: "21:30" },
  tue: { open: "11:00", close: "21:30" },
  wed: { open: "11:00", close: "21:30" },
  thu: { open: "11:00", close: "21:30" },
  fri: { open: "11:00", close: "21:30" },
  sat: { open: "11:00", close: "21:30" },
  sun: { open: "11:00", close: "21:30" },
};

const SHARED_PHONE = "(408) 649-6167";
const SHARED_PHONE_HREF = "tel:+14086496167";

export const LOCATIONS: Location[] = [
  {
    id: "white",
    label: "Fonda White",
    shortLabel: "Fonda White",
    address: "1442 S White Rd",
    city: "San Jose",
    state: "CA",
    zip: "95127",
    mapsQuery: "Fonda Colombiana, 1442 S White Rd, San Jose, CA 95127",
    phone: SHARED_PHONE,
    phoneHref: SHARED_PHONE_HREF,
    orderUrl:
      "https://order.spoton.com/so-fonda-colombiana-23377/san-jose-ca/67f703130ea5378766a115b9/pickup",
    hours: STANDARD_HOURS,
  },
  {
    id: "snell",
    label: "Fonda Snell",
    shortLabel: "Fonda Snell",
    address: "5585 Snell Avenue",
    city: "San Jose",
    state: "CA",
    zip: "95123",
    mapsQuery: "Fonda Colombiana, 5585 Snell Avenue, San Jose, CA 95123",
    phone: SHARED_PHONE,
    phoneHref: SHARED_PHONE_HREF,
    orderUrl:
      "https://order.spoton.com/so-fonda-colombiana-23377/san-jose-ca/67f703130ea5378766a115b9/pickup",
    hours: STANDARD_HOURS,
  },
];

export type MenuBadge = "Más Popular" | "Especial del Chef" | "Nuestras Raíces" | null;

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  badge: MenuBadge;
  description: string;
  isHeritage?: boolean;
}

export const MENU_HIGHLIGHTS: MenuItem[] = [
  {
    id: "bandeja-paisa",
    name: "Bandeja Paisa",
    price: 27.03,
    priceDisplay: "$27.03",
    badge: "Más Popular",
    description:
      "Arroz, frijoles, carne asada, chicharrón, chorizo colombiano, plátano maduro, aguacate, arepa y huevo frito.",
  },
  {
    id: "cazuelita-la-toxic",
    name: "Cazuelita La Toxic",
    price: 19.24,
    priceDisplay: "$19.24",
    badge: "Especial del Chef",
    description:
      "Base de frijoles y arroz con chorizo colombiano, plátanos maduros, arepa frita, aguacate y chicharrón.",
  },
  {
    id: "churrasco-chichombiano",
    name: "Churrasco Chichombiano",
    price: 24.95,
    priceDisplay: "$24.95",
    badge: null,
    description:
      "Churrasco de res sobre calentado de lentejas y arroz, plátanos maduros y sofritos de cebolla, tomate y huevo.",
  },
  {
    id: "tamal-huilense",
    name: "Tamal Huilense",
    price: 16.63,
    priceDisplay: "$16.63",
    badge: "Nuestras Raíces",
    description:
      "El tamal tradicional y auténtico de la región del Huila — el plato que le dio vida a todo esto.",
    isHeritage: true,
  },
  {
    id: "empanadas-x3",
    name: "Empanadas x3",
    price: 13.51,
    priceDisplay: "$13.51",
    badge: null,
    description: "Carne desmechada o pollo envuelto en masa de maíz crujiente y dorada.",
  },
  {
    id: "pataconas-con-hogao-x4",
    name: "Pataconas con Hogao x4",
    price: 7.27,
    priceDisplay: "$7.27",
    badge: null,
    description:
      "Plátanos verdes doblemente fritos acompañados de hogao casero de tomate y cebolla.",
  },
];

export const NAV_LINKS = [
  { href: "#locations", label: "Ubicaciones" },
  { href: "#story", label: "Nuestra Historia" },
  { href: "#menu", label: "Menú" },
  { href: "#visit", label: "Visítanos" },
] as const;

export const getLocation = (id: Location["id"]) =>
  LOCATIONS.find((l) => l.id === id)!;
