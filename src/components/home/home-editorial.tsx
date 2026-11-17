import { BrandWordmark, brandText } from '@/components/ui/brand-wordmark';
import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';

const chapters = [
  {label:'Antibacterial action', title:'Start with the science.', text:'Explore the role of NanoSilver Fluoride in our approach to preventive dentistry, beginning with its antibacterial mechanism.', image:'/assets/research/nsf-antibacterial-diagram-Dp4Pyfpy.webp', caption:'NanoSilver Fluoride · Original SPARK-DV mechanism illustration.', link:'Read about the mechanism'},
  {label:'Biofilm disruption', title:'Look beneath the surface.', text:'Our research explores how nano-sized particles interact with dental biofilm. The original material illustrates the formulation and delivery approach.', image:'/assets/research/nsf-biofilm-diagram-LxLNoosV.webp', caption:'Formulation & delivery · Original SPARK-DV research illustration.', link:'Explore the research'},
  {label:'Remineralization', title:'Connect research to care.', text:'Discover how fluoride and silver are discussed in our approach to enamel protection, alongside product-specific indications and professional guidance.', image:'/assets/research/nsf-remineralization-diagram-wFf-cVns.webp', caption:'Enamel protection · Original SPARK-DV mechanism illustration.', link:'Meet the science'},
];

export function HomeResearchStory() {
  const [active,setActive]=useState(0);
  const [compact,setCompact]=useState(()=>matchMedia('(max-width: 900px)').matches);
  const reduce=useReducedMotion();
  const articles=useRef<(HTMLElement|null)[]>([]);
  const region=useRef<HTMLElement>(null);
  const frame=useRef(0);
  useEffect(()=>{
    const media=matchMedia('(max-width: 900px)');const update=()=>setCompact(media.matches);
    media.addEventListener('change',update);return()=>media.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    if(compact || reduce)return;
    let watching=false;
    const update=()=>{
      cancelAnimationFrame(frame.current);
      frame.current=requestAnimationFrame(()=>{
        if(!watching)return;
        let nearest=0,distance=Infinity;
        articles.current.forEach((article,index)=>{if(!article)return;const r=article.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-innerHeight*.52);if(d<distance){distance=d;nearest=index;}});
        setActive(nearest);
      });
    };
    const observer=new IntersectionObserver(([entry])=>{watching=entry.isIntersecting;if(watching){addEventListener('scroll',update,{passive:true});update();}else removeEventListener('scroll',update);});
    if(region.current)observer.observe(region.current);
    return()=>{observer.disconnect();removeEventListener('scroll',update);cancelAnimationFrame(frame.current);};
  },[compact,reduce]);
  const choose=(index:number)=>{
    setActive(index);
    if(!compact&&!reduce)articles.current[index]?.scrollIntoView({behavior:'smooth',block:'center'});
  };
  return <section ref={region} id="home-research" className={`home-research${reduce?' is-reduced':''}`} aria-labelledby="home-research-title">
    <div className="wrap home-research-intro"><h2 id="home-research-title">Better care begins<br/>with better questions.</h2><p>Clinical insight and formulation research, brought together. Take a closer look at the thinking behind our preventive portfolio.</p></div>
    <div className="wrap home-research-spread">
      <div className="home-research-visual">
        <div className="home-research-tabs" aria-label="Choose a science topic">
          {chapters.map((chapter,index)=><button type="button" key={chapter.label} aria-pressed={active===index} onClick={()=>choose(index)}>{chapter.label}</button>)}
        </div>
        <figure>
          <div className="home-research-images">
            <AnimatePresence initial={false} mode="wait"><motion.img key={chapters[active].image} src={chapters[active].image} alt={chapters[active].caption} loading="lazy" initial={reduce?false:{opacity:0,clipPath:'inset(0% 0% 0% 4%)'}} animate={{opacity:1,clipPath:'inset(0% 0% 0% 0%)'}} exit={{opacity:0,transition:{duration:reduce?0:.1}}} transition={{duration:reduce?0:.3,ease:[.16,1,.3,1]}}/></AnimatePresence>
          </div>
          <figcaption>{brandText(chapters[active].caption)}</figcaption>
        </figure>
      </div>
      <div className="home-research-copy">
        {chapters.map((chapter,index)=><article key={chapter.label} ref={el=>{articles.current[index]=el;}} className={active===index?'is-active':''} hidden={(compact||!!reduce)&&active!==index}>
          <h3>{chapter.title}</h3><p>{chapter.text}</p><Link className="text-link" to="/science">{chapter.link} <ArrowUpRight size={18}/></Link>
        </article>)}
      </div>
    </div>
    <div className="home-research-foot wrap"><span>Science-led formulations</span><span>Practical clinical protocols</span><span>Safety & quality</span></div>
  </section>;
}

export function HomeCommunity() {
  const reduce=useReducedMotion();
  return <section className="home-community wrap">
    <figure><motion.div initial={false} whileInView={reduce?undefined:{clipPath:['inset(5% 0% 5% 0%)','inset(0% 0% 0% 0%)']}} viewport={{once:true,amount:.25}} transition={{duration:.7,ease:[.16,1,.3,1]}}><img src="/assets/campaigns/school-program.webp" alt="Original SPARK-DV school dental health program photograph" loading="lazy" width="690" height="460"/></motion.div><figcaption>Care beyond the clinic. The <BrandWordmark /> school program.</figcaption></figure>
    <div><h2>A healthier future.<br/>One school at a time.</h2><p>Our School Dental Health Preventive Program brings preventive care and oral-health education to students, in partnership with dental professionals.</p><Link className="text-link" to="/school-program">Discover the program <ArrowUpRight size={18}/></Link></div>
  </section>;
}
