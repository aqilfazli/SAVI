import { useState, useEffect } from 'react';
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
    const storedUser = localStorage.getItem('saviUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('saviUser');
      }
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    // Simulate getting user data from API
    const user: UserData = {
      fullName: 'John Anderson',
      email: email,
      role: 'customer',
      joinDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };

    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem('saviUser', JSON.stringify(user));
    setCurrentPage('home');
  };

  const handleRegisterSuccess = (fullName: string, email: string, role: 'customer' | 'technician' | 'admin') => {
    const user: UserData = {
      fullName,
      email,
      role,
      joinDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };

    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem('saviUser', JSON.stringify(user));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('saviUser');
    setCurrentPage('home');
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