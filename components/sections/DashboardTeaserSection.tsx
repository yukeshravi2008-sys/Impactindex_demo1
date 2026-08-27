import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Progress } from "@/components/ui/progress";
import { indexes } from "@/data/indexes";
import { formatINR } from "@/lib/format";

export function DashboardTeaserSection() {
  const healthIndex = indexes.find((i) => i.slug === "health")!;
  const totalRaised = 2450000;
  const donorCount = 847;

  return (
    <section
      aria-labelledby="dashboard-heading"
      id="dashboard"
      className="bg-secondary/50 py-20 sm:py-28"
    >
      <Container>
        <div className="mb-10 sm:mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            Transparency
          </span>
          <h2
            id="dashboard-heading"
            className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            A NAV-style dashboard for your giving.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Track every rupee from donor to NGO, just like a fund NAV.
          </p>
        </div>

        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-lg">
          <div className="border-b border-stone-100 bg-emerald-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Health Index — Dashboard
                </h3>
                <p className="text-xs text-emerald-100">
                  Illustrative data for demonstration
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-100">Corpus raised</p>
                <p className="text-lg font-bold text-white">
                  {formatINR(totalRaised)}
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {healthIndex.ngos.map((ngo) => {
              const share = 100 / healthIndex.ngos.length;
              const amount = Math.round(totalRaised / healthIndex.ngos.length);

              return (
                <div key={ngo.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {ngo.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{ngo.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {formatINR(amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {share.toFixed(1)}% share
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={share}
                    className="mt-2 h-1.5"
                    aria-label={`${ngo.name} share: ${share.toFixed(1)}%`}
                  />
                </div>
              );
            })}
          </div>

          <div className="border-t border-stone-100 bg-stone-50 px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {donorCount} donors · Last updated: Jan 2026
              </span>
              <Button
                render={<Link href="/donate" />}
                variant="ghost"
                size="sm"
                className="rounded-xl text-emerald-700"
              >
                Donate now
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
