"use client";

import { useEffect, useRef } from "react";
import { tickerData } from "@/data/portfolio";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function TickerStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    let pos = 0;
    const speed = 0.5;

    function tick() {
      pos -= speed;
      if (Math.abs(pos) >= track!.scrollWidth / 2) pos = 0;
      track!.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const items = [...tickerData, ...tickerData];

  return (
    <div className="relative overflow-hidden border-b border-border bg-foreground/[0.02] py-2">
      <div
        ref={trackRef}
        className="flex w-max gap-6"
        aria-label="Index ticker"
      >
        {items.map((item, i) => {
          const positive = item.change >= 0;
          return (
            <span
              key={`${item.code}-${i}`}
              className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium tabular-nums"
            >
              <span className="font-mono font-bold text-foreground/70">
                {item.code}
              </span>
              <span className="text-muted-foreground">{item.name}</span>
              <span
                className={`flex items-center gap-0.5 font-semibold ${
                  positive ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {positive ? (
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                )}
                {positive ? "+" : ""}
                {item.change.toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
