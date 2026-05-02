import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AdoptionRequest } from '../data/animals';

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone: string, address: string) => boolean;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (animalId: string) => void;
  isFavorite: (animalId: string) => boolean;
  adoptionRequests: AdoptionRequest[];
  submitAdoptionRequest: (request: Omit<AdoptionRequest, 'id' | 'date' | 'status'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('4patas_user');
    const savedFavorites = localStorage.getItem('4patas_favorites');
    const savedRequests = localStorage.getItem('4patas_requests');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedRequests) {
      setAdoptionRequests(JSON.parse(savedRequests));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'Usuário Teste',
      email,
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP',
      adoptionHistory: [],
    };
    setUser(mockUser);
    localStorage.setItem('4patas_user', JSON.stringify(mockUser));
    return true;
  };

  const register = (name: string, email: string, password: string, phone: string, address: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      address,
      adoptionHistory: [],
    };
    setUser(newUser);
    localStorage.setItem('4patas_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('4patas_user');
  };

  const toggleFavorite = (animalId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(animalId)
        ? prev.filter((id) => id !== animalId)
        : [...prev, animalId];
      localStorage.setItem('4patas_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (animalId: string) => {
    return favorites.includes(animalId);
  };

  const submitAdoptionRequest = (request: Omit<AdoptionRequest, 'id' | 'date' | 'status'>) => {
    const newRequest: AdoptionRequest = {
      ...request,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending',
    };
    const updatedRequests = [...adoptionRequests, newRequest];
    setAdoptionRequests(updatedRequests);
    localStorage.setItem('4patas_requests', JSON.stringify(updatedRequests));
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
