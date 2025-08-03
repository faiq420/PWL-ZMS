export type AnimalSex = "Male" | "Female";

export interface Animal {
  id: string;
  name: string;
  species: string;
  age: number;
  sex: AnimalSex;
  enclosureId?: string;
  healthStatus?: string;
  imageUrl?: string;
}

/**
 * Lightweight mock dataset used by
 * `/app/dashboard/feed-scheduling/page.tsx` and other demo pages.
 */
export const mockAnimals: Animal[] = [
  {
    id: "1",
    name: "Simba",
    species: "Lion",
    age: 5,
    sex: "Male",
    enclosureId: "1",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "2",
    name: "Nala",
    species: "Lion",
    age: 4,
    sex: "Female",
    enclosureId: "1",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "3",
    name: "Dumbo",
    species: "African Elephant",
    age: 10,
    sex: "Male",
    enclosureId: "2",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "4",
    name: "Ellie",
    species: "African Elephant",
    age: 9,
    sex: "Female",
    enclosureId: "2",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "5",
    name: "Pingu",
    species: "Gentoo Penguin",
    age: 2,
    sex: "Male",
    enclosureId: "3",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "6",
    name: "Gloria",
    species: "Hippopotamus",
    age: 7,
    sex: "Female",
    enclosureId: "4",
    healthStatus: "Under Observation",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "7",
    name: "Melman",
    species: "Giraffe",
    age: 6,
    sex: "Male",
    enclosureId: "4",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
  {
    id: "8",
    name: "Rico",
    species: "Macaw",
    age: 3,
    sex: "Male",
    enclosureId: "6",
    healthStatus: "Healthy",
    imageUrl: "/placeholder.svg?height=192&width=384",
  },
];
