// Gestionnaire d'expiration des playlists

interface ExpirationManagerProps {
  isVIP: boolean;
}

export default function ExpirationManager({ isVIP }: ExpirationManagerProps) {
  // Durée d'expiration en millisecondes
  const FREE_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 jours
  const VIP_EXPIRATION = 365 * 24 * 60 * 60 * 1000; // 365 jours
  
  // Vérifier si une playlist est expirée
  const isPlaylistExpired = (createdAt: string) => {
    const creationDate = new Date(createdAt).getTime();
    const currentDate = new Date().getTime();
    const expirationTime = isVIP ? VIP_EXPIRATION : FREE_EXPIRATION;
    
    return (currentDate - creationDate) > expirationTime;
  };
  
  // Calculer la date d'expiration d'une playlist
  const getExpirationDate = (createdAt: string) => {
    const creationDate = new Date(createdAt);
    const expirationTime = isVIP ? VIP_EXPIRATION : FREE_EXPIRATION;
    
    return new Date(creationDate.getTime() + expirationTime);
  };
  
  // Formater le temps restant avant expiration
  const getTimeRemaining = (createdAt: string) => {
    const creationDate = new Date(createdAt).getTime();
    const currentDate = new Date().getTime();
    const expirationTime = isVIP ? VIP_EXPIRATION : FREE_EXPIRATION;
    const remainingTime = expirationTime - (currentDate - creationDate);
    
    if (remainingTime <= 0) {
      return "Expirée";
    }
    
    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    
    if (days > 30) {
      const months = Math.floor(days / 30);
      return `${months} mois restants`;
    }
    
    return `${days} jours restants`;
  };
  
  // Simuler la suppression des playlists expirées
  const cleanupExpiredPlaylists = (playlists: any[]) => {
    return playlists.filter(playlist => !isPlaylistExpired(playlist.createdAt));
  };
  
  // Simuler le remixage d'une playlist (renouvellement de la date d'expiration)
  const remixPlaylist = (playlist: any) => {
    return {
      ...playlist,
      createdAt: new Date().toISOString(),
      isRemixed: true
    };
  };
  
  return {
    isPlaylistExpired,
    getExpirationDate,
    getTimeRemaining,
    cleanupExpiredPlaylists,
    remixPlaylist
  };
}
