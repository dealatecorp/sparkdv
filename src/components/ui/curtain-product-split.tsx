"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CurtainPhoto = { src: string; alt: string };
type Stage = { width: number; height: number; isMobile: boolean };

type Props = {
  progress: MotionValue<number>;
  photos: CurtainPhoto[];
};

const SPRING = { stiffness: 65, damping: 22, mass: 0.5 };

function CurtainPhotoCard({
  photo,
  index,
  total,
  progress,
  pointerX,
  pointerY,
  stage,
  reduced,
}: {
  photo: CurtainPhoto;
  index: number;
  total: number;
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  stage: Stage;
  reduced: boolean;
}) {
  const half = total / 2;
  const isLeft = index % 2 === 0;
  const wingIndex = Math.floor(index / 2);
  const norm = wingIndex / (half - 1) - 0.5;
  const side = isLeft ? -1 : 1;
  const width = stage.isMobile ? Math.min(82, stage.width * .175) : Math.min(196, stage.width * .16);
  // Four desktop rows must fit even on short screens, including tilt and gaps.
  const height = stage.isMobile ? Math.min(width * 1.55, (stage.height - 130) / half - 14) : Math.min(width * 1.25, (stage.height - 160) / half);
  const arch = Math.cos(norm * Math.PI) * stage.width * 0.025;
  const targetX = stage.isMobile ? side * stage.width * .395 : side * (stage.width * .37 + arch);
  const targetY = stage.isMobile
    ? (wingIndex - (half - 1) / 2) * (height + 18)
    : (wingIndex - (half - 1) / 2) * (height + 32);
  const initialX = side * wingIndex * 4;
  const initialY = norm * 10;
  const reveal = useTransform(progress, (value) => (reduced ? 1 : value));
  const x = useTransform([reveal, pointerX], ([p, px]: number[]) => {
    const ease = 1 - Math.pow(1 - p, 3);
    const parallax = stage.isMobile ? 8 : 16;
    return stage.isMobile ? targetX : initialX + (targetX - initialX) * ease + px * (isLeft ? -parallax : parallax) * ease;
  });
  const y = useTransform([reveal, pointerY], ([p, py]: number[]) => {
    const ease = 1 - Math.pow(1 - p, 3);
    return targetY + (stage.isMobile ? 0 : py * 14 * ease);
  });
  const rotate = useTransform(reveal, [0, 0.45, 1], [side * wingIndex, (isLeft ? -1 : 1) * (stage.isMobile ? 1 : 2), side * norm * (stage.isMobile ? 3 : 6)]);
  const scale = useTransform(reveal, [0, 0.5, 1], [0.18, 0.98, 1]);
  const opacity = useTransform(reveal, [0, 0.16, 0.48], [0, 0.82, 1]);

  return (
    <div
      className="curtain-photo-anchor"
      style={{ width, height, zIndex: isLeft ? index + 1 : total - index }}
    >
      <motion.div className="curtain-photo-card" style={{ x, y, rotate, scale, opacity }}>
        <img src={photo.src} alt="" draggable={false} loading="lazy" decoding="async" />
        <span aria-hidden="true">{photo.alt}</span>
      </motion.div>
    </div>
  );
}

/** Original product photos open as a curtain around the headline on scroll. */
export default function CurtainProductSplit({ progress, photos }: Props) {
  const reduced = useReducedMotion() ?? false;
  const [stage, setStage] = useState<Stage>({ width: 1000, height: 700, isMobile: false });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, SPRING);
  const pointerY = useSpring(rawY, SPRING);
  const layerRef = useRef<HTMLDivElement>(null);
  const visiblePhotos = photos.slice(0, 8);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const update = () => {
      const rect = layer.getBoundingClientRect();
      setStage({ width: rect.width, height: rect.height, isMobile: rect.width < 768 });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(layer);
    return () => observer.disconnect();
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const resetPointer = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={layerRef}
      className="shop-prism-curtain-layer"
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      {visiblePhotos.map((photo, index) => (
        <CurtainPhotoCard
          key={`${photo.src}-${index}`}
          photo={photo}
          index={index}
          total={visiblePhotos.length}
          progress={progress}
          pointerX={pointerX}
          pointerY={pointerY}
          stage={stage}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
