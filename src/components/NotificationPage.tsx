import { ArrowLeft, Bell, Check, X, Clock, ShoppingBag, MessageCircle, Lock, Activity, UserCheck, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

export interface Notification {
  id: string;
  type: 'monitoring' | 'order' | 'forum' | 'security' | 'system' | 'registration';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionType?: 'approve' | 'reject';
  actionData?: {
    userId: string;
    userName: string;
    userEmail: string;
  };
}

interface NotificationPageProps {
  userData: UserData | null;
  notifications: Notification[];
  onBack: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onApproveRegistration: (notification: Notification) => void;
  onRejectRegistration: (notification: Notification) => void;
}

export function NotificationPage({
  userData,
  notifications,
  onBack,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onApproveRegistration,
  onRejectRegistration,
}: NotificationPageProps) {
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'monitoring':
        return <Activity className="h-6 w-6 text-orange-500" />;
      case 'order':
        return <ShoppingBag className="h-6 w-6 text-blue-500" />;
      case 'forum':
        return <MessageCircle className="h-6 w-6 text-green-500" />;
      case 'security':
        return <Lock className="h-6 w-6 text-red-500" />;
      case 'registration':
        return <UserCheck className="h-6 w-6 text-purple-500" />;
      case 'system':
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  const renderNotificationCard = (notification: Notification) => (
    <Card
      key={notification.id}
      className={`p-6 rounded-2xl transition-all hover:shadow-md ${
        !notification.isRead ? 'bg-[#E8F5E9]/30 border-[#4CAF50]/20' : 'bg-white'
      }`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
            {getNotificationIcon(notification.type)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className={`${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <div className="h-3 w-3 rounded-full bg-[#4CAF50] flex-shrink-0 mt-1.5" />
            )}
          </div>
          
          <p className="text-gray-600 mb-3">{notification.message}</p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Clock className="h-4 w-4" />
            <span>{notification.time}</span>
          </div>

          {/* Action Buttons for Admin Registration */}
          {notification.type === 'registration' && notification.actionData && !notification.isRead && (
            <div className="flex gap-3 mb-3">
              <Button
                size="sm"
                onClick={() => onApproveRegistration(notification)}
                className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
              >
                <Check className="h-4 w-4 mr-2" />
                Setujui
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRejectRegistration(notification)}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
              >
                <X className="h-4 w-4 mr-2" />
                Tolak
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!notification.isRead && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onMarkAsRead(notification.id)}
                className="text-[#4CAF50] hover:text-[#2E7D32] hover:bg-[#E8F5E9] rounded-lg"
              >
                <Check className="h-4 w-4 mr-1" />
                Tandai Dibaca
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onDeleteNotification(notification.id);
                toast.success('Notifikasi dihapus');
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
            >
              <X className="h-4 w-4 mr-1" />
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#E8F5E9] flex items-center justify-center">
        <Card className="p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <p className="text-gray-600">Silakan login untuk melihat notifikasi.</p>
          <Button onClick={onBack} className="mt-4 bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl">
            Kembali
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#E8F5E9] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 hover:bg-gray-100 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali
          </Button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center shadow-lg">
                <Bell className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-[#1B5E20] mb-1">Notifikasi</h1>
                <p className="text-gray-600">
                  {unreadNotifications.length > 0
                    ? `${unreadNotifications.length} notifikasi belum dibaca`
                    : 'Semua notifikasi sudah dibaca'}
                </p>
              </div>
            </div>

            {unreadNotifications.length > 0 && (
              <Button
                onClick={onMarkAllAsRead}
                className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
              >
                <Check className="h-4 w-4 mr-2" />
                Tandai Semua Dibaca
              </Button>
            )}
          </div>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto mb-6 bg-white rounded-xl p-1 shadow-sm">
            <TabsTrigger value="all" className="rounded-lg">
              Semua ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-lg">
              Belum Dibaca ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="read" className="rounded-lg">
              Sudah Dibaca ({readNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all" className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="p-12 rounded-3xl bg-white text-center">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">Tidak Ada Notifikasi</h3>
                <p className="text-gray-500">Semua notifikasi akan muncul di sini</p>
              </Card>
            ) : (
              notifications.map(renderNotificationCard)
            )}
          </TabsContent>

          {/* Unread Notifications */}
          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <Card className="p-12 rounded-3xl bg-white text-center">
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">Semua Sudah Dibaca</h3>
                <p className="text-gray-500">Tidak ada notifikasi yang belum dibaca</p>
              </Card>
            ) : (
              unreadNotifications.map(renderNotificationCard)
            )}
          </TabsContent>

          {/* Read Notifications */}
          <TabsContent value="read" className="space-y-4">
            {readNotifications.length === 0 ? (
              <Card className="p-12 rounded-3xl bg-white text-center">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">Belum Ada yang Dibaca</h3>
                <p className="text-gray-500">Notifikasi yang sudah dibaca akan muncul di sini</p>
              </Card>
            ) : (
              readNotifications.map(renderNotificationCard)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
