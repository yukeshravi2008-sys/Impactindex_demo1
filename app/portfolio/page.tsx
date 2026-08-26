import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Track your diversified impact portfolio — NAV trends, allocation, and projected growth.",
};

export default function PortfolioPage() {
  return <DashboardClient />;
}
