'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from '@/sanity/client'; 
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client as any);
function urlFor(source: any) {
  return source ? builder.image(source).url() : null;
}

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
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -40px 0px"
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
// HALAMAN UTAMA DAFTAR GALERI (MOSAIC GRID)
// ==========================================
export default function GaleriPage() {
  const [galeriData, setGaleriData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Litigasi", "Konsultasi", "Edukasi"];

  // Fetching data dari Sanity CMS
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const data = await client.fetch(`*[_type == "galeri"]`);
        setGaleriData(data || []);
      } catch (err) {
        console.error("Gagal mengambil data galeri dari Sanity:", err);
      }
    };
    fetchGaleri();
  }, []);

  // Menyaring gambar berdasarkan kategori aktif secara realtime
  const filteredGaleri = activeCategory === "Semua"
    ? galeriData
    : galeriData.filter(item => {
        const itemCat = (item.category || "").toString().trim().toLowerCase();
        const activeCat = activeCategory.trim().toLowerCase();
        return itemCat === activeCat;
      });

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
      
      {/* 1. HERO HEADER */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Galeri Kegiatan
            </h1>
          </div>
        </div>
      </section>

      {/* 2. FILTER BUTTONS */}
      <section className="container mx-auto px-6 max-w-5xl mt-12 mb-12">
        <ScrollAnimate className="flex flex-wrap items-center gap-2.5 pb-4 border-b border-zinc-900">
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
        </ScrollAnimate>
      </section>

      {/* 3. MOSAIC GRID ALBUM FROM SANITY */}
      <section className="container mx-auto px-6 max-w-5xl">
        {filteredGaleri.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {filteredGaleri.map((item, idx) => {
              const gridLayoutSize = item.size || "md:col-span-1";
              
              return (
                <ScrollAnimate 
                  key={item._id} 
                  delay={(idx % 3) * 150} 
                  className={`relative rounded-xl overflow-hidden border border-zinc-800/60 shadow-lg group backdrop-blur-sm bg-zinc-950 ${gridLayoutSize}`}
                >
                  {/* Tempat Gambar */}
                  <div className="relative w-full h-full">
                    {/* Teks Penanda Sementara Latar Belakang */}
                    <div className="absolute inset-0 bg-zinc-900/50 flex flex-col items-center justify-center text-center p-4 z-0">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-bold mb-1">SATYAVRATA ALBUM</span>
                      <span className="text-xs text-zinc-500 italic max-w-xs line-clamp-1">{item.title}</span>
                    </div>

                    {/* Komponen Gambar Dinamis Sanity */}
                    {item.image && (
                      <Image
                        src={urlFor(item.image) || ""}
                        alt={item.title || "Dokumentasi"}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-50 group-hover:opacity-100 z-10"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  </div>

                  {/* Konten Hover Keterangan & Akses Link Detail */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end">
                    <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-amber-500 uppercase block mb-1">
                      {item.category || "Umum"}
                    </span>
                    
                    {item.slug?.current ? (
                      <Link href={`/galeri/${item.slug.current}`}>
                        <h3 className="font-serif text-base font-bold text-white tracking-wide mb-1 hover:text-amber-400 transition-colors cursor-pointer line-clamp-1">
                          {item.title || "Tanpa Judul"}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="font-serif text-base font-bold text-zinc-400 tracking-wide mb-1 line-clamp-1">
                        {item.title || "Tanpa Judul"}
                      </h3>
                    )}

                    <p className="text-zinc-400 text-xs font-light leading-relaxed text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xl line-clamp-2">
                      {item.desc || "Arahkan kursor atau klik judul untuk melihat detail perkara."}
                    </p>

                    {/* SUNTIKAN TOMBOL DETAIL BARU YANG MUNCUL SAAT HOVER */}
                    {item.slug?.current && (
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        <Link 
                          href={`/galeri/${item.slug.current}`} 
                          className="inline-flex items-center gap-1.5 text-amber-500 text-[11px] font-bold tracking-wider uppercase hover:text-amber-400 transition-colors group/btn"
                        >
                          <span>Lihat Rincian</span>
                          <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">&rarr;</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        ) : (
          <ScrollAnimate className="text-center py-20 text-zinc-500 text-sm italic border border-dashed border-zinc-800 rounded-xl">
            Belum ada dokumentasi foto di dalam kategori ini.
          </ScrollAnimate>
        )}
      </section>

    </div>
  );
}