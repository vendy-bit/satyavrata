"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Copy, Share2, Paperclip, Mic, MicOff, FileText } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [lokalInput, setLokalInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State Baru untuk Fitur Upload & Suara
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- JURUS PEMBERSIH TEKS ---
  const cleanText = (text: string) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "- ")
      .replace(/#/g, "");
  };

  // --- 1. FITUR SALIN TEKS ---
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(cleanText(text));
    alert("Teks analisis hukum berhasil disalin!");
  };

  // --- 2. FITUR BAGIKAN ---
  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Analisis Hukum Satyavrata AI",
          text: cleanText(text),
        });
      } catch (err) {
        console.log("Batal membagikan:", err);
      }
    } else {
      navigator.clipboard.writeText(cleanText(text));
      alert("Fitur share tidak didukung browser ini. Teks otomatis disalin!");
    }
  };

  // --- 3. FITUR PESAN SUARA (SPEECH TO TEXT) ---
  const toggleVoiceRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser lo belum mendukung fitur perekaman suara.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID"; 
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);
      
      recognition.onresult = (event: any) => {
        const hasilSuara = event.results[0][0].transcript;
        setLokalInput((prev) => (prev ? `${prev} ${hasilSuara}` : hasilSuara));
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  // --- 4. FITUR HANDLING UPLOAD BERKAS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lokalInput.trim() && !selectedFile || isLoading) return;

    let pesanUserText = lokalInput;
    
    // Jika ada file yang diupload, tambahkan info file ke dalam teks pesan chat
    if (selectedFile) {
      pesanUserText = `[Lampiran Berkas: ${selectedFile.name}] ${pesanUserText}`;
    }

    setLokalInput(""); 
    setSelectedFile(null); // Reset berkas setelah dikirim
    
    const updatedMessages: Message[] = [...messages, { role: "user", content: pesanUserText }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json().catch(() => ({ text: "❌ Gagal membaca respon." }));
      setMessages([...updatedMessages, { role: "assistant", content: data.text }]);
    } catch (error: any) {
      setMessages([...updatedMessages, { role: "assistant", content: "❌ Koneksi terputus." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans text-gray-200">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-zinc-950 shadow-xl shadow-amber-500/20 hover:scale-105 transition-all active:scale-95"
        >
          <MessageSquare className="h-6 w-6 font-bold" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-500">Satyavrata Legal AI</div>
                <div className="text-[11px] text-gray-400">Asisten Hukum Standby</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Area Isi Pesan */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
            {messages.length === 0 && (
              <div className="text-center pt-12 space-y-2">
                <p className="text-sm text-zinc-400 font-medium">Selamat datang di Satyavrata AI</p>
                <p className="text-xs text-zinc-500 max-w-[250px] mx-auto">
                  Silakan tanyakan dasar hukum, draf pasal, atau analisis kasus litigasi Indonesia.
                </p>
              </div>
            )}
            
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-amber-500 text-zinc-950 font-medium rounded-tr-none"
                      : "bg-zinc-800 border border-zinc-700/60 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {cleanText(m.content)}
                </div>
                
                {/* TOMBOL ICON ACTION (SALIN & BAGIKAN) UNTUK JAWABAN AI */}
                {m.role === "assistant" && (
                  <div className="flex items-center gap-3 mt-1.5 ml-2 text-zinc-500 text-xs">
                    <button onClick={() => handleCopy(m.content)} className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin</span>
                    </button>
                    <button onClick={() => handleShare(m.content)} className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Bagikan</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 border border-zinc-700/60 text-gray-400 text-xs rounded-xl rounded-tl-none px-4 py-2.5 animate-pulse">
                  Satyavrata sedang menganalisis dalil...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Notifikasi Preview File Terpilih */}
          {selectedFile && (
            <div className="px-3 py-1.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-amber-500">
              <div className="flex items-center gap-1.5 truncate max-w-[90%]">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{selectedFile.name}</span>
              </div>
              <button onClick={() => setSelectedFile(null)} className="text-gray-500 hover:text-gray-300">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Form Input Baris Bawah */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-zinc-950 border-t border-zinc-800 flex flex-col gap-2">
            {/* Input file sembunyi (hidden) yang dikendalikan oleh tombol Clip */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".txt,.pdf,.doc,.docx"
            />
            
            <div className="flex gap-2 items-center">
              {/* Tombol Upload Berkas yang Sekarang Aktif */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-500 transition-colors"
                title="Upload Berkas Analisis"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <input
                value={lokalInput}
                onChange={(e) => setLokalInput(e.target.value)}
                placeholder={isRecording ? "Mendengarkan suara lo..." : "Tulis pertanyaan hukum di sini..."}
                className={`flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors ${isRecording ? "border-red-500/50 bg-red-950/10" : ""}`}
              />
              
              {/* Tombol Mikrofon Pesan Suara */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`p-2.5 rounded-xl border transition-colors ${isRecording ? "bg-red-500 text-white border-red-600 animate-pulse" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-amber-500"}`}
                title="Pesan Suara"
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <button
                type="submit"
                disabled={!lokalInput.trim() && !selectedFile || isLoading}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5 font-bold text-xs shrink-0"
              >
                <span>Kirim</span>
                <Send className="h-3 w-3" />
              </button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
}