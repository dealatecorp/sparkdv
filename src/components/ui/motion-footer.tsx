"use client";

/** SPARK-DV adaptation of the supplied CinematicFooter.
 * Motion powers the original curtain, parallax and magnetic interactions so the
 * site shares one animation runtime with ProductShelf instead of adding GSAP.
 */
import {useRef,useState,type ReactNode} from 'react';
import {motion,useMotionValue,useReducedMotion,useScroll,useSpring,useTransform} from 'motion/react';
import {ArrowUp,ArrowUpRight,Pause,Play} from 'lucide-react';
import {Link} from 'react-router-dom';
import {cn} from '@/lib/utils';

function MagneticLink({href,children,primary=false}:{href:string;children:ReactNode;primary?:boolean}){
  const reduced=useReducedMotion();const x=useMotionValue(0),y=useMotionValue(0);const sx=useSpring(x,{stiffness:240,damping:22}),sy=useSpring(y,{stiffness:240,damping:22});
  return <motion.div style={{x:reduced?0:sx,y:reduced?0:sy}} onPointerMove={e=>{if(reduced||e.pointerType!=='mouse')return;const rect=e.currentTarget.getBoundingClientRect();x.set((e.clientX-rect.left-rect.width/2)*.12);y.set((e.clientY-rect.top-rect.height/2)*.12)}} onPointerLeave={()=>{x.set(0);y.set(0)}}>
    <Link to={href} className={cn('footer-glass-pill',primary&&'footer-primary-pill')}>{children}<ArrowUpRight size={18}/></Link>
  </motion.div>;
}
const marquee=['Pediatric & preventive dentistry','Science-led formulations','Made in India','Clinical resources'];
export function CinematicFooter(){
  const wrapper=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();const [paused,setPaused]=useState(false);
  const {scrollYProgress}=useScroll({target:wrapper,offset:['start end','end start']});const y=useTransform(scrollYProgress,[0,1],[60,-40]);
  return <footer className="cinematic-footer-wrapper">
    <div ref={wrapper} className="footer-curtain">
      <div className="footer-cinema">
        <div className="footer-bg-grid" aria-hidden="true"/>
        <motion.div className="footer-giant-bg-text" style={{y:reduced?0:y}} aria-hidden="true">SPARK-DV</motion.div>
        <div className="footer-marquee-frame"><div className={cn('footer-marquee-track',(paused||reduced)&&'paused')} aria-hidden="true">{[0,1].map(n=><div key={n}>{marquee.map(t=><span key={t}>{t}<i/></span>)}</div>)}</div><span className="sr-only">{marquee.join('. ')}</span><button aria-label={paused?'Play footer animation':'Pause footer animation'} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></div>
        <div className="footer-cinema-content"><img src="/images/logo.svg" alt="SPARK-DV" width="80" height="80" loading="lazy" style={{borderRadius: '50%'}}/><h2>Let’s move<br/>care forward.</h2><p>Better questions. Thoughtful formulations.<br/>A shared commitment to growing smiles.</p><div className="footer-primary-links"><MagneticLink href="/contact?type=Distributor%20enquiry" primary>Request distributor pricing</MagneticLink><MagneticLink href="/contact?type=Demo%20request">Book a clinical demo</MagneticLink></div><div className="footer-secondary-links"><Link to="/products">Explore products</Link><Link to="/dentists">For dentists</Link><Link to="/parents">For parents</Link></div></div>
        <div className="footer-legal"><span>© {new Date().getFullYear()} SPARK-DV. All rights reserved.</span><nav aria-label="Legal"><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms of service</Link><Link to="/shipping">Shipping & returns</Link></nav><button aria-label="Back to top" onClick={()=>{window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});document.querySelector<HTMLElement>('.brand')?.focus({preventScroll:true})}}><ArrowUp size={20}/></button></div>
      </div>
    </div>

  </footer>;
}
