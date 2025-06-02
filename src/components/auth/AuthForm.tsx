import { useState } from 'react';

interface AuthFormProps {
  onSuccess: (userData: any) => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simuler une requête d'authentification
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === 'admin@sonetica.app' || email === 'admin') {
        onSuccess({
          id: 'admin',
          name: 'Admin',
          email: 'admin@sonetica.app',
          isVIP: true
        });
      } else if (email && password) {
        onSuccess({
          id: '123',
          name: isLogin ? email.split('@')[0] : name,
          email,
          isVIP: false
        });
      } else {
        setError('Veuillez remplir tous les champs');
      }
    }, 1000);
  };
  
  const handleSpotifyAuth = () => {
    setIsLoading(true);
    
    // Simuler une authentification Spotify
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        id: 'spotify_123',
        name: 'Utilisateur Spotify',
        email: 'user@spotify.com',
        isVIP: false,
        spotifyConnected: true
      });
    }, 1500);
  };
  
  return (
    <div className="card fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-6">
        {!isLogin && (
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              required={!isLogin}
            />
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary hover-scale w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>
      
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-dark-card dark:bg-dark-card light:bg-light-card">ou</span>
        </div>
      </div>
      
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ED760] text-white py-3 px-4 rounded-full font-bold transition-colors hover-scale"
        onClick={handleSpotifyAuth}
        disabled={isLoading}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#1DB954"/>
          <path d="M16.7917 16.5833C16.625 16.5833 16.5 16.5417 16.3333 16.4583C15.125 15.7083 13.625 15.2917 12.0417 15.2917C10.7083 15.2917 9.41667 15.5417 8.20833 16C8.04167 16.0833 7.875 16.125 7.75 16.125C7.29167 16.125 6.91667 15.75 6.91667 15.2917C6.91667 14.9167 7.125 14.5833 7.45833 14.4167C8.91667 13.8333 10.4583 13.5417 12.0417 13.5417C13.9583 13.5417 15.7917 14.0417 17.2917 15C17.5833 15.1667 17.75 15.5 17.75 15.875C17.7083 16.2917 17.2917 16.5833 16.7917 16.5833ZM17.9167 13.2083C17.7083 13.2083 17.5417 13.1667 17.375 13.0417C15.9583 12.125 14.0833 11.625 12.0833 11.625C10.5417 11.625 9.04167 11.9167 7.75 12.4583C7.54167 12.5417 7.375 12.5833 7.20833 12.5833C6.625 12.5833 6.16667 12.125 6.16667 11.5417C6.16667 11.0833 6.41667 10.6667 6.83333 10.5C8.375 9.83333 10.1667 9.5 12.0833 9.5C14.4583 9.5 16.7083 10.0833 18.4167 11.2083C18.7917 11.4167 19 11.8333 19 12.25C18.9583 12.7917 18.5 13.2083 17.9167 13.2083ZM19.1667 9.45833C18.9167 9.45833 18.7083 9.375 18.5 9.25C16.8333 8.20833 14.5417 7.625 12.125 7.625C10.375 7.625 8.625 7.91667 7 8.5C6.79167 8.58333 6.58333 8.625 6.41667 8.625C5.70833 8.625 5.125 8.04167 5.125 7.33333C5.125 6.79167 5.45833 6.29167 5.95833 6.08333C7.875 5.375 9.95833 5 12.125 5C14.9583 5 17.7083 5.70833 19.7917 7C20.25 7.25 20.5417 7.75 20.5417 8.29167C20.5 8.95833 19.875 9.45833 19.1667 9.45833Z" fill="white"/>
        </svg>
        Continuer avec Spotify
      </button>
      
      <div className="mt-6 text-center">
        {isLogin ? (
          <p>
            Pas encore de compte ?{' '}
            <button
              type="button"
              className="text-spotify-green hover:underline"
              onClick={() => setIsLogin(false)}
            >
              S'inscrire
            </button>
          </p>
        ) : (
          <p>
            Déjà un compte ?{' '}
            <button
              type="button"
              className="text-spotify-green hover:underline"
              onClick={() => setIsLogin(true)}
            >
              Se connecter
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
