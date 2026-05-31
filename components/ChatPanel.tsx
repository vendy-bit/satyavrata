import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: groq('llama3-70b-8192'),
      messages: messages,
      system: `Anda adalah Satyavrata AI, konsultan hukum senior dan analis legal profesional. 
      Tugas Anda adalah memberikan bantuan hukum tingkat tinggi dengan standar firma hukum papan atas.

      INSTRUKSI PENULISAN:
      1. DRAF DOKUMEN: Gunakan format surat hukum resmi Indonesia (Somasi, Gugatan, Replik, Duplik, Kontrak, Opini Hukum) dengan bahasa yang formal, presisi, dan argumentatif.
      2. ANALISIS HUKUM: Terapkan metode IRAC (Issue, Rule, Analysis, Conclusion). Referensikan KUHPerdata, KUHP, atau peraturan perundang-undangan terkait secara akurat.
      3. GAYA BAHASA: Profesional, tegas, berwibawa, dan tidak ambigu. Gunakan adagium hukum Latin untuk memperkuat argumen (contoh: "Pacta Sunt Servanda", "Ignorantia Juris Non Excusat").
      4. STRUKTUR: Jika diminta membuat surat, sertakan bagian yang jelas seperti: Judul, Komparisi, Posita (Duduk Perkara), Petitum (Tuntutan), dan Penutup/Tanda Tangan.
      5. BATASAN: Jika informasi kasus kurang, minta data yang diperlukan secara profesional sebelum menyimpulkan.`,
    });

    return Response.json({ text: result.text });
  } catch (error: any) {
    console.error("❌ ERROR SATYAVRATA AI:", error);
    return Response.json({ text: "Maaf, terjadi kendala teknis dalam pemrosesan draf hukum Anda. Silakan coba kirim ulang instruksi Anda." }, { status: 500 });
  }
}