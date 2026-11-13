import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Truck,
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  FileText,
  Check,
  Copy,
  ExternalLink,
  Download,
  HelpCircle,
  Package,
  Layers,
  Send,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

export interface DistributorFormState {
  companyName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  stateOrRegion: string;
  businessType: string;
  monthlyVolume: string;
  products: string[];
  existingLines: string;
  notes: string;
}

const INITIAL_FORM: DistributorFormState = {
  companyName: "",
  contactName: "",
  designation: "",
  email: "",
  phone: "",
  city: "",
  stateOrRegion: "",
  businessType: "Dental Depot / Supply House",
  monthlyVolume: "500 – 2,000 units/mo",
  products: [
    "Nanion Elite Pro (3% NSF + 5% nHA)",
    "Nanion Elite (3% NSF)",
    "Nanion Lite (2% NSF)",
    "Nanion Swish Mouthrinse",
    "Nanion Pro Plus Gummies",
  ],
  existingLines: "",
  notes: "",
};

const COMMERCIAL_TIERS = [
  {
    tier: "Tier 1: Clinical Depot",
    volume: "100 – 500 units/mo",
    badge: "Local Territory",
    desc: "Designed for regional dental dealers and multi-chair pediatric clinic networks seeking reliable factory-direct supply.",
    benefits: [
      "Standard wholesale margin brackets",
      "Complimentary clinician sample trial packs",
      "Standard 48-hour freight dispatch",
      "Digital promotional asset kit",
    ],
  },
  {
    tier: "Tier 2: Regional Distributor",
    volume: "500 – 2,500 units/mo",
    badge: "District Protected",
    highlight: true,
    desc: "Preferred tier for established dental supply houses managing field sales representatives across major dental hubs.",
    benefits: [
      "Tier-2 priority wholesale discount structure",
      "Protected territory allocation & sales lead forwarding",
      "Physical counter display units & demo packages",
      "Direct WhatsApp access to clinical R&D team",
      "Co-sponsorship support for local IDA conferences",
    ],
  },
  {
    tier: "Tier 3: State / Institutional Partner",
    volume: "2,500 – 10,000 units/mo",
    badge: "State Exclusivity Options",
    desc: "For state-wide pharmaceutical distributors, dental college procurement contractors, and hospital network supply chains.",
    benefits: [
      "Maximum commercial discount & volume performance rebates",
      "Exclusive territory rights with formal MoU",
      "Customized packaging & bulk institutional sizing",
      "Dedicated account manager & priority production batching",
      "Full tender paperwork & microbiological COA support",
    ],
  },
  {
    tier: "Tier 4: Export & National Chains",
    volume: "10,000+ units/mo",
    badge: "Global & Export",
    desc: "Specialized export arrangements for GCC / Middle East, Southeast Asia, and pan-India pharmacy retail chains.",
    benefits: [
      "Direct manufacturer ex-factory (EXW / FOB) contract pricing",
      "Custom international regulatory & COA dossiers",
      "Bespoke language translation and country-specific labelling",
      "Scheduled bi-weekly direct cargo container dispatch",
    ],
  },
];

const DISTRIBUTOR_FAQS = [
  {
    q: "What is the Minimum Order Quantity (MOQ) for initial distributor trial orders?",
    a: "For initial territory onboarding and sample validation, our trial MOQ is just 50 to 100 units across any mixed combination of Nanion products. This allows your field sales representatives to sample key pediatric dental surgeons and gauge local clinical demand before committing to larger monthly allocations.",
  },
  {
    q: "How does territory protection and regional exclusivity work?",
    a: "We grant protected territory rights (city, district, or state-level) to qualified distributors who commit to baseline monthly volume targets. In protected territories, all direct clinic inquiries received through the SPARK-DV website or corporate hotline are routed directly to our authorized local distributor partner for fulfillment.",
  },
  {
    q: "Do you supply free clinical sample packs for our field sales team?",
    a: "Yes! Every authorized distributor shipment includes physical clinician trial packs, detailed clinical monograph booklets, laminated chairside protocol cards, and marketing samples of Nanion Elite, Nanion Lite, and Nanion Swish so your team can demonstrate efficacy directly to pediatric dentists.",
  },
  {
    q: "What regulatory documents, certifications, and test reports accompany shipments?",
    a: "All SPARK-DV formulations are manufactured by 3K NANO PVT. LTD. under strict ISO 13485:2016 medical device standards. Every commercial batch is accompanied by an official Certificate of Analysis (COA), microbiological challenge assays, ICP-MS heavy metal test reports, and WIPO patent documentation (WO2009098710A1 & WO2015155629A1).",
  },
  {
    q: "What are the payment terms and logistics delivery timelines?",
    a: "Initial onboarding orders operate on 100% advance or proforma invoice. For verified distributors with a consistent 3-month ordering track record, 15 to 30-day credit facilities and rolling LC terms are available. Standard domestic dispatch takes place within 24 to 48 hours via express air or road logistics.",
  },
];

export default function DistributorPage() {
  const [form, setForm] = useState<DistributorFormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleProductToggle = (product: string) => {
    setForm((prev) => {
      const exists = prev.products.includes(product);
      if (exists) {
        return { ...prev, products: prev.products.filter((p) => p !== product) };
      } else {
        return { ...prev, products: [...prev.products, product] };
      }
    });
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+919246901870");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `SPARK-DIST-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedId);

    // Simulate quick server verification
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#fffcf8] text-[#073763] pt-24 sm:pt-28 pb-20 selection:bg-[#e78308] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15 mb-6 shadow-2xs">
            <Building2 className="size-3.5 text-[#0284c7]" />
            B2B Distribution &amp; Institutional Partnerships
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#073763] font-serif leading-[1.08]">
            Request Distributor <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#ad4b09]">&amp; Wholesale Pricing</span>.
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#526174] max-w-2xl leading-relaxed">
            Direct R&amp;D factory pricing, protected regional territory rights, and complete clinical marketing dossiers for dental supply depots, hospital networks, and pharmaceutical distributors.
          </p>

          {/* Quick Trust Pillars */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
            {[
              { title: "Direct Factory Margins", sub: "Tier-1 wholesale brackets" },
              { title: "Territory Exclusivity", sub: "District & state protection" },
              { title: "ISO 13485 Certified", sub: "Full COA batch assays" },
              { title: "24–48h Dispatch", sub: "Pan-India tracked freight" },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white/90 border border-[#073763]/10 rounded-2xl p-4 shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                  <CheckCircle2 className="size-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#073763]">
                    {pillar.title}
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">{pillar.sub}</p>
              </div>
            ))}
          </div>

          {/* Action Jump Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pricing-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#073763] text-white font-bold text-sm shadow-md hover:bg-[#052b4f] transition-all"
              style={{ backgroundColor: "#073763", color: "#ffffff" }}
            >
              <span>Submit Territory Inquiry</span>
              <ArrowRight className="size-4" />
            </a>
            <a
              href="https://wa.me/919246901870?text=Hi%20SPARK-DV%20Team%2C%20I%20would%20like%20to%20request%20distributor%20pricing%20and%20territory%20availability%20for%20our%20firm."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
              style={{ backgroundColor: "#059669", color: "#ffffff" }}
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp Commercial Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. COMMERCIAL MARGIN TIERS MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
            Volume &amp; Margin Structure
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073763] mt-2 font-serif">
            Distributor Commercial Tiers
          </h2>
          <p className="text-sm text-[#526174] mt-2">
            Scalable wholesale tiers designed for clinical depots, state supply chains, and export houses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMERCIAL_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={cn(
                "rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative",
                tier.highlight
                  ? "bg-[#073763] text-white shadow-xl ring-2 ring-[#0284c7]"
                  : "bg-white border border-[#073763]/15 text-[#073763] shadow-sm hover:shadow-md"
              )}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#073763] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  Most Popular
                </span>
              )}

              <div>
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md",
                    tier.highlight
                      ? "bg-white/15 text-cyan-200"
                      : "bg-[#073763]/10 text-[#073763]"
                  )}
                >
                  {tier.badge}
                </span>

                <h3
                  className={cn(
                    "text-xl font-bold mt-4",
                    tier.highlight ? "text-white" : "text-[#073763]"
                  )}
                >
                  {tier.tier}
                </h3>

                <p
                  className={cn(
                    "text-xs font-semibold mt-1",
                    tier.highlight ? "text-cyan-300" : "text-[#ad4b09]"
                  )}
                >
                  {tier.volume}
                </p>

                <p
                  className={cn(
                    "text-xs mt-3 leading-relaxed",
                    tier.highlight ? "text-slate-200" : "text-[#526174]"
                  )}
                >
                  {tier.desc}
                </p>

                <div
                  className={cn(
                    "my-5 border-t",
                    tier.highlight ? "border-white/20" : "border-[#073763]/10"
                  )}
                />

                <ul className="space-y-2.5 text-xs">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "size-3.5 mt-0.5 shrink-0",
                          tier.highlight ? "text-cyan-300" : "text-emerald-600"
                        )}
                      />
                      <span className={tier.highlight ? "text-slate-100" : "text-[#334155]"}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#pricing-form"
                  onClick={() => setForm((prev) => ({ ...prev, monthlyVolume: tier.volume }))}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs",
                    tier.highlight
                      ? "bg-white hover:bg-slate-100"
                      : "bg-[#073763]/5 hover:bg-[#073763] hover:text-white border border-[#073763]/20"
                  )}
                  style={{
                    backgroundColor: tier.highlight ? "#ffffff" : "#f1f5f9",
                    color: "#073763",
                    border: tier.highlight ? "1px solid #ffffff" : "1px solid rgba(7, 55, 99, 0.2)",
                  }}
                >
                  <span style={{ color: "#073763", fontWeight: 700 }}>Select {tier.badge}</span>
                  <ArrowRight className="size-3.5" style={{ color: "#073763" }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DISTRIBUTOR VALUE PROPOSITION BENTO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-[#f8f6f0] border border-[#073763]/15 rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#073763]">
              The SPARK-DV Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073763] mt-2 font-serif">
              Why Premier Dental Depots Partner With Us
            </h2>
            <p className="text-sm text-[#526174] mt-2">
              We combine world-first patented biomaterial chemistry with turnkey commercial marketing support to guarantee rapid inventory turns in your region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#073763]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-4">
                  <Boxes className="size-5" />
                </div>
                <h3 className="text-base font-bold text-[#073763]">
                  High Reorder Frequency
                </h3>
                <p className="text-xs text-[#526174] mt-2 leading-relaxed">
                  Unlike capital equipment with multi-year purchase cycles, Nanion NSF formulations and Swish mouthrinses are chairside consumables replenished on a steady 30-day clinical cycle.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="size-3.5" />
                <span>94% Repeat Doctor Rate</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#073763]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <Package className="size-5" />
                </div>
                <h3 className="text-base font-bold text-[#073763]">
                  Doctor Sampling Packs Provided
                </h3>
                <p className="text-xs text-[#526174] mt-2 leading-relaxed">
                  We supply your field sales reps with free 5g sample tubes and laminated clinical instruction guides, ensuring immediate chairside trials and painless clinic conversions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#073763]">
                <Sparkles className="size-3.5 text-amber-500" />
                <span>Free Field Marketing Kits</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#073763]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <FileText className="size-5" />
                </div>
                <h3 className="text-base font-bold text-[#073763]">
                  Tender-Ready Clinical Dossiers
                </h3>
                <p className="text-xs text-[#526174] mt-2 leading-relaxed">
                  Ready-to-submit tender dossiers with ISO 13485:2016 compliance, ICP-MS heavy metal analyses, WIPO patent filings, and multi-center clinical trials for medical college procurement.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-purple-700">
                <ShieldCheck className="size-3.5" />
                <span>Government &amp; Private Tenders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN B2B INQUIRY FORM & DIRECT COMMERCIAL CONTACT DESK */}
      <section id="pricing-form" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#073763]/15 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ad4b09]">
                Direct Territory Application
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#073763] mt-1 font-serif">
                Request Official Distributor Pricing
              </h2>
              <p className="text-xs sm:text-sm text-[#526174] mt-1.5">
                Complete the business profile below. Our Commercial Alliances desk will review your territory application and respond with wholesale price schedules within 4 hours.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center"
              >
                <div className="size-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 font-serif">
                  Distributor Application Received!
                </h3>
                <p className="text-xs text-emerald-800 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{form.contactName || "Partner"}</strong>. Your distribution inquiry for <strong>{form.companyName || "your firm"}</strong> has been logged directly with our commercial logistics desk.
                </p>

                <div className="my-6 inline-flex flex-col items-center justify-center bg-white px-5 py-3 rounded-xl border border-emerald-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Your Application Reference
                  </span>
                  <span className="text-lg font-mono font-bold text-[#073763] mt-0.5">
                    {refId}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium mt-1">
                    Guaranteed response within 4 business hours
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/919246901870?text=Hello%20SPARK-DV%2C%20I%20have%20submitted%20distributor%20application%20"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <MessageCircle className="size-4" />
                    <span>Fast-Track on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(INITIAL_FORM);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Company / Dental Depot Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Prime Dental Supplies Pvt Ltd"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Business Entity Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    >
                      <option>Dental Depot / Supply House</option>
                      <option>Hospital Pharmacy Procurement</option>
                      <option>Dental College / University Store</option>
                      <option>Retail Pharmacy Chain / PCD</option>
                      <option>International Importer / Export Firm</option>
                      <option>Other B2B Entity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Authorized Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rajesh Sharma"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Designation / Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Managing Director / Procurement Head"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Business Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="purchases@yourcompany.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Direct Mobile / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      City / Headquarters <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Bengaluru"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Target State / Territory <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Karnataka &amp; Kerala"
                      value={form.stateOrRegion}
                      onChange={(e) => setForm({ ...form, stateOrRegion: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#073763] mb-1">
                      Projected Monthly Volume
                    </label>
                    <select
                      value={form.monthlyVolume}
                      onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    >
                      <option>Trial Order (100–500 units)</option>
                      <option>500 – 2,000 units/mo</option>
                      <option>2,000 – 5,000 units/mo</option>
                      <option>5,000 – 10,000 units/mo</option>
                      <option>10,000+ units/mo (Export/National)</option>
                    </select>
                  </div>
                </div>

                {/* Products of Interest Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-[#073763] mb-2">
                    Products Required in Territory:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Nanion Elite Pro (3% NSF + 5% nHA)",
                      "Nanion Elite (3% NSF)",
                      "Nanion Lite (2% NSF)",
                      "Nanion Swish Mouthrinse",
                      "Nanion Pro Plus Gummies",
                      "Full SPARK-DV Portfolio",
                    ].map((item) => {
                      const isChecked = form.products.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleProductToggle(item)}
                          className={cn(
                            "flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer",
                            isChecked
                              ? "bg-[#073763]/5 border-[#073763] text-[#073763] font-semibold"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                          )}
                        >
                          <div
                            className={cn(
                              "size-4 rounded flex items-center justify-center shrink-0 border",
                              isChecked
                                ? "bg-[#073763] border-[#073763] text-white"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {isChecked && <Check className="size-3" />}
                          </div>
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#073763] mb-1">
                    Existing Dental / Pharma Brands Handled (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., GC India, 3M Oral Care, Dentsply Sirona, Septodont"
                    value={form.existingLines}
                    onChange={(e) => setForm({ ...form, existingLines: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#073763] mb-1">
                    Territory Proposal or Special Commercial Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify target dental clinics, college tenders, regional exclusivity preferences, or target launch timeline..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#073763] focus:border-[#073763] focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#073763] hover:bg-[#052b4f] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#073763", color: "#ffffff" }}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="size-4 animate-spin text-white" />
                        <span>Transmitting to Alliances Desk...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Distributor Pricing Request</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#64748b] mt-2">
                    🔒 All commercial data and territory proposals are handled under strict confidentiality.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Commercial Desk Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live WhatsApp Priority Desk */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Priority Channel
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Commercial Desk Online
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#073763] font-serif">
                Instant WhatsApp Commercial Desk
              </h3>
              <p className="text-xs text-[#526174] mt-1.5 leading-relaxed">
                Connect directly with our commercial alliances team on WhatsApp for immediate distributor price lists, sample dispatch requests, and regional territory availability.
              </p>

              <div className="mt-5 p-3.5 rounded-2xl bg-[#f0fdf4] border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                    Direct Hotline
                  </span>
                  <div className="text-sm font-bold text-[#073763] tracking-tight">
                    +91 92469 01870
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs hover:bg-emerald-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="size-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="https://wa.me/919246901870?text=Hi%20SPARK-DV%2C%20I%20represent%20a%20dental%20depot%20%2F%20distribution%20firm%20and%20would%20like%20to%20request%20wholesale%20distributor%20pricing."
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                style={{ backgroundColor: "#059669", color: "#ffffff" }}
              >
                <MessageCircle className="size-4" />
                <span>Open Instant WhatsApp Chat</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            {/* Corporate Offices & Factory Information */}
            <div className="bg-[#fbf9f5] rounded-3xl p-6 sm:p-7 border border-[#073763]/15 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#073763] flex items-center gap-2">
                <Building2 className="size-4 text-[#ad4b09]" />
                Corporate &amp; Factory Logistics
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-[#073763] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#073763]">Headquarters &amp; Alliances Desk</strong>
                    <span className="text-[#526174]">
                      SPARK-DV / Sendan Pharmaceuticals, Hyderabad &amp; Chennai, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FactoryIcon className="size-4 text-[#073763] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#073763]">Manufacturing &amp; Quality Facility</strong>
                    <span className="text-[#526174]">
                      3K NANO PVT. LTD. (ISO 13485:2016 Certified Nanomaterials Plant)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="size-4 text-[#073763] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#073763]">Commercial Email</strong>
                    <a
                      href="mailto:sparkdv310@gmail.com?subject=Distributor%20Pricing%20Inquiry"
                      className="text-[#0284c7] hover:underline font-medium"
                    >
                      sparkdv310@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="size-4 text-[#073763] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#073763]">Direct Telephone</strong>
                    <span className="text-[#526174]">+91 79815 46939 / +91 91547 41994</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#073763]/10">
                <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
                  <Clock className="size-3.5 text-[#073763]" />
                  <span>Commercial Desk Hours: Mon – Sat, 9:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Instant Clinical Catalog Download Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#073763]/15 shadow-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7]">
                  Instant Digital Asset
                </span>
                <h4 className="text-sm font-bold text-[#073763] mt-0.5">
                  SPARK-DV Clinical Catalog &amp; Dossier
                </h4>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  Comprehensive 28-page PDF featuring formulation specs, trial data &amp; product codes.
                </p>
              </div>
              <a
                href="/products"
                className="size-10 rounded-xl bg-[#073763]/5 hover:bg-[#073763] text-[#073763] hover:text-white flex items-center justify-center shrink-0 border border-[#073763]/15 transition-colors"
                title="View All Products"
              >
                <Download className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DISTRIBUTOR FAQ ACCORDION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#073763]">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#073763] mt-2 font-serif">
            Distributor &amp; Institutional FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {DISTRIBUTOR_FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-[#073763]/15 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#073763] hover:bg-[#fbf9f5] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-[#073763] transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: smoothEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs text-[#526174] leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM CALLOUT BAR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#073763] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Ready to Distribute SPARK-DV in Your Territory?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Speak directly with Dr. Ajay Reddy Mareddy and our commercial director to secure authorized regional distribution rights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#pricing-form"
              className="px-6 py-3 rounded-xl bg-white text-[#073763] font-bold text-xs hover:bg-slate-100 transition-all shadow-md"
              style={{ backgroundColor: "#ffffff", color: "#073763" }}
            >
              Request Price List
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              General Clinical Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FactoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  );
}

