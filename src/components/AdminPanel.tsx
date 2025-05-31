import { useState } from 'react';

interface AdminPanelProps {
  stats: {
    totalUsers: number;
    totalPlaylists: number;
    activePlaylists: number;
    vipUsers: number;
  };
  publicPlaylists: Array<{
    id: string;
    title: string;
    creator: string;
    createdAt: string;
    views: number;
    likes: number;
  }>;
  onDeletePlaylist: (id: string) => void;
  onToggleVip: (userId: string, isVip: boolean) => void;
}

export default function AdminPanel({ stats, publicPlaylists, onDeletePlaylist }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'playlists' | 'users'>('stats');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les playlists en fonction du terme de recherche
  const filteredPlaylists = publicPlaylists.filter(playlist => 
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'stats'
                ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            Statistiques
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'playlists'
                ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('playlists')}
          >
            Playlists publiques
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Utilisateurs
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Statistiques générales</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs</div>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Playlists totales</div>
                <div className="text-2xl font-bold">{stats.totalPlaylists}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Playlists actives</div>
                <div className="text-2xl font-bold">{stats.activePlaylists}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs VIP</div>
                <div className="text-2xl font-bold">{stats.vipUsers}</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'playlists' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Playlists publiques</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-8 pr-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Créateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Vues
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      J'aime
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPlaylists.map((playlist) => (
                    <tr key={playlist.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{playlist.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {playlist.creator}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(playlist.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {playlist.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {playlist.likes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onDeletePlaylist(playlist.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Gestion des utilisateurs</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Cette section permettra de gérer les utilisateurs, d'attribuer des statuts VIP et de modérer les comptes.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    Cette fonctionnalité sera implémentée dans une prochaine version.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
