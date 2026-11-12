/**
 * SPARK-DV Product Shelf.
 *
 * Store wall of floating shelves with our complete 17-product clinical catalogue.
 * High-fidelity studio product photography, clean drop shadows, floating shelves,
 * and Apple-style interactive product detail view with multi-size selection,
 * clinical benefits, active ingredients, and cart integration.
 */
"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ChevronDown, ChevronLeft, Minus, Plus, ShoppingBag, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "jar" | "tube" | "pump" | "dropper" | "perfume" | "mist" | "bottle" | "stick" | "lip";

export type Product = {
  id: string;
  kind: Kind;
  name: string;
  short: string;
  sub?: string;
  category: string;
  image?: string;
  slug?: string;
  color: string;
  cap: string;
  label: string;
  ink: string;
  glass?: boolean;
  liquid?: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howTo: string;
};

// ALL 17 SPARK-DV CATALOG PRODUCTS - ZERO MISSED
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "nanion-lite-pro",
    slug: "nanion-lite-pro",
    kind: "tube",
    name: "Nanion Lite Pro",
    short: "Nanion Lite Pro",
    sub: "NSF + 5% nHA Dual-Matrix",
    category: "Prevention",
    image: "/images/nanion-tube-clean.webp",
    color: "#1d3e68", cap: "#c5ced6", label: "#163156", ink: "#ffffff",
    price: 699,
    sizes: ["75g", "150g (Clinic Pack)"],
    rating: 4.9,
    reviews: 1420,
    tagline: "Four-action dual-matrix caries prevention with 5% nHA.",
    description: "Four-action dual-matrix caries prevention. NSF antibacterial action, biofilm disruption, sustained fluoride release, and 5% nano-hydroxyapatite for biomimetic repair and dentinal tubule occlusion.",
    benefits: ["5% Nano-Hydroxyapatite for tubule repair", "NanoSilver Fluoride (NSF) antibacterial action", "Biofilm disruption without tissue staining"],
    ingredients: "NanoSilver Fluoride, 5% Nano-Hydroxyapatite (nHA), Potassium Nitrate, Hydrated Silica, Sorbitol, Xylitol.",
    howTo: "Brush thoroughly twice daily under adult supervision for ages 6+. Spit out, do not swallow.",
  },
  {
    id: "nanion-swish",
    slug: "nanion-swish",
    kind: "bottle",
    name: "Nanion Swish Mouthwash",
    short: "Nanion Swish",
    sub: "NSF Daily Oral Rinse",
    category: "Prevention",
    image: "/images/swish-bottle-clean.webp",
    color: "#0284c7", cap: "#f8fafc", label: "#ffffff", ink: "#073763", glass: true, liquid: "#38bdf8",
    price: 599,
    sizes: ["250 ml", "500 ml"],
    rating: 4.8,
    reviews: 980,
    tagline: "Targeted antimicrobial daily rinse for biofilm control.",
    description: "NanoSilver Fluoride mouthwash engineered for high-risk caries prevention, sustained antibacterial protection, and active remineralization across hard-to-reach interproximal surfaces.",
    benefits: ["Alcohol-free gentle formula", "Targeted NanoSilver antimicrobial action", "Long-lasting biofilm inhibition"],
    ingredients: "Colloidal NanoSilver, Sodium Fluoride (225 ppm F-), Xylitol, Purified Water, Menthol.",
    howTo: "Rinse with 10 ml vigorously for 60 seconds once or twice daily after brushing.",
  },
  {
    id: "nanion-lite",
    slug: "nanion-lite",
    kind: "tube",
    name: "Nanion Lite Toothpaste",
    short: "Nanion Lite",
    sub: "Triple-Action Prevention",
    category: "Prevention",
    image: "/images/nanion-tube-clean.webp",
    color: "#254875", cap: "#b0bcc8", label: "#1e3a5f", ink: "#ffffff",
    price: 599,
    sizes: ["75g"],
    rating: 4.7,
    reviews: 820,
    tagline: "Gentle daily anti-caries protection for youngsters.",
    description: "Triple-action pediatric caries prevention with NSF technology, gentle foaming action, and bio-compatible mineral reinforcement.",
    benefits: ["Pediatric-safe formulation", "Anti-plaque and anti-caries action", "Non-abrasive polishing formula"],
    ingredients: "NanoSilver Fluoride, Precipitated Calcium Carbonate, Glycerin, Sodium Monofluorophosphate.",
    howTo: "Use a pea-sized amount twice daily under adult supervision.",
  },
  {
    id: "nanion-elite",
    slug: "nanion-elite",
    kind: "bottle",
    name: "Nanion Elite",
    short: "Nanion Elite",
    sub: "High-Concentration NSF",
    category: "Prevention",
    image: "/images/nanion-elite-clean.webp",
    color: "#0ea5e9", cap: "#f1f5f9", label: "#ffffff", ink: "#073763", glass: true, liquid: "#7dd3fc",
    price: 599,
    sizes: ["5 ml (Clinical Dropper)"],
    rating: 4.8,
    reviews: 640,
    tagline: "Higher-concentration NSF for high-risk caries arrest.",
    description: "Higher-concentration Nano Silver Fluoride formulation specifically developed for early childhood caries management and non-invasive lesion arrest.",
    benefits: ["Arrests active dentin lesions", "Non-staining technology", "Quick 60-second in-office or targeted application"],
    ingredients: "NanoSilver Fluoride (high concentration), Stabilized bio-matrix, Purified solvent.",
    howTo: "Apply topically with micro-applicator to dried enamel or dentin lesions.",
  },
  {
    id: "nanion-elite-pro",
    slug: "nanion-elite-pro",
    kind: "tube",
    name: "Nanion Elite Pro",
    short: "Nanion Elite Pro",
    sub: "Maximum-Strength Enamel Defense",
    category: "Prevention",
    image: "/images/nanion-tube-clean.webp",
    color: "#0f2747", cap: "#94a3b8", label: "#091a32", ink: "#ffffff",
    price: 699,
    sizes: ["75g"],
    rating: 4.9,
    reviews: 512,
    tagline: "Professional-grade home defense for caries-prone teeth.",
    description: "Advanced formulation featuring dual-action NSF and remineralizing mineral complexes for patients undergoing orthodontic treatment or managing high caries risk.",
    benefits: ["Orthodontic white spot prevention", "Deep tubule occlusion", "Sustained mineral bioavailability"],
    ingredients: "NanoSilver Fluoride, nHA complex, Bio-available Phosphate, Natural Xylitol.",
    howTo: "Apply as directed by your dental professional after evening brushing.",
  },
  {
    id: "nanion-pro-plus-gummies",
    slug: "nanion-pro-plus-gummies",
    kind: "jar",
    name: "Nanion Pro Plus Gummies",
    short: "Pro Gummies",
    sub: "Calcium + Vitamin D3",
    category: "Prevention",
    image: "/images/gummies-clean.webp",
    color: "#e11d48", cap: "#fce7f3", label: "#fff1f2", ink: "#881337",
    price: 599,
    sizes: ["30 Gummies", "60 Gummies"],
    rating: 4.9,
    reviews: 1840,
    tagline: "Sugar-free chewable support for strong developing smiles.",
    description: "Delicious sugar-free pectin oral health gummies loaded with bio-available calcium, vitamin D3, and xylitol to support jaw and enamel mineralization.",
    benefits: ["100% Sugar-free & tooth-friendly", "Supports strong developing enamel & bones", "Natural strawberry flavor kids ask for"],
    ingredients: "Tricalcium Phosphate, Vitamin D3 (Cholecalciferol), Xylitol, Citrus Pectin, Natural Strawberry Flavor.",
    howTo: "Chew one gummy thoroughly each day after meals.",
  },
  {
    id: "nanosilver-pro",
    slug: "nanosilver-pro",
    kind: "dropper",
    name: "Nano Silver Pro Solution",
    short: "NanoSilver Pro",
    sub: "In-Clinic Topical NSF Solution",
    category: "Prevention",
    image: "/images/nanosilver-pro-clean.webp",
    color: "#334155", cap: "#f8fafc", label: "#f1f5f9", ink: "#073763", glass: true, liquid: "#cbd5e1",
    price: 4600,
    sizes: ["10 ml Professional Bottle"],
    rating: 4.9,
    reviews: 430,
    tagline: "Gold-standard non-staining caries arrest solution.",
    description: "Professional in-clinic NanoSilver Fluoride liquid for painless, needle-free caries arrest. Formulated with zero staining of healthy dental tissue.",
    benefits: ["Non-invasive caries arrest", "Zero black staining on margins", "Ideal for pediatric and uncooperative patients"],
    ingredients: "Colloidal NanoSilver (400 ppm), Sodium Fluoride (5%), Stabilizing Excipients.",
    howTo: "Isolate, dry tooth, apply 1 drop with micro-brush for 60 seconds. Light air dry.",
  },
  {
    id: "pobtura",
    slug: "pobtura",
    kind: "pump",
    name: "P-Obtura Bio-Activ",
    short: "P-Obtura",
    sub: "Bioactive Primary Canal Sealer",
    category: "Pediatric endodontics",
    image: "/images/pobtura-clean.webp",
    color: "#475569", cap: "#e2e8f0", label: "#f8fafc", ink: "#073763",
    price: 4125,
    sizes: ["2g Syringe Kit", "Twin Pack (4g)"],
    rating: 4.9,
    reviews: 780,
    tagline: "Premixed bioactive root canal filler for primary teeth.",
    description: "Premixed bioactive root canal sealer and obturation paste containing iodoform and calcium hydroxide. Resorbs at the physiological rate of primary roots.",
    benefits: ["Physiological resorption matching deciduous roots", "Potent antibacterial and osteogenic action", "Premixed ready-to-use smooth syringe delivery"],
    ingredients: "Calcium Hydroxide, Iodoform, Barium Sulfate, Bio-inert Silicone Oil Carrier.",
    howTo: "Inject directly into prepared and dried canals using the disposable delivery tip.",
  },
  {
    id: "nanohybrid-biocem",
    slug: "nanohybrid-biocem",
    kind: "pump",
    name: "Nanohybrid Biocem",
    short: "Biocem",
    sub: "Bioactive Resin Luting Cement",
    category: "Pediatric endodontics",
    image: "/images/biocem-clean.webp",
    color: "#3b82f6", cap: "#dbeafe", label: "#eff6ff", ink: "#1e3a8a",
    price: 4500,
    sizes: ["8g Automix Syringe"],
    rating: 4.8,
    reviews: 620,
    tagline: "Nanohybrid bioactive luting cement with active mineral release.",
    description: "Resin-modified bioactive glass luting cement engineered for crowns, orthodontic bands, and space maintainers. Continuously releases calcium and fluoride ions.",
    benefits: ["Continuous calcium and fluoride ion release", "Moisture tolerant with superior bond strength", "Virtually zero post-operative sensitivity"],
    ingredients: "Bioactive Glass Nanoparticles, Radiopaque Barium Glass, UDMA Resin, Catalyst.",
    howTo: "Dispense directly into crown through automix tip. Seat within 90 seconds.",
  },
  {
    id: "tac",
    slug: "tac",
    kind: "jar",
    name: "TRICURE Bioactive Liner",
    short: "TRICURE",
    sub: "Triple-Cure Cavity Liner",
    category: "Pediatric endodontics",
    image: "/images/tricure-clean.webp",
    color: "#d97706", cap: "#fef3c7", label: "#fffbeb", ink: "#78350f",
    price: 3499,
    sizes: ["Base + Catalyst Kit"],
    rating: 4.7,
    reviews: 310,
    tagline: "Triple-cure bioactive protective cavity liner and base.",
    description: "Light-cured, resin-modified calcium silicate protective liner and base designed for direct and indirect pulp capping in pediatric restorative procedures.",
    benefits: ["Induces tertiary dentin bridge formation", "Alkaline pH promotes pulpal healing", "High compressive strength withstands condensation"],
    ingredients: "Tricalcium Silicate, Hydrophilic Resin Matrix, Calcium Tungstate, Photoinitiators.",
    howTo: "Place in thin layers (0.5 mm) on deepest dentin floor and light cure for 20 seconds.",
  },
  {
    id: "3d-flxpost",
    slug: "3d-flxpost",
    kind: "stick",
    name: "3D FLXPOST Glass Fiber",
    short: "3D FLXPOST",
    sub: "Elastic Primary Fiber Posts",
    category: "Pediatric endodontics",
    image: "/images/flxpost-clean.webp",
    color: "#64748b", cap: "#f1f5f9", label: "#ffffff", ink: "#073763",
    price: 500,
    sizes: ["Pack of 5 Posts", "Assorted 10-Pack"],
    rating: 4.8,
    reviews: 490,
    tagline: "Translucent glass fiber posts matching dentin elasticity.",
    description: "High-translucency silanized glass fiber posts engineered with an elastic modulus identical to natural dentin to prevent root fracture in restored primary incisors.",
    benefits: ["Dentin-like flexural elasticity prevents root splits", "Natural aesthetic light transmission", "Pre-silanized for direct chemical resin bonding"],
    ingredients: "Pre-silanized S-Glass Fibers (68% wt), Epoxy polymer matrix.",
    howTo: "Prepare post space, try post, trim to length, and cement with Nanohybrid Biocem.",
  },
  {
    id: "marc",
    slug: "marc",
    kind: "jar",
    name: "MARC 3D Pediatric Crowns",
    short: "MARC 3D",
    sub: "Pre-Crimped Stainless Molar Crowns",
    category: "Restorations",
    image: "/images/marc-clean.webp",
    color: "#475569", cap: "#cbd5e1", label: "#f8fafc", ink: "#0f172a",
    price: 4800,
    sizes: ["Kit of 48 Crowns", "Kit of 96 Crowns"],
    rating: 4.9,
    reviews: 1240,
    tagline: "Pre-festooned anatomic primary molar crowns for fast placement.",
    description: "Pre-crimped, pre-festooned anatomic surgical stainless steel crowns requiring minimal chairside adjustment. High ductility ensures perfect marginal adaptation.",
    benefits: ["Anatomically accurate occlusal contours", "Pre-crimped cervical margin saves chair time", "Bio-inert medical grade alloy"],
    ingredients: "Surgical Grade Stainless Steel (Cr-Ni surgical alloy).",
    howTo: "Select correct size, verify snap-fit seating, lute with Nanohybrid Biocem.",
  },
  {
    id: "marc-zirc",
    slug: "marc-zirc",
    kind: "jar",
    name: "MARC Zirc Pediatric Crowns",
    short: "MARC Zirc",
    sub: "Monolithic Zirconia Crowns",
    category: "Restorations",
    image: "/images/marc-zirc-clean.webp",
    color: "#f8fafc", cap: "#e2e8f0", label: "#ffffff", ink: "#073763",
    price: 1200,
    sizes: ["Single Unit", "Kit of 24 Units"],
    rating: 4.9,
    reviews: 860,
    tagline: "100% aesthetic monolithic zirconia for pediatric anterior teeth.",
    description: "High-translucency, fully biocompatible monolithic pediatric zirconia crowns offering unparalleled aesthetic vitality and gingival tissue tolerance.",
    benefits: ["Flawless natural tooth shade matching", "Exceptional gingival biocompatibility", "High fracture toughness and chip resistance"],
    ingredients: "Yttria-Stabilized Tetragonal Zirconia Polycrystal (Y-TZP).",
    howTo: "Prepare tooth with featheredge margins, confirm fit with sizing tool, lute with resin cement.",
  },
  {
    id: "asm",
    slug: "asm",
    kind: "jar",
    name: "ASM — Advanced Space Maintainer",
    short: "ASM Maintainer",
    sub: "Pre-Formed Universal Maintainers",
    category: "Restorations",
    image: "/images/asm-clean.webp",
    color: "#0284c7", cap: "#bae6fd", label: "#f0f9ff", ink: "#0369a1",
    price: 2800,
    sizes: ["Starter Kit (20 Units)", "Master Kit (40 Units)"],
    rating: 4.7,
    reviews: 390,
    tagline: "Instant chairside space maintainer without dental lab turnaround.",
    description: "Universal pre-formed adjustable space maintainers eliminating impressions and laboratory delays. Deliver space maintenance in a single 15-minute appointment.",
    benefits: ["Single-visit delivery without lab turnaround", "Laser-welded durability resists occlusal forces", "Easily adjusted loop length chairside"],
    ingredients: "Medical Grade Stainless Steel Bands and Wire Assemblies.",
    howTo: "Trial fit band to molar, adjust wire loop to abutment, crimp, and cement.",
  },
  {
    id: "pedo-spark-single",
    slug: "pedo-spark-single",
    kind: "tube",
    name: "Pedo Spark — Single File System",
    short: "Pedo Spark (Single)",
    sub: "Controlled Memory NiTi Rotary File",
    category: "Endodontic instruments",
    image: "/images/spark-files-clean.webp",
    color: "#d97706", cap: "#fef3c7", label: "#fffbeb", ink: "#78350f",
    price: 2200,
    sizes: ["Assorted Pack (16mm, 18mm)", "Refill Pack (3 files)"],
    rating: 4.9,
    reviews: 910,
    tagline: "CM-Wire heat-treated single file for rapid primary pulpectomy.",
    description: "Controlled Memory (CM) heat-treated NiTi rotary files in pediatric lengths (16mm, 18mm) designed specifically for curved primary root canals with non-cutting safety tips.",
    benefits: ["One-file efficiency dramatically cuts treatment time", "Extreme resistance to cyclic fatigue in curved canals", "Non-cutting tip avoids apical ledge formation"],
    ingredients: "Controlled Memory (CM-Wire) Heat-Treated Nickel-Titanium.",
    howTo: "Use in continuous rotation at 300 RPM, 2.0 N·cm torque with gentle pecking motion.",
  },
  {
    id: "pedo-spark-three",
    slug: "pedo-spark-three",
    kind: "tube",
    name: "Pedo Spark — Three File System",
    short: "Pedo Spark (Three)",
    sub: "Graduated Primary Molar Sequence",
    category: "Endodontic instruments",
    image: "/images/spark-files-clean.webp",
    color: "#2563eb", cap: "#dbeafe", label: "#eff6ff", ink: "#1e3a8a",
    price: 1800,
    sizes: ["3-File Assorted Pack (16mm)", "3-File Assorted Pack (18mm)"],
    rating: 4.8,
    reviews: 740,
    tagline: "Sequential 3-file rotary sequence for narrow deciduous canals.",
    description: "Sequential 3-file rotary sequence engineered for conservative cleaning and shaping of narrow, highly curved primary molar roots.",
    benefits: ["Graduated taper sequence avoids over-instrumentation", "Superior debris evacuation prevents apical extrusion", "Black Oxide TiO2 surface enhancement"],
    ingredients: "Black Oxide TiO2 surface-engineered NiTi alloy.",
    howTo: "Sequence: File 1 (Coronal) -> File 2 (Mid) -> File 3 (Apical) with copious irrigation.",
  },
  {
    id: "endo-spark-permanent",
    slug: "endo-spark-permanent",
    kind: "tube",
    name: "Endo Spark Files — Permanent Teeth",
    short: "Endo Spark Perm",
    sub: "Gold Heat-Treated Rotary Files",
    category: "Endodontic instruments",
    image: "/images/spark-files-clean.webp",
    color: "#ca8a04", cap: "#fef08a", label: "#fefce8", ink: "#713f12",
    price: 1500,
    sizes: ["21mm Assorted Pack", "25mm Assorted Pack"],
    rating: 4.9,
    reviews: 1120,
    tagline: "Gold heat-treated super-elastic files for permanent teeth.",
    description: "Premium Gold heat-treated super-elastic NiTi rotary files for permanent and young-permanent root canal therapy. Superb flexibility in severe anatomical curvatures.",
    benefits: ["Advanced Gold thermal treatment enhances cyclic resistance", "Maintains original canal anatomy without zipping", "High cutting efficiency with minimal torque stress"],
    ingredients: "TiN Gold Thermal Heat-Treated Nickel-Titanium Alloy.",
    howTo: "Operate at 350 RPM, 2.5 N·cm with gentle brushing strokes against canal walls.",
  },
];

// Packaging art fallback for pure vectors
type Box = { x: number; y: number; w: number; h: number };
type Shape = {
  body: string;
  box: Box;
  print: Box & { paper?: boolean };
  fill?: number;
  tube?: boolean;
  cap: (id: string) => ReactNode;
};

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

const ridges = (x: number, y: number, w: number, h: number, step = 2.6) =>
  Array.from({ length: Math.floor(w / step) }, (_, i) => (
    <line key={i} x1={x + 1 + i * step} y1={y + 1.5} x2={x + 1 + i * step} y2={y + h - 1.5} stroke="#000" strokeOpacity={i % 2 ? 0.14 : 0.06} strokeWidth="1" />
  ));

const SHAPES: Record<Kind, Shape> = {
  jar: {
    body: "M42 208 H158 Q162 208 162 214 V276 Q162 286 150 286 H50 Q38 286 38 276 V214 Q38 208 42 208 Z",
    box: { x: 38, y: 208, w: 124, h: 78 },
    print: { x: 38, y: 226, w: 124, h: 46 },
    cap: (id) => (
      <>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-cap)`} />
        <g>{ridges(36, 178, 128, 30, 2.2)}</g>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-capv)`} />
        <path d="M42 173.2 H158" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" />
        <rect x="38" y="208" width="124" height="3" fill="#000" opacity="0.22" />
      </>
    ),
  },
  tube: {
    body: "M80 250 L67 74 Q66 60 74 58 L126 58 Q134 60 133 74 L120 250 Z",
    box: { x: 66, y: 58, w: 68, h: 192 },
    print: { x: 66, y: 104, w: 68, h: 110 },
    cap: (id) => (
      <>
        <path d={`M62 40 H138 V58 H62 Z`} fill={`url(#${id}-body)`} />
        <path d={`M62 40 ${Array.from({ length: 19 }, (_, i) => `L${64 + i * 4} ${i % 2 ? 40 : 37.5}`).join(" ")} L138 40`} fill={`url(#${id}-body)`} />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={64 + i * 4.1} y1="42" x2={64 + i * 4.1} y2="56" stroke="#000" strokeOpacity="0.09" />
        ))}
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-cap)`} />
        <g>{ridges(73, 256, 54, 28, 2.4)}</g>
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-capv)`} />
        <path d="M75 251 H125" stroke="#000" strokeOpacity="0.2" />
      </>
    ),
  },
  pump: {
    body: "M58 136 Q58 110 84 108 L116 108 Q142 110 142 136 L142 272 Q142 286 128 286 L72 286 Q58 286 58 272 Z",
    box: { x: 58, y: 108, w: 84, h: 178 },
    print: { x: 58, y: 160, w: 84, h: 90 },
    tube: true,
    fill: 132,
    cap: (id) => (
      <>
        <rect x="95.5" y="60" width="9" height="32" fill={`url(#${id}-cap)`} />
        <path d="M82 50 H126 Q132 50 132 55 V64 H78 V55 Q78 50 82 50 Z" fill={`url(#${id}-cap)`} />
        <path d="M126 53 H153 Q157 53 157 56.5 V60 H126 Z" fill={`url(#${id}-cap)`} />
        <path d="M80 51.5 H128" stroke="#fff" strokeOpacity="0.7" />
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 88, 40, 22, 2.2)}</g>
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  dropper: {
    body: "M64 170 Q64 152 86 150 L86 140 L114 140 L114 150 Q136 152 136 170 L136 272 Q136 286 122 286 L78 286 Q64 286 64 272 Z",
    box: { x: 64, y: 140, w: 72, h: 146 },
    print: { x: 64, y: 192, w: 72, h: 70, paper: true },
    fill: 168,
    cap: (id) => (
      <>
        <path d="M86 118 V86 Q86 62 100 62 Q114 62 114 86 V118 Z" fill={`url(#${id}-bulb)`} />
        <path d="M91 74 Q93 66 100 65" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 114, 40, 28, 2)}</g>
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  perfume: {
    body: "M58 166 H142 Q154 166 156 178 L158 270 Q158 286 142 286 H58 Q42 286 42 270 L44 178 Q46 166 58 166 Z",
    box: { x: 42, y: 166, w: 116, h: 120 },
    print: { x: 66, y: 204, w: 68, h: 44 },
    fill: 178,
    cap: (id) => (
      <>
        <rect x="88" y="150" width="24" height="18" fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-capv)`} />
        <path d="M72 97.5 H128" stroke="#fff" strokeOpacity="0.8" />
      </>
    ),
  },
  mist: {
    body: "M62 154 Q62 130 86 128 L114 128 Q138 130 138 154 L138 272 Q138 286 124 286 L76 286 Q62 286 62 272 Z",
    box: { x: 62, y: 128, w: 76, h: 158 },
    print: { x: 62, y: 178, w: 76, h: 78 },
    tube: true,
    fill: 168,
    cap: (id) => (
      <>
        <path d={rr(82, 110, 36, 22, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(82, 110, 36, 22, 2.2)}</g>
        <path d={rr(86, 82, 28, 30, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(86, 82, 28, 30, 6)} fill={`url(#${id}-capv)`} />
        <circle cx="111" cy="94" r="2.2" fill="#000" opacity="0.45" />
      </>
    ),
  },
  bottle: {
    body: "M62 114 Q62 86 86 82 L114 82 Q138 86 138 114 L141 268 Q141 286 122 286 L78 286 Q59 286 59 268 Z",
    box: { x: 59, y: 82, w: 82, h: 204 },
    print: { x: 59, y: 140, w: 82, h: 100, paper: true },
    fill: 110,
    cap: (id) => (
      <>
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-capv)`} />
        <path d="M80 63 H120" stroke="#000" strokeOpacity="0.45" />
        <path d="M80 51.5 H120" stroke="#fff" strokeOpacity="0.4" />
      </>
    ),
  },
  lip: {
    body: "M89 250 L85 152 Q85 144 91 143 L109 143 Q115 144 115 152 L111 250 Z",
    box: { x: 85, y: 143, w: 30, h: 107 },
    print: { x: 85, y: 166, w: 30, h: 60 },
    cap: (id) => (
      <>
        <path d={`M83 128 H117 V143 H83 Z`} fill={`url(#${id}-body)`} />
        <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-cap)`} />
        <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  stick: {
    body: rr(81, 224, 38, 62, 4),
    box: { x: 81, y: 224, w: 38, h: 62 },
    print: { x: 81, y: 236, w: 38, h: 38 },
    cap: (id) => (
      <>
        <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-cap)`} />
        <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-capv)`} />
        <rect x="81" y="222" width="38" height="2.5" fill="#000" opacity="0.3" />
      </>
    ),
  },
};

function ProductArt({ p, className }: { p: Product; className?: string }) {
  // If product has an image cutout from our site, render it standing on the shelf with contact shadow!
  if (p.image) {
    return (
      <div className={cn("relative flex items-end justify-center size-full", className)}>
        {/* Soft pedestal floor contact shadow on the shelf */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 w-[64%] h-2.5 rounded-[50%] bg-black/25 blur-[2.5px]"
        />
        <img
          src={p.image}
          alt={p.name}
          className="size-full max-h-[94%] object-contain drop-shadow-[0_12px_22px_rgba(7,55,99,0.18)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  // Vector SVG packaging fallback
  const id = "ps" + (p.id || "0").replace(/[^a-zA-Z0-9]/g, "");
  const s = SHAPES[p.kind] || SHAPES.tube;
  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden overflow="visible">
      <ellipse cx="100" cy="287" rx={s.box.w * 0.7} ry="6" fill="#00000028" />
      <path d={s.body} fill={p.color} />
      {s.cap(id)}
    </svg>
  );
}

export type ProductShelfProps = {
  products?: Product[];
  currency?: string;
  className?: string;
  showFloatingNav?: boolean;
  onAddToCart?: (product: Product, qty: number, event?: React.MouseEvent | HTMLElement | null) => void;
  children?: ReactNode;
};

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.55 };

export function ProductShelf({
  products = DEFAULT_PRODUCTS,
  currency = "₹",
  className,
  showFloatingNav = true,
  onAddToCart,
  children,
}: ProductShelfProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(0);
  const bagRef = useRef<HTMLButtonElement | null>(null);

  // Group products into 4 or 5 per shelf row so all 17 fit smoothly
  const rowSize = 4;
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += rowSize) {
    rows.push(products.slice(i, i + rowSize));
  }

  const open = products.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const addToBag = (qty: number, e?: React.MouseEvent) => {
    setBag((b) => b + qty);
    setBump((n) => n + 1);
    if (open && onAddToCart) {
      onAddToCart(open, qty, e);
    }
  };

  return (
    <div
      className={cn(
        "relative min-h-dvh w-full overflow-x-hidden bg-[#f3f1ed] font-sans text-[#111] antialiased py-12",
        className,
      )}
    >
      {/* Floating Header Badges only if standalone demo mode is active */}
      {showFloatingNav && (
        <>
          <div className="pointer-events-none fixed top-4 left-5 z-30 flex h-11 items-center text-[15px] font-semibold tracking-[0.18em] text-[#073763]">
            SPARK-DV
          </div>
          <button
            ref={bagRef}
            type="button"
            aria-label={`Bag, ${bag} ${bag === 1 ? "item" : "items"}`}
            className="fixed top-4 right-4 z-30 grid size-11 place-items-center rounded-xl bg-white/80 text-[#111111] shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] backdrop-blur-xl transition-[transform,background-color] duration-100 hover:bg-white active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-[#111111]"
          >
            <ShoppingBag className="size-[19px]" strokeWidth={1.6} />
            {bag > 0 && (
              <motion.span
                key={bump}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING}
                className="absolute -top-1.5 -right-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-[9px] bg-[#073763] px-1 text-[11px] font-semibold text-white tabular-nums"
              >
                {bag}
              </motion.span>
            )}
          </button>
        </>
      )}

      <LayoutGroup>
        <main className="mx-auto w-full max-w-[1140px] px-5 pt-8 pb-12">
          <div className="mb-10 text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#6f6a64]">
              SPARK-DV DENTAL SCIENCE CATALOGUE
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-medium tracking-tight text-[#073763]">
              All 17 Products On Display
            </h2>
            <p className="mt-2 text-sm text-[#6f6a64]">
              Click any product to inspect details, dosage protocols, and order.
            </p>
          </div>

          {rows.map((row, r) => (
            <section
              key={r}
              aria-label={`Shelf ${r + 1}`}
              className="relative mb-16"
            >
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 items-end gap-6 px-3 sm:gap-8 sm:px-8">
                {row.map((p) => (
                  <div key={p.id} className="flex flex-col items-center">
                    {openId === p.id ? (
                      <div className="aspect-[2/3] w-full max-w-[175px]" />
                    ) : (
                      <motion.button
                        layoutId={`product-${p.id}`}
                        type="button"
                        onClick={() => setOpenId(p.id)}
                        aria-label={`${p.name}, ${currency}${p.price}`}
                        transition={SPRING}
                        className="group relative aspect-[2/3] w-full max-w-[175px] cursor-pointer !bg-transparent !border-0 !border-none !shadow-none p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#073763] flex items-end justify-center"
                      >
                        <ProductArt p={p} className="size-full" />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>

              {/* Floating White Studio Shelf with soft illumination and wall shadow */}
              <div aria-hidden className="relative -mt-[6px] h-[16px]">
                <div className="absolute inset-x-0 top-0 h-[8px] bg-[linear-gradient(to_bottom,#e6e6ea,#fbfbfd)]" />
                <div className="absolute inset-x-0 top-[8px] h-[8px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_1px_0_rgba(0,0,0,0.04)]" />
                <div className="absolute inset-x-[2%] top-[16px] h-[34px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(0,0,0,0.13),transparent)]" />
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 px-3 sm:gap-8 sm:px-8">
                {row.map((p) => (
                  <div key={p.id} className="text-center">
                    <div className="text-[13px] leading-tight font-medium sm:text-[14px] text-[#073763]">
                      {p.short}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#6f6a64] tabular-nums sm:text-[13px]">
                      {currency}{p.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <AnimatePresence>
          {open && (
            <ProductPage
              key={open.id}
              p={open}
              currency={currency}
              onClose={() => setOpenId(null)}
              onAdd={addToBag}
              bagRef={bagRef}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
      {children}
    </div>
  );
}

function ProductPage({
  p,
  currency,
  onClose,
  onAdd,
  bagRef,
}: {
  p: Product;
  currency: string;
  onClose: () => void;
  onAdd: (qty: number, e?: React.MouseEvent) => void;
  bagRef: RefObject<HTMLButtonElement | null>;
}) {
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [section, setSection] = useState<string | null>("Benefits");
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  const price = p.price * (p.sizes.indexOf(size) > 0 ? 1.7 : 1);

  const add = (e: React.MouseEvent) => {
    onAdd(qty, e);
    setAdded(true);
    bagRef.current?.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.18)" },
        { transform: "scale(1)" },
      ],
      { duration: 320, easing: "ease-out" },
    );
    setTimeout(() => setAdded(false), 1800);
  };

  const sections: [string, ReactNode][] = [
    [
      "Clinical Benefits & Indications",
      <ul key="d" className="list-disc space-y-1.5 pl-5 text-[#334155]">
        {p.benefits.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>,
    ],
    [
      "Active Formulation",
      <p key="i" className="text-[#334155] leading-relaxed">
        {p.ingredients}
      </p>,
    ],
    [
      "Protocol & How To Use",
      <p key="h" className="text-[#334155] leading-relaxed">
        {p.howTo}
      </p>,
    ],
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <motion.div
        className="fixed inset-0 bg-[#f3f1ed]/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative mx-auto grid min-h-full max-w-[1080px] grid-cols-1 items-center gap-8 px-5 pt-20 pb-12 md:grid-cols-[1.05fr_1fr] md:gap-14">
        {/* Product view standing on surface */}
        <div className="relative flex flex-col items-center justify-center md:h-[calc(100dvh-7rem)]">
          <motion.div
            layoutId={`product-${p.id}`}
            transition={SPRING}
            className="relative z-10 aspect-[2/3] h-[44vh] select-none md:h-[58vh]"
          >
            {p.image ? (
              <div className="relative flex items-center justify-center size-full">
                <img
                  src={p.image}
                  alt={p.name}
                  className="size-full max-h-[92%] object-contain drop-shadow-[0_20px_35px_rgba(7,55,99,0.22)] select-none"
                />
              </div>
            ) : (
              <ProductArt p={p} className="size-full" />
            )}
          </motion.div>
          <motion.div
            aria-hidden
            className="relative -mt-[1.5%] h-[18px] w-[86%] rounded-[3px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="mt-4 flex items-center gap-2 text-xs text-[#073763] font-medium">
            <ShieldCheck size={14} /> SPARK-DV Original Dental Product
          </div>
        </div>

        {/* Product Copy & Add to Cart Controls */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-ml-1.5 mb-6 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[15px] font-medium text-[#073763] hover:underline focus-visible:outline-2 focus-visible:outline-[#073763]"
          >
            <ChevronLeft className="size-4" strokeWidth={2.2} /> Back to Shelf
          </button>
          <div className="text-[13px] font-semibold tracking-wider uppercase text-[#073763]/70">
            {p.category}
          </div>
          <h2 className="mt-1 text-[clamp(28px,3.8vw,38px)] leading-[1.1] font-semibold tracking-tight text-[#073763]">
            {p.name}
          </h2>
          <p className="mt-2 text-[17px] leading-snug text-[#4a5568]">
            {p.tagline}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[14px] text-[#6f6a64]">
            <span className="flex text-amber-500" aria-label={`Rated ${p.rating} out of 5`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="size-[14px]"
                  fill={i < Math.round(p.rating) ? "currentColor" : "transparent"}
                  strokeWidth={1.4}
                />
              ))}
            </span>
            <span className="font-semibold text-[#073763]">{p.rating.toFixed(1)}</span> · {p.reviews.toLocaleString()} clinical reviews
          </div>

          <div className="mt-5 flex items-baseline gap-2.5 tabular-nums">
            <span className="text-[26px] font-bold tracking-tight text-[#073763]">
              {currency}{Math.round(price).toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-[#334155]">
            {p.description}
          </p>

          {/* Size / Variant Selector */}
          <fieldset className="mt-6">
            <legend className="mb-2 text-[14px] font-semibold text-[#073763]">
              Package Size
            </legend>
            <div className="grid grid-cols-2 gap-2.5">
              {p.sizes.map((sz, i) => {
                const on = size === sz;
                return (
                  <label
                    key={sz}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3 text-[14px] transition-[border-color,box-shadow] duration-150",
                      on
                        ? "border-[#073763] shadow-[0_0_0_1.5px_#073763] font-medium"
                        : "border-[#d9d4cd] hover:border-[#8f8982]",
                    )}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={sz}
                      checked={on}
                      onChange={() => setSize(sz)}
                      className="sr-only"
                    />
                    <span>{sz}</span>
                    <span className="text-[#6f6a64] tabular-nums font-semibold">
                      {currency}{Math.round(p.price * (i > 0 ? 1.7 : 1)).toLocaleString("en-IN")}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Quantity and Add to Bag */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center rounded-xl border border-[#d9d4cd] bg-white">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-11 place-items-center rounded-l-xl text-[#111111] transition-colors active:bg-black/[0.06] disabled:text-[#d9d4cd]"
                disabled={qty === 1}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-[16px] font-semibold tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="grid h-full w-11 place-items-center rounded-r-xl text-[#111111] transition-colors active:bg-black/[0.06]"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={add}
              className="h-12 flex-1 rounded-xl bg-[#073763] text-[15px] font-semibold text-white transition-all duration-100 hover:bg-[#062c50] active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <span aria-live="polite">{added ? "✓ Added to Order" : "Add to Bag"}</span>
            </button>
          </div>

          <dl className="mt-5 grid gap-1 text-[13px] leading-snug text-[#64748b]">
            <div className="flex gap-2">
              <dt className="font-semibold text-[#073763]">Delivery:</dt>
              <dd>Dispatched within 24 hours across India</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-[#073763]">Clinical Supply:</dt>
              <dd>Clinic, hospital and institutional packs available</dd>
            </div>
          </dl>

          {/* Accordion Sections */}
          <div className="mt-6 border-t border-[#d9d4cd]">
            {sections.map(([title, body]) => {
              const isOpen = section === title;
              return (
                <div key={title} className="border-b border-[#d9d4cd]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSection(isOpen ? null : title)}
                    className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold text-[#073763]"
                  >
                    {title}
                    <ChevronDown
                      className={cn(
                        "size-[18px] text-[#6f6a64] transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={SPRING}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-[14px]">{body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
