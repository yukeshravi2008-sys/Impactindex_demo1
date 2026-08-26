"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/format";

export type DonationFrequency = "one-time" | "sip";

interface SipToggleProps {
  frequency: DonationFrequency;
  onChange: (f: DonationFrequency) => void;
  monthlyAmount: number;
}

export function SipToggle({
  frequency,
  onChange,
  monthlyAmount,
}: SipToggleProps) {
  const cumulative12 = monthlyAmount * 12;

  return (
    <div>
      <Label className="mb-3 block text-sm font-semibold text-foreground">
        Donation type
      </Label>
      <Tabs
        value={frequency}
        onValueChange={(v) => onChange(v as DonationFrequency)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-xl">
          <TabsTrigger value="one-time" className="rounded-lg text-sm">
            One-time
          </TabsTrigger>
          <TabsTrigger value="sip" className="rounded-lg text-sm">
            SIP — Monthly
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {frequency === "sip" && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly contribution</span>
            <span className="font-semibold text-foreground">
              {formatINR(monthlyAmount)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              12-month cumulative impact
            </span>
            <span className="font-bold text-emerald-700">
              {formatINR(cumulative12)}
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-500"
              style={{ width: "100%" }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Systematic Impact Plan — your monthly donation compounds across 12
            months, funding {Math.floor(cumulative12 / 200)}+ NGO-days of impact.
          </p>
        </div>
      )}
    </div>
  );
}
