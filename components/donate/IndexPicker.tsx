"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import type { IndexFund } from "@/types";
import { Users } from "lucide-react";

const icons: Record<string, string> = {
  education: "📚",
  health: "🏥",
  "disaster-relief": "🌊",
};

interface IndexPickerProps {
  indexes: IndexFund[];
  selected: string;
  onChange: (slug: string) => void;
}

export function IndexPicker({ indexes, selected, onChange }: IndexPickerProps) {
  return (
    <fieldset>
      <legend className="mb-4 text-sm font-semibold text-foreground">
        Select an index
      </legend>
      <RadioGroup
        value={selected}
        onValueChange={onChange}
        className="grid gap-3 sm:grid-cols-3"
      >
        {indexes.map((index) => (
          <Label
            key={index.slug}
            htmlFor={`index-${index.slug}`}
            className="cursor-pointer"
          >
            <Card
              className={`flex items-start gap-3 rounded-2xl border-2 p-4 transition-colors ${
                selected === index.slug
                  ? "border-emerald-600 bg-emerald-50/50"
                  : "border-stone-100 hover:border-stone-200"
              }`}
            >
              <RadioGroupItem
                value={index.slug}
                id={`index-${index.slug}`}
                className="mt-1"
              />
              <div className="flex-1">
                <span className="text-2xl" aria-hidden="true">
                  {icons[index.slug] ?? "📊"}
                </span>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {index.name}
                </p>
                <p className="text-xs text-muted-foreground">{index.tagline}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  {index.ngos.length} NGOs
                </p>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
