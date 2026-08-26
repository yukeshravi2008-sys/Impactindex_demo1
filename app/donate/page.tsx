import type { Metadata } from "next";
import { indexes, getIndexBySlug } from "@/data/indexes";
import { DonationFlow } from "@/components/donate/DonationFlow";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Pick a cause index, choose how it splits, and donate to verified NGOs across India.",
};

interface DonatePageProps {
  searchParams: { index?: string };
}

export default function DonatePage({ searchParams }: DonatePageProps) {
  const initialIndex = searchParams.index
    ? getIndexBySlug(searchParams.index)
    : undefined;

  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Build your donation.
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Pick an index, choose how it splits, and watch your rupees diversify
            in real time.
          </p>
        </div>

        <DonationFlow indexes={indexes} initialIndex={initialIndex} />
      </div>
    </div>
  );
}
