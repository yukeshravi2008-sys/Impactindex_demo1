"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import {
  IndianRupee,
  Layers,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  portfolioIndexes,
  generateNavHistory,
  type PortfolioIndex,
} from "@/data/portfolio";
import { indexes } from "@/data/indexes";
import { computeEqualSplit } from "@/lib/donations";
import { formatINR } from "@/lib/format";
import { useCountUp } from "@/hooks/useCountUp";

const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];

export function DashboardClient() {
  const [allocations] = useState<PortfolioIndex[]>(
    portfolioIndexes,
  );
  const [navHistory] = useState(() => generateNavHistory());

  const totalInvested = allocations.reduce((s, i) => s + i.invested, 0);
  const activeIndices = allocations.length;
  const totalBeneficiaries = allocations.reduce(
    (s, i) => s + i.beneficiaries,
    0,
  );

  const animatedInvested = useCountUp(totalInvested, 1400);
  const animatedBeneficiaries = useCountUp(totalBeneficiaries, 1400);
  const animatedIndices = useCountUp(activeIndices, 800);

  const pieData = allocations.map((a) => ({
    name: a.name,
    value: a.invested,
  }));

  const heroIndex = indexes[0];
  const heroSplits = computeEqualSplit(heroIndex, 1000);

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8 sm:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              My Impact Portfolio
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your diversified impact across all indices.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              render={<Link href="/donate" />}
              size="sm"
              className="rounded-lg"
            >
              <IndianRupee className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Invest more
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Invested"
            value={formatINR(animatedInvested)}
            icon={IndianRupee}
            trend={+5.2}
          />
          <StatCard
            label="Active Indices"
            value={String(animatedIndices)}
            icon={Layers}
          />
          <StatCard
            label="Total Beneficiaries"
            value={animatedBeneficiaries.toLocaleString("en-IN")}
            icon={Users}
            trend={+12.8}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Card className="overflow-hidden rounded-2xl border-border p-0 ring-0">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                  Impact NAV Trend
                </h2>
                <p className="text-xs text-muted-foreground">
                  Illustrative 12-month NAV movement
                </p>
              </div>
              <div className="px-4 py-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={navHistory}>
                      <defs>
                        <linearGradient
                          id="navGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#059669"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#059669"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(40 10% 90%)"
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: "hsl(24 6% 45%)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[96, 108]}
                        tick={{ fontSize: 11, fill: "hsl(24 6% 45%)" }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(40 10% 90%)",
                          background: "white",
                          fontSize: "13px",
                        }}
                        formatter={(val) => [`₹${Number(val).toFixed(2)}`, "NAV"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#059669"
                        strokeWidth={2}
                        fill="url(#navGradient)"
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-2xl border-border p-0 ring-0">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                  Holdings
                </h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Index</TableHead>
                    <TableHead className="text-right text-xs">Invested</TableHead>
                    <TableHead className="text-right text-xs">Allocation</TableHead>
                    <TableHead className="text-right text-xs">NAV</TableHead>
                    <TableHead className="text-right text-xs">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.code}</p>
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold text-foreground">
                        {formatINR(item.invested)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {item.allocation}%
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium text-foreground">
                        ₹{item.nav.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 text-sm font-semibold ${
                            item.navChange >= 0
                              ? "text-emerald-600"
                              : "text-red-500"
                          }`}
                        >
                          {item.navChange >= 0 ? (
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          ) : (
                            <ArrowDownRight
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          )}
                          {item.navChange >= 0 ? "+" : ""}
                          {item.navChange.toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Card className="overflow-hidden rounded-2xl border-border p-0 ring-0">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                  Per-NGO Allocation
                </h2>
                <p className="text-xs text-muted-foreground">
                  Breakdown across all index members
                </p>
              </div>
              <div className="divide-y divide-border">
                {heroSplits.map((split) => (
                  <div key={split.ngo.id} className="flex items-center gap-4 px-6 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {split.ngo.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {split.ngo.city}
                      </p>
                    </div>
                    <div className="w-24">
                      <Progress
                        value={split.share * 100}
                        className="h-1.5"
                        aria-label={`${split.ngo.name}: ${(split.share * 100).toFixed(1)}%`}
                      />
                    </div>
                    <span className="w-16 text-right text-xs font-semibold text-foreground">
                      {(split.share * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="overflow-hidden rounded-2xl border-border p-0 ring-0">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                  Allocation
                </h2>
              </div>
              <div className="px-4 py-6">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val) => [
                          formatINR(Number(val)),
                          "Invested",
                        ]}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(40 10% 90%)",
                          background: "white",
                          fontSize: "13px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {allocations.map((item, i) => (
                    <div
                      key={item.slug}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: COLORS[i % COLORS.length],
                          }}
                          aria-hidden="true"
                        />
                        <span className="text-foreground">{item.name}</span>
                      </span>
                      <span className="font-semibold text-foreground">
                        {item.allocation}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-border p-5 ring-0">
              <h3 className="mb-3 font-[family-name:var(--font-display)] text-sm font-semibold text-foreground">
                Projected Growth
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">6-month proj.</span>
                  <span className="font-semibold text-emerald-600">+8.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">12-month proj.</span>
                  <span className="font-semibold text-emerald-600">+15.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Impact ROI</span>
                  <span className="font-semibold text-emerald-600">3.4x</span>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
                Projections are illustrative. Actual impact varies by index
                composition and NGO outcomes.
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: number;
}) {
  return (
    <Card className="rounded-2xl border-border p-4 ring-0 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
            {value}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
          <Icon className="h-4.5 w-4.5 text-emerald-700" aria-hidden="true" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span
            className={`flex items-center gap-0.5 font-semibold ${
              trend >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            ) : (
              <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
            )}
            {trend >= 0 ? "+" : ""}
            {trend}%
          </span>
          <span className="text-muted-foreground">this month</span>
        </div>
      )}
    </Card>
  );
}
