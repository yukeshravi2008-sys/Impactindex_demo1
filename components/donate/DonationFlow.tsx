"use client";

import { useMemo, useState } from "react";
import type { IndexFund, SplitMode, Allocation } from "@/types";
import { IndexPicker } from "./IndexPicker";
import { SplitModeToggle } from "./SplitModeToggle";
import { AmountInput } from "./AmountInput";
import { SplitPreviewTable } from "./SplitPreviewTable";
import { MockCheckout } from "./MockCheckout";
import { SipToggle, type DonationFrequency } from "./SipToggle";
import { computeSplit, MIN_DONATION } from "@/lib/donations";

interface DonationFlowProps {
  indexes: IndexFund[];
  initialIndex?: IndexFund;
}

export function DonationFlow({ indexes, initialIndex }: DonationFlowProps) {
  const [indexSlug, setIndexSlug] = useState<string>(
    initialIndex?.slug ?? indexes[0].slug,
  );
  const [mode, setMode] = useState<SplitMode>("equal");
  const [amount, setAmount] = useState<number>(1000);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [receiptId, setReceiptId] = useState<string>("");
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");

  const index = useMemo(
    () => indexes.find((i) => i.slug === indexSlug) ?? indexes[0],
    [indexes, indexSlug],
  );

  const splits: Allocation[] = useMemo(
    () => computeSplit(index, amount, mode),
    [index, amount, mode],
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
    setMode("equal");
  };

  if (status === "done") {
    return (
      <MockCheckout
        receiptId={receiptId}
        amount={amount}
        mode={mode}
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
        <SplitModeToggle mode={mode} onChange={setMode} />
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
