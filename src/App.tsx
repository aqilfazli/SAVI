import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { toast } from "sonner";
import { auth } from './firebase';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KeyFeatures } from './components/KeyFeatures';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';
import { MonitoringPage } from './components/MonitoringPage';
import { ProductsPage } from './components/ProductsPage';
import { ForumPage } from './components/ForumPage';
import { ThreadDetailPage } from './components/ThreadDetailPage';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'monitoring' | 'products' | 'forum' | 'thread-detail' | 'login' | 'register' | 'profile';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentThreadId, setCurrentThreadId] = useState<string>('');

  // Check if user is logged in on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const creationTime = user.metadata.creationTime ? new Date(user.metadata.creationTime) : new Date();
        const formattedJoinDate = creationTime.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const currentUserData: UserData = {
          fullName: user.displayName || 'User',
          email: user.email || '',
          // NOTE: 'role' is not a standard Firebase auth property.
          // You might need to store this in a database (like Firestore)
          // and retrieve it after login. For now, it's defaulted.
          role: 'customer',
          joinDate: formattedJoinDate,
        };
        setUserData(currentUserData);
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setUserData(null);
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentPage('home');
    } catch (error) {
      console.error("Error signing in: ", error);      
      if (error instanceof Error) {
        switch ((error as any).code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            toast.error('Email atau password salah.');
            break;
          default:
            toast.error('Gagal untuk login. Silakan coba lagi.');
        }
      }
      throw error; // Re-throw to be caught in LoginPage
    }
  };

  const handleRegisterSuccess = async (fullName: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile with the full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: fullName });
      }
      setCurrentPage('home');
    } catch (error) {
      console.error("Error signing up: ", error);      
      if (error instanceof Error) {
        switch ((error as any).code) {
          case 'auth/email-already-in-use':
            toast.error('Email ini sudah terdaftar.');
            break;
          case 'auth/weak-password':
            toast.error('Password terlalu lemah. Gunakan minimal 6 karakter.');
            break;
          case 'auth/invalid-email':
            toast.error('Format email tidak valid.');
            break;
          default:
            toast.error('Gagal untuk mendaftar. Silakan coba lagi.');
        }
      }
      throw error; // Re-throw to be caught in RegisterPage
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setCurrentPage('home');
    });
  };

  const handleNavigate = (page: string) => {
    // Protect monitoring page - require login
    if (page === 'monitoring' && !isLoggedIn) {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToThread = (threadId: string) => {
    setCurrentThreadId(threadId);
    setCurrentPage('thread-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render based on current page
  if (currentPage === 'login') {
    return (
      <>
        <LoginPage
          onNavigateToRegister={() => setCurrentPage('register')}
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => setCurrentPage('home')}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        <RegisterPage
          onNavigateToLogin={() => setCurrentPage('login')}
          onRegisterSuccess={handleRegisterSuccess}
          onBackToHome={() => setCurrentPage('home')}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'profile') {
    return (
      <>
        <ProfilePage
          userData={userData}
          onBack={() => setCurrentPage('home')}
          onLogout={handleLogout}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'forum') {
    return (
      <>
        <ForumPage
          userData={userData}
          isLoggedIn={isLoggedIn}
          onNavigateToThread={handleNavigateToThread}
          onBackToHome={() => setCurrentPage('home')}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
        <WhatsAppFloat />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'thread-detail') {
    return (
      <>
        <ThreadDetailPage
          threadId={currentThreadId}
          userData={userData}
          onBack={() => setCurrentPage('forum')}
        />
        <Toaster />
      </>
    );
  }

  // Main Layout with Header and Footer
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onLoginClick={() => setCurrentPage('login')}
        onProfileClick={() => setCurrentPage('profile')}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        userData={userData}
      />
      
      <main>
        {currentPage === 'home' && (
          <>
            <HeroSection 
              onNavigateToMonitoring={() => handleNavigate('monitoring')}
              onNavigateToProducts={() => setCurrentPage('products')}
            />
            <KeyFeatures />
          </>
        )}
        
        {currentPage === 'monitoring' && <MonitoringPage />}
        
        {currentPage === 'products' && <ProductsPage />}
      </main>
      
      <Footer />
      <WhatsAppFloat />
      <Toaster />
    </div>
  );
}