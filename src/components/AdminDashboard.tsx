import React from 'react';
import { Button } from './ui/button';
import { can } from '../utils/permissions';
import { UserData } from '../types/user';

interface Props {
  userData: UserData | null;
  onBack: () => void;
}

export default function AdminDashboard({ userData, onBack }: Props) {
  if (!can(userData?.role, 'manage_admins') && !can(userData?.role, 'manage_system')) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Tidak diizinkan</h2>
        <p>Anda tidak memiliki izin untuk mengakses halaman Admin Dashboard.</p>
        <div className="mt-4">
          <Button onClick={onBack}>Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p className="mb-6">Ringkasan tujuan: kelola admin, konfigurasi sistem, laporan global, dan backup database.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Kelola Admin</h3>
          <p className="text-sm text-muted-foreground">Tambahkan/hapus atau ubah peran admin.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Konfigurasi Sistem</h3>
          <p className="text-sm text-muted-foreground">Sensor, API, dan parameter sistem.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Backup & Restore</h3>
          <p className="text-sm text-muted-foreground">Buat cadangan dan pulihkan database.</p>
        </div>
      </div>
    </div>
  );
}
