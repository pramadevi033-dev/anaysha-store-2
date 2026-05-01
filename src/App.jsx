import { useState, useEffect, useRef, useCallback } from 'react';
import s1 from "./assets/Insta1.jpg";
import i1 from "./assets/Insta2.jpg";
import i2 from "./assets/Insta3.jpg";
import i3 from "./assets/Insta4.jpg";
import i4 from "./assets/Insta5.jpg";
import grb from "./assets/grb.jpg";
import b3 from "./assets/b3.jpg";
import b2 from "./assets/b2.jpg";
import sr1 from "./assets/sr1.jpg";
import sr2 from "./assets/sr2.jpg";
import sr3 from "./assets/sr3.jpg";
import sr4 from "./assets/sr4.jpg";
import sr5 from "./assets/sr5.jpg";
import sr6 from "./assets/sr6.jpg";
import sr7 from "./assets/sr7.jpg";
import sr8 from "./assets/sr8.jpg";
import lehn1 from "./assets/lehn1.jpg";
import lehn2 from "./assets/lehn2.jpg";
import lehn3 from "./assets/lehn3.jpg";
import lehn4 from "./assets/lehn4.jpg";
import lehn5 from "./assets/lehn5.jpg";
import lehn6 from "./assets/lehn6.jpg";
import lehn7 from "./assets/lehn7.jpg";
import dr1 from "./assets/dr1.jpg";
import dr2 from "./assets/dr2.jpg";
import dr3 from "./assets/dr3.jpg";
import dr4 from "./assets/dr4.jpg";
import dr5 from "./assets/dr5.jpg";
import dr6 from "./assets/dr6.jpg";
import k1 from "./assets/k1.jpg";
import k2 from "./assets/k2.jpg";
import k3 from "./assets/k3.jpg";

import k5 from "./assets/k5.jpg";
import k6 from "./assets/k6.jpg";
import k7 from "./assets/k7.jpg";
import c1 from "./assets/c1.jpg";
import c2 from "./assets/c2.jpg";
import c3 from "./assets/c3.jpg";
import c4 from "./assets/c4.jpg";


// ─── VERIFIED UNSPLASH IMAGE POOL ─────────────────────────────────────────────
// Every URL below is a real, working Unsplash photo — no openai.com links

const U = {
  // Indian saree / ethnic women portraits
  i1:i1,
  i2:i2,
  i3:i3,
  i4 :i4,
 s1: s1,
 sr1:sr1,
 sr2:sr2,
 sr3 :sr3,
 sr4 :sr4,
 sr5 :sr5,
 sr6:sr6,
 sr7:sr7,
 sr8:sr8,
 grb:grb,
 lehn1:lehn1,
 lehn2:lehn2,
 
 lehn3:lehn3,
 lehn4:lehn4,
 lehn5:lehn5,
 lehn6:lehn6,
 lehn7:lehn7,
 dr1 :dr1,
 dr2 :dr2,
 dr3 :dr3,
 dr4 :dr4,
 dr5:dr5,
 dr6 :dr6,
 k1:k1,
 k2 :k2,
 k3 :k3,
 k6 :k6,
 k5 :k5,
k7 :k7,
b3:b3,
b2:b2,
c1 :c1,
c2:c2,
c3:c3,
c4:c4,
  s2:  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=900&q=90&fit=crop&crop=top',
  s3:  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&q=90&fit=crop&crop=top',
  s4:  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&q=90&fit=crop&crop=top',
  s5:  'https://images.unsplash.com/photo-1594938298603-c8148c4b9a56?w=900&q=90&fit=crop&crop=top',
  s6:  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=90&fit=crop&crop=top',
  s7:  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=90&fit=crop&crop=center',
  s8:  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=900&q=90&fit=crop&crop=center',
  // wide hero banners (16:9)
  h1:  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=95&fit=crop',
  h2:  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1920&q=95&fit=crop',
  h3:  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1920&q=95&fit=crop',
  // promo banner
  promo: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=90&fit=crop',
};

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23F5F0E8' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='14' fill='%23C9A96E' text-anchor='middle' dy='.3em'%3EAnaysha%3C/text%3E%3C/svg%3E";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  { image: U.b2, heading: ['Draped in', 'Heritage'],  sub: 'Handwoven Banarasi & Kanjeevaram silks — crafted for the modern woman', cta: 'Explore Sarees',  ctaPage: 'Sarees' },
  { image: U.h2, heading: ['Bridal',    'Royalty'],   sub: 'Lehengas that turn your most sacred moments into unforgettable memories',   cta: 'Bridal Edit',    ctaPage: 'Lehengas' },
  { image: U.b3, heading: ['Everyday',  'Grace'],     sub: 'Contemporary kurtis blending tradition with effortless modern living',       cta: 'Shop Kurtis',    ctaPage: 'Kurtis' },
];

const CATEGORIES = [
  { id:1, name:'Sarees',   subtitle:'Timeless Drapes',  image: U.c1, accent:'#C9A96E', tag:'New Arrivals', count:'240+ styles' },
  { id:2, name:'Kurtis',   subtitle:'Everyday Grace',   image: U.c2, accent:'#B07BA0', tag:'Bestseller',   count:'180+ styles' },
  { id:3, name:'Lehengas', subtitle:'Bridal Royalty',   image: U.c3, accent:'#D4846A', tag:'Festive Edit',  count:'120+ styles' },
  { id:4, name:'Dresses',  subtitle:'Modern Indian',    image: U.c4, accent:'#6A9BAD', tag:'Trending',      count:'90+ styles' },
];

const PRODUCTS = [
  // ── SAREES (8) ──────────────────────────────────────────────────────────────
  { id:1,  name:'Gulabi Chanderi Saree',      subtext:'Banarasi · Pure Silk',        price:4850,  originalPrice:6200,  image:U.sr1, badge:'New',       badgeColor:'#2E7D32', badgeBg:'#E8F5E9', rating:4.8, reviews:124, category:'Sarees' },
  { id:2,  name:'Emerald Banarasi Silk',      subtext:'Banarasi · Zari Border',      price:8900,  originalPrice:12500, image:U.sr2, badge:'Premium',   badgeColor:'#F57F17', badgeBg:'#FFF8E1', rating:4.9, reviews:68,  category:'Sarees' },
  { id:3,  name:'Indigo Ikat Handloom',       subtext:'Ikat · Handwoven',            price:5200,  originalPrice:null,  image:U.sr3, badge:'Handloom',  badgeColor:'#1565C0', badgeBg:'#E3F2FD', rating:4.7, reviews:102, category:'Sarees' },
  { id:4,  name:'Crimson Kanjeevaram',        subtext:'Kanjeevaram · Temple Border', price:11500, originalPrice:14800, image:U.sr4, badge:'Bestseller',badgeColor:'#880E4F', badgeBg:'#FCE4EC', rating:4.9, reviews:215, category:'Sarees' },
  { id:5,  name:'Ivory Tussar Silk Saree',    subtext:'Tussar · Hand-painted',       price:6750,  originalPrice:null,  image:U.sr5, badge:'Exclusive', badgeColor:'#6A1B9A', badgeBg:'#F3E5F5', rating:4.8, reviews:88,  category:'Sarees' },
  { id:6,  name:'Peacock Blue Georgette',     subtext:'Georgette · Embroidered',     price:3200,  originalPrice:4500,  image:U.sr6, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.6, reviews:143, category:'Sarees' },
  { id:7,  name:'Golden Zari Kanjivaram',     subtext:'Kanjeevaram · Bridal',        price:16500, originalPrice:21000, image:U.sr7, badge:'Bridal',    badgeColor:'#880E4F', badgeBg:'#FCE4EC', rating:5.0, reviews:54,  category:'Sarees' },
  { id:8,  name:'Mauve Organza Saree',        subtext:'Organza · Floral Print',      price:2950,  originalPrice:3800,  image:U.sr8, badge:'New',       badgeColor:'#2E7D32', badgeBg:'#E8F5E9', rating:4.5, reviews:71,  category:'Sarees' },

  // ── KURTIS (7) ──────────────────────────────────────────────────────────────
  { id:9,  name:'Ivory Block Print Kurti',    subtext:'Cotton · Block Print',        price:1990,  originalPrice:2800,  image:U.k1, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.6, reviews:89,  category:'Kurtis' },
  { id:10, name:'Marigold Anarkali Set',      subtext:'Georgette · Festive',         price:3450,  originalPrice:null,  image:U.k2, badge:'Exclusive', badgeColor:'#6A1B9A', badgeBg:'#F3E5F5', rating:4.9, reviews:57,  category:'Kurtis' },
  { id:11, name:'Terracotta Printed Kurti',   subtext:'Rayon · Printed',             price:1450,  originalPrice:1900,  image:U.k3, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.4, reviews:132, category:'Kurtis' },
  { id:12, name:'Sage Green Chikankari',      subtext:'Cotton · Chikankari',         price:2750,  originalPrice:null,  image:U.dr4, badge:'Handcraft', badgeColor:'#2E7D32', badgeBg:'#E8F5E9', rating:4.8, reviews:96,  category:'Kurtis' },
  { id:13, name:'Rose Embroidered Kurti',     subtext:'Silk Blend · Festive',        price:3100,  originalPrice:4200,  image:U.k5, badge:'New',       badgeColor:'#2E7D32', badgeBg:'#E8F5E9', rating:4.7, reviews:48,  category:'Kurtis' },
  { id:14, name:'White Festive Kurti',        subtext:'Cotton Silk · Indo-fusion',   price:2400,  originalPrice:null,  image:U.k7, badge:'Trending',  badgeColor:'#1565C0', badgeBg:'#E3F2FD', rating:4.6, reviews:74,  category:'Kurtis' },
  { id:15, name:'Peach Sequin Kurti',         subtext:'Georgette · Party Wear',      price:2850,  originalPrice:3600,  image:U.k6, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.5, reviews:109, category:'Kurtis' },

  // ── LEHENGAS (7) ────────────────────────────────────────────────────────────
  { id:16, name:'Rose Silk Lehenga',          subtext:'Bridal · Pure Silk',          price:12500, originalPrice:15000, image:U.lehn1, badge:'Bridal',    badgeColor:'#880E4F', badgeBg:'#FCE4EC', rating:5.0, reviews:43,  category:'Lehengas' },
  { id:17, name:'Crimson Velvet Lehenga',     subtext:'Velvet · Heavy Embroidery',   price:18500, originalPrice:24000, image:U.lehn2, badge:'Bridal',    badgeColor:'#880E4F', badgeBg:'#FCE4EC', rating:5.0, reviews:112, category:'Lehengas' },
  { id:18, name:'Mint Georgette Lehenga',     subtext:'Georgette · Festive',         price:7800,  originalPrice:9500,  image:U.lehn3, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.7, reviews:85,  category:'Lehengas' },
  { id:19, name:'Royal Blue Designer Lehenga',subtext:'Net · Zardosi Work',          price:22000, originalPrice:28000, image:U.lehn4, badge:'Designer',  badgeColor:'#1565C0', badgeBg:'#E3F2FD', rating:4.9, reviews:67,  category:'Lehengas' },
  { id:20, name:'Peach Mirror Work Lehenga',  subtext:'Cotton · Mirror Embroidery',  price:5500,  originalPrice:7000,  image:U.lehn5, badge:'New',       badgeColor:'#2E7D32', badgeBg:'#E8F5E9', rating:4.6, reviews:38,  category:'Lehengas' },
  { id:21, name:'Golden Tissue Lehenga',      subtext:'Tissue Silk · Bridal',        price:31000, originalPrice:38000, image:U.lehn6, badge:'Premium',   badgeColor:'#F57F17', badgeBg:'#FFF8E1', rating:5.0, reviews:29,  category:'Lehengas' },
  { id:22, name:'Lavender Floral Lehenga',    subtext:'Chiffon · Floral Print',      price:6200,  originalPrice:null,  image:U.lehn7, badge:'Exclusive', badgeColor:'#6A1B9A', badgeBg:'#F3E5F5', rating:4.8, reviews:51,  category:'Lehengas' },

  // ── DRESSES (6) ─────────────────────────────────────────────────────────────
  { id:23, name:'Saffron Palazzo Set',        subtext:'Rayon · Festive',             price:2100,  originalPrice:2900,  image:U.dr1, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.5, reviews:76,  category:'Dresses' },
  { id:24, name:'Teal Indo-Western Dress',    subtext:'Georgette · Fusion',          price:3400,  originalPrice:null,  image:U.dr2, badge:'Trending',  badgeColor:'#00695C', badgeBg:'#E0F2F1', rating:4.7, reviews:64,  category:'Dresses' },
  { id:25, name:'Pink Sharara Set',           subtext:'Organza · Party Wear',        price:4200,  originalPrice:5500,  image:U.dr3, badge:'New',       badgeColor:'#2E7D32', badgeBg:'#E8F5E9', rating:4.8, reviews:47,  category:'Dresses' },
  { id:26, name:'Mustard Palazzo Suit',       subtext:'Cotton · Everyday Wear',      price:1800,  originalPrice:2400,  image:U.dr4, badge:'Sale',      badgeColor:'#E65100', badgeBg:'#FFF3E0', rating:4.4, reviews:118, category:'Dresses' },
  { id:27, name:'Wine Dhoti Fusion Set',      subtext:'Crepe · Indo-Fusion',         price:3750,  originalPrice:null,  image:U.dr5, badge:'Exclusive', badgeColor:'#6A1B9A', badgeBg:'#F3E5F5', rating:4.6, reviews:33,  category:'Dresses' },
  { id:28, name:'Ivory Embroidered Co-ord',   subtext:'Silk Blend · Festive',        price:4900,  originalPrice:6200,  image:U.dr6, badge:'Premium',   badgeColor:'#F57F17', badgeBg:'#FFF8E1', rating:4.9, reviews:82,  category:'Dresses' },
];

const TESTIMONIALS = [
  { name:'Priya M.',   city:'Mumbai',    text:"The Chanderi saree was beyond beautiful. Quality is absolutely premium — I wore it to my sister's wedding and received compliments all evening!", stars:5, initial:'P' },
  { name:'Ananya S.',  city:'Bangalore', text:'Packaging felt luxurious, delivery was lightning fast. The banarasi silk exceeded every expectation I had. Will definitely order again.',          stars:5, initial:'A' },
  { name:'Kavya R.',   city:'Hyderabad', text:"My go-to brand for festive wear. The colours are so vibrant and true to pictures. Anaysha truly understands Indian women.",                       stars:5, initial:'K' },
  { name:'Neha K.',    city:'Delhi',     text:'Excellent craftsmanship! The lehenga fit perfectly and the embroidery work is exquisite. Worth every rupee spent.',                              stars:5, initial:'N' },
];

const NAV_LINKS = ['Collections', 'Sarees', 'Kurtis', 'Lehengas', 'Sale'];
const fmt  = (n) => `₹${n.toLocaleString('en-IN')}`;
const pct  = (o, c) => Math.round(((o - c) / o) * 100);

// ─── SAFE IMAGE COMPONENT ─────────────────────────────────────────────────────
const Img = ({ src, alt, style, className }) => (
  <img
    src={src} alt={alt} style={style} className={className}
    loading="lazy"
    onError={e => { e.target.onerror = null; e.target.src = FALLBACK; }}
  />
);

// ─── FONT LOADER ──────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const id = 'anaysha-fonts';
    if (!document.getElementById(id)) {
      const el = document.createElement('link');
      el.id = id; el.rel = 'stylesheet';
      el.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap';
      document.head.appendChild(el);
    }
  }, []);
  return null;
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #FDFAF4; }
    :root {
      --gold: #C9A96E; --gold-dark: #A8894E; --gold-light: #E8C97A;
      --cream: #FDFAF4; --cream-2: #F5F0E8;
      --brown: #2C1810; --mauve: #B07BA0;
      --white: #FFFDF8; --text-muted: rgba(44,24,16,0.5);
    }
    @keyframes slideUp    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideRight { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
    @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulse      { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
    @keyframes kenBurns   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }

    .nav-link { position:relative }
    .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:1px; background:var(--gold); transform:scaleX(0); transition:transform .35s ease; transform-origin:left; }
    .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1) }

    .product-card { transition:transform .45s cubic-bezier(.25,.8,.25,1),box-shadow .45s ease }
    .product-card:hover { transform:translateY(-12px); box-shadow:0 32px 64px rgba(44,24,16,.15) }
    .product-card:hover .card-img { transform:scale(1.07) }
    .product-card:hover .quick-add { opacity:1 !important; transform:translateY(0) !important }
    .card-img  { transition:transform .8s cubic-bezier(.25,.8,.25,1) }
    .quick-add { transition:opacity .35s ease,transform .35s ease }

    .cat-card:hover .cat-img { transform:scale(1.07) }
    .cat-img { transition:transform .8s cubic-bezier(.25,.8,.25,1) }
    .cat-card:hover .cat-overlay { opacity:.78 !important }

    .btn-gold  { background:var(--gold); color:var(--brown); border:none; cursor:pointer; font-family:'EB Garamond',Georgia,serif; font-size:11.5px; letter-spacing:3.5px; text-transform:uppercase; font-weight:600; transition:background .3s,transform .2s,box-shadow .3s; }
    .btn-gold:hover  { background:var(--gold-dark); transform:translateY(-2px); box-shadow:0 10px 28px rgba(201,169,110,.4) }
    .btn-ghost { background:transparent; border:1.5px solid var(--gold); color:var(--gold); cursor:pointer; font-family:'EB Garamond',Georgia,serif; font-size:11.5px; letter-spacing:3.5px; text-transform:uppercase; font-weight:500; transition:all .3s; }
    .btn-ghost:hover { background:var(--gold); color:var(--brown) }

    .wish-btn { transition:transform .2s ease }
    .wish-btn:hover { transform:scale(1.25) }
    .testimonial-card { transition:transform .35s ease }
    .testimonial-card:hover { transform:translateY(-8px) }
    .hero-img-active { animation:kenBurns 12s ease-in-out infinite }

    ::-webkit-scrollbar { width:5px }
    ::-webkit-scrollbar-track { background:var(--cream-2) }
    ::-webkit-scrollbar-thumb { background:var(--gold); border-radius:3px }

    @media(max-width:900px) {
      .nav-desktop { display:none !important }
      .cat-grid   { grid-template-columns:1fr 1fr !important }
      .prod-grid  { grid-template-columns:1fr 1fr !important }
      .footer-grid{ grid-template-columns:1fr 1fr !important }
      .cart-layout{ grid-template-columns:1fr !important }
      .insta-grid { grid-template-columns:repeat(3,1fr) !important }
    }
    @media(max-width:540px) {
      .cat-grid   { grid-template-columns:1fr !important }
      .prod-grid  { grid-template-columns:1fr !important }
      .footer-grid{ grid-template-columns:1fr !important }
      .insta-grid { grid-template-columns:repeat(2,1fr) !important }
    }
  `}</style>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({ cartCount, currentPage, onNavigate }) => {
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80); }, [searchOpen]);

  const onSearch = e => {
    e.preventDefault();
    if (query.trim()) { onNavigate('Search', query.trim()); setSearchOpen(false); setQuery(''); }
  };

  const light = !scrolled && currentPage === 'Home';
  const navBg = scrolled ? 'rgba(253,250,244,0.97)' : currentPage === 'Home' ? 'transparent' : 'rgba(253,250,244,0.98)';

  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:300, background:navBg, backdropFilter:scrolled?'blur(22px)':'none', borderBottom:scrolled?'1px solid rgba(201,169,110,0.18)':'none', transition:'all .5s ease' }}>
        <div style={{ maxWidth:1440, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:80, padding:'0 5%' }}>

          <button onClick={() => onNavigate('Home')} style={{ background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:32, fontWeight:600, letterSpacing:4, color:light?'#FFFDF8':'var(--brown)', transition:'color .4s', lineHeight:1 }}>ANAYSHA</div>
            <div style={{ fontSize:8, letterSpacing:7, color:'var(--gold)', textTransform:'uppercase', fontFamily:"'EB Garamond',Georgia,serif", marginTop:3 }}>Indian Couture</div>
          </button>

          <div className="nav-desktop" style={{ display:'flex', gap:44 }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => onNavigate(link)}
                className={`nav-link ${currentPage===link?'active':''}`}
                style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'EB Garamond',Georgia,serif", fontSize:12.5, letterSpacing:3, textTransform:'uppercase', color:light?'rgba(255,253,248,0.88)':'var(--brown)', transition:'color .3s', paddingBottom:4 }}>
                {link}
              </button>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <button onClick={() => setSearchOpen(v => !v)} style={{ background:'none', border:'none', cursor:'pointer', padding:8, color:light?'rgba(255,253,248,0.88)':'var(--brown)', fontSize:16 }}>🔍</button>
            <button onClick={() => onNavigate('Cart')} style={{ background:'var(--gold)', border:'none', cursor:'pointer', borderRadius:'50%', width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', fontSize:17, transition:'background .3s' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--gold-dark)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}>
              🛍️
              {cartCount > 0 && <span style={{ position:'absolute', top:-4, right:-4, background:'var(--mauve)', color:'#fff', borderRadius:'50%', width:20, height:20, fontSize:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div style={{ position:'fixed', top:80, left:0, right:0, zIndex:299, background:'var(--white)', borderBottom:'1px solid rgba(201,169,110,0.2)', padding:'18px 5%', boxShadow:'0 12px 40px rgba(44,24,16,0.1)', animation:'slideUp .22s ease' }}>
          <form onSubmit={onSearch} style={{ maxWidth:1440, margin:'0 auto', display:'flex', gap:12, alignItems:'center' }}>
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sarees, kurtis, lehengas…"
              style={{ flex:1, border:'none', borderBottom:'2px solid var(--gold)', background:'transparent', fontFamily:"'EB Garamond',Georgia,serif", fontSize:19, color:'var(--brown)', padding:'8px 0', outline:'none' }} />
            <button type="submit" className="btn-gold" style={{ padding:'11px 30px', borderRadius:2 }}>Search</button>
            <button type="button" onClick={() => setSearchOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:22, color:'var(--text-muted)' }}>✕</button>
          </form>
        </div>
      )}
    </>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = ({ onNavigate }) => {
  const [slide, setSlide] = useState(0);
  const timer = useRef(null);

  const goTo = useCallback(i => setSlide(i), []);
  const next  = useCallback(() => setSlide(s => (s + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    timer.current = setInterval(next, 6500);
    return () => clearInterval(timer.current);
  }, [next]);

  const s = HERO_SLIDES[slide];

  return (
    <section style={{ position:'relative', height:'100vh', minHeight:680, overflow:'hidden' }}>
      {HERO_SLIDES.map((sl, i) => (
        <div key={i} style={{ position:'absolute', inset:0, opacity:i===slide?1:0, transition:'opacity 1.6s ease', zIndex:0 }}>
          <Img src={sl.image} alt={`slide ${i}`} className={i===slide?'hero-img-active':''}
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        </div>
      ))}
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(90deg,rgba(12,5,2,.82) 0%,rgba(12,5,2,.48) 42%,rgba(12,5,2,.08) 100%),linear-gradient(to top,rgba(12,5,2,.5) 0%,transparent 30%)' }} />
      <div style={{ position:'absolute', left:'calc(5% + 4px)', top:'50%', transform:'translateY(-50%)', width:1.5, height:180, zIndex:2, background:'linear-gradient(to bottom,transparent,rgba(201,169,110,.8),transparent)' }} />

      <div style={{ position:'relative', zIndex:3, height:'100%', display:'flex', alignItems:'center', padding:'0 calc(5% + 32px)', paddingTop:80 }}>
        <div key={`c${slide}`} style={{ maxWidth:640, animation:'slideRight .85s ease' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(201,169,110,.14)', border:'1px solid rgba(201,169,110,.4)', borderRadius:50, padding:'7px 22px', marginBottom:30, backdropFilter:'blur(8px)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)', display:'inline-block', animation:'pulse 2.2s infinite' }} />
            <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:11, letterSpacing:4, color:'var(--gold-light)', textTransform:'uppercase' }}>New Collection 2026</span>
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(56px,8.5vw,104px)', fontWeight:500, color:'#FFFDF8', lineHeight:.92, margin:'0 0 26px', letterSpacing:-1.5 }}>
            {s.heading[0]}<br /><em style={{ fontStyle:'italic', color:'var(--gold-light)', fontWeight:300 }}>{s.heading[1]}</em>
          </h1>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:18.5, color:'rgba(255,253,248,.75)', lineHeight:1.8, margin:'0 0 44px', maxWidth:420 }}>{s.sub}</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <button className="btn-gold" style={{ padding:'18px 46px', borderRadius:2 }} onClick={() => onNavigate(s.ctaPage)}>{s.cta}</button>
            <button className="btn-ghost" style={{ padding:'18px 46px', borderRadius:2, color:'rgba(255,253,248,.82)', borderColor:'rgba(255,253,248,.38)' }} onClick={() => onNavigate('Collections')}>View All</button>
          </div>
        </div>
      </div>

      <div style={{ position:'absolute', top:100, right:'5%', zIndex:3 }}>
        <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:13, color:'var(--gold)', letterSpacing:2 }}>
          {String(slide+1).padStart(2,'0')} <span style={{ color:'rgba(255,255,255,.3)' }}>/ {String(HERO_SLIDES.length).padStart(2,'0')}</span>
        </span>
      </div>

      <div style={{ position:'absolute', bottom:44, left:'50%', transform:'translateX(-50%)', display:'flex', gap:10, zIndex:3 }}>
        {HERO_SLIDES.map((_,i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width:i===slide?40:8, height:8, borderRadius:4, background:i===slide?'var(--gold)':'rgba(255,255,255,.3)', border:'none', cursor:'pointer', transition:'all .45s ease', padding:0 }} />
        ))}
      </div>

      <div style={{ position:'absolute', bottom:48, right:'5%', zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
        <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:9, letterSpacing:4.5, color:'rgba(255,253,248,.4)', textTransform:'uppercase', writingMode:'vertical-rl' }}>Scroll</span>
        <div style={{ width:1, height:56, background:'linear-gradient(to bottom,rgba(201,169,110,.65),transparent)' }} />
      </div>
    </section>
  );
};

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const Marquee = () => {
  const items = ['Free Shipping Over ₹999','Handcrafted with Love','Authentic Indian Textiles','Ethically Sourced Fabrics','Easy Returns & Exchanges','Cash on Delivery Available'];
  const SEP = <span style={{ color:'var(--mauve)', margin:'0 6px', fontSize:10 }}>✦</span>;
  return (
    <div style={{ background:'var(--brown)', padding:'13px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', width:'max-content', animation:'marquee 36s linear infinite' }}>
        {[...items,...items].map((item,i) => (
          <span key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:12, letterSpacing:4, color:'var(--gold)', textTransform:'uppercase', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', marginRight:48 }}>
            {item}{SEP}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
const TrustBar = () => {
  const items = [
    { icon:'🏺', title:'Artisan Crafted',    sub:'Hand-woven by master weavers' },
    { icon:'🌿', title:'Ethically Sourced',  sub:'100% natural & sustainable fabrics' },
    { icon:'✈️', title:'Pan-India Delivery', sub:'Free shipping above ₹999' },
    { icon:'↩️', title:'Easy Returns',       sub:'15-day hassle-free returns' },
  ];
  return (
    <section style={{ background:'var(--cream-2)', padding:'52px 5%', borderBottom:'1px solid rgba(201,169,110,.12)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:36 }}>
        {items.map(({ icon, title, sub }) => (
          <div key={title} style={{ display:'flex', alignItems:'center', gap:18 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,rgba(201,169,110,.18),rgba(201,169,110,.05))', border:'1px solid rgba(201,169,110,.22)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{icon}</div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:17, fontWeight:600, color:'var(--brown)', marginBottom:3 }}>{title}</div>
              <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:13.5, color:'var(--text-muted)' }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const Categories = ({ onNavigate }) => (
  <section style={{ padding:'96px 5%', background:'var(--cream)' }}>
    <div style={{ maxWidth:1440, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:64 }}>
        <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10.5, letterSpacing:6, color:'var(--gold)', textTransform:'uppercase' }}>Shop by Category</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(36px,4.5vw,60px)', fontWeight:500, color:'var(--brown)', margin:'14px 0 0', letterSpacing:-.8 }}>
          Our <em style={{ fontStyle:'italic', fontWeight:300 }}>Collections</em>
        </h2>
      </div>
      <div className="cat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="cat-card" onClick={() => onNavigate(cat.name)}
            style={{ position:'relative', borderRadius:8, overflow:'hidden', cursor:'pointer', aspectRatio:'3/4.4' }}>
            <Img src={cat.image} alt={cat.name} className="cat-img"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }} />
            <div className="cat-overlay" style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(16,5,2,.90) 0%,rgba(16,5,2,.22) 48%,transparent 100%)', opacity:.82, transition:'opacity .4s' }} />
            <div style={{ position:'absolute', top:14, left:14, background:cat.accent, color:'#fff', fontFamily:"'EB Garamond',Georgia,serif", fontSize:9, letterSpacing:3, textTransform:'uppercase', padding:'5px 13px', borderRadius:2 }}>{cat.tag}</div>
            <div style={{ position:'absolute', bottom:24, left:20, right:20 }}>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10.5, letterSpacing:4, color:'rgba(255,253,248,.55)', margin:'0 0 4px', textTransform:'uppercase' }}>{cat.subtitle}</p>
              <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:30, fontWeight:600, color:'#FFFDF8', margin:'0 0 8px' }}>{cat.name}</h3>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:12, color:'var(--gold-light)' }}>{cat.count}</span>
                <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:11.5, letterSpacing:2.5, color:'var(--gold)', textTransform:'uppercase', borderBottom:`1px solid ${cat.accent}`, paddingBottom:1 }}>Shop →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart, wishlist, onToggleWish }) => {
  const [added, setAdded] = useState(false);
  const wished = wishlist.has(product.id);
  const disc   = product.originalPrice ? pct(product.originalPrice, product.price) : 0;

  const handleCart = e => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="product-card" style={{ background:'var(--white)', borderRadius:8, overflow:'hidden' }}>
      <div style={{ position:'relative', aspectRatio:'3/4.2', overflow:'hidden', background:'var(--cream-2)' }}>
        <Img src={product.image} alt={product.name} className="card-img"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }} />

        <div style={{ position:'absolute', top:12, left:12, background:product.badgeBg, color:product.badgeColor, fontFamily:"'EB Garamond',Georgia,serif", fontSize:9, letterSpacing:2.5, textTransform:'uppercase', padding:'4px 11px', borderRadius:2, fontWeight:700 }}>{product.badge}</div>

        {disc > 0 && <div style={{ position:'absolute', top:12, right:50, background:'var(--brown)', color:'var(--gold)', fontFamily:"'EB Garamond',Georgia,serif", fontSize:10, fontWeight:700, padding:'4px 9px', borderRadius:2 }}>{disc}% off</div>}

        <button className="wish-btn" onClick={e => { e.stopPropagation(); onToggleWish(product.id); }}
          style={{ position:'absolute', top:10, right:10, background:'rgba(255,253,248,.94)', border:'none', borderRadius:'50%', width:38, height:38, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, boxShadow:'0 2px 12px rgba(0,0,0,.14)' }}>
          {wished ? '❤️' : '🤍'}
        </button>

        <button className="quick-add" onClick={handleCart}
          style={{ position:'absolute', bottom:0, left:0, right:0, background:added?'#2C1810':'var(--gold)', border:'none', color:added?'var(--gold)':'var(--brown)', fontFamily:"'EB Garamond',Georgia,serif", fontSize:11, letterSpacing:3, textTransform:'uppercase', padding:'15px', cursor:'pointer', opacity:0, transform:'translateY(8px)', fontWeight:700 }}>
          {added ? '✓  Added to Bag' : 'Quick Add'}
        </button>
      </div>

      <div style={{ padding:'18px 18px 22px' }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:17.5, fontWeight:600, color:'var(--brown)', margin:'0 0 4px' }}>{product.name}</h3>
        {product.subtext && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:12.5, color:'var(--text-muted)', margin:'0 0 8px', fontStyle:'italic' }}>{product.subtext}</p>}
        <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:12 }}>
          <span style={{ color:'var(--gold)', fontSize:12.5, letterSpacing:1.5 }}>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:12.5, color:'var(--text-muted)' }}>{product.rating} ({product.reviews})</span>
        </div>
        <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:21, fontWeight:600, color:'var(--brown)' }}>{fmt(product.price)}</span>
          {product.originalPrice && <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:14, color:'var(--text-muted)', textDecoration:'line-through' }}>{fmt(product.originalPrice)}</span>}
        </div>
      </div>
    </div>
  );
};

// ─── FEATURED PRODUCTS (tabbed) ───────────────────────────────────────────────
const FeaturedProducts = ({ onAddToCart, wishlist, onToggleWish, onNavigate }) => {
  const [tab, setTab] = useState('All');
  const tabs    = ['All','Sarees','Kurtis','Lehengas','Dresses'];
  const visible = tab === 'All' ? PRODUCTS.slice(0,8) : PRODUCTS.filter(p => p.category === tab).slice(0,8);

  return (
    <section style={{ padding:'96px 5%', background:'var(--cream-2)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
          <div>
            <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10.5, letterSpacing:6, color:'var(--gold)', textTransform:'uppercase' }}>Handpicked for You</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(30px,4vw,54px)', fontWeight:500, color:'var(--brown)', margin:'12px 0 0', letterSpacing:-.6 }}>
              Featured <em style={{ fontStyle:'italic', fontWeight:300 }}>Products</em>
            </h2>
          </div>
          <button onClick={() => onNavigate('Collections')} className="btn-ghost" style={{ padding:'12px 30px', borderRadius:2 }}>View All Products</button>
        </div>

        <div style={{ display:'flex', gap:10, marginBottom:40, flexWrap:'wrap' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={tab===t?'btn-gold':'btn-ghost'}
              style={{ padding:'9px 24px', borderRadius:2 }}>
              {t} {t!=='All'&&<span style={{ opacity:.65, fontSize:10 }}>({PRODUCTS.filter(p=>p.category===t).length})</span>}
            </button>
          ))}
        </div>

        <div className="prod-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
          {visible.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWish={onToggleWish} />)}
        </div>

        <div style={{ textAlign:'center', marginTop:52 }}>
          <button onClick={() => onNavigate(tab==='All'?'Collections':tab)} className="btn-gold" style={{ padding:'16px 56px', borderRadius:2 }}>
            Explore All {tab==='All'?'Products':tab}
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────
const PromoBanner = ({ onNavigate }) => (
  <section style={{ position:'relative', overflow:'hidden', height:580 }}>
    <Img src={U.grb} alt="Festive Collection"
      style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 40%', display:'block' }} />
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,rgba(14,5,2,.9) 0%,rgba(14,5,2,.5) 50%,rgba(0,0,0,.08) 100%)', display:'flex', alignItems:'center', padding:'0 8%' }}>
      <div style={{ maxWidth:580 }}>
        <div style={{ display:'inline-block', fontFamily:"'EB Garamond',Georgia,serif", fontSize:9.5, letterSpacing:5.5, color:'var(--gold)', textTransform:'uppercase', border:'1px solid rgba(201,169,110,.4)', padding:'7px 22px', borderRadius:2, marginBottom:26 }}>✦ Limited Edition ✦</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(42px,6vw,78px)', fontWeight:500, color:'#FFFDF8', lineHeight:1.0, margin:'0 0 20px', letterSpacing:-1 }}>
          Festive Collection<br /><em style={{ fontStyle:'italic', fontWeight:300, color:'var(--gold-light)' }}>2026</em>
        </h2>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:18, color:'rgba(255,253,248,.72)', lineHeight:1.8, margin:'0 0 38px' }}>Celebrate India's most cherished festivals in outfits that feel as extraordinary as the occasion itself.</p>
        <div style={{ display:'flex', gap:24, alignItems:'center', flexWrap:'wrap' }}>
          <button className="btn-gold" style={{ padding:'18px 40px', borderRadius:2 }} onClick={() => onNavigate('Sale')}>Shop Festive Edit</button>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:32, fontWeight:600, color:'var(--gold)', lineHeight:1 }}>30% Off</div>
            <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:9.5, letterSpacing:3.5, color:'rgba(255,253,248,.45)', textTransform:'uppercase', marginTop:5 }}>USE CODE: FESTIVE30</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials = () => (
  <section style={{ padding:'96px 5%', background:'var(--brown)' }}>
    <div style={{ maxWidth:1440, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10.5, letterSpacing:6, color:'var(--gold)', textTransform:'uppercase' }}>What She Says</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(30px,4.5vw,54px)', fontWeight:500, color:'#FFFDF8', margin:'14px 0 0', letterSpacing:-.6 }}>
          Loved Across <em style={{ fontStyle:'italic', fontWeight:300 }}>India</em>
        </h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))', gap:20 }}>
        {TESTIMONIALS.map((t,i) => (
          <div key={i} className="testimonial-card" style={{ background:'rgba(255,253,248,.04)', border:'1px solid rgba(201,169,110,.16)', borderRadius:8, padding:'34px 28px' }}>
            <div style={{ color:'var(--gold)', fontSize:15, letterSpacing:2.5, marginBottom:20 }}>{'★'.repeat(t.stars)}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontStyle:'italic', fontSize:17, color:'rgba(255,253,248,.78)', lineHeight:1.9, margin:'0 0 26px' }}>"{t.text}"</p>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,var(--gold),var(--mauve))', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:19, fontWeight:600 }}>{t.initial}</div>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontWeight:600, color:'#FFFDF8', fontSize:17 }}>{t.name}</div>
                <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:12, color:'var(--gold)', letterSpacing:2 }}>{t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── INSTAGRAM STRIP ──────────────────────────────────────────────────────────
const InstagramStrip = () => {
  const imgs = [U.s1, U.i1, U.i2, U.s4, U.i3, U.i4];
  return (
    <section style={{ padding:'80px 5%', background:'var(--cream)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10.5, letterSpacing:6, color:'var(--gold)', textTransform:'uppercase' }}>Follow Our Story</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:500, color:'var(--brown)', margin:'12px 0 4px' }}>@anaysha_couture</h2>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:15, color:'var(--text-muted)' }}>Tag us to be featured</p>
        </div>
        <div className="insta-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10 }}>
          {imgs.map((src,i) => (
            <div key={i} style={{ position:'relative', aspectRatio:'1', overflow:'hidden', borderRadius:6, cursor:'pointer' }}>
              <Img src={src} alt="Instagram" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.1)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
              <div style={{ position:'absolute', inset:0, background:'rgba(44,24,16,0)', transition:'background .35s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(44,24,16,.48)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(44,24,16,0)'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ onNavigate }) => (
  <footer style={{ background:'#0E0402', color:'#FFFDF8', padding:'80px 5% 36px' }}>
    <div style={{ maxWidth:1440, margin:'0 auto' }}>
      <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:52, marginBottom:64 }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:32, fontWeight:600, color:'#FFFDF8', letterSpacing:3, marginBottom:4 }}>ANAYSHA</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:8.5, letterSpacing:7, color:'var(--gold)', textTransform:'uppercase', marginBottom:22 }}>Indian Couture</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:15, color:'rgba(255,253,248,.46)', lineHeight:1.9, margin:'0 0 28px', maxWidth:300 }}>
            Celebrating the living art of Indian textiles through thoughtful, sustainable, and luxurious fashion.
          </p>
          <div style={{ display:'flex', gap:10 }}>
            {['IG','FB','YT','PT'].map(s => (
              <a key={s} href="#" style={{ width:40, height:40, borderRadius:'50%', border:'1px solid rgba(201,169,110,.24)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', fontFamily:"'EB Garamond',Georgia,serif", fontSize:11.5, textDecoration:'none', transition:'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.color='#0E0402'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--gold)'; }}>{s}</a>
            ))}
          </div>
        </div>
        {[
          { title:'Collections',  items:['Sarees','Kurtis','Lehengas','Dresses','Accessories','Sale'] },
          { title:'Customer Care', items:['Size Guide','Easy Returns','Track Order','Contact Us','FAQ','Sustainability'] },
          { title:'Company',      items:['About Us','Our Story','Artisans','Press','Careers','Blog'] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10, letterSpacing:5, textTransform:'uppercase', color:'var(--gold)', margin:'0 0 24px' }}>{col.title}</h4>
            {col.items.map(item => (
              <a key={item} href="#" style={{ display:'block', fontFamily:"'EB Garamond',Georgia,serif", fontSize:14.5, color:'rgba(255,253,248,.42)', textDecoration:'none', marginBottom:11, transition:'color .3s' }}
                onMouseEnter={e => e.target.style.color='var(--gold)'}
                onMouseLeave={e => e.target.style.color='rgba(255,253,248,.42)'}>{item}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ background:'rgba(201,169,110,.07)', border:'1px solid rgba(201,169,110,.14)', borderRadius:8, padding:'38px 44px', marginBottom:56, display:'flex', alignItems:'center', gap:44, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:200 }}>
          <h4 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24, fontWeight:500, color:'#FFFDF8', margin:'0 0 7px' }}>Stay in the <em style={{ fontStyle:'italic', fontWeight:300, color:'var(--gold-light)' }}>loop</em></h4>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:14.5, color:'rgba(255,253,248,.44)', margin:0 }}>New arrivals, exclusive offers & styling inspiration.</p>
        </div>
        <div style={{ display:'flex', flex:1, minWidth:290, maxWidth:480 }}>
          <input placeholder="your@email.com" style={{ flex:1, background:'rgba(255,253,248,.05)', border:'1px solid rgba(201,169,110,.22)', borderRight:'none', borderRadius:'2px 0 0 2px', padding:'14px 18px', color:'#FFFDF8', fontFamily:"'EB Garamond',Georgia,serif", fontSize:15.5, outline:'none' }} />
          <button className="btn-gold" style={{ padding:'14px 26px', borderRadius:'0 2px 2px 0', whiteSpace:'nowrap' }}>Subscribe</button>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(201,169,110,.1)', paddingTop:26, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:14 }}>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:13.5, color:'rgba(255,253,248,.24)', margin:0 }}>© 2026 Anaysha Indian Couture. All rights reserved.</p>
        <div style={{ display:'flex', gap:24 }}>
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(item => (
            <a key={item} href="#" style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:13.5, color:'rgba(255,253,248,.24)', textDecoration:'none', transition:'color .3s' }}
              onMouseEnter={e => e.target.style.color='var(--gold)'}
              onMouseLeave={e => e.target.style.color='rgba(255,253,248,.24)'}>{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── PAGE COMPONENTS ──────────────────────────────────────────────────────────
const ProductGrid = ({ products, onAddToCart, wishlist, onToggleWish }) => (
  <div className="prod-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
    {products.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWish={onToggleWish} />)}
  </div>
);

const PageHeader = ({ title, subtitle, accent, dark }) => (
  <div style={{
    background: dark ? `linear-gradient(135deg,${accent||'#E65100'} 0%,${accent||'#FF8C42'} 100%)` : `linear-gradient(135deg,${accent||'var(--gold)'}1A 0%,${accent||'var(--gold)'}06 100%)`,
    padding:'72px 5% 60px', textAlign:'center', borderBottom: dark?'none':'1px solid rgba(201,169,110,.12)',
  }}>
    <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:10.5, letterSpacing:6, color:dark?'rgba(255,255,255,.75)':'var(--gold)', textTransform:'uppercase' }}>{subtitle}</span>
    <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(44px,7vw,80px)', fontWeight:500, color:dark?'#fff':'var(--brown)', margin:'14px 0 0', letterSpacing:-.8 }}>{title}</h1>
  </div>
);

const CollectionsPage = ({ onAddToCart, wishlist, onToggleWish }) => {
  const [filter, setFilter] = useState('All');
  const cats     = ['All','Sarees','Kurtis','Lehengas','Dresses'];
  const filtered = filter==='All' ? PRODUCTS : PRODUCTS.filter(p => p.category===filter);
  return (
    <div style={{ paddingTop:80, background:'var(--cream-2)', minHeight:'100vh' }}>
      <PageHeader title="All Collections" subtitle="Explore Every Style" />
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'60px 5%' }}>
        <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:52, flexWrap:'wrap' }}>
          {cats.map(cat => <button key={cat} onClick={() => setFilter(cat)} className={filter===cat?'btn-gold':'btn-ghost'} style={{ padding:'11px 26px', borderRadius:2 }}>{cat}</button>)}
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:14, color:'var(--text-muted)', marginBottom:32, textAlign:'center' }}>{filtered.length} styles</p>
        <ProductGrid products={filtered} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWish={onToggleWish} />
      </div>
    </div>
  );
};

const CategoryPage = ({ category, onAddToCart, wishlist, onToggleWish }) => {
  const products = PRODUCTS.filter(p => p.category===category);
  const info     = CATEGORIES.find(c => c.name===category);
  return (
    <div style={{ paddingTop:80, background:'var(--cream-2)', minHeight:'100vh' }}>
      <PageHeader title={category} subtitle={info?.subtitle||'Our Collection'} accent={info?.accent} />
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'60px 5%' }}>
        {products.length > 0
          ? <ProductGrid products={products} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWish={onToggleWish} />
          : <p style={{ textAlign:'center', fontFamily:"'EB Garamond',Georgia,serif", fontSize:18, color:'var(--text-muted)', padding:60 }}>No products found.</p>
        }
      </div>
    </div>
  );
};

const SalePage = ({ onAddToCart, wishlist, onToggleWish }) => {
  const sale = PRODUCTS.filter(p => p.originalPrice);
  return (
    <div style={{ paddingTop:80, background:'var(--cream-2)', minHeight:'100vh' }}>
      <PageHeader title="SALE" subtitle={`Up to 40% Off · ${sale.length} styles`} accent="#E65100" dark />
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'60px 5%' }}>
        <ProductGrid products={sale} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWish={onToggleWish} />
      </div>
    </div>
  );
};

const CartPage = ({ cart, onUpdate, onRemove }) => {
  const subtotal = cart.reduce((s,i) => s + i.price*i.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total    = subtotal + shipping;

  if (cart.length === 0) return (
    <div style={{ paddingTop:80, background:'var(--cream-2)', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center', padding:40 }}>
        <div style={{ fontSize:76, marginBottom:22 }}>🛍️</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:34, color:'var(--brown)', marginBottom:14 }}>Your Bag is Empty</h2>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:17, color:'var(--text-muted)' }}>Discover beautiful Indian ethnic wear curated just for you.</p>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop:80, background:'var(--cream-2)', minHeight:'100vh', paddingBottom:80 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 5% 0' }}>
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(36px,5vw,56px)', fontWeight:500, color:'var(--brown)', marginBottom:52, textAlign:'center' }}>
          Shopping <em style={{ fontStyle:'italic', fontWeight:300 }}>Bag</em>
        </h1>
        <div className="cart-layout" style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:36 }}>
          <div>
            {cart.map((item,idx) => (
              <div key={idx} style={{ display:'flex', gap:22, background:'var(--white)', padding:22, borderRadius:8, marginBottom:14 }}>
                <div style={{ width:114, height:136, borderRadius:6, overflow:'hidden', flexShrink:0 }}>
                  <Img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                </div>
                <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:19, fontWeight:600, color:'var(--brown)', marginBottom:4 }}>{item.name}</h3>
                    <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:13, color:'var(--text-muted)' }}>{item.category}</p>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      {['-',item.quantity,'+'].map((v,i) => (
                        i===1
                          ? <span key={i} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:17, fontWeight:600, minWidth:32, textAlign:'center', color:'var(--brown)' }}>{v}</span>
                          : <button key={i} onClick={() => onUpdate(idx,item.quantity+(i===0?-1:1))} style={{ width:32, height:32, border:'1px solid rgba(201,169,110,.28)', background:'var(--cream-2)', cursor:'pointer', borderRadius:3, fontSize:16, color:'var(--brown)' }}>{v}</button>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:18 }}>
                      <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:21, fontWeight:600, color:'var(--gold)' }}>{fmt(item.price*item.quantity)}</span>
                      <button onClick={() => onRemove(idx)} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:13, fontFamily:"'EB Garamond',Georgia,serif", textDecoration:'underline' }}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:'var(--white)', padding:30, borderRadius:8, height:'fit-content', position:'sticky', top:104 }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:21, fontWeight:600, color:'var(--brown)', marginBottom:22, paddingBottom:16, borderBottom:'1px solid rgba(201,169,110,.15)' }}>Order Summary</h3>
            {[['Subtotal',fmt(subtotal)],['Shipping',shipping===0?'FREE ✓':fmt(shipping)]].map(([l,v]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
                <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:15.5, color:'var(--text-muted)' }}>{l}</span>
                <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:15.5, color:shipping===0&&l==='Shipping'?'#2E7D32':'var(--brown)' }}>{v}</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:26, paddingTop:16, borderTop:'1px solid rgba(201,169,110,.15)' }}>
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:18, fontWeight:600, color:'var(--brown)' }}>Total</span>
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24, fontWeight:600, color:'var(--gold)' }}>{fmt(total)}</span>
            </div>
            {shipping > 0 && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:13.5, color:'var(--gold)', textAlign:'center', marginBottom:18 }}>Add {fmt(999-subtotal)} more for free shipping!</p>}
            <button className="btn-gold" style={{ width:'100%', padding:'16px', borderRadius:2 }}>Proceed to Checkout</button>
            <div style={{ textAlign:'center', marginTop:16, fontFamily:"'EB Garamond',Georgia,serif", fontSize:12.5, color:'var(--text-muted)' }}>🔒 Secure Payment · Free Returns</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchPage = ({ query, onAddToCart, wishlist, onToggleWish }) => {
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div style={{ paddingTop:80, background:'var(--cream-2)', minHeight:'100vh' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'60px 5%' }}>
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(30px,5vw,52px)', fontWeight:500, color:'var(--brown)', marginBottom:8 }}>
          Results for "<em style={{ fontStyle:'italic', fontWeight:300, color:'var(--gold)' }}>{query}</em>"
        </h1>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:15.5, color:'var(--text-muted)', marginBottom:44 }}>{results.length} products found</p>
        {results.length > 0
          ? <ProductGrid products={results} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWish={onToggleWish} />
          : <div style={{ textAlign:'center', padding:'80px 0' }}>
              <div style={{ fontSize:60, marginBottom:18 }}>🔍</div>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24, color:'var(--brown)' }}>No results found for "{query}"</p>
            </div>
        }
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart]         = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [page, setPage]         = useState('Home');
  const [searchQuery, setSQ]    = useState('');

  const handleAddToCart  = useCallback(product => {
    setCart(prev => {
      const ex = prev.findIndex(i => i.id===product.id);
      if (ex>=0) return prev.map((item,idx) => idx===ex ? {...item,quantity:item.quantity+1} : item);
      return [...prev, {...product,quantity:1}];
    });
  }, []);

  const handleUpdate    = useCallback((idx,qty) => {
    if (qty<=0) setCart(prev => prev.filter((_,i) => i!==idx));
    else setCart(prev => prev.map((item,i) => i===idx ? {...item,quantity:qty} : item));
  }, []);

  const handleRemove    = useCallback(idx => setCart(prev => prev.filter((_,i) => i!==idx)), []);
  const handleToggleWish = useCallback(id => {
    setWishlist(prev => { const s=new Set(prev); s.has(id)?s.delete(id):s.add(id); return s; });
  }, []);

  const handleNavigate  = useCallback((pg, q=null) => {
    setPage(pg);
    if (q) setSQ(q);
    window.scrollTo({ top:0, behavior:'smooth' });
  }, []);

  const cartCount = cart.reduce((s,i) => s+i.quantity, 0);
  const shared    = { onAddToCart:handleAddToCart, wishlist, onToggleWish:handleToggleWish };

  const renderPage = () => {
    switch (page) {
      case 'Collections': return <CollectionsPage {...shared} />;
      case 'Sarees':      return <CategoryPage category="Sarees"   {...shared} />;
      case 'Kurtis':      return <CategoryPage category="Kurtis"   {...shared} />;
      case 'Lehengas':    return <CategoryPage category="Lehengas" {...shared} />;
      case 'Sale':        return <SalePage {...shared} />;
      case 'Cart':        return <CartPage cart={cart} onUpdate={handleUpdate} onRemove={handleRemove} />;
      case 'Search':      return <SearchPage query={searchQuery} {...shared} />;
      default:            return (
        <>
          <Hero onNavigate={handleNavigate} />
          <Marquee />
          <TrustBar />
          <Categories onNavigate={handleNavigate} />
          <FeaturedProducts {...shared} onNavigate={handleNavigate} />
          <PromoBanner onNavigate={handleNavigate} />
          <Testimonials />
          <InstagramStrip />
        </>
      );
    }
  };

  return (
    <>
      <FontLoader />
      <GlobalStyles />
      <div style={{ fontFamily:"'EB Garamond',Georgia,serif", overflowX:'hidden', background:'var(--cream)', color:'var(--brown)' }}>
        <Navbar cartCount={cartCount} currentPage={page} onNavigate={handleNavigate} />
        {renderPage()}
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}
