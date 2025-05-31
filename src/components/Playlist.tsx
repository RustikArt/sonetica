import { useState } from 'react';

interface PlaylistProps {
  title: string;
  description: string;
  tracks: Array<{
    id: string;
    title: string;
    artist: string;
    duration: string;
  }>;
  editable?: boolean;
  onSaveToSpotify?: () => void;
  onShare?: () => void;
  onRemoveTrack?: (id: string) => void;
}

export default function Playlist({ 
  title, 
  description, 
  tracks, 
  editable = false,
  onSaveToSpotify,
  onShare,
  onRemoveTrack
}: PlaylistProps) {
  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  
  const handleSaveDescription = () => {
    // Ici, on pourrait appeler une fonction pour sauvegarder la description
    setEditingDescription(false);
  };
  
  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-48 h-48 bg-gray-700 rounded-lg shadow-lg flex-shrink-0"></div>
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          
          {editingDescription ? (
            <div className="mb-4">
              <textarea
                className="form-input w-full mb-2"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <button 
                  className="btn-primary hover-scale"
                  onClick={handleSaveDescription}
                >
                  Enregistrer
                </button>
                <button 
                  className="btn-secondary hover-scale"
                  onClick={() => {
                    setEditingDescription(false);
                    setNewDescription(description);
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <p className="mb-4">
              {description}
              {editable && (
                <button 
                  className="ml-2 text-spotify-green hover:underline"
                  onClick={() => setEditingDescription(true)}
                >
                  Modifier
                </button>
              )}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Pop</span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Rock</span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Électro</span>
          </div>
          
          <div className="flex gap-2">
            {onSaveToSpotify && (
              <button 
                className="btn-primary hover-scale"
                onClick={onSaveToSpotify}
              >
                Enregistrer sur Spotify
              </button>
            )}
            
            {onShare && (
              <button 
                className="btn-secondary hover-scale"
                onClick={onShare}
              >
                Partager
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Titres</h3>
        
        <div className="mb-4">
          <div className="grid grid-cols-12 py-2 border-b border-gray-700 text-sm font-bold">
            <div className="col-span-1">#</div>
            <div className="col-span-5">TITRE</div>
            <div className="col-span-4">ARTISTE</div>
            <div className="col-span-1 text-right">DURÉE</div>
            {editable && <div className="col-span-1"></div>}
          </div>
          
          {tracks.map((track, index) => (
            <div 
              key={track.id} 
              className="grid grid-cols-12 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors playlist-item"
            >
              <div className="col-span-1 text-gray-400">{index + 1}</div>
              <div className="col-span-5 font-medium">{track.title}</div>
              <div className="col-span-4 text-gray-400">{track.artist}</div>
              <div className="col-span-1 text-right text-gray-400">{track.duration}</div>
              {editable && onRemoveTrack && (
                <div className="col-span-1 text-right">
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => onRemoveTrack(track.id)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-sm text-gray-400">
          {tracks.length} titres, {calculateTotalDuration(tracks)}
        </div>
      </div>
    </div>
  );
}

function calculateTotalDuration(tracks: Array<{ duration: string }>) {
  let totalMinutes = 0;
  let totalSeconds = 0;
  
  tracks.forEach(track => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    totalMinutes += minutes;
    totalSeconds += seconds;
  });
  
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;
  
  return `${totalMinutes} min ${totalSeconds} sec`;
}
