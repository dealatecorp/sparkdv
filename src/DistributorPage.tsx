import { BrandWordmark, brandText } from '@/components/ui/brand-wordmark';
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
  HelpCircle,
  Package,
  Layers,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { enquiryEmail } from "@/lib/enquiry";

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
  monthlyVolume: "500 – 2,500 units/mo",
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
  const [draft, setDraft] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleProductToggle = (product: string) => {
    setDraft("");
    setForm((prev) => {
      const exists = prev.products.includes(product);
      if (exists) {
        return { ...prev, products: prev.products.filter((p) => p !== product) };
      } else {
        return { ...prev, products: [...prev.products, product] };
      }
    });
  };

  const handleCopyPhone = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText("+919246901870");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      setCopiedPhone(false);
      setCopyError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDraft(enquiryEmail("Distributor pricing request", [
      ["Company", form.companyName], ["Business entity type", form.businessType],
      ["Contact name", form.contactName], ["Role", form.designation], ["Email", form.email],
      ["Phone / WhatsApp", form.phone], ["City", form.city], ["Territory", form.stateOrRegion],
      ["Monthly volume", form.monthlyVolume], ["Products", form.products.join(", ")],
      ["Existing brands", form.existingLines], ["Territory proposal", form.notes],
    ]));
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all"
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
                  onClick={() => {
                    setForm((prev) => ({ ...prev, monthlyVolume: tier.volume }));
                    setDraft("");
                  }}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs",
                    tier.highlight
                      ? "bg-white text-primary hover:bg-slate-100"
                      : "bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20"
                  )}
                >
                  <span>Select {tier.badge}</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
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
              The <BrandWordmark /> Advantage
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
                Add your business details and territory requirements to request wholesale pricing from our team.
              </p>
            </div>

              <form onSubmit={handleSubmit} onChange={() => setDraft("")} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="distributor-company" className="block text-xs font-bold text-[#073763] mb-1">
                      Company / Dental Depot Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-company"
                      autoComplete="organization"
                      type="text"
                      required
                      placeholder="e.g., Prime Dental Supplies Pvt Ltd"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="distributor-business" className="block text-xs font-bold text-[#073763] mb-1">
                      Business Entity Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="distributor-business"
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
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
                    <label htmlFor="distributor-name" className="block text-xs font-bold text-[#073763] mb-1">
                      Authorized Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-name"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="e.g., Rajesh Sharma"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="distributor-role" className="block text-xs font-bold text-[#073763] mb-1">
                      Designation / Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-role"
                      autoComplete="organization-title"
                      type="text"
                      required
                      placeholder="e.g., Managing Director / Procurement Head"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="distributor-email" className="block text-xs font-bold text-[#073763] mb-1">
                      Business Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="purchases@yourcompany.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="distributor-phone" className="block text-xs font-bold text-[#073763] mb-1">
                      Direct Mobile / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-phone"
                      autoComplete="tel"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="distributor-city" className="block text-xs font-bold text-[#073763] mb-1">
                      City / Headquarters <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-city"
                      autoComplete="address-level2"
                      type="text"
                      required
                      placeholder="e.g., Bengaluru"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="distributor-territory" className="block text-xs font-bold text-[#073763] mb-1">
                      Target State / Territory <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="distributor-territory"
                      autoComplete="address-level1"
                      type="text"
                      required
                      placeholder="e.g., Karnataka &amp; Kerala"
                      value={form.stateOrRegion}
                      onChange={(e) => setForm({ ...form, stateOrRegion: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="distributor-volume" className="block text-xs font-bold text-[#073763] mb-1">
                      Projected Monthly Volume
                    </label>
                    <select
                      id="distributor-volume"
                      value={form.monthlyVolume}
                      onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                    >
                      {COMMERCIAL_TIERS.map(({ volume }) => <option key={volume}>{volume}</option>)}
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
                          aria-pressed={isChecked}
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
                          <span>{brandText(item)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="distributor-brands" className="block text-xs font-bold text-[#073763] mb-1">
                    Existing Dental / Pharma Brands Handled (Optional)
                  </label>
                  <input
                    id="distributor-brands"
                    type="text"
                    placeholder="e.g., GC India, 3M Oral Care, Dentsply Sirona, Septodont"
                    value={form.existingLines}
                    onChange={(e) => setForm({ ...form, existingLines: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="distributor-proposal" className="block text-xs font-bold text-[#073763] mb-1">
                    Territory Proposal or Special Commercial Requirements
                  </label>
                  <textarea
                    id="distributor-proposal"
                    rows={3}
                    placeholder="Specify target dental clinics, college tenders, regional exclusivity preferences, or target launch timeline..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-[#073763] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="min-h-12 px-5 rounded-xl font-bold text-sm bg-primary hover:bg-[#052b4f] text-primary-foreground flex items-center justify-center gap-2.5"
                  >
                    Prepare pricing request <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  {draft && <a className="text-sm font-semibold text-primary underline" href={draft}>Open email draft</a>}
                </div>
                <p className="text-sm text-muted-foreground" role="status">
                  {draft ? "Your draft is ready to review and send in your email app." : "You’ll review and send the request in your email app."}
                </p>
              </form>
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
              <p role="status" className={copyError ? "mt-2 text-sm text-muted-foreground" : "sr-only"}>
                {copyError ? "Couldn’t copy. You can select the number directly." : copiedPhone ? "Copied to clipboard." : ""}
              </p>

              <a
                href="https://wa.me/919246901870?text=Hi%20SPARK-DV%2C%20I%20represent%20a%20dental%20depot%20%2F%20distribution%20firm%20and%20would%20like%20to%20request%20wholesale%20distributor%20pricing."
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all"
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
                      <BrandWordmark /> / Sendan Pharmaceuticals, Hyderabad &amp; Chennai, India
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
                      className="text-primary hover:underline font-medium"
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

            <div className="bg-white rounded-3xl p-6 border border-[#073763]/15 shadow-xs flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#073763] mt-0.5">
                  <BrandWordmark /> product catalogue
                </h4>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  Browse products and formulation details.
                </p>
              </div>
              <Link
                to="/products"
                className="size-11 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center shrink-0 border border-primary/15 transition-colors"
                aria-label="Browse the product catalogue"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
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
                  <span>{brandText(faq.q)}</span>
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
                        {brandText(faq.a)}
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
              Ready to Distribute <BrandWordmark /> in Your Territory?
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

