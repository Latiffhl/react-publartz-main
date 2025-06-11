# Blog CMS with Admin Dashboard 🚀

Ini adalah project **Blog CMS** modern dengan halaman **Admin Dashboard** yang dibangun menggunakan teknologi terbaru seperti **React**, **TypeScript**, **TailwindCSS**, **Vite**, **shadcn/ui**, **lucide-react**, serta didukung oleh **Clerk** untuk autentikasi dan **Supabase** sebagai database dan storage.  
Project ini telah **dideploy di Vercel** untuk performa maksimal.

---

## ✨ Fitur Utama

- 🔐 Autentikasi pengguna dengan Clerk (Sign In / Sign Up)
- 📂 CRUD Artikel Blog (Create, Read, Update, Delete)
- 🖥️ Halaman Admin Dashboard dengan UI interaktif
- 📝 Rich Text Editor untuk menulis dan mengedit artikel
- 🖼️ Upload gambar ke Supabase Storage
- 🎨 Ikon modern dengan lucide-react
- ⚡ Performa super cepat dengan Vite dan Vercel
- 🛡️ Proteksi halaman admin (hanya untuk user dengan role admin)
- 🌙 Mode gelap dan terang (opsional jika Anda implementasikan)

---

## ⚙️ Fitur Admin Dashboard
- 🔍 Melihat daftar artikel
- ➕ Menambah artikel baru
- ✏️ Mengedit artikel
- 🗑️ Menghapus artikel
- 🖼️ Upload dan preview gambar
- 🎨 Menggunakan lucide-react untuk ikon modern
- 🔐 Proteksi akses admin menggunakan Clerk dan validasi role

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, shadcn/ui, lucide-react
- **Authentication:** Clerk
- **Database & Storage:** Supabase
- **Routing:** React Router
- **Deployment:** Vercel

---

## 📂 Struktur Project

```plaintext
src/
├── components/       # Komponen UI reusable
├── pages/            # Halaman (Blog, Admin, Login, dsb)
├── hooks/            # Custom React Hooks
├── lib/              # Konfigurasi Clerk & Supabase
├── routes/           # Routing aplikasi
├── types/            # TypeScript types
├── utils/            # Helper functions
└── main.tsx          # Entry point aplikasi

🚀 Instalasi & Menjalankan Project
Clone repository:

bash

git clone https://github.com/username/nama-project.git
cd nama-project
Install dependencies:

bash

npm install
Setup environment variables:

bash

cp .env.example .env
Isi file .env Anda:

dotenv

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Jalankan project secara lokal:

bash

npm run dev
