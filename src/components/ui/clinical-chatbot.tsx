import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Bot,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: string;
  category: "popular" | "products" | "science" | "ordering";
  question: string;
  shortLabel: string;
  answer: string;
  actionText?: string;
  actionLink?: string;
  isExternalLink?: boolean;
}

export const PREDEFINED_FAQS: FAQItem[] = [
  // 1. POPULAR
  {
    id: "faq-staining",
    category: "popular",
    shortLabel: "Tooth Staining / SDF?",
    question: "Does Nanion Elite or Nano Silver Pro cause black tooth staining like traditional SDF?",
    answer:
      "No! SPARK-DV formulations use a proprietary non-staining Nano Silver Fluoride (NSF) colloidal matrix stabilized with biocompatible capping polymers and nano-hydroxyapatite. Unlike traditional 38% Silver Diamine Fluoride (SDF) which oxidizes to precipitate dark metallic silver oxides, our NSF halts active caries without staining healthy or arrested dentin black.",
    actionText: "View Nanion Elite (3% NSF)",
    actionLink: "/products/nanion-elite",
  },
  {
    id: "faq-diff-pro",
    category: "popular",
    shortLabel: "Nanion vs Nanion Pro?",
    question: "What is the clinical difference between Nanion and Nanion Pro?",
    answer:
      "• Nanion (Lite/Elite) features 2%–3% Nano Silver Fluoride for targeted antimicrobial caries arrest, sustained fluoride release, and biofilm disruption.\n\n• Nanion Pro (Lite Pro/Elite Pro) adds a 5% nano-Hydroxyapatite (nHA) dual-matrix. This active scaffold precipitates calcium-phosphate lattices directly into exposed dentinal tubules, sealing micro-porosities and speeding enamel remineralization.",
    actionText: "Explore Nanion Lite Pro",
    actionLink: "/products/nanion-lite-pro",
  },
  {
    id: "faq-founder",
    category: "popular",
    shortLabel: "Founder & Mission?",
    question: "Who founded SPARK-DV and what is the company's background?",
    answer:
      "SPARK-DV was founded by Dr. Ajay Reddy Mareddy (BDS, MDS), a practicing pediatric dental surgeon and academic researcher. Dr. Mareddy holds published WIPO patents in dental biomaterials (WO2009098710A1 & WO2015155629A1). The company's mission is to engineer high-impact, non-invasive pediatric dental biomaterials designed for clinical relevance in India and worldwide.",
    actionText: "Read Founder Story",
    actionLink: "/about",
  },
  {
    id: "faq-samples",
    category: "popular",
    shortLabel: "Clinical Samples / Pricing?",
    question: "How can dental clinics request samples or institutional pricing?",
    answer:
      "We provide starter evaluation kits and wholesale pricing for verified dental clinics, pedodontic departments, and healthcare distribution partners. You can submit an institutional inquiry on our Contact page or message our direct logistics desk on WhatsApp at +91 9246901870.",
    actionText: "Request Clinic Pricing",
    actionLink: "/contact",
  },

  // 2. PRODUCTS
  {
    id: "faq-swish",
    category: "products",
    shortLabel: "Nanion Swish for Braces?",
    question: "How does Nanion Swish Mouthwash work for children with orthodontic braces?",
    answer:
      "Nanion Swish is a 100% alcohol-free, non-burning colloidal NSF daily rinse. In orthodontic patients where bracket brackets trap cariogenic biofilm, Nanion Swish penetrates interdental spaces to prevent decalcification and white spot lesions without mucosal irritation or dry mouth.",
    actionText: "Inspect Nanion Swish",
    actionLink: "/products/nanion-swish",
  },
  {
    id: "faq-pobtura",
    category: "products",
    shortLabel: "P-Obtura Bio-Activ in Pedo?",
    question: "What makes P-Obtura Bio-Activ suitable for primary tooth pulpectomies?",
    answer:
      "P-Obtura Bio-Activ is a premixed, bioactive bioceramic calcium silicate paste specifically developed for pediatric endodontics. It features high radiopacity, moisture tolerance, and an alkaline pH that stimulates periapical repair. Crucially, its resorption rate synchronizes with the physiological resorption of primary tooth roots.",
    actionText: "View P-Obtura Bio-Activ",
    actionLink: "/products/pobtura",
  },
  {
    id: "faq-files",
    category: "products",
    shortLabel: "Pedo Spark NiTi Files?",
    question: "Why use Pedo Spark NiTi Rotary Files instead of standard endodontic files?",
    answer:
      "Primary root canals are tortuous, ribbon-shaped, and have thinner dentinal walls. Pedo Spark files feature Black Oxide and Black Gold heat-treated metallurgy, shorter 16mm/18mm lengths for limited pediatric mouth openings, and progressive tapers that avoid apical zipping or ledging.",
    actionText: "Explore Pedo Spark Files",
    actionLink: "/products/pedo-spark-single",
  },
  {
    id: "faq-crowns",
    category: "products",
    shortLabel: "MARC 3D vs Zirc Crowns?",
    question: "What is the difference between MARC 3D and MARC Zirc Crowns?",
    answer:
      "• MARC 3D Crowns: Preformed resin hybrid pediatric crowns offering flexible elasticity, seamless crimping, and high fracture toughness.\n\n• MARC Zirc Crowns: 100% biocompatible, monolithic zirconia crowns providing maximum aesthetic translucency, zero wear to opposing teeth, and clinical longevity for aesthetic anterior cases.",
    actionText: "View MARC Zirc Crowns",
    actionLink: "/products/marc-zirc",
  },
  {
    id: "faq-gummies",
    category: "products",
    shortLabel: "Oral Health Gummies?",
    question: "How do Nanion Pro Plus Oral Health Gummies work?",
    answer:
      "Nanion Pro Plus Gummies use a 4-layer targeted oral-gut axis approach:\n1. Probiotics (B. coagulans, B. subtilis, S. salivarius)\n2. Prebiotics (Xylitol & FOS)\n3. Biomimetic P11-4 self-assembling oligopeptide\n4. L-Arginine ADS buffer which raises plaque pH above 5.5 to neutralize acidic demineralization.",
    actionText: "Discover Pro Plus Gummies",
    actionLink: "/products/nanion-pro-plus-gummies",
  },

  // 3. SCIENCE & R&D
  {
    id: "faq-mfg",
    category: "science",
    shortLabel: "Manufacturing & Quality?",
    question: "Where are SPARK-DV products manufactured and certified?",
    answer:
      "All SPARK-DV biomaterials are proudly developed and manufactured in India by 3K NANO PVT. LTD. under strict ISO 13485 medical device quality systems, and marketed by Sendan Pharmaceuticals. Every batch undergoes rigorous microbiological assay and release testing.",
    actionText: "See Quality Certifications",
    actionLink: "/about",
  },
  {
    id: "faq-arrest-rate",
    category: "science",
    shortLabel: "Clinical Caries Arrest Rate?",
    question: "What is the verified clinical arrest rate of SPARK-DV NSF?",
    answer:
      "Multi-center clinical evaluations show an 81% to 89% active caries arrest rate for our tri-component Nano Silver Fluoride system within 2 to 4 weeks of single or repeated application, outperforming standard 5% NaF varnish in high-risk pediatric populations.",
    actionText: "Read Clinical Data",
    actionLink: "/science",
  },

  // 4. ORDERING & SUPPORT
  {
    id: "faq-shipping",
    category: "ordering",
    shortLabel: "Dispatch & Delivery Times?",
    question: "How long does shipping take across India?",
    answer:
      "Orders placed before 2:00 PM IST are dispatched same-day via express air courier (BlueDart/Delhivery/DTDC). Metro delivery typically arrives within 24–48 hours, while other regional locations take 2–4 business days with real-time consignment tracking.",
    actionText: "Visit Clinical Store",
    actionLink: "/products",
  },
  {
    id: "faq-distributor",
    category: "ordering",
    shortLabel: "Distributor Pricing?",
    question: "How can dental supply depots apply for wholesale distributor pricing?",
    answer:
      "We provide direct R&D factory pricing, protected territory exclusivity, and free clinician sample kits for authorized dental depots and distributors. You can submit your territory proposal on our dedicated Distributor Portal.",
    actionText: "Go to Distributor Portal",
    actionLink: "/distributor",
  },
  {
    id: "faq-whatsapp",
    category: "ordering",
    shortLabel: "Chat on WhatsApp?",
    question: "Can I discuss a clinical case or bulk purchase directly on WhatsApp?",
    answer:
      "Yes! Our dedicated clinical support team and product specialists are active on WhatsApp from 9:00 AM to 7:00 PM IST. Tap below to chat directly with our specialists.",
    actionText: "Open WhatsApp Chat (+91 9246901870)",
    actionLink: "https://wa.me/919246901870",
    isExternalLink: true,
  },
];

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionText?: string;
  actionLink?: string;
  isExternalLink?: boolean;
}

export function ClinicalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "popular" | "products" | "science" | "ordering"
  >("popular");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! Welcome to SPARK-DV Clinical Support. I can help answer questions about our Nano Silver Fluoride (NSF) formulations, pediatric endodontics, clinical trials, or wholesale clinic orders.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  const handleSelectFaq = (faq: FAQItem) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: faq.question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: faq.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionText: faq.actionText,
        actionLink: faq.actionLink,
        isExternalLink: faq.isExternalLink,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const matchedFaq = findBestMatch(query);
      let botResponse: ChatMessage;

      if (matchedFaq) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: matchedFaq.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionText: matchedFaq.actionText,
          actionLink: matchedFaq.actionLink,
          isExternalLink: matchedFaq.isExternalLink,
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Thank you for asking! For this specific clinical inquiry, our pedodontic research and distribution team can assist you directly with custom protocols or wholesale rates.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionText: "Chat directly with a Specialist on WhatsApp",
          actionLink: "https://wa.me/919246901870",
          isExternalLink: true,
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 650);
  };

  const findBestMatch = (query: string): FAQItem | null => {
    const q = query.toLowerCase();

    if (q.includes("stain") || q.includes("black") || q.includes("sdf")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-staining") || null;
    }
    if (q.includes("pro") || q.includes("difference") || q.includes("nha") || q.includes("hydroxyapatite")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-diff-pro") || null;
    }
    if (q.includes("founder") || q.includes("ajay") || q.includes("who started") || q.includes("company") || q.includes("mission")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-founder") || null;
    }
    if (q.includes("swish") || q.includes("mouthwash") || q.includes("rinse") || q.includes("brace") || q.includes("ortho")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-swish") || null;
    }
    if (q.includes("pobtura") || q.includes("p-obtura") || q.includes("pulpectomy") || q.includes("root") || q.includes("obturation")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-pobtura") || null;
    }
    if (q.includes("file") || q.includes("spark file") || q.includes("niti") || q.includes("rotary")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-files") || null;
    }
    if (q.includes("crown") || q.includes("marc") || q.includes("zirc") || q.includes("zirconia")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-crowns") || null;
    }
    if (q.includes("gumm") || q.includes("pro plus") || q.includes("probiotic") || q.includes("chew")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-gummies") || null;
    }
    if (q.includes("sample") || q.includes("kit") || q.includes("distribut") || q.includes("wholesale") || q.includes("price") || q.includes("pricing") || q.includes("buy")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-samples") || null;
    }
    if (q.includes("ship") || q.includes("deliver") || q.includes("track") || q.includes("courier")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-shipping") || null;
    }
    if (q.includes("manufactur") || q.includes("3k nano") || q.includes("sendan") || q.includes("make") || q.includes("quality")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-mfg") || null;
    }
    if (q.includes("arrest") || q.includes("research") || q.includes("trial") || q.includes("evidence") || q.includes("percent") || q.includes("efficacy")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-arrest-rate") || null;
    }
    if (q.includes("whatsapp") || q.includes("phone") || q.includes("call") || q.includes("contact")) {
      return PREDEFINED_FAQS.find((f) => f.id === "faq-whatsapp") || null;
    }

    return null;
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Chat reset. How can I assist you today? Select a clinical question or type below.",
        timestamp: "Just now",
      },
    ]);
  };

  const currentFaqs = PREDEFINED_FAQS.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* --- Floating Launcher Button (matches user's screenshot layout) --- */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "whatsapp group cursor-pointer transition-all duration-300 select-none shadow-md hover:shadow-lg",
          isOpen ? "bg-[#073763] text-white border-[#073763]" : "bg-white text-[#073763] hover:border-[#073763]"
        )}
        aria-label="Toggle SPARK-DV Clinical Chatbot"
        title="Chat with SPARK-DV"
        style={{
          borderRadius: "8px",
        }}
      >
        <span
          className={cn(
            "wa-dot transition-transform duration-300",
            isOpen ? "bg-emerald-400 scale-110" : "bg-[#1fa778]"
          )}
        />
        <span className="font-semibold tracking-tight text-xs sm:text-sm">
          {isOpen ? "Close Assistant" : "Chat with SPARK-DV"}
        </span>
      </button>

      {/* --- Chatbot Modal Window --- */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="spark-chatbot-title"
          className="fixed bottom-[68px] sm:bottom-[76px] right-3 sm:right-6 z-[99] w-[calc(100vw-24px)] sm:w-[410px] max-h-[82vh] h-[600px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(7,55,99,0.3)] border border-[#073763]/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-[#073763] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <Bot className="size-5 text-cyan-300" />
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#073763]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 id="spark-chatbot-title" className="text-sm font-bold text-white tracking-tight">
                    SPARK-DV Clinical Assistant
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/15 text-cyan-200">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-white/70">
                  Pediatric Biomaterials &amp; Formulations Desk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                title="Restart conversation"
                className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#073763",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
                aria-label="Reset chat history"
              >
                <RotateCcw className="size-4" style={{ color: "#073763", strokeWidth: 2.2 }} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#073763",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
                aria-label="Close chat window"
              >
                <X className="size-4" style={{ color: "#073763", strokeWidth: 2.2 }} />
              </button>
            </div>
          </div>

          {/* Category Tabs for Predefined FAQs */}
          <div className="bg-[#f8f6f0] px-3 py-2 border-b border-[#073763]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {(
              [
                { id: "popular", label: "Popular" },
                { id: "products", label: "Products" },
                { id: "science", label: "Science & R&D" },
                { id: "ordering", label: "Orders & Support" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer shadow-none"
                style={{
                  backgroundColor: activeCategory === tab.id ? "#073763" : "#ffffff",
                  color: activeCategory === tab.id ? "#ffffff" : "#526174",
                  border: activeCategory === tab.id ? "1px solid #073763" : "1px solid #ded8d4",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick FAQ Question Chips */}
          <div className="bg-[#fffdfa] px-3.5 py-2.5 border-b border-[#073763]/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#738294] shrink-0 flex items-center gap-1">
              <Sparkles className="size-3 text-amber-500" />
              Ask:
            </span>
            {currentFaqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => handleSelectFaq(faq)}
                className="text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap shrink-0 shadow-none transition-colors cursor-pointer"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#073763",
                  border: "1px solid rgba(7, 55, 99, 0.2)",
                }}
              >
                {faq.shortLabel}
              </button>
            ))}
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#fbf9f5]/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[85%] text-xs leading-relaxed",
                  m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "px-3.5 py-2.5 rounded-2xl shadow-xs whitespace-pre-line",
                    m.sender === "user"
                      ? "bg-[#073763] text-white rounded-br-xs font-medium"
                      : "bg-white text-[#1e293b] border border-[#073763]/10 rounded-bl-xs"
                  )}
                >
                  {m.text}

                  {/* Action Link / Button if included */}
                  {m.actionText && m.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1">
                      {m.isExternalLink ? (
                        <a
                          href={m.actionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors w-fit"
                        >
                          {m.actionText}
                          <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        <Link
                          to={m.actionLink}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#073763] hover:text-[#052b4f] bg-[#073763]/5 hover:bg-[#073763]/10 border border-[#073763]/15 px-3 py-1.5 rounded-lg transition-colors w-fit"
                        >
                          {m.actionText}
                          <ChevronRight className="size-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto flex items-center gap-1.5 bg-white border border-[#073763]/10 px-3 py-2 rounded-2xl shadow-xs text-xs text-slate-400">
                <span className="size-1.5 rounded-full bg-[#073763] animate-bounce [animation-delay:-0.3s]" />
                <span className="size-1.5 rounded-full bg-[#073763] animate-bounce [animation-delay:-0.15s]" />
                <span className="size-1.5 rounded-full bg-[#073763] animate-bounce" />
                <span className="ml-1 text-[11px] text-slate-500 font-medium">
                  Reviewing clinical protocols...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Direct WhatsApp Callout Banner */}
          <div className="bg-[#f0f9ff] px-4 py-2 border-t border-sky-100 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-sky-800 font-medium">
              Need immediate doctor consultation?
            </span>
            <a
              href="https://wa.me/919246901870"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              WhatsApp <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Form Input Bar */}
          <form
            onSubmit={handleSendQuery}
            className="p-3 bg-white border-t border-[#073763]/10 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about NSF, staining, files, orders..."
              className="flex-1 bg-[#fbf9f5] border border-[#cbd5e1] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] rounded-xl px-3.5 py-2 text-xs text-[#073763] placeholder:text-slate-400 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="size-9 rounded-xl disabled:opacity-40 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              style={{
                backgroundColor: "#073763",
                color: "#ffffff",
                border: "none",
              }}
              aria-label="Send clinical inquiry"
            >
              <Send className="size-4" style={{ color: "#ffffff" }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ClinicalChatbot;
