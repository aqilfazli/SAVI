import React from 'react';
import { Button } from './ui/button';
import { can } from '../utils/permissions';
import { UserData } from '../types/user';

interface Props { userData: UserData | null; onBack: () => void }

export default function SystemConfig({ userData, onBack }: Props) {
  if (!can(userData?.role, 'manage_system')) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Tidak diizinkan</h2>
        <p>Anda tidak memiliki izin untuk mengakses Konfigurasi Sistem.</p>
        <div className="mt-4">
          <Button onClick={onBack}>Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Konfigurasi Sistem</h2>
      <p>Halaman konfigurasi sensor & API akan ditampilkan di sini (placeholder).</p>
    </div>
  );
}
