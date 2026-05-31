"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Bot, Scale, History, Upload, LogOut, ArrowLeft, Send, Plus, Search, Trash2, Copy, Share2, Mic, MicOff, FileText, X, Menu } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export default function WorkspaceDynamicPage() {
  const params = useParams();
  const router = useRouter();
  const activeSessionId = params.id as string;

  const { data: session, status } = useSession();

  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  // State Fitur Interaktif Tambahan
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  // State Khusus Kendali Menu Riwayat Mobile
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const currentSession = sessions.find(s => s.id === activeSessionId) || { id: activeSessionId, title: "Konsultasi Hukum Baru", messages: [] };

  useEffect(() => {
    if (status === "authenticated" && session) {
      const saved = localStorage.getItem("satyavrata_chats");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
        
        if (!parsed.some((s: ChatSession) => s.id === activeSessionId)) {
          const newChat = { id: activeSessionId, title: "Konsultasi Hukum Baru", messages: [] };
          const updated = [newChat, ...parsed];
          setSessions(updated);
          localStorage.setItem("satyavrata_chats", JSON.stringify(updated));
        }
      } else {
        const initial = [{ id: activeSessionId, title: "Konsultasi Hukum Baru", messages: [] }];
        setSessions(initial);
        localStorage.setItem("satyavrata_chats", JSON.stringify(initial));
      }
    }
  }, [activeSessionId, status, session]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  const cleanMarkdownText = (text: string) => {
    if (!text) return "";
    return text.replace(/\*\*/g, "").replace(/\*\//g, "- ").replace(/#/g, "");
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(cleanMarkdownText(text));
    alert("Analisis hukum berhasil disalin ke papan klip!");
  };

  const handleShareMessage = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Analisis Hukum Satyavrata AI",
          text: cleanMarkdownText(text),
        });
      } catch (err) {
        console.log("Batal membagikan.", err);
      }
    } else {
      navigator.clipboard.writeText(cleanMarkdownText(text));
      alert("Fitur share tidak didukung browser desktop. Teks otomatis dialihkan ke papan klip!");
    }
  };

  const toggleVoiceRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          setChatInput((prev) => {
            const label = "[Instruksi Pesan Suara Berhasil Direkam]";
            return prev ? `${prev} ${label}` : label;
          });
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Gagal mendapatkan akses mikrofon sistem:", err);
        alert("Gagal membuka mikrofon. Pastikan Anda memberikan izin akses hardware di sudut bar URL browser Anda.");
        setIsRecording(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() && !selectedFile || isLoading) return;

    setIsLoading(true);
    let userText = chatInput;
    let isiKontenBerkas = "";

    if (selectedFile) {
      try {
        if (selectedFile.type === "text/plain" || selectedFile.name.endsWith(".txt")) {
          isiKontenBerkas = await selectedFile.text();
        } else {
          isiKontenBerkas = `[Analisis Dokumen Litigasi Terformat Resmi: Teks dari berkas berkadar pembuktian ${selectedFile.name} siap diekstraksi ke basis data penasihat hukum]`;
        }
        
        userText = `[Lampiran Berkas: ${selectedFile.name}]\n\nIsi Konten Dokumen:\n${isiKontenBerkas}\n\nPertanyaan/Instruksi Tambahan: ${userText}`;
      } catch (err) {
        console.error("Gagal mengekstraksi berkas perkara:", err);
      }
    }

    setChatInput(""); 
    setSelectedFile(null);
    
    const updatedMessages: Message[] = [...currentSession.messages, { role: "user", content: userText }];
    let currentTitle = currentSession.title;
    if (currentSession.messages.length === 0 || currentSession.title === "Obrolan Baru" || currentSession.title === "Konsultasi Hukum Baru") {
      currentTitle = chatInput.trim() ? chatInput.trim().split(" ").slice(0, 4).join(" ") + "..." : selectedFile ? `File: ${selectedFile.name}` : "Obrolan Baru";
    }

    const nextSessionsState = sessions.map(s => s.id === activeSessionId ? { ...s, title: currentTitle, messages: updatedMessages } : s);
    setSessions(nextSessionsState);
    localStorage.setItem("satyavrata_chats", JSON.stringify(nextSessionsState));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json().catch(() => ({ text: "❌ Gagal membaca respon dari server." }));
      const finalMessages: Message[] = [...updatedMessages, { role: "assistant", content: data.text || "❌ Terjadi kendala." }];
      const finalSessionsState = sessions.map(s => s.id === activeSessionId ? { ...s, title: currentTitle, messages: finalMessages } : s);
      
      setSessions(finalSessionsState);
      localStorage.setItem("satyavrata_chats", JSON.stringify(finalSessionsState));
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen w-screen bg-[#0B0C10] flex items-center justify-center font-sans">
        <div className="animate-pulse text-amber-500 font-semibold text-xs tracking-[0.25em] uppercase">
          Memverifikasi Otoritas Akses...
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="fixed inset-0 z-[999999] h-screen w-screen bg-[#0B0C10] flex flex-col items-center justify-center font-sans px-4">
        <div className="max-w-md w-full p-8 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl rounded-2xl text-center space-y-6 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="flex flex-col items-center gap-3 relative z-10">
            <Scale className="h-10 w-10 text-amber-500" />
            <h2 className="text-xl font-serif font-bold text-white tracking-wide uppercase">Satyavrata Workspace</h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              Silakan masuk dengan akun Google untuk mengamankan berkas perkara Anda.
            </p>
          </div>

          <button
            onClick={() => signIn("google")}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/10 hover:opacity-95 active:scale-[0.98] transition-all tracking-widest uppercase"
          >
            Masuk Lewat Akun Google
          </button>
        </div>
      </div>
    );
  }

  const formatMarkdownBold = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-extrabold text-amber-400">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleCreateNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newChat: ChatSession = { id: newId, title: "Obrolan Baru", messages: [] };
    const updated = [newChat, ...sessions.filter(s => s.messages.length > 0 || s.id === activeSessionId)];
    setSessions(updated);
    localStorage.setItem("satyavrata_chats", JSON.stringify(updated));
    setIsMobileSidebarOpen(false);
    router.push(`/konsultasi/${newId}`);
  };

  const handleDeleteSession = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    const updatedSessions = sessions.filter(s => s.id !== idToDelete);
    if (updatedSessions.length === 0) {
      const newId = `session-${Date.now()}`;
      const initial = [{ id: newId, title: "Konsultasi Hukum Baru", messages: [] }];
      setSessions(initial);
      localStorage.setItem("satyavrata_chats", JSON.stringify(initial));
      router.push(`/konsultasi/${newId}`);
    } else {
      setSessions(updatedSessions);
      localStorage.setItem("satyavrata_chats", JSON.stringify(updatedSessions));
      if (activeSessionId === idToDelete) {
        router.push(`/konsultasi/${updatedSessions[0].id}`);
      }
    }
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserInitials = (name?: string | null) => {
    if (!name) return "US";
    return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-zinc-900 text-zinc-100">
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <Scale className="h-5 w-5" /> <span>Satyavrata Panel</span>
          </div>
          <Link href="/konsultasi" className="text-zinc-500 hover:text-zinc-300">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <button 
          onClick={handleCreateNewChat}
          className="w-full py-2.5 px-4 rounded-xl border border-dashed border-zinc-700 hover:border-amber-500/50 bg-zinc-950/40 text-xs font-semibold text-amber-500 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Obrolan Baru</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Cari riwayat..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700" 
          />
        </div>

        <div className="space-y-1 pt-2">
          <div className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase px-2">Riwayat Perkara</div>
          <div className="space-y-1 max-h-[calc(100dvh-260px)] overflow-y-auto pr-1">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => {
                  router.push(`/konsultasi/${session.id}`);
                  setIsMobileSidebarOpen(false);
                }}
                className={`group w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between cursor-pointer border transition-colors ${
                  session.id === activeSessionId ? "bg-amber-500/10 text-amber-400 border-amber-500/20 font-medium" : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <History className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  <span className="truncate flex-1">{session.title}</span>
                </div>
                <button onClick={(e) => handleDeleteSession(session.id, e)} className="p-1 rounded-md text-zinc-600 hover:text-red-400 hover:bg-zinc-800 md:opacity-0 group-hover:opacity-100 transition-all ml-1">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-950/40 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-zinc-950 font-bold text-sm flex-shrink-0">
            {getUserInitials(session.user?.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-semibold truncate text-zinc-200">{session.user?.name || "Klien Satyavrata"}</div>
            <div className="text-[10px] sm:text-[11px] text-zinc-500 truncate">{session.user?.email || "Premium Member"}</div>
          </div>
        </div>
        <Link href="/konsultasi" className="text-zinc-500 hover:text-red-400 transition-colors ml-2">
          <LogOut className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  return (
    // PERBAIKAN UTAMA: Menggunakan h-[100dvh] agar tinggi aplikasi dinamis mengikuti area aktif layar HP
    <div className="fixed inset-0 z-[99999] h-[100dvh] w-screen bg-[#0B0C10] text-zinc-100 flex overflow-hidden font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* 1. SIDEBAR DESKTOP */}
      <aside className="w-72 border-r border-zinc-800 hidden md:flex flex-col h-full shrink-0">
        <SidebarContent />
      </aside>

      {/* 2. LACI SLIDE-OUT / MOBILE DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsMobileSidebarOpen(false)} 
          />
          <div className="relative w-72 h-full flex flex-col z-10 animate-in slide-in-from-left duration-300">
            <SidebarContent />
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 -right-12 p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD KOTAK CHAT UTAMA */}
      <main className="flex-1 flex flex-col h-full bg-[#0B0C10] relative overflow-hidden justify-between">
        
        {/* HEADER DASHBOARD CHAT */}
        <header className="h-16 border-b border-zinc-900 px-4 sm:px-6 flex items-center justify-between bg-zinc-900/20 backdrop-blur shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white md:hidden active:scale-95 transition-all cursor-pointer"
            >
              <Menu className="h-4 w-4" />
            </button>
            
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-zinc-200">Asisten Litigasi Utama</h2>
              <p className="text-[10px] sm:text-[11px] text-zinc-500">Satyavrata AI</p> 
            </div>
          </div>
          
          <Link href="/konsultasi" className="text-zinc-500 hover:text-zinc-300 md:hidden text-xs font-medium flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali
          </Link>
        </header>

        {/* AREA ISI BALASAN CHAT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl w-full mx-auto pb-4">
          {currentSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-16 sm:pt-24 px-4">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 animate-pulse">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-200">Satyavrata Litigasi Dashboard</h3>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                Silakan perintahkan draf perkara hukum (Gugatan, Somasi, Replik) atau analisis yurisprudensi.
              </p>
            </div>
          ) : (
            currentSession.messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[88%] sm:max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-amber-500 text-zinc-950 font-medium rounded-tr-none" : "bg-zinc-900 border border-zinc-800 text-gray-200 rounded-tl-none"}`}>
                  {formatMarkdownBold(m.content)}
                </div>
                
                {m.role === "assistant" && (
                  <div className="flex items-center gap-3 mt-2 ml-1 text-zinc-500 text-[11px] sm:text-xs">
                    <button type="button" onClick={() => handleCopyMessage(m.content)} className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-pointer">
                      <Scale className="h-3.5 w-3.5" />
                      <span>Salin</span>
                    </button>
                    <button type="button" onClick={() => handleShareMessage(m.content)} className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-pointer">
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Bagikan</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs rounded-xl px-4 py-2.5 animate-pulse">
                Sedang mengkaji dalil perkara hukum...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* PERBAIKAN FORM INPUT BAWAH: Menggunakan sticky bottom-0, ditambah padding-bottom ekstra khusus HP agar terhindar dari gesture bar */}
        <form onSubmit={handleSendMessage} className="sticky bottom-0 inset-x-0 p-4 pb-6 sm:p-6 bg-[#0B0C10] border-t border-zinc-900/50 flex flex-col gap-2 z-30 shrink-0">
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".txt,.pdf,.doc,.docx"
          />

          <div className="max-w-4xl w-full mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-3 space-y-3 shadow-2xl">
            
            {selectedFile && (
              <div className="px-3 py-1.5 bg-zinc-950/60 border border-amber-500/20 rounded-xl flex items-center justify-between text-[11px] sm:text-xs text-amber-500 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="truncate font-medium">{selectedFile.name}</span>
                </div>
                <button type="button" onClick={() => setSelectedFile(null)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <textarea 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }} 
              placeholder={isRecording ? "Mendengarkan rekaman audio, silakan bicara..." : "Perintahkan analisis atau draf berkas di sini..."} 
              className={`w-full bg-transparent resize-none text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none min-h-[40px] max-h-[80px] transition-all ${isRecording ? "text-amber-400 font-medium" : ""}`} 
            />
            
            <div className="flex items-center justify-between border-t border-zinc-800/60 pt-2.5">
              <div className="flex items-center gap-1 sm:gap-2">
                
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-[11px] sm:text-xs font-medium cursor-pointer ${selectedFile ? "text-amber-400 bg-amber-500/5 border border-amber-500/20" : "text-zinc-500 hover:text-amber-500 hover:bg-zinc-800/40"}`}
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </button>

                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-[11px] sm:text-xs font-medium cursor-pointer ${isRecording ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse" : "text-zinc-500 hover:text-amber-500 hover:bg-zinc-800/40"}`}
                  title={isRecording ? "Matikan Perekam" : "Aktifkan Pesan Suara"}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span className="hidden sm:inline">{isRecording ? "Mendengarkan..." : "Pesan Suara"}</span>
                </button>

              </div>
              
              <button 
                type="submit" 
                disabled={!chatInput.trim() && !selectedFile || isLoading} 
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-[11px] sm:text-xs flex items-center gap-1.5 hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-amber-500/5"
              >
                <span>Analisis</span>
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}