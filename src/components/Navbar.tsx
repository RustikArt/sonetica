import { useState } from 'react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: any | null;
  onShowAuth: () => void;
  onLogout: () => void;
  onShowAdmin?: () => void;
  activePage: 'home' | 'library' | 'create' | 'discover';
  onNavigate: (page: 'home' | 'library' | 'create' | 'discover') => void;
}

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  user, 
  onShowAuth, 
  onLogout, 
  onShowAdmin,
  activePage,
  onNavigate
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="navbar-container theme-transition">
      <div className="navbar-logo">
        Sonetica
      </div>
      
      <div className="navbar-items">
        <div 
          className={`navbar-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          Accueil
        </div>
        <div 
          className={`navbar-item ${activePage === 'library' ? 'active' : ''}`}
          onClick={() => onNavigate('library')}
        >
          Ma bibliothèque
        </div>
        <div 
          className={`navbar-item ${activePage === 'create' ? 'active' : ''}`}
          onClick={() => onNavigate('create')}
        >
          Créer
        </div>
        <div 
          className={`navbar-item ${activePage === 'discover' ? 'active' : ''}`}
          onClick={() => onNavigate('discover')}
        >
          Découvrir
        </div>
      </div>
      
      <div className="navbar-controls">
        <label className="theme-switch mr-4">
          <input 
            type="checkbox" 
            checked={theme === 'dark'}
            onChange={onToggleTheme}
          />
          <span className="theme-switch-slider"></span>
        </label>
        
        {user ? (
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-opacity-10 hover:bg-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
              {user.isVIP && (
                <span className="bg-yellow-500 text-xs px-2 py-0.5 rounded-full text-white">VIP</span>
              )}
            </div>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 fade-in">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onLogout}
                  >
                    Déconnexion
                  </button>
                  {user.id === 'admin' && onShowAdmin && (
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onShowAdmin();
                        setMenuOpen(false);
                      }}
                    >
                      Administration
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="btn-primary"
            onClick={onShowAuth}
          >
            Connexion
          </button>
        )}
      </div>
    </div>
  );
}
