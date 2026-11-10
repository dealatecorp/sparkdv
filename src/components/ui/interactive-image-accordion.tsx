import React, {useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowDown} from 'lucide-react';

const items = [
 {title:'Research',image:'/assets/campaigns/about-research.webp',alt:'Illustrative laboratory research scene',description:'Ideas shaped by science.'},
 {title:'Clinical care',image:'/assets/campaigns/contact-consultation.webp',alt:'Illustrative family consultation with a dentist',description:'Supporting dental professionals.'},
 {title:'Family care',image:'/assets/campaigns/about-family.webp',alt:'Illustrative parent helping a child brush',description:'Small habits. Everyday care.'},
 {title:'Community',image:'/assets/campaigns/about-community.webp',alt:'Illustrative school dental education workshop',description:'Sharing healthy habits.'},
 {title:'Our founder',image:'/assets/founder/founder-ajay-BGDk7WSG.webp',alt:'Dr. Ajay Reddy Mareddy, founder of SPARK-DV',description:'Dr. Ajay Reddy Mareddy'},
];
/** Adapted from the supplied expanding image accordion for SPARK-DV. */
export function LandingAccordionItem(){
 const [active,setActive]=useState(0);const buttons=useRef<(HTMLButtonElement|null)[]>([]);
 return <section className="about-accordion-hero wrap"><div className="about-accordion-copy"><h1>Ideas shaped<br/>by science.</h1><p>Innovation-led dental products for pediatric and preventive dentistry. Made in India, with a research-driven outlook.</p><a className="button button-dark" href="#editorial-content">Discover our story <ArrowDown size={17}/></a><Link className="text-link" to="/products">Explore our products</Link></div>
 <div className="about-frame-gallery" aria-label="Explore the SPARK-DV story">{items.map((item,index)=><button key={item.title} ref={el=>{buttons.current[index]=el;}} type="button" className="about-reactive-frame" data-active={index===active} aria-expanded={index===active} aria-label={item.title} onMouseEnter={()=>{if(window.matchMedia('(hover: hover)').matches)setActive(index);}} onFocus={()=>setActive(index)} onClick={()=>setActive(index)} onKeyDown={event=>{const direction=['ArrowRight','ArrowDown'].includes(event.key)?1:['ArrowLeft','ArrowUp'].includes(event.key)?-1:0;if(direction){event.preventDefault();buttons.current[(index+direction+items.length)%items.length]?.focus();}}}><img src={item.image} alt={item.alt} loading={index===0?'eager':'lazy'}/><span className="about-frame-shade"/><span className="about-frame-title">{item.title}</span><span className="about-frame-description">{item.description}</span></button>)}</div>
 </section>;
}
export default LandingAccordionItem;

