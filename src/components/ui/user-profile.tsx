import { BrandWordmark } from '@/components/ui/brand-wordmark';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, History, LogOut, MessageCircle, Package, ShieldCheck, ShoppingBag, Store, Truck, UserRound } from 'lucide-react';
import { useAuth } from '../auth-provider';
import type { AccountUser } from '../../lib/auth';
import { readRecentProducts } from '../../lib/recent-products';
import { img, money, products } from '../../data';
import { ProductImage } from '../../Editorial';
import './user-profile.css';

const featuredSlugs = ['nanion-lite', 'nanion-elite-pro', 'nanion-swish'];
const featuredProducts = featuredSlugs.flatMap(slug => products.filter(product => product.slug === slug));

export default function UserProfile({ user, cartQty }: { user: AccountUser; cartQty: number }) {
  const { changeSession } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState('');
  const recentProducts = readRecentProducts(user.id).flatMap(slug => products.filter(product => product.slug === slug));
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0]).join('');
  const memberSince = new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const cartLabel = cartQty === 1 ? '1 item in your cart' : `${cartQty} items in your cart`;

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    setError('');
    try {
      await changeSession('sign-out');
    } catch {
      setError('We couldn’t sign you out. Try again.');
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-dashboard">
        <aside className="profile-sidebar">
          <Link className="profile-brand" to="/" aria-label="SPARK-DV home">
            <img src={img('logo.svg')} width={34} height={34} alt="" />
            <span><BrandWordmark /></span>
          </Link>
          <nav className="profile-nav" aria-label="Profile navigation">
            <Link to="/profile" aria-current="page"><UserRound size={17} aria-hidden="true" /> Profile</Link>
            <Link to="/orders"><Package size={17} aria-hidden="true" /> My orders</Link>
            {user.order_staff && <Link to="/manage/orders"><Truck size={17} aria-hidden="true" /> Manage orders</Link>}
            <Link to="/products"><Store size={17} aria-hidden="true" /> Products</Link>
            <Link to="/cart"><ShoppingBag size={17} aria-hidden="true" /> Cart</Link>
            <Link to="/login?mode=change"><ShieldCheck size={17} aria-hidden="true" /> Security</Link>
          </nav>
          <Link className="profile-cart-shortcut" to="/cart">
            <span className="profile-cart-icon"><ShoppingBag size={20} aria-hidden="true" /></span>
            <strong>{cartQty ? cartLabel : 'Your cart'}</strong>
            <span className="profile-inline-link">View cart <ArrowRight size={15} aria-hidden="true" /></span>
          </Link>
        </aside>

        <section className="profile-content" aria-labelledby="profile-heading">
          <header className="profile-heading">
            <h1 id="profile-heading">Profile</h1>
            <Link className="profile-inline-link" to="/products">Browse products <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </header>

          <ul className="profile-featured" aria-label="Featured products">
            {featuredProducts.map(product => (
              <li key={product.slug}>
                <Link className="profile-product-card" to={`/products/${product.slug}`}>
                  <ProductImage product={product} />
                  <span className="profile-product-info">
                    <strong>{product.name}</strong>
                    <span>{money(product.price)}</span>
                  </span>
                  <ArrowUpRight className="profile-card-arrow" size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="profile-activity">
            <section className="profile-history" aria-labelledby="profile-history-heading">
              <h2 id="profile-history-heading">Browsing history</h2>
              {recentProducts.length ? (
                <ul className="profile-history-list">
                  {recentProducts.map(product => (
                    <li key={product.slug}>
                      <Link to={`/products/${product.slug}`}>
                        <ProductImage product={product} />
                        <span><strong>{product.name}</strong><small>{product.eyebrow}</small></span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="profile-empty-history">
                  <History size={20} aria-hidden="true" />
                  <p>Products you view while signed in will appear here on this device.</p>
                </div>
              )}
            </section>

            <section className="profile-help" aria-labelledby="profile-help-heading">
              <div className="profile-help-heading">
                <MessageCircle size={19} aria-hidden="true" />
                <h2 id="profile-help-heading">Order support</h2>
              </div>
              <p>Read delivery updates in My orders or ask the <BrandWordmark /> team a question.</p>
              <Link className="profile-inline-link" to="/orders">Track an order <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <Link className="profile-inline-link" to="/contact">Contact us <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </section>
          </div>
        </section>

        <aside className="profile-account" aria-labelledby="account-heading">
          <button className="profile-sign-out" type="button" onClick={signOut} disabled={signingOut}>
            <LogOut size={16} aria-hidden="true" /> {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
          {error && <p className="profile-error" role="alert">{error}</p>}

          <div className="profile-identity">
            <div className="profile-avatar" aria-hidden="true">{initials}</div>
            <h2 id="account-heading">{user.name}</h2>
            <p>{user.email}</p>
            {user.mobile && <p>{user.mobile}</p>}
          </div>

          <dl className="profile-stats">
            <div><dt>Recently viewed</dt><dd>{recentProducts.length}</dd></div>
            <div><dt>Items in cart</dt><dd>{cartQty}</dd></div>
          </dl>

          <div className="profile-membership">
            <span>Member since</span>
            <time dateTime={user.created_at}>{memberSince}</time>
          </div>
          <Link className="profile-password" to="/login?mode=change">
            <ShieldCheck size={17} aria-hidden="true" /> Change password <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <details className="profile-membership profile-account-reference">
            <summary>Account reference</summary>
            <code>{user.id}</code>
          </details>
        </aside>
      </div>
    </div>
  );
}
