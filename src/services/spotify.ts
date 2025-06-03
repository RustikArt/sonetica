import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID!;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private'
].join(' ');

const REDIRECT_URI =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5173/callback'
    : 'https://mon-site.vercel.app/callback';

// Fonction pour rafraîchir le token via l'API serverless
export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch('/api/spotify/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken })
  });
  if (!res.ok) throw new Error('Impossible de rafraîchir le token Spotify');
  return res.json();
}

// Appel générique à l'API Spotify avec gestion du refresh automatique
export async function spotifyFetch(
  url: string,
  accessToken: string,
  refreshToken: string,
  options: RequestInit = {}
) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (res.status === 401 && refreshToken) {
    // Token expiré, on tente de le rafraîchir
    const data = await refreshAccessToken(refreshToken);
    if (data.access_token) {
      localStorage.setItem('spotify_access_token', data.access_token);
      // On refait l'appel avec le nouveau token
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${data.access_token}`
        }
      });
    }
  }

  if (!res.ok) throw new Error('Erreur Spotify');
  return res.json();
}

// Exemple d'utilisation pour /me
export async function getSpotifyMe(accessToken: string, refreshToken: string) {
  return spotifyFetch('https://api.spotify.com/v1/me', accessToken, refreshToken);
}

export function getSpotifyAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'true'
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
