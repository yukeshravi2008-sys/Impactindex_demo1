import { Eye, HelpCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    icon: Eye,
    title: "Visibility gap",
    description:
      "Donors overwhelmingly give to a handful of famous NGOs. Equally credible smaller organisations stay underfunded simply because no one has heard of them.",
  },
  {
    icon: HelpCircle,
    title: "Decision paralysis",
    description:
      "With thousands of NGOs competing for attention, first-time donors freeze up and give nothing at all.",
  },
  {
    icon: ShieldCheck,
    title: "Trust overhead",
    description:
      "Verifying legitimacy takes time most donors don't have. The result: donations flow to whoever markets best, not whoever serves best.",
  },
];

export function ProblemSection() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="bg-background py-20 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Small NGOs are starved of reach, not credibility."
              align="left"
            />
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Donors overwhelmingly give to a handful of famous NGOs — the ones
                with the slickest websites and biggest ad budgets. Meanwhile,
                smaller organisations doing equally impactful work in places like
                Coimbatore, Guwahati, and Bhopal stay invisible.
              </p>
              <p>
                &ldquo;Which NGO do I trust?&rdquo; causes decision paralysis.
                First-time donors research for hours, feel overwhelmed, and give
                up entirely. The result: a few well-known names collect the
                lion&apos;s share while thousands of credible NGOs go underfunded.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="flex gap-4 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <problem.icon
                    className="h-5 w-5 text-emerald-700"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {problem.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
