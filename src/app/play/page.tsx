import { AuthProvider } from '../../app/context/AuthContext';
import Game from '@/app/components/Game';

export default function Home() {
  return (
    <div>
      
      <AuthProvider>
        {/* <AuthWrapper> */}
        <Game />
        {/* </AuthWrapper> */}
      </AuthProvider>
    </div>

  );
}