import fs from 'fs';

const file = 'src/components/home/HomeHypeSections.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add nanion-lite to flagships
const oldFlagshipsMarker = 'const flagships = [';
const newFlagships = `const flagships = [
    {
      slug: "nanion-elite-pro",
      name: "Nanion Elite Pro",
      category: "Prevention",
      badge: "Flagship Dual-Matrix",
      price: 699,
      image: "/images/nanion-elite-pro.svg",
      desc: "Four-action dual-matrix with 3% NSF + 5% nano-hydroxyapatite for active tubule occlusion and rapid enamel remineralization.",
      tag: "3% NSF + 5% nHA",
    },
    {
      slug: "nanion-elite",
      name: "Nanion Elite Toothpaste",
      category: "Prevention",
      badge: "High-Concentration",
      price: 599,
      image: "/images/nanion-elite.svg",
      desc: "Higher-concentration 3% NSF formulation specifically developed for early childhood caries management and non-invasive lesion arrest.",
      tag: "Arrests Lesions in 60s",
    },
    {
      slug: "nanion-lite",
      name: "Nanion Lite Toothpaste",
      category: "Prevention",
      badge: "Gentle Mineral Care",
      price: 599,
      image: "/images/nanion-lite.svg",
      desc: "Gentle daily anti-caries protection with stabilized NanoSilver Fluoride and biocompatible mineral reinforcement for youngsters.",
      tag: "Pediatric Daily Protection",
    },
    {
      slug: "nanion-swish",
      name: "Nanion Swish Mouthwash",
      category: "Prevention",
      badge: "Targeted Rinse",
      price: 599,
      image: "/images/nanion-swish.svg",
      desc: "Alcohol-free colloidal NanoSilver Fluoride mouthrinse engineered for sustained 12-hour biofilm inhibition on hard-to-reach surfaces.",
      tag: "Alcohol-Free 225 ppm F-",
    },
    {
      slug: "nanion-pro-plus-gummies",
      name: "Nanion Pro Plus Gummies",
      category: "Prevention",
      badge: "Oral-Gut Axis Gummy",
      price: 599,
      image: "/images/nanion-pro-plus-gummies.svg",
      desc: "4-layer science-led oral health gummy featuring 6B CFU probiotics, xylitol, biomimetic P11-4 peptide, and L-arginine buffer.",
      tag: "Probiotic + Peptide",
    },
  ];`;

const flagshipsEndMarker = 'return (\n    <section className="py-20 md:py-28 bg-white border-b border-[#073763]/10">';
const flagStart = content.indexOf(oldFlagshipsMarker);
const flagEnd = content.indexOf(flagshipsEndMarker);

if (flagStart !== -1 && flagEnd !== -1) {
  content = content.slice(0, flagStart) + newFlagships + '\n\n  ' + content.slice(flagEnd);
  console.log('Updated flagships list in HomeHypeSections.tsx');
}

// 2. Replace CLINICAL_ROW_1 and CLINICAL_ROW_2
const oldRowsMarker = 'const CLINICAL_ROW_1: TestimonialItem[] = [';
const newRows = `const CLINICAL_ROW_1: TestimonialItem[] = [
  {
    id: "rev-1",
    name: "Prof. Dr. Meenakshi S.",
    handle: "HOD Pediatric Dentistry · GDC Chennai",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=160&q=80",
    content: "Nanion Elite has solved our biggest pediatric challenge: arresting deep dentin caries without the traumatizing black tooth staining caused by older SDF. Children love it, and parents are relieved.",
    highlights: ["Nanion Elite", "arresting deep dentin caries", "without the traumatizing black tooth staining"],
  },
  {
    id: "rev-2",
    name: "Dr. K. Venkateshwara Rao",
    handle: "Chief Pediatric Dentist · Smiles First",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=160&q=80",
    content: "Nanion Lite Toothpaste is our primary recommendation for mixed dentition pediatric patients. Gentle, non-abrasive, yet delivers remarkable tubule mineral reinforcement without fluorosis risk.",
    highlights: ["Nanion Lite Toothpaste", "remarkable tubule mineral reinforcement"],
  },
  {
    id: "rev-3",
    name: "Dr. Priya Deshmukh",
    handle: "Senior Dental Surgeon · Allied Healthcare",
    avatar: "https://images.unsplash.com/photo-1594824813511-c6f3767e2390?auto=format&fit=crop&w=160&q=80",
    content: "Nanion Swish is the only antimicrobial mouthwash our clinic prescribes for children with fixed orthodontic appliances. Non-burning, zero alcohol, with sustained fluoride release.",
    highlights: ["Nanion Swish", "zero alcohol", "sustained fluoride release"],
  },
  {
    id: "rev-4",
    name: "Dr. Rajeshwar G.",
    handle: "Director of Clinical Research · Biomaterials Mumbai",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=160&q=80",
    content: "SPARK-DV has demonstrated that homegrown Indian dental research can surpass international benchmarks. Their dual-matrix nano-hydroxyapatite is second to none.",
    highlights: ["SPARK-DV", "dual-matrix nano-hydroxyapatite"],
  },
];

const CLINICAL_ROW_2: TestimonialItem[] = [
  {
    id: "rev-5",
    name: "Dr. Sunita Nair",
    handle: "Pediatric Consultant · Kerala Smiles",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    content: "Nanion Pro Plus Gummies have revolutionized pediatric compliance. Children look forward to taking them, and the oral probiotic combined with biomimetic peptide buffers intraoral pH and reduces acidogenic biofilm.",
    highlights: ["Nanion Pro Plus Gummies", "buffers intraoral pH and reduces acidogenic biofilm"],
  },
  {
    id: "rev-6",
    name: "Dr. Anirudh Sen",
    handle: "Associate Professor · Public Health Pedodontics",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=160&q=80",
    content: "Nanion Elite Pro is our frontline protocol in clinical caries prevention. A single application halts active demineralization and protects erupting first permanent molars.",
    highlights: ["Nanion Elite Pro", "halts active demineralization"],
  },
  {
    id: "rev-7",
    name: "Dr. Kavitha Balaji",
    handle: "Preventive Dentist · ChildCare Dental Bangalore",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=160&q=80",
    content: "Parents constantly thank us for Nanion Lite. It tastes great for toddlers, contains zero SLS, and repairs white spot lesions in just three weeks of daily brushing.",
    highlights: ["Nanion Lite", "repairs white spot lesions"],
  },
  {
    id: "rev-8",
    name: "Dr. R. Arvind Kumar",
    handle: "Pediatric Fellow · National Dental Forum",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    content: "The non-staining NanoSilver Fluoride formula across the Nanion line has given us the clinical power of silver diamine without the black discoloration parents dread.",
    highlights: ["non-staining NanoSilver Fluoride", "without the black discoloration"],
  },
];`;

const rowsStart = content.indexOf(oldRowsMarker);
if (rowsStart !== -1) {
  content = content.slice(0, rowsStart) + newRows + '\n';
  console.log('Updated CLINICAL_ROW_1 and 2 in HomeHypeSections.tsx');
}

fs.writeFileSync(file, content, 'utf8');

