import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Role } from '../utils/permissions';

interface RoleSwitcherProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const roles: { value: Role; label: string; color: string }[] = [
    { value: 'superadmin', label: 'Super Admin', color: 'bg-red-100 text-red-700' },
    { value: 'admin', label: 'Admin', color: 'bg-purple-100 text-purple-700' },
    { value: 'technician', label: 'Teknisi', color: 'bg-blue-100 text-blue-700' },
    { value: 'customer', label: 'Customer', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-white rounded-xl shadow-xl border-2 border-gray-200 p-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">
          🔧 Development: Ganti Role
        </p>
        <Select value={currentRole} onValueChange={(value: string) => onRoleChange(value as Role)}>
          <SelectTrigger className="w-48 rounded-lg border-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                <div className="flex items-center gap-2">
                  <Badge className={`${role.color} border`}>{role.label}</Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 italic">
          Hanya untuk development/testing
        </p>
      </div>
    </div>
  );
}
