export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  age: number;
  size: 'small' | 'medium' | 'large';
  gender: 'male' | 'female';
  status: 'available' | 'adopted';
  description: string;
  photos: string[];
  location: string;
  characteristics: string[];
  vaccinated: boolean;
  neutered: boolean;
}

export const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Rex',
    species: 'dog',
    age: 3,
    size: 'large',
    gender: 'male',
    status: 'available',
    description: 'Rex é um cachorro muito carinhoso e brincalhão. Adora correr e brincar com crianças.',
    photos: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    ],
    location: 'São Paulo, SP',
    characteristics: ['Brincalhão', 'Sociável', 'Energético'],
    vaccinated: true,
    neutered: true,
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    age: 2,
    size: 'small',
    gender: 'female',
    status: 'available',
    description: 'Luna é uma gatinha tranquila e carinhosa. Perfeita para apartamentos.',
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
      'https://images.unsplash.com/photo-1573865526739-10c1dd9c6c31?w=800&q=80',
    ],
    location: 'Rio de Janeiro, RJ',
    characteristics: ['Calma', 'Independente', 'Carinhosa'],
    vaccinated: true,
    neutered: true,
  },
  {
    id: '3',
    name: 'Thor',
    species: 'dog',
    age: 1,
    size: 'medium',
    gender: 'male',
    status: 'available',
    description: 'Thor é um filhote cheio de energia que precisa de uma família ativa.',
    photos: [
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80',
    ],
    location: 'Belo Horizonte, MG',
    characteristics: ['Filhote', 'Brincalhão', 'Curioso'],
    vaccinated: true,
    neutered: false,
  },
  {
    id: '4',
    name: 'Mia',
    species: 'cat',
    age: 4,
    size: 'small',
    gender: 'female',
    status: 'available',
    description: 'Mia é uma gata adulta muito dócil e companheira.',
    photos: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80',
    ],
    location: 'Curitiba, PR',
    characteristics: ['Dócil', 'Tranquila', 'Companheira'],
    vaccinated: true,
    neutered: true,
  },
  {
    id: '5',
    name: 'Buddy',
    species: 'dog',
    age: 5,
    size: 'medium',
    gender: 'male',
    status: 'available',
    description: 'Buddy é um cachorro adulto muito fiel e obediente.',
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    ],
    location: 'Porto Alegre, RS',
    characteristics: ['Obediente', 'Fiel', 'Protetor'],
    vaccinated: true,
    neutered: true,
  },
  {
    id: '6',
    name: 'Nina',
    species: 'cat',
    age: 1,
    size: 'small',
    gender: 'female',
    status: 'adopted',
    description: 'Nina foi adotada recentemente! É uma gatinha muito carinhosa.',
    photos: [
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80',
    ],
    location: 'Salvador, BA',
    characteristics: ['Carinhosa', 'Brincalhona'],
    vaccinated: true,
    neutered: true,
  },
  {
    id: '7',
    name: 'Max',
    species: 'dog',
    age: 2,
    size: 'large',
    gender: 'male',
    status: 'available',
    description: 'Max é um cachorro de grande porte que adora correr e brincar ao ar livre.',
    photos: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80',
      'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800&q=80',
    ],
    location: 'Brasília, DF',
    characteristics: ['Energético', 'Protetor', 'Leal'],
    vaccinated: true,
    neutered: true,
  },
  {
    id: '8',
    name: 'Bella',
    species: 'dog',
    age: 6,
    size: 'small',
    gender: 'female',
    status: 'available',
    description: 'Bella é uma cachorrinha de pequeno porte, ideal para apartamentos.',
    photos: [
      'https://images.unsplash.com/photo-1591856378301-b9f27fcb4d50?w=800&q=80',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
    ],
    location: 'Recife, PE',
    characteristics: ['Calma', 'Companheira', 'Amorosa'],
    vaccinated: true,
    neutered: true,
  },
];

export interface AdoptionRequest {
  id: string;
  animalId: string;
  animalName: string;
  animalPhoto: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  interviewDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  adoptionHistory: AdoptionRequest[];
}
