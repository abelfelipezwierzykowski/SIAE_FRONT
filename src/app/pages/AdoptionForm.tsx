import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAnimals } from '../data/animals';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submitAdoptionRequest, user } = useApp();
  const animal = mockAnimals.find((a) => a.id === id);

  const [hasExperience, setHasExperience] = useState('');
  const [housingType, setHousingType] = useState('');
  const [hasYard, setHasYard] = useState('');
  const [otherPets, setOtherPets] = useState('');
  const [motivation, setMotivation] = useState('');

  if (!animal) {
    return <div className="p-4">Animal não encontrado</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitAdoptionRequest({
      animalId: animal.id,
      animalName: animal.name,
      animalPhoto: animal.photos[0],
    });

    toast.success('Solicitação enviada com sucesso!', {
      description: 'Entraremos em contato em breve para agendar uma entrevista.',
    });

    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900">Solicitação de Adoção</h1>
      </div>

      <div className="p-4">
        {/* Animal Info */}
        <div className="mb-6 flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
          <img
            src={animal.photos[0]}
            alt={animal.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-lg text-gray-900">{animal.name}</h2>
            <p className="text-sm text-gray-600">
              {animal.species === 'dog' ? 'Cachorro' : 'Gato'} • {animal.age}{' '}
              {animal.age === 1 ? 'ano' : 'anos'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience */}
          <div>
            <Label className="text-base mb-3 block">Você já teve {animal.species === 'dog' ? 'cachorros' : 'gatos'} antes?</Label>
            <RadioGroup value={hasExperience} onValueChange={setHasExperience} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="exp-yes" />
                <Label htmlFor="exp-yes" className="cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="exp-no" />
                <Label htmlFor="exp-no" className="cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Housing Type */}
          <div>
            <Label className="text-base mb-3 block">Tipo de moradia</Label>
            <RadioGroup value={housingType} onValueChange={setHousingType} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="house" id="house" />
                <Label htmlFor="house" className="cursor-pointer">Casa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="apartment" id="apartment" />
                <Label htmlFor="apartment" className="cursor-pointer">Apartamento</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Yard */}
          <div>
            <Label className="text-base mb-3 block">Possui quintal ou área externa?</Label>
            <RadioGroup value={hasYard} onValueChange={setHasYard} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yard-yes" />
                <Label htmlFor="yard-yes" className="cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="yard-no" />
                <Label htmlFor="yard-no" className="cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Other Pets */}
          <div>
            <Label className="text-base mb-3 block">Possui outros animais de estimação?</Label>
            <RadioGroup value={otherPets} onValueChange={setOtherPets} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pets-yes" />
                <Label htmlFor="pets-yes" className="cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pets-no" />
                <Label htmlFor="pets-no" className="cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Motivation */}
          <div>
            <Label htmlFor="motivation" className="text-base mb-2 block">
              Por que você quer adotar {animal.name}?
            </Label>
            <Textarea
              id="motivation"
              placeholder="Conte-nos sobre sua motivação para adotar..."
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Enviar Solicitação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
