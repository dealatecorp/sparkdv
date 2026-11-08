"use client";

/** Adapted from the user-supplied Perspective Tunnel Hero.
 * Original product photography, native scroll, and the existing Motion runtime.
 * CSS perspective moves product photographs; the headline uses a 2D liquid shader.
 */
import {motion, useTransform, useMotionValue, useSpring, useScroll, useInView, type MotionValue} from 'motion/react';
import {useEffect, useRef, useState, type RefObject} from 'react';
import {Link} from 'react-router-dom';
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import LiquidText from './liquid-text';
import {useLiveReducedMotion} from './liquid-text-utils';

export type TunnelProduct = {slug: string; title: string; src: string; width: number; height: number};
type StageDimensions = {width: number; height: number; isMobile: boolean};
const SPRING_CONFIG = {stiffness:60,damping:25,mass:.5};

function useCameraParallax(stage: RefObject<HTMLDivElement>, enabled: boolean) {
  const rawX=useMotionValue(0),rawY=useMotionValue(0);
  const x=useSpring(rawX,SPRING_CONFIG),y=useSpring(rawY,SPRING_CONFIG);
  useEffect(()=>{
    const el=stage.current;
    if(!el||!enabled){rawX.set(0);rawY.set(0);return;}
    const move=(event:PointerEvent)=>{
      if(event.pointerType!=='mouse')return;
      const rect=el.getBoundingClientRect();
      rawX.set(((event.clientX-rect.left)/rect.width-.5)*2);
      rawY.set(((event.clientY-rect.top)/rect.height-.5)*2);
    };
    const reset=()=>{rawX.set(0);rawY.set(0);};
    el.addEventListener('pointermove',move,{passive:true});el.addEventListener('pointerleave',reset);
    return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);};
  },[stage,enabled,rawX,rawY]);
  return {x,y};
}

function TunnelCard({item,index,progress,pointer,stage,flat}: {item:TunnelProduct;index:number;progress:MotionValue<number>;pointer:{x:MotionValue<number>;y:MotionValue<number>};stage:StageDimensions;flat:boolean}) {
  const goldenAngle=(index*137.5-135)*(Math.PI/180);
  // Keep a clear reading area in the middle while retaining the supplied spiral.
  const angleCos=Math.cos(goldenAngle);
  const baseX=Math.sign(angleCos)*stage.width*(.36+Math.abs(angleCos)*.06);
  const baseY=[-1,0,1,-1,1,0][index%6]*stage.height*.34;
  const rotationZ=(index%2===0?-1:1)*(3+(index%4)*2);
  const z=useTransform(progress,[0,1],[-430+index*43,-180+index*15]);
  const transform=useTransform([z,pointer.x,pointer.y],([depth,px,py]:number[])=>`translate3d(calc(-50% + ${baseX-px*23}px), calc(-50% + ${baseY-py*18}px), ${depth}px) rotateZ(${rotationZ}deg)`);
  const cardWidth=stage.isMobile?Math.min(210,Math.max(175,stage.width*.54)):Math.min(245,Math.max(175,stage.width*.165));
  return <motion.div className="tunnel-card" style={{width:flat?undefined:cardWidth,transform:flat?'none':transform,zIndex:index+1}} data-product={item.slug}>
    <Link className="tunnel-product" to={`/products/${item.slug}`} aria-label={`Explore ${item.title}`}>
      <div className="tunnel-product-photo"><img src={item.src} srcSet={item.width>640?`${item.src.replace('product.webp','product-640.webp')} 640w, ${item.src} ${item.width}w`:undefined} sizes="(max-width: 760px) 210px, 260px" width={item.width} height={item.height} alt={`${item.title} — original product photograph`} loading={index<3?'eager':'lazy'} {...{fetchpriority:index===0?'high':undefined}} draggable={false}/></div>
      <div className="tunnel-product-caption"><span>{item.title}</span><ArrowUpRight size={15}/></div>
    </Link>
  </motion.div>;
}

export default function PerspectiveTunnelHero({products}: {products:TunnelProduct[]}) {
  const containerRef=useRef<HTMLElement>(null),stageRef=useRef<HTMLDivElement>(null),galleryRef=useRef<HTMLDivElement>(null);
  const reduce=useLiveReducedMotion();
  const [stage,setStage]=useState<StageDimensions>({width:innerWidth,height:innerHeight-110,isMobile:innerWidth<=760});
  const visible=useInView(stageRef);
  const flat=!!reduce||stage.isMobile;
  useEffect(()=>{
    if(!stageRef.current)return;
    const observer=new ResizeObserver(([entry])=>{setStage({width:entry.contentRect.width,height:entry.contentRect.height,isMobile:innerWidth<=760});});
    observer.observe(stageRef.current);return()=>observer.disconnect();
  },[]);
  const {scrollYProgress}=useScroll({target:containerRef,offset:['start start','end end']});
  const progress=useSpring(scrollYProgress,{stiffness:80,damping:30,restDelta:.001});
  const pointer=useCameraParallax(stageRef,visible&&!flat);
  const titleScale=useTransform(progress,[0,1],[1,1.045]);
  const moveGallery=(direction:number)=>galleryRef.current?.scrollBy({left:direction*(stage.width*.62),behavior:reduce?'instant':'smooth'});

  return <section ref={containerRef} className={`perspective-tunnel-hero${flat?' tunnel-flat':''}`} aria-labelledby="tunnel-title">
    <div ref={stageRef} className="perspective-tunnel-stage">
      <div className="tunnel-guides" aria-hidden="true"><i/><i/></div>
      <motion.div className="tunnel-anchor" style={{scale:flat?1:titleScale}}>
        <h1 id="tunnel-title"><LiquidText text="Small details." color="#073763" highlight="#527ca0" fontSize={84} viscosity={0.62}/><LiquidText text="Brighter futures." color="#ad4b09" highlight="#f2a04b" fontSize={84} viscosity={0.62}/></h1>
        <p>Innovating the future of pediatric<br/>& preventive dentistry.</p>
        <div className="tunnel-actions"><Link className="button button-dark" to="/products">Explore products <ArrowUpRight size={18}/></Link><Link className="tunnel-specialist" to="/contact?type=Clinical%20enquiry">Talk to a specialist <ArrowRight size={17}/></Link></div>
      </motion.div>
      <div className="tunnel-mobile-controls"><span>Explore the product range</span><div><button type="button" aria-label="Previous products" onClick={()=>moveGallery(-1)}><ArrowLeft size={18}/></button><button type="button" aria-label="Next products" onClick={()=>moveGallery(1)}><ArrowRight size={18}/></button></div></div>
      <div ref={galleryRef} className="tunnel-space" aria-label="Featured SPARK-DV products">
        {products.map((item,index)=><TunnelCard key={item.slug} item={item} index={index} progress={progress} pointer={pointer} stage={stage} flat={flat}/>)}
      </div>
      <div className="tunnel-foot"><span>Science in every detail.</span><a href="#home-research">Scroll to explore <ArrowDown size={16}/></a><span>Original SPARK-DV products</span></div>
    </div>
  </section>;
}
