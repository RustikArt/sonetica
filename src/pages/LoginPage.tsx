import { getSpotifyAuthUrl } from '../services/spotify';
import SpotifyLoginButton from '../components/auth/SpotifyLoginButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>
      <SpotifyLoginButton />
    </div>
  );
}