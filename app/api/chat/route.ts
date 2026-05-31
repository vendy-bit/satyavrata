import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 60;

// Fungsi riset internet yang aman tanpa merusak struktur kata kunci hukum
async function lakukanRisetTavily(query: string): Promise<string> {
  if (!process.env.TAVILY_API_KEY) return "";

  // Perbaikan: Hanya hapus kata perintah operasional yang berdiri sendiri di awal kalimat
  const cleanQuery = query
    .replace(/^(coba|cari|riset|risit|research|reseach|reserch|tolong|tampilkan)\s+/gi, "")
    .trim();

  if (!cleanQuery) return "";

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query: cleanQuery,
        search_depth: 'advanced',
        include_answer: true,
        max_results: 2,
      }),
      signal: controller.signal,
    });

    clearTimeout(id);
    if (!response.ok) return "";
    
    const data = await response.json();
    const ringkasan = data.answer || "";
    const cuplikanSitus = data.results 
      ? data.results.map((r: any) => `${r.title}: ${r.content}`).join("\n") 
      : "";
    
    return `${ringkasan}\n\n${cuplikanSitus}`;
  } catch (err) {
    clearTimeout(id);
    return "";
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    
    const butuhRiset = /cari|riset|risit|research|reseach|reserch|update|siapa|berita/i.test(lastUserMessage);
    
    let konteksRiset = "";
    if (butuhRiset) {
      console.log(`🔍 Memulai riset internet untuk: "${lastUserMessage}"`);
      konteksRiset = await lakukanRisetTavily(lastUserMessage);
    }

    const systemPrompt = `Anda adalah Satyavrata AI, konsultan hukum senior dan analis legal profesional.

    KHAZANAH MEMORI HUKUM WAJIB:
    - Anda mengetahui secara mutlak bahwa Pasal 603 UU No. 1 Tahun 2023 (KUHP Baru) mengatur tentang Tindak Pidana Korupsi (setiap orang yang secara melawan hukum melakukan perbuatan memperkaya diri sendiri, orang lain, atau korporasi yang merugikan keuangan negara atau perekonomian negara).

    INSTRUKSI FORMAT WAJIB:
    1. FORMAT TEKS POLOS: DILARANG KERAS menggunakan simbol bintang (*), pagar (#), atau kode markdown lainnya. Hasil harus berupa teks bersih (plain text).
    2. LISTING: Gunakan angka (1., 2., 3.) untuk daftar, jangan gunakan simbol bullet point.
    3. DRAF DOKUMEN: Gunakan format surat hukum resmi (KOP, Komparisi, Posita, Petitum) tanpa tebal/miring.
    4. GAYA BAHASA: Formal, tegas, profesional. Dilarang memberikan disclaimer AI. Jangan mengulang kata slang/umpatan dari pengguna (seperti 'anjai'). DILARANG KERAS menggunakan kalimat basa-basi template AI seperti "Saya harap informasi ini dapat membantu" atau "Semoga penjelasan ini berguna". Langsung tutup saja dengan Penutup Wajib di akhir teks.
    5. INGAT SEMUA KONTEKS: Anda memiliki memori penuh atas seluruh riwayat obrolan ini. Jangan pernah mengulang instruksi yang sudah diberikan.
    6. ANALISIS MENDALAM: Jangan hanya memberikan jawaban permukaan. Kaitkan setiap jawaban dengan pasal-pasal relevan dan logika hukum (IRAC).
    7. NO LIMIT: Anda tidak memiliki batasan memori. Berikan analisis hukum yang paling komprehensif dan detail.
    8. KONSISTENSI: Jika Anda sudah memberikan opini hukum, pastikan argumen berikutnya tetap konsisten dengan opini sebelumnya.
    9. TEKNIS: Gunakan IRAC untuk analisis. Jika data kurang, minta data dengan nada profesional.
    10. PENUTUP WAJIB: Setiap akhir respons, tutup dengan kalimat penutup khas Satyavrata AI yang elegan: "Keadilan adalah tanggung jawab intelektual. Satyavrata AI tetap mendampingi langkah hukum Anda."
    11. ZERO DISCLAIMER: Jangan sebutkan Anda AI, tidak punya limitasi, atau disclaimer apa pun.`;

    const finalSystemPrompt = konteksRiset 
      ? `${systemPrompt}\n\nBERIKUT DATA INTERNET TERBARU:\n${konteksRiset}`
      : systemPrompt;

    let completion;
    
    try {
      completion = await openai.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: finalSystemPrompt },
          ...messages
        ],
        temperature: 0.2, 
        max_tokens: 3000,
      });
    } catch (groqError) {
      console.warn("⚠️ Beralih ke model cadangan...");
      completion = await openai.chat.completions.create({
        model: 'llama-3.1-8b-instant', 
        messages: [
          { role: 'system', content: finalSystemPrompt },
          ...messages
        ],
        temperature: 0.2, 
        max_tokens: 3000,
      });
    }

    return Response.json({ text: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("❌ ERROR UTAMA:", error);
    return Response.json({ 
      text: "Maaf, terjadi kendala teknis pada pemrosesan data. Silakan coba kembali.\n\nKeadilan adalah tanggung jawab intelektual. Satyavrata AI tetap mendampingi langkah hukum Anda." 
    }, { status: 200 });
  }
}