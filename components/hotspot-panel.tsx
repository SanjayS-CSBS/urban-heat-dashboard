"use client"

import {
  Users,
  Home,
  Trees,
  Building2,
  Thermometer,
  ShieldAlert,
  Lightbulb,
  ChevronRight,
  MapPin,
} from "lucide-react"
import type { Hotspot } from "@/lib/heat-data"
import { CoolingSimulator } from "./cooling-simulator"

function driverColor(value: number) {
  if (value >= 85) return "var(--heat-extreme)"
  if (value >= 70) return "var(--heat-hot)"
  if (value >= 55) return "var(--heat-warm)"
  return "var(--heat-mild)"
}

function vulnTone(score: number) {
  if (score >= 80) return { label: "Critical", color: "var(--heat-extreme)" }
  if (score >= 65) return { label: "High", color: "var(--heat-hot)" }
  if (score >= 50) return { label: "Moderate", color: "var(--heat-warm)" }
  return { label: "Low", color: "var(--heat-mild)" }
}

function VulnerabilityGauge({ score }: { score: number }) {
  const tone = vulnTone(score)
  const r = 42
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <div className="relative grid size-28 place-items-center">
      <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={tone.color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-mono text-3xl font-bold leading-none"
          style={{ color: tone.color }}
        >
          {score}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: tone.color }}
        >
          {tone.label}
        </span>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Users
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-lg border bg-secondary/30 p-2.5">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-1 font-mono text-base font-semibold">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function HotspotPanel({ spot }: { spot: Hotspot }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
          <MapPin className="size-3" />
          {spot.zone}
        </div>
        <h2 className="mt-1 text-balance text-lg font-semibold leading-tight">
          {spot.name}
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-baseline gap-1">
            <Thermometer className="size-4 self-center text-heat-hot" />
            <span className="font-mono text-2xl font-bold text-heat-hot">
              {spot.temp.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">°C LST</span>
          </div>
          <div className="flex items-baseline gap-1 border-l pl-4">
            <span className="font-mono text-xl font-semibold">
              {spot.ambient.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">°C air</span>
          </div>
        </div>
      </div>

      {/* Vulnerability + density */}
      <section className="border-b p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <ShieldAlert className="size-4 text-heat-hot" />
          <h3 className="text-sm font-semibold">Heat Vulnerability</h3>
        </div>
        <div className="flex items-center gap-4">
          <VulnerabilityGauge score={spot.vulnerability} />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <StatCard
              icon={Users}
              label="Pop. Density"
              value={`${(spot.population / 1000).toFixed(1)}k`}
              sub="per km²"
            />
            <StatCard
              icon={Home}
              label="Households"
              value={spot.households.toLocaleString("en-IN")}
              sub="exposed"
            />
            <StatCard
              icon={Trees}
              label="Green Cover"
              value={`${spot.greenCover}%`}
              sub="canopy"
            />
            <StatCard
              icon={Building2}
              label="Built-up"
              value={`${spot.builtUp}%`}
              sub="impervious"
            />
          </div>
        </div>
      </section>

      {/* Thermal drivers */}
      <section className="border-b p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <Thermometer className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">Thermal Driver Analysis</h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {spot.drivers.map((d) => (
            <div key={d.label}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{d.label}</span>
                <span className="font-mono text-xs font-semibold">{d.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${d.value}%`,
                    background: driverColor(d.value),
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mitigation recommendations */}
      <section className="border-b p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <Lightbulb className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">Mitigation Recommendations</h3>
        </div>
        <div className="flex flex-col gap-2">
          {spot.mitigations.map((m) => (
            <div
              key={m.title}
              className="group flex items-start gap-2 rounded-lg border bg-secondary/30 p-2.5"
            >
              <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-accent" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium leading-snug">
                    {m.title}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                      m.impact === "High"
                        ? "bg-heat-hot/15 text-heat-hot"
                        : m.impact === "Medium"
                          ? "bg-heat-warm/15 text-heat-warm"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m.impact}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {m.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cooling simulator */}
      <section className="p-4">
        <CoolingSimulator spot={spot} />
      </section>
    </div>
  )
}
