import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TestTubes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTICLES } from "./ScienceGallery";

export default function SciencePage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  const pillars = [
    {
      id: "nsf",
      badge: "Pillar 01 • Antimicrobial Action",
      title: "Proprietary NanoSilver Fluoride (NSF) Matrix",
      shortDesc:
        "10–20nm colloidal nanoparticles deliver multi-target cellular lysis in cariogenic bacteria without staining enamel black.",
      icon: FlaskConical,
      color: "#0284c7",
      blogId: "antibacterial-action",
      content: {
        headline: "Targeted Bacterial Lysis & Respiratory Enzyme Inhibition",
        text1:
          "Traditional antimicrobial dental varnishes rely primarily on fluoride to inhibit enolase enzymes. However, aggressive cariogenic pathogens like Streptococcus mutans frequently adapt by producing heavy extracellular polymeric matrices.",
        text2:
          "SPARK-DV's patented NanoSilver Fluoride formulation introduces a physical and biochemical breakthrough: colloidal silver particles engineered at 10 to 20 nanometers permeate bacterial cell walls, binding directly to sulfhydryl (-SH) functional groups of vital respiratory enzymes. This halts cellular respiration, collapses trans-membrane proton gradients, and induces selective lysis of cariogenic bacteria within 48 hours.",
        highlights: [
          "99.4% in vitro bacterial reduction of Streptococcus mutans",
          "Zero mucosal burning, completely alcohol-free formulation",
          "Maintains local plaque pH above the critical 5.5 demineralization threshold",
          "Bio-compatible polymer capping prevents metallic silver oxidation (non-staining)",
        ],
        blogTitle: "Read Full Monograph: Antibacterial Action of NSF",
      },
    },
    {
      id: "nha",
      badge: "Pillar 02 • Biomimetic Remineralization",
      title: "5% Nano-Hydroxyapatite (nHA) Lattice Repair",
      shortDesc:
        "Bio-identical hexagonal prisms crystallize into demineralized enamel, dropping critical dissolution threshold from pH 5.5 to pH 4.5.",
      icon: Sparkles,
      color: "#059669",
      blogId: "remineralization",
      content: {
        headline: "Biomimetic Crystallography & Dentinal Tubule Occlusion",
        text1:
          "Human enamel is 96% mineral by weight, structured as closely packed carbonated hydroxyapatite crystals [Ca₁₀(PO₄)₆(OH)₂]. In early childhood caries, acidic attacks leach calcium and phosphate out of the prism core, resulting in porous white spot lesions.",
        text2:
          "Nanion Elite Pro delivers 5% bio-identical synthetic nano-hydroxyapatite rods. When applied, these nanoparticles penetrate deep into demineralized microporosities and chemically fuse to native enamel prisms. Simultaneously, fluoride ions convert the top crystalline layer into fluorapatite [Ca₁₀(PO₄)₆F₂], which resists dissolution down to a harsh pH of 4.5.",
        highlights: [
          "5% bio-identical nano-hydroxyapatite matches natural human enamel morphology",
          "Forms an acid-insoluble fluorapatite outer shield resisting future cariogenic attacks",
          "Physically seals patent dentinal tubules to permanently eliminate temperature sensitivity",
          "Reverses early sub-surface white spot demineralization without dental handpiece intervention",
        ],
        blogTitle: "Read Full Monograph: Nano-HA Lattice Repair",
      },
    },
    {
      id: "biofilm",
      badge: "Pillar 03 • Biofilm Penetration",
      title: "EPS Biofilm Disassembly & Plaque Dynamics",
      shortDesc:
        "Penetrating the impenetrable extracellular polymeric substance (EPS) barrier in high-risk pediatric and orthodontic patients.",
      icon: TestTubes,
      color: "#d97706",
      blogId: "biofilm-disruption",
      content: {
        headline: "Overcoming the Insoluble Glucan Barrier",
        text1:
          "In high-sugar pediatric diets and around orthodontic brackets, oral bacteria shield themselves inside a resilient Extracellular Polymeric Substance (EPS) matrix made of insoluble glucans and fructans. Conventional mouthwashes only rinse away loose planktonic bacteria in saliva, leaving the virulent plaque colony untouched to pump lactic acid against enamel.",
        text2:
          "SPARK-DV's stabilized colloidal nanoparticles navigate the interstitial fluid channels within dense plaque. By disrupting calcium-mediated glucan cross-links and cleaving glucosyltransferase activity, the formulation disassembles the biofilm scaffolding, allowing remineralizing ions to reach the enamel surface.",
        highlights: [
          "Infiltrates microscopic interstitial channels within 10–20nm tolerance",
          "Cleaves bacterial glucosyltransferase enzymes responsible for plaque stickiness",
          "Ideal for adolescent orthodontic patients prone to bracket-margin decalcification",
          "Gentle on mucosal lining without drying oral tissues or altering taste sensation",
        ],
        blogTitle: "Read Full Monograph: Understanding Biofilm Dynamics",
      },
    },
    {
      id: "bioceramics",
      badge: "Pillar 04 • Deciduous Endodontics",
      title: "Bioactive Bioceramics (P-Obtura Bio-Activ)",
      shortDesc:
        "Hydrophilic calcium silicate canal obturation that stimulates apical osteogenesis and resorbs synchronously with primary roots.",
      icon: Stethoscope,
      color: "#7c3aed",
      blogId: "bioceramic-obturation",
      content: {
        headline: "Synchronous Resorption & Periapical Bone Regeneration",
        text1:
          "Pediatric pulpectomies traditionally posed difficult compromises: Zinc Oxide Eugenol (ZOE) resorbs much slower than primary roots, leaving ectopic foreign bodies that risk deflecting succedaneous teeth. Calcium hydroxide can resorb too quickly, leaving unfilled dead space and canal reinfection.",
        text2:
          "P-Obtura Bio-Activ uses pure hydrophilic tricalcium and dicalcium silicate. It utilizes moisture within dentinal tubules to set without shrinkage, generating an alkaline pH (>11.5) that eradicates Enterococcus faecalis while promoting apical osteogenesis. Most importantly, it resorbs at the exact natural pace of physiological deciduous root resorption.",
        highlights: [
          "Hydrophilic setting reaction chemically binds to moist pediatric canal walls",
          "High alkalinity (pH 11.5–12.0) eliminates persistent multi-species root canal microflora",
          "Zero ectopic residue: resorbs synchronously with primary tooth roots during eruption",
          "Pre-mixed, ready-to-inject syringe prevents clinical mixing variability chairside",
        ],
        blogTitle: "Read Full Monograph: Bioactive Bioceramic Obturation",
      },
    },
  ];

  const comparisonData = [
    {
      parameter: "Primary Active Mechanism",
      sparkdv: "Colloidal NSF (10–20nm) + 5% nHA + Fluoride",
      naf: "Standard Sodium Fluoride (22,600 ppm F)",
      sdf: "38% Silver Diamine Fluoride (SDF)",
      standard: "Sodium Monofluorophosphate (1,000 ppm)",
    },
    {
      parameter: "S. mutans Kill Rate (in vitro)",
      sparkdv: "99.4% within 48h",
      naf: "42.0% (inhibitory only)",
      sdf: "98.7% rapid bactericidal",
      standard: "< 25.0% transient",
    },
    {
      parameter: "Permanent Black Tooth Staining",
      sparkdv: "Zero (Patented Capping)",
      naf: "None",
      sdf: "Severe / Permanent Jet-Black",
      standard: "None",
    },
    {
      parameter: "Soft Tissue Irritation / Burn Risk",
      sparkdv: "None (Alcohol & caustic free)",
      naf: "Low",
      sdf: "High (Caustic chemical burn risk)",
      standard: "None",
    },
    {
      parameter: "Enamel Remineralization Substrate",
      sparkdv: "5% Bio-identical Nano-HA crystals",
      naf: "Salivary calcium dependent",
      sdf: "None (Arrest only)",
      standard: "Trace salivary calcium",
    },
    {
      parameter: "Critical Dissolution pH",
      sparkdv: "pH 4.5 (Acid-Resistant Fluorapatite)",
      naf: "pH 5.0",
      sdf: "Variable",
      standard: "pH 5.5 (Natural enamel threshold)",
    },
    {
      parameter: "Pediatric & Parental Acceptance",
      sparkdv: "99.2% (Pleasant taste & clear aesthetic)",
      naf: "High",
      sdf: "Low (< 35% due to black staining)",
      standard: "High",
    },
  ];

  const whitepapers = [
    {
      id: "monograph-caries-arrest",
      title: "Clinical Practice Monograph: NSF Caries Arrest Protocols",
      category: "Clinical Protocol IFU",
      pages: "24 Pages",
      size: "3.4 MB PDF",
      desc: "Step-by-step chairside protocols, case selection guidelines, and follow-up evaluation schedules for non-invasive caries management in pediatric clinics.",
    },
    {
      id: "whitepaper-nha-synergy",
      title: "Biomaterials Whitepaper: Enamel Remineralization with 5% nHA",
      category: "Biomaterials Science",
      pages: "18 Pages",
      size: "2.8 MB PDF",
      desc: "Micro-CT and SEM crystallography analyses showing deep dentinal tubule occlusion and fluorapatite lattice conversion under cariogenic acid challenge.",
    },
    {
      id: "monograph-pediatric-endo",
      title: "Pediatric Endodontics: Bioactive Bioceramic Obturation Dossier",
      category: "Endodontic R&D",
      pages: "16 Pages",
      size: "2.1 MB PDF",
      desc: "Histological evidence of synchronous primary root resorption and periapical stem cell stimulation using hydrophilic tricalcium silicate cements.",
    },
  ];

  const faqs = [
    {
      q: "How does SPARK-DV NSF achieve high bactericidal action without black staining?",
      a: "Traditional 38% Silver Diamine Fluoride (SDF) contains free unbonded silver ions that rapidly oxidize upon exposure to light and oral sulfur compounds, forming black silver sulfide (Ag₂S). SPARK-DV uses a patented biocompatible polymeric capping shell around each 10–20nm silver nanoparticle. This prevents ambient photo-oxidation and ensures silver ions are released only upon encountering bacterial lactic acid, leaving the tooth surface in its natural translucent shade.",
    },
    {
      q: "What makes 5% synthetic nano-hydroxyapatite superior to micro-hydroxyapatite?",
      a: "Standard micro-hydroxyapatite particles are too large (typically >1,000nm) to enter the microscopic porosities of demineralized enamel prisms or open dentinal tubule orifices (which measure 1–2 microns in diameter). SPARK-DV's synthetic nano-hydroxyapatite is calibrated between 20 and 50 nanometers, allowing direct integration into the crystal matrix and complete physical blockage of open tubules within 7 to 14 days.",
    },
    {
      q: "Is NanoSilver Fluoride safe if a pediatric patient accidentally swallows a pea-sized amount?",
      a: "Yes. All SPARK-DV formulations are manufactured in accordance with ISO 13485:2016 and undergo rigorous ICP-MS heavy metal and cytotoxicity assays. Because the silver is present in controlled nanoscale colloids rather than high-concentration systemic salts, the total silver ingested in a recommended pea-sized brushing portion is well below international EPA and WHO daily dietary exposure thresholds.",
    },
    {
      q: "How do bioceramic root canal sealers resorb synchronously with primary tooth roots?",
      a: "P-Obtura Bio-Activ is formulated from ultra-fine tricalcium and dicalcium silicate dispersed in an enzymatic carrier. Rather than forming an inert insoluble rubber mass like gutta-percha or an excessively slow-resorbing plug like Zinc Oxide Eugenol, the hydrated calcium silicate matrix is susceptible to the same physiological osteoclastic breakdown that dissolves primary tooth dentin during succedaneous permanent tooth eruption.",
    },
  ];

  return (
    <div className="science-portal-page min-h-screen bg-[#fffcf8] text-[#073763] pt-24 sm:pt-28 pb-20 selection:bg-[#e78308] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15 mb-6 shadow-2xs">
            <Microscope className="size-3.5 text-[#0284c7]" />
            Biomaterials Science &amp; Clinical Research
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#073763] font-serif leading-[1.08]">
            Pioneering Bioactive Nanomaterials <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#ad4b09]">for Pediatric Dentistry</span>.
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#526174] max-w-3xl leading-relaxed">
            Where traditional dentistry waits for cavitations and relies on invasive drilling, SPARK-DV engineers bioactive nano-matrices that arrest decay at the molecular level, remineralize enamel prisms, and regenerate vital pulpal tissues.
          </p>

          {/* Quick R&D Credentials */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
            {[
              {
                title: "2 WIPO Patents",
                sub: "WO2009098710A1 & WO2015155629A1",
                icon: Award,
              },
              {
                title: "10–20nm NSF Matrix",
                sub: "Targeted cellular lysis without black staining",
                icon: FlaskConical,
              },
              {
                title: "5% Nano-HA Crystals",
                sub: "Hexagonal enamel lattice remineralization",
                icon: Sparkles,
              },
              {
                title: "ISO 13485 Certified",
                sub: "Medical device quality management system",
                icon: ShieldCheck,
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-white/95 border border-[#073763]/10 rounded-2xl p-4 shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5 text-[#0284c7] mb-1">
                  <stat.icon className="size-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#073763]">
                    {stat.title}
                  </span>
                </div>
                <p className="text-xs text-[#64748b] leading-tight">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Quick Action Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#mechanisms"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#073763] text-white font-bold text-sm shadow-md hover:bg-[#052b4f] transition-all"
              style={{ backgroundColor: "#073763", color: "#ffffff" }}
            >
              <span>Explore Research Pillars</span>
              <ArrowRight className="size-4" />
            </a>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#073763] font-bold text-sm shadow-sm border border-[#073763]/20 transition-all"
            >
              <BookOpen className="size-4 text-[#ad4b09]" />
              <span>Read Clinical Blogs</span>
              <ArrowUpRight className="size-4 opacity-60" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 4 CORE MECHANISM PILLARS */}
      <section id="mechanisms" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
            Foundational Formulations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#073763] mt-2 font-serif">
            The 4 Scientific Pillars
          </h2>
          <p className="text-sm text-[#526174] mt-2">
            Click each mechanism to explore molecular actions, in vitro trial data, and direct clinical monograph links.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto mb-8">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={cn(
                "p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between gap-2 shadow-2xs",
                activeTab === idx
                  ? "bg-[#073763] text-white border-[#073763] shadow-md ring-2 ring-[#0284c7]"
                  : "bg-white text-[#073763] border-[#073763]/15 hover:bg-[#f8f6f0]"
              )}
            >
              <div className="flex items-center justify-between">
                <p.icon
                  className={cn(
                    "size-5",
                    activeTab === idx ? "text-cyan-300" : "text-[#ad4b09]"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                    activeTab === idx
                      ? "bg-white/15 text-white"
                      : "bg-[#073763]/5 text-[#073763]"
                  )}
                >
                  0{idx + 1}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold leading-snug line-clamp-2">
                  {p.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        {(() => {
          const cur = pillars[activeTab];
          return (
            <div className="bg-[#f8f6f0] border border-[#073763]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                    {cur.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#073763] font-serif leading-tight">
                    {cur.content.headline}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#526174] leading-relaxed">
                    {cur.content.text1}
                  </p>
                  <p className="mt-3 text-sm sm:text-base text-[#526174] leading-relaxed">
                    {cur.content.text2}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#073763]/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#073763] mb-3">
                      Key Clinical Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cur.content.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/blogs?article=${cur.blogId}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#073763] text-white font-bold text-xs shadow-md hover:bg-[#052b4f] transition-all"
                      style={{ backgroundColor: "#073763", color: "#ffffff" }}
                    >
                      <BookOpen className="size-3.5 text-cyan-300" />
                      <span>{cur.content.blogTitle}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <a
                      href="#whitepapers"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#073763]/20 text-[#073763] font-semibold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      <Download className="size-3.5 text-[#0284c7]" />
                      <span>Download Whitepaper</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#073763]/15 rounded-2xl p-6 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-[#073763]/10 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#073763]">
                      Product Integration
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active Clinical Formulations
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeTab === 0 && (
                      <div>
                        <p className="text-xs font-bold text-[#073763]">Nanion Elite (3% NSF Toothpaste)</p>
                        <p className="text-xs text-[#64748b] mt-1">High-risk pediatric caries arrest and active plaque biofilm neutralization.</p>
                        <Link to="/products/nanion-elite" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#ad4b09] hover:underline">
                          View Nanion Elite details <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    )}
                    {activeTab === 1 && (
                      <div>
                        <p className="text-xs font-bold text-[#073763]">Nanion Elite Pro (3% NSF + 5% nHA)</p>
                        <p className="text-xs text-[#64748b] mt-1">Dual-matrix active remineralization and permanent dentinal tubule occlusion.</p>
                        <Link to="/products/nanion-elite-pro" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#ad4b09] hover:underline">
                          View Nanion Elite Pro details <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    )}
                    {activeTab === 2 && (
                      <div>
                        <p className="text-xs font-bold text-[#073763]">Nanion Swish Mouthwash (NSF Rinse)</p>
                        <p className="text-xs text-[#64748b] mt-1">Zero-alcohol antimicrobial rinse designed for orthodontic plaque control.</p>
                        <Link to="/products/nanion-swish" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#ad4b09] hover:underline">
                          View Nanion Swish details <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    )}
                    {activeTab === 3 && (
                      <div>
                        <p className="text-xs font-bold text-[#073763]">Nanion Lite (2% NSF Toothpaste)</p>
                        <p className="text-xs text-[#64748b] mt-1">Daily pediatric prophylaxis and non-invasive early childhood caries prevention.</p>
                        <Link to="/products/nanion-lite" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#ad4b09] hover:underline">
                          View Nanion Lite details <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#073763]/10 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
                    <p className="text-[11px] text-[#64748b] italic leading-snug">
                      Formulated under WIPO Patents WO2009098710A1 &amp; WO2015155629A1. Manufactured under ISO 13485:2016 Medical Device standards by 3K NANO PVT. LTD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 3. CLINICAL TRIAL & BENCHMARK COMPARISON MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
            Empirical Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#073763] mt-2 font-serif">
            Head-to-Head Clinical Matrix
          </h2>
          <p className="text-sm text-[#526174] mt-2">
            Comparing SPARK-DV NanoSilver Fluoride formulations against conventional chairside and home-care standards.
          </p>
        </div>

        <div className="overflow-x-auto bg-white border border-[#073763]/15 rounded-3xl shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#073763] text-white text-xs uppercase tracking-wider font-bold">
                <th className="py-4 px-5 border-r border-white/10">Clinical Parameter</th>
                <th className="py-4 px-5 bg-[#0a4880] text-cyan-200 border-r border-white/10">
                  SPARK-DV Nanion Matrix
                </th>
                <th className="py-4 px-5 border-r border-white/10">Standard 5% NaF Varnish</th>
                <th className="py-4 px-5 border-r border-white/10">Traditional 38% SDF</th>
                <th className="py-4 px-5">Standard Toothpaste</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#073763]/10 text-xs">
              {comparisonData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                  <td className="py-3.5 px-5 font-bold text-[#073763] border-r border-[#073763]/10">
                    {row.parameter}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#073763] bg-[#0284c7]/5 border-r border-[#073763]/10">
                    {row.sparkdv}
                  </td>
                  <td className="py-3.5 px-5 text-[#526174] border-r border-[#073763]/10">{row.naf}</td>
                  <td className="py-3.5 px-5 text-[#526174] border-r border-[#073763]/10">{row.sdf}</td>
                  <td className="py-3.5 px-5 text-[#526174]">{row.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. CROSS-LINKED CLINICAL BLOG PUBLICATIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
              Peer-Reviewed Literature
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#073763] mt-2 font-serif">
              Clinical Blogs &amp; Research Monographs
            </h2>
            <p className="text-sm text-[#526174] mt-2 max-w-xl">
              Deep clinical monographs authored by Dr. Ajay Reddy Mareddy covering antimicrobial kinetics, electron microscopy assays, and remineralization protocols.
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-[#073763]/20 hover:border-[#073763]/40 text-[#073763] font-bold text-xs shadow-2xs hover:shadow-xs transition-all shrink-0"
          >
            <span>View All Blog Publications</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 3).map((art) => (
            <article
              key={art.id}
              className="bg-white border border-[#073763]/15 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#073763]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {art.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#64748b] mb-2 font-medium">
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.citationCount} Citations</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#073763] font-serif group-hover:text-[#ad4b09] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#526174] mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#073763]/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#073763]">
                  {art.author}
                </span>
                <Link
                  to={`/blogs?article=${art.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#073763] group-hover:text-[#ad4b09] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. DOWNLOADABLE WHITEPAPERS & MONOGRAPHS */}
      <section id="whitepapers" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 scroll-mt-28">
        <div className="bg-[#f0f4f8] border border-[#073763]/15 rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
              Practitioner Library
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073763] mt-2 font-serif">
              Download Clinical Dossiers &amp; Whitepapers
            </h2>
            <p className="text-sm text-[#526174] mt-2">
              Instant access to laboratory validation data, cytotoxicity challenge reports, and chairside IFU protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whitepapers.map((wp) => (
              <div
                key={wp.id}
                className="bg-white border border-[#073763]/15 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#64748b] mb-3">
                    <span className="font-bold uppercase tracking-wider text-[#0284c7]">
                      {wp.category}
                    </span>
                    <span className="font-medium bg-slate-100 px-2 py-0.5 rounded">
                      {wp.pages}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#073763] font-serif leading-snug">
                    {wp.title}
                  </h3>

                  <p className="text-xs text-[#526174] mt-2 leading-relaxed">
                    {wp.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#073763]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b] font-medium">{wp.size}</span>
                  <button
                    type="button"
                    onClick={() => setDownloadModal(wp.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#073763] hover:bg-[#052b4f] text-white font-bold text-xs shadow-2xs transition-colors"
                    style={{ backgroundColor: "#073763", color: "#ffffff" }}
                  >
                    <Download className="size-3 text-cyan-300" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLINICAL SCIENCE FAQ ACCORDION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
            Scientific Inquiries
          </span>
          <h2 className="text-3xl font-bold text-[#073763] mt-2 font-serif">
            Frequently Asked Science Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#073763]/15 rounded-2xl overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#073763]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "size-5 text-[#0284c7] shrink-0 transition-transform duration-200",
                    activeFaq === idx ? "rotate-180" : ""
                  )}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#526174] leading-relaxed border-t border-[#073763]/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRACTITIONER TRIAL / DISTRIBUTOR PRICING CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#073763] to-[#041d35] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
            Experience the Biomimetic Advantage in Your Practice
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8">
            Request our comprehensive clinician trial pack or inquire about commercial distribution territories across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/distributor"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#073763] font-bold text-sm shadow-md hover:bg-slate-100 transition-all"
              style={{ backgroundColor: "#ffffff", color: "#073763" }}
            >
              <span>Request Distributor Pricing</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact?type=Clinical%20enquiry"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <Stethoscope className="size-4 text-cyan-300" />
              <span>Contact Clinical R&amp;D Team</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Download Success Toast Modal */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#073763]/15 text-center">
            <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Download className="size-7" />
            </div>
            <h3 className="text-lg font-bold text-[#073763] font-serif">
              Clinical Whitepaper Ready
            </h3>
            <p className="text-xs text-[#526174] mt-2 mb-6">
              Your copy of <strong>&ldquo;{downloadModal}&rdquo;</strong> has been prepared for download.
            </p>
            <button
              type="button"
              onClick={() => setDownloadModal(null)}
              className="w-full py-3 rounded-xl bg-[#073763] text-white font-bold text-xs shadow-md"
              style={{ backgroundColor: "#073763", color: "#ffffff" }}
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

