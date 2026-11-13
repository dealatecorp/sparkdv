import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollProductHero from './components/ui/scroll-product-hero';
import { HomeHypeSections } from './components/home/HomeHypeSections';

export function CommerceHome({ add }) {
  return (
    <div className="commerce-home">
      {/* Scroll-driven centerpiece hero section */}
      <ScrollProductHero />

      {/* High-status company leadership, 21st.dev / Inspira UI bento grid, dual portals, and flagships */}
      <HomeHypeSections add={add} />

      {/* Editorial and scientific research band */}
      <section className="shop-science-band" id="home-content">
        <div className="wrap shop-science-inner">
          <h2>
            Product details,
            <br />
            <em>without the guesswork.</em>
          </h2>
          <p>
            Read clinical trial summaries, IFU use guidance, and peer-reviewed dental literature from SPARK-DV.
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
