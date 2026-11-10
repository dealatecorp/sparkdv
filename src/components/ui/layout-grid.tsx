"use client";
import React,{useEffect,useRef} from 'react';
import {motion,useReducedMotion,LayoutGroup} from 'motion/react';
import {X,ArrowUpRight} from 'lucide-react';
import {cn} from '@/lib/utils';

type Card={id:string;title:string;category:string;thumbnail:string;content:React.ReactNode;className?:string};
export function LayoutGrid({cards,selectedId,onSelect,onClose}:{cards:Card[];selectedId:string|null;onSelect:(id:string)=>void;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const reduce=useReducedMotion();const selected=cards.find(card=>card.id===selectedId);
 useEffect(()=>{const el=dialog.current;if(!el)return;if(selected){el.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{el.close();document.body.style.overflow=previous;};}el.close();},[selected]);
 return <LayoutGroup id="science-layout"><div className="science-layout-grid">{cards.map(card=><motion.button type="button" key={card.id} layoutId={`card-${card.id}`} className={cn('science-layout-card',card.className)} onClick={()=>onSelect(card.id)} aria-label={`Read ${card.title}`} transition={{duration:reduce?0:.35}}><motion.img layoutId={`image-${card.id}`} src={card.thumbnail} alt={card.title} loading="lazy"/><span className="science-layout-caption"><span>{card.category}</span><strong>{card.title}</strong><span>Read article <ArrowUpRight size={17}/></span></span></motion.button>)}</div>
 <dialog ref={dialog} className="science-article-dialog" aria-labelledby="science-dialog-title" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===event.currentTarget)onClose();}}>{selected&&<motion.article layoutId={`card-${selected.id}`} transition={{duration:reduce?0:.35}} className="science-expanded-article"><div className="science-dialog-toolbar"><span>{selected.category}</span><button type="button" aria-label="Close article" onClick={onClose} autoFocus><X size={22}/></button></div><motion.img layoutId={`image-${selected.id}`} className="science-dialog-image" src={selected.thumbnail} alt={selected.title}/><div className="science-dialog-copy"><h2 id="science-dialog-title">{selected.title}</h2><p className="science-article-credit">SPARK-DV · Science & product information</p>{selected.content}</div></motion.article>}</dialog>
 </LayoutGroup>;
}
