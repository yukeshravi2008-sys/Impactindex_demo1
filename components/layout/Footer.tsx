import { TrendingUp } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700">
                <TrendingUp className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wider">
                IMPACTINDEX
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-foreground">About</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              ImpactIndex applies the logic of index-fund investing to charitable
              giving. Pick a cause, and your donation automatically splits across
              every verified NGO in that index.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              © 2026 ImpactIndex. {siteConfig.team}.
            </p>
            <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              Demo build — no real donations are processed.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
