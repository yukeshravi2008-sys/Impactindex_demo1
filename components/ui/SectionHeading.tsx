import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 sm:mb-14", align === "center" && "text-center")}>
      {eyebrow && (
        <Badge
          variant="secondary"
          className="mb-4 border border-emerald-200 bg-emerald-50 text-emerald-800"
        >
          {eyebrow}
        </Badge>
      )}
      <h2
        id={id}
        className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
