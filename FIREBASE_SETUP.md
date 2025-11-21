# 🔥 Tutorial Firebase Authentication untuk SAVI

Tutorial lengkap untuk menghubungkan Login/Register Page ke Firebase Project Anda.

---

## **LANGKAH 1: Membuat Firebase Project**

### 1.1 Buka Firebase Console
- Kunjungi https://console.firebase.google.com/
- Klik tombol **"Add project"** atau **"Create a project"**

### 1.2 Isi Detail Project
```
Project name: SAVI (atau nama pilihan Anda)
Analytics location: Indonesia (IDN)
Billing: Enable Google Analytics (optional tapi recommended)
```

### 1.3 Tunggu Project Selesai Dibuat
- Firebase akan membuat project selama beberapa detik
- Setelah selesai, klik **"Continue"**

---

## **LANGKAH 2: Setup Authentication**

### 2.1 Buka Authentication Service
1. Di Firebase Console, pilih project Anda
2. Di sidebar kiri, klik **"Build"** → **"Authentication"**
3. Klik tab **"Sign-in method"**

### 2.2 Enable Email/Password Authentication
1. Klik **"Email/Password"** provider
2. Toggle **"Enable"** ke posisi ON
3. Di bagian "Email enumeration protection" pilih **"Do not enable"** (untuk dev)
4. Klik **"Save"**

### 2.3 (Optional) Enable Google Sign-in
1. Klik **"Google"** provider
2. Toggle **"Enable"** ke ON
3. Pilih project support email
4. Klik **"Save"**

---

## **LANGKAH 3: Setup Firestore Database**

### 3.1 Buka Firestore
1. Di sidebar, klik **"Build"** → **"Firestore Database"**
2. Klik tombol **"Create database"**

### 3.2 Konfigurasi Database
- **Location**: asia-southeast1 (atau pilihan terdekat)
- **Security rules**: Pilih **"Start in test mode"** (untuk development)
- Klik **"Create"**

### 3.3 Setup Security Rules (Optional untuk production)
Setelah database dibuat, buka tab **"Rules"** dan update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only owner can read/write
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public data
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

Klik **"Publish"**

---

## **LANGKAH 4: Dapatkan Firebase Config**

### 4.1 Buka Project Settings
1. Di Firebase Console, klik ikon ⚙️ (settings) di samping "Project Overview"
2. Pilih **"Project settings"**

### 4.2 Buka Tab "Your apps"
- Scroll ke bawah hingga melihat bagian **"Your apps"**
- Klik tombol **"</>  Web"** untuk menambah aplikasi web

### 4.3 Register App
```
App nickname: SAVI Web
Hosting: Skip untuk sekarang
```

Klik **"Register app"**

### 4.4 Copy Firebase Config
Anda akan melihat kode seperti ini:

```javascript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-YOUR_MEASUREMENT_ID"
};
```

**⚠️ PENTING**: Copy semua config ini, kita butuh di langkah berikutnya!

---

## **LANGKAH 5: Install Firebase SDK ke Project**

### 5.1 Install Firebase Package
```bash
cd "f:\Aqil Fazli\IPB University\semester 5\1projek robot sawi\webSAVI"
npm install firebase
```

### 5.2 Verifikasi instalasi
```bash
npm list firebase
```

---

## **LANGKAH 6: Setup Firebase Config di Project**

### 6.1 Buat file `src/firebase.ts`
File ini akan menjadi konfigurasi Firebase Anda.

**Content:**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Paste config Anda dari Langkah 4.4 di sini
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;
```

**GANTI semua `YOUR_*` dengan config dari Firebase Console Anda!**

---

## **LANGKAH 7: Setup AuthContext untuk Global State**

### 7.1 Buat file `src/contexts/AuthContext.tsx`

```typescript
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  userRole: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Signup function
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      // Create user account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user data ke Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: email,
        displayName: displayName,
        role: 'customer', // Default role
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      setCurrentUser(result.user);
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole(null);
    } catch (error) {
      throw error;
    }
  };

  // Setup auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Get user role dari Firestore
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
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
```

### 7.2 Update `src/main.tsx` untuk wrap app dengan AuthProvider

Cari file `src/main.tsx` dan lihat struktur saat ini:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Update menjadi:**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

---

## **LANGKAH 8: Update LoginPage.tsx**

Update file Anda untuk menggunakan Firebase auth. 

**Key points:**
- Import `useAuth` dari AuthContext
- Use form state untuk email & password
- Call `login()` dari AuthContext
- Redirect ke dashboard setelah login berhasil

---

## **LANGKAH 9: Update RegisterPage.tsx**

Sama seperti LoginPage, tapi gunakan `signup()` function dan tambahkan displayName field.

---

## **LANGKAH 10: Setup Protected Routes di App.tsx**

Tambahkan logic untuk hanya show dashboard jika user sudah login.

---

## **Testing Checklist**

✅ Firebase project sudah dibuat  
✅ Authentication enabled (Email/Password)  
✅ Firestore database dibuat  
✅ Firebase config sudah di-copy  
✅ npm install firebase done  
✅ src/firebase.ts dibuat dengan config  
✅ AuthContext dibuat  
✅ main.tsx di-wrap dengan AuthProvider  
✅ LoginPage & RegisterPage updated  
✅ Protected routes setup  
✅ Test signup dengan email baru  
✅ Test login dengan email yang sudah terdaftar  
✅ Test logout  

---

## **Troubleshooting**

### Error: "getAuth is not a function"
- Pastikan Firebase SDK sudah installed: `npm install firebase`
- Pastikan import di firebase.ts benar

### Error: "Firebase configuration required"
- Ganti `YOUR_API_KEY_HERE` dll dengan config actual dari Firebase Console
- Jangan lupa simpan file setelah edit

### Auth state tidak update di UI
- Pastikan component di-wrap dengan AuthProvider
- Pastikan menggunakan `useAuth()` hook dengan benar

### User tidak tersimpan di Firestore
- Check Firestore security rules
- Pastikan sudah di-enable "Write access" untuk authentication users

---

## **Next Steps**

Setelah Login/Register berfungsi:
1. Setup password reset functionality
2. Add email verification
3. Setup custom user profile fields
4. Add role-based access control (Admin, Technician, Customer)
5. Setup Google Sign-in
6. Add social media login options

---

**Butuh bantuan? Saya siap update kode sesuai Firebase config Anda!** 🚀
