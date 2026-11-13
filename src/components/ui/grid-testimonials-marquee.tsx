"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  highlights?: string[];
}

export interface TestimonialsMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  firstRow?: TestimonialItem[];
  secondRow?: TestimonialItem[];
  duration?: number;
  pauseOnHover?: boolean;
}

const DEFAULT_ROW_1: TestimonialItem[] = [
  {
    id: "1",
    name: "Morgan Linton",
    handle: "@morganlinton",
    avatar: "https://cdn.21st.dev/assets/mirror/aa/aaf07c78fee434950329110b52b15d039f4051fb14df19165ab4f3c502b60eae.jpg",
    content: "If you're coding with AI, and haven't discovered @firecrawl yet, prepare to have your mind blown 🤯",
    highlights: ["@firecrawl"],
  },
  {
    id: "2",
    name: "Chris DeWeese",
    handle: "@chrisdeweese_",
    avatar: "https://cdn.21st.dev/assets/mirror/97/9723716d75717de76f94417a7480b42ed330b82f48eb6ff157b1017c0a35034c.jpg",
    content: "Started using @firecrawl for a project, I wish I used this sooner.",
    highlights: ["@firecrawl"],
  },
  {
    id: "3",
    name: "Alex Reibman",
    handle: "@AlexReibman",
    avatar: "https://cdn.21st.dev/assets/mirror/35/35d44064e016f99ce0bb5f2438bb3827ceea22d6fa2803e94040501d1a25f27d.jpg",
    content: "Moved our internal agent's web scraping tool from Apify to Firecrawl because it benchmarked 50x faster on AgentOps.",
    highlights: ["Firecrawl"],
  },
  {
    id: "4",
    name: "Logan Kilpatrick",
    handle: "@OfficialLoganK",
    avatar: "https://cdn.21st.dev/assets/mirror/8a/8ad3e79f29bb0ed64e5d7592f056a8a6f832e9fc49aea9ab58525b994ff722a8.jpg",
    content: "Firecrawl is literally the easiest way to extract clean markdown for LLM context. Massive game changer.",
    highlights: ["Firecrawl"],
  },
];

const DEFAULT_ROW_2: TestimonialItem[] = [
  {
    id: "5",
    name: "Bardia",
    handle: "@thepericulum",
    avatar: "https://cdn.21st.dev/assets/mirror/76/76bd8142f0bea2b1c337313859d82e587930f9a4b12443379eb8287871975d7a.jpg",
    content: "Firecrawl team ships. I wanted support for their node SDK, and less than an hour later, I got them.",
    highlights: ["Firecrawl"],
  },
  {
    id: "6",
    name: "Matt Busigin",
    handle: "@mbusigin",
    avatar: "https://cdn.21st.dev/assets/mirror/5b/5b213874e55136df7e83f6b815d34d217df505097d412741c3fd2fe75094627b.jpg",
    content: "Firecrawl is dope. Congrats guys 👏",
    highlights: ["Firecrawl"],
  },
  {
    id: "7",
    name: "Sumanth",
    handle: "@Sumanth_077",
    avatar: "https://cdn.21st.dev/assets/mirror/5f/5ffe22aba07b30427eca88f8acd6aec5d67b7aafaba0cd823e22ebd060717c15.jpg",
    content: "Web scraping will never be the same!\n\nFirecrawl is an open-source framework that takes a URL, crawls it, and conver...",
    highlights: ["Firecrawl"],
  },
  {
    id: "8",
    name: "Steve P.",
    handle: "@steve_codes",
    avatar: "https://cdn.21st.dev/assets/mirror/cb/cb929f6606880b9fe4d0a995ad5091920ce4008ef693dca77168c0113febc30f.jpg",
    content: "Open-source tools dropped by the team are incredible. Upload a URL and get LLM-ready markdown instantly.",
    highlights: ["Open-source"],
  },
];

const HighlightedText = ({
  text,
  highlights,
}: {
  text: string;
  highlights?: string[];
}) => {
  if (!highlights || highlights.length === 0) return <>{text}</>;

  const regex = new RegExp(`(${highlights.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatched = highlights.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );
        return isMatched ? (
          <span key={index} className="text-[#0284c7] font-semibold">
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
};

export const TestimonialCard: React.FC<{
  item: TestimonialItem;
  className?: string;
}> = ({ item, className }) => {
  return (
    <figure
      className={cn(
        "w-[280px] xs:w-[320px] sm:w-[360px] md:w-[400px] min-h-[175px] md:h-[190px] flex-shrink-0 p-5 sm:p-6 flex flex-col justify-start select-none",
        "bg-card text-card-foreground",
        "border-r border-border rounded-none",
        className
      )}
    >
      <figcaption className="flex items-center gap-3 sm:gap-3.5 mb-3">
        <img
          src={item.avatar}
          alt={item.name}
          width={40}
          height={40}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 ring-1 ring-border shadow-xs"
          loading="lazy"
        />
        <div className="flex flex-col leading-tight overflow-hidden">
          <span className="text-[13.5px] sm:text-[14px] font-semibold text-foreground tracking-tight truncate">
            {item.name}
          </span>
          <span className="text-[12px] sm:text-[12.5px] text-muted-foreground mt-0.5 truncate">
            {item.handle}
          </span>
        </div>
      </figcaption>

      <blockquote className="text-[12.5px] sm:text-[13.5px] leading-[1.55] sm:leading-[1.6] text-muted-foreground/90 font-normal whitespace-pre-line m-0">
        &ldquo;<HighlightedText text={item.content} highlights={item.highlights} />&rdquo;
      </blockquote>
    </figure>
  );
};

export const TestimonialsMarquee = React.forwardRef<
  HTMLDivElement,
  TestimonialsMarqueeProps
>(
  (
    {
      firstRow = DEFAULT_ROW_1,
      secondRow = DEFAULT_ROW_2,
      duration = 80,
      pauseOnHover = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isRow1Paused, setIsRow1Paused] = React.useState(false);
    const [isRow2Paused, setIsRow2Paused] = React.useState(false);

    const quadRow1 = React.useMemo(
      () => [...firstRow, ...firstRow, ...firstRow, ...firstRow],
      [firstRow]
    );
    const quadRow2 = React.useMemo(
      () => [...secondRow, ...secondRow, ...secondRow, ...secondRow],
      [secondRow]
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Customer Testimonials"
        className={cn(
          "relative w-full bg-background overflow-hidden py-8 sm:py-12",
          className
        )}
        style={
          {
            "--marquee-duration": `${duration}s`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <style>{`
          @keyframes marquee-scroll-left {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes marquee-scroll-right {
            0% {
              transform: translate3d(-50%, 0, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }

          .track-flex-container {
            display: flex;
            width: max-content;
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
          }

          .marquee-move-left {
            animation: marquee-scroll-left var(--marquee-duration) linear infinite;
          }

          .marquee-move-right {
            animation: marquee-scroll-right var(--marquee-duration) linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-move-left,
            .marquee-move-right {
              animation: none !important;
            }
          }
        `}</style>

        {/* Dual Side Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

        {/* Main Grid Wrapper */}
        <div className="flex flex-col w-full border-y border-border">
          {/* Row 1: Left Scroll (Arrow Left) */}
          <div
            className="flex overflow-hidden w-full border-b border-border cursor-pointer select-none"
            onPointerEnter={() => pauseOnHover && setIsRow1Paused(true)}
            onPointerLeave={() => pauseOnHover && setIsRow1Paused(false)}
          >
            <div
              className="track-flex-container marquee-move-left"
              style={{
                animationPlayState: isRow1Paused ? "paused" : "running",
              }}
            >
              {/* Primary set */}
              <div className="flex flex-nowrap">
                {quadRow1.map((item, idx) => (
                  <TestimonialCard
                    key={`r1-primary-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
              {/* Seamless loop set */}
              <div className="flex flex-nowrap" aria-hidden="true">
                {quadRow1.map((item, idx) => (
                  <TestimonialCard
                    key={`r1-clone-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Right Scroll (Arrow Right) */}
          <div
            className="flex overflow-hidden w-full cursor-pointer select-none"
            onPointerEnter={() => pauseOnHover && setIsRow2Paused(true)}
            onPointerLeave={() => pauseOnHover && setIsRow2Paused(false)}
          >
            <div
              className="track-flex-container marquee-move-right"
              style={{
                animationPlayState: isRow2Paused ? "paused" : "running",
              }}
            >
              {/* Primary set */}
              <div className="flex flex-nowrap">
                {quadRow2.map((item, idx) => (
                  <TestimonialCard
                    key={`r2-primary-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
              {/* Seamless loop set */}
              <div className="flex flex-nowrap" aria-hidden="true">
                {quadRow2.map((item, idx) => (
                  <TestimonialCard
                    key={`r2-clone-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TestimonialsMarquee.displayName = "TestimonialsMarquee";

export default TestimonialsMarquee;
export const Component = TestimonialsMarquee;

