import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../data/animals';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Heart, MapPin, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimalsService } from '../services/animals.service';
import { toast } from 'sonner';

export function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const { isFavorite, toggleFavorite } = useApp();

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      setIsLoading(true);
      const data = await AnimalsService.getAll();
      setAnimals(data.filter((animal: Animal) => animal.status === 'available'));
    } catch (error) {
      toast.error('Erro ao carregar animais');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAnimals = animals.filter((animal) => {
    if (speciesFilter !== 'all' && animal.species !== speciesFilter) return false;
    if (sizeFilter !== 'all' && animal.size !== sizeFilter) return false;
    if (ageFilter !== 'all') {
      const age = animal.age;
      if (ageFilter === 'young' && age > 2) return false;
      if (ageFilter === 'adult' && (age <= 2 || age > 7)) return false;
      if (ageFilter === 'senior' && age <= 7) return false;
    }
    return true;
  });

  const totalDogs = animals.filter((a) => a.species === 'dog').length;
  const totalCats = animals.filter((a) => a.species === 'cat').length;
  const totalSmall = animals.filter((a) => a.size === 'small').length;
  const totalMedium = animals.filter((a) => a.size === 'medium').length;
  const totalLarge = animals.filter((a) => a.size === 'large').length;
  const totalYoung = animals.filter((a) => a.age <= 2).length;
  const totalAdult = animals.filter((a) => a.age > 2 && a.age <= 7).length;
  const totalSenior = animals.filter((a) => a.age > 7).length;

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl mb-1 text-gray-900">Adote um amigo</h2>
        <p className="text-gray-600">Encontre seu novo companheiro</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Statistics */}
          <div className="mb-6 space-y-4">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
              <h3 className="text-sm mb-3 text-gray-700">Animais Disponíveis</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-2">Espécie</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">🐕 Cães</p>
                      <p className="text-lg text-orange-600">{totalDogs}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">🐱 Gatos</p>
                      <p className="text-lg text-orange-600">{totalCats}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-2">Porte</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">Pequeno</p>
                      <p className="text-sm text-orange-600">{totalSmall}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">Médio</p>
                      <p className="text-sm text-orange-600">{totalMedium}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">Grande</p>
                      <p className="text-sm text-orange-600">{totalLarge}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-2">Idade</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">Filhote</p>
                      <p className="text-sm text-orange-600">{totalYoung}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">Adulto</p>
                      <p className="text-sm text-orange-600">{totalAdult}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-2 text-center border border-orange-200">
                      <p className="text-xs text-gray-600">Idoso</p>
                      <p className="text-sm text-orange-600">{totalSenior}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="dog">Cães</SelectItem>
                    <SelectItem value="cat">Gatos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Porte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Idade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="young">Filhote</SelectItem>
                    <SelectItem value="adult">Adulto</SelectItem>
                    <SelectItem value="senior">Idoso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-600 mb-4">
            {filteredAnimals.length} {filteredAnimals.length === 1 ? 'animal encontrado' : 'animais encontrados'}
          </p>

          {/* Animals Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredAnimals.map((animal) => (
              <Card key={animal.id} className="overflow-hidden">
                <Link to={`/animal/${animal.id}`}>
                  <div className="aspect-square relative">
                    <img
                      src={animal.photos[0]}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/animal/${animal.id}`}>
                      <h3 className="text-lg text-gray-900">{animal.name}</h3>
                    </Link>
                    <button
                      onClick={() => toggleFavorite(animal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${isFavorite(animal.id) ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {animal.species === 'dog' ? 'Cachorro' : 'Gato'} • {animal.age}{' '}
                    {animal.age === 1 ? 'ano' : 'anos'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{animal.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum animal encontrado com esses filtros.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}


      {/* Results count */}
      <p className="text-sm text-gray-600 mb-4">
        {filteredAnimals.length} {filteredAnimals.length === 1 ? 'animal encontrado' : 'animais encontrados'}
      </p>

      {/* Animals Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="overflow-hidden">
            <Link to={`/animal/${animal.id}`}>
              <div className="aspect-square relative">
                <img
                  src={animal.photos[0]}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="p-3">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/animal/${animal.id}`}>
                  <h3 className="text-lg text-gray-900">{animal.name}</h3>
                </Link>
                <button
                  onClick={() => toggleFavorite(animal.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite(animal.id) ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {animal.species === 'dog' ? 'Cachorro' : 'Gato'} • {animal.age}{' '}
                {animal.age === 1 ? 'ano' : 'anos'}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{animal.location}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum animal encontrado com esses filtros.</p>
        </div>
      )}
    </div>
  );
}
