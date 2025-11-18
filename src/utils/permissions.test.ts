import { describe, it, expect } from 'vitest';
import { can, canAny } from './permissions';

describe('permissions util', () => {
  it('superadmin has manage_system', () => {
    expect(can('superadmin', 'manage_system')).toBe(true);
  });

  it('customer does not have manage_system', () => {
    expect(can('customer', 'manage_system')).toBe(false);
  });

  it('canAny returns true if any permission matches', () => {
    expect(canAny('admin', ['manage_products', 'db_backup'])).toBe(true);
  });

  it('canAny returns false if none match', () => {
    expect(canAny('technician', ['manage_system', 'db_backup'])).toBe(false);
  });

  it('undefined role returns false', () => {
    expect(can(undefined, 'shop' as any)).toBe(false);
    expect(canAny(null, ['shop'])).toBe(false);
  });
});
