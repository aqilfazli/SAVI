import React from 'react';
import { Button } from './ui/button';
import { can } from '../utils/permissions';
import { UserData } from '../types/user';

interface Props { userData: UserData | null; onBack: () => void }

export default function LogsPage({ userData, onBack }: Props) {
  if (!can(userData?.role, 'view_all_logs')) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Tidak diizinkan</h2>
        <p>Anda tidak memiliki izin untuk melihat log aktivitas semua user.</p>
        <div className="mt-4">
          <Button onClick={onBack}>Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Log Aktivitas Global</h2>
      <p>Daftar log aktivitas akan ditampilkan di sini (placeholder).</p>
    </div>
  );
}
