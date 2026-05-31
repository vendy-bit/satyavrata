'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ==========================================
// KOMPONEN INTERNAL UNTUK ANIMASI SCROLL
// ==========================================
function ScrollAnimate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Dipicu sekali agar performa render tetap enteng
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -40px 0px" // Buffer bawah agar animasi muncul pas sebelum terlalu ke atas
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
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA TIM ADVOKAT & KONSULTAN
// ==========================================
export default function TimPage() {
  // Data 5 Orang Tim Resmi Satyavrata
  const timData = [
    {
      nama: "Dr (C) Popi Ulandari, S.H., MH.",
      jabatan: "LITIGATION",
      foto: "/tim/popi.jpeg"
    },
    {
      nama: "Valentisa Debby Cynthia Putri, S.H.",
      jabatan: "LITIGATION",
      foto: "/tim/debby.jpeg"
    },
    {
      nama: "Tri Stiawan, S.H.",
      jabatan: "LITIGATION",
      foto: "/tim/tris.jpeg"
    },
    {
      nama: "Vicky Indra Saputra, S.H.",
      jabatan: "LITIGATION",
      foto: "/tim/vicky.jpeg"
    },
    {
      nama: "Vendy Setiawan",
      jabatan: "LEGAL OFFICER",
      foto: "/tim/vendy.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-16 pb-24 overflow-x-hidden">
      
      {/* INJECT ANIMASI FLOATING HALUS BAWAAN */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* 1. HERO HEADER - Langsung pop-in instan saat dimuat awal */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Tim Satyavrata
            </h1>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION - Transisi memudar halus saat di-scroll */}
      <section className="container mx-auto px-6 max-w-4xl mt-16 mb-16 text-center">
        <ScrollAnimate>
          <p className="text-amber-500 font-serif tracking-[0.3em] text-xs sm:text-sm uppercase mb-3 font-bold">
            PROFESSIONALS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
            Dukungan Hukum dari Ahli Berintegritas
          </h2>
          <div className="w-16 h-[1.5px] bg-amber-500/50 mx-auto mt-4"></div>
        </ScrollAnimate>
      </section>

      {/* 3. GRID TIM - Efek Lanyard dengan Staggered Fade-Up */}
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {timData.map((anggota, index) => (
            // Logika (index % 3) * 150 menghasilkan jeda kemunculan antar kolom kiri-tengah-kanan yang estetik
            <ScrollAnimate key={index} delay={(index % 3) * 150} className="h-full">
              <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-500 flex flex-col h-full justify-between group backdrop-blur-sm">
                
                <div>
                  {/* Tempat Foto Profil (Aspek Rasio Lanyard 3:4 Vertikal) */}
                  <div className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden border-b border-zinc-800/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
                    
                    <Image 
                      src={anggota.foto} 
                      alt={anggota.nama}
                      fill
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Detail Info Personil */}
                  <div className="p-6 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/30">
                    <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-amber-500 uppercase mb-2 block group-hover:text-amber-400 transition-colors">
                      {anggota.jabatan}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide leading-snug group-hover:text-amber-500/90 transition-colors">
                      {anggota.nama}
                    </h3>
                  </div>
                </div>

              </div>
            </ScrollAnimate>
          ))}
        </div>
      </section>

    </div>
  );
}