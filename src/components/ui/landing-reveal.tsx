import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import GlassIconReveal from './liquid-glass-logo-reveal';

/** No persisted seen flag: each landing-page mount and browser reload replays. */
export default function LandingReveal(){
  const [visible,setVisible]=useState(true);const reduce=useReducedMotion();
  useEffect(()=>{const timer=setTimeout(()=>setVisible(false),reduce?700:3100);return()=>clearTimeout(timer)},[reduce]);
  useEffect(()=>{if(!visible)return;const root=document.getElementById('root');const old=root?.inert;const overflow=document.body.style.overflow;if(root)root.inert=true;document.body.style.overflow='hidden';const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setVisible(false)};document.addEventListener('keydown',key);return()=>{if(root)root.inert=old||false;document.body.style.overflow=overflow;document.removeEventListener('keydown',key)}},[visible]);
  return createPortal(<AnimatePresence>{visible&&<motion.div className="landing-reveal" data-testid="landing-reveal" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:reduce?0:.35}}>
    {reduce?<img className="reveal-static-logo" src="/images/logo.png" alt="SPARK-DV"/>:<GlassIconReveal logo="/images/logo.png" label="SPARK-DV glass logo reveal" className="landing-glass" background="#fffcf8" originalColors loop={false} tileSize={260} speed={1.4} tuning={{present:1.6,glide:1.4,startZoom:1.7}}/>}
    <p>Innovating the future of dental care.</p><button autoFocus className="reveal-skip" onClick={()=>setVisible(false)}>Enter SPARK-DV <span aria-hidden="true">↗</span></button>
  </motion.div>}</AnimatePresence>,document.body);
}
