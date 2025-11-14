# 🎯 Quick Start: Testing Role-Based UI

## Cara Tercepat Lihat Perbedaan UI Per Role

### **1. Jalankan Development Server**
```bash
npm run dev
```

### **2. Login dengan Credentials Apapun**
- Email: `test@example.com`
- Password: `password` (atau apapun)
- Pilih Role di dialog register: **Customer**
- Klik Register/Login

### **3. Lihat Floating Button di Kanan Bawah**
```
🔧 Development: Ganti Role
```

### **4. Ganti Role & Perhatikan Perubahan**

| Klik | Perubahan |
|------|-----------|
| **Customer** | Menu dropdown normal (3 item) |
| **Teknisi** | Menu dropdown normal (3 item) |
| **Admin** | Dropdown + "Kelola Produk" (4 item) |
| **Super Admin** | Dropdown + 2 menu admin (5 item) |

### **5. Buka Dropdown Profil (klik Avatar di Top-Right)**
```
Lihat perubahan menu sesuai role yang dipilih ✓
```

---

## 🎬 Demo Cepat (30 detik)

1. `npm run dev` → Tunggu vite siap
2. Buka browser → `http://localhost:3000`
3. Klik "Login / Register"
4. Isi form → Klik Register (role: Customer)
5. Klik avatar di top-right → Lihat dropdown
6. Lihat tombol "🔧 Ganti Role" di kanan bawah
7. Ganti ke Admin → Buka dropdown lagi → Lihat "Kelola Produk" 🎉

---

## 🔐 Perbedaan Yang Terlihat

### **Customer**
- Dropdown profil: Settings + Logout
- Bisa lihat monitoring, forum, shop

### **Teknisi** 
- Dropdown profil: Settings + Logout
- Bisa lihat monitoring, join forum

### **Admin**
- Dropdown profil: Settings + **Kelola Produk** + Logout ⭐
- Akses ke manage forum, akun

### **Super Admin**
- Dropdown profil: Settings + **Kelola Produk** + **Konfigurasi Sistem** + Logout ⭐⭐
- Akses ke semua admin pages (Logs, Backup, Config)

---

## ⚡ Shortcut Testing

### Test: Lihat Halaman Admin
1. Login
2. Ganti ke **Super Admin** via RoleSwitcher
3. Buka dropdown profil
4. Klik **"Konfigurasi Sistem"** atau **"Kelola Admin"**
5. Lihat halaman admin ✓

### Test: Denied Access
1. Login sebagai **Customer**
2. Ketik di URL bar: `http://localhost:3000/#admin-dashboard` (atau manual navigate)
3. Lihat pesan **"Tidak diizinkan"** ✓

---

## 🐛 Troubleshooting

| Problem | Solusi |
|---------|--------|
| Tombol RoleSwitcher tidak muncul | Pastikan sudah login dulu |
| Menu dropdown tidak berubah | Refresh browser (Ctrl+R) |
| Halaman error saat ganti role | Cek console (F12 → Console) untuk error |
| Logout tapi tombol masih ada | Tombol otomatis hilang saat logout |

---

**Selamat testing!** 🚀 Jika sudah puas, baca file lengkap: `TESTING_ROLES.md`
