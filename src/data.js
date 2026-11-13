export const products = [
  {
    slug: "nanion-lite",
    family: "Nanion",
    name: "Nanion Lite",
    category: "Prevention",
    eyebrow: "NSF toothpaste",
    img: "nanion-lite.svg",
    desc: "Nano Silver Fluoride toothpaste with triple-action technology — antibacterial, biofilm disruption, and sustained remineralization.",
    tags: ["2% NSF", "Moderate risk", "Daily home use"],
    price: 599,
    launch: true,
    features: [
      "NanoSilver Fluoride",
      "Chitosan + fluoride",
      "Non-staining formulation",
      "Up to 12hr F⁻ release",
    ],
    variant: "2% NSF — Moderate Risk",
    familySlug: "nanion-lite",
  },
  {
    slug: "nanion-elite",
    family: "Nanion",
    name: "Nanion Elite",
    category: "Prevention",
    eyebrow: "NSF toothpaste",
    img: "nanion-elite.svg",
    desc: "Higher-concentration Nano Silver Fluoride toothpaste for high-risk caries management and early childhood caries.",
    tags: ["3% NSF", "High risk / ECC", "Use under dentist guidance"],
    price: 599,
    launch: true,
    features: [
      "NanoSilver Fluoride",
      "Chitosan + fluoride",
      "Non-staining formulation",
      "Up to 12hr F⁻ release",
    ],
    variant: "3% NSF — High Risk / ECC",
    familySlug: "nanion-lite",
  },
  {
    slug: "nanion-elite-pro",
    family: "Nanion Pro",
    name: "Nanion Elite Pro",
    category: "Prevention",
    eyebrow: "NSF + 5% nHA dual-matrix",
    img: "nanion-elite-pro.svg",
    desc: "Four-action dual-matrix combining NSF with 5% nano-hydroxyapatite for high-risk caries management and enamel remineralization.",
    tags: ["3% NSF + 5% nHA", "High risk / ECC"],
    price: 699,
    features: [
      "NanoSilver Fluoride",
      "5% nano-hydroxyapatite",
      "Dual-matrix technology",
      "Tubule occlusion",
    ],
    variant: "3% NSF + 5% nHA — High Risk / ECC",
    familySlug: "nanion-pro",
  },
  {
    slug: "nanion-swish",
    name: "Nanion Swish",
    category: "Prevention",
    eyebrow: "NSF mouthrinse",
    img: "nanion-swish.svg",
    desc: "Adjunct for plaque and biofilm control. NanoSilver Fluoride + nano-hydroxyapatite mouthwash. Alcohol-free, gentle, family-friendly.",
    tags: ["Alcohol-free", "60-second rinse", "1% NSF + 1% nHA"],
    price: 599,
    features: [
      "1% NanoSilver Fluoride",
      "1% nano-hydroxyapatite",
      "Alcohol-free",
      "60-second rinse",
    ],
  },
  {
    slug: "nanion-pro-plus-gummies",
    name: "Nanion Pro Plus Gummies",
    category: "Prevention",
    eyebrow: "Oral health gummies",
    img: "nanion-pro-plus-gummies.svg",
    desc: "A 4-layer science-led oral health gummy: probiotics (6B CFU), prebiotics (xylitol + FOS), P114 oligopeptide for enamel repair, and L-arginine for pH balance. Strawberry flavour.",
    tags: ["6B CFU probiotics", "Xylitol + FOS", "P114 peptide"],
    price: 599,
    features: [
      "6B CFU probiotics",
      "Xylitol + FOS prebiotics",
      "P114 enamel repair",
      "L-arginine pH balance",
    ],
  },
];

export const categories = [
  "All products",
  "Prevention",
];

export const img = (file) => `/images/${file}`;

export const money = (value) =>
  value == null
    ? "Request pricing"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);
