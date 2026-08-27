"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/Container";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Pick a Cause Direction",
    body: "Instead of hunting for one NGO, choose a themed Index — like picking a fund category, not a single stock.",
  },
  {
    number: "02",
    title: "Your Money Auto-Splits",
    body: "Your donation is automatically divided across vetted NGOs working in that space.",
  },
  {
    number: "03",
    title: "Equal Distribution",
    body: "Every NGO in the index receives an exactly equal share of your donation.",
  },
  {
    number: "04",
    title: "One-Time or SIP",
    body: "Give once, or set up a small recurring monthly investment in impact.",
  },
  {
    number: "05",
    title: "Track Your Portfolio",
    body: "See exactly where your money went and how your impact is growing.",
  }
] as const;

const DONUT_DATA = [
  { name: "Pratham", value: 25, color: "#059669" },
  { name: "Teach for India", value: 25, color: "#10b981" },
  { name: "Room to Read", value: 25, color: "#34d399" },
  { name: "Akshara Foundation", value: 25, color: "#6ee7b7" },
];

const NAV_DATA = [
  { month: "Jan", nav: 100 },
  { month: "Feb", nav: 103 },
  { month: "Mar", nav: 101 },
  { month: "Apr", nav: 108 },
  { month: "May", nav: 112 },
  { month: "Jun", nav: 115 },
  { month: "Jul", nav: 119 },
  { month: "Aug", nav: 124 },
  { month: "Sep", nav: 128 },
  { month: "Oct", nav: 135 },
  { month: "Nov", nav: 140 },
  { month: "Dec", nav: 148 },
];

const NGOS = [
  { name: "Pratham", short: "PR", amount: 250 },
  { name: "Teach for India", short: "TF", amount: 250 },
  { name: "Room to Read", short: "RR", amount: 250 },
  { name: "Akshara Foundation", short: "AF", amount: 250 },
];

/* ────── Progress dots ────── */
function ProgressDots({ active }: { active: number }) {
  return (
    <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:-left-8">
      {STEPS.map((_, i) => (
        <div key={i} className="relative flex items-center">
          <div
            className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ${
              i === active
                ? "border-emerald-600 bg-emerald-600 scale-125"
                : i < active
                  ? "border-emerald-400 bg-emerald-400"
                  : "border-stone-300 bg-white"
            }`}
          />
          {i < STEPS.length - 1 && (
            <div
              className={`absolute left-1/2 top-full h-3 w-0.5 -translate-x-1/2 transition-colors duration-500 ${
                i < active ? "bg-emerald-400" : "bg-stone-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ────── Visual: Step 1 — Index Card ────── */
function IndexCardVisual({ progress }: { progress: number }) {
  const scale = 0.85 + progress * 0.15;
  const opacity = Math.min(progress * 2, 1);
  const glowOpacity = Math.max(0, (progress - 0.5) * 2);

  return (
    <div
      className="flex items-center justify-center"
      style={{ opacity, transform: `scale(${scale})` }}
    >
      <Card className="w-full max-w-xs overflow-hidden rounded-2xl border-stone-200 shadow-lg">
        <div className="border-b border-stone-100 bg-emerald-700 px-5 py-3">
          <p className="text-sm font-medium text-emerald-100">
            Education Index
          </p>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <span className="text-2xl" aria-hidden="true">
              📚
            </span>
            <Badge
              variant="secondary"
              className="text-xs"
            >
              4 NGOs
            </Badge>
          </div>
          <h4 className="mt-3 font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
            Fund learning, not logistics.
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            4 verified NGOs improving literacy and STEM access.
          </p>
          <div
            className="mt-4 rounded-xl p-3 text-center transition-all duration-500"
            style={{
              backgroundColor: glowOpacity > 0
                ? `rgba(5, 150, 105, ${0.05 + glowOpacity * 0.1})`
                : "rgb(245 245 244)",
            }}
          >
            <p className="text-xs text-muted-foreground">
              {glowOpacity > 0.5
                ? "✓ Selected — diversifying across 4 NGOs"
                : "Tap to select this index"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ────── Visual: Step 2 — Money split streams ────── */
function MoneyFlowVisual({ progress }: { progress: number }) {
  const mainAmountOpacity = progress < 0.3 ? 1 : Math.max(0, 1 - (progress - 0.3) * 3);
  const streamsOpacity = progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) * 3);
  const amount = Math.round(1000 - progress * 650);
  const ngoAmounts = NGOS.map((n) => Math.round(n.amount * Math.min(1, streamsOpacity)));

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="rounded-2xl bg-emerald-700 px-8 py-4 text-2xl font-bold text-white shadow-lg"
        style={{ opacity: mainAmountOpacity, scale: 0.9 + mainAmountOpacity * 0.1 }}
      >
        ₹{amount.toLocaleString("en-IN")}
      </motion.div>

      <div className="flex gap-1 text-emerald-400">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-8 w-0.5 rounded-full"
            style={{
              opacity: streamsOpacity,
              scaleY: streamsOpacity,
              backgroundColor: `hsl(160 ${60 + i * 5}% ${50 - i * 3}%)`,
            }}
          />
        ))}
      </div>

      <div
        className="grid grid-cols-2 gap-3"
        style={{ opacity: streamsOpacity }}
      >
        {NGOS.map((ngo, i) => (
          <div
            key={ngo.name}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-sm"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{
                backgroundColor: DONUT_DATA[i].color,
                opacity: streamsOpacity,
              }}
            >
              {ngo.short}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{ngo.name}</p>
              <p className="text-xs text-emerald-600 font-semibold">
                ₹{ngoAmounts[i]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────── Visual: Step 3 — Donut chart (equal split) ────── */
function DonutVisual({ progress }: { progress: number }) {
  const animData = useMemo(
    () =>
      DONUT_DATA.map((d) => ({
        ...d,
        value: Math.round(d.value * Math.min(1, progress * 1.5)),
      })),
    [progress],
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-56 w-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={animData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
              animationDuration={0}
            >
              {animData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {Math.round(progress * 100)}%
          </span>
          <span className="text-xs text-muted-foreground">divided equally</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {DONUT_DATA.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────── Visual: Step 4 — Toggle (One-time / SIP) ────── */
function ToggleVisual({ progress }: { progress: number }) {
  const isSip = progress > 0.5;
  const toggleX = isSip ? 100 : 0;
  const cumulative = Math.round(isSip ? 1000 * 12 * 0.92 : 1000);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <p className="mb-3 text-center text-xs text-muted-foreground">
          Donation frequency
        </p>
        <div className="relative flex h-10 w-56 rounded-xl bg-stone-100 p-1">
          <motion.div
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-emerald-600 shadow-sm"
            animate={{ x: toggleX }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <span
            className={`relative z-10 flex w-1/2 items-center justify-center text-sm font-medium transition-colors ${
              !isSip ? "text-white" : "text-muted-foreground"
            }`}
          >
            One-time
          </span>
          <span
            className={`relative z-10 flex w-1/2 items-center justify-center text-sm font-medium transition-colors ${
              isSip ? "text-white" : "text-muted-foreground"
            }`}
          >
            Monthly SIP
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isSip ? "sip" : "once"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            {isSip ? "12 months cumulative impact" : "Single donation"}
          </p>
          <p className="mt-1 text-3xl font-bold text-emerald-700">
            ₹{cumulative.toLocaleString("en-IN")}
          </p>
          {isSip && (
            <p className="mt-1 text-xs text-emerald-600">
              ↗ Includes compounding trust bonuses
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ────── Visual: Step 5 — NAV line chart ────── */
function NavChartVisual({ progress }: { progress: number }) {
  const visibleCount = Math.max(1, Math.round(progress * NAV_DATA.length));
  const visibleData = NAV_DATA.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            Impact NAV — Education Index
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="h-3 w-3" />
            +{visibleData.length > 1 ? ((visibleData[visibleData.length - 1].nav - 100)).toFixed(0) : "0"}%
          </div>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visibleData}>
              <defs>
                <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e5e5",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                }}
                formatter={(v) => [`NAV ${v}`, "Value"]}
              />
              <Area
                type="monotone"
                dataKey="nav"
                stroke="#059669"
                strokeWidth={2}
                fill="url(#navGradient)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Jan</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}

/* ────── Stage visuals switcher ────── */
function StageVisual({ stage, progress }: { stage: number; progress: number }) {
  switch (stage) {
    case 0:
      return <IndexCardVisual progress={progress} />;
    case 1:
      return <MoneyFlowVisual progress={progress} />;
    case 2:
      return <DonutVisual progress={progress} />;
    case 3:
      return <ToggleVisual progress={progress} />;
    case 4:
      return <NavChartVisual progress={progress} />;
    default:
      return null;
  }
}

/* ────── Main scrollytelling section ────── */
export function HowItWorksScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepIndex = Math.min(4, Math.floor(latest * 5));
    const stepLocal = (latest * 5) - stepIndex;
    setActiveStep(stepIndex);
    setStepProgress(Math.min(1, Math.max(0, stepLocal)));
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="scroll-how-heading"
      className="relative bg-background scroll-mt-20"
      style={{ height: "500vh" }}
    >
      <Container className="relative h-full">
        <ProgressDots active={activeStep} />

        {/* Sticky visual + text panel */}
        <div className="sticky top-0 z-10 flex h-screen items-center">
          <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12 pl-8 xl:pl-16">
            {/* Left: animated text step */}
            <div className="hidden lg:flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                    Step {STEPS[activeStep].number}
                  </span>
                  <h2
                    id="scroll-how-heading"
                    className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl"
                  >
                    {STEPS[activeStep].title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {STEPS[activeStep].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: visual */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full max-w-sm"
                >
                  <StageVisual stage={activeStep} progress={stepProgress} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scroll-spacer blocks — one per step to create scroll distance */}
        <div className="pointer-events-none absolute inset-0 flex flex-col">
          {STEPS.map((_, i) => (
            <div key={i} className="h-[100vh] w-full" />
          ))}
        </div>
      </Container>

      {/* Mobile: step cards below sticky visual */}
      <div className="lg:hidden px-4 pb-20">
        <div className="mx-auto max-w-sm space-y-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                i === activeStep
                  ? "border-emerald-200 bg-emerald-50/50 shadow-sm"
                  : "border-stone-100 bg-white"
              }`}
            >
              <span className="mb-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                {step.number}
              </span>
              <h4 className="text-sm font-semibold text-foreground">
                {step.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
