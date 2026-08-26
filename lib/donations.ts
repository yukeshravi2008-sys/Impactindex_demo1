import { Allocation, IndexFund, SplitMode } from "@/types";

export const MIN_DONATION = 100;

export function computeSplit(
  index: IndexFund,
  amount: number,
  mode: SplitMode,
): Allocation[] {
  if (amount < MIN_DONATION || index.ngos.length === 0) return [];

  if (mode === "equal") {
    return computeEqualSplit(index, amount);
  }
  return computeWeightedSplit(index, amount);
}

function computeEqualSplit(index: IndexFund, amount: number): Allocation[] {
  const n = index.ngos.length;
  const base = Math.floor(amount / n);
  let remainder = amount - base * n;

  return index.ngos.map((ngo) => {
    const extra = remainder > 0 ? 1 : 0;
    remainder -= extra;
    const allocAmount = base + extra;
    return {
      ngo,
      amount: allocAmount,
      share: allocAmount / amount,
    };
  });
}

function computeWeightedSplit(index: IndexFund, amount: number): Allocation[] {
  const totalWeight = index.ngos.reduce((sum, ngo) => sum + ngo.impactScore, 0);

  const raw = index.ngos.map((ngo) => ({
    ngo,
    raw: (ngo.impactScore / totalWeight) * amount,
  }));

  const floored = raw.map((r) => ({
    ...r,
    amount: Math.floor(r.raw),
  }));

  const residue =
    amount - floored.reduce((sum, f) => sum + f.amount, 0);

  const maxIdx = floored.reduce(
    (best, f, i) => (f.amount > floored[best].amount ? i : best),
    0,
  );

  floored[maxIdx].amount += residue;

  return floored.map((f) => ({
    ngo: f.ngo,
    amount: f.amount,
    share: f.amount / amount,
  }));
}
