import { useState, useEffect } from 'react';
import { getSpotifyAuthUrl } from '../../services/spotify';

export default function SpotifyLoginButton() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    setConnected(!!token);
  }, []);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('refresh_token');
    setConnected(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {connected ? (
        <>
          <span className="text-green-600 font-semibold flex items-center gap-2">
            Connecté à Spotify <span>✅</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-4 py-2"
          >
            Se déconnecter
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
        >
          Continuer avec Spotify
        </button>
      )}
    </div>
  );
}