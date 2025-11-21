# 📚 Firebase Authentication Implementation - Complete Tutorial

Anda sudah berhasil implement Firebase Authentication untuk SAVI! 🎉

---

## **📋 Apa yang Sudah Dilakukan:**

### 1. **Firebase Setup** ✅
- Created Firebase project structure
- Setup authentication & Firestore database

### 2. **Code Implementation** ✅
- `src/firebase.ts` - Firebase configuration
- `src/contexts/AuthContext.tsx` - Global auth state management
- `src/components/LoginPage.tsx` - Firebase login integration
- `src/components/RegisterPage.tsx` - Firebase signup integration
- `src/main.tsx` - AuthProvider wrapper

### 3. **Documentation** ✅
- `FIREBASE_SETUP.md` - Langkah-langkah lengkap setup
- `FIREBASE_QUICKSTART.md` - Quick start guide

---

## **⚙️ Cara Menggunakan:**

### **A. Setup Firebase Project (First Time Only)**

#### 1. Buka https://console.firebase.google.com/
#### 2. Klik "Add Project" → Isi nama: "SAVI"
#### 3. Enable Analytics (optional) → Continue
#### 4. Tunggu project dibuat

### **B. Enable Authentication**

1. Di Firebase Console: Build → Authentication
2. Sign-in method → Email/Password → Enable
3. Save

### **C. Create Firestore Database**

1. Build → Firestore Database
2. Create Database
3. Location: asia-southeast1
4. Start in test mode (untuk development)
5. Create

### **D. Copy Firebase Config**

1. Settings ⚙️ → Project Settings
2. Your Apps → Web app
3. Copy firebaseConfig object

### **E. Update `src/firebase.ts`**

Buka file dan ganti placeholder dengan config Anda:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // GANTI INI
  authDomain: "savi-xxxxx.firebaseapp.com", // GANTI INI
  projectId: "savi-xxxxx", // GANTI INI
  // ... dst
};
```

### **F. Run Development Server**

```bash
cd "f:\Aqil Fazli\IPB University\semester 5\1projek robot sawi\webSAVI"
npm run dev
```

### **G. Test Login/Register**

1. Klik "Register"
2. Isi: Email, Password, Nama
3. Klik "Create Account"
4. Lihat di Firebase Console → Firestore → users collection

---

## **🔐 How It Works (Behind the Scenes):**

### **Sign Up Flow:**
```
User Input (email, password, name)
    ↓
validateForm() - Check format
    ↓
signup(email, password, name) - Firebase Auth
    ↓
createUserWithEmailAndPassword()
    ↓
Save to Firestore users/{uid}
    ↓
Success! User logged in automatically
```

### **Login Flow:**
```
User Input (email, password)
    ↓
validateForm()
    ↓
login(email, password) - Firebase Auth
    ↓
signInWithEmailAndPassword()
    ↓
Fetch user data from Firestore
    ↓
Success! currentUser state updated
```

### **Logout Flow:**
```
signOut()
    ↓
currentUser = null
    ↓
userRole = null
    ↓
Navigate to login/home
```

---

## **📱 Components Structure:**

```
src/
├── firebase.ts                          # Firebase config
├── contexts/
│   └── AuthContext.tsx                  # Auth state management
├── components/
│   ├── LoginPage.tsx                    # Login UI + Firebase
│   ├── RegisterPage.tsx                 # Register UI + Firebase
│   └── ... other components
├── main.tsx                             # AuthProvider wrapper
└── App.tsx                              # Main app component
```

---

## **🎯 AuthContext Features:**

### **Available Hooks:**
```typescript
const { 
  currentUser,        // Current logged in user (Firebase User object)
  loading,            // Loading state during auth check
  signup,             // (email, password, displayName) => Promise
  login,              // (email, password) => Promise
  logout,             // () => Promise
  userRole,           // User's role from Firestore
  userDisplayName     // User's display name
} = useAuth();
```

### **Usage Example:**
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <p>Hello, {currentUser?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## **🔒 Security Best Practices:**

### **1. Never Expose API Keys**
❌ DON'T:
```bash
git add firebase.ts  # API key visible in code!
```

✅ DO:
```bash
# Create .env.local
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=...

# Update firebase.ts to use env vars
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  ...
};

# Add to .gitignore
echo ".env.local" >> .gitignore
```

### **2. Firestore Security Rules**

**Development (Test Mode):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // Allow all
    }
  }
}
```

**Production:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only user can read/write own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Products readable by all
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

---

## **🚀 Next Steps (Optional Enhancements):**

### **1. Email Verification**
```typescript
import { sendEmailVerification } from 'firebase/auth';

// After signup
const user = result.user;
await sendEmailVerification(user);
```

### **2. Password Reset**
```typescript
import { sendPasswordResetEmail } from 'firebase/auth';

await sendPasswordResetEmail(auth, email);
```

### **3. Google Sign-In**
```typescript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
```

### **4. Protected Routes**
```typescript
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;

  return children;
}
```

---

## **🐛 Troubleshooting:**

### **Problem: "Permission denied" error**
```
Solution: Update Firestore Security Rules to "Test Mode"
- Firebase Console → Firestore → Rules
- Change rules to allow read/write for testing
- Click Publish
```

### **Problem: User not saved in Firestore**
```
Solution: Check collections
- Firebase Console → Firestore → Collections
- Make sure "users" collection exists
- Check if documents are being created
```

### **Problem: Login not working**
```
Solution: Check Firebase config
- Verify all values in src/firebase.ts match Firebase Console
- Check browser console (F12) for error messages
- Verify Authentication is enabled in Firebase
```

### **Problem: "Cannot find module 'firebase'"**
```
Solution: Install Firebase SDK
npm install firebase
```

---

## **📊 File Structure:**

```
src/
├── firebase.ts (EDIT THIS: Add your Firebase config)
│
├── contexts/
│   └── AuthContext.tsx (✅ Already configured)
│       ├── useAuth() hook
│       ├── signup() function
│       ├── login() function
│       ├── logout() function
│       └── onAuthStateChanged() listener
│
├── components/
│   ├── LoginPage.tsx (✅ Firebase integrated)
│   ├── RegisterPage.tsx (✅ Firebase integrated)
│   └── ... other components
│
├── main.tsx (✅ AuthProvider wrapped)
│
└── App.tsx (Use useAuth() to get user data)
```

---

## **✅ Testing Checklist:**

Before going to production:

- [ ] Firebase Project created
- [ ] Authentication enabled
- [ ] Firestore Database created
- [ ] Config copied to `src/firebase.ts`
- [ ] `npm run dev` works without errors
- [ ] Register new user - data appears in Firestore
- [ ] Login with registered user works
- [ ] Logout clears user state
- [ ] TypeScript check passes: `npm run typecheck`
- [ ] ESLint check passes: `npm run lint`
- [ ] Build works: `npm run build`
- [ ] Code committed to Git

---

## **🎓 Key Concepts:**

### **AuthContext Pattern**
Provides centralized auth state for entire app. Any component can access:
```typescript
const { currentUser, login, signup, logout } = useAuth();
```

### **Firebase Auth Methods**
- `createUserWithEmailAndPassword()` - Register
- `signInWithEmailAndPassword()` - Login
- `signOut()` - Logout
- `onAuthStateChanged()` - Listen for auth changes

### **Firestore Collections**
- `/users/{uid}` - Store user profile data
- `/products/{id}` - Store product info
- `/orders/{id}` - Store order history

---

## **📞 Support:**

If you need help:

1. **Check Firebase Console** for auth/firestore status
2. **Review browser console** (F12) for error messages
3. **Check firestore-app.log** for detailed errors
4. **Verify security rules** match your use case
5. **Ensure config is correct** in src/firebase.ts

---

**Congratulations! 🎉 Firebase Authentication sudah live di SAVI!**

Next: Setup protected routes, add profile page, setup role-based access control.

Let me know if you need help with next steps! 🚀
