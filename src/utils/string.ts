export function toSafeString(value: unknown): string {
  if (typeof value === 'string') return value;
  try {
    if (value == null) return '';
    if (typeof (value as any).toString === 'function') return String((value as any).toString());
  } catch (e) {
    // ignore
  }
  return '';
}

export function getInitials(value: unknown): string {
  const s = toSafeString(value).trim();
  if (!s) return 'U';
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return s.charAt(0).toUpperCase();
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
