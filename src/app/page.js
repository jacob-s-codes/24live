import { AuthProvider, useAuth } from '../app/context/AuthContext';
import Game from '@/app/components/Game';

export default function Home() {
  return (
    <AuthProvider>
      {/* <AuthWrapper> */}
        <Game />
      {/* </AuthWrapper> */}
    </AuthProvider>
  );
}

// function AuthWrapper({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator while auth state is being resolved
//   }

//   if (!user) {
//     return <div>Please sign in to access the game.</div>; // Restrict access if user is not authenticated
//   }

//   return <>{children}</>; // Render the children if authenticated
// }