export type IndexSlug = "education" | "health" | "disaster-relief";

export interface Ngo {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  verifiedSince: number;
  beneficiaries: number;
}

export interface IndexFund {
  slug: IndexSlug;
  name: string;
  tagline: string;
  description: string;
  ngos: Ngo[];
}

export interface Allocation {
  ngo: Ngo;
  amount: number;
  share: number;
}
