import React, { useState, useEffect, Suspense } from 'react';
import { Header } from './components/Header';
import AdminDashboard from './components/AdminDashboard';
import SystemConfig from './components/SystemConfig';
import LogsPage from './components/LogsPage';
import BackupRestore from './components/BackupRestore';
// Dev-only: lazy-load RoleSwitcher so it is not bundled in production
let DevRoleSwitcher: React.ComponentType<any> | null = null;
if (import.meta.env.DEV) {
  // React.lazy dynamic import — only evaluated in dev
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore dynamic import type
  DevRoleSwitcher = React.lazy(() => import('./components/RoleSwitcher'));
}
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
import { Toaster } from './components/ui/sonner';

import { UserData } from './types/user';
import { Role } from './utils/permissions';

type Page =
  | 'home'
  | 'monitoring'
  | 'products'
  | 'forum'
  | 'thread-detail'
  | 'login'
  | 'register'
  | 'profile'
  | 'admin-dashboard'
  | 'system-config'
  | 'logs'
  | 'backup-restore';

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
        // Error parsing user data; clear localStorage and continue
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

  const handleRegisterSuccess = (fullName: string, email: string, role: 'superadmin' | 'customer' | 'technician' | 'admin') => {
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
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToThread = (threadId: string) => {
    setCurrentThreadId(threadId);
    setCurrentPage('thread-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (role: Role) => {
    if (userData) {
      const updatedUser: UserData = { ...userData, role };
      setUserData(updatedUser);
      localStorage.setItem('saviUser', JSON.stringify(updatedUser));
    }
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
          onNavigateToThread={handleNavigateToThread}
          onBackToHome={() => setCurrentPage('home')}
        />
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
              onNavigateToMonitoring={() => setCurrentPage('monitoring')}
              onNavigateToProducts={() => setCurrentPage('products')}
            />
            <KeyFeatures />
          </>
        )}
        
        {currentPage === 'monitoring' && <MonitoringPage />}
        
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'admin-dashboard' && (
          <AdminDashboard userData={userData} onBack={() => setCurrentPage('home')} />
        )}
        {currentPage === 'system-config' && (
          <SystemConfig userData={userData} onBack={() => setCurrentPage('home')} />
        )}
        {currentPage === 'logs' && (
          <LogsPage userData={userData} onBack={() => setCurrentPage('home')} />
        )}
        {currentPage === 'backup-restore' && (
          <BackupRestore userData={userData} onBack={() => setCurrentPage('home')} />
        )}
      </main>
      
      <Footer />
      <Toaster />
      {isLoggedIn && import.meta.env.DEV && DevRoleSwitcher && (
        <Suspense fallback={null}>
          <DevRoleSwitcher currentRole={userData?.role || 'customer'} onRoleChange={handleRoleChange} />
        </Suspense>
      )}
    </div>
  );
}