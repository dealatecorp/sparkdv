import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare, Phone, MoreHorizontal, Edit3, Clock, Mail,
  MapPin, ShieldCheck, CheckCircle2, ChevronRight, Download,
  Package, Heart, Sparkles, Settings, FileText, ExternalLink,
  Plus, Check, X, Bell, Hash, Search, ArrowUpRight
} from 'lucide-react';
import { money } from '../../data';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  trackingNumber: string;
  paymentMethod: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'orders' | 'favorites' | 'notes' | 'settings'>('about');
  const [statusEmoji, setStatusEmoji] = useState('🩺');
  const [statusText, setStatusText] = useState('In Clinic · Until 5:00 PM');
  const [isOnline, setIsOnline] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const defaultUser = {
    name: 'Dr. Chaitanya V.',
    title: 'Chief Pediatric Dental Surgeon & Clinical Researcher',
    clinic: 'SmileCare Advanced Pediatric Dental Center',
    location: 'Hyderabad, Telangana, India',
    email: 'chaitu4766@gmail.com',
    phone: '+91 79814 56043',
    dciReg: 'DCI-TS-2018-09412',
    memberSince: 'August 15, 2022',
    timezone: 'Asia/Kolkata (IST · 3:30 PM local time)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80'
  };

  const [user, setUser] = useState(defaultUser);

  const statusPresets = [
    { emoji: '🩺', text: 'In Clinic · Seeing patients' },
    { emoji: '🔬', text: 'Research Lab · NSF trials' },
    { emoji: '📚', text: 'Reviewing clinical case studies' },
    { emoji: '💬', text: 'Available for clinical consultation' },
    { emoji: '✈️', text: 'Attending IDA dental conference' }
  ];

  const orders: Order[] = [
    {
      id: 'ORD-98241',
      date: 'November 8, 2026',
      total: 4193,
      status: 'Delivered',
      trackingNumber: 'DEL-IND-902814892',
      paymentMethod: 'UPI (chaitu4766@okhdfcbank)',
      items: [
        { name: 'Nanion Pro Plus Gummies', qty: 7, price: 599, image: '/images/gummies-clean.webp' }
      ]
    },
    {
      id: 'ORD-97810',
      date: 'October 24, 2026',
      total: 9400,
      status: 'Delivered',
      trackingNumber: 'DEL-IND-881290431',
      paymentMethod: 'Card (Mastercard ending in 4242)',
      items: [
        { name: 'Nano Silver Pro Solution', qty: 1, price: 4600, image: '/images/nanosilver-pro-clean.webp' },
        { name: 'MARC Zirc Crowns', qty: 1, price: 4200, image: '/images/marc-zirc-clean.webp' },
        { name: 'Nanion Swish Mouthwash', qty: 1, price: 599, image: '/images/swish-bottle-clean.webp' }
      ]
    },
    {
      id: 'ORD-96540',
      date: 'October 2, 2026',
      total: 8250,
      status: 'Delivered',
      trackingNumber: 'DEL-IND-771923019',
      paymentMethod: 'Pay on Delivery (Verified Clinic)',
      items: [
        { name: 'P-Obtura Bio-Activ', qty: 2, price: 4125, image: '/images/pobtura-clean.webp' }
      ]
    }
  ];

  const favorites = [
    {
      name: 'Nanion Lite Pro',
      category: 'Prevention · 5% nHA + NSF',
      price: 699,
      image: '/images/nanion-tube-clean.webp',
      slug: 'nanion-lite-pro'
    },
    {
      name: 'Nanion Swish Mouthwash',
      category: 'Prevention · Daily Rinse',
      price: 599,
      image: '/images/swish-bottle-clean.webp',
      slug: 'nanion-swish'
    },
    {
      name: 'Nano Silver Pro Solution',
      category: 'Prevention · Clinical Solution',
      price: 4600,
      image: '/images/nanosilver-pro-clean.webp',
      slug: 'nanosilver-pro'
    },
    {
      name: 'P-Obtura Bio-Activ',
      category: 'Pediatric endodontics · Sealer',
      price: 4125,
      image: '/images/pobtura-clean.webp',
      slug: 'pobtura'
    }
  ];

  const channels = [
    { name: 'pediatric-endodontics-forum', unread: 2, desc: 'Clinical discussions on P-Obtura & pulpectomy protocols' },
    { name: 'clinical-research-nsf', unread: 0, desc: 'SPARK-DV multi-center trial updates and enamel remineralization papers' },
    { name: 'orders-and-deliveries', unread: 0, desc: 'Real-time dispatch alerts and courier tracking updates' },
    { name: 'announcements-formulations', unread: 5, desc: 'Early access to bioactive compositions before public release' }
  ];

  const copyMemberLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased">
      {/* Top Slack-style Workspace Breadcrumb Banner */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[#073763] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
            SP
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-semibold text-[#073763]">SPARK-DV Clinical Network</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">Practitioner Profiles</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">{user.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Practitioner
          </span>
          <button
            onClick={() => navigate('/products')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#073763] text-white hover:bg-[#052b4f] transition-colors"
            style={{ color: '#ffffff', backgroundColor: '#073763' }}
          >
            Clinical Catalog <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Main Slack Profile Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: THE ICONIC SLACK PROFILE CARD (4 COLS)       */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden sticky top-24">
            {/* Header banner background */}
            <div className="h-28 bg-gradient-to-r from-[#073763] via-[#094883] to-[#63218b] relative">
              <span className="absolute top-3 right-3 text-[11px] font-bold text-white/80 uppercase tracking-widest bg-black/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                MEMBER ID: {user.dciReg.split('-')[1] || 'TS'}
              </span>
            </div>

            {/* Avatar & Online status indicator */}
            <div className="px-6 pb-6 pt-0 relative">
              <div className="relative -mt-14 mb-4 size-24 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-slate-100">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsOnline(!isOnline)}
                  title={isOnline ? "Active (click to toggle)" : "Away (click to toggle)"}
                  className={`absolute bottom-1 right-1 size-4 rounded-full border-2 border-white cursor-pointer ${
                    isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
              </div>

              {/* Name and Pronouns */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-[#073763] tracking-tight">
                    {user.name}
                  </h1>
                  <span className="text-xs text-slate-500 font-medium">(he/him)</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  @chaitanya.v · BDS, MDS
                </p>
                <p className="text-sm font-medium text-slate-700 mt-2 leading-snug">
                  {user.title}
                </p>
              </div>

              {/* Slack Status Pill */}
              <div
                onClick={() => setShowStatusModal(true)}
                className="mt-4 p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 flex items-center justify-between cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-lg">{statusEmoji}</span>
                  <span className="text-xs font-medium text-slate-700 truncate">
                    {statusText}
                  </span>
                </div>
                <Edit3 className="size-3.5 text-slate-400 group-hover:text-slate-700 shrink-0" />
              </div>

              {/* Slack Action Buttons Row */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shadow-2xs"
                >
                  <Package className="size-4 text-[#073763]" />
                  <span>Orders</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('favorites')}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shadow-2xs"
                >
                  <Heart className="size-4 text-[#d90429]" />
                  <span>Favorites</span>
                </button>
                <button
                  type="button"
                  onClick={copyMemberLink}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shadow-2xs"
                >
                  {copiedLink ? <Check className="size-4 text-emerald-600" /> : <MoreHorizontal className="size-4 text-slate-600" />}
                  <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Contact Information Section (Slack Specs) */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3.5 text-xs">
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="size-4 text-slate-400 shrink-0" />
                  <span>{user.timezone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="size-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${user.email}`} className="text-[#073763] hover:underline font-medium">
                    {user.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="size-4 text-slate-400 shrink-0" />
                  <a href={`tel:${user.phone}`} className="text-[#073763] hover:underline font-medium">
                    {user.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="size-4 text-slate-400 shrink-0" />
                  <span>{user.clinic}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <ShieldCheck className="size-4 text-slate-400 shrink-0" />
                  <span>Reg: <strong className="text-slate-800 font-mono">{user.dciReg}</strong></span>
                </div>
              </div>

              {/* Membership Tenure Badge */}
              <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Practitioner Member Since</span>
                <strong className="text-slate-800">{user.memberSince}</strong>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: SLACK WORKSPACE TABS & CONTENT (8 COLS)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Slack Navigation Tabs Bar */}
            <div
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { id: 'about', label: 'Overview & Channels', icon: Hash },
                { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
                { id: 'favorites', label: `Saved Protocols (${favorites.length})`, icon: Heart },
                { id: 'notes', label: 'Clinical Case Notes', icon: FileText },
                { id: 'settings', label: 'Preferences', icon: Settings },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === id
                      ? 'shadow-sm'
                      : 'hover:bg-slate-100'
                  }`}
                  style={
                    activeTab === id
                      ? { color: '#ffffff', backgroundColor: '#073763' }
                      : { color: '#1e293b', backgroundColor: 'transparent' }
                  }
                >
                  <Icon
                    className="size-4 shrink-0"
                    style={{ color: activeTab === id ? '#ffffff' : '#64748b' }}
                  />
                  <span style={{ color: activeTab === id ? '#ffffff' : '#1e293b' }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* ------------------------------------------------------- */}
            {/* TAB 1: OVERVIEW & CHANNELS                              */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'about' && (
              <div className="flex flex-col gap-6">
                {/* 4 Stat Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Completed Orders', value: '7', sub: '₹21,843 total', color: 'text-[#073763]' },
                    { label: 'Practitioner Savings', value: '₹14,800', sub: 'Wholesale tier', color: 'text-emerald-700' },
                    { label: 'Active Protocols', value: '4', sub: 'NSF + Bioactive', color: 'text-[#63218b]' },
                    { label: 'CME Verified', value: '18 Pts', sub: 'Pediatric Endodontics', color: 'text-amber-700' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{stat.label}</span>
                      <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color} mt-1.5`}>{stat.value}</div>
                      <span className="text-xs font-semibold text-slate-500 mt-1 block">{stat.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Connected Practitioner Channels */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#073763] flex items-center gap-2">
                      <Hash className="size-5 text-[#073763]" />
                      Specialist Channels &amp; Discussion Threads
                    </h2>
                    <span className="text-xs font-semibold text-slate-500">4 active channels</span>
                  </div>

                  <div className="flex flex-col divide-y divide-slate-100">
                    {channels.map((ch) => (
                      <div key={ch.name} className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 -mx-3 px-3 rounded-xl transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3">
                          <span className="text-[#073763] font-bold text-base mt-0.5">#</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 group-hover:text-[#073763]">
                                {ch.name}
                              </span>
                              {ch.unread > 0 && (
                                <span className="bg-[#073763] text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: '#ffffff', backgroundColor: '#073763' }}>
                                  {ch.unread} new
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-slate-600 mt-0.5">{ch.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="size-4 text-slate-400 group-hover:text-[#073763] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Delivery Reorder Card */}
                <div className="bg-gradient-to-r from-[#073763] to-[#0a487f] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">Fast Clinic Restock</span>
                    <h3 className="text-2xl font-bold mt-1 text-white">Need a quick supply replenishment?</h3>
                    <p className="text-sm font-medium text-white/90 mt-1 max-w-md">
                      Reorder your recurring clinical batches with 1-click checkout and priority dispatch to {user.clinic}.
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="whitespace-nowrap px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm"
                    style={{ color: '#073763', backgroundColor: '#ffffff' }}
                  >
                    Quick Order Catalog
                  </Link>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB 2: ORDERS & SHIPMENTS                               */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'orders' && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#073763]">Order History &amp; Consignment Tracking</h2>
                  <span className="text-xs text-slate-500">Showing {orders.length} past orders</span>
                </div>

                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#073763]">{ord.id}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500">{ord.date}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="size-3.5" />
                        {ord.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {ord.items.map((it) => (
                        <div key={it.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {it.image && (
                              <img src={it.image} alt={it.name} className="size-12 object-contain bg-slate-50 rounded-lg p-1 border border-slate-100" />
                            )}
                            <div>
                              <span className="text-sm font-semibold text-slate-800">{it.name}</span>
                              <span className="text-xs text-slate-500 block">Quantity: {it.qty}</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-[#073763]">{money(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                      <div>
                        <span>Tracking: </span>
                        <strong className="font-mono text-slate-800">{ord.trackingNumber}</strong>
                        <span className="text-slate-400 mx-2">|</span>
                        <span>{ord.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading GST Tax Invoice for ${ord.id}...`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 text-xs"
                        >
                          <Download size={13} /> GST Invoice
                        </button>
                        <Link
                          to="/checkout"
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#073763] text-white font-bold text-xs hover:bg-[#052b4f] shadow-sm"
                          style={{ color: '#ffffff', backgroundColor: '#073763' }}
                        >
                          Reorder
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB 3: SAVED PROTOCOLS & FAVORITES                      */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'favorites' && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#073763]">Saved Formulations &amp; Chairside Materials</h2>
                  <Link to="/products" className="text-xs font-semibold text-[#073763] hover:underline flex items-center gap-1">
                    Browse All 17 Products <ArrowUpRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.map((fav) => (
                    <div key={fav.name} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img src={fav.image} alt={fav.name} className="size-16 object-contain bg-slate-50 rounded-xl p-1.5 border border-slate-100" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{fav.name}</h4>
                          <span className="text-xs text-slate-500 block">{fav.category}</span>
                          <strong className="text-sm text-[#073763] mt-1 block">{money(fav.price)}</strong>
                        </div>
                      </div>
                      <Link
                        to={`/products/${fav.slug}`}
                        className="px-4 py-2 rounded-xl bg-[#073763] text-white text-xs font-bold hover:bg-[#052b4f] shrink-0 shadow-sm"
                        style={{ color: '#ffffff', backgroundColor: '#073763' }}
                      >
                        Inspect
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB 4: CLINICAL CASE NOTES                              */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'notes' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#073763]">Clinical Case Notes &amp; Observations</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Confidential treatment notes and post-op recall schedules.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('New clinical observation note created.')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#073763] text-white text-xs font-bold shadow-sm"
                    style={{ color: '#ffffff', backgroundColor: '#073763' }}
                  >
                    <Plus size={14} /> New Case Note
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    {
                      date: 'Nov 6, 2026',
                      patient: 'Patient #4102 (Age 5)',
                      protocol: 'Nanion Elite 3% NSF Arrest',
                      note: 'Applied on active dentin caries tooth 74, 84. No sensitivity noted. Recall scheduled for 3-month radiograph inspection.',
                    },
                    {
                      date: 'Oct 28, 2026',
                      patient: 'Patient #3988 (Age 7)',
                      protocol: 'P-Obtura Bio-Activ Pulpectomy',
                      note: 'Obturation of 55 completed. Bioactive calcium hydroxide paste flowed cleanly to apical third without voids.',
                    },
                    {
                      date: 'Oct 15, 2026',
                      patient: 'Patient #3821 (Age 8)',
                      protocol: 'MARC Zirc Aesthetic Crown',
                      note: 'Conservative preparation and cementation with Nanohybrid Biocem. Gingival margin healthy at 2-week recall.',
                    }
                  ].map((entry) => (
                    <div key={entry.patient} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-[#073763]">{entry.patient}</span>
                        <span className="text-slate-400">{entry.date}</span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                        {entry.protocol}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB 5: PREFERENCES & CLINIC SETTINGS                    */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
                <div>
                  <h2 className="text-lg font-bold text-[#073763]">Practitioner &amp; Clinic Preferences</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage notifications, clinic delivery addresses, and account security.</p>
                </div>

                <div className="flex flex-col divide-y divide-slate-100 text-sm">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-800 font-semibold block">Batch Order Dispatch SMS Alerts</strong>
                      <span className="text-xs text-slate-500">Receive real-time delivery pin updates on +91 79814 56043</span>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 accent-[#073763]" />
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-800 font-semibold block">Automatic GST Invoice Emailing</strong>
                      <span className="text-xs text-slate-500">Email official invoice PDF to chaitu4766@gmail.com</span>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 accent-[#073763]" />
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-800 font-semibold block">Clinical Trial Protocol Notifications</strong>
                      <span className="text-xs text-slate-500">Get notified when new evidence-based application guides are released</span>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 accent-[#073763]" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => alert('Preferences saved successfully.')}
                    className="px-6 py-2.5 rounded-xl bg-[#073763] text-white font-bold text-xs hover:bg-[#052b4f] shadow-sm"
                    style={{ color: '#ffffff', backgroundColor: '#073763' }}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slack Status Customization Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#073763]">Set a Status</h3>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="size-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 mb-4 bg-slate-50">
              <span className="text-2xl">{statusEmoji}</span>
              <input
                type="text"
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
                className="w-full text-sm font-medium text-slate-800 bg-transparent outline-none"
                placeholder="What's your current clinical status?"
              />
            </div>

            <span className="text-xs font-semibold text-slate-500 block mb-2 uppercase tracking-wider">
              Quick Presets
            </span>
            <div className="flex flex-col gap-1.5 mb-6">
              {statusPresets.map((preset) => (
                <button
                  key={preset.text}
                  type="button"
                  onClick={() => {
                    setStatusEmoji(preset.emoji);
                    setStatusText(preset.text);
                  }}
                  className="p-2.5 rounded-xl text-left text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="text-base">{preset.emoji}</span>
                  <span className="font-medium">{preset.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#073763] text-white hover:bg-[#052b4f]"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
