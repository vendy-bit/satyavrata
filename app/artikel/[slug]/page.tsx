import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';

// Inisialisasi builder gambar Sanity
const builder = imageUrlBuilder(client as any);
function urlFor(source: any) {
  return source ? builder.image(source).url() : null;
}

// ==========================================
// KOMPONEN INTERNAL PENGAKTIF ANIMASI CLIENT
// ==========================================
import { ReactNode } from "react";
function ClientAnimate({ children, delayClass = "" }: { children: ReactNode; delayClass?: string }) {
  return (
    <div className={`animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out fill-mode-both ${delayClass}`}>
      {children}
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA DETAIL ARTIKEL (SERVER SIDE)
// ==========================================
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Query mengambil data artikel secara realtime dari Sanity
  const artikel = await client.fetch(
    `*[_type == "artikel" && slug.current == $slug][0]`,
    { slug }
  );

  // Jika artikel tidak ditemukan
  if (!artikel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0B0C10] font-sans">
        <h1 className="text-2xl mb-4 font-serif">Artikel tidak ditemukan.</h1>
        <Link href="/artikel" className="text-amber-500 underline text-sm hover:text-amber-400 transition-colors">
          Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-32 pb-24 px-6 overflow-x-hidden font-sans">
      <div className="container mx-auto max-w-3xl">
        
        {/* HEADER: Tombol Kembali & Judul Besar (Animasi Instant) */}
        <ClientAnimate>
          <Link href="/artikel" className="text-amber-500 text-sm mb-6 inline-block hover:text-amber-400 transition-colors">
            &larr; Kembali ke Daftar Artikel
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-zinc-100">
            {artikel.judulArtikel}
          </h1>
        </ClientAnimate>
        
        {/* MEDIA: Gambar Utama dengan Efek Bayangan & Hover Hover (Delay 150ms) */}
        {artikel.gambar && (
          <ClientAnimate delayClass="delay-150">
            <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80 group">
              <Image 
                src={urlFor(artikel.gambar) || ""} 
                alt={artikel.judulArtikel || "Artikel"} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                priority
                unoptimized
              />
            </div>
          </ClientAnimate>
        )}

        {/* KONTEN UTAMA: Info Penulis, Tanggal, & Isi PortableText (Delay 300ms) */}
        <ClientAnimate delayClass="delay-300">
          {/* Info Penulis & Tanggal */}
          <div className="flex items-center text-zinc-500 text-xs sm:text-sm mb-8 border-b border-zinc-900 pb-6 tracking-wide">
            <span className="text-amber-500 mr-2 font-bold">Oleh:</span> 
            <span className="text-zinc-300 font-medium">{artikel.author || "Admin"}</span> 
            <span className="mx-3 text-zinc-800">|</span> 
            <span>{artikel.date || "Tanpa Tanggal"}</span>
          </div>

          {/* Isi Teks Transformasi Blok PortableText */}
          <div className="text-zinc-300 leading-relaxed text-base sm:text-lg font-light space-y-1">
            {artikel.konten ? (
              <PortableText 
                value={artikel.konten} 
                components={{
                  block: {
                    normal: ({children}) => <p className="mb-6 text-justify leading-relaxed">{children}</p>,
                    h1: ({children}) => <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-4 mt-8 text-white">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4 mt-6 text-amber-500/90">{children}</h2>,
                  },
                  list: {
                    bullet: ({children}) => <ul className="list-disc ml-6 mb-6 space-y-2 text-zinc-400">{children}</ul>,
                    number: ({children}) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-zinc-400">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({children}) => <li className="pl-1">{children}</li>,
                    number: ({children}) => <li className="pl-1">{children}</li>,
                  },
                  marks: {
                    strong: ({children}) => <strong className="font-bold text-amber-400">{children}</strong>,
                    em: ({children}) => <em className="italic text-zinc-200">{children}</em>,
                  }
                }}
              />
            ) : (
              <p className="text-zinc-500 italic text-sm">Belum ada isi artikel.</p>
            )}
          </div>
        </ClientAnimate>

      </div>
    </div>
  );
}