'use client';

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-16 overflow-x-hidden">
      
      {/* INJECT ANIMASI FLOATING SECARA INSTAN & HALUS */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* HERO HEADER - Pendek dengan Animasi Teks Melayang */}
      <section 
        className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }} 
      >
        {/* Layer Gradasi Gelap di Kiri, Dewi Themis di Kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="max-w-xl">
            {/* Teks dengan efek animasi bergerak naik turun secara lambat */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              Tentang Kami
            </h1>
          </div>
        </div>
      </section>

      {/* FILOSOFI NAMA (INTRO) */}
      <section className="container mx-auto px-6 max-w-4xl mt-16 mb-20">
        <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
          
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-500 mb-4 tracking-wide">
            Komitmen pada Kebenaran
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed text-left mb-4 font-light">
            Nama <strong className="text-white font-semibold">SATYAVRATA</strong> berasal dari bahasa Sanskerta: <span className="italic text-amber-400">Satya</span> yang berarti kebenaran, dan <span className="italic text-amber-400">Vrata</span> yang berarti janji dan komitmen yang teguh.
          </p>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed text-left font-light">
            Nama ini bukan sekadar identitas hukum, nama ini adalah prinsip kerja yang mengikat setiap pemikiran, tindakan, dan keputusan yang diambil. Dalam dunia hukum yang kompleks, konsistensi pada kebenaran adalah fondasi yang tidak dapat dinegosiasikan.
          </p>
        </div>
      </section>

      {/* PILAR PRINSIP KERJA */}
      <section className="bg-[#050505] py-16 border-y border-zinc-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Tiga Pilar Praktik Hukum Kami
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-light">
              SATYAVRATA berdiri pada keyakinan bahwa praktik hukum yang baik lahir dari tiga hal yang saling menguatkan:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Solusi Hukum */}
            <div className="bg-[#0B0C10] border border-zinc-800/60 p-6 sm:p-8 rounded-xl hover:border-amber-500/30 transition-all duration-300 group">
              <div className="text-amber-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-3 tracking-wide">Solusi Hukum</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed text-left font-light">
                Hukum harus menjadi alat untuk menyelesaikan, bukan mempersulit. Setiap strategi yang dirancang berangkat dari analisis mendalam dan bertujuan pada hasil yang aplikatif, bukan sekadar wacana teoritis.
              </p>
            </div>

            {/* 2. Keadilan */}
            <div className="bg-[#0B0C10] border border-zinc-800/60 p-6 sm:p-8 rounded-xl hover:border-amber-500/30 transition-all duration-300 group">
              <div className="text-amber-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-3 tracking-wide">Keadilan</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed text-left font-light">
                Keadilan adalah tujuan akhir dari setiap proses hukum. Oleh karena itu, integritas dalam bekerja menjadi batas yang tidak pernah dilampaui, terlepas dari situasi dan tekanan eksternal.
              </p>
            </div>

            {/* 3. Kepercayaan */}
            <div className="bg-[#0B0C10] border border-zinc-800/60 p-6 sm:p-8 rounded-xl hover:border-amber-500/30 transition-all duration-300 group">
              <div className="text-amber-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-3 tracking-wide">Kepercayaan</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed text-left font-light">
                Kepercayaan dibangun melalui konsistensi, transparansi, dan tanggung jawab atas setiap langkah yang diambil. Reputasi dijaga melalui kerja yang dapat dipertanggungjawabkan secara profesional dan etis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILOSOFIS & CLOSING QUOTE */}
      <section className="container mx-auto px-6 max-w-3xl text-center pt-20 pb-16">
        <div className="relative inline-block">
          <span className="absolute -top-12 -left-14 text-8xl text-amber-500/10 font-serif select-none">“</span>
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-zinc-200 leading-relaxed tracking-wide mb-4">
            "Hukum tanpa kebenaran kehilangan arah. <br className="hidden sm:block" />
            Kebenaran tanpa hukum kehilangan bentuk."
          </blockquote>
          <span className="absolute -bottom-16 -right-14 text-8xl text-amber-500/10 font-serif select-none">”</span>
        </div>
        <p className="text-amber-500/80 font-sans text-[10px] tracking-[0.2em] uppercase mt-6 font-bold">
          — SATYAVRATA LAW FIRM
        </p>
      </section>

    </div>
  );
}