"use client"

import { Activity, Satellite, ThermometerSun } from "lucide-react"
import { CITY_STATS } from "@/lib/heat-data"

function MetricChip({
  label,
  value,
  unit,
  tone = "default",
}: {
  label: string
  value: string
  unit?: string
  tone?: "default" | "hot" | "cool"
}) {
  const toneClass =
    tone === "hot"
      ? "text-heat-hot"
      : tone === "cool"
        ? "text-accent"
        : "text-foreground"
  return (
    <div className="flex flex-col gap-0.5 px-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className={`font-mono text-sm font-semibold ${toneClass}`}>
        {value}
        {unit && (
          <span className="ml-0.5 text-xs text-muted-foreground">{unit}</span>
        )}
      </span>
    </div>
  )
}

export function TopBar() {
  return (
    <header className="glass-strong z-30 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <div className="relative grid size-10 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
          <ThermometerSun className="size-5 text-primary" />
          <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
            <span className="pulse-ring absolute inline-flex size-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
        </div>
        <div>
          <h1 className="text-balance text-sm font-semibold leading-tight md:text-base">
            URBAN HEAT · Decision Support System
          </h1>
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Satellite className="size-3 text-accent" />
            Chennai Metropolitan Region · LST v4.2
          </p>
        </div>
      </div>

      <div className="hidden items-center divide-x divide-border lg:flex">
        <MetricChip
          label="Avg LST"
          value={CITY_STATS.avgSurfaceTemp.toFixed(1)}
          unit="°C"
          tone="hot"
        />
        <MetricChip
          label="Air Temp"
          value={CITY_STATS.avgAmbientTemp.toFixed(1)}
          unit="°C"
        />
        <MetricChip
          label="Peak ΔT"
          value={`+${CITY_STATS.hottestDelta.toFixed(1)}`}
          unit="°C"
          tone="hot"
        />
        <MetricChip
          label="Pop. at Risk"
          value={CITY_STATS.populationAtRisk.toFixed(2)}
          unit="M"
        />
        <MetricChip
          label="Zones"
          value={String(CITY_STATS.monitoredZones)}
          tone="cool"
        />
      </div>

      <div className="flex items-center gap-2 rounded-full border border-heat-extreme/30 bg-heat-extreme/10 px-3 py-1.5">
        <Activity className="size-3.5 text-heat-extreme" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-heat-extreme">
          {CITY_STATS.criticalHotspots} Critical Hotspots
        </span>
      </div>
    </header>
  )
}
