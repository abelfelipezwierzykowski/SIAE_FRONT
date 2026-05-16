import type { Animal } from '../data/animals';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export class UsersService {
  static async getFavorites(userId: string): Promise<Animal[]> {
    const response = await fetch(`${API_URL}/users/${userId}/favorites`);
    if (!response.ok) throw new Error('Erro ao buscar favoritos');
    return response.json();
  }

  static async addFavorite(userId: string, animalId: string) {
    const response = await fetch(`${API_URL}/users/${userId}/favorites/${animalId}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Erro ao adicionar aos favoritos');
    return response.json();
  }

  static async removeFavorite(userId: string, animalId: string) {
    const response = await fetch(`${API_URL}/users/${userId}/favorites/${animalId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao remover dos favoritos');
    return response.json();
  }
}
