// --- Constantes pour l'API Spotify ---
const SPOTIFY_CLIENT_ID = '09ab22337818418b866d5405fb600550'; // C'est le bon ID Client :)
const SPOTIFY_REDIRECT_URI = 'https://sonetica-chi.vercel.app/callback'; // URL de production
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private'
];

// Génère l'URL d'authentification Spotify
export const getSpotifyAuthUrl = () => {
  const url = new URL(SPOTIFY_AUTH_ENDPOINT);
  url.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
  url.searchParams.append('redirect_uri', SPOTIFY_REDIRECT_URI);
  url.searchParams.append('scope', SPOTIFY_SCOPES.join(' '));
  url.searchParams.append('response_type', 'token');
  url.searchParams.append('show_dialog', 'true');
  return url.toString();
};

// Extrait le token d'accès de l'URL après redirection et le stocke dans le localStorage
export const getAccessTokenFromUrl = (): string | null => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const token = params.get('access_token');
  if (token) {
    localStorage.setItem('spotify_access_token', token);
  }
  return token;
};

// Récupère le token depuis le localStorage
export const getStoredAccessToken = (): string | null => {
  return localStorage.getItem('spotify_access_token');
};

// Déconnecte l'utilisateur (supprime le token)
export const logoutSpotify = () => {
  localStorage.removeItem('spotify_access_token');
};

// Récupère l'ID utilisateur Spotify
export const getSpotifyUserId = async (token: string): Promise<string | null> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.id || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID utilisateur Spotify:', error);
    return null;
  }
};

// Recherche des morceaux
export const searchTracks = async (query: string, token: string) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.tracks?.items || [];
  } catch (error) {
    console.error('Erreur lors de la recherche de morceaux:', error);
    return [];
  }
};

// Crée une playlist
export const createPlaylist = async (
  userId: string,
  name: string,
  description: string,
  token: string
) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        public: false
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la création de la playlist:', error);
    return null;
  }
};

// Ajoute des morceaux à une playlist
export const addTracksToPlaylist = async (
  playlistId: string,
  trackUris: string[],
  token: string
) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'ajout de morceaux à la playlist:', error);
    return null;
  }
};