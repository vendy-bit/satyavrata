'use client';
import { useState, useEffect } from 'react';

export default function JDIHPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  // State untuk fitur pencarian dan halaman
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah dokumen per halaman

  useEffect(() => {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUJ9bSNDcyF0ZAhOv04b9MhHGigzFhJLD9uTcr6LCgBg_CCWnGhfg1BhNiDTk8pGeSihIxMPdOA5kR/pub?gid=0&single=true&output=csv";
    
    fetch(csvUrl, { cache: 'no-store' })
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.split('\n').slice(1);
        const data = rows
          .filter((row) => row.trim() !== "")
          .map((row) => {
            const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
            return { 
              title: cols[0]?.replace(/"/g, "") || "Tanpa Judul", 
              desc: (cols[2]?.replace(/"/g, "") || "Kategori") + " (" + (cols[1]?.replace(/"/g, "") || "Tahun") + ")", 
              link: cols[3]?.replace(/"/g, "").trim() || "#" 
            };
          });
        setDocuments(data);
      });
  }, []);

  // PERBAIKAN LOGIKA: Filter pencarian mencakup Judul, Deskripsi, Kategori, dan Tahun secara sensitif
  const filteredDocuments = documents.filter((doc) => {
    const cleanSearch = searchTerm.toLowerCase().trim();
    return (
      doc.title.toLowerCase().includes(cleanSearch) ||
      doc.desc.toLowerCase().includes(cleanSearch)
    );
  });

  // Reset ke halaman 1 jika user sedang mengetik pencarian baru
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Logika pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-16 overflow-x-hidden">
      <style jsx global>{`
        @keyframes floatSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float-slow { animation: floatSlow 4s ease-in-out infinite; }
      `}</style>
      
      {/* HERO HEADER - KONSISTEN DENGAN HALAMAN LAIN */}
      <section className="relative w-full h-[35vh] min-h-[220px] flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg animate-float-slow select-none">
              JDIH & Regulasi
            </h1>
            <p className="text-zinc-400 mt-4 font-light">Pusat dokumentasi hukum resmi yang dikelola Satyavrata.</p>
          </div>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="container mx-auto px-6 max-w-4xl mt-16 mb-24">
        
        {/* HEADER UTAMA & INPUT PENCARIAN */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-500 tracking-wide border-l-4 border-amber-500 pl-4">
              Daftar Peraturan
            </h2>
          </div>
          
          {/* TOMBOL / KOLOM CARI */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Cari nama peraturan, kategori, atau tahun..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 text-sm transition-all shadow-md placeholder-zinc-500"
            />
          </div>
        </div>

        {/* CONTAINER DAFTAR DOKUMEN */}
        <div className="flex flex-col gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((doc: any, index: number) => (
              <div 
                key={index} 
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-amber-500 transition-all shadow-lg flex items-center justify-between gap-4"
              >
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-lg font-semibold text-white break-words">{doc.title}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{doc.desc}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <a 
                    href={doc.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded text-sm transition block text-center"
                  >
                    Buka Dokumen
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
              Dokumen yang kamu cari tidak ditemukan.
            </div>
          )}
        </div>

        {/* NAVIGASI PAGINATION (PAGE 1, 2, DST.) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-white transition disabled:opacity-4 disabled:cursor-not-allowed text-xs font-semibold"
            >
              Prev
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-amber-600 text-black'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-white transition disabled:opacity-4 disabled:cursor-not-allowed text-xs font-semibold"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}