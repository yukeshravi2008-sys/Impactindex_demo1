import { Allocation, IndexFund } from "@/types";

export const MIN_DONATION = 100;

export function computeEqualSplit(index: IndexFund, amount: number): Allocation[] {
  if (amount < MIN_DONATION || index.ngos.length === 0) return [];

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
