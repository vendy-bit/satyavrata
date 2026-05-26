'use client';

import { useState } from "react";
import Image from "next/image";

export default function GaleriPage() {
  // Data Dokumentasi Album Rekam Jejak Hukum Satyavrata
  const semuaGaleri = [
    {
      id: 1,
      title: "Persidangan di Mahkamah Konstitusi RI",
      desc: "Dokumentasi jalannya pengujian materiil undang-undang sebagai komitmen penegakan hak konstitusional.",
      category: "Litigasi",
      image: "/galeri/sidang-mk.jpg",
      size: "md:col-span-2" // Membuat kartu ini agak lebar (Mosaic style)
    },
    {
      id: 2,
      title: "Rapat Kerja & Corporate Advisory",
      desc: "Proses analisis draf perjanjian komersial dan mitigasi risiko bisnis bersama klien.",
      category: "Konsultasi",
      image: "/galeri/meeting-klien.jpg",
      size: "md:col-span-1"
    },
    {
      id: 3,
      title: "Riset Konstitusi & Telaah Regulasi",
      desc: "Diskusi internal tim hukum Satyavrata dalam membedah tumpang tindih regulasi agraria.",
      category: "Konsultasi",
      image: "/galeri/riset-tim.jpg",
      size: "md:col-span-1"
    },
    {
      id: 4,
      title: "Digital Branding & Edukasi Hukum",
      desc: "Produksi konten literasi hukum visual untuk platform edukasi LawLens.",
      category: "Edukasi",
      image: "/galeri/lawlens-content.jpg",
      size: "md:col-span-2"
    },
    {
      id: 5,
      title: "Pendampingan Hukum Lapangan",
      desc: "Peninjauan objek sengketa pertanahan demi memastikan kepastian hukum klaim klien.",
      category: "Litigasi",
      image: "/galeri/kasus-lapangan.jpg",
      size: "md:col-span-1"
    },
    {
      id: 6,
      title: "Advokasi & Mediasi Non-Litigasi",
      desc: "Penyelesaian sengketa investasi melalui jalur musyawarah dan kesepakatan tertulis.",
      category: "Konsultasi",
      image: "/galeri/mediasi-bisnis.jpg",
      size: "md:col-span-2"
    }
  ];

  // State Filter Kategori Galeri
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Litigasi", "Konsultasi", "Edukasi"];

  // Menyaring gambar berdasarkan kategori aktif
  const filteredGaleri = activeCategory === "Semua"
    ? semuaGaleri
    : semuaGaleri.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-16 pb-24 overflow-x-hidden">
      
      {/* INJECT ANIMASI FLOATING HALUS */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* HERO HEADER - Konsisten dengan Halaman Lain */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Galeri Kegiatan
            </h1>
          </div>
        </div>
      </section>

      {/* FILTER BUTTONS - Kategori Minimalis */}
      <section className="container mx-auto px-6 max-w-5xl mt-12 mb-12">
        <div className="flex flex-wrap items-center gap-2.5 pb-4 border-b border-zinc-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans font-bold rounded-md transition-all border cursor-pointer ${
                activeCategory === cat
                  ? "bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/10"
                  : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* MOSAIC GRID ALBUM */}
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredGaleri.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-xl overflow-hidden border border-zinc-800/60 shadow-lg group backdrop-blur-sm bg-zinc-950 ${item.size}`}
            >
              {/* Tempat Gambar */}
              <div className="relative w-full h-full">
                {/* Teks Penanda Sementara Sebelum Foto Diupload */}
                <div className="absolute inset-0 bg-zinc-900/50 flex flex-col items-center justify-center text-center p-4 z-0">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-bold mb-1">
                    SATYAVRATA ALBUM
                  </span>
                  <span className="text-xs text-zinc-500 italic max-w-xs">
                    {item.title}
                  </span>
                </div>

                {/* Komponen Image Next.js */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 z-10"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />

                {/* Overlay Gradasi Hitam saat Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              {/* Teks Deskripsi di Atas Gambar (Muncul dari bawah ke atas saat di-hover) */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-30 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-amber-500 uppercase block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold text-white tracking-wide mb-1 transition-colors duration-300 group-hover:text-amber-400/90">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}