import fs from 'fs';

const file = 'src/components/ui/skincare-product-shelf.tsx';
let content = fs.readFileSync(file, 'utf8');

const newProducts = `export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "nanion-elite-pro",
    slug: "nanion-elite-pro",
    kind: "tube",
    name: "Nanion Elite Pro",
    short: "Nanion Elite Pro",
    sub: "NSF + 5% nHA Dual-Matrix",
    category: "Prevention",
    image: "/images/nanion-elite-pro.svg",
    color: "#1d3e68", cap: "#c5ced6", label: "#163156", ink: "#ffffff",
    price: 699,
    sizes: ["100g", "150g (Clinic Pack)"],
    rating: 4.9,
    reviews: 1420,
    tagline: "Four-action dual-matrix caries prevention with 5% nHA.",
    description: "Four-action dual-matrix caries prevention. NSF antibacterial action, biofilm disruption, sustained fluoride release, and 5% nano-hydroxyapatite for biomimetic repair and dentinal tubule occlusion.",
    benefits: ["5% Nano-Hydroxyapatite for tubule repair", "NanoSilver Fluoride (NSF) antibacterial action", "Biofilm disruption without tissue staining"],
    ingredients: "NanoSilver Fluoride, 5% Nano-Hydroxyapatite (nHA), Potassium Nitrate, Hydrated Silica, Sorbitol, Xylitol.",
    howTo: "Brush thoroughly twice daily under adult supervision for ages 6+. Spit out, do not swallow.",
  },
  {
    id: "nanion-elite",
    slug: "nanion-elite",
    kind: "tube",
    name: "Nanion Elite Toothpaste",
    short: "Nanion Elite",
    sub: "High-Concentration NSF",
    category: "Prevention",
    image: "/images/nanion-elite.svg",
    color: "#0ea5e9", cap: "#f1f5f9", label: "#ffffff", ink: "#073763", glass: true, liquid: "#7dd3fc",
    price: 599,
    sizes: ["100g"],
    rating: 4.8,
    reviews: 640,
    tagline: "Higher-concentration NSF for high-risk caries arrest.",
    description: "Higher-concentration Nano Silver Fluoride formulation specifically developed for early childhood caries management and non-invasive lesion arrest.",
    benefits: ["Arrests active dentin lesions", "Non-staining technology", "Quick in-office or targeted application"],
    ingredients: "NanoSilver Fluoride (high concentration), Stabilized bio-matrix, Purified solvent.",
    howTo: "Apply topically with micro-applicator to dried enamel or dentin lesions, or brush as directed.",
  },
  {
    id: "nanion-lite",
    slug: "nanion-lite",
    kind: "tube",
    name: "Nanion Lite Toothpaste",
    short: "Nanion Lite",
    sub: "Triple-Action Prevention",
    category: "Prevention",
    image: "/images/nanion-lite.svg",
    color: "#254875", cap: "#b0bcc8", label: "#1e3a5f", ink: "#ffffff",
    price: 599,
    sizes: ["75g", "100g"],
    rating: 4.7,
    reviews: 820,
    tagline: "Gentle daily anti-caries protection for youngsters.",
    description: "Triple-action pediatric caries prevention with NSF technology, gentle foaming action, and bio-compatible mineral reinforcement.",
    benefits: ["Pediatric-safe formulation", "Anti-plaque and anti-caries action", "Non-abrasive polishing formula"],
    ingredients: "NanoSilver Fluoride, Precipitated Calcium Carbonate, Glycerin, Sodium Monofluorophosphate.",
    howTo: "Use a pea-sized amount twice daily under adult supervision.",
  },
  {
    id: "nanion-swish",
    slug: "nanion-swish",
    kind: "bottle",
    name: "Nanion Swish Mouthwash",
    short: "Nanion Swish",
    sub: "NSF Daily Oral Rinse",
    category: "Prevention",
    image: "/images/nanion-swish.svg",
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
    id: "nanion-pro-plus-gummies",
    slug: "nanion-pro-plus-gummies",
    kind: "bottle",
    name: "Nanion Pro Plus Gummies",
    short: "Pro Plus Gummies",
    sub: "Oral Microbiome Strawberry Gummies",
    category: "Prevention",
    image: "/images/nanion-pro-plus-gummies.svg",
    color: "#e11d48", cap: "#fff1f2", label: "#ffffff", ink: "#881337", glass: true, liquid: "#fda4af",
    price: 599,
    sizes: ["60 Gummies (Monthly Supply)"],
    rating: 4.9,
    reviews: 510,
    tagline: "4-Layer science-led pediatric oral health gummy.",
    description: "Delicious strawberry chewable gummies with 6 Billion CFU oral probiotics (S. salivarius M18), biomimetic P11-4 peptides, and xylitol to balance oral flora.",
    benefits: ["6B CFU oral probiotic strains", "P11-4 biomimetic enamel peptide matrix", "Sugar-free strawberry flavor"],
    ingredients: "Probiotic Blend (S. salivarius M18, L. reuteri), Xylitol, P11-4 Biomimetic Peptide, Pectin, Natural Strawberry Extract.",
    howTo: "Chew one gummy slowly after evening brushing.",
  },
];`;

const startMarker = 'export const DEFAULT_PRODUCTS: Product[] = [';
const endMarker = 'export type ProductShelfProps = {';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newProducts + '\n\n' + content.slice(endIdx);
  // Also update heading "All 17 Products On Display" to "Breakthrough Products On Display"
  content = content.replace('All 17 Products On Display', 'All 5 Breakthrough Products On Display');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated DEFAULT_PRODUCTS in skincare-product-shelf.tsx');
} else {
  console.error('Could not find markers:', { startIdx, endIdx });
  process.exit(1);
}

