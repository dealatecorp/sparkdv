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
];

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
              All 5 Breakthrough Products On Display
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
