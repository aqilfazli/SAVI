export type Role = 'superadmin' | 'admin' | 'technician' | 'customer';

export type Permission =
  | 'manage_admins'
  | 'manage_system'
  | 'view_all_logs'
  | 'manage_policies'
  | 'view_global_reports'
  | 'db_backup'
  | 'approve_technician'
  | 'deactivate_account'
  | 'manage_products'
  | 'manage_forum'
  | 'manage_monitoring'
  | 'view_user_reports'
  | 'view_maintenance_reports'
  | 'view_monitoring'
  | 'create_maintenance_report'
  | 'update_equipment'
  | 'view_maintenance_history'
  | 'shop'
  | 'report_issue'
  | 'review'
  | 'forum'
  | 'register'
  | 'login'
  | 'logout';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superadmin: [
    'manage_admins',
    'manage_system',
    'view_all_logs',
    'manage_policies',
    'view_global_reports',
    'db_backup',
  ],
  admin: [
    'approve_technician',
    'deactivate_account',
    'manage_products',
    'manage_forum',
    'manage_monitoring',
    'view_user_reports',
    'view_maintenance_reports',
  ],
  technician: [
    'view_monitoring',
    'create_maintenance_report',
    'update_equipment',
    'view_maintenance_history',
    'forum',
  ],
  customer: [
    'register',
    'login',
    'view_monitoring',
    'view_maintenance_history',
    'report_issue',
    'shop',
    'review',
    'forum',
    'logout',
  ],
};

// Check whether a role has a specific permission
export function can(role: Role | undefined | null, permission: Permission) {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role];
  return perms.includes(permission);
}

// Check whether role has ANY of the provided permissions
export function canAny(role: Role | undefined | null, permissions: Permission[]) {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role];
  return permissions.some((p) => perms.includes(p));
}

export default ROLE_PERMISSIONS;
