"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Menu, LogOut } from "lucide-react";
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
import { createClient } from "@/utils/supabase/client";

import { type User } from "@supabase/supabase-js";

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setIsLoading(false);
    };
    
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ImpactIndex home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700">
            <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-wider text-foreground">
            IMPACTINDEX
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

        <div className="hidden items-center gap-4 md:flex">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Portfolio
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-xl text-muted-foreground hover:text-foreground">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Sign In
                  </Link>
                  <Button render={<Link href="/auth/signup" />} variant="outline" size="sm" className="rounded-xl">
                    Create Account
                  </Button>
                </>
              )}
            </>
          )}
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
              <SheetTitle className="text-left font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wider">
                IMPACTINDEX
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
                    >
                      {link.label}
                    </Link>
                  }
                />
              ))}

              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                {!isLoading && (
                  <>
                    {user ? (
                      <>
                        <SheetClose
                          render={
                            <Link href="/portfolio" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                              Portfolio
                            </Link>
                          }
                        />
                        <SheetClose
                          render={
                            <button onClick={handleLogout} className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </button>
                          }
                        />
                      </>
                    ) : (
                      <>
                        <SheetClose
                          render={
                            <Link href="/auth/login" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                              Sign In
                            </Link>
                          }
                        />
                        <SheetClose
                          render={
                            <Link href="/auth/signup" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                              Create Account
                            </Link>
                          }
                        />
                      </>
                    )}
                  </>
                )}
                
                <SheetClose
                  render={
                    <Button render={<Link href="/donate" />} className="mt-2 w-full rounded-xl">
                      Donate
                    </Button>
                  }
                />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
