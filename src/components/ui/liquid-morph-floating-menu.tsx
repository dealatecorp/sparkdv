"use client";

import {useState, useRef, useEffect, useId, type ReactNode} from 'react';
import {motion, useReducedMotion} from 'motion/react';

const ease=[0.22,1,0.36,1] as const;
type MenuItem={label:string;count?:number;selected?:boolean;onClick?:()=>void};

function MenuButton({item,index,isOpen}:{item:MenuItem;index:number;isOpen:boolean}) {
  const [hovered,setHovered]=useState(false);
  const reduced=useReducedMotion();
  return <motion.button type="button" className={`liquid-menu-item ${item.selected?'filter-active':''}`}
    aria-label={`${item.label}${item.count==null?'':`, ${item.count} products`}`} aria-pressed={!!item.selected}
    onClick={item.onClick} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    onFocus={()=>setHovered(true)} onBlur={()=>setHovered(false)}
    animate={{opacity:isOpen?1:0}} transition={{duration:reduced?0:.4,delay:reduced?0:isOpen?.25+.06*index:0,ease}}>
    <span className="liquid-menu-word" aria-hidden="true">{Array.from(item.label).map((char,i)=><span className="liquid-menu-char" key={i}><span style={{transform:hovered&&!reduced?'translateY(-50%)':'translateY(0)',transitionDuration:reduced?'0ms':'800ms',transitionDelay:reduced?'0ms':`${i*20}ms`}}><span>{char===' '?'\u00a0':char}</span><span>{char===' '?'\u00a0':char}</span></span></span>)}</span>
    {item.count!=null&&<span className="liquid-menu-count" aria-hidden="true">{item.count}</span>}
  </motion.button>;
}

/** Supplied liquid-morph menu, adapted to catalogue filters and native controls. */
export default function FloatingMenu({items,children}:{items:MenuItem[];children?:ReactNode}) {
  const [isOpen,setIsOpen]=useState(false);
  const container=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null);
  const reduced=useReducedMotion();
  const id=useId();
  useEffect(()=>{
    if(!isOpen)return;
    const focusFrame=requestAnimationFrame(()=>container.current?.querySelector<HTMLButtonElement>('.liquid-menu-item')?.focus());
    const outside=(e:PointerEvent)=>{if(!container.current?.contains(e.target as Node))setIsOpen(false)};
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();setIsOpen(false);trigger.current?.focus()}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key);
    return()=>{cancelAnimationFrame(focusFrame);document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key)};
  },[isOpen]);
  return <div className="liquid-product-menu" ref={container} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setIsOpen(false)}}>
    <motion.div className="liquid-menu-shell" initial={false}
      animate={{width:isOpen?360:186,height:isOpen?458:52,borderRadius:isOpen?32:72}}
      transition={{duration:reduced?0:.8,ease,height:{duration:reduced?0:isOpen?.8:.2}}}>
      <div className="liquid-menu-base" aria-hidden="true"/>
      <motion.div className="liquid-menu-wave" aria-hidden="true" initial={false} animate={{bottom:isOpen?'-20%':'-200%'}} transition={{duration:reduced?0:.8,ease,delay:reduced?0:isOpen?.1:0}}/>
      <div id={id} className="liquid-menu-options" hidden={!isOpen}>
        <div className="liquid-menu-categories" role="group" aria-label="Product categories">{items.map((item,index)=><MenuButton key={item.label} item={{...item,onClick:()=>{item.onClick?.();setIsOpen(false);trigger.current?.focus()}}} index={index} isOpen={isOpen}/>)}</div>
        <div className="liquid-menu-tools">{children}</div>
      </div>
      <button ref={trigger} type="button" className="liquid-menu-toggle" aria-expanded={isOpen} aria-controls={id} onClick={()=>setIsOpen(v=>!v)} style={{color:isOpen?'#fffcf8':'#073763'}}>
        <span>{isOpen?'Close filters':'Product menu'}</span>
        <span className="liquid-menu-bars" aria-hidden="true">{[-1,1].map(direction=><motion.span key={direction} initial={false} animate={{rotate:isOpen?direction*45:0,y:isOpen?0:direction*3}} transition={{duration:reduced?0:.4,ease}}/>)}</span>
      </button>
    </motion.div>
  </div>;
}
