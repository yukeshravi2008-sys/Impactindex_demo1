export interface StateData {
  state: string;
  ngoCount: number;
  totalDonated: number;
  topIndex: string;
  intensity: number;
}

export const stateData: Record<string, StateData> = {
  "Tamil Nadu": {
    state: "Tamil Nadu",
    ngoCount: 12,
    totalDonated: 420000,
    topIndex: "Education",
    intensity: 0.9,
  },
  Maharashtra: {
    state: "Maharashtra",
    ngoCount: 15,
    totalDonated: 580000,
    topIndex: "Health",
    intensity: 1.0,
  },
  Karnataka: {
    state: "Karnataka",
    ngoCount: 10,
    totalDonated: 350000,
    topIndex: "Education",
    intensity: 0.75,
  },
  Delhi: {
    state: "Delhi",
    ngoCount: 8,
    totalDonated: 290000,
    topIndex: "Disaster Relief",
    intensity: 0.65,
  },
  "West Bengal": {
    state: "West Bengal",
    ngoCount: 7,
    totalDonated: 210000,
    topIndex: "Health",
    intensity: 0.5,
  },
  Rajasthan: {
    state: "Rajasthan",
    ngoCount: 6,
    totalDonated: 180000,
    topIndex: "Education",
    intensity: 0.45,
  },
  "Madhya Pradesh": {
    state: "Madhya Pradesh",
    ngoCount: 9,
    totalDonated: 320000,
    topIndex: "Health",
    intensity: 0.7,
  },
  Assam: {
    state: "Assam",
    ngoCount: 5,
    totalDonated: 150000,
    topIndex: "Education",
    intensity: 0.4,
  },
  Bihar: {
    state: "Bihar",
    ngoCount: 6,
    totalDonated: 190000,
    topIndex: "Disaster Relief",
    intensity: 0.45,
  },
  "Andhra Pradesh": {
    state: "Andhra Pradesh",
    ngoCount: 4,
    totalDonated: 120000,
    topIndex: "Health",
    intensity: 0.3,
  },
  Odisha: {
    state: "Odisha",
    ngoCount: 5,
    totalDonated: 140000,
    topIndex: "Disaster Relief",
    intensity: 0.35,
  },
  Gujarat: {
    state: "Gujarat",
    ngoCount: 4,
    totalDonated: 110000,
    topIndex: "Education",
    intensity: 0.28,
  },
  Kerala: {
    state: "Kerala",
    ngoCount: 3,
    totalDonated: 95000,
    topIndex: "Health",
    intensity: 0.25,
  },
  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    ngoCount: 8,
    totalDonated: 260000,
    topIndex: "Education",
    intensity: 0.6,
  },
  Punjab: {
    state: "Punjab",
    ngoCount: 3,
    totalDonated: 85000,
    topIndex: "Education",
    intensity: 0.22,
  },
  Haryana: {
    state: "Haryana",
    ngoCount: 3,
    totalDonated: 80000,
    topIndex: "Health",
    intensity: 0.2,
  },
  "Uttarakhand": {
    state: "Uttarakhand",
    ngoCount: 2,
    totalDonated: 55000,
    topIndex: "Disaster Relief",
    intensity: 0.15,
  },
  "Himachal Pradesh": {
    state: "Himachal Pradesh",
    ngoCount: 2,
    totalDonated: 45000,
    topIndex: "Education",
    intensity: 0.12,
  },
  Jharkhand: {
    state: "Jharkhand",
    ngoCount: 3,
    totalDonated: 70000,
    topIndex: "Education",
    intensity: 0.18,
  },
  Chhattisgarh: {
    state: "Chhattisgarh",
    ngoCount: 2,
    totalDonated: 40000,
    topIndex: "Health",
    intensity: 0.1,
  },
  Goa: {
    state: "Goa",
    ngoCount: 1,
    totalDonated: 20000,
    topIndex: "Education",
    intensity: 0.05,
  },
  Telangana: {
    state: "Telangana",
    ngoCount: 4,
    totalDonated: 130000,
    topIndex: "Health",
    intensity: 0.33,
  },
  "Jammu and Kashmir": {
    state: "Jammu and Kashmir",
    ngoCount: 2,
    totalDonated: 50000,
    topIndex: "Disaster Relief",
    intensity: 0.13,
  },
  "Arunachal Pradesh": {
    state: "Arunachal Pradesh",
    ngoCount: 1,
    totalDonated: 15000,
    topIndex: "Education",
    intensity: 0.04,
  },
  Manipur: {
    state: "Manipur",
    ngoCount: 1,
    totalDonated: 18000,
    topIndex: "Disaster Relief",
    intensity: 0.05,
  },
  Meghalaya: {
    state: "Meghalaya",
    ngoCount: 1,
    totalDonated: 22000,
    topIndex: "Disaster Relief",
    intensity: 0.06,
  },
  Mizoram: {
    state: "Mizoram",
    ngoCount: 1,
    totalDonated: 12000,
    topIndex: "Education",
    intensity: 0.03,
  },
  Nagaland: {
    state: "Nagaland",
    ngoCount: 1,
    totalDonated: 10000,
    topIndex: "Education",
    intensity: 0.03,
  },
  Sikkim: {
    state: "Sikkim",
    ngoCount: 1,
    totalDonated: 8000,
    topIndex: "Education",
    intensity: 0.02,
  },
  Tripura: {
    state: "Tripura",
    ngoCount: 1,
    totalDonated: 14000,
    topIndex: "Education",
    intensity: 0.04,
  },
};

export const hotStates = [
  "Tamil Nadu",
  "Maharashtra",
  "Karnataka",
  "Delhi",
] as const;

export function formatDonationCompact(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}
