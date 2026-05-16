const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export class AuthService {
  static async register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Registro falhou');
    return response.json();
  }

  static async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login falhou');
    return response.json();
  }

  static async getProfile(userId: string) {
    const response = await fetch(`${API_URL}/auth/profile/${userId}`);
    if (!response.ok) throw new Error('Erro ao buscar perfil');
    return response.json();
  }
}
