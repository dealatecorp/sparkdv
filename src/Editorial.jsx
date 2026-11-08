import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import content from "./source-content.json";
import assets from "./product-assets.json";
import { products } from "./data";
import {SparkProductShowcase} from './components/ui/spark-product-showcase';
import EditorialHeading from './components/editorial/editorial-heading';
import {HomeResearchStory, HomeCommunity} from './components/home/home-editorial';
import PerspectiveTunnelHero from './components/ui/perspective-tunnel-hero';
import './components/ui/perspective-tunnel-hero.css';
import './components/home/home-editorial.css';
const LandingReveal=lazy(()=>import('./components/ui/landing-reveal'));
import protocols from "./protocols.json";

export function ProductImage({ product, hero = false }) {
  const a = assets[product.slug];
  return (
    <img
      src={a.local}
      srcSet={a.width>640?`${a.local.replace("product.webp", "product-640.webp")} 640w, ${a.local} ${a.width}w`:undefined}
      sizes={
        hero ? "(max-width: 760px) 90vw, 46vw" : "(max-width: 760px) 90vw, 30vw"
      }
      width={a.width}
      height={a.height}
      loading={hero ? "eager" : "lazy"}
      alt={`${product.name} — original SPARK-DV product image`}
    />
  );
}
export function SourceArticle({ path, embedded = false, skipIntro = false }) {
  const data = content[path];
  if (!data) return null;
  const md = skipIntro ? data.markdown.slice(data.markdown.indexOf('\n## ') + 1) : embedded ? data.markdown.replace(/^# .+\n/, "") : data.markdown;
  const parts = md.split("<!-- protocols -->");
  const renderMarkdown = (text) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) =>
          href?.startsWith("/") && !href.startsWith("/assets/") ? (
            <Link to={href}>{children}</Link>
          ) : (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {children}
            </a>
          ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || "SPARK-DV clinical illustration"}
            loading="lazy"
          />
        ),
        table: ({ children }) => (
          <div className="source-table">
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
  const renderPart = (text) => {
    const faqIndex = text.indexOf("## Frequently Asked Questions");
    if (faqIndex < 0) return renderMarkdown(text);
    const before = text.slice(0, faqIndex),
      rest = text.slice(faqIndex + "## Frequently Asked Questions".length);
    return (
      <>
        {renderMarkdown(before)}
        <h2>Frequently asked questions</h2>
        {rest
          .split(/\n### /)
          .filter((t) => t.trim())
          .map((q, i) => {
            const line = q.indexOf("\n");
            if (line < 0) return renderMarkdown(q);
            return (
              <details className="resource-accordion" key={i}>
                <summary>{q.slice(0, line)}</summary>
                {renderMarkdown(q.slice(line))}
              </details>
            );
          })}
      </>
    );
  };
  return (
    <article className={`source-article ${embedded ? "embedded" : ""}`}>
      {skipIntro && path === '/school-program' && <figure className="editorial-original-photo"><img src="/assets/campaigns/school-program.webp" width="690" height="460" loading="lazy" alt="Original SPARK-DV school program photograph of a dental health assessment"/><figcaption>School dental health · Original SPARK-DV campaign photography.</figcaption></figure>}
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {renderPart(part)}
          {i < parts.length - 1 && (
            <div className="protocol-library" id="protocols">
              {protocols.map((p) => (
                <details className="resource-accordion" key={p.title}>
                  <summary>{p.title}</summary>
                  <div className="protocol-copy">{p.body}</div>
                </details>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </article>
  );
}
export function EditorialPage({ path }) {
  return (
    <>
      <EditorialHeading path={path}/>
      <div className="editorial-layout editorial-content-anchor wrap" id="editorial-content">
        <aside className="editorial-index">
          <Link to="/">SPARK-DV</Link>
          <p>
            Science. Practice.
            <br />
            Everyday care.
          </p>
          {[
            ["/about", "Our story"],
            ["/science", "Science & research"],
            ["/dentists", "For dentists"],
            ["/parents", "For parents"],
            ["/school-program", "In the community"],
          ].map(([url, label]) => (
            <Link key={url} className={url === path ? "selected" : ""} to={url}>
              {label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </aside>
        <div>
          {path === '/dentists' && <div className="editorial-actions"><Link to="/contact?type=Sample%20request">Request samples <ArrowUpRight size={16}/></Link><Link to="/science">View clinical evidence <ArrowUpRight size={16}/></Link></div>}
          {path === '/school-program' && <div className="editorial-actions"><Link to="/contact">Partner with us <ArrowUpRight size={16}/></Link><Link to="/products">View products <ArrowUpRight size={16}/></Link></div>}
          <SourceArticle path={path} skipIntro />
        </div>
      </div>
      
    </>
  );
}
export function Partner() {
  return (
    <section className="partner">
      <div className="wrap">
        <h2>
          Ready to partner
          <br />
          with SPARK-DV?
        </h2>
        <div>
          <p>
            For your practice. For your patients.
            <br />
            For the future of dental care.
          </p>
          <Link
            className="button button-light"
            to="/contact?type=Distributor%20enquiry"
          >
            Request distributor pricing <ArrowUpRight size={18} />
          </Link>
          <Link className="partner-demo" to="/contact?type=Demo%20request">
            Book a demo <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function NewHome({add}) {
const [quote,setQuote]=useState(0);
const testimonials=[["SPARK-DV products have helped streamline my pediatric workflow. The clinical protocols are practical and well-researched.","Dr. P. Sharma","Pediatric Dentist"],["As a parent, I appreciate the clear safety information and easy-to-follow guidance for my child’s oral care.","Mrs. A. Reddy","Parent"],["The product range is comprehensive and the distribution support is excellent. A reliable partner for our network.","Mr. K. Patel","Distribution Partner"]];
  const [category, setCategory] = useState("All products");
  const items = products.filter(p=>category==='All products'||p.category===category).map(p=>({...p,image:assets[p.slug].local,imageWidth:assets[p.slug].width,imageHeight:assets[p.slug].height}));
  return (
    <div className="home-editorial">
      <Suspense fallback={null}><LandingReveal/></Suspense>
      <PerspectiveTunnelHero products={['nanion-lite-pro','nanion-swish','nanion-pro-plus-gummies','pedo-spark-single','pedo-spark-three','endo-spark-permanent'].map(slug=>({slug,title:assets[slug].name,src:assets[slug].local,width:assets[slug].width,height:assets[slug].height}))}/>
      <div className="brand-principles wrap">
        <span>Dentist-oriented</span>
        <span>Evidence-led</span>
        <span>R&D-driven</span>
        <span>Made in India</span>
      </div>
      <HomeResearchStory/>
      <section className="portfolio-section wrap" id="portfolio">
        <div className="section-intro">
          <h2>
            Considered science.
            <br />
            Everyday possibilities.
          </h2>
          <p>
            From daily prevention to specialized pediatric endodontics and
            aesthetic restorations. Find your next step in care.
          </p>
        </div>
        <div className="portfolio-tabs" aria-label="Filter product portfolio">
          {[
            "All products",
            "Prevention",
            "Pediatric endodontics",
            "Restorations",
            "Endodontic instruments",
          ].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c === "Pediatric endodontics"
                ? "Endodontics"
                : c === "Endodontic instruments"
                  ? "Instruments"
                  : c}
            </button>
          ))}
        </div>
        <SparkProductShowcase products={items} onAdd={add}/>
        <Link className="text-link" to="/products">
          Explore all products & variants <ArrowRight size={18} />
        </Link>
      </section>
      <section className="clinical-highlights wrap"><h2>From formulation to practice.</h2><div>{[['Biofilm + enamel defense','A combined approach that helps reduce biofilm burden while supporting natural remineralization.'],['High-risk patient focus','Designed for orthodontics, white spots, recurrent caries, and ECC — where prevention matters most.'],['Pediatric workflow optimized','Time-saving handling, moisture tolerance where relevant, and clinician-friendly protocols.']].map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div><Link className="text-link" to="/science">Explore the science <ArrowUpRight size={18}/></Link></section><HomeCommunity/>
      <section className="audience-paths wrap">
        {[
          [
            "For dentists",
            "Protocols, product information and clinical resources.",
            "/dentists",
          ],
          ["For parents", "Clear guidance for growing smiles.", "/parents"],
          [
            "For distributors",
            "Build the next chapter of care with us.",
            "/contact",
          ],
        ].map(([t, d, url]) => (
          <Link to={url} key={t}>
            <h3>
              {t}
              <ArrowUpRight size={23} />
            </h3>
            <p>{d}</p>
          </Link>
        ))}
      </section>
      <section className="home-testimonial wrap" aria-label="Testimonials"><div aria-live="polite"><div key={quote} className="home-quote-content"><blockquote>“{testimonials[quote][0]}”</blockquote><p>{testimonials[quote][1]}<span>{testimonials[quote][2]}</span></p></div></div><div className="quote-navigation">{testimonials.map((q,i)=><button key={i} onClick={()=>setQuote(i)} aria-label={`Read testimonial from ${q[1]}`} aria-pressed={quote===i}>{i+1}</button>)}</div></section>
      
    </div>
  );
}
