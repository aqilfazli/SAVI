import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  User,
  Mail,
  Calendar,
  Clock,
  ShoppingBag,
  Settings,
  Lock,
  LogOut,
  ChevronRight,
  Package,
  Wrench,
  BarChart,
} from 'lucide-react';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

interface ProfileDropdownProps {
  children: React.ReactNode;
  userData: UserData;
  onViewFullProfile: () => void;
  onLogout: () => void;
}

export function ProfileDropdown({ 
  children, 
  userData,
  onViewFullProfile,
  onLogout 
}: ProfileDropdownProps) {
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

  // Get last login time
  const lastLogin = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Recent activity based on role
  const getRecentActivity = () => {
    switch (userData.role) {
      case 'customer':
        return [
          { icon: ShoppingBag, text: 'Browsing smart sensors', subtext: 'Just now' },
          { icon: Package, text: 'Last order delivered', subtext: '2 days ago' },
        ];
      case 'technician':
        return [
          { icon: Wrench, text: 'Greenhouse calibration', subtext: 'Completed today' },
          { icon: Settings, text: 'Robot maintenance', subtext: 'In progress' },
        ];
      case 'admin':
        return [
          { icon: User, text: 'User management', subtext: 'Last updated today' },
          { icon: BarChart, text: 'Sales dashboard', subtext: 'Viewed 1h ago' },
        ];
      default:
        return [];
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-2xl border-0 shadow-2xl" align="end" sideOffset={8}>
        {/* Header Profile */}
        <div className="p-5 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 ring-4 ring-white/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-[#2E7D32]">
                {userData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-white truncate" style={{ fontSize: '16px', fontWeight: 600 }}>
                {userData.fullName}
              </h3>
              <Badge className={`${getRoleBadgeColor(userData.role)} border mt-1 text-xs`}>
                {getRoleLabel(userData.role)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-900 truncate">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm text-gray-900">{userData.joinDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Last Login</p>
                <p className="text-sm text-gray-900">Today at {lastLogin}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Recent Activity */}
        <div className="p-4">
          <h4 className="text-gray-900 mb-3 text-sm" style={{ fontWeight: 600 }}>
            Recent Activity
          </h4>
          <div className="space-y-2">
            {getRecentActivity().map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="p-4 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-between h-10 text-gray-700 hover:text-[#2E7D32] hover:bg-[#E8F5E9] rounded-xl group"
            onClick={onViewFullProfile}
          >
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              View Full Profile
            </span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start h-10 text-gray-700 hover:text-[#2E7D32] hover:bg-[#E8F5E9] rounded-xl"
          >
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start h-10 text-gray-700 hover:text-[#2E7D32] hover:bg-[#E8F5E9] rounded-xl"
          >
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>

        <Separator />

        {/* Logout */}
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
