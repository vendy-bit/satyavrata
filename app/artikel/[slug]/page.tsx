import { PortableText } from '@portabletext/react';
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

  // Query mengambil data artikel
  const artikel = await client.fetch(
    `*[_type == "artikel" && slug.current == $slug][0]`,
    { slug }
  );

  // Jika artikel tidak ditemukan
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
        
        {/* Gambar Utama */}
        {artikel.gambar && (
          <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <Image 
              src={urlFor(artikel.gambar) || ""} 
              alt={artikel.judulArtikel || "Artikel"} 
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              unoptimized
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

        {/* Konten (Sudah diatur spasi manual) */}
        <div className="text-zinc-300 leading-relaxed text-lg">
          {artikel.konten ? (
            <PortableText 
              value={artikel.konten} 
              components={{
                block: {
                  normal: ({children}) => <p className="mb-6">{children}</p>,
                  h1: ({children}) => <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc ml-6 mb-6">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal ml-6 mb-6">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="mb-2">{children}</li>,
                },
                marks: {
                  strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                }
              }}
            />
          ) : (
            <p>Belum ada isi artikel.</p>
          )}
        </div>
      </div>
    </div>
  );
}