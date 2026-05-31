import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client as any);
function urlFor(source: any) {
  return source ? builder.image(source).url() : null;
}

export default async function DetailGaleriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Query mengambil data galeri berdasarkan slug
  const item = await client.fetch(
    `*[_type == "galeri" && slug.current == $slug][0]`,
    { slug }
  );

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0B0C10] font-sans">
        <h1 className="text-2xl mb-4 font-serif">Dokumentasi tidak ditemukan.</h1>
        <Link href="/galeri" className="text-amber-500 underline text-sm">Kembali ke Galeri</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-32 pb-24 px-6 font-sans">
      <div className="container mx-auto max-w-3xl">
        <Link href="/galeri" className="text-amber-500 text-sm mb-6 inline-block hover:underline">
          &larr; Kembali ke Galeri Kegiatan
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2 leading-tight text-zinc-100">{item.title}</h1>
        <span className="text-[10px] tracking-[0.2em] text-amber-500 uppercase font-bold block mb-6">{item.category || "Kegiatan"}</span>
        
        {item.image && (
          <div className="relative w-full aspect-[16/10] mb-8 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <Image 
              src={urlFor(item.image) || ""} 
              alt={item.title || "Dokumentasi"} 
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-xl p-6 md:p-8">
          <h2 className="font-serif text-lg font-bold text-white mb-4 border-b border-zinc-800 pb-3">Deskripsi Kegiatan / Telaah Kasus</h2>
          <p className="text-zinc-300 leading-relaxed text-sm md:text-base text-justify font-light">
            {item.desc || "Tidak ada deskripsi untuk dokumentasi ini."}
          </p>
        </div>
      </div>
    </div>
  );
}