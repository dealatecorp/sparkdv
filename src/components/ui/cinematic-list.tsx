import React from "react";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";

export interface CinematicItemProps {
  id: string;
  title: string;
  location: string;
  src: string;
  alt: string;
  desc?: string;
  category?: string;
}

export function CinematicListItem({
  id,
  title,
  location,
  src,
  alt,
  desc,
}: CinematicItemProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full cursor-pointer flex-col justify-center overflow-hidden border-b border-[#073763]/15 bg-[#fffcf8]",
        // Height Transition: fast start, smooth settle (Apple fluid spring/quartz curve)
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        // Mobile: fixed height / Desktop: starts compact, expands gracefully on hover
        "h-28 sm:h-32 md:hover:h-[400px]"
      )}
    >
      {/* --- Background Image Layer with Dual Cinematic Scrim --- */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 pointer-events-none">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 scale-110"
          loading="lazy"
        />
        {/* Horizontal gradient scrim for text contrast from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021324]/95 via-[#073763]/80 to-[#073763]/40" />
        {/* Bottom vertical gradient scrim for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020e1a]/95 via-transparent to-black/20" />
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-10 flex w-full items-center justify-between px-5 sm:px-10 md:px-14">
        {/* Left Side: ID & Title & Description */}
        <div className="flex items-center gap-6 md:gap-12">
          <span className="cinematic-item-id font-mono text-base md:text-xl font-bold transition-colors duration-500 shrink-0 text-[#334155] group-hover:!text-white/90">
            {id}
          </span>

          <div className="flex flex-col justify-center py-2">
            <h2
              className={cn(
                "cinematic-item-title text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#073763] group-hover:!text-white",
                "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                // On hover, title turns bright white and shifts subtly upward
                "group-hover:-translate-y-1"
              )}
            >
              {title}
            </h2>
            {/* Description revealed on hover with silky fade-in */}
            {desc ? (
              <p className="hidden max-w-2xl text-sm md:text-base leading-relaxed text-white/95 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 md:block mt-2 font-normal drop-shadow-sm">
                {desc}
              </p>
            ) : null}
            {/* Reveal Location underneath title on Mobile */}
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#526174] group-hover:text-white/80 transition-colors md:hidden mt-1">
              {location}
            </span>
          </div>
        </div>

        {/* Right Side: Metadata & Action */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          {/* Location: Slides in smoothly from bottom on desktop hover as a refined glass pill badge */}
          <span className="hidden translate-y-6 text-xs md:text-sm font-semibold uppercase tracking-wider text-transparent opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100 md:inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
            {location}
          </span>

          {/* Icon Circle */}
          <div
            className={cn(
              "flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border transition-all duration-500",
              "border-[#073763]/25 bg-white text-[#073763] shadow-sm", // Default Light
              "group-hover:border-white group-hover:bg-white group-hover:text-[#073763]", // Hover state
              "group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.45)]" // Subtle pop
            )}
          >
            <MoveRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

export interface CinematicListProps {
  items?: CinematicItemProps[];
  heading?: string;
  subheading?: string;
  className?: string;
}

export const DEFAULT_CINEMATIC_ITEMS: CinematicItemProps[] = [
  {
    id: "01",
    title: "Alpine Lodge",
    location: "Switzerland",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    alt: "Snowy mountains",
    desc: "Alpine sanctuary with panoramic views and world-class hospitality.",
  },
  {
    id: "02",
    title: "Desert Oasis",
    location: "Morocco",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    alt: "Desert dunes",
    desc: "Secluded architecture nestled among peaceful golden sands.",
  },
  {
    id: "03",
    title: "Coastal Villa",
    location: "Amalfi Coast",
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    alt: "Coastal view",
    desc: "Cliffside luxury overlooking azure Mediterranean waters.",
  },
  {
    id: "04",
    title: "Urban Loft",
    location: "New York",
    src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1600&q=80",
    alt: "City skyline",
    desc: "Industrial elegance in the cultural heart of the metropolis.",
  },
];

export function CinematicList({
  items = DEFAULT_CINEMATIC_ITEMS,
  heading = "What we believe",
  subheading = "shapes what we make.",
  className,
}: CinematicListProps) {
  return (
    <div className={cn("w-full py-16 md:py-24 bg-[#fffcf8]", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between px-2 sm:px-6 md:px-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#073763]">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-1.5 text-base sm:text-lg text-[#526174] font-medium">
                {subheading}
              </p>
            )}
          </div>
          <span className="hidden text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#64748b] md:block">
            Hover to expand
          </span>
        </div>

        <div className="flex flex-col border-t border-[#073763]/15">
          {items.map((item) => (
            <CinematicListItem key={item.id} {...item} />
          ))}
          <div className="h-px w-full bg-[#073763]/15" />
        </div>
      </div>
    </div>
  );
}

export default CinematicList;
