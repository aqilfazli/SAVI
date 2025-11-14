import React from 'react';
import { Button } from './ui/button';
import { can } from '../utils/permissions';
import { UserData } from '../types/user';

interface Props { userData: UserData | null; onBack: () => void }

export default function BackupRestore({ userData, onBack }: Props) {
  if (!can(userData?.role, 'db_backup')) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Tidak diizinkan</h2>
        <p>Anda tidak memiliki izin untuk melakukan backup/restore database.</p>
        <div className="mt-4">
          <Button onClick={onBack}>Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Backup & Restore Database</h2>
      <p>Fitur backup & restore (placeholder). Hubungkan ke backend untuk operasi nyata.</p>
    </div>
  );
}
