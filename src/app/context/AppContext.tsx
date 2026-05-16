import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, AdoptionRequest } from '../data/animals';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { AdoptionsService } from '../services/adoptions.service';

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, address: string) => Promise<void>;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (animalId: string) => Promise<void>;
  isFavorite: (animalId: string) => boolean;
  adoptionRequests: AdoptionRequest[];
  submitAdoptionRequest: (animalId: string, request: Omit<AdoptionRequest, 'id' | 'date' | 'status' | 'animalName' | 'animalPhoto'>) => Promise<void>;
  loadingUser: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      loadUserProfile(savedUserId);
    }
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      setLoadingUser(true);
      const profile = await AuthService.getProfile(userId);
      setUser(profile);
      const userFavorites = await UsersService.getFavorites(userId);
      setFavorites(userFavorites.map((fav) => fav.id));
      const requests = await AdoptionsService.getByUser(userId);
      setAdoptionRequests(requests);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar perfil');
      localStorage.removeItem('userId');
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoadingUser(true);
      const response = await AuthService.login(email, password);
      setUser(response.user);
      localStorage.setItem('userId', response.user.id);
      
      const userFavorites = await UsersService.getFavorites(response.user.id);
      setFavorites(userFavorites.map((fav) => fav.id));
      
      const requests = await AdoptionsService.getByUser(response.user.id);
      setAdoptionRequests(requests);
      setError(null);
    } catch (err) {
      setError('Erro ao fazer login');
      throw err;
    } finally {
      setLoadingUser(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone: string, address: string) => {
    try {
      setLoadingUser(true);
      const response = await AuthService.register({
        name,
        email,
        password,
        phone,
        address,
      });
      setUser(response.user);
      localStorage.setItem('userId', response.user.id);
      setFavorites([]);
      setAdoptionRequests([]);
      setError(null);
    } catch (err) {
      setError('Erro ao fazer registro');
      throw err;
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setAdoptionRequests([]);
    localStorage.removeItem('userId');
    setError(null);
  };

  const toggleFavorite = async (animalId: string) => {
    if (!user) return;
    
    try {
      if (favorites.includes(animalId)) {
        await UsersService.removeFavorite(user.id, animalId);
        setFavorites(favorites.filter((id) => id !== animalId));
      } else {
        await UsersService.addFavorite(user.id, animalId);
        setFavorites([...favorites, animalId]);
      }
      setError(null);
    } catch (err) {
      setError('Erro ao atualizar favoritos');
    }
  };

  const isFavorite = (animalId: string) => {
    return favorites.includes(animalId);
  };

  const submitAdoptionRequest = async (animalId: string, request: Omit<AdoptionRequest, 'id' | 'date' | 'status' | 'animalName' | 'animalPhoto'>) => {
    if (!user) return;
    
    try {
      const response = await AdoptionsService.create({
        userId: user.id,
        animalId,
        motivation: request.animalName ?? '',
        hasExperience: false,
        housingType: request.animalPhoto as 'house' | 'apartment' ?? 'apartment',
        hasYard: false,
        otherPets: false,
      });
      
      setAdoptionRequests([...adoptionRequests, response]);
      setError(null);
    } catch (err) {
      setError('Erro ao submeter solicitação');
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        adoptionRequests,
        submitAdoptionRequest,
        loadingUser,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
