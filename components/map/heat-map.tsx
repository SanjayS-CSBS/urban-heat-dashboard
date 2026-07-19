"use client"

import dynamic from "next/dynamic"
import type { Hotspot } from "@/lib/heat-data"
import type { BaseLayer } from "./heat-map-inner"

const HeatMapInner = dynamic(() => import("./heat-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="font-mono text-xs tracking-wider">
          INITIALIZING THERMAL GRID…
        </span>
      </div>
    </div>
  ),
})

export type { BaseLayer }

export function HeatMap(props: {
  baseLayer: BaseLayer
  showHeat: boolean
  selectedId: string | null
  onSelect: (spot: Hotspot) => void
}) {
  return <HeatMapInner {...props} />
}
