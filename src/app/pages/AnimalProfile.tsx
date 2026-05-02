import { useParams, useNavigate } from 'react-router-dom';
import { mockAnimals } from '../data/animals';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { ArrowLeft, Heart, MapPin, Calendar, CheckCircle2, HandHeart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export function AnimalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useApp();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const animal = mockAnimals.find((a) => a.id === id);

  if (!animal) {
    return (
      <div className="p-4">
        <p>Animal não encontrado</p>
      </div>
    );
  }

  const handleAdopt = () => {
    navigate(`/adopt/${animal.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900">{animal.name}</h1>
        <button
          onClick={() => toggleFavorite(animal.id)}
          className="text-gray-600 hover:text-red-500"
        >
          <Heart
            className={`w-6 h-6 ${isFavorite(animal.id) ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>
      </div>

      {/* Photo Gallery */}
      <div className="relative">
        <div className="aspect-square bg-gray-100">
          <img
            src={animal.photos[currentPhotoIndex]}
            alt={animal.name}
            className="w-full h-full object-cover"
          />
        </div>
        {animal.photos.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {animal.photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-24">
        {/* Basic Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">{animal.name}</h2>
              <p className="text-gray-600">
                {animal.species === 'dog' ? 'Cachorro' : 'Gato'} • {animal.gender === 'male' ? 'Macho' : 'Fêmea'}
              </p>
            </div>
            {animal.status === 'available' ? (
              <Badge className="bg-green-100 text-green-700">Disponível</Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-700">Adotado</Badge>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Idade</span>
            </div>
            <p className="text-lg text-gray-900">{animal.age} {animal.age === 1 ? 'ano' : 'anos'}</p>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Localização</span>
            </div>
            <p className="text-sm text-gray-900">{animal.location}</p>
          </Card>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg text-gray-900 mb-2">Sobre {animal.name}</h3>
          <p className="text-gray-600 leading-relaxed">{animal.description}</p>
        </div>

        {/* Characteristics */}
        <div>
          <h3 className="text-lg text-gray-900 mb-3">Características</h3>
          <div className="flex flex-wrap gap-2">
            {animal.characteristics.map((char, index) => (
              <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {char}
              </Badge>
            ))}
          </div>
        </div>

        {/* Health Info */}
        <div>
          <h3 className="text-lg text-gray-900 mb-3">Saúde</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${animal.vaccinated ? 'text-green-500' : 'text-gray-300'}`} />
              <span className="text-gray-700">Vacinado</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${animal.neutered ? 'text-green-500' : 'text-gray-300'}`} />
              <span className="text-gray-700">Castrado</span>
            </div>
          </div>
        </div>

        {/* Size Badge */}
        <div>
          <h3 className="text-lg text-gray-900 mb-2">Porte</h3>
          <Badge variant="outline">
            {animal.size === 'small' && 'Pequeno'}
            {animal.size === 'medium' && 'Médio'}
            {animal.size === 'large' && 'Grande'}
          </Badge>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {animal.status === 'available' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <Button
            onClick={handleAdopt}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            <HandHeart className="w-6 h-6 mr-2" />
            Quero Adotar {animal.name}
          </Button>
        </div>
      )}
    </div>
  );
}
