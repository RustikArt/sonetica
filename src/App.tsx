import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
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
    <div className="main-container">
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

      <div className="content-container">
        <div className="main-content">
          {activePage === 'home' && !showQuestionnaire && !showPlaylist && !showAuth && !showAdmin && (
            <div className="page-transition-enter-active">
              <section className="max-w-3xl mx-auto text-center mb-12 fade-in">
                <h2 className="text-4xl font-bold mb-4">Créez des playlists personnalisées</h2>
                <p className="text-xl mb-8">Répondez à quelques questions et laissez notre IA créer la playlist parfaite pour chaque moment.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <button 
                    className="btn-primary hover-scale"
                    onClick={() => startQuestionnaire('quick')}
                  >
                    Commencer
                  </button>
                  <button 
                    className="btn-secondary hover-scale"
                    onClick={() => startQuestionnaire('quick', true)}
                  >
                    <span className="surprise-animation"></span> Mode surprise
                  </button>
                </div>
                
                <div className="flex justify-center gap-4 mt-4">
                  <button 
                    className="btn-secondary"
                    onClick={() => startQuestionnaire('quick')}
                  >
                    Rapide (2 min)
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => startQuestionnaire('medium')}
                  >
                    Moyen (5 min)
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => startQuestionnaire('long')}
                  >
                    Complet (10 min)
                  </button>
                </div>
              </section>

              <section className="grid md:grid-cols-3 gap-8 mb-12 fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="card hover-scale">
                  <h3 className="text-xl font-bold mb-3">Questionnaire personnalisé</h3>
                  <p>Répondez à des questions simples sur vos goûts et besoins musicaux.</p>
                </div>
                <div className="card hover-scale">
                  <h3 className="text-xl font-bold mb-3">IA intelligente</h3>
                  <p>Notre IA analyse vos réponses pour créer une playlist parfaitement adaptée.</p>
                </div>
                <div className="card hover-scale">
                  <h3 className="text-xl font-bold mb-3">Partagez sur Spotify</h3>
                  <p>Publiez directement sur Spotify ou partagez avec vos amis.</p>
                </div>
              </section>

              <section className="card mb-12 fade-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-2xl font-bold mb-4">Comment ça marche ?</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-spotify-green text-white">1</div>
                      <h3 className="font-bold">Répondez aux questions</h3>
                    </div>
                    <p className="ml-11">Choisissez la durée du questionnaire et répondez à des questions sur vos préférences musicales.</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-spotify-green text-white">2</div>
                      <h3 className="font-bold">L'IA crée votre playlist</h3>
                    </div>
                    <p className="ml-11">Notre intelligence artificielle analyse vos réponses et génère une playlist personnalisée.</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-spotify-green text-white">3</div>
                      <h3 className="font-bold">Partagez et profitez</h3>
                    </div>
                    <p className="ml-11">Publiez sur Spotify, enregistrez dans Sonetica ou partagez avec vos amis.</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activePage === 'library' && (
            <div className="page-transition-enter-active">
              <h1 className="text-3xl font-bold mb-6 fade-in">Ma bibliothèque</h1>
              <div className="playlist-grid fade-in" style={{ animationDelay: '0.2s' }}>
                {/* 4. 🖼️ Affichage des playlists */}
                {userPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="playlist-card hover-scale"
                    onClick={() => {
                      setSelectedPlaylist(playlist);
                      setShowPlaylist(true);
                    }}
                  >
                    <Playlist key={playlist.id} {...playlist} />
                  </div>
                ))}
                <div 
                  className="playlist-card hover-scale flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleNavigate('create')}
                >
                  <div className="w-16 h-16 rounded-full bg-spotify-green flex items-center justify-center text-3xl mb-4">+</div>
                  <div className="text-center font-bold">Créer une nouvelle playlist</div>
                </div>
              </div>
            </div>
          )}

          {activePage === 'discover' && (
            <div className="page-transition-enter-active">
              <h1 className="text-3xl font-bold mb-6 fade-in">Découvrir</h1>
              
              <div className="mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-2xl font-bold mb-4">Playlists populaires</h2>
                <div className="playlist-grid">
                  {discoverPlaylists.slice(0, 4).map(playlist => (
                    <div key={playlist.id} className="playlist-card hover-scale" onClick={() => setShowPlaylist(true)}>
                      <div className="playlist-card-image bg-gray-700"></div>
                      <div className="playlist-card-title">{playlist.title}</div>
                      <div className="playlist-card-description">Par {playlist.creator}</div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span>{playlist.tracks} titres</span>
                        <span>❤️ {playlist.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8 fade-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-2xl font-bold mb-4">Nouveautés</h2>
                <div className="playlist-grid">
                  {discoverPlaylists.slice(2, 6).map(playlist => (
                    <div key={playlist.id} className="playlist-card hover-scale" onClick={() => setShowPlaylist(true)}>
                      <div className="playlist-card-image bg-gray-700"></div>
                      <div className="playlist-card-title">{playlist.title}</div>
                      <div className="playlist-card-description">Par {playlist.creator}</div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span>{playlist.tracks} titres</span>
                        <span>❤️ {playlist.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showQuestionnaire && (
            <div className="page-transition-enter-active">
              <QuestionnaireForm 
                duration={questionnaireDuration} 
                onComplete={handleQuestionnaireComplete} 
              />
            </div>
          )}

          {showPlaylist && selectedPlaylist && (
            <div className="page-transition-enter-active">
              <Playlist 
                title={selectedPlaylist.title}
                description={selectedPlaylist.description}
                tracks={selectedPlaylist.tracks}
                editable={true}
                onSaveToSpotify={handleSaveToSpotify}
                onShare={handleSharePlaylist}
                onRemoveTrack={handleRemoveTrack}
              />
              <div className="mt-6 text-center">
                <button 
                  className="btn-secondary hover-scale"
                  onClick={() => setShowPlaylist(false)}
                >
                  Retour
                </button>
              </div>
            </div>
          )}

          {showAuth && (
            <div className="page-transition-enter-active">
              <div className="max-w-md mx-auto">
                <AuthForm onSuccess={handleAuthSuccess} />
                <div className="mt-6 text-center">
                  <button 
                    className="btn-secondary hover-scale"
                    onClick={() => setShowAuth(false)}
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAdmin && (
            <div className="page-transition-enter-active">
              <div className="max-w-6xl mx-auto">
                <AdminPanel 
                  stats={adminStats}
                  publicPlaylists={publicPlaylists}
                  onDeletePlaylist={(id) => console.log('Delete playlist:', id)}
                  onToggleVip={(userId, isVip) => console.log('Toggle VIP:', userId, isVip)}
                />
                <div className="mt-6 text-center">
                  <button 
                    className="btn-secondary hover-scale"
                    onClick={() => setShowAdmin(false)}
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="footer theme-transition">
        <div className="footer-links">
          <button className="footer-link">Mentions légales</button>
          <button className="footer-link">Confidentialité</button>
          <button className="footer-link">Contact</button>
        </div>
        <div className="footer-copyright">
          © 2025 Sonetica. Tous droits réservés.
        </div>
      </footer>

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
