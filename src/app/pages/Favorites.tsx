import { Link } from 'react-router-dom';
import { mockAnimals } from '../data/animals';
import { Card } from '../components/ui/card';
import { Heart, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useApp();

  const favoriteAnimals = mockAnimals.filter((animal) => favorites.includes(animal.id));

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl mb-1 text-gray-900">Meus Favoritos</h2>
        <p className="text-gray-600">
          {favoriteAnimals.length} {favoriteAnimals.length === 1 ? 'animal favoritado' : 'animais favoritados'}
        </p>
      </div>

      {favoriteAnimals.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">Você ainda não tem favoritos</p>
          <p className="text-sm text-gray-400">
            Toque no coração dos animais que você gostou para salvá-los aqui
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favoriteAnimals.map((animal) => (
            <Card key={animal.id} className="overflow-hidden">
              <Link to={`/animal/${animal.id}`}>
                <div className="aspect-square relative">
                  <img
                    src={animal.photos[0]}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                  {animal.status === 'adopted' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm">
                        Adotado
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/animal/${animal.id}`}>
                    <h3 className="text-lg text-gray-900">{animal.name}</h3>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(animal.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-red-500" />
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
      )}
    </div>
  );
}
