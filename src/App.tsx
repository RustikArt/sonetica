import { useState } from 'react';
import Navbar from './components/Navbar';
import QuestionnaireForm from './components/QuestionnaireForm';
import AuthForm from './components/AuthForm';
import Playlist from './components/Playlist';
import ShareModal from './components/ShareModal';
import AdminPanel from './components/AdminPanel';
import './styles/spotify-theme.css';
import './styles/animations.css';

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    // Appliquer la classe au body pour les styles globaux
    document.body.className = theme === 'dark' ? 'light' : 'dark';
  };

  const handleQuestionnaireComplete = (answers: Record<number, any>) => {
    console.log('Questionnaire completed with answers:', answers);
    // Ici, nous traiterons les réponses et générerons la playlist
    setShowQuestionnaire(false);
    setShowPlaylist(true);
    // Rediriger vers la page de résultats ou afficher la playlist générée
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
    // Intégration avec Spotify pour sauvegarder la playlist
    alert('Cette fonctionnalité sera disponible prochainement !');
  };

  const handleRemoveTrack = (id: string) => {
    // Supprimer un morceau de la playlist
    console.log('Removing track:', id);
  };

  const handleNavigate = (page: 'home' | 'library' | 'create' | 'discover') => {
    setActivePage(page);
    
    // Réinitialiser les états en fonction de la navigation
    setShowQuestionnaire(page === 'create');
    setShowPlaylist(false);
    setShowAdmin(false);
    
    // Si on navigue vers "Créer", on peut optionnellement démarrer le questionnaire
    if (page === 'create' && !showQuestionnaire) {
      setShowQuestionnaire(true);
    }
  };

  // Données de démonstration pour la playlist
  const demoPlaylist = {
    title: "Ma playlist énergique",
    description: "Une playlist parfaite pour se motiver et rester énergique toute la journée. Mélange de pop, rock et électro pour garder le rythme.",
    tracks: [
      { id: "1", title: "Higher Power", artist: "Coldplay", duration: "3:26" },
      { id: "2", title: "Don't Start Now", artist: "Dua Lipa", duration: "3:03" },
      { id: "3", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
      { id: "4", title: "Physical", artist: "Dua Lipa", duration: "3:42" },
      { id: "5", title: "Dance Monkey", artist: "Tones and I", duration: "3:29" },
      { id: "6", title: "Levitating", artist: "Dua Lipa ft. DaBaby", duration: "3:23" },
      { id: "7", title: "Save Your Tears", artist: "The Weeknd", duration: "3:35" },
      { id: "8", title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54" }
    ]
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

  // Données de démonstration pour la bibliothèque
  const userPlaylists = [
    { id: "1", title: "Mes favoris", description: "Une collection de mes morceaux préférés", tracks: 12, createdAt: "2025-05-10" },
    { id: "2", title: "Pour courir", description: "Playlist dynamique pour mes sessions de jogging", tracks: 8, createdAt: "2025-05-15" },
    { id: "3", title: "Concentration", description: "Musique calme pour travailler efficacement", tracks: 15, createdAt: "2025-05-20" }
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
                    <span className="surprise-animation">🎲</span> Mode surprise
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
              
              {user ? (
                <div className="playlist-grid fade-in" style={{ animationDelay: '0.2s' }}>
                  {userPlaylists.map(playlist => (
                    <div key={playlist.id} className="playlist-card hover-scale" onClick={() => setShowPlaylist(true)}>
                      <div className="playlist-card-image bg-gray-700"></div>
                      <div className="playlist-card-title">{playlist.title}</div>
                      <div className="playlist-card-description">{playlist.description}</div>
                      <div className="mt-2 text-sm text-gray-400">{playlist.tracks} titres</div>
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
              ) : (
                <div className="text-center py-12 fade-in">
                  <p className="text-xl mb-6">Connectez-vous pour accéder à votre bibliothèque de playlists</p>
                  <button 
                    className="btn-primary hover-scale"
                    onClick={() => setShowAuth(true)}
                  >
                    Connexion
                  </button>
                </div>
              )}
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

          {showPlaylist && (
            <div className="page-transition-enter-active">
              <Playlist 
                title={demoPlaylist.title}
                description={demoPlaylist.description}
                tracks={demoPlaylist.tracks}
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
      {showShareModal && (
        <ShareModal
          playlistTitle={demoPlaylist.title}
          playlistUrl="https://sonetica.app/playlist/123456"
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
