export interface Zone {
  id: string
  name: string
  description: string
  enclosures: string[] // IDs of enclosures in this zone
}

export const mockZones: Zone[] = [
  {
    id: "zone-1",
    name: "African Savannah",
    description: "Large open area for African wildlife.",
    enclosures: ["enc-1", "enc-2"],
  },
  {
    id: "zone-2",
    name: "Tropical Rainforest",
    description: "Humid environment for rainforest species.",
    enclosures: ["enc-3"],
  },
  { id: "zone-3", name: "Arctic Tundra", description: "Cold habitat for polar animals.", enclosures: [] },
  {
    id: "zone-4",
    name: "Australian Outback",
    description: "Dry, arid region for Australian native animals.",
    enclosures: [],
  },
  { id: "zone-5", name: "Asian Highlands", description: "Mountainous region for Asian species.", enclosures: [] },
]
