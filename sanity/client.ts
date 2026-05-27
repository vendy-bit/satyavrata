import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'xvpo8zb2', // Ini ID yang baru saja kita ambil
  dataset: 'production',
  apiVersion: '2026-05-27',
  useCdn: false, 
});