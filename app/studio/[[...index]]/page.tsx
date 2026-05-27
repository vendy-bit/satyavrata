'use client'

import { NextStudio } from 'next-sanity/studio'
// Pastikan path ini benar-benar mengarah ke file config.ts
import config from '../../../sanity/sanity.config' 

export default function StudioPage() {
  // Kita coba render NextStudio dengan config yang sudah di-force
  return <NextStudio config={config as any} />
}