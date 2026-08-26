"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stateData, hotStates, formatDonationCompact } from "@/data/stateData";
import { indexes } from "@/data/indexes";
import { IndexCard } from "@/components/sections/IndexesSection";
import { formatINR } from "@/lib/format";

const GEO_URL = "/india_states.geo.json";

const nameOverrides: Record<string, string> = {
  Orissa: "Odisha",
  Uttaranchal: "Uttarakhand",
};

const hotStateCoords: Record<string, [number, number]> = {
  "Tamil Nadu": [78.5, 10.5],
  Maharashtra: [75.5, 19.5],
  Karnataka: [76.5, 15],
  Delhi: [77.2, 28.6],
};

const ALL_STATES_LIST = Object.keys(stateData);

export function IndiaMapSection() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const resolvedName = useCallback((geoName: string) => {
    return nameOverrides[geoName] || geoName;
  }, []);

  const filteredNgos = useMemo(() => {
    if (!selectedState) return [];
    const sData = stateData[selectedState];
    if (!sData) return [];
    const relevantSlugs =
      sData.topIndex === "Education"
        ? ["education"]
        : sData.topIndex === "Health"
          ? ["health"]
          : ["disaster-relief"];
    const matchedIndexes = indexes.filter((i) =>
      relevantSlugs.includes(i.slug),
    );
    return matchedIndexes;
  }, [selectedState]);

  const handleGeographyEnter = useCallback(
    (geo: { properties: { NAME_1: string } }, e: React.MouseEvent) => {
      const name = resolvedName(geo.properties.NAME_1);
      setHoveredState(name);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    },
    [resolvedName],
  );

  const handleGeographyLeave = useCallback(() => {
    setHoveredState(null);
  }, []);

  const handleGeographyClick = useCallback(
    (geo: { properties: { NAME_1: string } }) => {
      const name = resolvedName(geo.properties.NAME_1);
      setSelectedState((prev) => (prev === name ? null : name));
    },
    [resolvedName],
  );

  const hoveredData = hoveredState ? stateData[hoveredState] : null;

  function getIntensity(stateName: string): number {
    return stateData[stateName]?.intensity ?? 0;
  }

  function getStateFill(stateName: string): string {
    const intensity = getIntensity(stateName);
    if (intensity === 0) return "hsl(40 20% 92%)";
    const lightness = 92 - intensity * 42;
    return `hsl(160 70% ${lightness}%)`;
  }

  function getStateStroke(stateName: string): string {
    if (selectedState === stateName) return "hsl(160 84% 26%)";
    return "hsl(40 10% 85%)";
  }

  return (
    <section
      aria-labelledby="india-map-heading"
      id="india-map"
      className="bg-background py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Impact Across India"
          title="Where your money goes"
          description="Interactive map showing NGO activity and donation distribution across Indian states."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Map */}
          <div className="relative">
            {/* Hot state shortcuts */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Quick access:
              </span>
              {hotStates.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setSelectedState((prev) => (prev === s ? null : s))
                  }
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedState === s
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "border-stone-200 text-muted-foreground hover:border-stone-300 hover:text-foreground"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {s}
                </button>
              ))}
            </div>

            <Card className="overflow-hidden rounded-2xl border-border p-2 ring-0 sm:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-50/50">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 1100,
                    center: [82.5, 22],
                  }}
                  className="h-full w-full"
                >
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const stateName = resolvedName(
                          geo.properties.NAME_1,
                        );
                        const isSelected = selectedState === stateName;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={(e) =>
                              handleGeographyEnter(
                                geo as unknown as {
                                  properties: { NAME_1: string };
                                },
                                e as unknown as React.MouseEvent,
                              )
                            }
                            onMouseLeave={handleGeographyLeave}
                            onClick={() =>
                              handleGeographyClick(
                                geo as unknown as {
                                  properties: { NAME_1: string };
                                },
                              )
                            }
                            className="cursor-pointer outline-none"
                            style={{
                              default: {
                                fill: getStateFill(stateName),
                                stroke: getStateStroke(stateName),
                                strokeWidth: isSelected ? 2 : 0.75,
                                transition:
                                  "fill 0.2s, stroke 0.2s, stroke-width 0.2s",
                              },
                              hover: {
                                fill: getStateFill(stateName),
                                stroke: "hsl(160 84% 26%)",
                                strokeWidth: 2,
                              },
                              pressed: {
                                fill: getStateFill(stateName),
                                stroke: "hsl(160 84% 26%)",
                                strokeWidth: 2,
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {/* Hot state markers */}
                  {hotStates.map((s) => {
                    const coords = hotStateCoords[s];
                    if (!coords) return null;
                    return (
                      <Marker key={s} coordinates={coords}>
                        <circle
                          r={selectedState === s ? 6 : 4}
                          fill={
                            selectedState === s
                              ? "hsl(160 84% 26%)"
                              : "hsl(160 70% 40%)"
                          }
                          stroke="white"
                          strokeWidth={2}
                          className="cursor-pointer"
                          onClick={() =>
                            setSelectedState((prev) =>
                              prev === s ? null : s,
                            )
                          }
                        />
                        {selectedState !== s && (
                          <circle
                            r={8}
                            fill="none"
                            stroke="hsl(160 70% 40%)"
                            strokeWidth={1}
                            opacity={0.4}
                            className="animate-ping"
                          />
                        )}
                      </Marker>
                    );
                  })}
                </ComposableMap>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredState && hoveredData && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.12 }}
                      className="pointer-events-none absolute z-20 rounded-xl border border-border bg-white p-3 shadow-lg"
                      style={{
                        left: Math.min(
                          tooltipPos.x +
                            12 -
                            (typeof window !== "undefined"
                              ? document
                                  .querySelector("#india-map")
                                  ?.getBoundingClientRect().left ?? 0
                              : 0),
                          500,
                        ),
                        top: tooltipPos.y -
                          (typeof window !== "undefined"
                            ? document
                                .querySelector("#india-map")
                                ?.getBoundingClientRect().top ?? 0
                            : 0) +
                          12,
                      }}
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {hoveredData.state}
                      </p>
                      <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                        <p>
                          {hoveredData.ngoCount} NGOs ·{" "}
                          {formatDonationCompact(hoveredData.totalDonated)}{" "}
                          invested
                        </p>
                        <p>
                          Top index:{" "}
                          <span className="font-medium text-emerald-700">
                            {hoveredData.topIndex}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span>Low impact</span>
              <div className="flex gap-0.5">
                {[0.1, 0.3, 0.5, 0.7, 1.0].map((v) => (
                  <div
                    key={v}
                    className="h-3 w-6 first:rounded-l-sm last:rounded-r-sm"
                    style={{
                      backgroundColor: `hsl(160 70% ${92 - v * 42}%)`,
                    }}
                  />
                ))}
              </div>
              <span>High impact</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-white p-4 ring-0">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  {selectedState
                    ? `${selectedState} — Indices`
                    : "Select a state"}
                </h3>
                {selectedState && (
                  <Button
                    onClick={() => setSelectedState(null)}
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 rounded-lg text-xs"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    PAN India
                  </Button>
                )}
              </div>

              {selectedState ? (
                <div className="space-y-3">
                  {stateData[selectedState] && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-stone-50 p-3 text-center">
                        <p className="text-lg font-bold text-foreground">
                          {stateData[selectedState].ngoCount}
                        </p>
                        <p className="text-xs text-muted-foreground">NGOs</p>
                      </div>
                      <div className="rounded-lg bg-stone-50 p-3 text-center">
                        <p className="text-lg font-bold text-foreground">
                          {formatDonationCompact(
                            stateData[selectedState].totalDonated,
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Donated
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Showing indices with activity in this state:
                  </p>
                  {filteredNgos.length > 0 ? (
                    filteredNgos.map((idx) => (
                      <IndexCard key={idx.slug} index={idx} />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No index activity mapped for this state yet.
                    </p>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-stone-300" aria-hidden="true" />
                  Click a state on the map or a quick-access tag above to
                  filter indices by region.
                </div>
              )}
            </div>

            {/* Mobile dropdown */}
            <div className="lg:hidden">
              <label
                htmlFor="state-select"
                className="mb-2 block text-xs font-medium text-muted-foreground"
              >
                Or select from dropdown
              </label>
              <div className="relative">
                <select
                  id="state-select"
                  value={selectedState ?? ""}
                  onChange={(e) =>
                    setSelectedState(e.target.value || null)
                  }
                  className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 pr-10 text-sm font-medium text-foreground ring-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All states (PAN India)</option>
                  {ALL_STATES_LIST.sort().map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Summary stats */}
            <div className="rounded-2xl border border-border bg-white p-4 ring-0">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                National Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    States with activity
                  </span>
                  <span className="font-semibold text-foreground">
                    {Object.keys(stateData).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Total NGOs mapped
                  </span>
                  <span className="font-semibold text-foreground">
                    {Object.values(stateData).reduce(
                      (s, d) => s + d.ngoCount,
                      0,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Total donated (all states)
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatINR(
                      Object.values(stateData).reduce(
                        (s, d) => s + d.totalDonated,
                        0,
                      ),
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
