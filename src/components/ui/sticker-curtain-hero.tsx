import { useRef, useState, type PointerEvent } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring, type MotionStyle } from 'motion/react';
import StickerSwapHeadline from './sticker-swap-headline';
import CurtainProductSplit from './curtain-product-split';

export default function StickerCurtainHero({photos}: {photos: {src: string; alt: string}[]}) {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const textX = useSpring(0, { stiffness: 90, damping: 22 });
  const textY = useSpring(0, { stiffness: 90, damping: 22 });
  const textTilt = useTransform(textX, [-12, 12], [-1, 1]);
  const resetText = () => { textX.set(0); textY.set(0); };
  const followCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    textX.set(((event.clientX - rect.left) / rect.width - .5) * 24);
    textY.set(((event.clientY - rect.top) / rect.height - .5) * 14);
  };
  const {scrollYProgress} = useScroll({target: root, offset: ['start start', 'end end']});
  const progress = useTransform(scrollYProgress, [0, .8], [.45, 1]);
  return <section ref={root} className="shop-sticker-hero" aria-label="SPARK-DV products">
    <motion.div className="shop-sticker-stage" onPointerMove={followCursor} onPointerLeave={resetText} style={{'--hero-text-x': textX, '--hero-text-y': textY, '--hero-text-tilt': textTilt} as MotionStyle}>
      <div className="shop-sticker-brand">SPARK-DV</div>
      <div className="shop-sticker-curtain"><CurtainProductSplit progress={progress} photos={photos}/></div>
      <StickerSwapHeadline className="shop-sticker-headline" lead="BETTER" words={[
        {word: 'TOMORROWS', sticker: photos[0].src, alt: photos[0].alt, tilt: -8},
        {word: 'ORAL CARE', sticker: photos[2].src, alt: photos[2].alt, tilt: 6},
        {word: 'PROTECTION', sticker: photos[1].src, alt: photos[1].alt, tilt: -4},
      ]} description="Small details. Brighter futures." primaryCta={{label: 'Shop products ↗', href: '/products'}} secondaryCta={{label: 'Explore the range', href: '#featured-products'}} paper="transparent" ink="#073763" accent="#ad4b09" height="100%" interval={paused || reduced ? 0 : 4200}/>
      <div className="shop-sticker-controls"><span>Scroll to open the product curtain</span>{!reduced && <button type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused ? 'Play headline' : 'Pause headline'}</button>}</div>
    </motion.div>
  </section>;
}
