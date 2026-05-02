import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, MapPin, LogOut, Clock, CheckCircle, XCircle, Shield } from 'lucide-react';

export function Profile() {
  const { user, logout, adoptionRequests } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Aprovada</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Recusada</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl mb-1 text-gray-900">Meu Perfil</h2>
        <p className="text-gray-600">Suas informações e solicitações</p>
      </div>

      {/* User Info Card */}
      <Card className="p-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">Usuário desde 2026</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{user.address}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Adoption Requests */}
      <div className="mb-6">
        <h3 className="text-lg text-gray-900 mb-3">Minhas Solicitações</h3>
        {adoptionRequests.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-500">Você ainda não fez nenhuma solicitação de adoção</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {adoptionRequests.map((request) => (
              <Card key={request.id} className="p-4">
                <div className="flex gap-3">
                  <img
                    src={request.animalPhoto}
                    alt={request.animalName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-gray-900">{request.animalName}</h4>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Solicitado em {new Date(request.date).toLocaleDateString('pt-BR')}
                    </p>
                    {request.interviewDate && (
                      <p className="text-sm text-gray-600 mt-1">
                        Entrevista agendada: {new Date(request.interviewDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Admin Button */}
      <Button
        onClick={() => navigate('/admin')}
        className="w-full mb-3 bg-orange-500 hover:bg-orange-600"
      >
        <Shield className="w-4 h-4 mr-2" />
        Área do Administrador
      </Button>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full border-red-200 text-red-600 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </div>
  );
}
