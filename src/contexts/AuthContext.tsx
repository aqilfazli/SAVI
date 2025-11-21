import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthError,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toSafeString } from '../utils/string';

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  userRole: string | null;
  userDisplayName: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  // Signup function
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      // Create user account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: email,
        displayName: displayName,
        role: 'customer', // Default role
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      setCurrentUser(result.user);
      setUserDisplayName(displayName);
      setUserRole('customer');
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(authError.message);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(authError.message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole(null);
      setUserDisplayName(null);
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(authError.message);
    }
  };

  // Setup auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      // Debug log to help diagnose post-login rendering issues
      // (will appear in browser console)
      // eslint-disable-next-line no-console
      console.debug('Auth state changed:', user ? { uid: user.uid, email: user.email } : null);
      
      // Get user data from Firestore
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          // Log the raw Firestore document to help debugging
          // eslint-disable-next-line no-console
          console.debug('Firestore userDoc:', userDoc.exists() ? userDoc.data() : null);
          if (userDoc.exists()) {
            const data = userDoc.data();
            // Guard against non-primitive values coming from Firestore
            const role = data?.role ? String(data.role) : 'customer';
            const displayName = data?.displayName ? toSafeString(data.displayName) : toSafeString(user.email);
            setUserRole(role || 'customer');
            setUserDisplayName(displayName || toSafeString(user.email));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    userRole,
    userDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook untuk menggunakan AuthContext
export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
