import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { formatINR } from "@/lib/format";
import type { Allocation } from "@/types";
import { CheckCircle, RotateCcw } from "lucide-react";

interface MockCheckoutProps {
  receiptId: string;
  amount: number;
  splits: Allocation[];
  indexName: string;
  onReset: () => void;
}

export function MockCheckout({
  receiptId,
  amount,
  splits,
  indexName,
  onReset,
}: MockCheckoutProps) {
  return (
    <Container>
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-8 w-8 text-emerald-700" aria-hidden="true" />
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
          Donation confirmed!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Thank you for diversifying your giving.
        </p>

        <Card className="mt-8 overflow-hidden rounded-2xl border-stone-100 p-0 text-left shadow-md">
          <div className="border-b border-stone-100 bg-emerald-700 px-6 py-4">
            <p className="text-sm font-medium text-emerald-100">Receipt</p>
          </div>
          <div className="divide-y divide-stone-100 px-6 py-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Donation ID</span>
              <span className="font-mono text-xs text-foreground">{receiptId}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-bold text-foreground">
                {formatINR(amount)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Index</span>
              <span className="text-sm text-foreground">{indexName}</span>
            </div>
            <div className="py-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Per-NGO splits:
              </p>
              {splits.map((s) => (
                <div
                  key={s.ngo.id}
                  className="flex items-center justify-between py-1 text-xs"
                >
                  <span className="text-foreground">{s.ngo.name}</span>
                  <span className="text-muted-foreground">
                    {formatINR(s.amount)} ({(s.share * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-stone-100 bg-amber-50 px-6 py-3">
            <p className="text-xs font-medium text-amber-800">
              Demo — no real money moved.
            </p>
          </div>
        </Card>

        <Button
          onClick={onReset}
          variant="ghost"
          className="mt-6 rounded-xl text-emerald-700"
        >
          <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
          Make another donation
        </Button>
      </div>
    </Container>
  );
}
