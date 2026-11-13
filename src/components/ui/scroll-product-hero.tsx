import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface ScrollProductHeroProps {
  onSlideChange?: (index: number) => void;
  onHeaderOverlayChange?: (isOverlay: boolean) => void;
  className?: string;
}

export interface HeroSlide {
  id: string;
  slug: string;
  name: string;
  category: string;
  textLeft: string;
  textRight: string;
  price: number | null;
  image: string;
  alt: string;
  bgGradient: string;
  textColor: string;
  imgClass?: string;
}

export const ALL_HERO_SLIDES: HeroSlide[] = [
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
];

export default function ScrollProductHero({
  onSlideChange,
  onHeaderOverlayChange,
  className = "",
}: ScrollProductHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const totalSlides = ALL_HERO_SLIDES.length;

  // Track scroll through the hero track
  const handleScroll = useCallback(() => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const scrollRange = rect.height - window.innerHeight;
    if (scrollRange <= 0) return;

    const current = -rect.top;
    const progress = Math.max(0, Math.min(1, current / scrollRange));
    setScrollProgress(progress);

    // Calculate active slide index
    const rawIdx = progress * (totalSlides - 1);
    const nextActive = Math.min(totalSlides - 1, Math.round(rawIdx));

    setActiveSlide((prev) => {
      if (prev !== nextActive) {
        onSlideChange?.(nextActive);
      }
      return nextActive;
    });

    // Notify header overlay state: true while inside hero viewport
    const isOverlay = rect.bottom > 80 && rect.top <= 0;
    onHeaderOverlayChange?.(isOverlay);
  }, [totalSlides, onSlideChange, onHeaderOverlayChange]);

  useEffect(() => {
    let rafId: number;
    const onScrollRaf = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onScrollRaf, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", onScrollRaf);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  // Smooth scroll to any slide
  const scrollToSlide = (index: number) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const scrollRange = rect.height - window.innerHeight;
    const targetScroll =
      window.scrollY + rect.top + (index / (totalSlides - 1)) * scrollRange;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Scroll to explore action
  const handleExplore = () => {
    if (activeSlide < totalSlides - 1) {
      scrollToSlide(activeSlide + 1);
    } else if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.bottom - 40,
        behavior: "smooth",
      });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      if (activeSlide < totalSlides - 1) scrollToSlide(activeSlide + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeSlide > 0) scrollToSlide(activeSlide - 1);
    }
  };

  // Fractional progress between slide pairs
  const rawIdx = scrollProgress * (totalSlides - 1);
  const baseIdx = Math.min(totalSlides - 2, Math.max(0, Math.floor(rawIdx)));
  const nextIdx = Math.min(totalSlides - 1, baseIdx + 1);
  const frac = Math.max(0, Math.min(1, rawIdx - baseIdx));

  // Current pair of slides
  const currentSlideData = ALL_HERO_SLIDES[activeSlide];
  const slideA = ALL_HERO_SLIDES[baseIdx];
  const slideB = ALL_HERO_SLIDES[nextIdx];

  // Opacities for smooth background blend
  const opacityA = 1 - frac;
  const opacityB = frac;

  // Text transition logic
  const sameLeftText = slideA.textLeft === slideB.textLeft;
  const leftText = sameLeftText ? slideA.textLeft : (frac < 0.5 ? slideA.textLeft : slideB.textLeft);

  const textRightAOpacity = Math.max(0, Math.min(1, (0.48 - frac) * 3));
  const textRightAY = -frac * 36;

  const textRightBOpacity = Math.max(0, Math.min(1, (frac - 0.52) * 3));
  const textRightBY = (1 - frac) * 36;

  // Current text color
  const textColor = frac < 0.5 ? slideA.textColor : slideB.textColor;

  // Track height based on number of slides
  const trackHeight = `${Math.max(220, totalSlides * 85)}vh`;

  return (
    <section
      ref={rootRef}
      className={`scroll-product-hero-root ${className}`}
      style={{ height: trackHeight }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="SPARK-DV All Featured Products Showcase"
    >
      <div className="scroll-product-hero-sticky">
        {/* Background Layer A */}
        <div
          className="scroll-hero-bg-layer"
          style={{
            background: slideA.bgGradient,
            opacity: opacityA,
          }}
          aria-hidden="true"
        />

        {/* Background Layer B */}
        <div
          className="scroll-hero-bg-layer"
          style={{
            background: slideB.bgGradient,
            opacity: opacityB,
          }}
          aria-hidden="true"
        />

        {/* Header Spacer for fixed top navigation */}
        <div className="scroll-hero-header-spacer" aria-hidden="true" />

        {/* Giant Background Typography: Left & Right words framing the product */}
        <div
          className="scroll-hero-typography"
          aria-hidden="true"
          style={{ color: textColor }}
        >
          <div className="scroll-hero-text-left">
            <span>{leftText}</span>
          </div>
          <div className="scroll-hero-text-gap" />
          <div className="scroll-hero-text-right">
            {/* Word A */}
            <span
              className="scroll-hero-right-word"
              style={{
                opacity: textRightAOpacity,
                transform: `translateY(${textRightAY}px)`,
                visibility: textRightAOpacity < 0.01 ? "hidden" : "visible",
              }}
            >
              {slideA.textRight}
            </span>
            {/* Word B */}
            <span
              className="scroll-hero-right-word"
              style={{
                opacity: textRightBOpacity,
                transform: `translateY(${textRightBY}px)`,
                visibility: textRightBOpacity < 0.01 ? "hidden" : "visible",
              }}
            >
              {slideB.textRight}
            </span>
          </div>
        </div>

        {/* Center Stage: Product + Pedestal + Slide Indicators */}
        <div className="scroll-hero-stage">
          {/* Luminous Studio Spotlight behind the product to make it pop and stand out */}
          <div className="scroll-hero-spotlight" aria-hidden="true" />

          <div className="scroll-hero-product-viewport">
            {/* Render current and next product during transition */}
            {ALL_HERO_SLIDES.map((slide, i) => {
              const isItemA = i === baseIdx;
              const isItemB = i === nextIdx;
              if (!isItemA && !isItemB) return null;

              const isFirst = isItemA;
              const opacity = isFirst
                ? Math.max(0, Math.min(1, (0.5 - frac) * 2.4))
                : Math.max(0, Math.min(1, (frac - 0.5) * 2.4));

              const translateY = isFirst ? -frac * 50 : (1 - frac) * 50;
              const scale = isFirst ? 1 - frac * 0.06 : 0.94 + frac * 0.06;
              const isInteractive = activeSlide === i;

              return (
                <div
                  key={slide.id}
                  className={`scroll-hero-product-item ${slide.imgClass || ""}`}
                  style={{
                    opacity,
                    transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
                    pointerEvents: isInteractive ? "auto" : "none",
                    visibility: opacity < 0.02 ? "hidden" : "visible",
                  }}
                >
                  <Link
                    to={`/products/${slide.slug}`}
                    aria-label={`View ${slide.name}`}
                    tabIndex={isInteractive ? 0 : -1}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className={`scroll-hero-product-img ${slide.imgClass || ""}`}
                      loading={i < 3 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* 3D Grounded Pedestal Platform */}
          <div className="scroll-hero-pedestal-wrap" aria-hidden="true">
            <img
              src="/images/hero-pedestal.svg"
              alt=""
              className="scroll-hero-pedestal"
              draggable={false}
            />
          </div>

          {/* Slide Indicator Bar: All products representation */}
          <div className="scroll-hero-indicator-container">
            <div
              className="scroll-hero-indicators"
              role="tablist"
              aria-label="All hero product slides"
            >
              {ALL_HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  aria-label={`Slide ${idx + 1} of ${totalSlides}: ${slide.name}`}
                  title={`${slide.name} (${slide.category})`}
                  className={`scroll-hero-indicator-bar ${activeSlide === idx ? "active" : ""}`}
                  onClick={() => scrollToSlide(idx)}
                />
              ))}
            </div>
            <div className="scroll-hero-slide-counter">
              <span>{String(activeSlide + 1).padStart(2, "0")}</span>
              <span className="scroll-hero-slide-counter-divider">/</span>
              <span>{String(totalSlides).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Explore on left, View Product on right */}
        <div className="scroll-hero-bottom-bar">
          <button
            type="button"
            className="scroll-hero-explore-btn"
            onClick={handleExplore}
            aria-label="Scroll to explore more products"
          >
            <span>Scroll to explore</span>
            <span className="scroll-hero-explore-arrow" aria-hidden="true">
              ↓
            </span>
          </button>

          <Link
            to={`/products/${currentSlideData.slug}`}
            className="scroll-hero-view-btn"
            aria-label={`View ${currentSlideData.name} details`}
          >
            <span>View product</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
