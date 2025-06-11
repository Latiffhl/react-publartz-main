
import { BlogPost, AdminUser } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Panduan Lengkap Memulai Karir di Bidang Teknologi",
    slug: "panduan-lengkap-memulai-karir-teknologi",
    content: `
      <h2>Mengapa Teknologi Menjadi Pilihan Karir yang Menarik?</h2>
      <p>Industri teknologi terus berkembang pesat dan menawarkan berbagai peluang karir yang menjanjikan. Dari pengembangan aplikasi mobile hingga kecerdasan buatan, bidang teknologi menyediakan jalur karir yang beragam dan penuh tantangan.</p>
      
      <h3>1. Tentukan Bidang Minat Anda</h3>
      <p>Pertama-tama, Anda perlu menentukan bidang teknologi yang paling menarik bagi Anda:</p>
      <ul>
        <li><strong>Web Development:</strong> Membuat website dan aplikasi web</li>
        <li><strong>Mobile Development:</strong> Mengembangkan aplikasi mobile untuk iOS dan Android</li>
        <li><strong>Data Science:</strong> Menganalisis data untuk menghasilkan insights bisnis</li>
        <li><strong>Cybersecurity:</strong> Melindungi sistem dan data dari ancaman keamanan</li>
        <li><strong>DevOps:</strong> Mengelola infrastruktur dan deployment aplikasi</li>
      </ul>
      
      <h3>2. Mulai Belajar Fundamental</h3>
      <p>Setelah menentukan bidang minat, mulailah mempelajari fundamental yang diperlukan. Untuk web development, misalnya, Anda perlu menguasai HTML, CSS, dan JavaScript sebagai dasar.</p>
      
      <h3>3. Bangun Portfolio</h3>
      <p>Portfolio adalah hal yang sangat penting dalam dunia teknologi. Buatlah proyek-proyek yang dapat menunjukkan kemampuan Anda kepada calon employer.</p>
      
      <h3>4. Networking dan Komunitas</h3>
      <p>Bergabunglah dengan komunitas developer, hadiri meetup, dan bangun network dengan profesional di bidang teknologi.</p>
    `,
    summary: "Panduan komprehensif untuk memulai karir di bidang teknologi, mulai dari menentukan bidang minat hingga tips membangun portfolio yang menarik.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    category: "Teknologi",
    author: "Ahmad Rizki",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    published: true
  },
  {
    id: 2,
    title: "Strategi Digital Marketing untuk UMKM di Era Modern",
    slug: "strategi-digital-marketing-umkm-era-modern",
    content: `
      <h2>Mengapa Digital Marketing Penting untuk UMKM?</h2>
      <p>Di era digital saat ini, kehadiran online bukan lagi pilihan tetapi kebutuhan untuk semua bisnis, termasuk UMKM. Digital marketing memberikan kesempatan bagi UMKM untuk bersaing dengan perusahaan besar dengan biaya yang relatif terjangkau.</p>
      
      <h3>1. Membangun Kehadiran Online yang Kuat</h3>
      <p>Langkah pertama adalah membangun fondasi digital yang solid:</p>
      <ul>
        <li>Website yang responsif dan user-friendly</li>
        <li>Profil media sosial yang konsisten</li>
        <li>Google My Business yang teroptimasi</li>
      </ul>
      
      <h3>2. Content Marketing yang Efektif</h3>
      <p>Buatlah konten yang valuable dan relevan untuk target audience Anda. Konten yang baik tidak hanya mempromosikan produk, tetapi juga memberikan solusi untuk masalah yang dihadapi customer.</p>
      
      <h3>3. Memanfaatkan Media Sosial</h3>
      <p>Setiap platform media sosial memiliki karakteristik yang berbeda:</p>
      <ul>
        <li><strong>Instagram:</strong> Visual content, stories, reels</li>
        <li><strong>Facebook:</strong> Community building, event promotion</li>
        <li><strong>TikTok:</strong> Video pendek yang viral</li>
        <li><strong>LinkedIn:</strong> B2B networking dan content</li>
      </ul>
      
      <h3>4. Email Marketing</h3>
      <p>Email marketing masih menjadi salah satu channel digital marketing dengan ROI tertinggi. Bangun email list dan kirimkan konten yang valuable secara konsisten.</p>
    `,
    summary: "Strategi praktis digital marketing untuk UMKM, termasuk tips membangun kehadiran online dan memanfaatkan berbagai platform digital untuk meningkatkan penjualan.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Marketing",
    author: "Sari Dewi",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
    published: true
  },
  {
    id: 3,
    title: "Tren Desain UI/UX 2024: Apa yang Perlu Diketahui Designer",
    slug: "tren-desain-ui-ux-2024-designer",
    content: `
      <h2>Evolusi Desain UI/UX di Tahun 2024</h2>
      <p>Tahun 2024 membawa perubahan signifikan dalam dunia desain UI/UX. Dengan kemajuan teknologi dan perubahan perilaku user, designer perlu mengikuti tren terbaru untuk menciptakan pengalaman yang optimal.</p>
      
      <h3>1. Minimalism 2.0</h3>
      <p>Minimalism berkembang menjadi lebih sophisticated dengan fokus pada functional simplicity. Trend ini menekankan pada:</p>
      <ul>
        <li>White space yang lebih strategic</li>
        <li>Typography yang bold dan expressive</li>
        <li>Color palette yang limited tapi impactful</li>
      </ul>
      
      <h3>2. AI-Powered Personalization</h3>
      <p>Artificial Intelligence semakin terintegrasi dalam UX design, memungkinkan personalisasi yang lebih dalam dan adaptive interfaces yang belajar dari perilaku user.</p>
      
      <h3>3. Sustainable Design</h3>
      <p>Eco-friendly design bukan hanya tentang visual, tetapi juga tentang performance optimization dan reduced carbon footprint dari digital products.</p>
      
      <h3>4. Voice User Interface (VUI)</h3>
      <p>Dengan meningkatnya penggunaan voice assistants, designer perlu mempertimbangkan voice interactions dalam design system mereka.</p>
      
      <h3>5. Glassmorphism dan Neumorphism</h3>
      <p>Kedua trend visual ini memberikan depth dan dimensi baru pada interface design, menciptakan pengalaman yang lebih immersive.</p>
    `,
    summary: "Eksplorasi tren terbaru dalam desain UI/UX untuk tahun 2024, termasuk minimalism 2.0, AI personalization, dan sustainable design yang perlu dikuasai designer modern.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    category: "Desain",
    author: "Budi Santoso",
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
    published: true
  },
  {
    id: 4,
    title: "Membangun Startup yang Sustainable: Lessons dari Unicorn Indonesia",
    slug: "membangun-startup-sustainable-lessons-unicorn-indonesia",
    content: `
      <h2>Belajar dari Kesuksesan Unicorn Indonesia</h2>
      <p>Indonesia telah melahirkan beberapa unicorn yang sukses dalam berbagai bidang. Dari Gojek hingga Tokopedia, ada banyak pelajaran berharga yang bisa dipetik untuk membangun startup yang sustainable.</p>
      
      <h3>1. Problem-Solution Fit yang Kuat</h3>
      <p>Semua unicorn Indonesia dimulai dengan mengidentifikasi masalah nyata yang dihadapi masyarakat lokal:</p>
      <ul>
        <li><strong>Gojek:</strong> Mengatasi masalah transportasi dan delivery</li>
        <li><strong>Tokopedia:</strong> Memberikan akses e-commerce untuk UMKM</li>
        <li><strong>Traveloka:</strong> Mempermudah booking travel online</li>
      </ul>
      
      <h3>2. Eksekusi yang Konsisten</h3>
      <p>Ide bagus saja tidak cukup. Yang membedakan unicorn dengan startup lainnya adalah kemampuan eksekusi yang konsisten dan adaptasi terhadap perubahan pasar.</p>
      
      <h3>3. Membangun Ekosistem</h3>
      <p>Unicorn tidak hanya membangun produk, tetapi juga ekosistem yang saling menguntungkan untuk semua stakeholder - user, merchant, driver, dan partner.</p>
      
      <h3>4. Technology First Mindset</h3>
      <p>Semua unicorn Indonesia menempatkan teknologi sebagai core competitive advantage, bukan hanya sebagai tool pendukung.</p>
      
      <h3>5. Local Insights, Global Standards</h3>
      <p>Memahami nuansa lokal sambil menerapkan standar global dalam hal teknologi, governance, dan business practices.</p>
    `,
    summary: "Analisis mendalam tentang faktor-faktor kesuksesan unicorn Indonesia dan bagaimana entrepreneur bisa menerapkan lessons learned untuk membangun startup yang sustainable.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    category: "Bisnis",
    author: "Maya Sari",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
    published: true
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices untuk Remote Work",
    slug: "cybersecurity-best-practices-remote-work",
    content: `
      <h2>Keamanan Cyber di Era Remote Work</h2>
      <p>Remote work telah menjadi norma baru, tetapi juga membawa tantangan keamanan yang unik. Artikel ini akan membahas best practices untuk menjaga keamanan data dan sistem saat bekerja dari rumah.</p>
      
      <h3>1. Secure Network Connection</h3>
      <p>Pastikan koneksi internet Anda aman:</p>
      <ul>
        <li>Gunakan VPN untuk mengakses company resources</li>
        <li>Hindari public Wi-Fi untuk aktivitas sensitif</li>
        <li>Set up dedicated work network di rumah</li>
      </ul>
      
      <h3>2. Device Security</h3>
      <p>Amankan semua perangkat yang digunakan untuk bekerja:</p>
      <ul>
        <li>Install security updates secara rutin</li>
        <li>Gunakan strong passwords dan 2FA</li>
        <li>Enable device encryption</li>
        <li>Install reputable antivirus software</li>
      </ul>
      
      <h3>3. Data Protection</h3>
      <p>Lindungi data perusahaan dengan:</p>
      <ul>
        <li>Regular backup ke cloud storage yang secure</li>
        <li>Gunakan encrypted file sharing tools</li>
        <li>Implement data classification</li>
      </ul>
      
      <h3>4. Security Awareness</h3>
      <p>Stay vigilant terhadap:</p>
      <ul>
        <li>Phishing emails dan social engineering</li>
        <li>Suspicious links dan attachments</li>
        <li>Fake software updates</li>
      </ul>
    `,
    summary: "Panduan komprehensif untuk menjaga keamanan cyber saat remote work, termasuk tips secure network, device protection, dan data security best practices.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    category: "Teknologi",
    author: "Andi Pratama",
    created_at: "2024-02-05T00:00:00Z",
    updated_at: "2024-02-05T00:00:00Z",
    published: true
  },
  {
    id: 6,
    title: "E-commerce Trends 2024: Masa Depan Belanja Online",
    slug: "ecommerce-trends-2024-masa-depan-belanja-online",
    content: `
      <h2>Transformasi E-commerce di Tahun 2024</h2>
      <p>Industry e-commerce terus berkembang dengan cepat. Tahun 2024 membawa inovasi baru yang akan mengubah cara konsumen berbelanja online dan bagaimana bisnis beroperasi di ruang digital.</p>
      
      <h3>1. Social Commerce Revolution</h3>
      <p>Integrasi yang semakin dalam antara social media dan e-commerce:</p>
      <ul>
        <li>Live shopping di Instagram dan TikTok</li>
        <li>In-app purchasing tanpa leave platform</li>
        <li>Influencer-driven commerce</li>
      </ul>
      
      <h3>2. AI-Powered Shopping Experience</h3>
      <p>Artificial Intelligence mengubah cara customer berinteraksi dengan online stores:</p>
      <ul>
        <li>Personalized product recommendations</li>
        <li>AI chatbots untuk customer service</li>
        <li>Visual search dan AR try-on</li>
      </ul>
      
      <h3>3. Sustainable E-commerce</h3>
      <p>Konsumen semakin peduli dengan sustainability:</p>
      <ul>
        <li>Eco-friendly packaging</li>
        <li>Carbon-neutral shipping options</li>
        <li>Circular economy initiatives</li>
      </ul>
      
      <h3>4. Voice Commerce</h3>
      <p>Voice-activated shopping melalui smart speakers dan voice assistants menjadi semakin populer.</p>
      
      <h3>5. Cross-border E-commerce</h3>
      <p>Kemudahan dalam international shipping dan payment processing membuka peluang global untuk UMKM.</p>
    `,
    summary: "Eksplorasi tren e-commerce terbaru di 2024, termasuk social commerce, AI integration, sustainable practices, dan opportunities untuk bisnis online.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    category: "Bisnis",
    author: "Lisa Anggraini",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z",
    published: true
  }
];

export const adminUsers: AdminUser[] = [
  {
    id: 1,
    email: "admin@blogpro.com",
    password: "admin123", // In real app, this should be hashed
    created_at: "2024-01-01T00:00:00Z"
  }
];

// Export categories for consistent use across the app
export const categories = [
  'Marketing',
  'Bisnis', 
  'Teknologi',
  'Pendidikan',
  'Desain',
  'Olahraga',
  'Politik',
  'Hiburan',
  'Opini',
  'Sosial'
];
