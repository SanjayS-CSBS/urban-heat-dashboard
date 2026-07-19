export type ThermalDriver = {
  label: string
  value: number // 0-100 contribution
}

export type Mitigation = {
  title: string
  detail: string
  impact: "High" | "Medium" | "Low"
}

export type Hotspot = {
  id: string
  name: string
  zone: string
  lat: number
  lng: number
  temp: number // land surface temp °C
  ambient: number // air temp °C
  vulnerability: number // 0-100
  population: number // density per km²
  households: number
  greenCover: number // %
  builtUp: number // %
  drivers: ThermalDriver[]
  mitigations: Mitigation[]
}

// Chennai is centered roughly at 13.0827° N, 80.2707° E
export const CHENNAI_CENTER: [number, number] = [13.06, 80.23]

export const HOTSPOTS: Hotspot[] = [
  {
    id: "kor",
    name: "Koyambedu Market Complex",
    zone: "Zone 9 · Anna Nagar",
    lat: 13.0694,
    lng: 80.1948,
    temp: 47.8,
    ambient: 41.2,
    vulnerability: 88,
    population: 28400,
    households: 6120,
    greenCover: 4,
    builtUp: 91,
    drivers: [
      { label: "Impervious Surface", value: 92 },
      { label: "Low Vegetation", value: 84 },
      { label: "Waste Heat (Market)", value: 71 },
      { label: "Traffic Density", value: 66 },
      { label: "Building Albedo", value: 58 },
    ],
    mitigations: [
      { title: "Cool roof retrofit on market sheds", detail: "Reflective coating across 42,000 m² of roofing", impact: "High" },
      { title: "Avenue tree corridor on inner roads", detail: "Plant 1,200 native shade trees along circulation", impact: "High" },
      { title: "Permeable paving in parking zones", detail: "Replace 18,000 m² asphalt with permeable pavers", impact: "Medium" },
    ],
  },
  {
    id: "tnagar",
    name: "T. Nagar Commercial District",
    zone: "Zone 10 · Teynampet",
    lat: 13.0418,
    lng: 80.2341,
    temp: 46.3,
    ambient: 40.1,
    vulnerability: 82,
    population: 41200,
    households: 9840,
    greenCover: 6,
    builtUp: 88,
    drivers: [
      { label: "Built-up Density", value: 89 },
      { label: "Low Vegetation", value: 80 },
      { label: "Anthropogenic Heat", value: 74 },
      { label: "Traffic Density", value: 70 },
      { label: "Building Albedo", value: 61 },
    ],
    mitigations: [
      { title: "Pedestrian shade canopies", detail: "Tensile shade structures over Ranganathan St.", impact: "High" },
      { title: "Vertical greening on facades", detail: "Living walls on 30 commercial frontages", impact: "Medium" },
      { title: "Misting cool zones at transit stops", detail: "12 evaporative cooling shelters", impact: "Medium" },
    ],
  },
  {
    id: "ennore",
    name: "Ennore Industrial Belt",
    zone: "Zone 1 · Thiruvottiyur",
    lat: 13.2186,
    lng: 80.3219,
    temp: 49.1,
    ambient: 42.0,
    vulnerability: 79,
    population: 12800,
    households: 3010,
    greenCover: 3,
    builtUp: 76,
    drivers: [
      { label: "Industrial Waste Heat", value: 95 },
      { label: "Impervious Surface", value: 82 },
      { label: "Low Vegetation", value: 78 },
      { label: "Bare Soil / Dust", value: 64 },
      { label: "Building Albedo", value: 49 },
    ],
    mitigations: [
      { title: "Green buffer belt around plants", detail: "300 m wide vegetated buffer, 8,000 trees", impact: "High" },
      { title: "Waste-heat recovery mandate", detail: "Capture flue heat across 6 facilities", impact: "High" },
      { title: "Dust suppression & ground cover", detail: "Stabilize 40 ha of exposed soil", impact: "Low" },
    ],
  },
  {
    id: "marina",
    name: "Marina Beach Hinterland",
    zone: "Zone 13 · Triplicane",
    lat: 13.0524,
    lng: 80.2818,
    temp: 43.6,
    ambient: 38.4,
    vulnerability: 64,
    population: 33600,
    households: 7720,
    greenCover: 11,
    builtUp: 72,
    drivers: [
      { label: "Built-up Density", value: 76 },
      { label: "Impervious Surface", value: 70 },
      { label: "Low Vegetation", value: 62 },
      { label: "Sea-breeze Blocking", value: 55 },
      { label: "Traffic Density", value: 48 },
    ],
    mitigations: [
      { title: "Sea-breeze ventilation corridors", detail: "Preserve low-rise wind paths from coast", impact: "High" },
      { title: "Shaded promenade greening", detail: "Native palms + groundcover along service road", impact: "Medium" },
      { title: "Cool pavement pilot", detail: "Light-reflective coating on 9,000 m²", impact: "Low" },
    ],
  },
  {
    id: "guindy",
    name: "Guindy Industrial Estate",
    zone: "Zone 13 · Guindy",
    lat: 13.0067,
    lng: 80.2206,
    temp: 45.2,
    ambient: 39.6,
    vulnerability: 71,
    population: 18900,
    households: 4350,
    greenCover: 14,
    builtUp: 79,
    drivers: [
      { label: "Industrial Waste Heat", value: 81 },
      { label: "Impervious Surface", value: 77 },
      { label: "Traffic Density", value: 69 },
      { label: "Low Vegetation", value: 60 },
      { label: "Building Albedo", value: 52 },
    ],
    mitigations: [
      { title: "Link to Guindy National Park canopy", detail: "Green spine connecting reserve to estate", impact: "High" },
      { title: "Rooftop solar + cool roof combo", detail: "Dual-benefit retrofit on 25 factory roofs", impact: "Medium" },
      { title: "Bioswales along arterial roads", detail: "Vegetated drainage on 3.2 km of roads", impact: "Medium" },
    ],
  },
  {
    id: "perambur",
    name: "Perambur Rail Quarter",
    zone: "Zone 6 · Perambur",
    lat: 13.1143,
    lng: 80.2329,
    temp: 44.7,
    ambient: 39.0,
    vulnerability: 68,
    population: 26100,
    households: 6010,
    greenCover: 9,
    builtUp: 81,
    drivers: [
      { label: "Impervious Surface", value: 79 },
      { label: "Built-up Density", value: 73 },
      { label: "Low Vegetation", value: 67 },
      { label: "Rail Yard Heat", value: 58 },
      { label: "Building Albedo", value: 50 },
    ],
    mitigations: [
      { title: "Pocket parks in dense wards", detail: "Convert 6 vacant plots into shaded parks", impact: "High" },
      { title: "Cool roofs on rail housing", detail: "Reflective coating on 1,800 quarters", impact: "Medium" },
      { title: "Street tree infill program", detail: "Plant 900 trees in canopy gaps", impact: "Medium" },
    ],
  },
]

export type InterventionType =
  | "urban-greening"
  | "cool-roofs"
  | "water-bodies"
  | "permeable-paving"

export type Intervention = {
  id: InterventionType
  label: string
  description: string
  // °C reduction per 1% coverage applied (approx, for simulation)
  coolingPerUnit: number
  // cost per 1% coverage in ₹ lakh
  costPerUnit: number
}

export const INTERVENTIONS: Intervention[] = [
  {
    id: "urban-greening",
    label: "Urban Greening",
    description: "Tree canopy & vegetation",
    coolingPerUnit: 0.072,
    costPerUnit: 3.4,
  },
  {
    id: "cool-roofs",
    label: "Cool Roofs",
    description: "High-albedo reflective coatings",
    coolingPerUnit: 0.048,
    costPerUnit: 1.9,
  },
  {
    id: "water-bodies",
    label: "Blue Infrastructure",
    description: "Water bodies & fountains",
    coolingPerUnit: 0.061,
    costPerUnit: 5.2,
  },
  {
    id: "permeable-paving",
    label: "Permeable Paving",
    description: "Cool & porous surfaces",
    coolingPerUnit: 0.039,
    costPerUnit: 2.6,
  },
]

export const CITY_STATS = {
  avgSurfaceTemp: 45.4,
  avgAmbientTemp: 39.7,
  hottestDelta: 8.1,
  monitoredZones: 15,
  populationAtRisk: 1.84, // million
  criticalHotspots: 6,
}
