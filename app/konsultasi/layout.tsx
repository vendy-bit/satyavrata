"use client";

import { SessionProvider } from "next-auth/react";

export default function KonsultasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hanya membungkus halaman-halaman yang ada di dalam folder /konsultasi saja
  return <SessionProvider>{children}</SessionProvider>;
}