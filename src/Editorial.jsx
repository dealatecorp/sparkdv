import React from "react";
import LandingAccordionItem from './components/ui/interactive-image-accordion';
import ScrollImageTunnel from './components/ui/scroll-image-tunnel';
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import content from "./source-content.json";
import assets from "./product-assets.json";
import { products } from "./data";
import EditorialHeading from './components/editorial/editorial-heading';
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
        p: ({node,children}) => node.children?.some(child=>child.tagName==='img'&&String(child.properties?.src).includes('/founder/'))
          ? <ScrollImageTunnel className="founder-tunnel" images={[{src:'/assets/founder/founder-ajay-BGDk7WSG.webp',alt:'Dr. Ajay Reddy Mareddy'}]} hint="Meet our founder · Scroll to reveal" stepHeight="calc(min(70svh, 560px) + 160px)"/>
          : <p>{children}</p>,
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
      {path === '/about' ? <LandingAccordionItem/> : <EditorialHeading path={path}/>}
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
            ["/science", "Blogs"],
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
      {path === "/about" && <section className="about-audience wrap" aria-labelledby="about-audience-title">
        <div className="about-audience-heading"><p>SPARK-DV / WHO WE SERVE</p><h2 id="about-audience-title">Care for the whole community.</h2></div>
        <div className="about-audience-links">
          <Link to="/dentists"><span>For dental professionals</span><strong>Clinical resources and product guidance <ArrowUpRight size={16}/></strong></Link>
          <Link to="/parents"><span>For parents and caregivers</span><strong>Everyday care and safety guidance <ArrowUpRight size={16}/></strong></Link>
          <Link to="/school-program"><span>For schools</span><strong>Explore the school dental program <ArrowUpRight size={16}/></strong></Link>
        </div>
      </section>}
      
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
export { CommerceHome as NewHome } from './CommerceHome';
