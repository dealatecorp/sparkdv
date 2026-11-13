import fs from 'fs';

const file = 'src/components/ui/contact-with-globe.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update imports at the top
const oldImports = `import { ArrowRight, Mail, Phone, Headphones, MapPin, CheckCircle2 } from "lucide-react";`;
const newImports = `import {
  ArrowRight,
  Mail,
  Phone,
  Headphones,
  MapPin,
  CheckCircle2,
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
} from "lucide-react";`;

content = content.replace(oldImports, newImports);

// Replace from export interface ContactWithGlobeProps to end of file
const startMarker = 'export interface ContactWithGlobeProps {';
const startIdx = content.indexOf(startMarker);

if (startIdx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

const newComponent = `export interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

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
}: ContactWithGlobeProps) {
  const [activeDept, setActiveDept] = useState("clinical");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("hyderabad");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const curDept = DEPARTMENTS.find((d) => d.id === activeDept) || DEPARTMENTS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleChipClick = (chipText: string) => {
    setMessage((prev) => (prev ? \`\${prev}\\n• \${chipText}\` : \`• \${chipText}: \`));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
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
            {description}
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
                  onClick={() => setActiveDept(dept.id)}
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
                href="https://wa.me/917981546939?text=Hello%20SPARK-DV,%20I%20would%20like%20to%20enquire%20about%20your%20clinical%20products."
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-5 shadow-sm transition-all active:scale-[0.98]"
                style={{ backgroundColor: "#059669", color: "#ffffff" }}
              >
                <MessageCircle className="size-4" style={{ color: "#ffffff" }} />
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
                      R&amp;D Lab &amp; Headquarters
                    </span>
                    <span className="text-sm font-bold text-[#073763]">
                      Hyderabad &amp; Chennai, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Light Interactive Rotating Globe with City Selectors */}
            <div className="relative overflow-hidden rounded-2xl border border-[#073763]/15 bg-white p-4 shadow-[0_8px_30px_rgba(7,55,99,0.06)] flex flex-col gap-3">
              <div className="flex items-center justify-between z-10 relative">
                <span className="text-xs font-bold uppercase tracking-wider text-[#073763] inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-cyan-500 animate-ping" />
                  Live Distribution Hubs
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Click to rotate</span>
              </div>

              <div className="relative h-60 w-full overflow-hidden rounded-xl bg-slate-50/50">
                <GlobeWireframe
                  className="w-full aspect-square max-w-full absolute top-0 left-0"
                  variant="wireframesolid"
                  autoRotate={true}
                  autoRotateSpeed={0.4}
                  rotateToLocation={selectedCity}
                  strokeColor="#073763"
                  strokeWidth={0.8}
                  graticuleColor="#0284c7"
                  graticuleOpacity={0.16}
                  sphereOutlineColor="#073763"
                  sphereOutlineWidth={1.2}
                  countryFillColor="#e6f0fa"
                  countryHoverColor="#bae0f8"
                  backgroundColor="#ffffff"
                  rotateCities={["hyderabad", "mumbai", "dubai", "london", "singapore"]}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="flex flex-wrap gap-1.5 z-10 relative pt-1">
                {[
                  { name: "Hyderabad (HQ)", id: "hyderabad" },
                  { name: "Chennai (R&D)", id: "chennai" },
                  { name: "Mumbai Hub", id: "mumbai" },
                  { name: "Dubai", id: "dubai" },
                  { name: "Singapore", id: "singapore" },
                ].map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCity(city.id)}
                    className={cn(
                      "text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                      selectedCity === city.id
                        ? "bg-[#073763] text-white border-[#073763]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#073763]"
                    )}
                    style={selectedCity === city.id ? { backgroundColor: "#073763", color: "#ffffff" } : {}}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Elevated Interactive Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="lg:col-span-7 rounded-3xl border border-[#073763]/15 bg-white p-6 sm:p-10 shadow-[0_16px_50px_rgba(7,55,99,0.08)] flex flex-col gap-6"
          >
            {submitted ? (
              <div className="py-16 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-400">
                <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#073763]">
                  Enquiry Successfully Sent!
                </h3>
                <p className="text-sm md:text-base text-[#526174] max-w-md leading-relaxed">
                  Thank you, <strong className="text-[#073763]">{name || "Doctor"}</strong>. Your enquiry for the{" "}
                  <strong className="text-[#073763]">{curDept.label}</strong> team has been routed. We typically review and respond within 15 minutes.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="px-6 py-3 rounded-xl bg-[#073763] text-white font-bold text-sm hover:bg-[#052b4f] transition-all cursor-pointer shadow-sm"
                    style={{ backgroundColor: "#073763", color: "#ffffff" }}
                  >
                    Send another enquiry
                  </button>
                  <a
                    href="https://wa.me/917981546939"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all inline-flex items-center gap-2 shadow-sm"
                    style={{ backgroundColor: "#059669", color: "#ffffff" }}
                  >
                    <MessageCircle className="size-4" style={{ color: "#ffffff" }} />
                    Continue on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    💡 Click a topic to auto-fill:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {curDept.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#fbf9f5] border border-[#073763]/15 text-[#073763] hover:bg-[#073763] hover:text-white hover:border-[#073763] transition-all cursor-pointer shadow-2xs text-left"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <FormDots className="text-[#073763]/25" />

                {/* Name & Clinic Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Rajesh Kumar"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm font-medium text-[#073763] placeholder:text-[#94a3b8] shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Clinic / Organization
                    </label>
                    <input
                      type="text"
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                      placeholder="SmileCare Pediatric Dental Clinic"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm font-medium text-[#073763] placeholder:text-[#94a3b8] shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@example.com"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm font-medium text-[#073763] placeholder:text-[#94a3b8] shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98480 14443"
                      className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm font-medium text-[#073763] placeholder:text-[#94a3b8] shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1e293b]">
                      Detailed Requirements *
                    </label>
                    <span className="text-[11px] font-medium text-slate-400">
                      {message.length} characters
                    </span>
                  </div>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your practice, sample request, or partnership requirements..."
                    rows={4}
                    className="w-full bg-[#fbf9f5] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm font-medium text-[#073763] placeholder:text-[#94a3b8] shadow-2xs outline-none focus:border-[#073763] focus:bg-white focus:ring-2 focus:ring-[#073763]/20 resize-none transition-all duration-200"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold text-sm bg-[#073763] hover:bg-[#052b4f] !text-white shadow-md flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer disabled:opacity-60 active:scale-[0.98]"
                    style={{ color: "#ffffff", backgroundColor: "#073763" }}
                  >
                    <span style={{ color: "#ffffff", fontWeight: 700 }}>
                      {loading ? "Transmitting..." : "Send Clinical Enquiry"}
                    </span>
                    <Send
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "#ffffff" }}
                    />
                  </button>

                  <span className="text-xs text-slate-500 text-center sm:text-right">
                    🔒 Protected by clinical NDA &amp; data privacy standards.
                  </span>
                </div>
              </form>
            )}
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
                    <span>{faq.q}</span>
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
                      {faq.a}
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
`;

content = content.slice(0, startIdx) + newComponent;
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated contact-with-globe.tsx with rich UI components and animations!');

