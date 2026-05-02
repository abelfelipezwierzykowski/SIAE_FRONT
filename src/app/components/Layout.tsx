import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart, User, PawPrint } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Layout() {
  const location = useLocation();
  const { user } = useApp();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/favorites', icon: Heart, label: 'Favoritos' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-2">
          <PawPrint className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl text-orange-500">4 Patas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {user && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
          <div className="flex justify-around items-center h-16">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full ${
                  isActive(path) ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
