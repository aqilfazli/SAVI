import { useState } from 'react';
import { Bell, Check, X, Clock, ShoppingBag, MessageCircle, Lock, Activity, UserCheck, Package, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { type Notification } from '../utils/notificationHelpers';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

interface NotificationDropdownProps {
  userData: UserData | null;
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onApproveRegistration?: (notification: Notification) => void;
  onRejectRegistration?: (notification: Notification) => void;
  onViewAll?: () => void;
}

export function NotificationDropdown({ 
  userData,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onApproveRegistration,
  onRejectRegistration,
  onViewAll,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'monitoring':
        return <Activity className="h-5 w-5 text-orange-500" />;
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'forum':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'security':
        return <Lock className="h-5 w-5 text-red-500" />;
      case 'registration':
        return <UserCheck className="h-5 w-5 text-purple-500" />;
      case 'system':
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const markAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const handleApproveRegistration = (notification: Notification) => {
    if (onApproveRegistration) {
      onApproveRegistration(notification);
    }
  };

  const handleRejectRegistration = (notification: Notification) => {
    if (onRejectRegistration) {
      onRejectRegistration(notification);
    }
  };

  if (!userData) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-[#E8F5E9] rounded-full"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-2 border-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0 rounded-2xl" align="end">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900">Notifikasi</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-[#4CAF50] hover:text-[#2E7D32] hover:bg-[#E8F5E9] h-8 px-3 rounded-lg"
              >
                Tandai semua dibaca
              </Button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-gray-500 text-sm">
              Anda memiliki {unreadCount} notifikasi belum dibaca
            </p>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Tidak ada notifikasi</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.isRead ? 'bg-[#E8F5E9]/30' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-[#4CAF50] flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>

                        {/* Action Buttons for Admin Registration */}
                        {notification.type === 'registration' && notification.actionData && !notification.isRead && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApproveRegistration(notification);
                              }}
                              className="h-8 bg-[#4CAF50] hover:bg-[#45a049] rounded-lg text-xs flex-1"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Setujui
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRejectRegistration(notification);
                              }}
                              className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg text-xs flex-1"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Tolak
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t bg-gray-50 rounded-b-2xl">
            <Button
              variant="ghost"
              className="w-full text-[#4CAF50] hover:text-[#2E7D32] hover:bg-[#E8F5E9] rounded-xl"
              onClick={() => {
                setIsOpen(false);
                if (onViewAll) {
                  onViewAll();
                }
              }}
            >
              Lihat Semua Notifikasi
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}