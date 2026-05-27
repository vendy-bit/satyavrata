import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client as any);
function urlFor(source: any) {
  return source ? builder.image(source).url() : null;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Query mengambil data artikel termasuk gambar
  const artikel = await client.fetch(
    `*[_type == "artikel" && slug.current == $slug][0]`,
    { slug }
  );

  if (!artikel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0B0C10]">
        <h1 className="text-2xl mb-4">Artikel tidak ditemukan.</h1>
        <Link href="/artikel" className="text-amber-500 underline">Kembali ke Daftar Artikel</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Tombol Kembali */}
        <Link href="/artikel" className="text-amber-500 text-sm mb-6 inline-block hover:underline">
          &larr; Kembali ke Daftar Artikel
        </Link>
        
        {/* Judul */}
        <h1 className="text-4xl font-serif font-bold mb-6 leading-tight">{artikel.judulArtikel}</h1>
        
        {/* Gambar Utama: Konsisten dengan gaya daftar artikel */}
        {artikel.gambar && (
          <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <Image 
              src={urlFor(artikel.gambar) || ""} 
              alt={artikel.judulArtikel || "Artikel"} 
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              unoptimized // Penting untuk memastikan gambar Sanity tampil tanpa kendala optimasi
            />
          </div>
        )}

        {/* Info Penulis & Tanggal */}
        <div className="flex items-center text-zinc-500 text-sm mb-8 border-b border-zinc-900 pb-8">
          <span className="text-amber-500 mr-2">Oleh:</span> 
          <span className="text-zinc-300">{artikel.author || "Admin"}</span> 
          <span className="mx-3 text-zinc-700">|</span> 
          <span>{artikel.date || "Tanpa Tanggal"}</span>
        </div>

        {/* Konten */}
        <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-lg">
          {artikel.konten}
        </div>
      </div>
    </div>
  );
}