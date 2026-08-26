"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { siteConfig } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ImpactIndex home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700">
            <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
            ImpactIndex
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button render={<Link href="/donate" />} className="rounded-xl">
            Donate
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
            }
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left font-[family-name:var(--font-display)] text-lg">
                ImpactIndex
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {siteConfig.navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    />
                  }
                />
              ))}
              <SheetClose
                render={
                  <Button render={<Link href="/donate" />} className="mt-4 rounded-xl" />
                }
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
