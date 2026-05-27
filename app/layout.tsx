import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kantor Hukum Satyavrata",
  description: "Kantor Hukum Satyavrata hadir memberikan solusi hukum strategis, tuntas, dan berdedikasi penuh dalam melindungi hak Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const waPhoneNumber = "62895609638341";
  const waMessage = "Halo Kantor Hukum Satyavrata, saya ingin berkonsultasi mengenai permasalahan hukum. Apakah bisa dibantu?";
  const waLink = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0B0C10] text-[#ECF0F1]">
        
        {/* HEADER DIPANGGIL KE SINI */}
        <Navbar />

        {/* KONTEN HALAMAN */}
        <main className="flex-grow">
        {children}
        </main>

        {/* WIDGET WHATSAPP GLOBAL */}
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-[99] group flex items-center gap-3">
          <div className="hidden md:block bg-white text-black px-4 py-2 rounded-lg text-sm font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 relative">
            Halo, ada yang bisa Kami bantu?
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
          </div>
          <div className="bg-[#25D366] hover:bg-[#1ebd5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce hover:animate-none">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.101.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937 0 3.825-3.113 6.938-6.938 6.938z" />
            </svg>
          </div>
        </a>

        {/* FOOTER GLOBAL - VERSI PREMIUM */}
        <footer className="bg-[#050505] border-t-2 border-amber-500/20 pt-20 pb-10 mt-auto relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              
              {/* KOLOM 1: IDENTITAS */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 overflow-hidden rounded">
                    <Image src="/logo.png" alt="Logo Satyavrata" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-serif tracking-[0.22em] text-xl font-bold text-amber-500 leading-none mb-1">SATYAVRATA</span>
                    <span className="text-[9px] tracking-[0.14em] uppercase text-zinc-400 leading-none block">Advocate & Legal Consultant</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">Firma hukum berdedikasi tinggi mengedepankan integritas dan profesionalisme. Kami hadir untuk memberikan solusi hukum strategis dan melindungi hak Anda.</p>
              </div>
              
              {/* KOLOM 2: MENU UTAMA */}
              <div className="space-y-6">
                <h4 className="text-white font-serif tracking-widest text-sm uppercase border-b border-zinc-800 pb-3">Menu Utama</h4>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> Beranda</Link></li>
                  <li><Link href="/tentang" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> Tentang Kami</Link></li>
                  <li><Link href="/tim" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> Tim Advokat</Link></li>
                  <li><Link href="/artikel" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> Artikel / Wawasan</Link></li>
                  <li><Link href="/jdih" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> JDIH</Link></li>
                  <li><Link href="/galeri" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> Galeri Klien</Link></li>
                  <li><Link href="/kontak" className="text-zinc-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2"><span className="text-amber-500/50">›</span> Kontak</Link></li>
                </ul>
              </div>

              {/* KOLOM 3: AREA LAYANAN */}
              <div className="space-y-6">
                <h4 className="text-white font-serif tracking-widest text-sm uppercase border-b border-zinc-800 pb-3">Area Layanan</h4>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  <li>• Hukum Pidana</li>
                  <li>• Sengketa Perdata</li>
                  <li>• Tata Usaha Negara</li>
                  <li>• Keluarga & Waris</li>
                  <li>• Sengketa Konstitusi</li>
                </ul>
              </div>
              
              {/* KOLOM 4: HUBUNGI KAMI */}
              <div className="space-y-6">
                <h4 className="text-white font-serif tracking-widest text-sm uppercase border-b border-zinc-800 pb-3">Hubungi Kami</h4>
                <div className="space-y-4 text-zinc-400 text-sm">
                  <p>Jalan Pendidikan Nomor 46, Pekayon, Pasar Rebo, Jakarta Timur, DKI Jakarta.</p>
                  <p className="text-amber-500 font-bold">+62 895-6096-38341</p>
                  <p>tristiawanh@gmail.com</p>
                </div>
              </div>

            </div>

            <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[10px]">
              © {new Date().getFullYear()} Kantor Hukum Satyavrata. All Rights Reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}