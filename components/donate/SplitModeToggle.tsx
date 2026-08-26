"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SplitMode } from "@/types";

interface SplitModeToggleProps {
  mode: SplitMode;
  onChange: (mode: SplitMode) => void;
}

export function SplitModeToggle({ mode, onChange }: SplitModeToggleProps) {
  return (
    <fieldset>
      <legend className="mb-4 text-sm font-semibold text-foreground">
        Split method
      </legend>
      <Tabs
        value={mode}
        onValueChange={(v) => onChange(v as SplitMode)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-xl">
          <TabsTrigger value="equal" className="rounded-lg text-sm">
            Equal
          </TabsTrigger>
          <TabsTrigger value="weighted" className="rounded-lg text-sm">
            Weighted
          </TabsTrigger>
        </TabsList>
        <div className="mt-3 text-sm text-muted-foreground">
          {mode === "equal" ? (
            <p>Every NGO receives the same share of your donation.</p>
          ) : (
            <p>
              Shares follow each NGO&apos;s verified impact score — higher score,
              larger share.
            </p>
          )}
        </div>
      </Tabs>
    </fieldset>
  );
}
