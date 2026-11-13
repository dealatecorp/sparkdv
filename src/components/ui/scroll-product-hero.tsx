import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Background cross-fade state
  const [bgCurrent, setBgCurrent] = useState<string>(ALL_HERO_SLIDES[0].bgGradient);
  const [bgNext, setBgNext] = useState<string>(ALL_HERO_SLIDES[0].bgGradient);
  const [bgFadeActive, setBgFadeActive] = useState<boolean>(false);

  const totalSlides = ALL_HERO_SLIDES.length;
  const currentSlideData = ALL_HERO_SLIDES[activeSlide];

  // Touch gesture support
  const touchStartXRef = useRef<number>(0);

  // Navigate to slide with animation direction
  const changeSlide = useCallback(
    (targetIndex: number, forcedDirection?: "next" | "prev") => {
      if (targetIndex === activeSlide || isTransitioning) return;

      const determinedDir =
        forcedDirection || (targetIndex > activeSlide ? "next" : "prev");

      setDirection(determinedDir);
      setPrevSlide(activeSlide);
      setIsTransitioning(true);

      // Trigger background cross-fade
      setBgNext(ALL_HERO_SLIDES[targetIndex].bgGradient);
      setBgFadeActive(true);

      setActiveSlide(targetIndex);
      onSlideChange?.(targetIndex);

      setTimeout(() => {
        setIsTransitioning(false);
        setBgCurrent(ALL_HERO_SLIDES[targetIndex].bgGradient);
        setBgFadeActive(false);
      }, 760);
    },
    [activeSlide, isTransitioning, onSlideChange]
  );

  const goToNext = useCallback(() => {
    const nextIdx = (activeSlide + 1) % totalSlides;
    changeSlide(nextIdx, "next");
  }, [activeSlide, totalSlides, changeSlide]);

  const goToPrev = useCallback(() => {
    const prevIdx = (activeSlide - 1 + totalSlides) % totalSlides;
    changeSlide(prevIdx, "prev");
  }, [activeSlide, totalSlides, changeSlide]);

  // Automatic horizontal advance from right to left every 3200ms
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Pause when browser tab is inactive to preserve battery & animations
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff < -45) {
      // Swiped left -> advance right to left
      goToNext();
    } else if (diff > 45) {
      // Swiped right -> advance left to right
      goToPrev();
    }
    setIsPaused(false);
  };

  // Scroll to explore action: Smooth scroll to the rest of the home page
  const handleExplore = () => {
    const nextEl =
      rootRef.current?.nextElementSibling ||
      document.getElementById("home-content") ||
      document.querySelector(".commerce-home > *:nth-child(2)");

    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  // Header overlay notification
  useEffect(() => {
    const handleScrollOverlay = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const isOverlay = rect.bottom > 80 && rect.top <= 0;
      onHeaderOverlayChange?.(isOverlay);
    };

    window.addEventListener("scroll", handleScrollOverlay, { passive: true });
    handleScrollOverlay();
    return () => window.removeEventListener("scroll", handleScrollOverlay);
  }, [onHeaderOverlayChange]);

  return (
    <section
      ref={rootRef}
      className={`scroll-product-hero-root ${className}`}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label="SPARK-DV All Featured Products Horizontal Showcase"
    >
      <div className="scroll-product-hero-inner">
        {/* Background Layer A (Active Base Gradient) */}
        <div
          className="scroll-hero-bg-layer"
          style={{ background: bgCurrent }}
          aria-hidden="true"
        />

        {/* Background Layer B (Cross-fade Incoming Gradient) */}
        <div
          className={`scroll-hero-bg-layer-incoming ${
            bgFadeActive ? "fade-in" : ""
          }`}
          style={{ background: bgNext }}
          aria-hidden="true"
        />

        {/* Header Spacer for top navigation clearance */}
        <div className="scroll-hero-header-spacer" aria-hidden="true" />

        {/* Giant Background Typography: Fixed "NANION" on Left, Horizontally Transitioning Word on Right */}
        <div
          className="scroll-hero-typography"
          aria-hidden="true"
          style={{ color: currentSlideData.textColor }}
        >
          <div className="scroll-hero-text-left">
            <span>{currentSlideData.textLeft}</span>
          </div>

          <div className="scroll-hero-text-gap" />

          <div className="scroll-hero-text-right">
            {ALL_HERO_SLIDES.map((slide, i) => {
              const isActive = i === activeSlide;
              const isPrev = i === prevSlide && isTransitioning;

              let animClass = "word-idle";
              if (isActive) {
                animClass = isTransitioning
                  ? direction === "next"
                    ? "word-enter-from-right"
                    : "word-enter-from-left"
                  : "word-active";
              } else if (isPrev) {
                animClass =
                  direction === "next"
                    ? "word-exit-to-left"
                    : "word-exit-to-right";
              }

              return (
                <span
                  key={slide.id}
                  className={`scroll-hero-right-word ${animClass}`}
                >
                  {slide.textRight}
                </span>
              );
            })}
          </div>
        </div>

        {/* Center Stage: Hero Product Horizontal Gliding Showcase */}
        <div className="scroll-hero-stage">
          {/* Luminous Studio Spotlight behind the active product */}
          <div className="scroll-hero-spotlight" aria-hidden="true" />

          {/* Soft ambient floating ground shadow underneath the product */}
          <div className="scroll-hero-ambient-shadow" aria-hidden="true" />

          <div className="scroll-hero-product-viewport">
            {ALL_HERO_SLIDES.map((slide, i) => {
              const isActive = i === activeSlide;
              const isPrev = i === prevSlide && isTransitioning;

              let animClass = "slide-idle";
              if (isActive) {
                animClass = isTransitioning
                  ? direction === "next"
                    ? "anim-enter-from-right"
                    : "anim-enter-from-left"
                  : "slide-active";
              } else if (isPrev) {
                animClass =
                  direction === "next"
                    ? "anim-exit-to-left"
                    : "anim-exit-to-right";
              }

              // Only render active or exiting slide for maximum DOM performance
              if (!isActive && !isPrev) return null;

              return (
                <div
                  key={slide.id}
                  className={`scroll-hero-product-item ${slide.imgClass || ""} ${animClass}`}
                >
                  <Link
                    to={`/products/${slide.slug}`}
                    aria-label={`View ${slide.name}`}
                    tabIndex={isActive ? 0 : -1}
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

          {/* Left Navigation Arrow */}
          <button
            type="button"
            className="scroll-hero-nav-arrow scroll-hero-nav-prev"
            onClick={goToPrev}
            aria-label="Previous product"
            title="Previous product"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            className="scroll-hero-nav-arrow scroll-hero-nav-next"
            onClick={goToNext}
            aria-label="Next product"
            title="Next product"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slide Indicator Bar & Counter at the bottom */}
          <div className="scroll-hero-indicator-container">
            <div
              className="scroll-hero-indicators"
              role="tablist"
              aria-label="All hero product slides"
            >
              {ALL_HERO_SLIDES.map((slide, idx) => (
                <button
                  key={`${activeSlide}-${slide.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  aria-label={`Slide ${idx + 1} of ${totalSlides}: ${slide.name}`}
                  title={`${slide.name} (${slide.category})`}
                  className={`scroll-hero-indicator-bar ${
                    activeSlide === idx ? "active" : ""
                  }`}
                  onClick={() =>
                    changeSlide(
                      idx,
                      idx > activeSlide ? "next" : "prev"
                    )
                  }
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
            aria-label="Scroll down to explore the rest of the home page"
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
