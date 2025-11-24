// Utility functions for managing notifications
// In a real app, this would interact with a backend API

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

// Mock function to add a notification
// In a real app, this would send to backend
export const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'isRead'>) => {
  // This is a placeholder - in real implementation, would dispatch to state management
  console.log('New notification:', notification);
  
  // Return the notification with generated id and timestamp
  return {
    ...notification,
    id: Date.now().toString(),
    time: 'Baru saja',
    isRead: false,
  };
};

// Helper functions to create specific notification types
export const createPasswordChangedNotification = () => {
  return addNotification({
    type: 'security',
    title: 'Password Berhasil Diubah',
    message: 'Password akun Anda telah berhasil diubah. Gunakan password baru untuk login berikutnya.',
  });
};

export const createOrderNotification = (orderNumber: string, status: string) => {
  return addNotification({
    type: 'order',
    title: `Order ${orderNumber}`,
    message: `Status pesanan Anda: ${status}`,
  });
};

export const createMonitoringNotification = (message: string) => {
  return addNotification({
    type: 'monitoring',
    title: 'Peringatan Monitoring',
    message: message,
  });
};

export const createForumReplyNotification = (replierName: string, threadTitle: string) => {
  return addNotification({
    type: 'forum',
    title: 'Thread Anda Dibalas',
    message: `${replierName} membalas thread "${threadTitle}"`,
  });
};
