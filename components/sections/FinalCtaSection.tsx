import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-stone-700 py-20 sm:py-28"
    >
      <Container className="text-center">
        <h2
          id="final-cta-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
        >
          Stop choosing between causes.
          <br />
          Start diversifying impact.
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            render={<Link href="/donate" />}
            size="lg"
            className="rounded-xl bg-white text-emerald-800 hover:bg-stone-100"
          >
            Donate to an index
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            render={<a href="/#indexes" />}
            variant="ghost"
            size="lg"
            className="rounded-xl text-white hover:bg-white/10 hover:text-white"
          >
            Browse indexes
          </Button>
        </div>
      </Container>
    </section>
  );
}
