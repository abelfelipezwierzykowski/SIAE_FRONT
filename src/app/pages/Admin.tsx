import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { mockAnimals } from '../data/animals';

export function Admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    size: '',
    gender: '',
    description: '',
    location: '',
    characteristics: '',
    vaccinated: false,
    neutered: false,
    photoUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Em produção, isso enviaria para o backend
    alert(`Animal "${formData.name}" cadastrado com sucesso!`);

    // Limpar formulário
    setFormData({
      name: '',
      species: '',
      age: '',
      size: '',
      gender: '',
      description: '',
      location: '',
      characteristics: '',
      vaccinated: false,
      neutered: false,
      photoUrl: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl text-gray-900">Área do Administrador</h1>
          <p className="text-sm text-gray-600">Gerenciar animais para adoção</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Form Card */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg text-gray-900">Cadastrar Novo Animal</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo URL */}
            <div>
              <Label htmlFor="photoUrl">URL da Foto</Label>
              <Input
                id="photoUrl"
                type="url"
                placeholder="https://exemplo.com/foto.jpg"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Cole a URL de uma imagem do animal</p>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">Nome do Animal *</Label>
              <Input
                id="name"
                placeholder="Ex: Rex"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Species & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Espécie *</Label>
                <Select
                  value={formData.species}
                  onValueChange={(value) => setFormData({ ...formData, species: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cachorro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sexo *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Macho</SelectItem>
                    <SelectItem value="female">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Age & Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Idade (anos) *</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  placeholder="Ex: 3"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Porte *</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => setFormData({ ...formData, size: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                placeholder="Ex: São Paulo, SP"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Conte sobre a personalidade e características do animal..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Characteristics */}
            <div>
              <Label htmlFor="characteristics">Características (separadas por vírgula)</Label>
              <Input
                id="characteristics"
                placeholder="Ex: Brincalhão, Sociável, Energético"
                value={formData.characteristics}
                onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
              />
            </div>

            {/* Health Checkboxes */}
            <div className="space-y-2">
              <Label>Saúde</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vaccinated"
                  checked={formData.vaccinated}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, vaccinated: checked === true })
                  }
                />
                <label htmlFor="vaccinated" className="text-sm">
                  Vacinado
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="neutered"
                  checked={formData.neutered}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, neutered: checked === true })
                  }
                />
                <label htmlFor="neutered" className="text-sm">
                  Castrado
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Cadastrar Animal
            </Button>
          </form>
        </Card>

        {/* Animals List */}
        <Card className="p-4">
          <h2 className="text-lg text-gray-900 mb-4">Animais Cadastrados</h2>
          <div className="space-y-3">
            {mockAnimals.map((animal) => (
              <div
                key={animal.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <img
                  src={animal.photos[0]}
                  alt={animal.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900">{animal.name}</h3>
                    <Badge
                      className={
                        animal.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {animal.status === 'available' ? 'Disponível' : 'Adotado'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {animal.species === 'dog' ? 'Cachorro' : 'Gato'} • {animal.age}{' '}
                    {animal.age === 1 ? 'ano' : 'anos'} • {animal.location}
                  </p>
                </div>
                <button className="text-red-500 hover:text-red-600 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
