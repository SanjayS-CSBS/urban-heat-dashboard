"use client"

import { Flame, Layers, Mountain, Satellite } from "lucide-react"
import type { BaseLayer } from "./map/heat-map"

const LAYERS: { id: BaseLayer; label: string; icon: typeof Flame }[] = [
  { id: "heat", label: "Heat", icon: Flame },
  { id: "satellite", label: "Satellite", icon: Satellite },
  { id: "terrain", label: "Terrain", icon: Mountain },
]

export function LayerControls({
  baseLayer,
  onLayerChange,
  showHeat,
  onToggleHeat,
}: {
  baseLayer: BaseLayer
  onLayerChange: (l: BaseLayer) => void
  showHeat: boolean
  onToggleHeat: (v: boolean) => void
}) {
  return (
    <div className="glass-strong pointer-events-auto absolute left-4 top-4 z-[1000] w-52 rounded-xl p-2.5 shadow-2xl">
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <Layers className="size-3.5 text-muted-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Base Layer
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {LAYERS.map((layer) => {
          const Icon = layer.icon
          const active = baseLayer === layer.id
          return (
            <button
              key={layer.id}
              onClick={() => onLayerChange(layer.id)}
              className={`flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-center transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span className="text-[10px] font-medium">{layer.label}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onToggleHeat(!showHeat)}
        className="mt-2 flex w-full items-center justify-between rounded-lg bg-secondary/60 px-2.5 py-2 transition-colors hover:bg-secondary"
      >
        <span className="flex items-center gap-1.5">
          <Flame
            className={`size-3.5 ${showHeat ? "text-heat-hot" : "text-muted-foreground"}`}
          />
          <span className="text-xs">Thermal Overlay</span>
        </span>
        <span
          className={`relative h-4 w-7 rounded-full transition-colors ${
            showHeat ? "bg-heat-hot" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 size-3 rounded-full bg-background transition-all ${
              showHeat ? "left-3.5" : "left-0.5"
            }`}
          />
        </span>
      </button>
    </div>
  )
}

export function MapLegend() {
  const stops = [
    { c: "oklch(0.78 0.13 205)", t: "<42" },
    { c: "oklch(0.84 0.16 90)", t: "43" },
    { c: "oklch(0.78 0.16 60)", t: "45" },
    { c: "oklch(0.7 0.2 35)", t: "47" },
    { c: "oklch(0.62 0.23 27)", t: "48+" },
  ]
  return (
    <div className="glass-strong pointer-events-auto absolute bottom-6 left-4 z-[1000] rounded-xl p-3 shadow-2xl">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Land Surface Temp (°C)
      </span>
      <div className="flex items-end gap-1">
        {stops.map((s) => (
          <div key={s.t} className="flex flex-col items-center gap-1">
            <span
              className="h-3 w-7 rounded-sm"
              style={{ background: s.c }}
            />
            <span className="font-mono text-[9px] text-muted-foreground">
              {s.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
