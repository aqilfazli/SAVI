# 🚀 Quick Start: Firebase Login & Register Setup

Sudah selesai implementasi Firebase Authentication untuk SAVI! Berikut langkah terakhir untuk membuat semuanya berfungsi:

---

## **STEP 1: Copy Firebase Config Anda**

1. Buka https://console.firebase.google.com/
2. Pilih project Anda (SAVI atau sesuai nama)
3. Klik ⚙️ Settings → Project settings
4. Scroll ke bagian "Your apps" → Web app config
5. Copy config ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Ganti dengan milik Anda
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXX"
};
```

---

## **STEP 2: Update Firebase Config File**

1. Buka file: `src/firebase.ts`
2. Ganti `YOUR_API_KEY_HERE` dan yang lain dengan config dari Firebase Console
3. Save file

**File Location:** 
```
src/firebase.ts
```

---

## **STEP 3: Check Firestore Security Rules** (PENTING!)

Firestore security rules menentukan siapa yang bisa read/write data.

### Untuk Development (Test Mode):
```javascript
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }
```

### Untuk Production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only owner can access
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public products
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

---

## **STEP 4: Test Login & Register**

### Jalankan Dev Server:
```bash
npm run dev
```

### Test Flow:
1. **Register New User**
   - Klik "Register" → isi email, password, nama
   - Harus berhasil membuat akun di Firebase
   - User data otomatis tersimpan di Firestore

2. **Login**
   - Klik "Login" → gunakan email & password yang tadi
   - Seharusnya login berhasil

3. **Check Firestore**
   - Buka Firebase Console → Firestore → "users" collection
   - Lihat user yang baru terdaftar

---

## **FILES YANG SUDAH DIUPDATE:**

✅ `src/firebase.ts` - Firebase config  
✅ `src/contexts/AuthContext.tsx` - Authentication context  
✅ `src/main.tsx` - Wrapped dengan AuthProvider  
✅ `src/components/LoginPage.tsx` - Firebase login  
✅ `src/components/RegisterPage.tsx` - Firebase signup  
✅ `FIREBASE_SETUP.md` - Dokumentasi lengkap  

---

## **NEXT STEPS (Optional):**

### 1. Protect Routes
Update `src/App.tsx` untuk hanya show dashboard jika user sudah login:

```typescript
import { useAuth } from './contexts/AuthContext';

export function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser && currentPage === 'dashboard') {
    setCurrentPage('login');
  }

  // ... rest of component
}
```

### 2. Show User Info
Display nama & role user di Header/Profile:

```typescript
const { currentUser, userDisplayName, userRole } = useAuth();

// Di JSX:
<p>Welcome, {userDisplayName}!</p>
<p>Role: {userRole}</p>
```

### 3. Logout
Tambah logout button di Profile/Header:

```typescript
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Navigate to home or login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
```

### 4. Password Reset
Tambah forgot password functionality:

```typescript
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const handleForgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent!');
  } catch (error) {
    toast.error('Failed to send reset email');
  }
};
```

---

## **TROUBLESHOOTING:**

### ❌ Error: "Permission denied" saat signup/login
**Solusi:** 
- Pastikan Firestore Security Rules sudah set ke **"Test Mode"** untuk development
- Buka Firebase Console → Firestore → Rules → Update & Publish

### ❌ Error: "Firebase configuration required"
**Solusi:**
- Pastikan semua value di `src/firebase.ts` sudah diganti dengan config actual
- Jangan pakai placeholder seperti `YOUR_API_KEY_HERE`

### ❌ User tidak tersimpan di Firestore
**Solusi:**
- Check Firebase Console → Firestore → Collections → "users"
- Pastikan sudah ada collection "users"
- Jika belum ada, tambahkan dokumen manual atau buat melalui console

### ❌ Login page tidak menampilkan error saat login gagal
**Solusi:**
- Buka browser DevTools (F12) → Console tab
- Lihat error message yang detail
- Biasanya karena email tidak terdaftar atau password salah

---

## **SECURITY NOTES:**

⚠️ **Jangan commit apiKey ke Git!**

Cara aman:
1. Buat file `.env.local`:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

2. Update `src/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

3. Add `.env.local` ke `.gitignore`

---

## **TESTING CHECKLIST:**

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore database created
- [ ] Firebase config copied to `src/firebase.ts`
- [ ] npm install firebase done
- [ ] npm run dev berjalan tanpa error
- [ ] Register flow berfungsi (user tersimpan di Firebase)
- [ ] Login flow berfungsi
- [ ] User data tersimpan di Firestore collection "users"
- [ ] TypeScript & ESLint check passed
- [ ] Git commit & push

---

## **READY TO DEPLOY?**

Sebelum production:

1. **Update Security Rules** ke production mode (lihat STEP 3)
2. **Setup environment variables** dengan `.env` yang aman
3. **Test di staging** sebelum deploy ke production
4. **Enable email verification** untuk security lebih baik
5. **Setup password reset** untuk user experience lebih baik

---

**Butuh bantuan lebih lanjut? Tanya saja!** 🚀🌱
