"use client";

import { brandText } from '@/components/ui/brand-wordmark';

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { enquiryEmail, whatsappDraft } from "@/lib/enquiry";
import {
  ArrowRight,
  Mail,
  Phone,
  Headphones,
  MapPin,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  Clock,
  Building2,
  Stethoscope,
  Truck,
  GraduationCap,
  HeartHandshake,
  ChevronDown,
  Send,
  ShieldCheck,
  Award,
  Zap,
  ExternalLink,
} from "lucide-react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { geoOrthographic, geoPath, geoBounds, geoDistance, easeCubicInOut } from "d3";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, Geometry, MultiPolygon } from "geojson";
import { states } from "@/contact-states.json";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const CONTACT_CITIES = [
  { name: "Guntur (HQ)", state: "Andhra Pradesh", stateCode: "IN-AP", coordinates: [80.4365, 16.3067] },
  { name: "Hyderabad", state: "Telangana", stateCode: "IN-TG", coordinates: [78.4867, 17.385] },
  { name: "Chennai", state: "Tamil Nadu", stateCode: "IN-TN", coordinates: [80.2707, 13.0827] },
] satisfies { name: string; state: string; stateCode: keyof typeof states; coordinates: [number, number] }[];

type ContactCity = (typeof CONTACT_CITIES)[number];

const globeScale = 184;
type GlobeView = { rotation: [number, number]; scale: number };

function getGlobeView(city: ContactCity, zoomed: boolean): GlobeView {
  if (!zoomed) return { rotation: [-city.coordinates[0], -city.coordinates[1]], scale: globeScale };

  const state = states[city.stateCode] as MultiPolygon;
  const [[west, south], [east, north]] = geoBounds(state);
  const rotation: [number, number] = [-(west + east) / 2, -(south + north) / 2];
  const projection = geoOrthographic().scale(1).translate([0, 0]).rotate(rotation);
  const [[left, top], [right, bottom]] = geoPath(projection).bounds(state);
  const radius = Math.max(-left, -top, right, bottom);
  return { rotation, scale: 140 / radius };
}

function GlobeWireframe({ city, zoomed }: { city: ContactCity; zoomed: boolean }) {
  const reduce = useReducedMotion();
  const [countries, setCountries] = useState<Feature<Geometry>[]>([]);
  const [view, setView] = useState(() => getGlobeView(city, zoomed));
  const viewRef = useRef(view);
  const frame = useRef(0);
  const drag = useRef<{ x: number; y: number; width: number } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/assets/maps/countries-110m.json", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load globe boundaries.");
        const atlas: Topology<{ countries: GeometryCollection }> = await response.json();
        setCountries(feature(atlas, atlas.objects.countries).features);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.warn("Could not load globe boundaries.", error);
      });
    return () => controller.abort();
  }, []);

  function updateView(next: GlobeView) {
    viewRef.current = next;
    setView(next);
  }

  useEffect(() => {
    const target = getGlobeView(city, zoomed);
    const { rotation: [lon, lat], scale } = viewRef.current;
    const [targetLon, targetLat] = target.rotation;
    const deltaLon = ((targetLon - lon) % 360 + 540) % 360 - 180;
    if (reduce || (deltaLon === 0 && lat === targetLat && scale === target.scale)) {
      updateView(target);
      return;
    }

    const start = performance.now();
    function animate(now: number) {
      const fraction = Math.min((now - start) / 500, 1);
      const progress = easeCubicInOut(fraction);
      updateView(fraction === 1 ? target : {
        rotation: [lon + deltaLon * progress, lat + (targetLat - lat) * progress],
        scale: scale * (target.scale / scale) ** progress,
      });
      if (fraction < 1) frame.current = requestAnimationFrame(animate);
    }
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [city, zoomed, reduce]);

  const { rotation, scale } = view;
  const projection = geoOrthographic()
    .scale(scale)
    .translate([200, 200])
    .rotate(rotation)
    .clipExtent([[0, 0], [400, 400]]);
  const path = geoPath(projection);
  const state = states[city.stateCode] as MultiPolygon;
  const isCityVisible = geoDistance([-rotation[0], -rotation[1]], city.coordinates) <= Math.PI / 2;
  const pin = isCityVisible ? projection(city.coordinates) : null;

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={`${city.name}, ${city.state}, India on the globe`}
      className="mx-auto block aspect-square w-full max-w-[26rem] cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        cancelAnimationFrame(frame.current);
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { x: event.clientX, y: event.clientY, width: event.currentTarget.clientWidth };
      }}
      onPointerMove={(event) => {
        if (!event.isPrimary || !drag.current) return;
        const { x, y, width } = drag.current;
        const { rotation: [lon, lat], scale: dragScale } = viewRef.current;
        const sensitivity = (180 / width) * (globeScale / dragScale);
        updateView({
          rotation: [
            lon + (event.clientX - x) * sensitivity,
            Math.max(-90, Math.min(90, lat - (event.clientY - y) * sensitivity)),
          ],
          scale: dragScale,
        });
        drag.current = { x: event.clientX, y: event.clientY, width };
      }}
      onLostPointerCapture={() => { drag.current = null; }}
    >
      <circle cx="200" cy="200" r={scale} fill="#fff" stroke="#073763" strokeWidth="1.2" />
      <g fill="none" stroke="#073763" strokeWidth="0.7">
        {countries.map((country) => <path key={country.id ?? country.properties?.name} d={path(country) ?? undefined} />)}
      </g>
      <path data-state={city.stateCode} d={path(state) ?? undefined} fill="#ffbc7c" stroke="#b74304" strokeWidth="0.8" />
      {pin && (
        <g transform={`translate(${pin[0]}, ${pin[1]})`} fill="#073763">
          <circle r="6" opacity="0.24" />
          <circle r="2.5" stroke="#fff" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  );
}

const FormDots = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 flex items-center justify-center overflow-hidden",
          isHorizontal ? "w-full" : "h-full",
          className,
        )}
        {...props}
      >
        <div
          className={cn("relative", isHorizontal ? "w-full h-4" : "h-full w-4")}
        >
          <div
            className={cn(
              "absolute inset-0 bg-repeat",
              "text-neutral-400 dark:text-white/20",
            )}
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
              backgroundSize: isHorizontal ? "6px 100%" : "100% 6px",
              maskImage: isHorizontal
                ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
                : "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          />
        </div>
      </SeparatorPrimitive.Root>
    );
  },
);
FormDots.displayName = "FormDots";

export interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  search?: string;
}

const ENQUIRY_DEPARTMENTS = new Map([
  ["Distributor enquiry", "distribution"],
  ["Clinical enquiry", "clinical"],
  ["Sample request", "clinical"],
  ["Professional pricing", "clinical"],
  ["Demo request", "clinical"],
  ["School program", "institutional"],
  ["General contact", "clinical"],
  ["Whitepaper request", "clinical"],
]);

const DEPARTMENTS = [
  {
    id: "clinical",
    label: "Dental Practice",
    icon: Stethoscope,
    badge: "Chairside Protocols & Kits",
    subject: "Clinical & Chairside Enquiry",
    description: "Pediatric dentists, clinical consultants, and private practices requesting sample kits or formulation guidance.",
    chips: [
      "Request Clinic Sample Kit",
      "Chairside Non-Staining NSF IFU",
      "Pediatric Enamel Sensitivity Protocol",
      "Doctor Professional Discounts",
    ],
  },
  {
    id: "institutional",
    label: "Colleges & Hospitals",
    icon: Building2,
    badge: "Bulk & Institutional Supply",
    subject: "Hospital / Dental College Enquiry",
    description: "Government dental hospitals, universities, research labs, and multi-chair healthcare chains.",
    chips: [
      "Hospital Bulk Price Quotation",
      "Department Research Collaboration",
      "Hands-on Workshop Request",
      "Tender / Institutional Supply",
    ],
  },
  {
    id: "distribution",
    label: "Distribution Partners",
    icon: Truck,
    badge: "State & Regional Territories",
    subject: "Distribution & Stockist Enquiry",
    description: "Dental product distributors, state stockists, and international dental supply channels.",
    chips: [
      "State Territory Availability",
      "Stockist Margin & Terms",
      "Product Catalog & Marketing Material",
      "International Import / Export",
    ],
  },
  {
    id: "support",
    label: "Parents & Patients",
    icon: HeartHandshake,
    badge: "Everyday Oral Care",
    subject: "Parent & Patient Product Support",
    description: "Parents seeking advice on Nanion Lite/Elite usage, safe swallow guidance, or retail availability.",
    chips: [
      "Where to Buy Near Me",
      "Child Under 6 Usage Guidelines",
      "Toothpaste Swallowing Safety",
      "White Spot Lesion Consultation",
    ],
  },
];

const CONTACT_FAQS = [
  {
    q: "How quickly do you dispatch clinical sample kits to dental practices?",
    a: "All verified clinical kit requests are processed within 24 hours. Delivery across major Indian metropolitan areas typically takes 2–3 business days via our expedited express courier partners.",
  },
  {
    q: "Are SPARK-DV Nanion products certified non-staining?",
    a: "Yes. Unlike conventional Silver Diamine Fluoride (SDF) which leaves permanent black stains on arrested carious lesions, SPARK-DV NanoSilver Fluoride (NSF) stabilizes silver nanoparticles within a protective capping matrix, preventing oxidation and unsightly tooth discoloration.",
  },
  {
    q: "Can universities or dental colleges conduct collaborative clinical trials?",
    a: "Absolutely. Dr. Ajay Reddy Mareddy and the SPARK-DV R&D team actively partner with government and private dental colleges for in-vitro evaluation, biofilm assays, and randomized pediatric clinical trials.",
  },
  {
    q: "What is the minimum order quantity (MOQ) for distributors?",
    a: "We offer flexible starter tiers for district stockists and exclusive territorial quotas for state master distributors. Reach out via the distributor channel to receive our comprehensive commercial agreement and margin matrix.",
  },
  {
    q: "How can parents confirm if their child needs Nanion Lite vs Nanion Elite?",
    a: "Nanion Lite (2% NSF) is ideal for moderate caries risk and daily preventive home care for children ages 6+. Nanion Elite (3% NSF) is recommended under dentist supervision for children with active early childhood caries (ECC) or high demineralization risk.",
  },
];

export default function ContactWithGlobe({
  title = "Let’s Build the Future of Dental Biomaterials",
  subtitle = "Direct Clinical & Institutional Access",
  description = "Connect directly with SPARK-DV researchers, clinical application specialists, and distribution directors. We respond to verified practitioners within 15 minutes.",
  className,
  search = "",
}: ContactWithGlobeProps) {
  const params = new URLSearchParams(search);
  const enquiryType = params.get("type") ?? "";
  const requestedDept = ENQUIRY_DEPARTMENTS.get(enquiryType);
  const [activeDept, setActiveDept] = useState(requestedDept ?? "clinical");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(() => {
    const product = params.get("product")?.trim();
    const resource = params.get("resource")?.trim();
    return [requestedDept && `Enquiry: ${enquiryType}`, product && `Product: ${product}`, resource && `Resource: ${resource}`]
      .filter(Boolean)
      .join("\n");
  });
  const [draft, setDraft] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [{ city: selectedCity, zoomed }, setGlobeSelection] = useState({ city: CONTACT_CITIES[0], zoomed: false });
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const curDept = DEPARTMENTS.find((d) => d.id === activeDept) || DEPARTMENTS[0];

  const handleCopy = async (text: string, key: string) => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      setCopiedKey(null);
      setCopyError(true);
    }
  };

  const handleChipClick = (chipText: string) => {
    const line = `• ${chipText}`;
    setMessage((prev) => {
      const lines = prev.split("\n");
      return lines.includes(line) ? lines.filter((entry) => entry !== line).join("\n") : [prev, line].filter(Boolean).join("\n");
    });
    setDraft("");
    messageRef.current?.focus();
    requestAnimationFrame(() => {
      const field = messageRef.current;
      if (field) field.setSelectionRange(field.value.length, field.value.length);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDraft(enquiryEmail(requestedDept === activeDept ? enquiryType : curDept.subject, [
      ["Department", curDept.label], ["Name", name], ["Clinic / Organization", clinic],
      ["Email", email], ["Phone / WhatsApp", phone], ["Detailed requirements", message],
    ]));
  };

  return (
    <section
      className={cn(
        "relative w-full bg-[#fbf9f5] text-[#073763] overflow-hidden py-16 md:py-24 min-h-[90vh]",
        className
      )}
    >
      {/* Background Ambient Illumination Mesh */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[460px] w-[700px] rounded-full bg-cyan-100/35 blur-[140px] -translate-y-40" />
        <div className="h-[380px] w-[500px] rounded-full bg-blue-100/30 blur-[130px] translate-y-60 translate-x-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#073763]/5 border border-[#073763]/15 shadow-2xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs md:text-sm text-[#073763] font-bold tracking-wide uppercase">
              {subtitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#073763] max-w-4xl leading-[1.12]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="text-base md:text-lg text-[#526174] max-w-2xl leading-relaxed"
          >
            {brandText(description)}
          </motion.p>

          {/* 4 Animated Trust SLA Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
            className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-[#073763] border border-[#073763]/12 shadow-xs">
              <Zap className="size-3.5 text-amber-500" />
              &lt; 15 Min WhatsApp Reply
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-[#073763] border border-[#073763]/12 shadow-xs">
              <Clock className="size-3.5 text-blue-600" />
              24-Hour Dispatch Across India
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-[#073763] border border-[#073763]/12 shadow-xs">
              <Sparkles className="size-3.5 text-cyan-600" />
              Direct Founder &amp; R&amp;D Access
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-[#073763] border border-[#073763]/12 shadow-xs">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              100% Non-Staining NSF Guarantee
            </div>
          </motion.div>
        </div>

        {/* 4-Way Department Selector Tabs */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Select Department to Connect:
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {curDept.badge}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-white rounded-2xl border border-[#073763]/15 shadow-sm">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isSelected = dept.id === activeDept;
              return (
                <button
                  key={dept.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => { setActiveDept(dept.id); setDraft(""); }}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-left",
                    isSelected
                      ? "bg-[#073763] text-white shadow-sm"
                      : "text-[#526174] hover:text-[#073763] hover:bg-[#073763]/5"
                  )}
                  style={isSelected ? { backgroundColor: "#073763", color: "#ffffff" } : {}}
                >
                  <Icon className={cn("size-4 shrink-0", isSelected ? "text-white" : "text-[#073763]")} />
                  <span className="truncate">{dept.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid: Left Column Info + Right Column Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* LEFT COLUMN: Direct Channels & Interactive Globe (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Priority Direct WhatsApp Desk Card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 to-white p-6 shadow-sm hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Instant WhatsApp Desk
                </div>
                <span className="text-xs font-semibold text-slate-500">Fastest</span>
              </div>
              <h3 className="text-lg font-bold text-[#073763]">
                Chairside Consultation &amp; Urgent Orders
              </h3>
              <p className="text-xs sm:text-sm text-[#526174] mt-1.5 leading-relaxed">
                Connect directly with our clinical representatives on WhatsApp for immediate protocol clarification or dispatch tracking.
              </p>
              <a
                href={whatsappDraft("Hello SPARK-DV, I would like to enquire about your clinical products.")}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-5 shadow-sm transition-all active:scale-[0.98]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                <span>Chat on WhatsApp (+91 79815 46939)</span>
              </a>
            </div>

            {/* Direct Contact Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {/* Card 1: Phone */}
              <div className="rounded-2xl border border-[#073763]/12 bg-white p-4 shadow-2xs flex items-center justify-between gap-3 group hover:border-[#073763]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#073763]/5 text-[#073763] flex items-center justify-center shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Direct Hotline
                    </span>
                    <a
                      href="tel:+917981546939"
                      className="text-sm font-bold text-[#073763] hover:underline"
                    >
                      +91 79815 46939
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+917981546939", "phone")}
                  aria-label="Copy phone number"
                  className="size-8 rounded-lg border border-slate-200 hover:border-[#073763] flex items-center justify-center text-slate-500 hover:text-[#073763] transition-colors cursor-pointer"
                >
                  {copiedKey === "phone" ? (
                    <Check className="size-4 text-emerald-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>

              {/* Card 2: Support Phone */}
              <div className="rounded-2xl border border-[#073763]/12 bg-white p-4 shadow-2xs flex items-center justify-between gap-3 group hover:border-[#073763]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#073763]/5 text-[#073763] flex items-center justify-center shrink-0">
                    <Headphones className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Institutional Support
                    </span>
                    <a
                      href="tel:+919154741994"
                      className="text-sm font-bold text-[#073763] hover:underline"
                    >
                      +91 91547 41994
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+919154741994", "support")}
                  aria-label="Copy support phone number"
                  className="size-8 rounded-lg border border-slate-200 hover:border-[#073763] flex items-center justify-center text-slate-500 hover:text-[#073763] transition-colors cursor-pointer"
                >
                  {copiedKey === "support" ? (
                    <Check className="size-4 text-emerald-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>

              {/* Card 3: Email */}
              <div className="rounded-2xl border border-[#073763]/12 bg-white p-4 shadow-2xs flex items-center justify-between gap-3 group hover:border-[#073763]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#073763]/5 text-[#073763] flex items-center justify-center shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Email Clinical Desk
                    </span>
                    <a
                      href="mailto:sparkdv310@gmail.com"
                      className="text-sm font-bold text-[#073763] hover:underline"
                    >
                      sparkdv310@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("sparkdv310@gmail.com", "email")}
                  aria-label="Copy email address"
                  className="size-8 rounded-lg border border-slate-200 hover:border-[#073763] flex items-center justify-center text-slate-500 hover:text-[#073763] transition-colors cursor-pointer"
                >
                  {copiedKey === "email" ? (
                    <Check className="size-4 text-emerald-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>

              {/* Card 4: Location */}
              <div className="rounded-2xl border border-[#073763]/12 bg-white p-4 shadow-2xs flex items-center justify-between gap-3 group hover:border-[#073763]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#073763]/5 text-[#073763] flex items-center justify-center shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Locations
                    </span>
                    <span className="text-sm font-bold text-[#073763]">
                      {CONTACT_CITIES.map((city) => city.name).join(" · ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p role="status" className={copyError ? "m-0 text-sm text-muted-foreground" : "sr-only"}>
              {copyError ? "Couldn’t copy. You can select the contact details directly." : copiedKey ? "Copied to clipboard." : ""}
            </p>

            {/* Light Interactive Rotating Globe with City Selectors */}
            <div className="relative overflow-hidden rounded-2xl border border-[#073763]/15 bg-white p-4 shadow-[0_8px_30px_rgba(7,55,99,0.06)] flex flex-col gap-3">
              <div className="flex items-center justify-between z-10 relative">
                <span className="text-xs font-bold uppercase tracking-wider text-[#073763] inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-cyan-500 animate-ping" />
                  Our Locations
                </span>
                <button
                  type="button"
                  onClick={() => setGlobeSelection({ city: { ...selectedCity }, zoomed: false })}
                  className="rounded-lg px-2 py-1 text-[11px] font-semibold text-[#073763] hover:bg-slate-100 disabled:text-slate-500 disabled:hover:bg-transparent"
                  disabled={!zoomed}
                >
                  Show full globe
                </button>
              </div>

              <div className="overflow-hidden rounded-xl bg-slate-50/50">
                <GlobeWireframe city={selectedCity} zoomed={zoomed} />
              </div>

              <p role="status" className="m-0 flex items-center gap-1.5 text-xs font-semibold text-[#073763]">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                {selectedCity.name}, {selectedCity.state}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {CONTACT_CITIES.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    aria-pressed={selectedCity.name === city.name}
                    onClick={() => setGlobeSelection({ city: { ...city }, zoomed: true })}
                    className={cn(
                      "min-h-10 text-xs font-bold px-2.5 rounded-lg border transition-all cursor-pointer",
                      selectedCity.name === city.name
                        ? "bg-[#073763] text-white border-[#073763]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#073763]"
                    )}
                    style={selectedCity.name === city.name ? { backgroundColor: "#073763", color: "#ffffff" } : {}}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Elevated Interactive Form (7 cols) */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="lg:col-span-7 rounded-3xl border border-[#073763]/15 bg-white p-6 sm:p-10 shadow-[0_16px_50px_rgba(7,55,99,0.08)] flex flex-col gap-6"
          >
              <form onSubmit={handleSubmit} onChange={() => setDraft("")} className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#073763]">
                      Send an Enquiry
                    </h2>
                    <span className="text-xs font-bold text-[#073763] bg-[#073763]/5 px-3 py-1 rounded-full border border-[#073763]/12">
                      {curDept.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#526174] mt-1.5 leading-relaxed">
                    {curDept.description}
                  </p>
                </div>

                {/* Quick Suggestion Chips */}
                <div className="flex flex-col gap-2">
                  <p id="contact-topic-hint" className="m-0 text-sm font-semibold text-muted-foreground">
                    Choose a topic to add it to your message.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {curDept.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        aria-pressed={message.split("\n").includes(`• ${chip}`)}
                        onClick={() => handleChipClick(chip)}
                        className="min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm font-semibold text-primary aria-pressed:border-primary aria-pressed:bg-secondary hover:border-primary hover:bg-primary hover:text-primary-foreground aria-pressed:hover:bg-primary"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <FormDots className="text-[#073763]/25" />

                {/* Name & Clinic Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      autoComplete="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Rajesh Kumar"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-primary placeholder:text-muted-foreground shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-organization" className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Clinic / Organization
                    </label>
                    <input
                      id="contact-organization"
                      autoComplete="organization"
                      type="text"
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                      placeholder="SmileCare Pediatric Dental Clinic"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-primary placeholder:text-muted-foreground shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      autoComplete="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@example.com"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-primary placeholder:text-muted-foreground shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      autoComplete="tel"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98480 14443"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-primary placeholder:text-muted-foreground shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contact-message" className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Detailed Requirements *
                    </label>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {message.length} characters
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    ref={messageRef}
                    aria-describedby="contact-topic-hint"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your practice, sample request, or partnership requirements..."
                    rows={4}
                    className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-primary placeholder:text-muted-foreground shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 resize-none transition-all duration-200"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="min-h-12 px-5 rounded-xl font-bold text-sm bg-primary hover:bg-[#052b4f] text-primary-foreground flex items-center justify-center gap-2.5"
                  >
                    Prepare enquiry email <Send size={16} aria-hidden="true" />
                  </button>
                  {draft && <a className="text-sm font-semibold text-primary underline" href={draft}>Open email draft</a>}
                </div>
                <p className="m-0 text-sm text-muted-foreground" role="status">
                  {draft ? "Your draft is ready to review and send in your email app." : "You’ll review and send the enquiry in your email app."}
                </p>
              </form>
          </motion.div>
        </div>

        {/* Interactive FAQ Accordion Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15">
              <Award className="size-3.5 text-amber-500" />
              Frequently Asked Questions
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#073763]">
              Everything You Need to Know
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#526174]">
              Common queries from practicing pedodontists, clinical directors, and commercial distributors.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#073763]/15 bg-white overflow-hidden shadow-2xs transition-all hover:border-[#073763]/30"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-[#073763] transition-colors cursor-pointer"
                  >
                    <span>{brandText(faq.q)}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-[#073763] transition-transform duration-300 ml-4",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                      className="px-5 pb-5 text-sm text-[#526174] leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {brandText(faq.a)}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
