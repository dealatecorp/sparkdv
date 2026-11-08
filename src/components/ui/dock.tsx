'use client';

// Adapted from the supplied dock: proximity-driven spring magnification,
// with natural navigation controls and widths sized for text rather than icons.
import {createContext, useContext, useRef, type ReactNode} from 'react';
import {motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue, type SpringOptions} from 'motion/react';
import {cn} from '@/lib/utils';

type DockContextValue = {mouseX: MotionValue<number>; distance: number; magnification: number; spring: SpringOptions; reduced: boolean};
const DockContext = createContext<DockContextValue | null>(null);
const DEFAULT_SPRING = {mass:0.1,stiffness:150,damping:12};

export function Dock({children,className,distance=150,magnification=1.16,spring=DEFAULT_SPRING}: {
  children:ReactNode;className?:string;distance?:number;magnification?:number;spring?:SpringOptions;
}) {
  const mouseX=useMotionValue(Infinity);
  const reduced=!!useReducedMotion();
  return <DockContext.Provider value={{mouseX,distance,magnification,spring,reduced}}>
    <motion.div className={cn('text-dock',className)}
      onPointerMove={e=>{if(e.pointerType==='mouse'&&!reduced)mouseX.set(e.clientX)}}
      onPointerLeave={()=>mouseX.set(Infinity)}>
      {children}
    </motion.div>
  </DockContext.Provider>;
}

export function DockItem({children,className,baseWidth=90}: {children:ReactNode;className?:string;baseWidth?:number}) {
  const context=useContext(DockContext);
  if(!context)throw new Error('DockItem must be inside Dock');
  const {mouseX,distance,magnification,spring,reduced}=context;
  const ref=useRef<HTMLDivElement>(null);
  const focus=useMotionValue(0);
  const proximity=useTransform(mouseX,x=>{
    const rect=ref.current?.getBoundingClientRect();
    return rect ? Math.max(0,1-Math.abs(x-rect.x-rect.width/2)/distance) : 0;
  });
  const amount=useTransform(()=>reduced ? 0 : Math.max(proximity.get(),focus.get()));
  const targetWidth=useTransform(amount,[0,1],[baseWidth,baseWidth*magnification]);
  const targetY=useTransform(amount,[0,1],[0,-4]);
  const targetFont=useTransform(amount,[0,1],[14,15.5]);
  const width=useSpring(targetWidth,spring),y=useSpring(targetY,spring),fontSize=useSpring(targetFont,spring);
  return <motion.div ref={ref} className={cn('text-dock-item',className)} style={{width,y,fontSize}}
    onFocus={e=>{if(e.target.matches(':focus-visible'))focus.set(1)}}
    onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))focus.set(0)}}>{children}</motion.div>;
}
