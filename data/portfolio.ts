export interface TickerItem {
  code: string;
  name: string;
  change: number;
}

export const tickerData: TickerItem[] = [
  { code: "EDU50", name: "Education Index", change: 2.34 },
  { code: "HLTH30", name: "Health Index", change: 1.87 },
  { code: "DSR20", name: "Disaster Relief Index", change: -0.45 },
  { code: "CLIM20", name: "Climate Action Fund", change: 3.12 },
  { code: "GIRL15", name: "Girl Child Education", change: 1.56 },
  { code: "WTR25", name: "Clean Water Initiative", change: -0.78 },
  { code: "HLTH30", name: "Rural Health Access", change: 2.01 },
  { code: "EDU50", name: "STEM Scholars", change: 1.23 },
  { code: "DSR20", name: "Flood Relief Corps", change: 0.89 },
  { code: "CLIM20", name: "Solar Villages", change: 4.56 },
  { code: "GIRL15", name: "Women Empowerment", change: 1.78 },
  { code: "WTR25", name: "Sanitation Drive", change: -0.34 },
];

export interface PortfolioIndex {
  slug: string;
  name: string;
  code: string;
  invested: number;
  allocation: number;
  nav: number;
  navChange: number;
  impactScore: number;
  beneficiaries: number;
}

export const portfolioIndexes: PortfolioIndex[] = [
  {
    slug: "education",
    name: "Education Index",
    code: "EDU50",
    invested: 48000,
    allocation: 40,
    nav: 102.34,
    navChange: 2.34,
    impactScore: 81,
    beneficiaries: 340000,
  },
  {
    slug: "health",
    name: "Health Index",
    code: "HLTH30",
    invested: 36000,
    allocation: 30,
    nav: 101.87,
    navChange: 1.87,
    impactScore: 84,
    beneficiaries: 655000,
  },
  {
    slug: "disaster-relief",
    name: "Disaster Relief Index",
    code: "DSR20",
    invested: 36000,
    allocation: 30,
    nav: 99.55,
    navChange: -0.45,
    impactScore: 79,
    beneficiaries: 748000,
  },
];

export interface NavDataPoint {
  date: string;
  value: number;
}

export function generateNavHistory(): NavDataPoint[] {
  const months = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ];
  let nav = 100;
  return months.map((month, i) => {
    const change = (Math.random() - 0.3) * 2;
    nav = Math.max(96, nav + change);
    return {
      date: `${month} '25`,
      value: parseFloat(nav.toFixed(2)),
    };
  });
}

export interface RebalanceComparison {
  before: { name: string; value: number }[];
  after: { name: string; value: number }[];
}
