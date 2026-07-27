import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, Send, Bot, Sparkles, MessageSquare, ChevronRight, RefreshCw, Download, Mail, ExternalLink, Zap, MessageCircle } from 'lucide-react';
import { FAQS_DATA } from '../data/portfolioData';

interface FloatingAssistantProps {
  onNavigateContact: () => void;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  actionUrl?: string;
  actionLabel?: string;
}

interface SuggestionChip {
  id: string;
  icon: string;
  label: string;
  query: string;
  quickReply?: string;
  actionUrl?: string;
  actionLabel?: string;
}

const SUGGESTIONS: SuggestionChip[] = [
  {
    id: 'whatsapp',
    icon: '💬',
    label: 'Connect on WhatsApp',
    query: 'Connect directly with Ayman on WhatsApp',
    quickReply: 'Click below to open a direct WhatsApp chat with Ayman Ullah for instant project inquiries, consultancy, and research collaboration!',
    actionUrl: 'https://wa.me/?text=Hello%20Ayman%20Ullah%2C%20I%20am%20reaching%20out%20from%20your%20portfolio',
    actionLabel: 'Chat on WhatsApp Now',
  },
  {
    id: 'cv',
    icon: '📄',
    label: 'Download Official CV',
    query: 'Download Ayman Ullah CV PDF',
    quickReply: 'Here is Ayman Ullah\'s official Curriculum Vitae (PDF) covering B.Sc. in EEE, Diploma in Forestry, and 22+ industry certifications!',
    actionUrl: '/Ayman_Ullah_CV.pdf',
    actionLabel: 'Download CV PDF',
  },
  {
    id: 'eee',
    icon: '⚡',
    label: 'B.Sc. EEE Syllabus & Major',
    query: 'Tell me about Ayman\'s B.Sc. in EEE degree',
    quickReply: 'Ayman Ullah is an Electrical & Electronic Engineering student at Southern University Bangladesh (161 Credit OBE Syllabus). Core focus: GaN Power Converters, FPGA RISC-V VLSI, Embedded Systems, and Smart Grids.',
  },
  {
    id: 'forestry',
    icon: '🌲',
    label: 'Diploma in Forestry',
    query: 'What is his Diploma in Forestry background?',
    quickReply: 'Ayman holds a 4-Year Diploma in Forestry from Bangladesh Technical Education Board (BTEB 2022 Regulation, 8 Semesters) specializing in Remote Sensing GIS, Forest Canopy Density, Silviculture, and Environmental Protection.',
  },
  {
    id: 'projects',
    icon: '🚀',
    label: 'Top Hardware Projects',
    query: 'Show me Ayman\'s top engineering projects',
    quickReply: 'Top hardware innovations:\n• 3.5kW GaN High-Frequency Solar Inverter (98.8% Efficiency)\n• Autonomous STM32 Drone Flight Controller\n• 32-Bit FPGA RISC-V Custom Softcore Processor\n• ROS2 LiDAR SLAM Autonomous Indoor Mapping Robot',
  },
  {
    id: 'certs',
    icon: '🏆',
    label: '22+ Certifications',
    query: 'What are Ayman\'s industry certifications?',
    quickReply: 'Ayman holds 22+ verified certifications from Microsoft, Google, Meta, IBM, and Harvard Online covering Embedded Systems, IoT, Power Distribution, Azure AI, and GIS Spatial Analytics.',
  },
  {
    id: 'contact',
    icon: '✉️',
    label: 'Contact & Hiring',
    query: 'How can I contact or hire Ayman Ullah?',
    quickReply: 'You can reach Ayman Ullah directly via email at aymanullah.eng@gmail.com, or fill out the direct inquiry form on the Contact page!',
    actionLabel: 'Go to Contact Form',
  },
];

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ onNavigateContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'faq'>('ai');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Hello! I am AymanAI, your EEE & Forestry virtual assistant. Click any ready suggestion chip below or ask me anything about Ayman's projects, degrees, CV, or research!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleProcessQuery = async (queryText: string, chip?: SuggestionChip) => {
    if (!queryText.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: queryText }]);
    setLoading(true);

    // If chip has immediate pre-built reply, use it with a subtle delay for organic feel
    if (chip && chip.quickReply) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: chip.quickReply!,
            actionUrl: chip.actionUrl,
            actionLabel: chip.actionLabel,
          },
        ]);
        setLoading(false);
      }, 400);
      return;
    }

    // Otherwise, query backend API
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply || 'Response processed.' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Notice: Operating in local intelligence mode. Ayman Ullah specializes in Embedded C, GaN Power Converters, FPGA VLSI, and Remote Sensing GIS!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    handleProcessQuery(userText);
  };

  return (
    <>
      {/* CIRCULAR ICON CHATBOT FLOATING ASSISTANT TRIGGER */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Floating Tooltip Callout Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-2xl backdrop-blur-xl animate-bounce-slow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Need Help? • AymanAI Online</span>
        </div>

        {/* Circular Floating Chatbot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(236,72,153,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          title="Open AymanAI ChatBot"
        >
          {/* Inner Avatar Container */}
          <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center relative border border-slate-800">
            <img
              src="/ayman_profile.jpg"
              alt="AymanAI Avatar"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Sparkle Badge Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-1">
              <Bot className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            </div>
          </div>

          {/* Pulse Ping Ring */}
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-md animate-pulse" />
        </button>
      </div>

      {/* Floating Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full sm:max-w-md h-[580px] flex flex-col rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-white font-sans overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-r from-cyan-400 to-pink-500">
                  <img src="/ayman_profile.jpg" alt="AymanAI" className="w-full h-full object-cover rounded-full" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono text-cyan-300 flex items-center gap-1">
                    AymanAI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    EEE & Forestry Knowledge Bot
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/?text=Hello%20Ayman%20Ullah%2C%20I%20am%20reaching%20out%20from%20your%20portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-[10px] font-black flex items-center gap-1 transition-transform hover:scale-105 shadow-md cursor-pointer animate-pulse"
                  title="Connect on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 font-mono text-xs">
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'ai'
                    ? 'text-cyan-300 border-b-2 border-cyan-400 font-bold bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> AI Chat
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'faq'
                    ? 'text-cyan-300 border-b-2 border-cyan-400 font-bold bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> EEE FAQs
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'ai' ? (
              <div className="flex-1 flex flex-col p-4 overflow-hidden bg-slate-950/40">
                {/* Chat Message Stream */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-mono">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl space-y-2 ${
                          m.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-br-none shadow-md'
                            : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed font-sans">{m.text}</p>

                        {/* Embedded Action Button inside Chat Bot Message */}
                        {m.actionUrl && (
                          <div className="pt-2">
                            <a
                              href={m.actionUrl}
                              download
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-mono text-[11px] font-bold shadow-lg transition-transform hover:scale-105"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{m.actionLabel || 'Download File'}</span>
                            </a>
                          </div>
                        )}

                        {m.actionLabel && !m.actionUrl && (
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                onNavigateContact();
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-[11px] font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{m.actionLabel}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>Computing answer...</span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Ready-Made Suggestion Chips (NO TYPING NEEDED) */}
                <div className="pt-3 pb-1 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Instant Questions (Click to Ask):
                    </span>
                    <span className="text-cyan-400">Zero Typing Needed</span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {SUGGESTIONS.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => handleProcessQuery(chip.query, chip)}
                        disabled={loading}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 font-mono text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50 hover:scale-105"
                      >
                        <span>{chip.icon}</span>
                        <span>{chip.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Typing Bar */}
                <form onSubmit={handleFormSubmit} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type custom question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-colors font-bold disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-mono bg-slate-950/40">
                {FAQS_DATA.map((faq, i) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {faq.question}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-sans pl-5">{faq.answer}</p>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateContact();
                  }}
                  className="w-full mt-4 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold text-center transition-colors cursor-pointer"
                >
                  Direct Inquiry Contact Form →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
