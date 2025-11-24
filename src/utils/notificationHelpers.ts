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

// Generate initial notifications based on role
export const getInitialNotificationsByRole = (role: 'customer' | 'technician' | 'admin'): Notification[] => {
  switch (role) {
    case 'customer':
      return [
        {
          id: '1',
          type: 'forum',
          title: 'Thread Anda Dibalas',
          message: 'Teknisi Sarah membalas thread "BAGAIMANA CARA MEMPERBAIKI RODA PADA ROBOT"',
          time: '5 menit yang lalu',
          isRead: false,
        },
        {
          id: '2',
          type: 'order',
          title: 'Pesanan Dikirim',
          message: 'Order #1234 - Smart IoT Sensor Kit sedang dalam perjalanan',
          time: '2 jam yang lalu',
          isRead: false,
        },
        {
          id: '3',
          type: 'monitoring',
          title: 'Peringatan Monitoring',
          message: 'Suhu greenhouse A melebihi batas normal (35°C)',
          time: '3 jam yang lalu',
          isRead: false,
        },
        {
          id: '4',
          type: 'security',
          title: 'Password Berhasil Diubah',
          message: 'Password akun Anda telah berhasil diubah. Gunakan password baru untuk login berikutnya.',
          time: '5 jam yang lalu',
          isRead: false,
        },
        {
          id: '5',
          type: 'order',
          title: 'Pesanan Diterima',
          message: 'Order #1233 - Hydroponic Growing System telah sampai di lokasi',
          time: '1 hari yang lalu',
          isRead: true,
        },
        {
          id: '6',
          type: 'forum',
          title: 'Thread Anda Dibalas',
          message: 'Mike Johnson membalas thread "SENSOR KELEMBABAN TIDAK AKURAT"',
          time: '2 hari yang lalu',
          isRead: true,
        },
      ];
    
    case 'technician':
      return [
        {
          id: '1',
          type: 'forum',
          title: 'Komentar Baru',
          message: 'Customer John membalas komentar Anda di forum',
          time: '10 menit yang lalu',
          isRead: false,
        },
        {
          id: '2',
          type: 'system',
          title: 'Tugas Maintenance Baru',
          message: 'Anda ditugaskan untuk kalibrasi sensor di Greenhouse B',
          time: '1 jam yang lalu',
          isRead: false,
        },
        {
          id: '3',
          type: 'forum',
          title: 'Pertanyaan Baru',
          message: 'Customer Sarah membuat thread baru tentang masalah robot panen',
          time: '4 jam yang lalu',
          isRead: false,
        },
        {
          id: '4',
          type: 'system',
          title: 'Tugas Selesai',
          message: 'Tugas maintenance "Robot harvesting arm" telah diselesaikan',
          time: '1 hari yang lalu',
          isRead: true,
        },
      ];
    
    case 'admin':
      return [
        {
          id: '1',
          type: 'registration',
          title: 'Permintaan Registrasi Teknisi',
          message: 'Ahmad Hidayat mengajukan registrasi sebagai teknisi',
          time: '15 menit yang lalu',
          isRead: false,
          actionType: 'approve',
          actionData: {
            userId: 'tech_001',
            userName: 'Ahmad Hidayat',
            userEmail: 'ahmad.hidayat@example.com',
          },
        },
        {
          id: '2',
          type: 'registration',
          title: 'Permintaan Registrasi Teknisi',
          message: 'Budi Santoso mengajukan registrasi sebagai teknisi',
          time: '1 jam yang lalu',
          isRead: false,
          actionType: 'approve',
          actionData: {
            userId: 'tech_002',
            userName: 'Budi Santoso',
            userEmail: 'budi.santoso@example.com',
          },
        },
        {
          id: '3',
          type: 'system',
          title: 'Laporan Bulanan',
          message: 'Laporan penjualan bulan November telah dibuat',
          time: '3 jam yang lalu',
          isRead: false,
        },
        {
          id: '4',
          type: 'system',
          title: 'Update Sistem',
          message: '12 produk baru ditambahkan ke katalog',
          time: '5 jam yang lalu',
          isRead: true,
        },
      ];
    
    default:
      return [];
  }
};

// Load notifications from localStorage
export const loadNotificationsFromStorage = (userId: string): Notification[] | null => {
  try {
    const stored = localStorage.getItem(`saviNotifications_${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading notifications from storage:', error);
  }
  return null;
};

// Save notifications to localStorage
export const saveNotificationsToStorage = (userId: string, notifications: Notification[]) => {
  try {
    localStorage.setItem(`saviNotifications_${userId}`, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications to storage:', error);
  }
};
