import { useState, useEffect } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

interface HeaderProps {
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isLoggedIn?: boolean;
  userData?: UserData | null;
}

export function Header({ onLoginClick, onProfileClick, onLogout, onNavigate, currentPage = 'home', isLoggedIn = false, userData }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Monitoring', page: 'monitoring' },
    { label: 'Products', page: 'products' },
    { label: 'Forum', page: 'forum' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-[#1B5E20] tracking-wider" style={{ fontSize: '28px', fontWeight: 700 }}>
                SAVI
              </span>
              <span className="text-gray-600 text-xs -mt-1">
                Smart Autonomous Vegetable Integrator
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate?.(item.page)}
                className={`transition-colors ${
                  currentPage === item.page
                    ? 'text-[#4CAF50]'
                    : 'text-gray-700 hover:text-[#4CAF50]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            {isLoggedIn && userData ? (
              <button
                onClick={onProfileClick}
                className="relative group"
                title="Go to Profile"
              >
                <Avatar className="h-10 w-10 ring-2 ring-[#4CAF50]/30 hover:ring-[#4CAF50] transition-all cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
                    {userData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full h-3 w-3 border-2 border-white"></span>
              </button>
            ) : (
              <Button variant="ghost" size="icon" onClick={onLoginClick}>
                <User className="h-5 w-5" />
              </Button>
            )}
            
            {/* Login/Logout Button */}
            {!isLoggedIn ? (
              <Button 
                onClick={onLoginClick}
                className="hidden md:inline-flex bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
              >
                Login / Register
              </Button>
            ) : (
              <Button 
                onClick={onLogout}
                variant="outline"
                className="hidden md:inline-flex border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl"
              >
                Logout
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate?.(item.page);
                  }}
                  className={`text-left px-2 transition-colors ${
                    currentPage === item.page
                      ? 'text-[#4CAF50]'
                      : 'text-gray-700 hover:text-[#4CAF50]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {!isLoggedIn ? (
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick?.();
                  }}
                  className="bg-[#4CAF50] hover:bg-[#45a049] w-full rounded-xl"
                >
                  Login / Register
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onProfileClick?.();
                    }}
                    className="bg-[#4CAF50] hover:bg-[#45a049] w-full rounded-xl"
                  >
                    My Profile
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout?.();
                    }}
                    variant="outline"
                    className="border-2 border-red-200 text-red-600 hover:bg-red-50 w-full rounded-xl"
                  >
                    Logout
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}