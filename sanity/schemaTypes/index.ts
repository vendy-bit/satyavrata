// File: sanity/schemaTypes/index.ts
import artikel from './artikel' // Tanpa kurung kurawal {}
import { galeriType } from './galeri';   // <--- 1. IMPORT SKEMA BARU INI

export const schemaTypes = [
  artikel, // Masukkan ke dalam array ini
  galeriType, // Masukkan ke dalam array ini
]