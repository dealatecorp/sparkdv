import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Plus, Minus, Quote } from 'lucide-react';
import '@fontsource/newsreader/latin-600.css';
import '@fontsource/newsreader/latin-600-italic.css';
import { init } from '../motion/prs-about.js';
import { CinematicList } from './components/ui/cinematic-list';
import './about.css';

const pictures = [
  {src:'/assets/campaigns/about-family.webp', alt:'Illustrative parent and child practising toothbrushing', label:'Everyday care'},
  {src:'/assets/products/nanion-lite-pro/product.webp', alt:'Original Nanion Lite Pro packaging', label:'Nanion Lite Pro', product:true},
  {src:'/assets/founder/founder-ajay-BGDk7WSG.webp', alt:'Dr. Ajay Reddy Mareddy', label:'Our founder'},
  {src:'/assets/campaigns/about-research.webp', alt:'Illustrative dental materials research laboratory', label:'Research'},
  {src:'/assets/campaigns/about-community.webp', alt:'Illustrative dental education workshop', label:'Shared knowledge'},
  {src:'/assets/products/nanion-swish/product.webp', alt:'Original Nanion Swish packaging', label:'Nanion Swish', product:true},
  {src:'/assets/campaigns/contact-consultation.webp', alt:'Illustrative dentist consultation with a family', label:'Clinical care'},
  {src:'/assets/products/nanion-elite/product.webp', alt:'Original Nanion Elite product photograph', label:'Nanion Elite', product:true},
  {src:'/assets/campaigns/school-program.webp', alt:'SPARK-DV school dental health assessment', label:'In the community'},
];
const values = [
  {title:'Science-led', text:'Our R&D-driven approach brings clinical insight and dental materials research into product development.', image:pictures[3]},
  {title:'Patient-centered', text:'We design solutions that prioritize patient comfort, safety, and outcomes.', image:pictures[6]},
  {title:'Innovation', text:'Exploring nanotechnology to address real challenges in pediatric and preventive dentistry.', image:pictures[1]},
  {title:'Quality-first', text:'A commitment to manufacturing excellence. Made in India, with products developed for clinical relevance.', image:pictures[7]},
];

export default function AboutPage() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => init(root.current), []);
  return <div ref={root} className="spark-about">
    <section className="about-manifesto" data-motion="prs-about" aria-labelledby="about-page-title">
      <div className="about-manifesto-stage">
        {/* Dynamic Logo Color Background Layers for smooth GPU crossfade */}
        <div className="about-hero-bg-layer about-hero-bg-0" aria-hidden="true" />
        <div className="about-hero-bg-layer about-hero-bg-1" aria-hidden="true" />
        <div className="about-hero-bg-layer about-hero-bg-2" aria-hidden="true" />
        {/* Logo Spectrum Ambient Glow Orbs: Navy, Orange, Violet, Crimson, Cyan, Gold */}
        <div className="about-hero-glow-mesh" aria-hidden="true">
          <span className="glow-orb glow-navy" />
          <span className="glow-orb glow-orange" />
          <span className="glow-orb glow-violet" />
          <span className="glow-orb glow-crimson" />
          <span className="glow-orb glow-cyan" />
          <span className="glow-orb glow-gold" />
        </div>

        <div className="about-manifesto-top"><h1 id="about-page-title">About SPARK-DV</h1><span>Made in India. R&D-driven.</span></div>
        <div className="about-manifesto-message"><div className="about-statement-window" aria-hidden="true">
          {['Dental science. Everyday care.', 'Prevention. Restoration. Care.', 'Small details. Brighter futures.'].map((line,i)=><div className="about-statement-line" data-motion-item key={line} data-index={i}>{line}</div>)}
        </div><p className="about-product-intro">Discover Nanion toothpaste, mouthrinse, and our range of professional dental products.</p>
        <Link className="about-hero-shop" to="/products">Explore our products <ArrowUpRight size={18}/></Link>
        </div>
        <p className="sr-only">Dental science. Everyday care. Prevention. Restoration. Care. Small details. Brighter futures.</p>
        <div className="about-manifesto-bottom"><span>Pediatric & preventive dentistry</span><a href="#about-story">Discover our story <ArrowDown size={18}/></a><div className="about-sequence-progress" aria-label="Slide sequence" role="tablist"><button type="button" aria-label="Slide 1" data-index="0" /><button type="button" aria-label="Slide 2" data-index="1" /><button type="button" aria-label="Slide 3" data-index="2" /></div></div>
      </div>
    </section>

    <section className="about-story-panel" id="about-story" aria-labelledby="about-story-title">
      <div className="about-story-intro"><h2 id="about-story-title">Small details.<br/>Lasting purpose.</h2><div><p>We believe clinically oriented, evidence-led products can transform how we approach dental care.</p><p>SPARK-DV brings an R&D-driven outlook to caries management, pediatric endodontics, and restorative care. Developed in India, for everyday practice.</p><Link to="/products" className="about-arrow-link">Discover our products <ArrowUpRight/></Link></div></div>
      <div className="about-founder-section" aria-labelledby="about-founder-title">
        <h2 id="about-founder-title" className="about-founder-heading">Meet <span className="about-founder-script">the</span><br/>Founder<span aria-hidden="true">.</span></h2>
        <figure className="about-founder-portrait"><img src="/assets/founder/founder-ajay-BGDk7WSG.webp" alt="Dr. Ajay Reddy Mareddy, founder of SPARK-DV" width="768" height="1152" loading="lazy"/><figcaption>Dr. Ajay Reddy Mareddy<span>Founder & Managing Director</span></figcaption></figure>
        <div className="about-founder-copy"><Quote className="about-founder-quote" size={44} strokeWidth={1.5} aria-hidden="true"/><h3>Clinical insight.<br/>A personal commitment.</h3><p>A practicing dentist and academic researcher, Dr. Ajay Reddy Mareddy works at the intersection of patient care, dental biomaterials, and minimally invasive treatment.</p><p>His work brings clinical insight and product innovation together, with research in pediatric and preventive dentistry shaping SPARK-DV’s approach to everyday care.</p>
          <details className="about-founder-details"><summary>Research & innovation <Plus size={18}/></summary><p>His innovation journey includes publicly available WIPO patent publications WO2009098710A1 (Formocresol gel) and WO2015155629A1 (Saturation method of a drug for dental), exploring dental materials and delivery systems.</p><p>His research includes nanosilver fluoride, silver diamine fluoride, dental sealants, and remineralization-focused care.</p><Link className="about-arrow-link" to="/science">Explore our blogs <ArrowUpRight size={18}/></Link></details>
          <Link className="about-founder-contact" to="/contact">Connect with SPARK-DV <ArrowUpRight size={18}/></Link>
        </div>
      </div>
    </section>

    <section className="about-collage-section" aria-labelledby="about-collage-title">
      <h2 id="about-collage-title">The people.<br/>The purpose.</h2>
      <div className="about-photo-board" data-motion="prs-collage">
        {pictures.map((p,i)=><figure key={p.label} className={`about-photo about-photo-${i}${p.product?' is-product':''}`} data-motion-item><img src={p.src} alt={p.alt} loading="lazy"/><figcaption>{p.label}</figcaption></figure>)}
      </div>
      <p className="about-collage-closing">Better care.<span>Every day.</span></p>
    </section>

    {/* Cinematic Values Section replacing plain accordion with interactive cinematic hover cards */}
    <section className="about-values-panel !p-0 !bg-[#fffcf8]" aria-labelledby="about-values-title">
      <CinematicList
        heading="What we believe"
        subheading="shapes what we make."
        items={[
          {
            id: "01",
            title: "Science-led",
            location: "Dental Materials R&D",
            src: "/images/val-science.jpg",
            alt: "SPARK-DV dental biomaterials research laboratory",
            desc: "Our R&D-driven approach brings clinical insight and dental materials research into product development.",
          },
          {
            id: "02",
            title: "Patient-centered",
            location: "Comfort & Safety",
            src: "/images/val-patient.jpg",
            alt: "Dentist caring for young patient and parent",
            desc: "We design solutions that prioritize patient comfort, safety, and outcomes in everyday clinical practice.",
          },
          {
            id: "03",
            title: "Innovation",
            location: "Nanotechnology Frontiers",
            src: "/images/val-innovation.jpg",
            alt: "Nanotechnology and bio-matrix research innovation",
            desc: "Exploring nanotechnology to address real challenges in pediatric and preventive dentistry.",
          },
          {
            id: "04",
            title: "Quality-first",
            location: "Made in India",
            src: "/images/val-quality.jpg",
            alt: "Precision manufacturing and clinical excellence",
            desc: "A commitment to manufacturing excellence. Made in India, with products developed for clinical relevance.",
          },
        ]}
        className="bg-[#fffcf8]"
      />
    </section>

    <section className="about-journey" aria-labelledby="about-journey-title"><h2 id="about-journey-title">Our journey</h2><ol>{[['Founded','A mission to innovate in pediatric and preventive dentistry.'],['R&D','NanoSilver Fluoride technology development with 3K NANO PVT. LTD.'],['Launch','Nanion toothpaste, mouthrinse, and professional products.'],['Growth','Expanding into P-Obtura, Nanohybrid Biocem, MARC Crowns, and TAC.'],['Today','Building distribution partnerships and clinical adoption.']].map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="about-manufacturing">Manufactured by 3K NANO PVT. LTD. · Marketed by Sendan Pharmaceuticals.</p></section>

    <section className="about-community-section" aria-labelledby="about-community-title"><h2 id="about-community-title">Care connects us.</h2><div className="about-community-layout"><p>For the people delivering care.<br/>And the people it reaches.</p><div>{[['/dentists','For dental professionals','Clinical resources & guidance'],['/parents','For parents & caregivers','Everyday habits & advice'],['/school-program','For schools','Dental health in the community']].map(([url,title,desc])=><Link to={url} key={url}><span><strong>{title}</strong><small>{desc}</small></span><ArrowUpRight/></Link>)}</div></div><Link className="about-contact-link" to="/contact">Let’s talk.<ArrowUpRight/></Link></section>
  </div>;
}
