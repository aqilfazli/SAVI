import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  ShoppingBag,
  Settings,
  Lock,
  Bell,
  LogOut,
  Edit,
  Package,
  Wrench,
  BarChart,
  Leaf,
  HelpCircle,
  Moon,
  Eye,
  EyeOff,
  MessageCircle,
  Camera,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

interface ProfilePageProps {
  userData: UserData | null;
  onBack: () => void;
  onLogout: () => void;
}

export function ProfilePage({ userData, onBack, onLogout }: ProfilePageProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState('');
  
  // Edit Profile Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    phone: '+1 (555) 234-5678',
    avatarUrl: '',
  });

  // Change Password Dialog
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center">
        <Card className="p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <p className="text-gray-600">Please login to view your profile.</p>
          <Button onClick={onBack} className="mt-4 bg-[#2E7D32] hover:bg-[#1B5E20]">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  // Extended user data
  const fullUserData = {
    ...userData,
    username: userData.email.split('@')[0],
    phone: editFormData.phone,
    lastLogin: 'Today at ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    avatar: profileAvatar || editFormData.avatarUrl,
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'technician':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // Role-based activities
  const getRecentActivities = () => {
    switch (userData.role) {
      case 'customer':
        return [
          { icon: ShoppingBag, title: 'Order #1234 - Smart IoT Sensor Kit', status: 'Delivered', date: 'Nov 1, 2025', amount: 'Rp 4.500.000' },
          { icon: Package, title: 'Order #1233 - Hydroponic Growing System', status: 'In Transit', date: 'Nov 2, 2025', amount: 'Rp 19.500.000' },
          { icon: ShoppingBag, title: 'Order #1232 - Automated Irrigation', status: 'Processing', date: 'Oct 28, 2025', amount: 'Rp 13.500.000' },
        ];
      case 'technician':
        return [
          { icon: Wrench, title: 'Greenhouse sensor calibration - Site A', status: 'Completed', date: 'Nov 1, 2025' },
          { icon: Settings, title: 'Robot harvesting arm maintenance', status: 'In Progress', date: 'Nov 2, 2025' },
          { icon: Wrench, title: 'Irrigation system installation - Site B', status: 'Scheduled', date: 'Nov 5, 2025' },
        ];
      case 'admin':
        return [
          { icon: User, title: 'Added 15 new users to the system', date: 'Nov 3, 2025' },
          { icon: Package, title: 'Updated product catalog (12 items)', date: 'Nov 2, 2025' },
          { icon: BarChart, title: 'Generated monthly sales report', date: 'Nov 1, 2025' },
        ];
      default:
        return [];
    }
  };

  const getActivityTitle = () => {
    switch (userData.role) {
      case 'customer':
        return 'Recent Orders';
      case 'technician':
        return 'Recent Maintenance Reports';
      case 'admin':
        return 'Recent Management Activities';
      default:
        return 'Recent Activities';
    }
  };

  // Handle Edit Profile Submit
  const handleEditProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!editFormData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (!editFormData.email.trim() || !/\S+@\S+\.\S+/.test(editFormData.email)) {
      toast.error('Valid email is required');
      return;
    }

    // Update profile avatar if changed
    if (editFormData.avatarUrl) {
      setProfileAvatar(editFormData.avatarUrl);
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully! 🎉');
      setIsEditDialogOpen(false);
      // In real app, would update userData through parent component
    }, 500);
  };

  // Handle Change Password Submit
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate old password
    if (!passwordFormData.oldPassword) {
      toast.error('Please enter your current password');
      return;
    }

    // Validate new password
    if (!passwordFormData.newPassword) {
      toast.error('Please enter a new password');
      return;
    }
    if (passwordFormData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordFormData.newPassword)) {
      toast.error('Password must contain uppercase, lowercase, and number');
      return;
    }

    // Validate confirm password
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Password changed successfully! 🔒');
      setIsPasswordDialogOpen(false);
      setPasswordFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 500);
  };

  // Handle Dark Mode Toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkModeEnabled(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      toast.success('Dark mode enabled 🌙');
    } else {
      document.documentElement.classList.remove('dark');
      toast.success('Light mode enabled ☀️');
    }
  };

  // Handle Contact Support (WhatsApp)
  const handleContactSupport = () => {
    const phoneNumber = '6285811083442'; // Format internasional tanpa +
    const message = encodeURIComponent('Hello, I need help with SAVI platform.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle Profile Picture Change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditFormData({ ...editFormData, avatarUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E8F5E9] to-[#C8E6C9] pt-20 pb-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-40 left-10">
          <Leaf className="h-32 w-32 text-[#2E7D32] transform -rotate-12" />
        </div>
        <div className="absolute bottom-40 right-10">
          <Leaf className="h-40 w-40 text-[#2E7D32] transform rotate-45" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50 rounded-xl"
        >
          ← Back to Home
        </Button>

        {/* 1. Header Profil */}
        <Card className="p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="h-32 w-32 ring-4 ring-[#4CAF50]/30">
              <AvatarImage src={fullUserData.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white" style={{ fontSize: '40px' }}>
                {fullUserData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            {/* Name and Role */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-gray-900 mb-2" style={{ fontSize: '36px', fontWeight: 700 }}>
                {editFormData.fullName}
              </h1>
              <Badge className={`${getRoleBadgeColor(userData.role)} border text-base px-4 py-1.5`}>
                {getRoleLabel(userData.role)}
              </Badge>
            </div>

            {/* Edit Profile Button */}
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white rounded-xl px-6 transition-all"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info & Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* 2. Informasi Akun */}
            <Card className="p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <h2 className="text-gray-900 mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>
                Account Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Full Name</p>
                    <p className="text-gray-900" style={{ fontWeight: 600 }}>
                      {editFormData.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Email</p>
                    <p className="text-gray-900 break-all" style={{ fontWeight: 600 }}>
                      {editFormData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Username</p>
                    <p className="text-gray-900" style={{ fontWeight: 600 }}>
                      {fullUserData.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Badge className={`${getRoleBadgeColor(userData.role)} w-12 h-12 rounded-xl flex items-center justify-center border-0`}>
                      <BarChart className="h-6 w-6" />
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Role</p>
                    <p className="text-gray-900" style={{ fontWeight: 600 }}>
                      {getRoleLabel(userData.role)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Join Date</p>
                    <p className="text-gray-900" style={{ fontWeight: 600 }}>
                      {fullUserData.joinDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Last Login</p>
                    <p className="text-gray-900" style={{ fontWeight: 600 }}>
                      {fullUserData.lastLogin}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:col-span-2">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Contact / Phone</p>
                    <p className="text-gray-900" style={{ fontWeight: 600 }}>
                      {editFormData.phone}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Aktivitas Terakhir */}
            <Card className="p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <h2 className="text-gray-900 mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>
                {getActivityTitle()}
              </h2>

              <div className="space-y-4">
                {getRecentActivities().map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 bg-[#F5F5F5] rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="h-6 w-6 text-[#2E7D32]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>
                          {activity.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-gray-500">{activity.date}</span>
                          {'status' in activity && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className={
                                activity.status === 'Delivered' || activity.status === 'Completed' ? 'text-green-600' :
                                activity.status === 'In Transit' || activity.status === 'In Progress' ? 'text-blue-600' :
                                'text-yellow-600'
                              }>
                                {activity.status}
                              </span>
                            </>
                          )}
                          {'amount' in activity && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-[#2E7D32]" style={{ fontWeight: 600 }}>
                                {activity.amount}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* 4. Pengaturan Akun */}
            <Card className="p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <h2 className="text-gray-900 mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>
                Account Settings
              </h2>

              <div className="space-y-4">
                {/* Edit Profile */}
                <button
                  onClick={() => setIsEditDialogOpen(true)}
                  className="w-full flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Edit className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <span className="text-gray-900" style={{ fontWeight: 600 }}>
                    Edit Profile
                  </span>
                </button>

                {/* Change Password */}
                <button
                  onClick={() => setIsPasswordDialogOpen(true)}
                  className="w-full flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Lock className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <span className="text-gray-900" style={{ fontWeight: 600 }}>
                    Change Password
                  </span>
                </button>

                {/* Notification Settings */}
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Bell className="h-5 w-5 text-[#2E7D32]" />
                      </div>
                      <span className="text-gray-900" style={{ fontWeight: 600 }}>
                        Notifications
                      </span>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={(checked) => {
                        setNotificationsEnabled(checked);
                        toast.success(checked ? 'Notifications enabled 🔔' : 'Notifications disabled 🔕');
                      }}
                    />
                  </div>
                  <p className="text-gray-500 text-sm ml-14">
                    Receive email and push notifications
                  </p>
                </div>

                {/* Dark Mode */}
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Moon className="h-5 w-5 text-[#2E7D32]" />
                      </div>
                      <span className="text-gray-900" style={{ fontWeight: 600 }}>
                        Dark Mode
                      </span>
                    </div>
                    <Switch
                      checked={darkModeEnabled}
                      onCheckedChange={handleDarkModeToggle}
                    />
                  </div>
                  <p className="text-gray-500 text-sm ml-14">
                    Switch to dark theme
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Logout Button */}
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl transition-all justify-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </Card>

            {/* 5. Bantuan */}
            <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] shadow-lg border-0 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
                    Need Help?
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Our support team is here to assist you with any questions.
                  </p>
                  <Button
                    onClick={handleContactSupport}
                    variant="secondary"
                    className="bg-white text-[#2E7D32] hover:bg-gray-100 rounded-xl"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1B5E20]" style={{ fontSize: '24px', fontWeight: 600 }}>
              Edit Profile
            </DialogTitle>
            <DialogDescription>
              Update your profile information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditProfileSubmit}>
            <div className="space-y-4 py-4">
              {/* Profile Picture Preview */}
              {editFormData.avatarUrl && (
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 ring-4 ring-[#4CAF50]/30">
                    <AvatarImage src={editFormData.avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
                      {editFormData.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="edit-fullName">Full Name</Label>
                <Input
                  id="edit-fullName"
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="+1 (555) 234-5678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-avatar">Profile Picture</Label>
                <div className="relative">
                  <Input
                    id="edit-avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="h-12 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setEditFormData({ ...editFormData, avatarUrl: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1B5E20]" style={{ fontSize: '24px', fontWeight: 600 }}>
              Change Password
            </DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one. Password must be at least 8 characters with uppercase, lowercase, and number.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePasswordSubmit}>
            <div className="space-y-4 py-4">
              {/* Old Password */}
              <div className="space-y-2">
                <Label htmlFor="old-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type={showOldPassword ? 'text' : 'password'}
                    value={passwordFormData.oldPassword}
                    onChange={(e) => setPasswordFormData({ ...passwordFormData, oldPassword: e.target.value })}
                    className="h-12 rounded-xl pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordFormData.newPassword}
                    onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                    className="h-12 rounded-xl pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordFormData.confirmPassword}
                    onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                    className="h-12 rounded-xl pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsPasswordDialogOpen(false);
                  setPasswordFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl"
              >
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}