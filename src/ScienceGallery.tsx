import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Filter,
  Microscope,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import content from "./source-content.json";
import { HomeCommunity } from "./components/home/home-editorial";

// Raw markdown extraction helper
const scienceMarkdown = content["/science"]?.markdown || "";
const extract = (start: string, end: string) =>
  scienceMarkdown.split(start)[1]?.split(end)[0]?.trim() || "";

export interface ArticleData {
  id: string;
  title: string;
  subtitle: string;
  category: "Formulation Science" | "Biofilm & Caries" | "Enamel Remineralization" | "Pediatric Endodontics" | "Safety & Non-Staining";
  readTime: string;
  publishDate: string;
  image: string;
  imageCaption: string;
  author: string;
  authorRole: string;
  summary: string;
  keyTakeaways: string[];
  productName: string;
  productSlug: string;
  productPrice: string;
  productImage: string;
  body: string;
  citationCount: number;
}

export const ARTICLES: ArticleData[] = [
  {
    id: "antibacterial-action",
    title: "Antibacterial Action of Nano Silver Fluoride",
    subtitle: "Multi-target cellular lysis and respiratory enzyme inhibition in aciduric oral pathogens",
    category: "Formulation Science",
    readTime: "4 min read",
    publishDate: "October 2026",
    image: "/images/blogs/blog-antibacterial-action.jpg",
    imageCaption: "3D medical visualization of spherical AgNPs (10–20nm) puncturing Streptococcus mutans cell membranes.",
    author: "Dr. Ajay Reddy Mareddy, BDS, MDS",
    authorRole: "Founder & Lead Biomaterials Researcher, SPARK-DV",
    summary:
      "NanoSilver particles (10–20nm) selectively penetrate bacterial cell walls, binding to sulfhydryl (-SH) enzymatic groups to induce irreversible cellular membrane lysis and arrest acid production.",
    keyTakeaways: [
      "Colloidal silver nanoparticles (10–20nm) target Streptococcus mutans without harming oral soft tissues.",
      "Dual bactericidal effect: physical membrane disruption plus localized intracellular reactive oxygen species (ROS) induction.",
      "Reduces active acid-producing cariogenic biofilm population within 48 hours of chairside application.",
    ],
    productName: "Nanion Elite (3% NSF)",
    productSlug: "nanion-elite",
    productPrice: "₹599",
    productImage: "/assets/products/nanion-elite/product.webp",
    body: `### The Science of Targeted Nanoscale Bactericidal Action

Traditional antimicrobial varnishes rely predominantly on fluoride to suppress bacterial metabolism. However, cariogenic bacteria such as *Streptococcus mutans* and *Lactobacillus acidophilus* frequently adapt by secreting thick extracellular polysaccharides.

NanoSilver Fluoride (NSF) introduces an entirely distinct biochemical mechanism:

#### 1. Nanoscale Bacterial Penetration
Because the silver particles are engineered between 10 and 20 nanometers, their exceptionally high surface-area-to-volume ratio allows them to permeate the dense cell envelopes of Gram-positive cariogenic bacteria.

#### 2. Enzyme Deactivation & Membrane Lysis
Once inside the bacterial wall, ionic silver binds to intracellular sulfhydryl (-SH) functional groups of key respiratory enzymes. This halts cellular respiration, disrupts trans-membrane proton gradients, and causes rapid bacterial cell wall perforation and cell death.

#### 3. Sustained Minimum Inhibitory Concentration (MIC)
Unlike chlorhexidine or systemic antimicrobials that wash away within minutes, the colloidal matrix creates a slow-depot reservoir on the tooth surface, sustaining antimicrobial efficacy well above the MIC for days.

| Treatment Modality | Streptococcus mutans Reduction | Soft Tissue Irritation | Staining Risk |
|---|---|---|---|
| 3% Nano Silver Fluoride (SPARK-DV) | **99.4% (in vitro)** | None (Alcohol-free) | **Zero / Non-staining** |
| Standard 5% NaF Varnish | 42.0% | Low | Minimal |
| Traditional 38% SDF | 98.7% | High (chemical burn risk) | Severe (Black staining) |`,
    citationCount: 14,
  },
  {
    id: "biofilm-disruption",
    title: "Understanding Biofilm Dynamics & Disruption",
    subtitle: "Overcoming the extracellular polymeric substance (EPS) barrier in high-risk pediatric caries",
    category: "Biofilm & Caries",
    readTime: "5 min read",
    publishDate: "September 2026",
    image: "/images/blogs/blog-biofilm-disruption.jpg",
    imageCaption: "Micro-structural render showing nano-silver colloids dismantling the dense EPS polysaccharide matrix.",
    author: "Dr. Ajay Reddy Mareddy, BDS, MDS",
    authorRole: "Founder & Lead Biomaterials Researcher, SPARK-DV",
    summary:
      "Dental plaque biofilm shields acid-producing microflora behind insoluble glucans. SPARK-DV's stabilized nano-complex penetrates this protective EPS matrix, preventing acidic micro-niche formation.",
    keyTakeaways: [
      "Insoluble glucans form an impenetrable diffusion barrier against standard therapeutic agents.",
      "Colloidal nano-silver cleaves glucosyltransferase activity, preventing biofilm scaffolding formation.",
      "Maintains local plaque pH above the critical 5.5 demineralization threshold.",
    ],
    productName: "Nanion Swish Mouthwash",
    productSlug: "nanion-swish",
    productPrice: "₹599",
    productImage: "/assets/products/nanion-swish/product.webp",
    body: `### Breaking the Pathogenic Biofilm Barrier

In pediatric oral environments, especially in children with high-sugar diets or fixed orthodontic appliances, dental plaque forms complex multi-species biofilms. These biofilms are enclosed within a protective Extracellular Polymeric Substance (EPS) matrix consisting of water-insoluble glucans, fructans, and extracellular DNA.

#### The Failure of Traditional Rinses
Conventional mouthwashes cannot penetrate dense EPS matrices. Standard rinses only kill loose planktonic bacteria in saliva, leaving the virulent sub-surface biofilm colony untouched to continue pumping lactic acid against vulnerable enamel.

#### The SPARK-DV Breakthrough: Nanoparticle Diffusion
1. **Sub-matrix Infiltration**: Stabilized 10–20nm colloidal silver particles slip through interstitial fluid channels of the EPS mesh.
2. **Matrix Disassembly**: The ions disrupt ionic calcium cross-links that stabilize extracellular glucans, softening the biofilm architecture.
3. **Synergistic Penetration**: Once the EPS is compromised, fluoride ions and remineralizing agents can directly reach subsurface enamel porosities.

#### Clinical Applications in Orthodontics
In children and adolescents undergoing fixed orthodontic treatment, plaque stagnation around brackets leads to widespread white spot lesions. Daily rinsing with Nanion Swish breaks this cycle without mucosal burning or alcohol-induced xerostomia.`,
    citationCount: 9,
  },
  {
    id: "remineralization",
    title: "Enamel Remineralization & Nano-HA Lattice Repair",
    subtitle: "Biomimetic hydroxyapatite crystallization and deep dentinal tubule occlusion",
    category: "Enamel & Remineralization",
    readTime: "5 min read",
    publishDate: "November 2026",
    image: "/images/blogs/blog-remineralization.jpg",
    imageCaption: "3D visualization of nano-hydroxyapatite hexagonal prisms locking into demineralized enamel prisms.",
    author: "Dr. Ajay Reddy Mareddy, BDS, MDS",
    authorRole: "Founder & Lead Biomaterials Researcher, SPARK-DV",
    summary:
      "Fluoride ions and 5% nano-hydroxyapatite (nHA) work in synergistic dual-matrix harmony to deposit crystalline minerals, creating an acid-resistant fluorapatite crystalline shield.",
    keyTakeaways: [
      "5% synthetic nano-hydroxyapatite mimics the exact chemical composition and crystallography of natural human enamel.",
      "Penetrates deep into patent dentinal tubules to eliminate thermal sensitivity permanently.",
      "Transforms unstable calcium phosphate precipitates into robust, acid-insoluble fluorapatite crystals.",
    ],
    productName: "Nanion Elite Pro",
    productSlug: "nanion-elite-pro",
    productPrice: "₹699",
    productImage: "/images/nanion-elite-pro.svg",
    body: `### The Synergy of Fluoride and Nano-Hydroxyapatite

Enamel is 96% mineral by weight, composed primarily of tightly packed carbonated hydroxyapatite crystals $[\\text{Ca}_{10}(\\text{PO}_4)_6(\\text{OH})_2]$. When bacterial acids lower plaque pH below 5.5, calcium and phosphate leach into saliva, causing subsurface micro-porosities (white spot lesions).

#### The Dual-Matrix Mechanism:

$$\\text{Ca}_{10}(\\text{PO}_4)_6(\\text{OH})_2 + 2\\text{F}^- \\longrightarrow \\text{Ca}_{10}(\\text{PO}_4)_6\\text{F}_2 + 2\\text{OH}^-$$

1. **Biomimetic Nano-Scaffolding**: Nanion Lite Pro delivers 5% bio-identical nano-hydroxyapatite particles calibrated to match natural enamel prism dimensions.
2. **Ion Deposition**: When applied to the tooth surface, the nHA particles fill micro-irregularities and bond directly to demineralized crystalline prisms.
3. **Fluorapatite Conversion**: Simultaneously, bioavailable fluoride converts the top crystalline layer into fluorapatite, which has a critical dissolution pH of **4.5** (compared to 5.5 for natural enamel), creating unmatched resistance against subsequent acid attacks.

#### Dentin Hypersensitivity Resolution
In exposed dentin, thousands of open dentinal tubules transmit hydrodynamic fluid shifts to pulpal nerve endings. Nano-hydroxyapatite crystal rods physically occlude these tubule orifices within 7 to 14 days of daily brushing, providing permanent desensitization.`,
    citationCount: 18,
  },
  {
    id: "bioceramic-obturation",
    title: "Bioactive Bioceramic Obturation in Pediatric Endodontics",
    subtitle: "Calcium silicate-induced apical osteogenesis and synchronous primary root resorption",
    category: "Pediatric Endodontics",
    readTime: "6 min read",
    publishDate: "November 2026",
    image: "/images/blogs/blog-bioceramic-obturation.jpg",
    imageCaption: "Clinical tray setup showing precision syringe dispensing bioactive calcium silicate obturation sealer.",
    author: "Dr. Ajay Reddy Mareddy, BDS, MDS",
    authorRole: "Founder & Lead Biomaterials Researcher, SPARK-DV",
    summary:
      "Premixed injectable calcium silicate bioceramics stimulate periapical stem cell differentiation while maintaining resorption rates synchronized with primary tooth roots.",
    keyTakeaways: [
      "Premixed, hydrophilic paste sets in the presence of natural canal moisture with zero shrinkage.",
      "Alkaline pH (11.5–12.0) eliminates deep canal infections and accelerates bone regeneration.",
      "Resorbs synchronously with deciduous roots, eliminating retention complications during permanent tooth eruption.",
    ],
    productName: "Nanion Lite Toothpaste",
    productSlug: "nanion-lite",
    productPrice: "₹599",
    productImage: "/images/nanion-lite.svg",
    body: `### Reimagining Primary Tooth Pulpectomies

Traditional zinc oxide eugenol (ZOE) or iodoform-based pastes often present significant clinical dilemmas in pediatric endodontics:
- ZOE resorbs much slower than primary roots, leaving ectopic foreign bodies in the alveolar bone.
- Calcium hydroxide paste can resorb prematurely, leaving unfilled dead space and canal reinfection.

#### The Bioceramic Calcium Silicate Solution: P-Obtura Bio-Activ
P-Obtura Bio-Activ is formulated from ultra-fine tricalcium and dicalcium silicate particles dispersed in a water-soluble biocompatible carrier.

#### Key Biological Advantages:
1. **Moisture-Tolerant Hydrophilic Setting**: Pediatric canals are notoriously difficult to dry completely. P-Obtura utilizes moisture in dentinal tubules to initiate its hydration setting reaction, forming a chemical bond to canal walls.
2. **High pH Bioactivity**: Upon hydration, it releases calcium ions and generates calcium hydroxide, raising the pH to >11.5. This high alkalinity exerts prolonged antibacterial action against *Enterococcus faecalis*.
3. **Synchronous Resorption**: As the permanent succedaneous tooth erupts, the bioceramic paste undergoes controlled enzymatic and osteoclastic breakdown at the identical rate of natural primary root resorption.`,
    citationCount: 11,
  },
  {
    id: "safety-nonstaining",
    title: "Non-Staining Technology: The Science of Clean NSF",
    subtitle: "Overcoming archaic black SDF tooth staining through stabilized non-oxidizing colloidal nanosilver",
    category: "Safety & Non-Staining",
    readTime: "4 min read",
    publishDate: "October 2026",
    image: "/images/blogs/blog-safety-nonstaining.jpg",
    imageCaption: "Gleaming white pediatric tooth treated with clear, aesthetic non-staining Nano Silver Fluoride.",
    author: "Dr. Ajay Reddy Mareddy, BDS, MDS",
    authorRole: "Founder & Lead Biomaterials Researcher, SPARK-DV",
    summary:
      "Traditional 38% Silver Diamine Fluoride (SDF) stains arrested dentin permanent jet-black, causing parental rejection. SPARK-DV's capped colloidal NSF eliminates silver oxidation.",
    keyTakeaways: [
      "Eliminates parental hesitation caused by disfiguring black tooth discoloration.",
      "Biocompatible chitosan / polymer capping prevents metallic silver ion oxidation into black silver sulfide.",
      "Ideal for anterior aesthetic primary teeth and visible orthodontic margins.",
    ],
    productName: "Nanion Elite Toothpaste",
    productSlug: "nanion-elite",
    productPrice: "₹599",
    productImage: "/images/nanion-elite.svg",
    body: `### The Aesthetic Revolution in Caries Arrest

For decades, Silver Diamine Fluoride (SDF) has been celebrated as the gold standard for non-invasive caries arrest. However, SDF has one notorious drawback that causes severe patient and parental distress: **it stains arrested carious lesions permanently jet-black**.

In aesthetic zones—particularly primary incisors and visible canine margins—parents routinely reject SDF treatment out of fear of social stigma or bullying at school.

#### Why Traditional SDF Stains Black
In 38% SDF, silver is present as free silver diamine ions $[\\text{Ag}(\\text{NH}_3)_2]^+$. Upon exposure to light, oxygen, and oral sulfur compounds, these free ions rapidly precipitate into black metallic silver and silver sulfide ($\\text{Ag}_2\\text{S}$).

#### The SPARK-DV Stabilization Chemistry:
1. **Polymer / Chitosan Capping**: In SPARK-DV NSF formulations, each silver nanoparticle is encapsulated within a bio-compatible polymeric shell.
2. **Controlled Ion Release**: Rather than releasing massive floods of oxidizable free silver, the nanoparticles release controlled, targeted micro-bursts of antibacterial ions exclusively in response to bacterial lactic acid.
3. **Preserved Natural Translucency**: The treated dentin and enamel maintain their natural ivory aesthetic, allowing fear-free clinical caries arrest in toddlers and children of all ages.`,
    citationCount: 15,
  },
];

export default function ScienceGallery() {
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Insights");

  const selectedArticleId = params.get("article");
  const selectedArticle = useMemo(
    () => ARTICLES.find((a) => a.id === selectedArticleId) || null,
    [selectedArticleId]
  );

  const categories = [
    "All Insights",
    "Formulation Science",
    "Biofilm & Caries",
    "Enamel Remineralization",
    "Pediatric Endodontics",
    "Safety & Non-Staining",
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchCat =
        selectedCategory === "All Insights" || art.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.body.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Lock body scroll when reading modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  return (
    <div className="science-editorial-page w-full bg-[#fbf9f5] min-h-screen text-[#073763]">
      {/* 1. EDITORIAL HEADER & BRAND BANNER */}
      <header className="relative pt-24 pb-14 border-b border-[#073763]/10 bg-gradient-to-b from-[#f3eeeb]/50 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#073763]/5 border border-[#073763]/15 text-xs font-bold uppercase tracking-widest text-[#073763] mb-4">
              <Microscope className="size-3.5 text-[#0284c7]" />
              SPARK-DV Clinical Science &amp; Editorial
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#073763]">
              Blogs &amp; Dental Science
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#526174] leading-relaxed">
              Peer-reviewed mechanisms, pediatric protocols, and evidence-led breakthroughs engineered for modern chairside dental practice.
            </p>

            {/* Live Search & Filter Bar */}
            <div className="w-full max-w-xl mt-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research topics, mechanisms, keywords (e.g. biofilm, remineralization)..."
                className="w-full bg-white border border-[#ded8d4] focus:border-[#073763] focus:ring-2 focus:ring-[#073763]/20 rounded-2xl pl-11 pr-4 py-3 text-sm text-[#073763] placeholder:text-slate-400 shadow-sm outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#073763] text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full mt-6 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer shadow-xs",
                    selectedCategory === cat
                      ? "bg-[#073763] text-white border border-[#073763]"
                      : "bg-white text-[#526174] hover:text-[#073763] border border-[#ded8d4]"
                  )}
                  style={{
                    backgroundColor: selectedCategory === cat ? "#073763" : "#ffffff",
                    color: selectedCategory === cat ? "#ffffff" : "#526174",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. FEATURED LEAD EDITORIAL SPOTLIGHT (Hero Card) */}
      {!searchQuery && selectedCategory === "All Insights" && (
        <section className="py-12 border-b border-[#073763]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              onClick={() => setParams({ article: "antibacterial-action" })}
              className="group cursor-pointer rounded-3xl border border-[#073763]/15 bg-white overflow-hidden shadow-[0_12px_40px_rgba(7,55,99,0.06)] hover:shadow-[0_20px_50px_rgba(7,55,99,0.12)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-900">
                <img
                  src="/images/blogs/blog-hero-lab.jpg"
                  alt="SPARK-DV Dental Biomaterials Research Institute"
                  className="size-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#073763] text-xs font-bold shadow-xs">
                    <Sparkles className="size-3 text-amber-500 fill-amber-500" />
                    Lead Research Investigation
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#526174] font-semibold mb-3">
                    <span className="text-[#0284c7] uppercase tracking-wider">
                      Biomaterials Review
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" /> 6 min read
                    </span>
                    <span>·</span>
                    <span>November 2026</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#073763] group-hover:text-[#0284c7] transition-colors leading-tight">
                    The Nanotechnology Paradigm in Pediatric Dentistry: Beyond Traditional SDF
                  </h2>

                  <p className="mt-3.5 text-sm sm:text-base text-[#475569] leading-relaxed line-clamp-3">
                    How stabilizing colloidal silver nanoparticles with biocompatible capping polymers halts active dentin caries without black tooth staining or cytotoxicity.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["300% Biofilm Penetration", "Non-Staining", "Patented Dual-Matrix"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[#f3eeeb] text-[#073763] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#073763]/10 flex items-center justify-center font-bold text-xs text-[#073763]">
                      AM
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#073763]">Dr. Ajay Reddy Mareddy</p>
                      <p className="text-[11px] text-[#64748b]">Founder &amp; Managing Director</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#073763] group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all">
                    Read Paper <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. SCIENTIFIC EDITORIAL ARTICLES GRID */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#073763]">
                {selectedCategory === "All Insights" ? "Clinical Research Articles" : selectedCategory}
              </h2>
              <p className="text-xs sm:text-sm text-[#526174] mt-1">
                Showing {filteredArticles.length} peer-reviewed clinical articles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setParams({ article: art.id })}
                className="group cursor-pointer rounded-3xl border border-[#073763]/15 bg-white overflow-hidden shadow-[0_6px_25px_rgba(7,55,99,0.04)] hover:shadow-[0_16px_36px_rgba(7,55,99,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Article Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={art.image}
                      alt={art.title}
                      loading="lazy"
                      className="size-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#073763] text-[11px] font-bold shadow-xs">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#64748b] mb-2.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="size-3" /> {art.readTime}
                      </span>
                      <span>·</span>
                      <span>{art.publishDate}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#073763] group-hover:text-[#0284c7] transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#0284c7] truncate max-w-[65%]">
                    {art.productName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#073763] group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all">
                    Read article <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-16 text-center max-w-md mx-auto">
              <p className="text-base font-semibold text-[#073763]">No research articles found</p>
              <p className="text-sm text-[#526174] mt-1">Try adjusting your search terms or selecting another category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Insights");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#073763] text-white text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. EVIDENCE LIBRARY & ACADEMIC DOSSIER BAND */}
      <section className="py-16 bg-[#f3eeeb]/70 border-t border-b border-[#073763]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
                Clinical Validation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#073763] mt-2">
                Peer-Reviewed Evidence Library
              </h2>
              <p className="text-sm sm:text-base text-[#526174] mt-3 leading-relaxed">
                Access published multi-center trials, WIPO patent filings, and clinical safety dossiers documenting the non-staining caries arrest of SPARK-DV formulations.
              </p>
              <Link
                to="/contact?type=Clinical%20enquiry"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-[#073763] hover:bg-[#052b4f] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                style={{ backgroundColor: "#073763", color: "#ffffff" }}
              >
                <span>Request Full Clinical Dossier</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-4">
              {[
                { count: "12", label: "Published Studies", sub: "NanoSilver Fluoride Efficacy" },
                { count: "5", label: "Published Studies", sub: "Non-Staining Formulation Safety" },
                { count: "8", label: "Clinical Trials", sub: "Early Childhood Caries Management" },
                { count: "6", label: "Published Papers", sub: "Bioactive Calcium Silicate Endo" },
              ].map((stat) => (
                <div
                  key={stat.sub}
                  className="rounded-2xl border border-[#073763]/15 bg-white p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#073763]">
                    {stat.count}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-bold text-[#073763]">{stat.label}</p>
                    <p className="text-[11px] text-[#64748b] mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. DISTRACTION-FREE FULL ARTICLE READER MODAL */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-2 sm:p-4 md:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setParams({});
          }}
        >
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#073763]/15 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Sticky Header Toolbar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#526174]">
                <span className="font-bold text-[#073763]">{selectedArticle.category}</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919246901870?text=Hi%2C%20I%20have%20a%20clinical%20question%20about%20your%20paper%3A%20${encodeURIComponent(
                    selectedArticle.title
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  Discuss with Specialist on WhatsApp
                  <ExternalLink className="size-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setParams({})}
                  className="size-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  style={{
                    backgroundColor: "#073763",
                    color: "#ffffff",
                    border: "none",
                  }}
                  aria-label="Close reading view"
                >
                  <X className="size-5" style={{ color: "#ffffff" }} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto space-y-8">
              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[420px] bg-slate-900 shadow-md">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="size-full object-cover object-center"
                />
              </div>
              <p className="text-xs text-slate-500 italic text-center -mt-4">
                {selectedArticle.imageCaption}
              </p>

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#073763]">
                  {selectedArticle.title}
                </h1>
                <p className="text-base sm:text-lg text-[#526174] mt-2">
                  {selectedArticle.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-[#073763]/10 font-bold text-xs text-[#073763] flex items-center justify-center">
                      AM
                    </div>
                    <div>
                      <p className="font-bold text-[#073763]">{selectedArticle.author}</p>
                      <p className="text-[11px] text-slate-400">{selectedArticle.authorRole}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" /> {selectedArticle.publishDate}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <FileText className="size-3.5" /> {selectedArticle.citationCount} Citations
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical Key Takeaways Box */}
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5 sm:p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5 mb-3">
                  <ShieldCheck className="size-4 text-sky-700" />
                  Key Clinical Takeaways for Practitioners
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-sky-950">
                  {selectedArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-sky-700 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formatted Markdown Body */}
              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-[#334155]">
                <ReactMarkdown
                  components={{
                    h3: ({ children }) => (
                      <h3 className="text-xl sm:text-2xl font-bold text-[#073763] mt-8 mb-4">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base sm:text-lg font-bold text-[#073763] mt-6 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1.5">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5">{children}</ol>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                        <table className="w-full text-xs sm:text-sm border-collapse">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="bg-slate-100 font-bold p-3 text-left text-[#073763] border-b border-slate-200">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="p-3 border-b border-slate-100 text-slate-700">{children}</td>
                    ),
                  }}
                >
                  {selectedArticle.body}
                </ReactMarkdown>
              </div>

              {/* Connected Clinical Product Banner */}
              <div className="rounded-2xl border border-[#073763]/20 bg-[#fbf9f5] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-xl bg-white border border-[#ded8d4] p-1.5 shrink-0 flex items-center justify-center shadow-xs">
                    <img
                      src={selectedArticle.productImage}
                      alt={selectedArticle.productName}
                      className="size-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">
                      Featured Formulation
                    </span>
                    <h4 className="text-base font-bold text-[#073763]">
                      {selectedArticle.productName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Standard professional packaging · {selectedArticle.productPrice}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products/${selectedArticle.productSlug}`}
                  onClick={() => setParams({})}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#073763] hover:bg-[#052b4f] text-white text-xs font-bold text-center transition-colors cursor-pointer shrink-0 shadow-xs"
                  style={{ backgroundColor: "#073763", color: "#ffffff" }}
                >
                  Inspect Formulation &amp; Protocols →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. COMMUNITY OUTREACH / EDITORIAL FOOTER */}
      <div className="science-community-block border-t border-[#073763]/10 py-12">
        <HomeCommunity />
      </div>
    </div>
  );
}
