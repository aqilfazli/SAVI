import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Bot, Leaf, Sprout, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: (fullName: string, email: string, role: 'customer' | 'technician' | 'admin') => void;
  onBackToHome: () => void;
}

export function RegisterPage({ onNavigateToLogin, onRegisterSuccess, onBackToHome }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as 'customer' | 'technician' | 'admin' | '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    terms?: string;
  }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors({ ...errors, [field]: undefined });
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms & Privacy Policy';
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
      toast.success(`Account created successfully! Welcome to SAVI, ${formData.fullName}! 🌱`);
      onRegisterSuccess(formData.fullName, formData.email, formData.role as 'customer' | 'technician' | 'admin');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10">
          <Sprout className="h-56 w-56 text-[#2E7D32] transform rotate-45" />
        </div>
        <div className="absolute bottom-10 left-10">
          <Leaf className="h-64 w-64 text-[#2E7D32] transform -rotate-45" />
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

      {/* Register Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border-0 relative z-10 my-8">
        <div className="p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] mb-4">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-[#1B5E20] mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>
              SAVI
            </h1>
            <p className="text-gray-600 text-sm">Smart Autonomous Vegetable Integrator</p>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2" style={{ fontSize: '28px', fontWeight: 600 }}>
              Join SAVI
            </h2>
            <p className="text-gray-600">Empowering Smart Farming Together.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`h-12 rounded-xl border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] transition-all ${
                  errors.fullName ? 'border-red-500' : ''
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`h-12 rounded-xl border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] transition-all pr-10 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700">
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className={`h-12 rounded-xl border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] ${
                  errors.role ? 'border-red-500' : ''
                }`}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer - Buy farming equipment</SelectItem>
                  <SelectItem value="technician">Technician - Provide maintenance</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => {
                    setAgreedToTerms(checked as boolean);
                    setErrors({ ...errors, terms: undefined });
                  }}
                  className={`border-gray-300 data-[state=checked]:bg-[#2E7D32] data-[state=checked]:border-[#2E7D32] mt-1 ${
                    errors.terms ? 'border-red-500' : ''
                  }`}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                >
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => toast.info('Terms & Privacy Policy will be shown here')}
                    className="text-[#2E7D32] hover:text-[#1B5E20]"
                  >
                    Terms & Privacy Policy
                  </button>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms}</p>
              )}
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] hover:from-[#45a049] hover:to-[#1B5E20] text-white rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? 'Creating Account...' : 'Create Account'}
                {!isLoading && (
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[#2E7D32] hover:text-[#1B5E20] transition-colors"
              type="button"
            >
              Login here
            </button>
          </p>
        </div>
      </Card>

      {/* Decorative Robot Harvesting Icon */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4CAF50]/20 to-[#2E7D32]/20 flex items-center justify-center backdrop-blur-sm">
          <Bot className="h-10 w-10 text-[#2E7D32]" />
        </div>
      </div>
    </div>
  );
}
