"use client"

import { useState } from "react"
import { Flame } from "lucide-react"
import { HeatMap, type BaseLayer } from "@/components/map/heat-map"
import { LayerControls, MapLegend } from "@/components/layer-controls"
import { TopBar } from "@/components/top-bar"
import { HotspotPanel } from "@/components/hotspot-panel"
import { HOTSPOTS, type Hotspot } from "@/lib/heat-data"

export default function Page() {
  const [baseLayer, setBaseLayer] = useState<BaseLayer>("heat")
  const [showHeat, setShowHeat] = useState(true)
  const [selectedId, setSelectedId] = useState<string>(HOTSPOTS[0].id)

  const selected = HOTSPOTS.find((h) => h.id === selectedId) ?? HOTSPOTS[0]
  const ranked = [...HOTSPOTS].sort((a, b) => b.temp - a.temp)

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <TopBar />

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Map region */}
        <div className="relative min-h-[44vh] min-w-0 flex-1 lg:min-h-0">
          <HeatMap
            baseLayer={baseLayer}
            showHeat={showHeat}
            selectedId={selectedId}
            onSelect={(s: Hotspot) => setSelectedId(s.id)}
          />
          <LayerControls
            baseLayer={baseLayer}
            onLayerChange={setBaseLayer}
            showHeat={showHeat}
            onToggleHeat={setShowHeat}
          />
          <MapLegend />

          {/* Hotspot rank rail */}
          <div className="glass-strong pointer-events-auto absolute right-4 top-4 z-[1000] hidden w-56 rounded-xl p-2.5 shadow-2xl xl:block">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <Flame className="size-3.5 text-heat-hot" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Hottest Zones
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {ranked.map((spot, i) => {
                const active = spot.id === selectedId
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedId(spot.id)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                      active ? "bg-secondary" : "hover:bg-secondary/50"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate text-xs">
                      {spot.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="font-mono text-xs font-semibold text-heat-hot">
                      {spot.temp.toFixed(0)}°
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Analysis panel */}
        <aside className="glass-strong z-20 w-full shrink-0 border-t lg:w-[400px] lg:border-l lg:border-t-0">
          <HotspotPanel spot={selected} />
        </aside>
      </div>
    </main>
  )
}
