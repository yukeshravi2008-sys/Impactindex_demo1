import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Pick an index",
    description:
      "Choose a cause category — education, health, or disaster relief — each containing verified NGOs.",
  },
  {
    number: "02",
    title: "Choose your split",
    description:
      "Equal — every NGO receives the same share. Or Weighted — shares follow each NGO's verified impact score.",
  },
  {
    number: "03",
    title: "One donation, fully tracked",
    description:
      "Funds auto-split across the index. A NAV-style dashboard shows every NGO's share in real time.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      id="how-it-works"
      className="bg-secondary/50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From decision paralysis to one-click impact."
          description="Three simple steps to diversified, transparent giving."
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"
            >
              <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-emerald-100">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-sm">
          <span className="rounded-lg bg-emerald-700 px-3 py-1.5 font-semibold text-white">
            ₹1,000
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="rounded-lg bg-stone-100 px-3 py-1.5 font-medium text-stone-700">
            5 NGOs × ₹200
          </span>
        </div>
      </Container>
    </section>
  );
}
