// Example Express middleware showing server-side enforcement of roles/permissions
// This is a *template* — adapt to your auth/token strategy (JWT/session).

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ROLE_PERMISSIONS, { Role, Permission } from '../src/utils/permissions';

// Example of an express Request that includes a user object populated by auth middleware
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: Role };
    }
  }
}

// Simple middleware to require authentication using a Bearer JWT
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    // Replace process.env.JWT_SECRET with your secret management
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'CHANGE_ME') as any;
    // expect payload to include user id/email/role
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Middleware factory to require specific permission
export function requirePermission(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const perms = ROLE_PERMISSIONS[user.role] || [];
    if (!perms.includes(permission)) return res.status(403).json({ error: 'Forbidden' });
    return next();
  };
}

// Example usage:
// const app = express();
// app.get('/admin/system', requireAuth, requirePermission('manage_system'), (req,res)=>{ res.json({ok:true}) })

// Notes for integration:
// - Ensure token signing/verification uses a secure secret (or public/private key pair).
// - Do not trust role claims from client-side; always verify server-side (from DB or signed token).
// - Implement token revocation/blacklist or short-lived tokens + refresh tokens for session control.
// - Log authorization failures for audit.
