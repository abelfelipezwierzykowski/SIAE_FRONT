import type { AdoptionRequest } from '../data/animals';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export class AdoptionsService {
  static async create(adoptionData: {
    userId: string;
    animalId: string;
    motivation: string;
    hasExperience: boolean;
    housingType: 'house' | 'apartment';
    hasYard: boolean;
    otherPets: boolean;
  }) {
    const response = await fetch(`${API_URL}/adoptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adoptionData),
    });
    if (!response.ok) throw new Error('Erro ao submeter solicitação');
    return response.json();
  }

  static async getByUser(userId: string): Promise<AdoptionRequest[]> {
    const response = await fetch(`${API_URL}/adoptions/user/${userId}`);
    if (!response.ok) throw new Error('Erro ao buscar solicitações');
    return response.json();
  }

  static async update(id: string, updateData: { status?: string; interviewDate?: string }) {
    const response = await fetch(`${API_URL}/adoptions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error('Erro ao atualizar solicitação');
    return response.json();
  }
}
