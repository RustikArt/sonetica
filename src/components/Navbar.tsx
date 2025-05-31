import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

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
  const [contactOpen, setContactOpen] = useState(false);
  
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
        <button
          className="navbar-item nav-link"
          onClick={() => setContactOpen(true)}
          type="button"
        >
          Contact
        </button>
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
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contactez-nous</DialogTitle>
          </DialogHeader>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" className="form-textarea" rows={5}></textarea>
            </div>
            <button type="submit" className="submit-button">Envoyer</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}