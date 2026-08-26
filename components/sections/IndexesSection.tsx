import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { indexes } from "@/data/indexes";
import type { IndexFund } from "@/types";
import { MIN_DONATION } from "@/lib/donations";
import { formatINR } from "@/lib/format";

const icons: Record<string, string> = {
  education: "📚",
  health: "🏥",
  "disaster-relief": "🌊",
};

export function IndexCard({ index }: { index: IndexFund }) {
  const avgImpact = Math.round(
    index.ngos.reduce((s, n) => s + n.impactScore, 0) / index.ngos.length,
  );

  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border-stone-100 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex-1 p-6">
        <div className="flex items-start justify-between">
          <span className="text-3xl" aria-hidden="true">
            {icons[index.slug] ?? "📊"}
          </span>
          <Badge variant="secondary" className="text-xs">
            {index.ngos.length} NGOs
          </Badge>
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
          {index.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-emerald-700">
          {index.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {index.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Avg impact {avgImpact}
          </span>
          <span>Min {formatINR(MIN_DONATION)}</span>
        </div>

        <div className="mt-4 space-y-1.5">
          {index.ngos.map((ngo) => (
            <div
              key={ngo.id}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-foreground">{ngo.name}</span>
              <span className="text-muted-foreground">{ngo.city}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-100 p-4">
        <Button
          render={<Link href={`/donate?index=${index.slug}`} />}
          variant="ghost"
          className="w-full justify-between rounded-xl text-emerald-700 hover:text-emerald-800"
        >
          Donate to this index
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Button>
      </div>
    </Card>
  );
}

export function IndexesSection() {
  return (
    <section
      aria-labelledby="indexes-heading"
      id="indexes"
      className="bg-background py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Indexes"
          title="Three causes. Every rupee diversified."
          description="Each index bundles verified NGOs working in a focused cause area."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {indexes.map((index) => (
            <IndexCard key={index.slug} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
