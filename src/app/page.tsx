import { AuthProvider, useAuth } from './context/AuthContext';
import Game from '@/app/components/Game';
import Navbar from './components/Home/Navbar';
import FirstSection from './components/Home/FirstSection';
import SecondSection from './components/Home/SecondSection';

export default function Home() {
  return (
    <div className='min-h-screen bg-[#060710] w-full'>
      <Navbar/>
      <FirstSection/>
      <SecondSection/>
    </div>
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