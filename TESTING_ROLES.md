# 🧪 Testing Berbagai Role di Development

## Cara Menggunakan Role Switcher

Setelah `npm run dev`, ada sebuah **tombol floating di kanan bawah** layar (hanya saat login).

### **Langkah-Langkah Testing:**

1. **Login terlebih dahulu**
   - Klik "Login / Register" di halaman utama
   - Gunakan email & password apapun (test data)

2. **Setelah login, lihat kanan bawah**
   - Akan muncul dropdown "🔧 Development: Ganti Role"
   - Dropdown ini hanya muncul saat sudah login

3. **Pilih salah satu role:**
   - **Customer** (default)
   - **Teknisi** (Technician)
   - **Admin**
   - **Super Admin**

4. **Lihat perbedaan UI**
   - Buka Dropdown Profil → lihat menu berbeda per role
   - Buka Forum → check apakah tombol "Buat Post" berubah akses
   - Buka Admin Pages (jika ada akses)

---

## 📊 Perbedaan Tampilan Per Role

### **Customer View**
```
Dropdown Profil:
├── Account Settings
├── Change Password
└── Logout

Forum: Bisa buat post ✓
Shop: Bisa beli ✓
Monitoring: Bisa lihat ✓
```

### **Teknisi View**
```
Dropdown Profil:
├── Account Settings
├── Change Password
└── Logout

Forum: Bisa buat post ✓ (join diskusi teknis)
Monitoring: Bisa lihat ✓
Shop: Bisa lihat tapi tidak beli
```

### **Admin View**
```
Dropdown Profil:
├── Account Settings
├── Change Password
├── Kelola Produk ← BARU
└── Logout

Forum: Lihat semua, bisa hapus post/komentar
Monitoring: Lihat dan manage
```

### **Super Admin View**
```
Dropdown Profil:
├── Account Settings
├── Change Password
├── Kelola Produk ← BARU
├── Konfigurasi Sistem ← BARU
├── Kelola Admin ← BARU
└── Logout

Forum: Full control
Monitoring: Full control
Admin Pages: Akses ke Dashboard, Logs, Backup
```

---

## 🎯 Test Cases yang Bisa Dicoba

### ✅ Test 1: Dropdown Profil Berubah
**Steps:**
1. Login sebagai Customer
2. Buka dropdown profil → Lihat hanya 3 menu
3. Ganti role ke Admin via RoleSwitcher
4. Buka dropdown profil → Lihat menu tambah "Kelola Produk"
5. Ganti ke Super Admin → Lihat menu tambah "Konfigurasi Sistem", "Kelola Admin"

**Expected:** Menu berubah sesuai role ✓

---

### ✅ Test 2: Forum Post Creation
**Steps:**
1. Login sebagai Customer
2. Buka Forum → Lihat tombol "Buat Postingan Baru"
3. Ganti role ke Admin → Tombol tetap muncul (admin punya forum permission)

**Expected:** Tombol tetap/muncul sesuai permission ✓

---

### ✅ Test 3: Admin Dashboard Access
**Steps:**
1. Login sebagai Customer
2. Coba akses `/admin-dashboard` (ketik manual di URL)
3. Lihat pesan "Tidak diizinkan"
4. Ganti role ke Admin via RoleSwitcher
5. Refresh halaman → Akses diterima (atau navigate lewat Dropdown Profil)

**Expected:** Akses denied untuk non-admin, allowed untuk admin ✓

---

### ✅ Test 4: System Config (Super Admin Only)
**Steps:**
1. Login sebagai Customer
2. Ganti role ke Admin → Tidak lihat "Konfigurasi Sistem" di dropdown
3. Ganti role ke Super Admin → Lihat "Konfigurasi Sistem"
4. Click → Akses halaman config

**Expected:** Hanya Super Admin yang akses ✓

---

## 🔍 Debugging

Jika ada yang tidak berfungsi:

1. **Check Browser Console** (`F12` → Console)
   - Pastikan tidak ada error JavaScript

2. **Check Role di LocalStorage**
   - Buka DevTools → Application → LocalStorage
   - Cari `saviUser` → lihat property `role`

3. **Check RoleSwitcher Muncul**
   - Hanya muncul saat `isLoggedIn = true`
   - Jika tidak muncul, pastikan sudah login

4. **Refresh Browser**
   - Kadang perlu refresh untuk melihat perubahan

---

## 💡 Tips

- **RoleSwitcher hanya untuk development** — di production, role diambil dari backend
- **Perubahan disimpan di localStorage** — akan persisten sampai logout
- **Logout akan reset role ke default** — coba login ulang dengan role lain
- **Test di berbagai breakpoints** — mobile, tablet, desktop untuk compatibility

---

## 🚀 Bagaimana Production Nanti?

Di production (non-development), sistem akan:
1. User login di halaman login (backend validate)
2. Backend return role dari database
3. **Tidak ada RoleSwitcher** (hanya untuk dev)
4. Semua permission check tetap berjalan di frontend (UX)
5. **Backend enforce permission** pada setiap API call (security)

---

Selamat testing! Jika ada pertanyaan, cek documentation di `src/utils/permissions.ts` 🎉
