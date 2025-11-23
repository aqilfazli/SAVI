import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Bot, Leaf, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: (email: string) => void;
  onBackToHome: () => void;
}

export function LoginPage({ onNavigateToRegister, onLoginSuccess, onBackToHome }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would validate credentials against a backend
      // For demo purposes, we'll accept any valid email/password format
      
      if (rememberMe) {
        localStorage.setItem('saviRememberMe', email);
      } else {
        localStorage.removeItem('saviRememberMe');
      }

      toast.success('Login successful! Welcome back to SAVI 🌱');
      onLoginSuccess(email);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Leaf className="h-64 w-64 text-[#2E7D32] transform -rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Bot className="h-72 w-72 text-[#2E7D32] transform rotate-12" />
        </div>
      </div>

      {/* Back to Home Button */}
      <Button
        variant="ghost"
        onClick={onBackToHome}
        className="absolute top-6 left-6 hover:bg-white/50 rounded-xl z-20"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border-0 relative z-10">
        <div className="p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-[#1B5E20] mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>
              SAVI
            </h1>
            <p className="text-gray-600 text-sm">Smart Autonomous Vegetable Integrator</p>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2" style={{ fontSize: '28px', fontWeight: 600 }}>
              Welcome Back to SAVI
            </h2>
            <p className="text-gray-600">Monitor. Manage. Harvest smarter.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email / Username
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: undefined });
                }}
                className={`h-12 rounded-xl border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] transition-all ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: undefined });
                  }}
                  className={`h-12 rounded-xl border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] transition-all pr-10 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-[#2E7D32] data-[state=checked]:border-[#2E7D32]"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                onClick={() => toast.info('Password reset feature coming soon!')}
                className="text-sm text-[#2E7D32] hover:text-[#1B5E20] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] hover:from-[#45a049] hover:to-[#1B5E20] text-white rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? 'Logging in...' : 'Login'}
                {!isLoading && (
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-[#2E7D32] hover:text-[#1B5E20] transition-colors"
              type="button"
            >
              Register now
            </button>
          </p>
        </div>
      </Card>

      {/* Decorative Robot Icon */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4CAF50]/20 to-[#2E7D32]/20 flex items-center justify-center backdrop-blur-sm">
          <Bot className="h-10 w-10 text-[#2E7D32]" />
        </div>
      </div>
    </div>
  );
}
