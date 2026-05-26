'use client';

import { useState } from "react";
import Image from "next/image";

export default function ArtikelPage() {
  // Data Artikel Otentik Berdasarkan Rekam Jejak Hukum Konstitusi & Karya Tulis Vendy Setiawan
  const allArticles = [
    {
      id: 1,
      title: "Uji Materiil Frasa 'Merugikan Keuangan Negara' pada UU Tipikor: Catatan Perkara No. 28/PUU-XXIV/2026",
      excerpt: "Mengkaji pengujian materiil Pasal 603 dan Pasal 604 UU Nomor 1 Tahun 2023 (KUHP Baru) terkait kejelasan elemen penentu kerugian negara. Ikhtiar konstitusional ini bertujuan menjaga pembatasan yang tegas antara sengketa keperdataan bisnis (vendor) dan pertanggungjawaban pidana korupsi demi mencegah kriminalisasi yang sewenang-wenang.",
      category: "Hukum Konstitusi",
      date: "2 Maret 2026",
      author: "Vendy Setiawan (Pemohon)",
      image: "/artikel/korupsi.jpeg",
      url: "https://www.mkri.id/berita/mk-tidak-dapat-terima-uji-materi-kuhp-soal-frasa-%E2%80%9Cmerugikan-keuangan-negara%E2%80%9D-24694"
    },
    {
      id: 2,
      title: "Persoalkan Aturan Pendaftaran Tanah Masyarakat Adat: Mengawal Perkara No. 64/PUU-XXIV/2026 atas UUPA 1960",
      excerpt: "Melalui Perkara Nomor 64/PUU-XXIV/2026, pasal-pasal dalam UU Pokok Agraria (UUPA 1960) diuji materiil di hadapan Majelis Hakim Mahkamah Konstitusi. Perjuangan ini menyoroti inkonsistensi tanggung jawab negara dalam memberikan jaminan kepastian hukum yang berkeadilan serta perlindungan hak atas tanah komunal/masyarakat dari risiko kriminalisasi.",
      category: "Agraria & Pertanahan",
      date: "26 Mei 2026",
      author: "Vendy Setiawan (Pemohon)",
      image: "/artikel/uupa.jpeg",
      url: "https://www.youtube.com/watch?v=jd6W8sJfxpw"
    },
    {
      id: 3,
      title: "Mengapa Hukum Disebut Hukum? Menelusuri Hakikat, Esensi, dan Landasan Filosofis Aturan",
      excerpt: "Sebuah refleksi filosofis mendalam mengenai akar eksistensi hukum di tengah kehidupan bermasyarakat. Mengapa manusia tunduk pada aturan, bagaimana hukum memperoleh kekuatan mengikatnya, serta mengapa integritas harus selalu menjadi jiwa dari penegakan rule of law itu sendiri.",
      category: "Filsafat Hukum",
      date: "24 Mei 2026",
      author: "Vendy Setiawan",
      image: "/artikel/hukum.jpg",
      url: "https://www.kompasiana.com/vendysetiawan9595/694e21fced641505e9193793/mengapa-hukum-disebut-hukum"
    }
  ];

  // State untuk filter kategori
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const categories = ["Semua", "Hukum Konstitusi", "Agraria & Pertanahan", "Filsafat Hukum"];

  // Menyaring artikel berdasarkan kategori yang dipilih
  const filteredArticles = selectedCategory === "Semua" 
    ? allArticles 
    : allArticles.filter(art => art.category === selectedCategory);

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
      
      {/* HERO HEADER - Konsisten dengan Tentang Kami & Tim */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Artikel & Opini
            </h1>
          </div>
        </div>
      </section>

      {/* FILTER KATEGORI - Clean Minimalist Pill */}
      <section className="container mx-auto px-6 max-w-5xl mt-12 mb-12">
        <div className="flex flex-wrap items-center gap-2.5 pb-4 border-b border-zinc-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans font-bold rounded-md transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/10"
                  : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* LIST ARTIKEL GRID */}
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((artikel) => (
            <article 
              key={artikel.id}
              className="bg-zinc-900/10 border border-zinc-800/60 rounded-xl overflow-hidden shadow-lg hover:border-amber-500/30 transition-all duration-300 flex flex-col group backdrop-blur-sm"
            >
              {/* Gambar Cover Artikel */}
              <div className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-700 text-[10px] font-sans font-bold tracking-widest uppercase">
                  SATYAVRATA LEGAL INSIGHT
                </div>
                <Image 
                  src={artikel.image} 
                  alt={artikel.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
              </div>

              {/* Konten Artikel */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta Data: Kategori & Tanggal */}
                <div className="flex items-center justify-between text-[10px] font-sans font-bold tracking-wider text-amber-500 uppercase mb-3">
                  <span>{artikel.category}</span>
                  <span className="text-zinc-500 font-normal">{artikel.date}</span>
                </div>

                {/* Judul Artikel */}
                <h2 className="font-serif text-base font-bold text-white tracking-wide leading-snug mb-3 group-hover:text-amber-400/90 transition-colors duration-300 line-clamp-3">
                  {artikel.title}
                </h2>

                {/* Cuplikan Singkat Teks (Excerpt) */}
                <p className="text-zinc-400 text-xs font-light leading-relaxed text-left mb-6 line-clamp-4">
                  {emeraldFormatText(artikel.excerpt)}
                </p>

                {/* Footer Card: Penulis & Tombol Baca Terhubung Link */}
                <div className="mt-auto pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-medium">
                    Oleh: {artikel.author}
                  </span>
                  
                  <a 
                    href={artikel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-sans font-bold text-amber-500 tracking-wider group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 cursor-pointer hover:text-amber-400"
                  >
                    BACA &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* JIKA ARTIKEL KATEGORI KOSONG */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/10 border border-zinc-800/40 rounded-xl">
            <p className="text-zinc-500 font-sans text-sm tracking-wide">Belum ada artikel dalam kategori ini.</p>
          </div>
        )}
      </section>

    </div>
  );
}

// Helper kecil untuk menjaga string rendering di Next.js agar tidak bermasalah dengan tanda petik tunggal
function emeraldFormatText(text: string) {
  return text;
}