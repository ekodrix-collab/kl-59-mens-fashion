'use client';

import { useState, useEffect } from "react";
import type { Offer, Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ModernOfferCardProps {
  offer: Offer;
  onShopNow: () => void;
}

/* ─────────────────────────────────────────────────────────────────
   B2G1 CARD  —  Buy Two (or more), Get One Free
   Light warm cream palette, 3-tile horizontal grid
───────────────────────────────────────────────────────────────── */
export function B2G1Card({ offer, onShopNow }: ModernOfferCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const items = offer.combo_items || [];
  const products = items.map(i => i.product).filter(Boolean) as Product[];

  // All but the last are "buy", last is "free"
  const buyProducts = products.length >= 2 ? products.slice(0, products.length - 1) : [products[0] || null, products[0] || null];
  const freeProduct = products[products.length - 1] || null;
  const savingsAmount = offer.discount_value || 0;

  const buyLabel = buyProducts.length >= 3 ? `Buy ${buyProducts.length}` : buyProducts.length === 2 ? "Buy Two" : "Buy One";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .b2g1-wrap{width:100%;max-width:900px;background:#faf8f5;border:1px solid #e4ddd4;box-shadow:0 2px 40px rgba(0,0,0,.06);opacity:${mounted ? 1 : 0};transform:${mounted ? 'translateY(0)' : 'translateY(20px)'};transition:opacity .7s ease,transform .7s ease;margin:0 auto;font-family:'DM Sans',sans-serif;}
        .b2g1-header{background:#1c1917;padding:16px 36px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
        .b2g1-hdr-lbl{font-size:9px;font-weight:400;letter-spacing:.26em;text-transform:uppercase;color:#8a7f74;}
        .b2g1-hdr-offer{display:flex;align-items:baseline;gap:8px;}
        .b2g1-hdr-main{font-family:'Playfair Display',serif;font-size:15px;font-weight:400;color:#f0ece4;letter-spacing:.04em;}
        .b2g1-hdr-gold{font-family:'Playfair Display',serif;font-size:15px;font-style:italic;color:#c9a96e;}
        .b2g1-hdr-save{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#c9a96e;border:1px solid #3a3530;padding:5px 14px;}
        .b2g1-row{display:grid;align-items:stretch;min-height:380px;}
        .b2g1-conn{display:flex;flex-direction:column;align-items:center;justify-content:center;background:#faf8f5;width:52px;border-left:1px solid #e8e2da;border-right:1px solid #e8e2da;}
        .b2g1-conn-line{flex:1;width:1px;background:#e4ddd4;}
        .b2g1-conn-sym{font-family:'Playfair Display',serif;font-size:22px;font-style:italic;color:#c9a96e;line-height:1;padding:8px 0;}
        .b2g1-tile{position:relative;overflow:hidden;background:#ede9e3;cursor:pointer;flex:1;}
        .b2g1-img{width:100%;height:100%;min-height:380px;object-fit:cover;object-position:top center;display:block;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .5s ease;filter:brightness(.95) contrast(1.04);}
        .b2g1-tile:hover .b2g1-img{transform:scale(1.06);filter:brightness(1.02) contrast(1.05);}
        .b2g1-scrim{position:absolute;bottom:0;left:0;right:0;height:50%;background:linear-gradient(to top,rgba(10,8,6,.78),transparent);pointer-events:none;}
        .b2g1-num{position:absolute;top:16px;left:16px;font-size:9px;font-weight:400;letter-spacing:.18em;color:rgba(255,255,255,.45);}
        .b2g1-tag{position:absolute;top:14px;right:14px;font-size:8px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;padding:5px 10px;}
        .b2g1-buy-tag{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);color:rgba(255,255,255,.75);backdrop-filter:blur(4px);}
        .b2g1-free-tag{background:#c9a96e;color:#1c1917;font-weight:600;}
        .b2g1-tile.b2g1-free::after{content:'';position:absolute;inset:0;border:2px solid rgba(201,169,110,.45);pointer-events:none;}
        .b2g1-info{position:absolute;bottom:0;left:0;right:0;padding:14px 16px 18px;}
        .b2g1-name{display:block;font-family:'Playfair Display',serif;font-size:16px;font-weight:400;color:#f5f0e8;letter-spacing:.01em;line-height:1.2;margin-bottom:4px;}
        .b2g1-sub{font-size:9px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.35);}
        .b2g1-tile.b2g1-free .b2g1-name{color:#f0d9a8;}
        .b2g1-tile.b2g1-free .b2g1-sub{color:rgba(201,169,110,.6);}
        .b2g1-bottom{border-top:1px solid #e4ddd4;background:#faf8f5;padding:22px 36px 26px;display:flex;flex-direction:column;gap:16px;}
        .b2g1-meta{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
        .b2g1-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:400;color:#1c1917;letter-spacing:.01em;}
        .b2g1-save-block{text-align:right;}
        .b2g1-save-lbl{display:block;font-size:8px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:#a09080;margin-bottom:2px;}
        .b2g1-save-amt{font-family:'Playfair Display',serif;font-size:26px;font-weight:500;color:#1c1917;}
        .b2g1-btn{width:100%;position:relative;overflow:hidden;background:#1c1917;border:none;color:#e8e0d4;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:400;letter-spacing:.28em;text-transform:uppercase;padding:18px 32px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:14px;transition:color .45s ease;}
        .b2g1-btn::after{content:'';position:absolute;inset:0;background:#c9a96e;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.77,0,.175,1);}
        .b2g1-btn:hover::after{transform:scaleX(1);}
        .b2g1-btn:hover{color:#1c1917;}
        .b2g1-btn span,.b2g1-arrow{position:relative;z-index:1;}
        .b2g1-arrow{transition:transform .3s ease;}
        .b2g1-btn:hover .b2g1-arrow{transform:translateX(5px);}
        .b2g1-scarc{display:flex;align-items:center;justify-content:center;gap:8px;}
        .b2g1-dot{width:5px;height:5px;border-radius:50%;background:#c9a96e;flex-shrink:0;animation:b2g1blink 2.2s infinite;}
        @keyframes b2g1blink{0%,100%{opacity:1}50%{opacity:.25}}
        .b2g1-scarc-txt{font-size:10px;color:#b0a090;letter-spacing:.06em;}
        @media(max-width:640px){.b2g1-row{grid-template-columns:1fr!important;}.b2g1-img{min-height:260px;}.b2g1-conn{flex-direction:row;height:44px;width:auto;border-left:none;border-right:none;border-top:1px solid #e4ddd4;border-bottom:1px solid #e4ddd4;}.b2g1-conn-line{flex:1;width:auto;height:1px;}.b2g1-bottom{padding:18px 20px 22px;}.b2g1-header{padding:14px 20px;}}
      `}</style>

      <div className="b2g1-wrap">
        <div className="b2g1-header">
          <span className="b2g1-hdr-lbl">Special Edition · Men's Essentials</span>
          <div className="b2g1-hdr-offer">
            <span className="b2g1-hdr-main">{buyLabel}</span>
            <span className="b2g1-hdr-gold">— Get One Free</span>
          </div>
          {savingsAmount > 0 && <div className="b2g1-hdr-save">Save {formatPrice(savingsAmount)}</div>}
        </div>

        <div className="b2g1-row" style={{ display: 'grid', gridTemplateColumns: Array.from({ length: buyProducts.length * 2 + 1 }, (_, i) => i % 2 === 0 ? '1fr' : '52px').join(' ') }}>
          {buyProducts.map((p, i) => (
            <>
              <div key={`tile-${i}`} className="b2g1-tile" onClick={onShopNow}>
                <img className="b2g1-img" src={p?.images?.[0] || ""} alt={p?.name || `Product 0${i + 1}`} />
                <div className="b2g1-scrim" />
                <span className="b2g1-num">0{i + 1}</span>
                <span className="b2g1-tag b2g1-buy-tag">Buy</span>
                <div className="b2g1-info">
                  <span className="b2g1-name">{p?.name || `Product 0${i + 1}`}</span>
                  <span className="b2g1-sub">Select Size →</span>
                </div>
              </div>
              <div key={`conn-${i}`} className="b2g1-conn">
                <div className="b2g1-conn-line" />
                <span className="b2g1-conn-sym">+</span>
                <div className="b2g1-conn-line" />
              </div>
            </>
          ))}

          {/* Free tile */}
          <div className="b2g1-tile b2g1-free" onClick={onShopNow}>
            <img className="b2g1-img" src={freeProduct?.images?.[0] || ""} alt={freeProduct?.name || "Free Product"} />
            <div className="b2g1-scrim" />
            <span className="b2g1-num">0{buyProducts.length + 1}</span>
            <span className="b2g1-tag b2g1-free-tag">Free</span>
            <div className="b2g1-info">
              <span className="b2g1-name">{freeProduct?.name || "Free Product"}</span>
              <span className="b2g1-sub">Yours Free</span>
            </div>
          </div>
        </div>

        <div className="b2g1-bottom">
          <div className="b2g1-meta">
            <span className="b2g1-title">{offer.title}</span>
            {savingsAmount > 0 && (
              <div className="b2g1-save-block">
                <span className="b2g1-save-lbl">Total Savings</span>
                <span className="b2g1-save-amt">{formatPrice(savingsAmount)}</span>
              </div>
            )}
          </div>
          <button className="b2g1-btn" onClick={onShopNow}>
            <span>Claim This Offer</span>
            <svg className="b2g1-arrow" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1.5 7.5h12M9 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="b2g1-scarc">
            <div className="b2g1-dot" />
            <span className="b2g1-scarc-txt">Limited stock — offer ends today</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   B1G1 CARD  —  Buy One, Get One Free
   Dark near-black palette, 2-tile split with gold divider
───────────────────────────────────────────────────────────────── */
export function B1G1Card({ offer, onShopNow }: ModernOfferCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const items = offer.combo_items || [];
  const products = items.map(i => i.product).filter(Boolean) as Product[];
  const p0 = products[0] || null;
  const p1 = products[1] || products[0] || null;
  const savingsAmount = offer.discount_value || (p1?.mrp || 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .b1g1-wrap{width:100%;max-width:720px;position:relative;opacity:${mounted ? 1 : 0};transform:${mounted ? 'translateY(0)' : 'translateY(24px)'};transition:opacity .8s ease,transform .8s ease;margin:0 auto;font-family:'DM Sans',sans-serif;background:#111009;overflow:hidden;}
        .b1g1-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#c9a96e 30%,#f0d99a 50%,#c9a96e 70%,transparent);z-index:3;}
        .b1g1-pill{position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:#c9a96e;color:#0e0c09;font-size:8px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;padding:7px 22px;z-index:10;white-space:nowrap;}
        .b1g1-imgs{display:grid;grid-template-columns:1fr 1fr;height:420px;position:relative;}
        .b1g1-imgs::after{content:'';position:absolute;top:0;bottom:0;left:50%;width:1px;background:linear-gradient(to bottom,transparent,#c9a96e 30%,#c9a96e 70%,transparent);z-index:2;}
        .b1g1-tile{position:relative;overflow:hidden;cursor:pointer;}
        .b1g1-img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .8s cubic-bezier(.25,.46,.45,.94),filter .6s ease;filter:brightness(.88) contrast(1.06) saturate(.85);}
        .b1g1-tile:hover .b1g1-img{transform:scale(1.06);filter:brightness(.95) contrast(1.08) saturate(1);}
        .b1g1-scrim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(14,12,9,.15) 0%,transparent 35%,rgba(14,12,9,.72) 100%);pointer-events:none;}
        .b1g1-num{position:absolute;top:18px;left:20px;font-size:9px;font-weight:400;letter-spacing:.2em;color:rgba(255,255,255,.35);}
        .b1g1-badge{position:absolute;top:16px;right:16px;font-size:8px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;padding:5px 11px;}
        .b1g1-buy-badge{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.65);backdrop-filter:blur(6px);}
        .b1g1-free-badge{background:#c9a96e;color:#0e0c09;font-weight:600;}
        .b1g1-free-tile::before{content:'';position:absolute;inset:0;border:1.5px solid rgba(201,169,110,.4);z-index:3;pointer-events:none;}
        .b1g1-info{position:absolute;bottom:0;left:0;right:0;padding:16px 20px 22px;}
        .b1g1-name{display:block;font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:#f5f0e8;letter-spacing:.01em;line-height:1.15;margin-bottom:5px;}
        .b1g1-free-tile .b1g1-name{color:#f0d9a8;}
        .b1g1-price-row{display:flex;align-items:center;gap:8px;}
        .b1g1-price{font-size:12px;font-weight:400;color:rgba(255,255,255,.38);letter-spacing:.06em;}
        .b1g1-striked{text-decoration:line-through;}
        .b1g1-free-price{color:#c9a96e!important;font-weight:500!important;text-decoration:none!important;letter-spacing:.18em!important;text-transform:uppercase;font-size:9px!important;}
        .b1g1-eq{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:42px;height:42px;background:#1a1712;border:1px solid #c9a96e;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:5;}
        .b1g1-eq span{font-family:'Cormorant Garamond',serif;font-size:20px;font-style:italic;color:#c9a96e;line-height:1;margin-top:-2px;}
        .b1g1-info-row{background:#161410;border-top:1px solid #2a2620;padding:20px 30px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;}
        .b1g1-offer-tag{font-size:8px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:#c9a96e;display:block;margin-bottom:4px;}
        .b1g1-offer-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:400;color:#e8e0d4;letter-spacing:.01em;}
        .b1g1-divider{width:1px;height:36px;background:#2a2620;justify-self:center;}
        .b1g1-right{text-align:right;}
        .b1g1-save-lbl{display:block;font-size:8px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:#5a5040;margin-bottom:3px;}
        .b1g1-save-amt{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;color:#c9a96e;letter-spacing:.02em;line-height:1;}
        .b1g1-cta-wrap{background:#161410;border-top:1px solid #1e1c18;padding:0 30px 28px;display:flex;flex-direction:column;gap:14px;}
        .b1g1-btn{width:100%;position:relative;overflow:hidden;background:transparent;border:1px solid #3a3530;color:#c8bfb0;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:400;letter-spacing:.28em;text-transform:uppercase;padding:18px 32px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:14px;transition:color .45s ease,border-color .45s ease;}
        .b1g1-btn::after{content:'';position:absolute;inset:0;background:#c9a96e;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.77,0,.175,1);}
        .b1g1-btn:hover::after{transform:scaleX(1);}
        .b1g1-btn:hover{color:#0e0c09;border-color:#c9a96e;}
        .b1g1-btn span,.b1g1-arrow{position:relative;z-index:1;}
        .b1g1-arrow{transition:transform .3s ease;}
        .b1g1-btn:hover .b1g1-arrow{transform:translateX(5px);}
        .b1g1-scarc{display:flex;align-items:center;justify-content:center;gap:8px;}
        .b1g1-dot{width:5px;height:5px;border-radius:50%;background:#c9a96e;flex-shrink:0;animation:b1g1blink 2.4s infinite;}
        @keyframes b1g1blink{0%,100%{opacity:1}50%{opacity:.2}}
        .b1g1-scarc-txt{font-size:10px;color:#4a4438;letter-spacing:.08em;}
        @media(max-width:520px){.b1g1-imgs{height:auto;grid-template-columns:1fr;}.b1g1-imgs::after{display:none;}.b1g1-img{min-height:280px;}.b1g1-eq{display:none;}.b1g1-info-row{grid-template-columns:1fr;gap:10px;padding:18px 20px;}.b1g1-divider{display:none;}.b1g1-right{text-align:left;}.b1g1-cta-wrap{padding:0 20px 24px;}}
      `}</style>

      <div className="b1g1-wrap">
        <div className="b1g1-pill">Buy 1 · Get 1 Free</div>

        <div className="b1g1-imgs">
          <div className="b1g1-tile" onClick={onShopNow}>
            <img className="b1g1-img" src={p0?.images?.[0] || ""} alt={p0?.name || "Product 01"} />
            <div className="b1g1-scrim" />
            <span className="b1g1-num">01</span>
            <span className="b1g1-badge b1g1-buy-badge">Buy</span>
            <div className="b1g1-info">
              <span className="b1g1-name">{p0?.name || "Product 01"}</span>
              <div className="b1g1-price-row">
                <span className="b1g1-price">{formatPrice(p0?.selling_price || 0)}</span>
              </div>
            </div>
          </div>

          <div className="b1g1-tile b1g1-free-tile" onClick={onShopNow}>
            <img className="b1g1-img" src={p1?.images?.[0] || ""} alt={p1?.name || "Product 02"} />
            <div className="b1g1-scrim" />
            <span className="b1g1-num">02</span>
            <span className="b1g1-badge b1g1-free-badge">Free</span>
            <div className="b1g1-info">
              <span className="b1g1-name">{p1?.name || "Product 02"}</span>
              <div className="b1g1-price-row">
                <span className="b1g1-price b1g1-striked">{formatPrice(p1?.mrp || 0)}</span>
                <span className="b1g1-price b1g1-free-price">Free</span>
              </div>
            </div>
          </div>

          <div className="b1g1-eq"><span>=</span></div>
        </div>

        <div className="b1g1-info-row">
          <div>
            <span className="b1g1-offer-tag">Buy One · Get One Free</span>
            <span className="b1g1-offer-title">{offer.title}</span>
          </div>
          <div className="b1g1-divider" />
          <div className="b1g1-right">
            <span className="b1g1-save-lbl">You Save</span>
            <span className="b1g1-save-amt">{formatPrice(savingsAmount)}</span>
          </div>
        </div>

        <div className="b1g1-cta-wrap">
          <button className="b1g1-btn" onClick={onShopNow}>
            <span>Claim This Offer</span>
            <svg className="b1g1-arrow" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1.5 7.5h12M9 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="b1g1-scarc">
            <div className="b1g1-dot" />
            <span className="b1g1-scarc-txt">Limited stock — offer ends today</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMBO CARD  —  Curated Combo Bundle
   Dark near-black, 3-tile strip + pricing breakdown
───────────────────────────────────────────────────────────────── */
export function ComboCard({ offer, onShopNow }: ModernOfferCardProps) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const items = offer.combo_items || [];
  const products = items.map(i => i.product).filter(Boolean) as Product[];

  const individualTotal = products.reduce((s, p) => s + (p?.mrp || 0), 0);
  const comboPrice = offer.combo_price || individualTotal;
  const saving = individualTotal - comboPrice;
  const discountPct = individualTotal > 0 ? Math.round((saving / individualTotal) * 100) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .cmb-wrap{width:100%;max-width:780px;opacity:${mounted ? 1 : 0};transform:${mounted ? 'translateY(0)' : 'translateY(22px)'};transition:opacity .8s ease,transform .8s ease;margin:0 auto;font-family:'DM Sans',sans-serif;}
        .cmb-header{background:#161310;border:1px solid #2a2520;border-bottom:none;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;position:relative;}
        .cmb-header::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#c9a96e 30%,#f0d99a 50%,#c9a96e 70%,transparent);}
        .cmb-eyebrow{font-size:8px;font-weight:400;letter-spacing:.26em;text-transform:uppercase;color:#6a5f50;display:block;margin-bottom:6px;}
        .cmb-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:#f0ece4;letter-spacing:.02em;line-height:1;}
        .cmb-desc{font-size:11px;color:#6a5f50;letter-spacing:.04em;margin-top:4px;}
        .cmb-badge{background:#c9a96e;color:#0e0c09;font-size:8px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;padding:5px 14px;}
        .cmb-pct{font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:#c9a96e;letter-spacing:.04em;margin-top:4px;display:block;text-align:right;}
        .cmb-header-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px;}
        .cmb-strip{display:grid;grid-template-columns:repeat(3,1fr);border-left:1px solid #2a2520;border-right:1px solid #2a2520;}
        .cmb-tile{position:relative;overflow:hidden;height:360px;cursor:pointer;border-right:1px solid #2a2520;}
        .cmb-tile:last-child{border-right:none;}
        .cmb-timg{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;filter:brightness(.82) contrast(1.05) saturate(.8);transition:transform .8s cubic-bezier(.25,.46,.45,.94),filter .5s ease;}
        .cmb-tile:hover .cmb-timg,.cmb-tile.cmb-active .cmb-timg{transform:scale(1.06);filter:brightness(.95) contrast(1.06) saturate(.95);}
        .cmb-tscrim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,8,6,.1) 0%,transparent 40%,rgba(10,8,6,.75) 100%);pointer-events:none;}
        .cmb-tile.cmb-active::after{content:'';position:absolute;inset:0;border:2px solid rgba(201,169,110,.6);pointer-events:none;z-index:3;}
        .cmb-tnum{position:absolute;top:14px;left:16px;font-size:9px;font-weight:400;letter-spacing:.18em;color:rgba(255,255,255,.3);}
        .cmb-chip{position:absolute;top:12px;right:12px;background:rgba(10,8,6,.65);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.1);font-size:10px;color:rgba(255,255,255,.55);padding:4px 9px;letter-spacing:.06em;}
        .cmb-tinfo{position:absolute;bottom:0;left:0;right:0;padding:12px 16px 16px;}
        .cmb-tname{display:block;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;color:#f5f0e8;letter-spacing:.01em;margin-bottom:3px;line-height:1.1;}
        .cmb-tcolor{font-size:9px;font-weight:400;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.3);}
        .cmb-plus{position:absolute;top:50%;right:-14px;transform:translateY(-50%);width:28px;height:28px;background:#1e1b16;border:1px solid #c9a96e;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:5;}
        .cmb-plus span{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;color:#c9a96e;line-height:1;}
        .cmb-pricing{background:#161310;border:1px solid #2a2520;border-top:none;padding:22px 32px;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;}
        .cmb-pblock{display:flex;flex-direction:column;gap:3px;}
        .cmb-plbl{font-size:8px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:#5a5040;}
        .cmb-pold{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:#8a7f70;text-decoration:line-through;letter-spacing:.01em;line-height:1;}
        .cmb-pnew{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:600;color:#c9a96e;letter-spacing:.01em;line-height:1;}
        .cmb-psave{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:#f0ece4;letter-spacing:.01em;line-height:1;}
        .cmb-pdiv{width:1px;height:40px;background:#2a2520;margin:0 28px;}
        .cmb-bkdn{background:#131109;border:1px solid #2a2520;border-top:none;padding:16px 32px;display:flex;align-items:center;gap:0;}
        .cmb-bkdn-lbl{font-size:8px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:#4a4030;margin-right:20px;white-space:nowrap;flex-shrink:0;}
        .cmb-bkdn-items{display:flex;align-items:center;gap:0;flex:1;}
        .cmb-bkdn-item{display:flex;align-items:center;gap:10px;flex:1;padding:0 16px;border-right:1px solid #2a2520;}
        .cmb-bkdn-item:first-child{padding-left:0;}
        .cmb-bkdn-item:last-child{border-right:none;}
        .cmb-bdot{width:6px;height:6px;border-radius:50%;background:#c9a96e;flex-shrink:0;}
        .cmb-bname{font-size:10px;color:#6a5f50;letter-spacing:.06em;flex:1;}
        .cmb-bprice{font-size:10px;color:#4a4030;letter-spacing:.06em;text-decoration:line-through;}
        .cmb-cta{border:1px solid #2a2520;border-top:none;background:#161310;padding:20px 32px 28px;display:flex;flex-direction:column;gap:12px;}
        .cmb-btn{width:100%;position:relative;overflow:hidden;background:transparent;border:1px solid #3a3020;color:#c8bfb0;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:400;letter-spacing:.28em;text-transform:uppercase;padding:18px 32px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:14px;transition:color .4s ease,border-color .4s ease;}
        .cmb-btn::after{content:'';position:absolute;inset:0;background:#c9a96e;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.77,0,.175,1);}
        .cmb-btn:hover::after{transform:scaleX(1);}
        .cmb-btn:hover{color:#0e0c09;border-color:#c9a96e;}
        .cmb-btn span,.cmb-arrow{position:relative;z-index:1;}
        .cmb-arrow{transition:transform .3s ease;}
        .cmb-btn:hover .cmb-arrow{transform:translateX(5px);}
        .cmb-sub{display:flex;align-items:center;justify-content:center;gap:16px;}
        .cmb-sub-item{display:flex;align-items:center;gap:6px;font-size:9px;color:#4a4030;letter-spacing:.1em;}
        .cmb-sub-dot{width:3px;height:3px;border-radius:50%;background:#4a4030;}
        .cmb-scarc{display:flex;align-items:center;justify-content:center;gap:8px;}
        .cmb-sdot{width:5px;height:5px;border-radius:50%;background:#c9a96e;flex-shrink:0;animation:cmbblink 2.2s infinite;}
        @keyframes cmbblink{0%,100%{opacity:1}50%{opacity:.2}}
        .cmb-stxt{font-size:10px;color:#4a4030;letter-spacing:.08em;}
        @media(max-width:600px){.cmb-strip{grid-template-columns:1fr;}.cmb-tile{height:240px;border-right:none;border-bottom:1px solid #2a2520;}.cmb-tile:last-child{border-bottom:none;}.cmb-plus{display:none;}.cmb-pricing{grid-template-columns:1fr;gap:14px;padding:18px 20px;}.cmb-pdiv{display:none;}.cmb-bkdn{flex-direction:column;align-items:flex-start;gap:12px;padding:14px 20px;}.cmb-bkdn-items{flex-direction:column;align-items:flex-start;gap:8px;width:100%;}.cmb-bkdn-item{padding:0;border-right:none;border-bottom:1px solid #2a2520;padding-bottom:8px;}.cmb-bkdn-item:last-child{border-bottom:none;padding-bottom:0;}.cmb-header{flex-direction:column;align-items:flex-start;gap:12px;padding:18px 20px;}.cmb-header-right{align-items:flex-start;}.cmb-cta{padding:16px 20px 24px;}}
      `}</style>

      <div className="cmb-wrap">
        <div className="cmb-header">
          <div>
            <span className="cmb-eyebrow">Curated Combo</span>
            <h2 className="cmb-title">{offer.title}</h2>
            {offer.description && <p className="cmb-desc">{offer.description}</p>}
          </div>
          <div className="cmb-header-right">
            {discountPct > 0 && <span className="cmb-badge">{discountPct}% Off</span>}
            <span className="cmb-pct">vs. buying separately</span>
          </div>
        </div>

        <div className="cmb-strip">
          {products.map((p, i) => (
            <div
              key={p?.id || i}
              className={`cmb-tile ${active === i ? "cmb-active" : ""}`}
              onClick={() => setActive(i)}
              style={{ position: "relative" }}
            >
              <img className="cmb-timg" src={p?.images?.[0] || ""} alt={p?.name || `Product ${i + 1}`} />
              <div className="cmb-tscrim" />
              <span className="cmb-tnum">0{i + 1}</span>
              <span className="cmb-chip">{formatPrice(p?.mrp || 0)}</span>
              <div className="cmb-tinfo">
                <span className="cmb-tname">{p?.name}</span>
                <span className="cmb-tcolor">{p?.colors?.[0] || ""}</span>
              </div>
              {i < products.length - 1 && (
                <div className="cmb-plus"><span>+</span></div>
              )}
            </div>
          ))}
        </div>

        <div className="cmb-pricing">
          <div className="cmb-pblock">
            <span className="cmb-plbl">Individual Total</span>
            <span className="cmb-pold">{formatPrice(individualTotal)}</span>
          </div>
          <div className="cmb-pdiv" />
          <div className="cmb-pblock">
            <span className="cmb-plbl">Combo Price</span>
            <span className="cmb-pnew">{formatPrice(comboPrice)}</span>
          </div>
          <div className="cmb-pdiv" />
          <div className="cmb-pblock">
            <span className="cmb-plbl">You Save</span>
            <span className="cmb-psave">{formatPrice(saving)}</span>
          </div>
        </div>

        <div className="cmb-bkdn">
          <span className="cmb-bkdn-lbl">Includes</span>
          <div className="cmb-bkdn-items">
            {products.map((p, i) => (
              <div className="cmb-bkdn-item" key={p?.id || i}>
                <div className="cmb-bdot" />
                <span className="cmb-bname">{p?.name}</span>
                <span className="cmb-bprice">{formatPrice(p?.mrp || 0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cmb-cta">
          <button className="cmb-btn" onClick={onShopNow}>
            <span>Shop the Combo</span>
            <svg className="cmb-arrow" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1.5 7.5h12M9 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="cmb-sub">
            <div className="cmb-sub-item">🚚 Free Shipping</div>
            <div className="cmb-sub-dot" />
            <div className="cmb-sub-item">↩ Easy Returns</div>
            <div className="cmb-sub-dot" />
            <div className="cmb-sub-item">✦ Premium Quality</div>
          </div>
          <div className="cmb-scarc">
            <div className="cmb-sdot" />
            <span className="cmb-stxt">Limited combo stock — offer while supplies last</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SINGLE OFFER CARD  —  Single Product Offer
   Dark hero layout: left image | right offer details + CTA
───────────────────────────────────────────────────────────────── */
export function SingleOfferCard({ offer, onShopNow }: ModernOfferCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const product = offer.product;
  const savings = (product?.mrp || 0) - (product?.selling_price || 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .single-wrap{width:100%;max-width:720px;position:relative;opacity:${mounted ? 1 : 0};transform:${mounted ? 'translateY(0)' : 'translateY(24px)'};transition:opacity .8s ease,transform .8s ease;margin:0 auto;font-family:'DM Sans',sans-serif;background:#111009;overflow:hidden;}
        .single-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#c9a96e 30%,#f0d99a 50%,#c9a96e 70%,transparent);z-index:3;}
        .single-inner{display:grid;grid-template-columns:1fr 1fr;min-height:420px;position:relative;}
        .single-inner::after{content:'';position:absolute;top:0;bottom:0;left:50%;width:1px;background:linear-gradient(to bottom,transparent,#c9a96e 30%,#c9a96e 70%,transparent);z-index:2;}
        .single-visual{position:relative;overflow:hidden;cursor:pointer;}
        .single-img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .9s cubic-bezier(.25,.46,.45,.94),filter .6s ease;filter:brightness(.88) contrast(1.06) saturate(.85);}
        .single-visual:hover .single-img{transform:scale(1.06);filter:brightness(.95) contrast(1.08) saturate(1);}
        .single-vscrim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(14,12,9,.15) 0%,transparent 35%,rgba(14,12,9,.55) 100%);pointer-events:none;}
        .single-save-pill{position:absolute;top:20px;left:20px;background:#c9a96e;color:#0e0c09;font-size:8px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;padding:6px 14px;z-index:4;}
        .single-pill{position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:#c9a96e;color:#0e0c09;font-size:8px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;padding:7px 22px;z-index:10;white-space:nowrap;}
        .single-content{background:#161410;padding:44px 30px 32px;display:flex;flex-direction:column;justify-content:center;gap:0;}
        .single-tag{font-size:8px;font-weight:400;letter-spacing:.28em;text-transform:uppercase;color:#c9a96e;display:block;margin-bottom:12px;}
        .single-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;font-style:italic;color:#e8e0d4;letter-spacing:.01em;line-height:1.2;margin-bottom:14px;}
        .single-desc{font-size:12px;color:rgba(255,255,255,.35);line-height:1.7;margin-bottom:24px;}
        .single-price-block{margin-bottom:28px;padding:16px 20px;background:rgba(201,169,110,.04);border:1px solid rgba(201,169,110,.12);}
        .single-price-lbl{display:block;font-size:8px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:#5a5040;margin-bottom:6px;}
        .single-price-row{display:flex;align-items:baseline;gap:10px;}
        .single-price-cur{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:#c9a96e;letter-spacing:.02em;line-height:1;}
        .single-price-mrp{font-size:13px;color:rgba(255,255,255,.25);text-decoration:line-through;letter-spacing:.04em;}
        .single-btn{width:100%;position:relative;overflow:hidden;background:transparent;border:1px solid #3a3530;color:#c8bfb0;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:400;letter-spacing:.28em;text-transform:uppercase;padding:16px 24px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px;transition:color .45s ease,border-color .45s ease;margin-bottom:14px;}
        .single-btn::after{content:'';position:absolute;inset:0;background:#c9a96e;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.77,0,.175,1);}
        .single-btn:hover::after{transform:scaleX(1);}
        .single-btn:hover{color:#0e0c09;border-color:#c9a96e;}
        .single-btn span,.single-arrow{position:relative;z-index:1;}
        .single-arrow{transition:transform .3s ease;}
        .single-btn:hover .single-arrow{transform:translateX(5px);}
        .single-scarc{display:flex;align-items:center;justify-content:center;gap:8px;}
        .single-dot{width:5px;height:5px;border-radius:50%;background:#c9a96e;flex-shrink:0;animation:snglblink 2.4s infinite;}
        @keyframes snglblink{0%,100%{opacity:1}50%{opacity:.2}}
        .single-stxt{font-size:10px;color:#4a4438;letter-spacing:.08em;}
        @media(max-width:520px){.single-inner{grid-template-columns:1fr;}.single-inner::after{display:none;}.single-visual{min-height:280px;}.single-content{padding:32px 20px 28px;}.single-title{font-size:22px;}}
      `}</style>

      <div className="single-wrap">
        <div className="single-pill">Limited Offer</div>
        <div className="single-inner">
          <div className="single-visual" onClick={onShopNow}>
            <img className="single-img" src={product?.images?.[0] || ""} alt={product?.name || offer.title} />
            <div className="single-vscrim" />
            {savings > 0 && <div className="single-save-pill">Save {formatPrice(savings)}</div>}
          </div>
          <div className="single-content">
            <span className="single-tag">Special Selection · Men's</span>
            <h2 className="single-title">{offer.title}</h2>
            <p className="single-desc">
              {offer.description || "A masterfully curated piece for the discerning gentleman. Experience premium craftsmanship at exceptional value."}
            </p>
            <div className="single-price-block">
              <span className="single-price-lbl">Offer Price</span>
              <div className="single-price-row">
                <span className="single-price-cur">{formatPrice(product?.selling_price || 0)}</span>
                {savings > 0 && <span className="single-price-mrp">{formatPrice(product?.mrp || 0)}</span>}
              </div>
            </div>
            <button className="single-btn" onClick={onShopNow}>
              <span>Claim This Offer</span>
              <svg className="single-arrow" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1.5 7.5h12M9 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="single-scarc">
              <div className="single-dot" />
              <span className="single-stxt">Limited stock — offer ends today</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
