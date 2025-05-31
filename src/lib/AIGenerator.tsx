import { useState } from 'react';

// Types pour les préférences musicales
export interface MusicPreferences {
  genres: string[];
  mood: string;
  tempo: string;
  occasion: string;
  artists: string[];
  additionalInfo: string;
}

// Fonction pour analyser les réponses du questionnaire
export const analyzeResponses = (responses: Record<string, any>): MusicPreferences => {
  const preferences: MusicPreferences = {
    genres: [],
    mood: '',
    tempo: '',
    occasion: '',
    artists: [],
    additionalInfo: ''
  };

  if (responses.genres) {
    preferences.genres = Array.isArray(responses.genres) ? responses.genres : [responses.genres];
  }
  if (responses.mood) {
    preferences.mood = responses.mood;
  }
  if (responses.tempo) {
    preferences.tempo = responses.tempo;
  }
  if (responses.occasion) {
    preferences.occasion = responses.occasion;
  }
  if (responses.artists) {
    preferences.artists = Array.isArray(responses.artists) ? responses.artists : [responses.artists];
  }
  if (responses.additionalInfo) {
    preferences.additionalInfo = responses.additionalInfo;
  }

  return preferences;
};

// Fonction pour générer une requête pour l'API d'IA
export const generateAIPrompt = (preferences: MusicPreferences): string => {
  return `Génère une playlist musicale avec les caractéristiques suivantes:
    - Genres: ${preferences.genres.join(', ')}
    - Ambiance: ${preferences.mood}
    - Tempo: ${preferences.tempo}
    - Occasion: ${preferences.occasion}
    - Artistes similaires à: ${preferences.artists.join(', ')}
    - Informations supplémentaires: ${preferences.additionalInfo}
    
    Format de réponse souhaité: une liste de 10 à 15 chansons avec le titre et l'artiste pour chaque morceau.`;
};

// Fonction pour appeler l'API d'IA (exemple avec OpenAI)
export const generatePlaylistWithAI = async (
  prompt: string
): Promise<Array<{ title: string; artist: string }>> => {
  // Simulation pour le moment - à remplacer par un véritable appel API
  console.log("Prompt envoyé à l'IA:", prompt);

  // Simulation d'une réponse
  return [
    { title: "Titre de chanson 1", artist: "Artiste 1" },
    { title: "Titre de chanson 2", artist: "Artiste 2" },
    // etc.
  ];
};

// Fonction principale pour générer une playlist
export const generatePlaylist = async (
  responses: Record<string, any>
): Promise<Array<{ title: string; artist: string }>> => {
  const preferences = analyzeResponses(responses);
  const prompt = generateAIPrompt(preferences);
  return await generatePlaylistWithAI(prompt);
}

interface AIGeneratorProps {
  userAnswers: Record<number, any>;
  onGeneratePlaylist: (playlist: any) => void;
  onError: (error: string) => void;
}

export default function AIGenerator({ userAnswers, onGeneratePlaylist, onError }: AIGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Simuler l'interprétation des réponses et la génération de playlist
  const generatePlaylist = async () => {
    setIsGenerating(true);
    
    try {
      // Simulation du traitement IA
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Analyser les réponses (simulation)
      const genres = getGenresFromAnswers(userAnswers);
      const mood = getMoodFromAnswers(userAnswers);
      const tempo = getTempoFromAnswers(userAnswers);
      
      // Générer une description basée sur les réponses
      const description = generateDescription(genres, mood, tempo);
      
      // Générer une playlist basée sur les réponses
      const tracks = generateTracks(genres, mood, tempo);
      
      // Retourner la playlist générée
      const playlist = {
        title: generateTitle(mood, genres),
        description,
        tracks
      };
      
      onGeneratePlaylist(playlist);
    } catch (error) {
      onError("Erreur lors de la génération de la playlist");
      console.error('AI generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Fonctions d'aide pour l'interprétation des réponses
  
  const getGenresFromAnswers = (answers: Record<number, any>) => {
    // Simuler l'extraction des genres à partir des réponses
    const genreMap: Record<number, string[]> = {
      0: ['pop', 'dance'],
      1: ['rock', 'alternative'],
      2: ['hip-hop', 'rap'],
      3: ['electronic', 'dance'],
      4: ['jazz', 'blues'],
      5: ['classical'],
      6: ['r&b', 'soul'],
      7: ['metal', 'rock']
    };
    
    // Vérifier si l'utilisateur a répondu à la question sur les genres (id 3)
    if (answers[3] && Array.isArray(answers[3])) {
      return answers[3].map(index => genreMap[index] || ['pop']).flat();
    }
    
    // Par défaut, retourner des genres populaires
    return ['pop', 'rock', 'electronic'];
  };
  
  const getMoodFromAnswers = (answers: Record<number, any>) => {
    // Simuler l'extraction de l'ambiance à partir des réponses
    const moodMap: Record<number, string> = {
      0: 'energetic',
      1: 'relaxed',
      2: 'festive',
      3: 'melancholic',
      4: 'romantic'
    };
    
    // Vérifier si l'utilisateur a répondu à la question sur l'ambiance (id 1)
    if (answers[1] !== undefined) {
      return moodMap[answers[1]] || 'energetic';
    }
    
    // Par défaut, retourner une ambiance énergique
    return 'energetic';
  };
  
  const getTempoFromAnswers = (answers: Record<number, any>) => {
    // Simuler l'extraction du tempo à partir des réponses
    const tempoMap: Record<number, string> = {
      0: 'fast',
      1: 'medium',
      2: 'fast',
      3: 'slow',
      4: 'medium'
    };
    
    // Vérifier si l'utilisateur a répondu à la question sur l'occasion (id 2)
    if (answers[2] !== undefined) {
      return tempoMap[answers[2]] || 'medium';
    }
    
    // Par défaut, retourner un tempo moyen
    return 'medium';
  };
  
  const generateDescription = (genres: string[], mood: string, tempo: string) => {
    // Générer une description basée sur les paramètres
    const genreText = genres.length > 1 
      ? `un mélange de ${genres.slice(0, -1).join(', ')} et ${genres[genres.length - 1]}`
      : genres[0];
    
    const moodText: Record<string, string> = {
      'energetic': 'énergique et dynamique',
      'relaxed': 'relaxante et apaisante',
      'festive': 'festive et joyeuse',
      'melancholic': 'mélancolique et introspective',
      'romantic': 'romantique et douce'
    };
    
    const tempoText: Record<string, string> = {
      'fast': 'au rythme soutenu',
      'medium': 'au tempo modéré',
      'slow': 'au rythme lent'
    };
    
    return `Une playlist ${moodText[mood] || 'variée'} ${tempoText[tempo] || ''} avec ${genreText}. Parfaite pour vous accompagner tout au long de la journée et correspondre à votre humeur.`;
  };
  
  const generateTitle = (mood: string, genres: string[]) => {
    // Générer un titre basé sur l'ambiance et les genres
    const moodTitles: Record<string, string[]> = {
      'energetic': ['Énergie Pure', 'Boost de Motivation', 'Dynamique'],
      'relaxed': ['Détente Absolue', 'Zen Attitude', 'Calme Intérieur'],
      'festive': ['Ambiance Festive', 'Célébration', 'Party Time'],
      'melancholic': ['Mélancolie', 'Introspection', 'Nostalgie'],
      'romantic': ['Romance', 'Moments Doux', 'Atmosphère Romantique']
    };
    
    const mainGenre = genres[0] || 'pop';
    const genreTitles: Record<string, string[]> = {
      'pop': ['Pop Vibes', 'Pop Culture', 'Pop Fusion'],
      'rock': ['Rock Attitude', 'Rock Classics', 'Rock Energy'],
      'hip-hop': ['Hip-Hop Flow', 'Rap Essentials', 'Urban Beats'],
      'electronic': ['Electro Mix', 'Electronic Pulse', 'Digital Waves'],
      'jazz': ['Jazz Mood', 'Jazz Classics', 'Smooth Jazz'],
      'classical': ['Classical Moments', 'Classical Gems', 'Orchestral Beauty'],
      'r&b': ['R&B Soul', 'Soul Vibes', 'R&B Essentials'],
      'metal': ['Metal Power', 'Heavy Riffs', 'Metal Intensity']
    };
    
    // Sélectionner aléatoirement un titre basé sur l'ambiance ou le genre
    const useMoodTitle = Math.random() > 0.5;
    const titles = useMoodTitle 
      ? moodTitles[mood] || ['Ma Playlist']
      : genreTitles[mainGenre] || ['Ma Playlist'];
    
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
  };
  
  const generateTracks = (genres: string[], mood: string, tempo: string) => {
    // Générer une liste de morceaux basée sur les paramètres
    const trackDatabase = [
      { id: "1", title: "Higher Power", artist: "Coldplay", duration: "3:26", genres: ['pop', 'rock'], mood: 'energetic', tempo: 'medium' },
      { id: "2", title: "Don't Start Now", artist: "Dua Lipa", duration: "3:03", genres: ['pop', 'dance'], mood: 'energetic', tempo: 'fast' },
      { id: "3", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", genres: ['pop', 'electronic'], mood: 'energetic', tempo: 'fast' },
      { id: "4", title: "Physical", artist: "Dua Lipa", duration: "3:42", genres: ['pop', 'dance'], mood: 'energetic', tempo: 'fast' },
      { id: "5", title: "Dance Monkey", artist: "Tones and I", duration: "3:29", genres: ['pop'], mood: 'energetic', tempo: 'medium' },
      { id: "6", title: "Levitating", artist: "Dua Lipa ft. DaBaby", duration: "3:23", genres: ['pop', 'dance'], mood: 'festive', tempo: 'medium' },
      { id: "7", title: "Save Your Tears", artist: "The Weeknd", duration: "3:35", genres: ['pop', 'r&b'], mood: 'melancholic', tempo: 'medium' },
      { id: "8", title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", genres: ['pop', 'rock'], mood: 'festive', tempo: 'medium' },
      { id: "9", title: "Circles", artist: "Post Malone", duration: "3:35", genres: ['pop', 'rock'], mood: 'melancholic', tempo: 'medium' },
      { id: "10", title: "Adore You", artist: "Harry Styles", duration: "3:27", genres: ['pop', 'rock'], mood: 'romantic', tempo: 'medium' },
      { id: "11", title: "Memories", artist: "Maroon 5", duration: "3:09", genres: ['pop'], mood: 'melancholic', tempo: 'slow' },
      { id: "12", title: "Someone You Loved", artist: "Lewis Capaldi", duration: "3:02", genres: ['pop'], mood: 'melancholic', tempo: 'slow' },
      { id: "13", title: "Before You Go", artist: "Lewis Capaldi", duration: "3:35", genres: ['pop'], mood: 'melancholic', tempo: 'slow' },
      { id: "14", title: "Lose You To Love Me", artist: "Selena Gomez", duration: "3:26", genres: ['pop'], mood: 'melancholic', tempo: 'slow' },
      { id: "15", title: "Everything I Wanted", artist: "Billie Eilish", duration: "4:05", genres: ['pop', 'electronic'], mood: 'melancholic', tempo: 'slow' },
      { id: "16", title: "Bad Guy", artist: "Billie Eilish", duration: "3:14", genres: ['pop', 'electronic'], mood: 'energetic', tempo: 'medium' },
      { id: "17", title: "Savage Love", artist: "Jawsh 685 & Jason Derulo", duration: "2:51", genres: ['pop', 'dance'], mood: 'festive', tempo: 'medium' },
      { id: "18", title: "Dynamite", artist: "BTS", duration: "3:19", genres: ['pop', 'dance'], mood: 'festive', tempo: 'fast' },
      { id: "19", title: "Mood", artist: "24kGoldn ft. Iann Dior", duration: "2:20", genres: ['hip-hop', 'pop'], mood: 'energetic', tempo: 'medium' },
      { id: "20", title: "Lonely", artist: "Justin Bieber & Benny Blanco", duration: "2:29", genres: ['pop'], mood: 'melancholic', tempo: 'slow' }
    ];
    
    // Filtrer les morceaux en fonction des paramètres
    const filteredTracks = trackDatabase.filter(track => {
      const genreMatch = track.genres.some(g => genres.includes(g));
      const moodMatch = track.mood === mood;
      const tempoMatch = track.tempo === tempo;
      
      // Utiliser une correspondance partielle pour avoir suffisamment de résultats
      return genreMatch || moodMatch || tempoMatch;
    });
    
    // Si pas assez de morceaux, ajouter des morceaux aléatoires
    if (filteredTracks.length < 8) {
      const remainingTracks = trackDatabase.filter(track => !filteredTracks.includes(track));
      const randomTracks = remainingTracks.sort(() => 0.5 - Math.random()).slice(0, 8 - filteredTracks.length);
      return [...filteredTracks, ...randomTracks];
    }
    
    // Limiter à 8-12 morceaux et mélanger l'ordre
    return filteredTracks.sort(() => 0.5 - Math.random()).slice(0, 8 + Math.floor(Math.random() * 5));
  };
  
  return {
    isGenerating,
    generatePlaylist
  };
}
