import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Stethoscope,
  Microscope,
  Baby,
  Star,
  Award,
  Zap,
  Plus,
  Heart,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { money } from "@/data.js";
import TestimonialsMarquee, { TestimonialItem } from "@/components/ui/grid-testimonials-marquee";

interface HomeHypeProps {
  add?: (product: any, count?: number, event?: any) => void;
}

export function HomeHypeSections({ add }: HomeHypeProps) {
  return (
    <div className="home-hype-container w-full bg-[#fbf9f5] text-[#073763] overflow-hidden" id="home-content">
      {/* 1. Authority & Impact Metrics Band */}
      <AuthorityMetricsBand />

      {/* 2. Clinical Testimonials & University Marquee */}
      <ClinicianTestimonialMarquee />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. AUTHORITY & IMPACT METRICS BAND                                         */
/* -------------------------------------------------------------------------- */
function AuthorityMetricsBand() {
  const metrics = [
    {
      value: "500K+",
      label: "Deciduous Teeth Saved",
      sub: "Prevented from premature extraction",
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
    },
    {
      value: "12,000+",
      label: "Clinics & Pediatric Specialists",
      sub: "Prescribing SPARK-DV across India",
      icon: Stethoscope,
      color: "from-blue-600 to-cyan-500",
    },
    {
      value: "300%",
      label: "Higher Biofilm Arrest",
      sub: "Over standard sodium fluoride",
      icon: Zap,
      color: "from-emerald-600 to-teal-500",
    },
    {
      value: "100%",
      label: "Zero Black Tooth Staining",
      sub: "Non-staining NanoSilver Fluoride",
      icon: ShieldCheck,
      color: "from-indigo-600 to-violet-500",
    },
  ];

  const partners = [
    "All India Pediatric Dental Research Network",
    "Government Dental College & Hospital, Chennai",
    "Center for Advanced Nanotechnology in Dentistry",
    "Pediatric Endodontic Forum, Hyderabad",
    "Manipal College of Dental Biomaterials",
    "Indian Society of Pedodontics & Preventive Care",
    "Apollo Pediatric Dental Center of Excellence",
  ];

  return (
    <section className="relative py-16 md:py-24 border-b border-[#073763]/10 bg-gradient-to-b from-[#ffffff] to-[#fbf9f5]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[380px] w-[600px] rounded-full bg-cyan-100/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15 shadow-2xs">
            <Award className="size-3.5 text-amber-500" />
            India's #1 Pediatric Dental Biomaterials Pioneer
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#073763] max-w-3xl leading-[1.15]">
            Setting the Clinical Gold Standard for Children’s Enamel Care
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#526174] max-w-2xl font-medium">
            SPARK-DV replaces invasive dental drilling with patented nanotechnology and bioactive minerals engineered for young anatomy.
          </p>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-[#073763]/12 bg-white/80 p-6 backdrop-blur-md shadow-[0_8px_30px_rgba(7,55,99,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,55,99,0.1)] hover:border-[#073763]/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#073763]/5 text-[#073763] group-hover:bg-[#073763] group-hover:text-white transition-colors duration-300">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    VERIFIED
                  </span>
                </div>
                <div className={cn("text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r text-transparent bg-clip-text", m.color)}>
                  {m.value}
                </div>
                <h3 className="mt-2 text-base font-bold text-[#073763]">
                  {m.label}
                </h3>
                <p className="mt-1 text-xs text-[#64748b] leading-relaxed">
                  {m.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Live Partner Marquee Banner */}
        <div className="mt-14 pt-8 border-t border-[#073763]/10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by Departments of Pediatric Dentistry &amp; Research Centers
          </p>
          <div className="relative w-full overflow-hidden mask-gradient-x">
            <div className="flex w-max animate-marquee space-x-12 py-2">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-[#334155]/85">
                  <span className="size-2 rounded-full bg-[#0284c7]" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. THE 21st.dev / INSPIRA UI BENTO GRID: WHY SPARK-DV LEADS THE INDUSTRY   */
/* -------------------------------------------------------------------------- */
function LeadershipBentoGrid() {
  return (
    <section className="py-20 md:py-28 bg-[#fbf9f5] border-b border-[#073763]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15">
              <Microscope className="size-3.5 text-[#0284c7]" />
              Breakthrough Nanotechnology
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#073763] leading-[1.15]">
              Engineering the Unrivaled Gold Standard in Bioactive Care
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#526174]">
              Where traditional dentistry waits for cavitations, SPARK-DV arrests decay at the molecular level with non-invasive biomimetic science.
            </p>
          </div>
          <Link
            to="/science"
            className="inline-flex items-center gap-2 rounded-xl bg-[#073763] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#062d52] transition-colors shrink-0"
            style={{ color: "#ffffff", backgroundColor: "#073763" }}
          >
            Explore Clinical Blogs <ArrowUpRight className="size-4" style={{ color: "#ffffff" }} />
          </Link>
        </div>

        {/* 21st.dev / Inspira UI Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large Span 2 - NanoSilver Fluoride Bioactive Shield */}
          <div className="group relative md:col-span-2 overflow-hidden rounded-3xl border border-[#073763]/15 bg-white shadow-[0_12px_40px_rgba(7,55,99,0.05)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(7,55,99,0.12)] hover:border-[#073763]/30">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src="/images/hype-bioactive-enamel.jpg"
                alt="3D scientific visualization of tooth enamel protected by nano-hydroxyapatite and silver crystals"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#073763] shadow-xs border border-white">
                  <Sparkles className="size-3 text-amber-500" />
                  PATENTED DUAL-MATRIX
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 relative -mt-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#073763]">
                Proprietary NanoSilver Fluoride (NSF) Matrix
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                Unlike archaic Silver Diamine Fluoride (SDF) that turns baby teeth irreversibly black, SPARK-DV’s colloidal 10–20nm NanoSilver delivers 3x antibacterial power with zero discoloration. It deeply infiltrates the microbial biofilm, halting active caries in 60 seconds.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#073763]">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Non-Staining Smile</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#073763]">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>5% nHA Remineralization</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#073763]">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Tubule Occlusion for Zero Pain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Research & Academic Origin */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#073763]/15 bg-white shadow-[0_12px_40px_rgba(7,55,99,0.05)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(7,55,99,0.12)] hover:border-[#073763]/30 flex flex-col justify-between">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src="/images/hype-lab-research.jpg"
                alt="SPARK-DV Dental Biomaterials Research Institute laboratory"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#073763] shadow-xs border border-white">
                  <Award className="size-3 text-blue-600" />
                  WIPO PATENTS
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#073763]">
                Academic &amp; Clinical Pedigree
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                Founded by Dr. Ajay Reddy Mareddy with published international patents in dental drug saturation, our formulations are peer-reviewed in leading pediatric journals.
              </p>
              <Link
                to="/about"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#073763] hover:underline"
              >
                Meet the Founder &amp; R&amp;D Team <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Deciduous Anatomy Precision Instruments */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#073763]/15 bg-white shadow-[0_12px_40px_rgba(7,55,99,0.05)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(7,55,99,0.12)] hover:border-[#073763]/30 flex flex-col justify-between">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src="/images/hype-clinical-precision.jpg"
                alt="Precision pediatric NiTi rotary endodontic files and bioactive sealer"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#073763] shadow-xs border border-white">
                  <Zap className="size-3 text-amber-500" />
                  PRIMARY CANAL NITI
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#073763]">
                Deciduous Endodontic Engineering
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                Primary molar canals are delicate and curved. Our Pedo Spark Gold and Black Oxide NiTi files are custom-graduated to preserve root anatomy without apical extrusion.
              </p>
              <Link
                to="/products/spark-files"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#073763] hover:underline"
              >
                Inspect Rotary File Sequence <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Large Span 2 - Pediatric Compassion & Child Trust */}
          <div className="group relative md:col-span-2 overflow-hidden rounded-3xl border border-[#073763]/15 bg-white shadow-[0_12px_40px_rgba(7,55,99,0.05)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(7,55,99,0.12)] hover:border-[#073763]/30">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/hype-pediatric-clinic.jpg"
                alt="Compassionate pediatric dentist treating smiling child patient"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#073763] shadow-xs border border-white">
                  <Baby className="size-3 text-rose-500" />
                  FEAR-FREE CLINICS
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 relative -mt-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#073763]">
                Loved by Children. Trusted by Families Nationwide.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                Dental anxiety begins with painful procedures. By providing minimally invasive lesion arrest, non-burning alcohol-free mouthwashes, and delicious chewable gummies, SPARK-DV transforms the dental visit into a happy, confident milestone.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/parents"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#073763]/5 hover:bg-[#073763]/10 px-4 py-2 text-xs font-bold text-[#073763] border border-[#073763]/15 transition-colors"
                >
                  Family Preventive Guide <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  to="/products?category=Prevention"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#073763] text-white hover:bg-[#062d52] px-4 py-2 text-xs font-bold transition-colors shadow-2xs"
                  style={{ color: "#ffffff", backgroundColor: "#073763" }}
                >
                  Shop Everyday Range <ArrowUpRight className="size-3.5" style={{ color: "#ffffff" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. DEDICATED DUAL PORTALS: FOR DENTISTS & FOR PARENTS                      */
/* -------------------------------------------------------------------------- */
function DualPortalsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#fbf9f5] to-[#f4f0e9] border-b border-[#073763]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15">
            <Heart className="size-3.5 text-rose-500" />
            Tailored Experiences
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#073763]">
            Dedicated Portals for Every Smile
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#526174]">
            Whether you are equipping a multi-chair pediatric practice or protecting your child’s first teeth at home, SPARK-DV has a specialized suite designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portal 1: For Dental Professionals */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#073763]/20 bg-gradient-to-br from-white via-white to-blue-50/50 p-8 sm:p-10 shadow-[0_16px_45px_rgba(7,55,99,0.06)] flex flex-col justify-between group hover:border-[#073763] transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#073763] text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider shadow-xs" style={{ color: '#ffffff', backgroundColor: '#073763' }}>
                  <Stethoscope className="size-3.5" style={{ color: '#ffffff' }} />
                  CLINICAL PRACTITIONER PORTAL
                </span>
                <span className="text-xs font-bold font-mono text-slate-400">
                  DENTISTS &amp; COLLEGES
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#073763] leading-snug">
                For Dental Professionals &amp; Surgeons
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
                Elevate your clinical outcomes with high-concentration NSF clinical droppers, bioactive bioceramic MTA sealers, and dedicated pediatric rotary sequences.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-[#334155] font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Clinical IFU Protocols &amp; Dosage Guidelines for Nanion Elite</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Institutional Wholesale Pricing &amp; GST Tax Invoices</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Priority 24-Hour Dispatch to Clinics Across India</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Specialist Discussion Forums &amp; Case Note Collaboration</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                to="/dentists"
                className="inline-flex items-center gap-2 rounded-xl bg-[#073763] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#052b4f] transition-all hover:gap-3"
                style={{ color: "#ffffff", backgroundColor: "#073763" }}
              >
                Access Practitioner Portal <ArrowRight className="size-4" style={{ color: "#ffffff" }} />
              </Link>
              <Link
                to="/contact?type=Professional%20pricing"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#073763]/25 bg-white px-5 py-3.5 text-sm font-bold text-[#073763] hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Request Clinic Pricing <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Portal 2: For Parents & Everyday Care */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-600/20 bg-gradient-to-br from-white via-white to-emerald-50/40 p-8 sm:p-10 shadow-[0_16px_45px_rgba(7,55,99,0.06)] flex flex-col justify-between group hover:border-emerald-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider shadow-xs" style={{ color: '#ffffff', backgroundColor: '#047857' }}>
                  <Baby className="size-3.5" style={{ color: '#ffffff' }} />
                  PARENTS &amp; FAMILY CARE
                </span>
                <span className="text-xs font-bold font-mono text-slate-400">
                  HOME PREVENTIVE CARE
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#073763] leading-snug">
                For Parents: Healthier Smiles, Zero Stress
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
                Give your kids the gentle protection of NanoSilver Fluoride and 5% Nano-Hydroxyapatite. Safe, non-abrasive daily formulas formulated without burning alcohol.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-[#334155] font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Age-Appropriate Enamel Shielding from Age 2 to Teens</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Delicious, Non-Burning Mouthwash (Nanion Swish)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Pediatrician-Approved Fluoride Ratios (Safe if Swallowed in Pea-Size)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Step-by-Step Brushing Guides &amp; Caries Prevention Advice</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                to="/parents"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-800 transition-all hover:gap-3"
                style={{ color: "#ffffff", backgroundColor: "#047857" }}
              >
                Read Parents Guide <ArrowRight className="size-4" style={{ color: "#ffffff" }} />
              </Link>
              <Link
                to="/products?category=Prevention"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/25 bg-white px-5 py-3.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50/50 transition-colors shadow-2xs"
              >
                Shop Everyday Toothpastes <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. CURATED 4 FLAGSHIP BREAKTHROUGHS WITH FLY-TO-CART ANIMATION             */
/* -------------------------------------------------------------------------- */
function FlagshipSpotlight({ add }: HomeHypeProps) {
  const flagships = [
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
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#073763]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15">
              <Zap className="size-3.5 text-amber-500" />
              Flagship Formulations
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#073763]">
              The Breakthrough Lineup
            </h2>
            <p className="mt-2 text-base text-[#526174]">
              Explore the four most celebrated products transforming clinical chairsides and daily home routines.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#073763] hover:underline"
          >
            Browse Products Catalogue <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flagships.map((prod) => (
            <div
              key={prod.slug}
              data-product-slug={prod.slug}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#073763]/40 hover:-translate-y-1.5"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-square w-full rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-6 overflow-hidden">
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#073763] shadow-2xs border border-slate-100">
                    {prod.badge}
                  </span>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-[82%] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {prod.category}
                    </span>
                    <span className="text-xs font-semibold text-[#0284c7] bg-cyan-50 px-2 py-0.5 rounded-md">
                      {prod.tag}
                    </span>
                  </div>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="mt-1 block text-lg font-bold text-[#073763] group-hover:text-[#0284c7] transition-colors"
                  >
                    {prod.name}
                  </Link>
                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    PRICE
                  </span>
                  <span className="text-lg font-bold text-[#073763]">
                    {money(prod.price)}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={`Add ${prod.name} to cart`}
                  onClick={(e) => add?.(prod, 1, e)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#073763] hover:bg-[#052b4f] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                  style={{ color: "#ffffff", backgroundColor: "#073763" }}
                >
                  <Plus className="size-3.5" style={{ color: "#ffffff" }} />
                  <span style={{ color: "#ffffff" }}>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. CLINICAL TESTIMONIALS & UNIVERSITY MARQUEE                              */
/* -------------------------------------------------------------------------- */
const CLINICAL_ROW_1: TestimonialItem[] = [
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
];

/* -------------------------------------------------------------------------- */
/* 5. CLINICIAN TESTIMONIAL MARQUEE                                           */
/* -------------------------------------------------------------------------- */
function ClinicianTestimonialMarquee() {
  return (
    <section className="py-20 md:py-28 bg-[#fbf9f5] border-t border-[#073763]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#073763]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#073763] border border-[#073763]/15">
            <Star className="size-3.5 text-amber-500 fill-amber-500" />
            Verified Clinical Testimonials
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#073763]">
            What Department Heads &amp; Surgeons Say
          </h2>
          <p className="mt-3 text-base text-[#526174]">
            Read direct feedback from academic researchers and practicing pediatric surgeons who rely on SPARK-DV chairside every day.
          </p>
        </div>
      </div>

      <TestimonialsMarquee
        firstRow={CLINICAL_ROW_1}
        secondRow={CLINICAL_ROW_2}
        duration={70}
        pauseOnHover={true}
        className="bg-transparent"
      />
    </section>
  );
}
