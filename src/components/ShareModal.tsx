import { useState } from 'react';

interface ShareModalProps {
  playlistTitle: string;
  playlistUrl: string;
  spotifyLink: string;
  onClose: () => void;
}

export default function ShareModal({ playlistTitle, playlistUrl, spotifyLink, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareOption, setShareOption] = useState<'link' | 'spotify' | 'email'>('link');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Découvre ma playlist "${playlistTitle}" sur Sonetica !`);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(playlistUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleSendEmail = () => {
    // Simuler l'envoi d'un email
    console.log('Sending email to:', email, 'with message:', message);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 fade-in">
      <div className="bg-dark-card dark:bg-dark-card light:bg-light-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Partager la playlist</h3>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="flex gap-2 mb-6">
          <button 
            className={`flex-1 py-2 rounded-md transition-colors ${shareOption === 'link' ? 'bg-spotify-green text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setShareOption('link')}
          >
            Lien
          </button>
          <button 
            className={`flex-1 py-2 rounded-md transition-colors ${shareOption === 'spotify' ? 'bg-spotify-green text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setShareOption('spotify')}
          >
            Spotify
          </button>
          <button 
            className={`flex-1 py-2 rounded-md transition-colors ${shareOption === 'email' ? 'bg-spotify-green text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setShareOption('email')}
          >
            Email
          </button>
        </div>
        
        {shareOption === 'link' && (
          <div className="fade-in">
            <p className="mb-4">Partagez votre playlist avec ce lien :</p>
            <div className="flex mb-4">
              <input 
                type="text" 
                className="form-input flex-1 rounded-r-none"
                value={playlistUrl}
                readOnly
              />
              <button 
                className={`px-4 py-2 rounded-l-none ${copied ? 'bg-green-600' : 'bg-spotify-green hover:bg-green-600'} text-white transition-colors`}
                onClick={handleCopyLink}
              >
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>
            <div className="text-center">
              <button 
                className="btn-secondary hover-scale"
                onClick={onClose}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
        
        {shareOption === 'spotify' && (
          <div className="fade-in">
            <p className="mb-4">Partagez votre playlist sur Spotify :</p>
            <div className="flex mb-4">
              <input 
                type="text" 
                className="form-input flex-1 rounded-r-none"
                value={spotifyLink}
                readOnly
              />
              <button 
                className={`px-4 py-2 rounded-l-none ${copied ? 'bg-green-600' : 'bg-spotify-green hover:bg-green-600'} text-white transition-colors`}
                onClick={() => {
                  navigator.clipboard.writeText(spotifyLink).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  });
                }}
              >
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>
            <div className="text-center">
              <a 
                href={spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hover-scale inline-block"
              >
                Ouvrir dans Spotify
              </a>
            </div>
          </div>
        )}
        
        {shareOption === 'email' && (
          <div className="fade-in">
            <p className="mb-4">Envoyez votre playlist par email :</p>
            <div className="mb-4">
              <label className="block mb-2">Email du destinataire</label>
              <input 
                type="email" 
                className="form-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Message</label>
              <textarea 
                className="form-input w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
            <div className="text-center">
              <button 
                className="btn-primary hover-scale"
                onClick={handleSendEmail}
                disabled={!email}
              >
                Envoyer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
