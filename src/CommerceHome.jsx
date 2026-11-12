import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollProductHero from './components/ui/scroll-product-hero';
import { ProductShelf } from './components/ui/skincare-product-shelf';
import { products } from './data.js';

export function CommerceHome({ add }) {
  return (
    <div className="commerce-home">
      {/* Scroll-driven centerpiece hero section matching reference image */}
      <ScrollProductHero />

      {/* 3D Product Shelf floating wall just below hero */}
      <section className="home-product-shelf-mount" id="product-shelf" aria-label="Product Shelf">
        <ProductShelf
          showFloatingNav={false}
          onAddToCart={(shelfProduct, qty, event) => {
            if (add) {
              const matched = products.find(p => p.slug === shelfProduct.slug || p.id === shelfProduct.id) || shelfProduct;
              add(matched, qty, event);
            }
          }}
        />
      </section>

      {/* Editorial and scientific research band */}
      <section className="shop-science-band" id="home-content">
        <div className="wrap shop-science-inner">
          <h2>
            Product details,
            <br />
            <em>without the guesswork.</em>
          </h2>
          <p>
            Read product information, use guidance and clinical resources from SPARK-DV.
          </p>
          <Link className="button button-light" to="/science">
            Explore the blogs <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Audience navigation cards */}
      <section className="shop-audience wrap" aria-label="Explore SPARK-DV">
        <Link to="/dentists">
          <span>For dental professionals</span>
          <strong>Protocols &amp; product support <ArrowUpRight size={18} /></strong>
        </Link>
        <Link to="/parents">
          <span>For parents</span>
          <strong>Everyday care guidance <ArrowUpRight size={18} /></strong>
        </Link>
        <Link to="/contact?type=Distributor%20enquiry">
          <span>For partners</span>
          <strong>Distribution enquiries <ArrowUpRight size={18} /></strong>
        </Link>
      </section>
    </div>
  );
}
