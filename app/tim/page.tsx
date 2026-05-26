'use client';

import Image from "next/image";

export default function TimPage() {
  // Data 5 Orang Tim Resmi Satyavrata
  const timData = [
    {
      nama: "Dr (C) Popi Ulandari, S.H., MH.",
      jabatan: "LITIGATION",
      foto: "/tim/popi.jpeg" // Aset foto ditaruh di public/tim/popi.jpg
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
      nama: "Vicky Indra Saputra",
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
      
      {/* HERO HEADER - Konsisten dengan Halaman Tentang Kami */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Tim Advokat
            </h1>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="container mx-auto px-6 max-w-4xl mt-16 mb-16 text-center">
        <p className="text-amber-500 font-serif tracking-[0.3em] text-xs sm:text-sm uppercase mb-3 font-bold">
          PROFESSIONALS
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
          Dukungan Hukum dari Ahli Berintegritas
        </h2>
        <div className="w-16 h-[1.5px] bg-amber-500/50 mx-auto mt-4"></div>
      </section>

      {/* GRID TIM - Bentuk Lanyard Ultra Clean */}
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {timData.map((anggota, index) => (
            <div 
              key={index}
              className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group backdrop-blur-sm"
            >
              {/* Tempat Foto Profil (Aspek Rasio Lanyard 3:4 Vertikal) */}
              <div className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden border-b border-zinc-800/40">
                {/* Overlay Hitam Halus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                <Image 
                  src={anggota.foto} 
                  alt={anggota.nama}
                  fill
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
              </div>

              {/* Detail Info Personil (Lebih Ringkas & Simpel) */}
              <div className="p-6 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/30">
                {/* Jabatan / Divisi */}
                <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-amber-500 uppercase mb-2 block">
                  {anggota.jabatan}
                </span>
                
                {/* Nama Lengkap */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide leading-snug">
                  {anggota.nama}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}