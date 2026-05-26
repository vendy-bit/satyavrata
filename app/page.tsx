'use client';

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-[#ECF0F1] font-sans bg-[#0B0C10] overflow-x-hidden flex flex-col scroll-smooth">
      
      {/* HEADER / NAVBAR (FIXED) */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800/30 backdrop-blur-md bg-[#0B0C10]/90">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO KUSTOM */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded">
              <Image 
                src="/logo.png" 
                alt="Logo Satyavrata" 
                fill 
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif tracking-wider text-xl font-bold block text-amber-500">
                SATYAVRATA
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 block -mt-1">
                Law Firm & Partners
              </span>
            </div>
          </div>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-zinc-300">
            <a href="#beranda" className="hover:text-amber-500 transition-colors font-medium">Beranda</a>
            <a href="#tentang" className="hover:text-amber-500 transition-colors font-medium">Tentang Kami</a>
            <a href="#layanan" className="hover:text-amber-500 transition-colors font-medium">Layanan Hukum</a>
            <a href="#kontak" className="bg-amber-500/10 px-5 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium hover:bg-amber-500 hover:text-black transition-all">
              Hubungi Kami
            </a>
          </nav>

          {/* HAMBURGER MOBILE */}
          <button className="md:hidden text-zinc-300 p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        
        {/* MOBILE MENU (DIBUAT ABSOLUTE AGAR MENGAMBANG DI ATAS KONTEN) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0B0C10] border-b border-zinc-800 p-6 flex flex-col gap-6 text-center shadow-2xl animate-in fade-in slide-in-from-top-4">
            <a href="#beranda" onClick={() => setIsMenuOpen(false)}>Beranda</a>
            <a href="#tentang" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a>
            <a href="#layanan" onClick={() => setIsMenuOpen(false)}>Layanan Hukum</a>
            <a href="#kontak" onClick={() => setIsMenuOpen(false)} className="text-amber-500 font-bold">Hubungi Kami</a>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION (RATA KIRI / ALIGN LEFT & RESPONSIVE MOBILE) */}
      <section 
        id="beranda"
        className="min-h-screen relative flex flex-col bg-cover bg-center bg-no-repeat pt-20"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30 md:to-transparent"></div>

        <main className="container mx-auto relative z-10 flex-grow flex items-center justify-start text-left px-6 py-12 md:py-20 w-full">
          <div className="max-w-2xl space-y-6 md:space-y-8 mt-10 md:mt-0">
            <div className="inline-flex items-center gap-2 bg-black/60 border border-zinc-700/50 px-4 py-2 rounded-full text-[10px] sm:text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Konsultasi Hukum Profesional & Terpercaya
            </div>
            
            {/* Teks diatur ulang ukurannya agar tidak menumpuk di layar kecil */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight drop-shadow-lg">
              Menegakkan Keadilan dengan <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600">Integritas Tertinggi</span>
            </h1>
            
            <p className="text-zinc-200 text-sm sm:text-base md:text-xl max-w-xl font-light leading-relaxed drop-shadow-md">
              KANTOR HUKUM SATYAVRATA hadir memberikan solusi hukum strategis, tuntas, dan berdedikasi penuh dalam melindungi hak serta kepentingan hukum Anda.
            </p>
            
            {/* Tombol dibuat w-full di mobile agar rapi ke bawah */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start pt-4 w-full">
              <a href="https://wa.me/62895609638341" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex justify-center items-center bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-8 py-4 rounded-xl shadow-2xl hover:scale-105 transition-transform text-sm sm:text-base">
                Konsultasi WhatsApp
              </a>
              <a href="#layanan" className="w-full sm:w-auto flex justify-center items-center border border-zinc-400 text-zinc-100 px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-sm sm:text-base">
                Lihat Layanan Kami
              </a>
            </div>
          </div>
        </main>
      </section>

      {/* 2. TENTANG KAMI SECTION */}
      <section id="tentang" className="py-16 md:py-24 bg-[#050505] border-t border-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-500">TENTANG SATYAVRATA</h2>
            <p className="text-amber-500/80 font-serif italic text-base md:text-lg">Komitmen pada Kebenaran</p>
          </div>
          
          <div className="space-y-6 text-zinc-300 text-sm md:text-lg leading-relaxed mb-12 md:mb-16 max-w-4xl mx-auto text-center md:text-left">
            <p>
              Nama <strong className="text-amber-500 font-bold">SATYAVRATA</strong> berasal dari bahasa Sanskerta: <em className="text-zinc-100">Satya</em> yang berarti kebenaran, dan <em className="text-zinc-100">Vrata</em> yang berarti janji dan Komitmen yang teguh.
            </p>
            <p>
              Nama ini bukan sekedar identitas hukum, nama ini adalah prinsip kerja yang mengikat setiap pemikiran, tindakan, dan keputusan yang diambil. Dalam dunia hukum yang kompleks, konsistensi pada kebenaran adalah fondasi yang tidak dapat dinegosiasikan.
            </p>
            <p>
              SATYAVRATA berdiri pada keyakinan bahwa praktik hukum yang baik lahir dari tiga hal yang saling menguatkan:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            <div className="bg-[#0B0C10] border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-amber-500 mb-3 md:mb-4 uppercase tracking-wider">Solusi Hukum</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Hukum harus menjadi alat untuk menyelesaikan, bukan mempersulit. Setiap strategi yang dirancang berangkat dari analisis mendalam dan bertujuan pada hasil yang aplikatif, bukan sekadar wacana teoritis.
              </p>
            </div>
            
            <div className="bg-[#0B0C10] border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-amber-500 mb-3 md:mb-4 uppercase tracking-wider">Keadilan</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Keadilan adalah tujuan akhir dari setiap proses hukum. Oleh karena itu, integritas dalam bekerja menjadi batas yang tidak pernah dilampaui, terlepas dari situasi dan tekanan eksternal.
              </p>
            </div>

            <div className="bg-[#0B0C10] border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-amber-500 mb-3 md:mb-4 uppercase tracking-wider">Kepercayaan</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Kepercayaan dibangun melalui konsistensi, transparansi, dan tanggung jawab atas setiap langkah yang diambil. Reputasi dijaga melalui kerja yang dapat dipertanggungjawabkan secara profesional dan etis.
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto px-4">
            <blockquote className="text-lg md:text-2xl font-serif text-amber-500 italic border-y border-zinc-800/80 py-8 md:py-10 leading-relaxed">
              "Hukum tanpa kebenaran kehilangan arah. <br className="block"/>
              Kebenaran tanpa hukum kehilangan bentuk."
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3. SECTION LAYANAN */}
      <section id="layanan" className="py-16 md:py-24 bg-[#0B0C10] border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-500">Layanan Hukum Kami</h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">Spesialisasi kami berfokus pada penegakan hak klien melalui litigasi umum, tata usaha negara, hingga sengketa konstitusional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all text-2xl">⚖️</div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Hukum Pidana</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Pendampingan hukum profesional dalam tahap penyelidikan, penyidikan, hingga pembelaan di persidangan tingkat pertama sampai kasasi.</p>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all text-2xl">💼</div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Hukum Perdata</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Penyelesaian sengketa hak milik, wanprestasi, perbuatan melawan hukum (PMH), dan sengketa keperdataan lainnya.</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all text-2xl">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Keluarga & Waris</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Penanganan kasus perceraian, hak asuh anak, pembagian harta gono-gini, hingga penetapan dan sengketa waris.</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all text-2xl">🏛️</div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Tata Usaha Negara</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Mewakili klien dalam menggugat dan membatalkan keputusan pejabat atau badan tata usaha negara (KTUN) yang merugikan.</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all text-2xl">📜</div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Sengketa Konstitusi & PUU</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Mewakili klien di Mahkamah Konstitusi untuk Pengujian Undang-Undang (PUU) dan pemulihan Hak Konstitusional warga negara.</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all text-2xl">🕊️</div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Mediasi & Alternatif Sengketa</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Penyelesaian sengketa di luar pengadilan secara damai dan mufakat demi mencapai solusi yang saling menguntungkan (win-win solution).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer id="kontak" className="bg-[#050505] border-t border-zinc-900 pt-16 md:pt-20 pb-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          
          {/* Kolom 1 */}
          <div className="md:col-span-4 space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded">
                <Image src="/logo.png" alt="Logo Satyavrata" fill className="object-contain" />
              </div>
              <span className="font-serif tracking-wider text-xl font-bold text-amber-500">SATYAVRATA</span>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
              Advokat & Konsultan Hukum berdedikasi tinggi yang mengedepankan integritas dan profesionalisme dalam setiap penanganan perkara hukum, dari litigasi umum hingga sengketa ketatanegaraan.
            </p>
          </div>

          {/* Kolom 2 */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <h4 className="text-white font-bold text-sm md:text-base">Navigasi</h4>
            <ul className="text-zinc-500 text-xs md:text-sm space-y-3 md:space-y-4">
              <li><a href="#beranda" className="hover:text-amber-500 transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="hover:text-amber-500 transition-colors">Tentang Kami</a></li>
              <li><a href="#layanan" className="hover:text-amber-500 transition-colors">Layanan</a></li>
            </ul>
          </div>

          {/* Kolom 3 */}
          <div className="md:col-span-6 space-y-4 md:space-y-6">
            <h4 className="text-white font-bold text-sm md:text-base">Kantor & Kontak Resmi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-xs md:text-sm text-zinc-500">
              <div className="space-y-4">
                <p className="flex items-start gap-3">
                  <span className="text-amber-500 text-base md:text-lg mt-0.5">📍</span>
                  <span>
                    Jalan Pendidikan Nomor 46,<br/>
                    RT.11/RW.09, Kel. Pekayon,<br/>
                    Kec. Pasar Rebo,<br/>
                    Kota Administrasi Jakarta Timur,<br/>
                    DKI Jakarta
                  </span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <span className="text-amber-500 text-base md:text-lg">📞</span>
                  <a href="https://wa.me/62895609638341" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                    +62 895-6096-38341
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-amber-500 text-base md:text-lg">✉️</span>
                  <a href="mailto:tristiawanh@gmail.com" className="hover:text-amber-500 transition-colors break-all">
                    tristiawanh@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-amber-500 text-base md:text-lg">⏰</span>
                  Senin - Jumat: 09:00 - 17:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="container mx-auto px-6 mt-16 md:mt-20 pt-8 border-t border-zinc-900/50 text-center text-zinc-600 text-[10px] md:text-xs">
          <p>© {new Date().getFullYear()} Kantor Hukum Satyavrata & Partners. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}