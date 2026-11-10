"use client";
import React, {useRef,useState,useEffect} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const STAGGER = .035;
/** The supplied letter-roll, with touch/focus support and one accessible label. */
export default function TextRoll({children, className, center = false}: {children: string; className?: string; center?: boolean}) {
  const reduced = useReducedMotion();
  const root=useRef<HTMLSpanElement>(null);
  const [focused,setFocused]=useState(false);
  useEffect(()=>{const link=root.current?.closest('a');const enter=()=>setFocused(true);const leave=()=>setFocused(false);link?.addEventListener('focus',enter);link?.addEventListener('blur',leave);return()=>{link?.removeEventListener('focus',enter);link?.removeEventListener('blur',leave);};},[]);
  return <motion.span ref={root} initial="initial" animate={focused?'hovered':'initial'} whileHover="hovered" whileTap="hovered" className={cn('text-roll', className)}>
    <span className="sr-only">{children}</span>
    {[false, true].map(bottom => <span key={String(bottom)} aria-hidden="true" className={bottom ? 'text-roll-layer text-roll-bottom' : 'text-roll-layer'}>
      {Array.from(children).map((letter, i) => <motion.span key={i} style={{display:'inline-block', whiteSpace:'pre'}} variants={{initial:{y: bottom ? '100%' : 0}, hovered:{y: reduced ? (bottom ? '100%' : 0) : bottom ? 0 : '-100%'}}} transition={{duration: reduced ? 0 : .3, ease:'easeInOut', delay: reduced ? 0 : STAGGER * (center ? Math.abs(i - (children.length - 1)/2) : i)}}>{letter}</motion.span>)}
    </span>)}
  </motion.span>;
}

