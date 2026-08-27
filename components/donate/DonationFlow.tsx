"use client";

import { useMemo, useState } from "react";
import type { IndexFund, Allocation } from "@/types";
import { IndexPicker } from "./IndexPicker";
import { AmountInput } from "./AmountInput";
import { SplitPreviewTable } from "./SplitPreviewTable";
import { MockCheckout } from "./MockCheckout";
import { SipToggle, type DonationFrequency } from "./SipToggle";
import { computeEqualSplit, MIN_DONATION } from "@/lib/donations";

interface DonationFlowProps {
  indexes: IndexFund[];
  initialIndex?: IndexFund;
}

export function DonationFlow({ indexes, initialIndex }: DonationFlowProps) {
  const [indexSlug, setIndexSlug] = useState<string>(
    initialIndex?.slug ?? indexes[0].slug,
  );
  const [amount, setAmount] = useState<number>(1000);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [receiptId, setReceiptId] = useState<string>("");
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");

  const index = useMemo(
    () => indexes.find((i) => i.slug === indexSlug) ?? indexes[0],
    [indexes, indexSlug],
  );

  const splits: Allocation[] = useMemo(
    () => computeEqualSplit(index, amount),
    [index, amount],
  );

  const handleSimulate = () => {
    setStatus("processing");
    setReceiptId(
      `II-${Date.now().toString(36).toUpperCase()}`,
    );
    setTimeout(() => setStatus("done"), 1200);
  };

  const handleReset = () => {
    setStatus("idle");
    setAmount(1000);
  };

  if (status === "done") {
    return (
      <MockCheckout
        receiptId={receiptId}
        amount={amount}
        splits={splits}
        indexName={index.name}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="space-y-8">
        <IndexPicker
          indexes={indexes}
          selected={indexSlug}
          onChange={setIndexSlug}
        />
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
          <p className="text-sm font-medium text-primary">
            Your donation will be divided equally among all NGOs in this Index.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Example: ₹{amount || 1000} ÷ {index.ngos.length} NGOs = ₹{((amount || 1000) / index.ngos.length).toFixed(2)} each
          </p>
        </div>
        <SipToggle
          frequency={frequency}
          onChange={setFrequency}
          monthlyAmount={amount}
        />
        <AmountInput
          amount={amount}
          onChange={setAmount}
          onDonate={handleSimulate}
          disabled={amount < MIN_DONATION || splits.length === 0}
          processing={status === "processing"}
        />
      </div>

      <div className="lg:sticky lg:top-24">
        <SplitPreviewTable splits={splits} />
      </div>
    </div>
  );
}
