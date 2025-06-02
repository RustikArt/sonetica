import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import CreatePage from './pages/CreatePage';
import DiscoverPage from './pages/DiscoverPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuestionnaireForm from './components/QuestionnaireForm';
import AuthForm from './components/AuthForm';
import Playlist from './components/Playlist';
import ShareModal from './components/ShareModal';
import AdminPanel from './components/AdminPanel';
import './styles/spotify-theme.css';
import './styles/animations.css';
import { generatePlaylist } from './lib/AIGenerator';

// 1. 🧱 Playlist par défaut
const defaultPlaylist = {
  id: 'default-playlist',
  title: 'Découverte Sonetica',
  description: 'Une sélection de titres pour vous faire découvrir Sonetica',
  tracks: [
    { id: '1', title: 'Titre populaire 1', artist: 'Artiste 1', duration: '3:45' },
    { id: '2', title: 'Titre populaire 2', artist: 'Artiste 2', duration: '4:12' },
    { id: '3', title: 'Titre populaire 3', artist: 'Artiste 3', duration: '3:30' },
    { id: '4', title: 'Titre populaire 4', artist: 'Artiste 4', duration: '5:01' },
    { id: '5', title: 'Titre populaire 5', artist: 'Artiste 5', duration: '3:22' },
  ],
  coverImage: 'https://via.placeholder.com/300x300?text=Sonetica'
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activePage, setActivePage] = useState<'home' | 'library' | 'create' | 'discover'>('home');
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionnaireDuration, setQuestionnaireDuration] = useState<'quick' | 'medium' | 'long'>('quick');
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [, setIsSurpriseMode] = useState(false);

  // 2. 🎯 State pour les playlists utilisateur
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  // Ajoute ce state pour la playlist sélectionnée :
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);

  // 3. ⚡ Injecte la playlist par défaut si vide
  useEffect(() => {
    if (userPlaylists.length === 0) {
      setUserPlaylists([defaultPlaylist]);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.className = theme === 'dark' ? 'light' : 'dark';
  };

  const handleQuestionnaireComplete = async (responses: Record<number, any>) => {
    setShowQuestionnaire(false);

    // Génère la playlist personnalisée avec l'IA
    const aiTracks = await generatePlaylist(responses);

    // Crée un objet playlist à partir des réponses et des morceaux générés
    const newPlaylist = {
      id: `ai-playlist-${Date.now()}`,
      title: "Playlist personnalisée",
      description: "Playlist générée selon vos réponses.",
      tracks: aiTracks,
      coverImage: 'https://via.placeholder.com/300x300?text=Playlist+IA'
    };

    setSelectedPlaylist(newPlaylist);
    setShowPlaylist(true);
  };

  const startQuestionnaire = (duration: 'quick' | 'medium' | 'long', surprise: boolean = false) => {
    setQuestionnaireDuration(duration);
    setIsSurpriseMode(surprise);
    setShowQuestionnaire(true);
    setActivePage('create');
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleSharePlaylist = () => {
    setShowShareModal(true);
  };

  const handleSaveToSpotify = () => {
    alert('Cette fonctionnalité sera disponible prochainement !');
  };

  const handleRemoveTrack = (id: string) => {
    setUserPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === defaultPlaylist.id
          ? { ...playlist, tracks: playlist.tracks.filter((track: any) => track.id !== id) }
          : playlist
      )
    );
  };

  const handleNavigate = (page: 'home' | 'library' | 'create' | 'discover') => {
    setActivePage(page);
    setShowQuestionnaire(page === 'create');
    setShowPlaylist(false);
    setShowAdmin(false);
    if (page === 'create' && !showQuestionnaire) {
      setShowQuestionnaire(true);
    }
  };

  // Données de démonstration pour le panel admin
  const adminStats = {
    totalUsers: 1245,
    totalPlaylists: 3782,
    activePlaylists: 2891,
    vipUsers: 187
  };

  const publicPlaylists = [
    { id: "1", title: "Soirée d'été", creator: "alex92", createdAt: "2025-05-15", views: 342, likes: 78 },
    { id: "2", title: "Concentration maximale", creator: "studymaster", createdAt: "2025-05-18", views: 215, likes: 43 },
    { id: "3", title: "Workout intense", creator: "fitnessfreak", createdAt: "2025-05-20", views: 567, likes: 124 },
    { id: "4", title: "Détente du dimanche", creator: "chillvibes", createdAt: "2025-05-22", views: 189, likes: 56 },
    { id: "5", title: "Road trip", creator: "traveler23", createdAt: "2025-05-25", views: 423, likes: 97 }
  ];

  // Données de démonstration pour la découverte
  const discoverPlaylists = [
    { id: "1", title: "Tendances actuelles", creator: "Sonetica", likes: 1245, tracks: 20 },
    { id: "2", title: "Nouveautés de la semaine", creator: "Sonetica", likes: 876, tracks: 15 },
    { id: "3", title: "Classiques revisités", creator: "musiclover", likes: 543, tracks: 18 },
    { id: "4", title: "Ambiance café", creator: "chillmaster", likes: 987, tracks: 22 },
    { id: "5", title: "Soirée dansante", creator: "djmix", likes: 1532, tracks: 25 },
    { id: "6", title: "Acoustique & Unplugged", creator: "guitarman", likes: 765, tracks: 17 }
  ];

  // Appliquer la classe de thème au chargement
  document.body.className = theme;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onShowAuth={() => setShowAuth(true)}
        onLogout={() => setUser(null)}
        onShowAdmin={() => setShowAdmin(true)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/bibliotheque" element={<LibraryPage />} />
          <Route path="/creer" element={<CreatePage />} />
          <Route path="/decouvrir" element={<DiscoverPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      {/* Modales */}
      {showShareModal && selectedPlaylist && (
        <ShareModal
          playlistTitle={selectedPlaylist.title}
          playlistUrl={`https://sonetica.app/playlist/${selectedPlaylist.id}`}
          spotifyLink="https://open.spotify.com/playlist/123456"
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Bulle d'aide */}
      <div className="help-bubble">?</div>
    </div>
  );
}

export default App;
