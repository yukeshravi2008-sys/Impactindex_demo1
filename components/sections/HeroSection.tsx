import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { TickerStrip } from "@/components/ui/TickerStrip";
import { computeEqualSplit } from "@/lib/donations";
import { formatINR } from "@/lib/format";
import { indexes } from "@/data/indexes";

export function HeroSection() {
  const eduIndex = indexes.find((i) => i.slug === "education")!;
  const previewSplits = computeEqualSplit(eduIndex, 1000);
  const ngoCount = indexes.reduce((sum, idx) => sum + idx.ngos.length, 0);

  return (
    <>
      <TickerStrip />
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-background to-emerald-50/40 pb-20 pt-20 sm:pb-28 sm:pt-28"
      >
      <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-amber-100/40 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge
              variant="secondary"
              className="mb-6 border border-emerald-200 bg-emerald-50 text-emerald-800"
            >
              Giving, diversified
            </Badge>
            <h1
              id="hero-heading"
              className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              One donation. Every verified NGO in the index benefits.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ImpactIndex works like an index fund for giving. Pick a cause —
              education, health, or disaster relief — and your donation
              automatically splits across every verified NGO in that index.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button render={<Link href="/donate" />} size="lg" className="rounded-xl">
                Donate to an index
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button render={<a href="/#how-it-works" />} variant="ghost" size="lg" className="rounded-xl">
                How it works
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {ngoCount} verified NGOs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                3 indexes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                100% split transparency
              </span>
            </div>
          </div>

          <div className="hidden lg:block">
            <Card className="overflow-hidden rounded-2xl border-stone-200 p-0 shadow-lg">
              <div className="border-b border-stone-100 bg-emerald-700 px-6 py-4">
                <p className="text-sm font-medium text-emerald-100">
                  Education Index — ₹1,000 Equal Split
                </p>
              </div>
              <div className="divide-y divide-stone-100">
                {previewSplits.map((split) => (
                  <div
                    key={split.ngo.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {split.ngo.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {split.ngo.city}, {split.ngo.state}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">
                      {formatINR(split.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-100 bg-stone-50 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-sm font-bold text-foreground">
                    {formatINR(previewSplits.reduce((s, a) => s + a.amount, 0))}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
