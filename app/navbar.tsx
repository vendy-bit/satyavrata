'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Data Navigasi disesuaikan dengan folder di dalam app milikmu
  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Tim Kami', path: '/tim' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'JDIH', path: '/jdih' }, // Menu JDIH ditambahkan di sini
    { name: 'Galeri', path: '/galeri' },
  ];

  return (
    /* h-16 = lebih pendek, bg-black/50 = transparansi 50% hitam */
    <header className="fixed top-0 left-0 w-full z-[100] bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO - Satyavrata */}
        <Link href="/" className="flex items-center gap-3 select-none">
          <div className="relative w-9 h-9 overflow-hidden rounded">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="36px" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif tracking-[0.2em] text-lg font-bold text-amber-500 leading-none">SATYAVRATA</span>
            <span className="font-sans text-[8px] tracking-[0.15em] uppercase text-zinc-300 leading-none mt-1">Advocate & Legal Consultant</span>
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden lg:flex items-center gap-8 font-sans text-[10px] uppercase tracking-[0.2em] text-white font-bold">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className="hover:text-amber-500 transition-colors tracking-[0.2em]"
            >
              {item.name}
            </Link>
          ))}
          
          <Link href="/kontak" className="px-5 py-1.5 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all rounded-sm">
            KONTAK
          </Link>
        </nav>

        {/* HAMBURGER BUTTON (Mobile) */}
        <button 
          className="lg:hidden text-white p-2 flex flex-col justify-center gap-1.5 cursor-pointer z-50" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* PANEL NAV MOBILE */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-lg border-b border-zinc-900 py-6 px-6 flex flex-col gap-4 lg:hidden font-sans text-xs uppercase tracking-widest text-white font-bold shadow-2xl">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              onClick={() => setIsMenuOpen(false)}
              className="text-left py-2 hover:text-amber-500 transition-colors text-white block"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/kontak" 
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all mt-2 rounded block"
          >
            KONTAK
          </Link>
        </div>
      )}
    </header>
  );
}