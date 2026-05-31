'use client';

import { useState, useEffect, useRef } from "react";

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
// HALAMAN HUBUNGI KAMI / KONTAK
// ==========================================
export default function KontakPage() {
  // State untuk form submission
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    kategoriHukum: "Perdata & Bisnis",
    pesan: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Konsultasi Masuk:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      
      {/* 1. HERO HEADER */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Hubungi Kami
            </h1>
          </div>
        </div>
      </section>

      {/* 2. UTAMA: INTERACTIVE HUB & FORM KONSULTASI */}
      <section className="container mx-auto px-6 max-w-5xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          
          {/* SISI KIRI (INFO KANTOR & ACTION BUTTONS) */}
          <ScrollAnimate delay={0} className="md:col-span-2 space-y-8">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-amber-500 uppercase block mb-2">
                KONSULTASI PROFESIONAL
              </span>
              <h2 className="font-serif text-2xl font-bold text-white tracking-wide leading-tight">
                Mulai Lindungi Hak & Kepentingan Hukum Anda
              </h2>
              <p className="text-zinc-400 text-xs font-light leading-relaxed mt-4">
                Tim advokat dan konsultan hukum Satyavrata siap mendengarkan, menganalisis, dan memberikan solusi taktis yang berdasar atas hukum dan keadilan.
              </p>
            </div>

            {/* DETAIL ALAMAT & HUBUNGAN */}
            <div className="space-y-4 border-t border-zinc-900 pt-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-500 mb-1">Kantor Utama</span>
                <p className="text-zinc-300 text-xs font-light leading-relaxed">
                  Jl. Pendidikan No. 46, Pekayon, Pasar Rebo<br />Jakarta Timur, DKI Jakarta, Indonesia
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-500 mb-1">Korespondensi Digital</span>
                <p className="text-zinc-300 text-xs font-light">tristiawanh@gmail.com</p>
                <p className="text-zinc-300 text-xs font-light mt-0.5">+62 895-6096-38341</p>
              </div>
            </div>

            {/* TOMBOL QUICK ACTION ELEGAN DENGAN ICON SVG */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="https://wa.me/62895609638341" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center justify-center gap-2 flex-1 bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/40 text-center py-3.5 rounded-lg text-[11px] font-sans font-bold tracking-widest text-amber-500 hover:text-amber-400 transition-all duration-300 shadow-lg cursor-pointer group"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.986 3.288 1.481 4.72 1.482 5.4 0 9.79-4.38 9.793-9.761.002-2.605-1.002-5.054-2.829-6.882C16.505 2.164 14.062 1.16 11.46 1.16c-5.4 0-9.79 4.38-9.793 9.762-.001 2.15.612 4.043 1.772 5.645l-.999 3.648 3.74-.981zm12.396-6.666c-.1-.168-.368-.268-.773-.471-.404-.202-2.39-1.18-2.759-1.315-.369-.134-.638-.202-.907.202-.269.404-1.041 1.315-1.277 1.585-.236.269-.472.303-.877.101-.405-.202-1.71-.63-3.256-2.01-1.203-1.074-2.015-2.4-2.251-2.805-.236-.405-.025-.624.177-.824.182-.18.405-.472.607-.708.202-.236.27-.404.405-.674.135-.269.067-.505-.034-.708-.1-.202-.907-2.18-1.243-2.99-.328-.788-.661-.68-.907-.692-.234-.012-.504-.014-.773-.014-.269 0-.707.101-1.078.506-.37.404-1.415 1.383-1.415 3.371 0 1.988 1.448 3.908 1.65 4.178.202.269 2.848 4.35 6.9 6.1 1.011.432 1.71.663 2.333.86.953.303 1.82.26 2.505.158.763-.113 2.39-.977 2.727-1.921.337-.943.337-1.752.236-1.921z"/>
                </svg>
                WHATSAPP AUDIENCE
              </a>
              <a 
                href="https://maps.google.com/?q=Jl.+Pendidikan+No.+46,+Pekayon,+Pasar+Rebo,+Jakarta+Timur" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center justify-center gap-2 flex-1 bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 text-center py-3.5 rounded-lg text-[11px] font-sans font-bold tracking-widest text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer group"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-y-[-2px]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                OFFICE LOCATION
              </a>
            </div>
          </ScrollAnimate>

          {/* SISI KANAN (FORMULIR KASUS) */}
          <ScrollAnimate delay={200} className="md:col-span-3 w-full">
            <div className="bg-zinc-900/10 border border-zinc-800/60 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-xl hover:border-amber-500/20 transition-all duration-500">
              <h3 className="font-serif text-lg font-bold text-white tracking-wide mb-6 border-b border-zinc-900 pb-3">
                Formulir Telaah Kasus Awal
              </h3>

              {isSubmitted ? (
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs rounded-lg p-5 text-center leading-relaxed">
                  <p className="font-bold uppercase tracking-wider mb-1">✓ Permohonan Konsultasi Terkirim</p>
                  Terima kasih. Tim legal kami akan menelaah ringkasan kasus Anda dan menghubungi kembali dalam waktu maksimal 1x24 jam kerja.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-400">Nama Lengkap</label>
                      <input 
                        type="text" 
                        name="nama"
                        required
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        className="bg-zinc-950/80 border border-zinc-800 rounded-md px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-400">Alamat Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className="bg-zinc-950/80 border border-zinc-800 rounded-md px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-400">Nomor Kontak (WhatsApp)</label>
                      <input 
                        type="text" 
                        name="telepon"
                        required
                        value={formData.telepon}
                        onChange={handleChange}
                        placeholder="Contoh: 0812xxxx"
                        className="bg-zinc-950/80 border border-zinc-800 rounded-md px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-400">Klasifikasi Masalah Hukum</label>
                      <select 
                        name="kategoriHukum"
                        value={formData.kategoriHukum}
                        onChange={handleChange}
                        className="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500/60 transition-colors cursor-pointer"
                      >
                        <option value="Perdata & Bisnis">Sengketa Perdata & Komersial Business</option>
                        <option value="Agraria & Pertanahan">Hukum Agraria & Konflik Pertanahan</option>
                        <option value="Hukum Konstitusi">Uji Materiil & Sengketa Konstitusi</option>
                        <option value="Pidana">Hukum Pidana & Advokasi Litigasi</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-zinc-400">Ringkasan Pendek Kronologi Perkara</label>
                    <textarea 
                      name="pesan"
                      required
                      rows={4}
                      value={formData.pesan}
                      onChange={handleChange}
                      placeholder="Tuliskan gambaran singkat duduk perkara atau poin somasi/gugatan yang sedang Anda hadapi..."
                      className="bg-zinc-950/80 border border-zinc-800 rounded-md px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors resize-none placeholder:text-zinc-600 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs uppercase tracking-widest font-sans font-bold py-3 rounded-md transition-all duration-300 shadow-md shadow-amber-500/5 hover:shadow-amber-400/10 cursor-pointer mt-2"
                  >
                    KIRIM PERMOHONAN JADWAL KONSULTASI &rarr;
                  </button>

                </form>
              )}
            </div>
          </ScrollAnimate>

        </div>
      </section>

    </div>
  );
}