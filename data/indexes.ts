import { IndexFund } from "@/types";
import { ngos } from "./ngos";

export const indexes: IndexFund[] = [
  {
    slug: "education",
    name: "Education Index",
    tagline: "Fund learning, not logistics.",
    description:
      "Four verified NGOs improving literacy and STEM access across India — from Mumbai's urban slums to Assam's tribal communities.",
    ngos: ngos.filter((n) =>
      ["ngo-1", "ngo-2", "ngo-3", "ngo-10"].includes(n.id),
    ),
  },
  {
    slug: "health",
    name: "Health Index",
    tagline: "Healthcare that reaches everyone.",
    description:
      "Four verified NGOs delivering maternal care, telemedicine, and affordable treatment from Bhopal to Kolkata.",
    ngos: ngos.filter((n) =>
      ["ngo-4", "ngo-5", "ngo-6", "ngo-11"].includes(n.id),
    ),
  },
  {
    slug: "disaster-relief",
    name: "Disaster Relief Index",
    tagline: "Rapid response, lasting recovery.",
    description:
      "Three verified NGOs on the front lines of floods, cyclones, and emergencies across India's most vulnerable regions.",
    ngos: ngos.filter((n) =>
      ["ngo-7", "ngo-8", "ngo-9", "ngo-12"].includes(n.id),
    ),
  },
];

export function getIndexBySlug(slug: string): IndexFund | undefined {
  return indexes.find((i) => i.slug === slug);
}
