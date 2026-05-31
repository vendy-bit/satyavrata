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
          observer.unobserve(entry.target); // Picu sekali biar performa web ringan
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -40px 0px" // Buffer bawah biar animasi jalan sebelum terlalu ke atas
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
// HALAMAN UTAMA DAFTAR ARTIKEL
// ==========================================
export default function ArtikelPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  const categories = ["Semua", "Hukum Konstitusi & Kebijakan", "Hukum Bisnis & Agraria", "Litigasi & Advokasi"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "artikel"]`);
        setArticles(data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const filteredArticles = selectedCategory === "Semua" 
    ? articles 
    : articles.filter((art) => {
        const artCat = (art.category || "").toString().trim().toLowerCase();
        const selCat = selectedCategory.trim().toLowerCase();
        return artCat === selCat;
      });

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-16 pb-24 overflow-x-hidden">
      
      {/* 1. SECTION HERO - Efek pop-in instan pas load awal tanpa nunggu scroll */}
      <section className="relative w-full h-[35vh] flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide">Artikel & Opini</h1>
        </div>
      </section>

      {/* 2. SECTION FILTER - Animasi meluncur halus */}
      <section className="container mx-auto px-6 max-w-5xl mt-12 mb-12">
        <ScrollAnimate className="flex flex-wrap gap-3 pb-4 border-b border-zinc-900">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)} 
              className={`px-5 py-2 text-xs font-bold rounded-md transition-all duration-300 border transform hover:translate-y-[-4px] active:scale-95 cursor-pointer ${
                selectedCategory === cat 
                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollAnimate>
      </section>

      {/* 3. GRID ARTIKEL - Efek Masuk Bergantian (Staggered Delay) */}
      <section className="container mx-auto px-6 max-w-5xl">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              // Logika (idx % 3) * 150 bikin jeda antar kolom kiri-tengah-kanan jadi estetik
              <ScrollAnimate key={art._id} delay={(idx % 3) * 150} className="h-full">
                <article className="bg-zinc-900/20 border border-zinc-800 rounded-xl overflow-hidden group hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col h-full justify-between">
                  
                  <div>
                    {/* Area Gambar */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden">
                      {art.gambar && (
                        <Image 
                          src={urlFor(art.gambar) || ""} 
                          alt={art.judulArtikel || "Artikel"} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                          unoptimized
                        />
                      )}
                    </div>

                    {/* Area Konten Teks */}
                    <div className="p-6">
                      <div className="flex justify-between text-[10px] text-amber-500 uppercase mb-3 tracking-widest font-bold">
                        <span>{art.category || "Umum"}</span>
                        <span>{art.date || "Baru"}</span>
                      </div>
                      <h2 className="font-serif text-lg font-bold mb-3 leading-tight group-hover:text-amber-500 transition-colors line-clamp-2">
                        {art.judulArtikel || "Tanpa Judul"}
                      </h2>
                      <p className="text-zinc-400 text-xs line-clamp-3 leading-relaxed font-light">
                        Klik tombol baca untuk melihat analisis hukum, kajian argumentasi litigasi, dan opini selengkapnya.
                      </p>
                    </div>
                  </div>

                  {/* Area Footer Kartu (Selalu Rata Bawah) */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 font-medium">Oleh: {art.author || "Admin"}</span>
                      {art.slug?.current ? (
                        <Link href={`/artikel/${art.slug.current}`} className="text-amber-500 text-[11px] font-bold hover:text-amber-400 transition-colors flex items-center gap-1 group/btn">
                          <span>BACA</span>
                          <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">&rarr;</span>
                        </Link>
                      ) : (
                        <span className="text-zinc-600 text-[11px]">Belum bisa dibaca</span>
                      )}
                    </div>
                  </div>

                </article>
              </ScrollAnimate>
            ))}
          </div>
        ) : (
          <ScrollAnimate className="text-center py-20 text-zinc-500 text-sm italic">
            Belum ada artikel di kategori ini.
          </ScrollAnimate>
        )}
      </section>
    </div>
  );
}