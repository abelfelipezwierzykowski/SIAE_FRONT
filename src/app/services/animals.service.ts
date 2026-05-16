import type { Animal } from '../data/animals';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export class AnimalsService {
  static async getAll(): Promise<Animal[]> {
    const response = await fetch(`${API_URL}/animals`);
    if (!response.ok) throw new Error('Erro ao buscar animais');
    return response.json();
  }

  static async getById(id: string): Promise<Animal> {
    const response = await fetch(`${API_URL}/animals/${id}`);
    if (!response.ok) throw new Error('Animal não encontrado');
    return response.json();
  }

  static async create(animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await fetch(`${API_URL}/animals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalData),
    });
    if (!response.ok) throw new Error('Erro ao criar animal');
    return response.json();
  }

  static async update(id: string, animalData: Partial<Animal>) {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalData),
    });
    if (!response.ok) throw new Error('Erro ao atualizar animal');
    return response.json();
  }

  static async delete(id: string) {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar animal');
    return response.json();
  }
}
