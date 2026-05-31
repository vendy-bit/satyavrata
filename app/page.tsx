'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ==========================================
// KOMPONEN KUSTOM UNTUK ANIMASI SCROLL
// ==========================================
function ScrollAnimate({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animasi dipicu sekali agar performa mulus
        }
      },
      {
        threshold: 0.15, // Memicu animasi saat 15% elemen sudah masuk layar
        rootMargin: "0px 0px -50px 0px" // Buffer bawah agar muncul sebelum terlalu ke atas
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA (HOME)
// ==========================================
export default function Home() {
  const rotatingWords = [
    "Hukum Pidana",
    "Sengketa Perdata",
    "Keluarga & Waris",
    "Sengketa Konstitusi",
    "Tata Usaha Negara"
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
        setFade(true);
      }, 500); 
    }, 3000); 
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <div className="flex flex-col w-full bg-[#0B0C10] overflow-x-hidden">
      
      {/* 1. HERO SECTION - Load instant di awal tanpa scroll observer agar tidak ada delay visual */}
      <section 
        className="relative w-full min-h-[85vh] flex items-center pt-24 pb-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent z-0"></div>

        <main className="container mx-auto relative z-10 flex items-center justify-start text-left px-6 py-10 w-full">
          <div className="max-w-3xl space-y-5 md:space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
            
            <div className="inline-flex items-center gap-2 bg-black/80 border border-amber-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs text-amber-500 uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              KAMI SIAP MELAYANI
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] drop-shadow-lg text-white">
              Tim Advokat Berpengalaman <br className="hidden sm:block" />
              Untuk <span className={`text-amber-500 block mt-1 lg:mt-2 h-12 sm:h-14 lg:h-20 overflow-hidden transition-all duration-500 ease-in-out transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {rotatingWords[currentWordIndex]}
              </span>
            </h1>
            
            <p className="text-zinc-300 text-sm md:text-base lg:text-lg max-w-xl font-light leading-relaxed drop-shadow-md">
              Kantor Hukum Satyavrata memberikan pelayanan terbaik dan maksimal untuk penyelesaian sengketa hukum Anda dengan integritas tertinggi.
            </p>
            
            <div className="flex pt-2 md:pt-4">
              <a href="https://wa.me/62895609638341" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center bg-amber-500 text-black font-bold px-8 py-3 md:py-4 rounded-xl hover:bg-amber-400 hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-amber-500/20">
                HUBUNGI SEKARANG
              </a>
            </div>
          </div>
        </main>
      </section>

      {/* 2. TENTANG KAMI */}
      <section className="bg-[#0B0C10] py-16 md:py-24 border-y border-zinc-900">
        <ScrollAnimate className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-amber-500 font-serif tracking-[0.3em] text-sm md:text-base uppercase mb-6 font-bold">TENTANG KAMI</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-8 leading-tight">Advokat Dengan Pengalaman & Integritas Tinggi</h2>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed mx-auto mb-10">
            Tim advokat yang berpengalaman, kompeten, dan memegang teguh prinsip kebenaran (Satya) serta janji (Vrata). Siap mendampingi dan mewakili Anda membedah kasus-cases hukum kompleks.
          </p>
          <Link href="/tentang" className="inline-block w-full sm:w-auto bg-transparent border border-amber-500 text-amber-500 font-bold px-10 py-3 md:py-4 rounded hover:bg-amber-500 hover:text-black transition-all text-sm md:text-base">
            SELENGKAPNYA
          </Link>
        </ScrollAnimate>
      </section>

      {/* 3. FOTO SELURUH TIM */}
      <section 
        className="relative w-full min-h-[110vh] flex items-start justify-center pt-2 sm:pt-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/tim-advokat.png')" }} 
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          {/* Bungkus bagian logo dan teks branding tim dengan animasi pop-in lembut */}
          <ScrollAnimate className="flex flex-col items-center max-w-2xl mt-2 sm:mt-4">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-2 drop-shadow-xl hover:scale-110 transition-transform duration-300">
              <Image 
                src="/logo.png" 
                alt="Logo Satyavrata" 
                fill 
                className="object-contain"
              />
            </div>

            <h2 className="font-serif tracking-[0.25em] text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 m-0 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              SATYAVRATA
            </h2>
            <p className="font-sans text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-zinc-200 mt-1 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Advocate & Legal Consultant
            </p>

            <div className="w-12 sm:w-16 h-[1.5px] bg-amber-500 mt-2 drop-shadow-lg"></div>
          </ScrollAnimate>
        </div>
      </section>

      {/* 4. INTEGRITAS */}
      <section className="bg-[#050505] py-16 md:py-24 border-b border-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Animasi teks header dari kiri */}
            <ScrollAnimate className="space-y-4 md:space-y-6 text-center lg:text-left">
              <p className="text-amber-500 font-serif tracking-[0.3em] text-sm md:text-base uppercase font-bold">INTEGRITAS KAMI KEPADA KLIEN</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">Mengapa Memilih Tim Advokat Kami ?</h2>
            </ScrollAnimate>
            {/* Animasi teks deskripsi */}
            <ScrollAnimate className="border-l-2 border-amber-500/50 pl-6 md:pl-8">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-justify">
                Di dalam memberikan jasa profesional hukum senantiasa berpegang teguh dan menjunjung tinggi prinsip-prinsip etis dan profesionalisme yang diatur dalam <strong>Undang-Undang No.18 Tahun 2003</strong> tentang Advokat dan Kode Etik Advokat Indonesia, sehingga dipastikan dapat memberikan rasa aman bagi klien terhadap berbagai hal kontraproduktif pada proses layanan jasa hukum selanjutnya.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* 5. LAYANAN HUKUM KAMI */}
      <section className="bg-[#0B0C10] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollAnimate>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-500 mb-12 text-center">Layanan Hukum Kami</h2>
          </ScrollAnimate>
          
          {/* GRID KARTU DENGAN SMART STAGGERED FADE EFFECT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Kartu 1 */}
            <ScrollAnimate className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-xl hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-900/80">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Hukum Pidana</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Pendampingan penuh dari penyelidikan, penyidikan, hingga putusan pengadilan.</p>
            </ScrollAnimate>
            {/* Kartu 2 */}
            <ScrollAnimate className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-xl hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-900/80">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Sengketa Perdata</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Penyelesaian sengketa hak milik, wanprestasi, dan perbuatan melawan hukum.</p>
            </ScrollAnimate>
            {/* Kartu 3 */}
            <ScrollAnimate className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-xl hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-900/80">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Tata Usaha Negara</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Gugatan dan pembatalan keputusan pejabat yang merugikan klien.</p>
            </ScrollAnimate>
            {/* Kartu 4 */}
            <ScrollAnimate className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-xl hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-900/80">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Keluarga & Waris</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Penanganan perceraian, harta gono-gini, hak asuh, dan warisan.</p>
            </ScrollAnimate>
            {/* Kartu 5 */}
            <ScrollAnimate className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-xl hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-900/80">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Sengketa Konstitusi</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Pemulihan hak melalui Pengujian UU di Mahkamah Konstitusi.</p>
            </ScrollAnimate>
            {/* Kartu 6 */}
            <ScrollAnimate className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-xl hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-900/80">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Mediasi & Alternatif</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">Penyelesaian sengketa secara damai di luar pengadilan.</p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* 6. TIM SATYAVRATA */}
      <section className="bg-gradient-to-b from-[#0B0C10] to-[#050505] py-16 md:py-24 border-t border-zinc-900">
        <ScrollAnimate className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">Kenali Tim Kami Lebih Dekat</h2>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-10">
            Dibalik setiap kemenangan klien, ada dedikasi, integritas, dan taktik cerdas dari advokat-advokat terbaik kami.
          </p>
          <Link href="/tim" className="inline-block w-full sm:w-auto bg-amber-500 text-black font-bold px-10 py-3 md:py-4 rounded-xl hover:bg-amber-400 hover:scale-105 transition-all text-sm md:text-base shadow-lg shadow-amber-500/10">
            LIHAT PROFIL TIM SATYAVRATA
          </Link>
        </ScrollAnimate>
      </section>

    </div>
  );
}