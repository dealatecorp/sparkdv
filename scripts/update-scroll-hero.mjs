import fs from 'fs';

const file = 'src/components/ui/scroll-product-hero.tsx';
let content = fs.readFileSync(file, 'utf8');

const newSlides = `export const ALL_HERO_SLIDES: HeroSlide[] = [
  {
    id: "nanion-elite-pro",
    slug: "nanion-elite-pro",
    name: "Nanion Elite Pro",
    category: "Prevention",
    textLeft: "NANION",
    textRight: "ELITE PRO",
    price: 699,
    image: "/images/nanion-elite-pro.svg",
    alt: "Nanion Elite Pro Mint Toothpaste",
    bgGradient: "radial-gradient(ellipse 80% 65% at 50% 46%, #7ea291 0%, #688b7a 42%, #537363 100%)",
    textColor: "rgba(20, 52, 38, 0.28)",
    imgClass: "hero-img-tube",
  },
  {
    id: "nanion-elite",
    slug: "nanion-elite",
    name: "Nanion Elite Toothpaste",
    category: "Prevention",
    textLeft: "NANION",
    textRight: "ELITE",
    price: 599,
    image: "/images/nanion-elite.svg",
    alt: "Nanion Elite Toothpaste Packaging",
    bgGradient: "radial-gradient(ellipse 80% 65% at 50% 46%, #6e849e 0%, #546a84 42%, #3a4f69 100%)",
    textColor: "rgba(18, 32, 55, 0.28)",
    imgClass: "hero-img-tube",
  },
  {
    id: "nanion-lite",
    slug: "nanion-lite",
    name: "Nanion Lite Toothpaste",
    category: "Prevention",
    textLeft: "NANION",
    textRight: "LITE",
    price: 599,
    image: "/images/nanion-lite.svg",
    alt: "Nanion Lite Toothpaste Packaging",
    bgGradient: "radial-gradient(ellipse 80% 65% at 50% 46%, #779aa2 0%, #5d818a 42%, #446770 100%)",
    textColor: "rgba(18, 48, 56, 0.28)",
    imgClass: "hero-img-tube",
  },
  {
    id: "nanion-swish",
    slug: "nanion-swish",
    name: "Nanion Swish Mouthwash",
    category: "Prevention",
    textLeft: "NANION",
    textRight: "SWISH",
    price: 599,
    image: "/images/nanion-swish.svg",
    alt: "Nanion Swish Mouthwash Bottle",
    bgGradient: "radial-gradient(ellipse 80% 65% at 50% 46%, #c9a68b 0%, #ae8c6f 42%, #927055 100%)",
    textColor: "rgba(75, 42, 22, 0.28)",
    imgClass: "hero-img-bottle",
  },
  {
    id: "nanion-pro-plus-gummies",
    slug: "nanion-pro-plus-gummies",
    name: "Nanion Pro Plus Gummies",
    category: "Prevention",
    textLeft: "NANION",
    textRight: "PRO PLUS",
    price: 599,
    image: "/images/nanion-pro-plus-gummies.svg",
    alt: "NANION Pro PLUS Strawberry Gummies",
    bgGradient: "radial-gradient(ellipse 80% 65% at 50% 46%, #ba7772 0%, #a15d58 42%, #84423d 100%)",
    textColor: "rgba(68, 22, 18, 0.28)",
    imgClass: "hero-img-bottle",
  },
];`;

const startIdx = content.indexOf('export const ALL_HERO_SLIDES: HeroSlide[] = [');
const endMarker = 'export default function ScrollProductHero';
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newSlides + '\n\n' + content.slice(endIdx);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated ALL_HERO_SLIDES in scroll-product-hero.tsx');
} else {
  console.error('Markers not found!');
  process.exit(1);
}

