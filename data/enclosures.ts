export interface Enclosure {
  id: number;
  name: string;
  capacity: number;
  currentAnimals: number;
  location: string;
  status: string;
  type: "Open" | "Caged" | "Aquatic" | "Aviary";
}

/**
 * Simple mock list used by the Enclosure & Zone Management page
 * (`/app/dashboard/enclosure-zone-management/page.tsx`).
 */
export const mockEnclosures: Enclosure[] = [
  {
    id: 1,
    name: "Savannah Habitat",
    location: "Savannah Habitat",
    capacity: 6,
    currentAnimals: 4,
    type: "Open",
    status: "Operational",
  },
  {
    id: 2,
    name: "Elephant Plains",
    location: "Elephant Plains",
    capacity: 4,
    currentAnimals: 2,
    type: "Open",
    status: "Operational",
  },
  {
    id: 3,
    name: "Penguin Pool",
    location: "Penguin Pool",
    capacity: 30,
    currentAnimals: 12,
    type: "Aquatic",
    status: "Under Renovation",
  },
  {
    id: 4,
    name: "Hippo River",
    location: "Hippo River",
    capacity: 3,
    currentAnimals: 1,
    type: "Aquatic",
    status: "Under Construction",
  },
  {
    id: 5,
    name: "Giraffe Heights",
    location: "Giraffe Heights",
    capacity: 5,
    currentAnimals: 2,
    type: "Open",
    status: "Operational",
  },
  {
    id: 6,
    name: "Tropical Aviary",
    location: "Tropical Aviary",
    capacity: 20,
    currentAnimals: 8,
    type: "Aviary",
    status: "Closed to Public",
  },
];
