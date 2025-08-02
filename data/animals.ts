export type AnimalSex = "Male" | "Female"

export interface Animal {
  id: string
  name: string
  species: string
  age: number
  sex: AnimalSex
  enclosureId?: string
}

/**
 * Lightweight mock dataset used by
 * `/app/dashboard/feed-scheduling/page.tsx` and other demo pages.
 */
export const mockAnimals: Animal[] = [
  {
    id: "animal-1",
    name: "Simba",
    species: "Lion",
    age: 5,
    sex: "Male",
    enclosureId: "enc-1",
  },
  {
    id: "animal-2",
    name: "Nala",
    species: "Lion",
    age: 4,
    sex: "Female",
    enclosureId: "enc-1",
  },
  {
    id: "animal-3",
    name: "Dumbo",
    species: "African Elephant",
    age: 10,
    sex: "Male",
    enclosureId: "enc-2",
  },
  {
    id: "animal-4",
    name: "Ellie",
    species: "African Elephant",
    age: 9,
    sex: "Female",
    enclosureId: "enc-2",
  },
  {
    id: "animal-5",
    name: "Pingu",
    species: "Gentoo Penguin",
    age: 2,
    sex: "Male",
    enclosureId: "enc-3",
  },
  {
    id: "animal-6",
    name: "Gloria",
    species: "Hippopotamus",
    age: 7,
    sex: "Female",
    enclosureId: "enc-4",
  },
  {
    id: "animal-7",
    name: "Melman",
    species: "Giraffe",
    age: 6,
    sex: "Male",
    enclosureId: "enc-5",
  },
  {
    id: "animal-8",
    name: "Rico",
    species: "Macaw",
    age: 3,
    sex: "Male",
    enclosureId: "enc-6",
  },
]
