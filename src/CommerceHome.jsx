import React, {lazy, Suspense, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {products} from './data';
import assets from './product-assets.json';
import {HomeCommunity} from './components/home/home-editorial';
import SneakerProductHero from './components/ui/sneaker-product-hero';
const LandingReveal=lazy(()=>import('./components/ui/landing-reveal'));
const StickerCurtainHero=lazy(()=>import('./components/ui/sticker-curtain-hero'));


export function CommerceHome({add}) {
  const variants=useMemo(()=>products.map(product=>{
    const asset=assets[product.slug];
    const tint=product.category==='Prevention'?'#b8cbd0':product.category==='Pediatric endodontics'?'#eecdbb':product.category==='Restorations'?'#d9cee7':'#c6d5c7';
    return {name:product.name,src:asset.local,swatch:tint,tint,product};
  }),[]);
  const defaultVariant=Math.max(0,products.findIndex(p=>p.slug==='nanion-lite-pro'));
  const curtainPhotos=['nanion-lite-pro','nanion-elite','nanion-swish','pobtura','nanohybrid-biocem','marc','marc-zirc','nanosilver-pro'].map(slug=>({src:assets[slug].local,alt:assets[slug].name}));
  return <div className="commerce-home">
    <Suspense fallback={null}><LandingReveal/></Suspense>
    <Suspense fallback={<section className="shop-sticker-fallback" aria-label="SPARK-DV"><h1>SPARK-DV</h1></section>}><StickerCurtainHero photos={curtainPhotos}/></Suspense>
    <section id="featured-products" className="shop-hero-shell" aria-label="Featured product">
      <SneakerProductHero className="brand-product-hero" variants={variants} defaultVariant={defaultVariant} sizes={[{label:'1'},{label:'2'},{label:'3'}]} price={0} currency="₹" rating={0} reviews={0} height="min(820px, calc(100svh - 80px))" showGallery={false} toast="Added to your cart" likeColor="#63218b" onAddToCart={({variant,size})=>{const selected=products.find(p=>p.slug===variant.product?.slug);if(selected&&selected.price!=null&&!selected.coming)add(selected,Number(size))}}/>
    </section>

    <section className="shop-science-band"><div className="wrap shop-science-inner"><h2>Product details,<br/><em>without the guesswork.</em></h2><p>Read product information, use guidance and clinical resources from SPARK-DV.</p><Link className="button button-light" to="/science">Explore the blogs <ArrowUpRight size={16}/></Link></div></section>
    <div className="commerce-home-community"><HomeCommunity/></div>
    <section className="shop-audience wrap" aria-label="Explore SPARK-DV"><Link to="/dentists"><span>For dental professionals</span><strong>Protocols & product support <ArrowUpRight size={18}/></strong></Link><Link to="/parents"><span>For parents</span><strong>Everyday care guidance <ArrowUpRight size={18}/></strong></Link><Link to="/contact?type=Distributor%20enquiry"><span>For partners</span><strong>Distribution enquiries <ArrowUpRight size={18}/></strong></Link></section>
  </div>;
}
