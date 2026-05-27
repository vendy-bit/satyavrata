'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from '@/sanity/client'; 
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client as any);
function urlFor(source: any) {
  return source ? builder.image(source).url() : null;
}

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
      {/* SECTION HERO */}
      <section className="relative w-full h-[35vh] flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Artikel & Opini</h1>
        </div>
      </section>

      {/* FILTER */}
      <section className="container mx-auto px-6 max-w-5xl mt-12 mb-12">
        <div className="flex flex-wrap gap-3 pb-4 border-b border-zinc-900">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)} 
              className={`px-5 py-2 text-xs font-bold rounded-md transition-all duration-300 border transform hover:translate-y-[-4px] active:scale-95 ${
                selectedCategory === cat 
                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID ARTIKEL */}
      <section className="container mx-auto px-6 max-w-5xl">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article key={art._id} className="bg-zinc-900/20 border border-zinc-800 rounded-xl overflow-hidden group hover:border-amber-500/50 transition-colors">
                <div className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden">
                  {art.gambar && (
                    <Image 
                      src={urlFor(art.gambar) || ""} 
                      alt={art.judulArtikel || "Artikel"} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      unoptimized
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between text-[10px] text-amber-500 uppercase mb-3 tracking-widest">
                    <span>{art.category || "Umum"}</span>
                    <span>{art.date || "Baru"}</span>
                  </div>
                  <h2 className="font-serif text-lg font-bold mb-3 leading-tight group-hover:text-amber-500 transition-colors">{art.judulArtikel || "Tanpa Judul"}</h2>
                  
                  {/* Bagian ini sudah diperbaiki supaya tidak error */}
                  <p className="text-zinc-400 text-xs line-clamp-4 leading-relaxed">
                    Klik tombol baca untuk melihat isi artikel selengkapnya.
                  </p>

                  <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500">Oleh: {art.author || "Admin"}</span>
                    {art.slug?.current ? (
                      <Link href={`/artikel/${art.slug.current}`} className="text-amber-500 text-[11px] font-bold hover:underline">
                        BACA &rarr;
                      </Link>
                    ) : (
                      <span className="text-zinc-600 text-[11px]">Belum bisa dibaca</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            Belum ada artikel di kategori ini.
          </div>
        )}
      </section>
    </div>
  );
}