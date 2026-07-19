"use client"

import { useMemo, useState } from "react"
import { IndianRupee, Snowflake, ThermometerSnowflake, Sparkles } from "lucide-react"
import { INTERVENTIONS, type Hotspot, type InterventionType } from "@/lib/heat-data"

export function CoolingSimulator({ spot }: { spot: Hotspot }) {
  const [coverage, setCoverage] = useState<Record<InterventionType, number>>({
    "urban-greening": 20,
    "cool-roofs": 15,
    "water-bodies": 0,
    "permeable-paving": 10,
  })

  const result = useMemo(() => {
    let reduction = 0
    let cost = 0
    for (const iv of INTERVENTIONS) {
      const pct = coverage[iv.id]
      reduction += pct * iv.coolingPerUnit
      cost += pct * iv.costPerUnit
    }
    // diminishing returns past large combined coverage
    const damp = 1 - Math.min(0.25, reduction * 0.03)
    reduction = reduction * damp
    const projected = Math.max(spot.ambient - 8, spot.temp - reduction)
    return {
      reduction,
      projected,
      cost,
      crore: cost / 100,
    }
  }, [coverage, spot])

  return (
    <div className="rounded-xl border bg-secondary/30 p-3">
      <div className="mb-3 flex items-center gap-2">
        <Snowflake className="size-4 text-accent" />
        <h4 className="text-sm font-semibold">Cooling Intervention Simulator</h4>
      </div>

      <div className="flex flex-col gap-3">
        {INTERVENTIONS.map((iv) => (
          <div key={iv.id}>
            <div className="mb-1 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium">{iv.label}</span>
                <span className="ml-1.5 text-[10px] text-muted-foreground">
                  {iv.description}
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-accent">
                {coverage[iv.id]}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={coverage[iv.id]}
              onChange={(e) =>
                setCoverage((c) => ({
                  ...c,
                  [iv.id]: Number(e.target.value),
                }))
              }
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-accent"
              style={{
                background: `linear-gradient(to right, var(--accent) ${
                  (coverage[iv.id] / 60) * 100
                }%, var(--muted) ${(coverage[iv.id] / 60) * 100}%)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-accent/30 bg-accent/10 p-3">
          <div className="flex items-center gap-1.5 text-accent">
            <ThermometerSnowflake className="size-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Predicted Δ
            </span>
          </div>
          <p className="mt-1 font-mono text-2xl font-bold text-accent">
            −{result.reduction.toFixed(1)}
            <span className="text-sm">°C</span>
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            → {result.projected.toFixed(1)}°C surface
          </p>
        </div>
        <div className="rounded-lg border bg-card/60 p-3">
          <div className="flex items-center gap-1.5 text-primary">
            <IndianRupee className="size-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Est. Cost
            </span>
          </div>
          <p className="mt-1 font-mono text-2xl font-bold">
            {result.crore.toFixed(2)}
            <span className="text-sm text-muted-foreground"> Cr</span>
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            ₹{result.cost.toFixed(0)} lakh capital
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-2">
        <Sparkles className="size-3 text-primary" />
        <span className="text-[10px] text-muted-foreground">
          {result.reduction >= 4
            ? "Aggressive plan — meets state heat-action target."
            : result.reduction >= 2
              ? "Moderate plan — measurable comfort improvement."
              : "Increase coverage to reach the −2°C resilience threshold."}
        </span>
      </div>
    </div>
  )
}
