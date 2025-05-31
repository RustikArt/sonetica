import { useState } from 'react';

interface SpotifyIntegrationProps {
  onAuthenticated: (accessToken: string) => void;
  onError: (error: string) => void;
}

export default function SpotifyIntegration({ onAuthenticated, onError }: SpotifyIntegrationProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  // Simuler l'authentification Spotify (à remplacer par l'intégration réelle)
  const authenticateWithSpotify = async () => {
    setIsAuthenticating(true);
    
    try {
      // Simulation d'une requête d'authentification à l'API Spotify
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un token d'accès
      const mockToken = 'spotify-mock-token-' + Math.random().toString(36).substring(2, 15);
      setAccessToken(mockToken);
      onAuthenticated(mockToken);
    } catch (error) {
      onError("Erreur lors de l'authentification Spotify");
      console.error('Spotify auth error:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  // Simuler la création d'une playlist Spotify
  const createSpotifyPlaylist = async (name: string, description: string, trackUris: string[]) => {
    if (!accessToken) {
      onError("Vous devez vous connecter à Spotify d'abord");
      return null;
    }
    
    try {
      // Simulation d'une requête de création de playlist
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler un ID de playlist
      const playlistId = 'playlist-' + Math.random().toString(36).substring(2, 10);
      
      return {
        id: playlistId,
        name,
        description,
        external_urls: {
          spotify: `https://open.spotify.com/playlist/${playlistId}`
        },
        tracks: {
          total: trackUris.length
        }
      };
    } catch (error) {
      onError("Erreur lors de la création de la playlist");
      console.error('Spotify create playlist error:', error);
      return null;
    }
  };
  
  // Simuler la recherche de morceaux sur Spotify
  const searchTracks = async (query: string, limit: number = 10) => {
    if (!accessToken) {
      onError("Vous devez vous connecter à Spotify d'abord");
      return [];
    }
    
    try {
      // Simulation d'une requête de recherche
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données de démonstration pour les résultats de recherche
      const mockResults = [
        { id: 'track1', name: 'Blinding Lights', artists: [{ name: 'The Weeknd' }], duration_ms: 200000, uri: 'spotify:track:track1' },
        { id: 'track2', name: 'Don\'t Start Now', artists: [{ name: 'Dua Lipa' }], duration_ms: 183000, uri: 'spotify:track:track2' },
        { id: 'track3', name: 'Watermelon Sugar', artists: [{ name: 'Harry Styles' }], duration_ms: 174000, uri: 'spotify:track:track3' },
        { id: 'track4', name: 'Dance Monkey', artists: [{ name: 'Tones and I' }], duration_ms: 210000, uri: 'spotify:track:track4' },
        { id: 'track5', name: 'Physical', artists: [{ name: 'Dua Lipa' }], duration_ms: 193000, uri: 'spotify:track:track5' },
      ];
      
      // Filtrer les résultats en fonction de la requête
      return mockResults.filter(track => 
        track.name.toLowerCase().includes(query.toLowerCase()) || 
        track.artists.some(artist => artist.name.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, limit);
    } catch (error) {
      onError("Erreur lors de la recherche de morceaux");
      console.error('Spotify search tracks error:', error);
      return [];
    }
  };
  
  return {
    isAuthenticating,
    accessToken,
    authenticateWithSpotify,
    createSpotifyPlaylist,
    searchTracks
  };
}
