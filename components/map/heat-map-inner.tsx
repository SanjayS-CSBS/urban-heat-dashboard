"use client"

import { useEffect, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import { CHENNAI_CENTER, HOTSPOTS, type Hotspot } from "@/lib/heat-data"

export type BaseLayer = "heat" | "satellite" | "terrain"

const TILE_CONFIG: Record<
  BaseLayer,
  { url: string; attribution: string; dark: boolean }
> = {
  heat: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    dark: false,
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics",
    dark: false,
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenTopoMap (CC-BY-SA)",
    dark: true,
  },
}

function tempColor(temp: number) {
  if (temp >= 48) return "oklch(0.62 0.23 27)" // extreme red
  if (temp >= 46) return "oklch(0.7 0.2 35)" // hot
  if (temp >= 44) return "oklch(0.78 0.16 60)" // warm
  if (temp >= 42) return "oklch(0.84 0.16 90)" // mild
  return "oklch(0.78 0.13 205)" // cool
}

function makeIcon(spot: Hotspot, active: boolean) {
  const color = tempColor(spot.temp)
  const size = active ? 50 : 42
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        <span class="pulse-ring" style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:.35;"></span>
        <div class="heat-marker" style="position:absolute;inset:0;background:${color};color:${color};font-size:${active ? 13 : 11}px;${
          active ? "outline:2px solid var(--foreground);" : ""
        }">
          <span style="color:oklch(0.17 0.02 256)">${spot.temp.toFixed(0)}°</span>
        </div>
      </div>`,
  })
}

function MapController({ focus }: { focus: Hotspot | null }) {
  const map = useMap()
  const firstFocus = useRef(true)

  // Keep the container size in sync. Use invalidateSize only — no setView here,
  // so it never fights an in-flight pan animation (which caused partial tiles).
  useEffect(() => {
    const fix = () => map.invalidateSize({ animate: false })
    const timers = [0, 120, 350, 700, 1400].map((ms) => setTimeout(fix, ms))
    const ro = new ResizeObserver(fix)
    ro.observe(map.getContainer())
    window.addEventListener("resize", fix)
    return () => {
      timers.forEach(clearTimeout)
      ro.disconnect()
      window.removeEventListener("resize", fix)
    }
  }, [map])

  // Move to the selected hotspot. The first selection (initial load) jumps
  // instantly; later user selections animate smoothly.
  useEffect(() => {
    if (!focus) return
    const animate = !firstFocus.current
    firstFocus.current = false
    const t = setTimeout(() => {
      map.setView([focus.lat, focus.lng], 13, {
        animate,
        duration: animate ? 1.1 : 0,
      })
    }, 60)
    return () => clearTimeout(t)
  }, [focus, map])

  return null
}

export default function HeatMapInner({
  baseLayer,
  showHeat,
  selectedId,
  onSelect,
}: {
  baseLayer: BaseLayer
  showHeat: boolean
  selectedId: string | null
  onSelect: (spot: Hotspot) => void
}) {
  const tiles = TILE_CONFIG[baseLayer]
  const focus = HOTSPOTS.find((h) => h.id === selectedId) ?? null

  return (
    <MapContainer
      center={CHENNAI_CENTER}
      zoom={12}
      zoomControl={true}
      className={`h-full w-full ${tiles.dark ? "map-dark" : ""}`}
      style={{ background: "oklch(0.17 0.02 256)" }}
    >
      <TileLayer
        key={baseLayer}
        url={tiles.url}
        attribution={tiles.attribution}
        maxZoom={19}
      />

      {showHeat &&
        HOTSPOTS.map((spot) => {
          const color = tempColor(spot.temp)
          return (
            <Circle
              key={`heat-${spot.id}`}
              center={[spot.lat, spot.lng]}
              radius={1400 + (spot.temp - 43) * 320}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: baseLayer === "heat" ? 0.32 : 0.22,
                weight: 0,
              }}
            />
          )
        })}

      {HOTSPOTS.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={makeIcon(spot, spot.id === selectedId)}
          eventHandlers={{ click: () => onSelect(spot) }}
        />
      ))}

      <MapController focus={focus} />
    </MapContainer>
  )
}
