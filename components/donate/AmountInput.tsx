"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MIN_DONATION } from "@/lib/donations";
import { formatINR } from "@/lib/format";
import { Loader2 } from "lucide-react";

const presets = [500, 1000, 2500, 5000];

interface AmountInputProps {
  amount: number;
  onChange: (amount: number) => void;
  onDonate: () => void;
  disabled: boolean;
  processing: boolean;
}

export function AmountInput({
  amount,
  onChange,
  onDonate,
  disabled,
  processing,
}: AmountInputProps) {
  const isValid = amount >= MIN_DONATION;

  return (
    <div>
      <Label htmlFor="amount" className="mb-2 block text-sm font-semibold text-foreground">
        Amount (₹)
      </Label>
      <Input
        id="amount"
        type="number"
        min={MIN_DONATION}
        step={100}
        value={amount}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-12 rounded-xl text-lg"
        aria-describedby="amount-validation"
      />
      {!isValid && (
        <p id="amount-validation" className="mt-2 text-sm text-destructive">
          Minimum donation is {formatINR(MIN_DONATION)}.
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              amount === preset
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-stone-200 text-muted-foreground hover:border-stone-300"
            }`}
          >
            {formatINR(preset)}
          </button>
        ))}
      </div>

      <Button
        onClick={onDonate}
        disabled={disabled || processing}
        className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Processing…
          </>
        ) : (
          `Donate ${isValid ? formatINR(amount) : "…"}`
        )}
      </Button>
    </div>
  );
}
