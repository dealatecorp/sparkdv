import {CinematicFooter} from './components/ui/motion-footer';
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Dock, DockItem} from './components/ui/dock';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { products, categories, img, money } from "./data.js";

import {
  NewHome,
  EditorialPage,
  SourceArticle,
  ProductImage,
} from "./Editorial";
import sourceContent from "./source-content.json";
import productAssets from "./product-assets.json";
const disclaimer =
  "Disclaimer: Products listed support oral hygiene and preventive care. Not intended to diagnose, treat, cure, or prevent any disease. Consult a qualified dental professional. For children, use under adult supervision. Keep out of reach of children. Do not swallow.";
const protocols = [
  "NSF Toothpaste Usage — Nanion Lite (2%) & Nanion Elite (3%), chairside + home-use",
  "White Spot Protocol — clinical management of early demineralization",
  "Orthodontic Protocol — preventive protocol for fixed appliance patients",
  "Biocem Mixing & Placement — fold-and-press technique",
  "MARC Crown Prep & Cementation — conservative pediatric crown workflow",
  "P-Obtura Bio-Activ Obturation — pediatric endodontic handling protocol",
];
const faqs = [
  [
    "Is NanoSilver Fluoride safe for children?",
    "Our products are formulated with pediatric safety in mind. Nanion Lite is designed for ages 6+ with adult supervision. Always follow recommended usage and consult your dentist.",
  ],
  [
    "Will it stain my child’s teeth?",
    "Our formulations are designed to be non-staining compared to in-office SDF treatments. Individual results may vary.",
  ],
  [
    "What if my child swallows the toothpaste?",
    "Use only a pea-sized amount. Spit out after brushing. If a small amount is accidentally swallowed, it is generally not harmful, but consult your dentist if concerned.",
  ],
  [
    "At what age can my child start using Nanion products?",
    "Nanion Lite is recommended for ages 6 and above with adult supervision. For younger children, consult your pediatric dentist for personalized guidance.",
  ],
  [
    "Can it help with sensitivity?",
    "Our formulations include ingredients that support enamel health, which may help with sensitivity. Consult your dentist for persistent sensitivity issues.",
  ],
  [
    "Is Nanion Swish safe for children?",
    "Nanion Swish can be used by children who can reliably spit (typically 6+). Always supervise and ensure the child does not swallow the rinse.",
  ],
];
const scienceSteps = [
  [
    "01",
    "Antibacterial Action",
    "NanoSilver particles (10–20nm) disrupt bacterial cell membranes through multiple mechanisms, reducing acid-producing bacteria.",
  ],
  [
    "02",
    "Biofilm Disruption",
    "Nano-sized particles penetrate the extracellular matrix of dental biofilm, disrupting its protective structure and allowing better access to the tooth surface.",
  ],
  [
    "03",
    "Remineralization Support",
    "Fluoride ions and nano-hydroxyapatite work synergistically to deposit minerals into demineralized enamel. nHA provides a calcium and phosphate reservoir.",
  ],
];

function App() {
  const loc = useLocation();
  const [menu, setMenu] = useState(false),
    [cartOpen, setCartOpen] = useState(false),
    [cart, setCart] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("spark-cart") || "[]");
      } catch {
        return [];
      }
    }),
    [toast, setToast] = useState(""),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    localStorage.setItem("spark-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (loc.hash)
      requestAnimationFrame(() =>
        document.querySelector(loc.hash)?.scrollIntoView(),
      );
    else window.scrollTo(0, 0);
    document
      .querySelectorAll("details[open]")
      .forEach((e) => e.removeAttribute("open"));
    setMenu(false);
  }, [loc.pathname]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("motion-ready");
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal:not(.in-view)")
      .forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [loc.pathname]);
  useEffect(() => {
    if (!cartOpen && !menu) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cartOpen, menu]);
  useEffect(() => {
    const page = sourceContent[loc.pathname];
    const p = products.find((p) => loc.pathname === "/products/" + p.slug);
    document.title =
      (p?.name ||
        (page?.title !== "404" ? page?.title : null) ||
        {
          "/contact": "Contact",
          "/privacy": "Privacy Policy",
          "/terms": "Terms of Service",
          "/shipping": "Shipping & Returns",
          "/cart": "Your selection",
          "/checkout": "Order enquiry",
        }[loc.pathname] ||
        "Page not found") + " | SPARK-DV";
    const description =
      p?.desc ||
      "Science-led pediatric and preventive dentistry. Explore SPARK-DV products, clinical resources and partnership opportunities.";
    const meta = (key, value, attr = "name") => {
      let el = document.querySelector("meta[" + attr + '="' + key + '"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.append(el);
      }
      el.content = value;
    };
    meta("description", description);
    meta("og:title", document.title, "property");
    meta("og:description", description, "property");
    meta("og:url", "https://sparkdv.com" + loc.pathname, "property");
    meta(
      "og:image",
      "https://sparkdv.com" +
        (p ? productAssets[p.slug].local : "/images/logo.png"),
      "property",
    );
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = "https://sparkdv.com" + loc.pathname;
    let schema = document.querySelector("#structured-data");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "structured-data";
      schema.type = "application/ld+json";
      document.head.append(schema);
    }
    schema.textContent = JSON.stringify(
      p
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.desc,
            image: "https://sparkdv.com" + productAssets[p.slug].local,
            brand: { "@type": "Brand", name: "SPARK-DV" },
          }
        : {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SPARK-DV",
            url: "https://sparkdv.com",
            email: "sparkdv310@gmail.com",
          },
    );
  }, [loc.pathname]);
  useEffect(() => {
    if (!cartOpen && !menu) return;
    const previous = document.activeElement;
    const region = document.querySelector(
      cartOpen ? ".cart-drawer" : ".nav.open",
    );
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const items = () =>
      [...region.querySelectorAll("a,button,input,select,summary")].filter(
        (e) => e.getClientRects().length,
      );
    items()[0]?.focus();
    const trap = (e) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (e.shiftKey && document.activeElement === list[0]) {
        e.preventDefault();
        list.at(-1)?.focus();
      } else if (!e.shiftKey && document.activeElement === list.at(-1)) {
        e.preventDefault();
        list[0]?.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [cartOpen, menu]);
  const qty = cart.reduce((s, i) => s + i.qty, 0);
  const add = (p, count = 1) => {
    if (p.coming) return;
    setCart((prev) => {
      const found = prev.find((i) => i.slug === p.slug);
      return found
        ? prev.map((i) => (i.slug === p.slug ? { ...i, qty: i.qty + count } : i))
        : [...prev, { ...p, qty: count }];
    });
    setToast(`${p.name} added to cart`);
    setCartOpen(true);
    setTimeout(() => setToast(""), 2600);
  };
  const update = (slug, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.slug === slug ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  const remove = (slug) =>
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? "compact" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="SPARK-DV home">
            <img src={img("logo.png")} alt="SPARK-DV — Innovating the Future" />
          </Link>
          <nav
            className={menu ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            <Dock>
            <DockItem baseWidth={90}><details className="products-menu">
              <summary>
                Products
              </summary>
              <div className="mega-menu">
                <Link to="/products">
                  Explore the complete portfolio <ArrowUpRight size={18} />
                </Link>
                {categories.slice(1).map((c) => (
                  <Link
                    key={c}
                    to={`/products?category=${encodeURIComponent(c)}`}
                    onClick={(e) =>
                      e.currentTarget.closest("details").removeAttribute("open")
                    }
                  >
                    {c}
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </details></DockItem>
            {[
              ['/science','Science',78],['/about','About',67],['/contact','Contact',82],
            ].map(([to,label,width])=><DockItem key={to} baseWidth={width}><Link to={to} aria-current={loc.pathname===to?'page':undefined}>{label}</Link></DockItem>)}
            </Dock>
            <div className="mobile-actions">
              <Link className="button button-dark" to="/contact">
                Request pricing <ArrowUpRight size={16} />
              </Link>
            </div>
          </nav>
          <div className="header-actions">
            <button
              className="cart-trigger"
              aria-label={`Open cart, ${qty} items`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} />
              <span>{qty}</span>
            </button>
            <Link className="button button-dark header-cta" to="/products">
              Shop products <ArrowUpRight size={15} />
            </Link>
            <button
              className="menu-button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <RoutesView add={add} cartQty={qty} cart={cart} update={update} remove={remove} />
      </main>
      <CinematicFooter />
      <a
        className="whatsapp"
        href="https://wa.me/919246901870"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with SPARK-DV on WhatsApp"
      >
        <span className="wa-dot" />
        Chat with SPARK-DV
      </a>
      {cartOpen && (
        <div
          className="drawer-backdrop"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setCartOpen(false)
          }
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2 id="cart-title">
                  Cart <span className="count-pill">{qty}</span>
                </h2>
              </div>
              <button
                className="icon-button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
              >
                <X />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={34} />
                <h3>Your cart is empty</h3>
                <p>Browse our products and add items to get started.</p>
                <Link
                  className="button button-dark"
                  to="/products"
                  onClick={() => setCartOpen(false)}
                >
                  Shop products <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.slug}>
                      <div className="cart-thumb">
                        <img src={img(item.img)} alt="" />
                      </div>
                      <div className="cart-item-copy">
                        <div className="cart-line">
                          <h3>{item.name}</h3>
                          <button
                            className="remove"
                            onClick={() => remove(item.slug)}
                          >
                            Remove
                          </button>
                        </div>
                        <small>{item.variant || item.eyebrow}</small>
                        <strong>{money(item.price)}</strong>
                        <div className="quantity">
                          <button
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => update(item.slug, -1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => update(item.slug, 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-bottom">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>
                      {money(
                        cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0),
                      )}
                    </strong>
                  </div>
                  <small>
                    Pricing, availability and delivery are confirmed by our
                    team.
                  </small>
                  <button
                    className="button button-dark checkout"
                    onClick={() => {setCartOpen(false); navigate('/checkout')}}
                  >
                    Continue to order enquiry <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </>
  );
}
function RoutesView({ add, cartQty, cart, update, remove }) {
  const location = useLocation();
  const path = location.pathname;
  const detail = path.startsWith("/products/") ? path.split("/").pop() : null;
  if (path === "/") return <NewHome add={add} />;
  if (path === "/products") return <Catalog key={location.search} add={add} />;
  if (detail) {
    if (detail === "nanion-pro" || detail === "spark-files")
      return <ProductFamilyDetail familySlug={detail} add={add} />;
    return <ProductDetail slug={detail} add={add} />;
  }
  if (path === "/science") return <EditorialPage path="/science" />;
  if (path === "/dentists") return <EditorialPage path="/dentists" />;
  if (path === "/parents") return <EditorialPage path="/parents" />;
  if (path === "/school-program")
    return <EditorialPage path="/school-program" />;
  if (path === "/about") return <EditorialPage path="/about" />;
  if (path === "/contact") return <Contact />;
  if (path === "/checkout") return <CheckoutUnavailable cart={cart} />;
  if (["/privacy", "/terms", "/shipping"].includes(path))
    return <Policy path={path} />;
  if (path === "/cart") return <CartPage cart={cart} update={update} remove={remove} />;
  return <NotFound />;
}
function SectionHead({ number, label, title, copy, link, linkText }) {
  return (
    <div className="section-head reveal">
      <div className="section-marker">
        <span>{number}</span>
        <i />
      </div>
      <div className="section-head-body">
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
      {link && (
        <Link className="text-link section-head-link" to={link}>
          {linkText} <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
function ProductCard({ product: p, add, compact = false }) {
  return (
    <article className={`product-card reveal ${compact ? "compact-card" : ""}`}>
      <Link to={`/products/${p.slug}`} className="product-photo">
        <ProductImage product={p} hero />
        {p.coming && <span className="status-label">Coming soon</span>}
        {p.professional && <span className="pro-label">Professional</span>}
        <span className="photo-arrow">
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="product-info">
        <p className="catalog-product-category">{p.category}</p>
        <p className="eyebrow">{p.eyebrow}</p>
        <Link className="product-title" to={`/products/${p.slug}`}>
          {p.name}
        </Link>
        <p className="product-desc">{p.desc}</p>
        <div className="tag-row">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="product-buy">
          <strong>{money(p.price)}</strong>
          {p.compare && <del>{money(p.compare)}</del>}
          {p.coming ? (
            <span className="coming-label">Launching soon</span>
          ) : p.price ? (
            <button aria-label={`Add ${p.name} to cart`} onClick={() => p.price ? add(p) : (window.location.href="/contact?type=Clinical%20enquiry")}>
              <Plus size={15} /> Add
            </button>
          ) : (
            <Link to="/contact">
              Enquire <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
function Catalog({ add }) {
  const params = new URLSearchParams(useLocation().search);
  const [selectedCategories, setSelectedCategories] = useState(() => categories.includes(params.get("category")) && params.get("category") !== "All products" ? [params.get("category")] : []);
  const [query, setQuery] = useState("");
  const [prof, setProf] = useState(false);
  const [statusFilters, setStatusFilters] = useState([]);
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openFilterGroups, setOpenFilterGroups] = useState({ category: true, price: true, shopping: true, use: true });
  const pricedProducts = products.filter(p => p.price != null && !p.coming);
  const minCatalogPrice = Math.min(...pricedProducts.map(p => p.price));
  const maxCatalogPrice = Math.max(...pricedProducts.map(p => p.price));
  const [priceMin, setPriceMin] = useState(minCatalogPrice);
  const [priceMax, setPriceMax] = useState(maxCatalogPrice);
  const filtered = useMemo(() => {
    const list = products.filter(p => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesSearch = `${p.name} ${p.category} ${p.desc} ${(p.tags ?? []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesStatus = statusFilters.length === 0 || statusFilters.some(status => status === "priced" ? p.price != null && !p.coming : status === "enquiry" ? p.price == null && !p.coming : p.coming);
      const priceFilterActive = priceMin > minCatalogPrice || priceMax < maxCatalogPrice;
      const matchesPrice = !priceFilterActive || (p.price != null && p.price >= priceMin && p.price <= priceMax);
      return matchesCategory && matchesSearch && (!prof || p.professional) && matchesStatus && matchesPrice;
    });
    if (sort === "price-low") list.sort((a,b)=>(a.price??999999)-(b.price??999999));
    if (sort === "price-high") list.sort((a,b)=>(b.price??0)-(a.price??0));
    if (sort === "name") list.sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  }, [selectedCategories, query, prof, statusFilters, priceMin, priceMax, minCatalogPrice, maxCatalogPrice, sort]);
  const priceFilterActive = priceMin > minCatalogPrice || priceMax < maxCatalogPrice;
  const activeFilterCount = selectedCategories.length + statusFilters.length + Number(prof) + Number(priceFilterActive);
  const toggleCategory = category => setSelectedCategories(current => current.includes(category) ? current.filter(item => item !== category) : [...current, category]);
  const toggleStatus = status => setStatusFilters(current => current.includes(status) ? current.filter(item => item !== status) : [...current, status]);
  const toggleFilterGroup = group => setOpenFilterGroups(current => ({ ...current, [group]: !current[group] }));
  const clearFilters=()=>{setSelectedCategories([]);setProf(false);setStatusFilters([]);setPriceMin(minCatalogPrice);setPriceMax(maxCatalogPrice);setQuery("");setSort("featured")};
  return <>
    <section className="catalog-heading wrap"><div><h1>Shop products</h1><p>Find products for pediatric and preventive dental care.</p></div><Link className="button button-dark" to="/contact?type=Professional%20pricing">Professional pricing <ArrowUpRight size={16}/></Link></section>
    <section className="catalog-section wrap" aria-label="Product catalogue">
      <div className="catalog-layout">
        <aside className="catalog-sidebar" data-open={mobileFiltersOpen} aria-label="Product filters">
          <button className="catalog-mobile-filter-toggle" type="button" aria-expanded={mobileFiltersOpen} onClick={()=>setMobileFiltersOpen(open=>!open)}><SlidersHorizontal size={17}/><span>Filters</span>{activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}<ChevronDown size={16}/></button>
          <div className="catalog-filter-content">
            <div className="catalog-filter-heading"><h2>Filters</h2><button className="clear-filter" onClick={clearFilters} disabled={activeFilterCount === 0 && !query}>Clear all</button></div>
            <section className="catalog-filter-group">
              <button className="catalog-filter-toggle" type="button" aria-expanded={openFilterGroups.category} onClick={()=>toggleFilterGroup("category")}>Category <ChevronDown size={15}/></button>
              {openFilterGroups.category && <div className="catalog-filter-options">
                {categories.slice(1).map(category => <label key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={()=>toggleCategory(category)}/><span>{category}</span><small>{products.filter(p=>p.category===category).length}</small></label>)}
              </div>}
            </section>
            <section className="catalog-filter-group">
              <button className="catalog-filter-toggle" type="button" aria-expanded={openFilterGroups.price} onClick={()=>toggleFilterGroup("price")}>Price <ChevronDown size={15}/></button>
              {openFilterGroups.price && <div className="catalog-price-range">
                <label><span>₹</span><input type="number" min={minCatalogPrice} max={priceMax} value={priceMin} aria-label="Minimum price in rupees" onChange={e=>setPriceMin(Math.min(Number(e.target.value)||minCatalogPrice,priceMax))}/></label>
                <span aria-hidden="true">to</span>
                <label><span>₹</span><input type="number" min={priceMin} max={maxCatalogPrice} value={priceMax} aria-label="Maximum price in rupees" onChange={e=>setPriceMax(Math.max(Number(e.target.value)||maxCatalogPrice,priceMin))}/></label>
                <small>{priceFilterActive ? "Showing within selected range" : "All listed prices"}</small>
              </div>}
            </section>
            <section className="catalog-filter-group">
              <button className="catalog-filter-toggle" type="button" aria-expanded={openFilterGroups.shopping} onClick={()=>toggleFilterGroup("shopping")}>Shopping options <ChevronDown size={15}/></button>
              {openFilterGroups.shopping && <div className="catalog-filter-options">
                <label><input type="checkbox" checked={statusFilters.includes("priced")} onChange={()=>toggleStatus("priced")}/><span>Priced products</span></label>
                <label><input type="checkbox" checked={statusFilters.includes("enquiry")} onChange={()=>toggleStatus("enquiry")}/><span>Price on request</span></label>
                <label><input type="checkbox" checked={statusFilters.includes("coming")} onChange={()=>toggleStatus("coming")}/><span>Coming soon</span></label>
              </div>}
            </section>
            <section className="catalog-filter-group">
              <button className="catalog-filter-toggle" type="button" aria-expanded={openFilterGroups.use} onClick={()=>toggleFilterGroup("use")}>Use <ChevronDown size={15}/></button>
              {openFilterGroups.use && <div className="catalog-filter-options">
                <label><input type="checkbox" checked={prof} onChange={e=>setProf(e.target.checked)}/><span>Professional use</span></label>
              </div>}
            </section>
            <Link className="catalog-professional-link" to="/contact?type=Professional%20pricing">Need professional pricing? <ArrowUpRight size={14}/></Link>
          </div>
        </aside>
        <div className="catalog-results">
          <div className="catalog-toolbar">
            <div className="search-field"><Search size={18}/><input aria-label="Search products" placeholder="Search products and categories" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Clear search" onClick={()=>setQuery("")}><X size={15}/></button>}</div>
            <label className="sort-label">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="name">Name</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
          </div>
          <div className="catalog-meta-row" aria-live="polite" aria-atomic="true"><span><strong>{filtered.length}</strong> products</span><span className="catalog-result-note">Original SPARK-DV product photography</span></div>
          {(selectedCategories.length > 0 || statusFilters.length > 0 || prof || priceFilterActive) && <div className="catalog-active-filters" aria-label="Active filters">
            {selectedCategories.map(category=><button key={category} onClick={()=>toggleCategory(category)}>{category}<X size={13}/></button>)}
            {statusFilters.map(status=><button key={status} onClick={()=>toggleStatus(status)}>{status === "priced" ? "Priced products" : status === "enquiry" ? "Price on request" : "Coming soon"}<X size={13}/></button>)}
            {prof&&<button onClick={()=>setProf(false)}>Professional use<X size={13}/></button>}
            {priceFilterActive&&<button onClick={()=>{setPriceMin(minCatalogPrice);setPriceMax(maxCatalogPrice)}}>₹{priceMin.toLocaleString("en-IN")} – ₹{priceMax.toLocaleString("en-IN")}<X size={13}/></button>}
            <button className="clear-filter" onClick={clearFilters}>Clear all</button>
          </div>}
          {filtered.length ? <div className="product-grid commerce-product-grid">{filtered.map(p=><ProductCard key={p.slug} product={p} add={add}/>)}</div> : <div className="no-results"><Search size={28}/><h2>No products found</h2><p>Try a different name or remove a filter.</p><button className="button button-outline" onClick={clearFilters}>Clear all filters</button></div>}
        </div>
      </div>
    </section>
    <section className="need-help"><div className="wrap need-help-inner"><div><h2>Need help choosing?</h2><p>Ask our team about products, professional pricing or availability.</p></div><Link className="button button-dark" to="/contact">Talk to our team <ArrowUpRight size={16}/></Link></div></section>
  </>;
}
function PageHero({ eyebrow, title, copy, actions, side }) {
  return (
    <section className="page-hero wrap">
      <div className="page-hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-mark" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {copy && <p className="hero-lede">{copy}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      {side && <div className="page-hero-side">{side}</div>}
      <div className="page-hero-foot">
        <span>SPARK-DV / INDIA</span>
        <span>CLINICALLY ORIENTED CARE</span>
        <ArrowDown size={15} />
      </div>
    </section>
  );
}
function ProductFamilyDetail({ familySlug, add }) {
  const variants = products.filter((p) => p.familySlug === familySlug),
    files = familySlug === "spark-files",
    title = files ? "SPARK DV Files" : "Nanion Pro",
    copy = files
      ? "Black Gold (TiN) and Black Oxide (TiO₂) surface-engineered NiTi rotary files, bio-engineered for delicate primary-tooth anatomy. Includes non-cutting tips, pediatric lengths, and S-shape or triangular options."
      : "Four-action dual-matrix caries prevention. NSF antibacterial action, biofilm disruption, sustained fluoride release, and 5% nano-hydroxyapatite for biomimetic repair and dentinal tubule occlusion.";
  return (
    <>
      <PageHero
        eyebrow={
          files ? "BLACK OXIDE NITI ENDO FILES" : "NSF + 5% nHA DUAL-MATRIX"
        }
        title={
          <>
            {files ? "Pediatric and permanent" : "Four-action"}
            <br />
            <em>{files ? "file systems." : "Nanion Pro."}</em>
          </>
        }
        copy={copy}
        actions={
          <>
            <a className="button button-dark" href="#variants">
              Compare variants <ArrowDown size={15} />
            </a>
            <Link className="text-link" to="/contact">
              Ask a specialist <ArrowUpRight size={15} />
            </Link>
          </>
        }
      />
      <section className="wrap product-source">
        <details className="product-information-disclosure">
          <summary>Full product information and clinical details</summary>
          <SourceArticle path={`/products/${familySlug}`} embedded />
        </details>
      </section>
      <section className="section wrap">
        <SectionHead
          number="01"
          label={files ? "FILE SYSTEM" : "DUAL-MATRIX TECHNOLOGY"}
          title={
            files ? (
              <>
                Engineered for
                <br />
                <em>delicate anatomy.</em>
              </>
            ) : (
              <>
                Four mechanisms,
                <br />
                <em>one matrix.</em>
              </>
            )
          }
          copy={
            files
              ? "Black Gold (TiN) and Black Oxide (TiO₂) surface-engineered NiTi rotary files for primary and permanent teeth. Non-cutting tip, pediatric lengths, S-shape and triangular options."
              : "NanoSilver Fluoride antibacterial action, biofilm disruption, sustained F⁻ release, and 5% nano-hydroxyapatite for biomimetic repair and dentinal tubule occlusion."
          }
        />
        <div className="detail-image family-image">
          <ProductImage product={variants[0]} hero />
        </div>
        <div className="detail-facts">
          {(files
            ? [
                ["Surface treatment", "Black Gold (TiN) & Black Oxide (TiO₂)"],
                ["Tip", "Non-cutting tip"],
                ["Pediatric lengths", "17–19 mm"],
                ["Designs", "S-shape & triangular"],
              ]
            : [
                ["Antibacterial", "NanoSilver Fluoride"],
                ["Biofilm", "Disruption"],
                ["Fluoride", "Sustained F⁻ release"],
                ["Repair", "5% nano-hydroxyapatite"],
              ]
          ).map(([k, v], i) => (
            <div key={k}>
              <span>0{i + 1}</span>
              <h3>{k}</h3>
              <p>{v}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section detail-tint" id="variants">
        <div className="wrap">
          <SectionHead
            number="02"
            label="CHOOSE A VARIANT"
            title={
              <>
                Explore the <em>range.</em>
              </>
            }
            copy="Compare available configurations and select a product to review its details."
          />
          <div className="product-grid">
            {variants.map((p) => (
              <ProductCard key={p.slug} product={p} add={add} />
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="safety-note">
          <ShieldCheck size={23} />
          <div>
            <p className="eyebrow">USE & SAFETY</p>
            <h2>Follow product guidance.</h2>
            <p>
              {files
                ? "For qualified dental professionals. Review the official instructions for use and use clinical judgment."
                : "For children, use under adult supervision. Consult a qualified dental professional for personalized guidance."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
function ProductDetail({ slug, add }) {
  let p = products.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const related = products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 3);
  return (
    <>
      <div className="breadcrumbs wrap">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Products</Link>
        <ChevronRight size={14} />
        <span>{p.name}</span>
      </div>
      <section className="detail-hero wrap">
        <div className="detail-image">
          <ProductImage product={p} hero />
          <span className="image-index">
            SPARK-DV / PRODUCT{" "}
            {String(products.indexOf(p) + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {p.category} / {p.eyebrow}
          </p>
          <h1>{p.name}</h1>
          {p.professional && (
            <span className="pro-status">
              <Stethoscope size={15} /> For qualified dental professionals
            </span>
          )}
          <p className="detail-lede">{p.desc}</p>
          <div className="detail-tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {p.variant && (
            <div className="variant-box">
              <span>PRODUCT VARIANT</span>
              <strong>{p.variant}</strong>
            </div>
          )}
          {p.familySlug && products.filter((item) => item.familySlug === p.familySlug).length > 1 && (
            <div className="variant-selector" aria-label="Choose a product variant">
              <span>OTHER VARIANTS</span>
              <div>{products.filter((item) => item.familySlug === p.familySlug).map((item) => (
                <Link key={item.slug} aria-current={item.slug === p.slug ? "page" : undefined} to={`/products/${item.slug}`}>{item.name}</Link>
              ))}</div>
            </div>
          )}
          {p.coming ? (
            <div className="coming-box">
              <span>COMING SOON</span>
              <strong>Launching soon — stay tuned</strong>
            </div>
          ) : (
            <div className="detail-buy">
              <div>
                <strong>{money(p.price)}</strong>
                {p.compare && <del>{money(p.compare)}</del>}
              </div>
              <button className="button button-dark" onClick={() => p.price ? add(p) : (window.location.href="/contact?type=Clinical%20enquiry")}>
                {p.price ? "Add to cart" : "Request pricing"} <ShoppingBag size={16} />
              </button>
            </div>
          )}
          <p className="detail-note">
            <ShieldCheck size={17} />
            {p.professional
              ? "Professional use only. Product use should follow the official Instructions for Use (IFU) and clinician judgment."
              : "For children, use under adult supervision. Consult a qualified dental professional for personalized guidance."}
          </p>
          <Link className="text-link" to="/contact">
            Ask a clinical specialist <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <div className="detail-subnav">
        <a href="#overview">Overview</a>
        <a href="#overview">Clinical information</a>
        <a href="#safety">Use & safety</a>
        <a href="#related">Related products</a>
      </div>
      <section className="wrap product-source" id="overview">
        <details className="product-information-disclosure">
          <summary>Full product information and clinical details</summary>
          <SourceArticle path={`/products/${p.slug}`} embedded />
        </details>
      </section>
      <section className="section wrap detail-body" id="overview-summary">
        <SectionHead
          number="01"
          label="PRODUCT OVERVIEW"
          title={
            <>
              Designed for
              <br />
              <em>clinical practice.</em>
            </>
          }
          copy={p.desc}
        />
        <div className="detail-facts">
          <div>
            <span>01</span>
            <h3>Product family</h3>
            <p>{p.family || p.category}</p>
          </div>
          <div>
            <span>02</span>
            <h3>Intended audience</h3>
            <p>
              {p.professional ? "Qualified dental professionals" : p.category}
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Availability</h3>
            <p>
              {p.coming
                ? "Launching soon"
                : p.price
                  ? "Available to order"
                  : "Contact for availability"}
            </p>
          </div>
        </div>
      </section>
      <section className="section detail-tint" id="technology">
        <div className="wrap">
          <SectionHead
            number="02"
            label="FORMULATION & FEATURES"
            title={
              <>
                A closer look at
                <br />
                <em>the formulation.</em>
              </>
            }
            copy="Product information reproduced from the SPARK-DV catalogue. Review the official product label and IFU for complete specifications."
          />
          <div className="feature-list">
            {p.features?.map((f, i) => (
              <div className="feature-row reveal" key={f}>
                <span>0{i + 1}</span>
                <strong>{f}</strong>
                <ArrowUpRight size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap" id="safety">
        <div className="safety-note">
          <ShieldCheck size={23} />
          <div>
            <p className="eyebrow">USE & SAFETY</p>
            <h2>Guidance matters.</h2>
            <p>
              {p.professional
                ? "For use by qualified dental professionals only. Product usage should follow the official Instructions for Use (IFU). Clinical judgment must guide treatment decisions."
                : "For children, use under adult supervision. Keep out of reach of children. Do not swallow. Consult a qualified dental professional."}
            </p>
            <p className="fineprint">
              Individual results may vary. Refer to product labeling for
              complete safety information.
            </p>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section wrap related" id="related">
          <SectionHead
            number="03"
            label="EXPLORE THE RANGE"
            title={
              <>
                Related <em>products.</em>
              </>
            }
            link="/products"
            linkText="All products"
          />
          <div className="product-grid">
            {related.map((q) => (
              <ProductCard key={q.slug} product={q} add={add} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Contact() {
  const [kind, setKind] = useState(
    new URLSearchParams(location.search).get("type") || "Distributor enquiry",
  );
  const enquiryKinds = ["Professional pricing", "Distributor enquiry", "Clinical enquiry", "School program", "General contact"];
  return (
    <section className="contact-ui-section">
      <div className="wrap contact-ui-grid">
        <div className="contact-visual">
          <div className="contact-bubbles" aria-hidden="true">{Array.from({length:12},(_,index)=><span key={index}/>)}</div>
          <div className="contact-visual-copy">
            <p className="contact-kicker">SPARK-DV · CHENNAI, INDIA</p>
            <h1>{kind === "Clinical enquiry" ? <>Talk with<br/>our clinical team.</> : kind === "School program" ? <>Bring care<br/>to your school.</> : kind === "General contact" ? <>We’re here<br/>to help.</> : kind === "Professional pricing" ? <>Let’s talk<br/>professional pricing.</> : <>Let’s start<br/>a conversation.</>}</h1>
            <p>Tell us what you need. We’ll route your message to the right SPARK-DV team.</p>
            <div className="contact-details">
              <a href="mailto:sparkdv310@gmail.com">sparkdv310@gmail.com <ArrowUpRight size={15}/></a>
              <a href="tel:+917981546939">+91 7981546939 <ArrowUpRight size={15}/></a>
              <a href="tel:+919154741994">+91 9154741994 <ArrowUpRight size={15}/></a>
              <a href="tel:+919848014443">+91 9848014443 <ArrowUpRight size={15}/></a>
            </div>
            <a className="contact-whatsapp" href="https://wa.me/919246901870" target="_blank" rel="noreferrer">Prefer WhatsApp? Chat with our team <ArrowUpRight size={15}/></a>
          </div>
        </div>
        <div className="contact-form-card">
          <div className="contact-form-heading"><span>CONTACT OUR TEAM</span><h2>How can we help?</h2><p>Choose an enquiry type and share a few details.</p></div>
          <div className="enquiry-tabs" aria-label="Choose an enquiry type">
            {enquiryKinds.map(k=><button type="button" className={kind===k?"selected":""} aria-pressed={kind===k} onClick={()=>setKind(k)} key={k}><span>{kind===k?<Check size={14}/>:null}</span>{k}</button>)}
          </div>
          <EnquiryForm key={kind} defaultType={kind}/>
          <details className="company-label-info"><summary>Company & product-label information</summary><p>Manufactured by: 3K NANO PVT. LTD., HNO-RZ-625/1C, KH-625, T/F/L/S, Indra Park, Palam Colony, New Delhi, Delhi 110045. Manufactured for: SPARK-DV. Marketed by: Sendan Pharmaceuticals Pvt. Ltd., Chennai, Tamil Nadu.</p><p>{disclaimer}</p></details>
        </div>
      </div>
    </section>
  );
}

function EnquiryForm({ defaultType, defaultProduct = 'General enquiry' }) {
  const [done, setDone] = useState(false),
    [error, setError] = useState("");
  const [type, setType] = useState(
    defaultType ||
      new URLSearchParams(location.search).get("type") ||
      "Clinical enquiry",
  );
  useEffect(() => {
    if (defaultType) setType(defaultType);
  }, [defaultType]);
  return (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        try {
          const data = new FormData(e.currentTarget);
          const body = [...data].map(([k, v]) => k + ": " + v).join("\n");
          window.location.href =
            "mailto:sparkdv310@gmail.com?subject=" +
            encodeURIComponent(type) +
            "&body=" +
            encodeURIComponent(body);
          setDone(true);
        } catch {
          setError(
            "Unable to open your email app. Please email sparkdv310@gmail.com directly.",
          );
        }
      }}
    >
      <h3>Let’s start a conversation.</h3>
      <p>Complete your details to prepare an email to our team.</p>
      <label>
        Enquiry type
        <select
          name="Enquiry"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {[
            "Distributor enquiry",
            "Clinical enquiry",
            "Sample request",
            "Professional pricing",
            "Demo request",
            "School program",
            "General contact",
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <div className="form-row">
        <label>
          Name *<input name="Name" required autoComplete="name" />
        </label>
        <label>
          Company / clinic
          <input name="Organization" autoComplete="organization" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email *
          <input name="Email" required type="email" autoComplete="email" />
        </label>
        <label>
          Phone
          <input name="Phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        City, State *
        <input name="Location" required autoComplete="address-level2" />
      </label>
      <label>
        Product
        <select name="Product" defaultValue={defaultProduct}>
          <option>General enquiry</option>
          {products.map((p) => (
            <option key={p.slug}>{p.name}</option>
          ))}
        </select>
      </label>
      <label>
        Message *<textarea name="Message" rows="4" required />
      </label>
      <label className="consent">
        <input name="Contact consent" type="checkbox" required value="Yes" />I
        agree to be contacted about this enquiry.
      </label>
      <button className="button button-dark" type="submit">
        Prepare email <ArrowUpRight size={17} />
      </button>
      <small>
        Your email app opens for you to review and send. No enquiry is submitted
        by this website.
      </small>
      {done && (
        <p role="status">
          Your email draft is ready to open. Send it from your email app. If it
          did not open, contact{" "}
          <a href="mailto:sparkdv310@gmail.com">sparkdv310@gmail.com</a>.
        </p>
      )}
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

function Policy({ path }) {
  const data = {
      "/privacy": [
        "Privacy Policy",
        "Contact our team for current privacy information.",
      ],
      "/terms": [
        "Terms of Service",
        "Terms of Service for the SPARK-DV website.",
      ],
      "/shipping": ["Shipping & Returns", "Shipping and returns information."],
    }[path],
    isUnavailable = true;
  return (
    <>
      <PageHero
        eyebrow="INFORMATION"
        title={
          <>
            {data[0].split(" ")[0]}
            <br />
            <em>{data[0].split(" ").slice(1).join(" ")}</em>
          </>
        }
        copy={data[1]}
      />
      <section className="section wrap policy-body">
        <p className="policy-alert">
          {isUnavailable
            ? "This policy is not currently available online. Please contact SPARK-DV for current information before placing an order or sharing personal information."
            : "Full current source text was not accessible during inspection. Approved policy copy is needed before publication."}
        </p>
        <h2>{data[0]}</h2>
        <p>For current information, contact SPARK-DV directly.</p>
        <p>
          <a className="text-link" href="mailto:sparkdv310@gmail.com">
            Contact SPARK-DV <ArrowUpRight size={15} />
          </a>
        </p>
      </section>
    </>
  );
}
function orderEnquiryHref(cart) {
  const lines=cart.map(item=>`${item.name} × ${item.qty}`);
  const body=["Hello SPARK-DV team,", "Please confirm current pricing and availability for:", ...lines, "", "Please share shipping and order details."];
  return 'mailto:sparkdv310@gmail.com?subject='+encodeURIComponent('SPARK-DV product enquiry')+'&body='+encodeURIComponent(body.join('\n'));
}
function CartPage({cart,update,remove}) {
  const subtotal=cart.reduce((sum,item)=>sum+(item.price||0)*item.qty,0);
  return <section className="order-page wrap"><p className="shop-hero-context">SPARK-DV / YOUR SELECTION</p><h1>Your cart.</h1>{cart.length?<><div className="order-items">{cart.map(item=><article key={item.slug}><Link to={`/products/${item.slug}`}><ProductImage product={item}/></Link><div><h2>{item.name}</h2><p>{money(item.price)}</p><div className="quantity"><button onClick={()=>update(item.slug,-1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={16}/></button><span aria-live="polite">{item.qty}</span><button onClick={()=>update(item.slug,1)} aria-label={`Increase ${item.name} quantity`}><Plus size={16}/></button><button onClick={()=>remove(item.slug)} aria-label={`Remove ${item.name}`}><X size={16}/></button></div></div></article>)}</div><div className="cart-summary"><h2>Subtotal <strong>{money(subtotal)}</strong></h2><p>This is an enquiry selection. The team will confirm current pricing, availability, shipping and order details.</p><a className="button button-dark" href={orderEnquiryHref(cart)}>Prepare order enquiry <ArrowUpRight size={17}/></a></div></>:<div className="cart-empty"><p>Your selection is empty.</p><Link className="button button-dark" to="/products">Shop products <ArrowRight size={17}/></Link></div>}</section>;
}
function CheckoutUnavailable({cart}) {
  return <section className="order-page wrap"><p className="shop-hero-context">SPARK-DV / ORDER ENQUIRY</p><h1>Online payment isn’t available yet.</h1><p className="checkout-unavailable-copy">Your cart is saved on this device. Send the selected products to our team to confirm current pricing, availability and delivery details.</p>{cart.length?<div className="checkout-selected">{cart.map(item=><p key={item.slug}>{item.name} <span>× {item.qty}</span></p>)}<a className="button button-dark" href={orderEnquiryHref(cart)}>Prepare order enquiry <ArrowUpRight size={17}/></a></div>:<p>Your cart is empty. <Link to="/products">Browse products</Link>.</p>}<Link className="checkout-back-link" to="/cart">Back to cart <ArrowRight size={15}/></Link></section>;
}
function NotFound() {
  return (
    <div className="section wrap not-found">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>
        This page is
        <br />
        <em>out of reach.</em>
      </h1>
      <Link className="button button-dark" to="/">
        Return home <ArrowRight size={16} />
      </Link>
    </div>
  );
}
export default App;
