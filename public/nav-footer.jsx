// ===== International banner =====
const IntlBanner = () => {
  const [show, setShow] = React.useState(true);
  const { ccy } = useCurrency();
  if (!show || ccy === "LKR") return null;
  return (
    <div className="intl-banner">
      <span>We ship worldwide. International orders from GBP 60. Free shipping over GBP 120.</span>
      <a href="#/shipping">See shipping details</a>
      <button className="dismiss" onClick={() => setShow(false)} aria-label="Dismiss"><Icon name="x" size={14} /></button>
    </div>
  );
};

// ===== Currency selector =====
const CurrencyPill = () => {
  const { ccy, setCcy } = useCurrency();
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button className="currency-pill" onClick={() => setOpen(o => !o)}>{ccy} <Icon name="chev-down" size={10} stroke={1.6}/></button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "var(--white)", border: "0.5px solid var(--line)", borderRadius: 4, padding: 4, minWidth: 80, zIndex: 60 }}>
          {["LKR","GBP","USD"].map(c => (
            <button key={c} onClick={() => { setCcy(c); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", fontSize: 12, letterSpacing: "0.1em", color: ccy === c ? "var(--gold)" : "var(--charcoal)" }}>{c}</button>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== Shop Mega Menu =====
const MegaMenu = ({ onNav }) => {
  const cols = [
    { h: "By Occasion", items: ["Christening & Baptism","First Birthday","Family Photoshoot","Wedding Guest","Eid & Festive","New Baby Gift","Everyday Luxury"] },
    { h: "By Style", items: ["Dresses","Rompers & Playsuits","Sets & Coordinates","Tops & Blouses","Gift Sets","Bloomers & Layettes"] },
    { h: "By Size", items: ["Newborn (0-3 months)","3-6 months","6-12 months","12-18 months","18-24 months","2T / 3T","4T / 5T"] },
    { h: "Special", items: ["New Arrivals","Best Sellers","Ready to Ship","Made to Order","Limited Editions"] },
  ];
  return (
    <div className="mega">
      <div className="mega-grid">
        {cols.map(c => (
          <div className="mega-col" key={c.h}>
            <h4>{c.h}</h4>
            <ul>{c.items.map(it => <li key={it}><a href="#/shop" onClick={onNav}>{it}</a></li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== Mobile Menu =====
const MobileMenu = ({ onClose }) => {
  React.useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div className="mob-menu">
      <div className="mm-head">
        <div className="brand-wm" style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <img src="assets/filamour-logo.png" alt="" style={{ width: 32, height: 32, objectFit: "contain", mixBlendMode: "multiply" }}/>
          Filamour
        </div>
        <button onClick={onClose}><Icon name="x" size={22} /></button>
      </div>
      <div className="mm-section">
        <h5>Main</h5>
        <ul>
          <li><a href="#/" onClick={onClose}>Home</a></li>
          <li><a href="#/shop" onClick={onClose}>Shop</a></li>
          <li><a href="#/our-story" onClick={onClose}>Our Story</a></li>
          <li><a href="#/materials" onClick={onClose}>The Materials</a></li>
          <li><a href="#/gift-guide" onClick={onClose}>Gift Guide</a></li>
          <li><a href="#/bespoke" onClick={onClose}>Bespoke</a></li>
        </ul>
      </div>
      <div className="mm-section">
        <h5>Shop by</h5>
        <ul>
          <li><a href="#/shop" onClick={onClose} style={{ fontSize: 16 }}>Christening & Baptism</a></li>
          <li><a href="#/shop" onClick={onClose} style={{ fontSize: 16 }}>First Birthday</a></li>
          <li><a href="#/shop" onClick={onClose} style={{ fontSize: 16 }}>Family Photoshoot</a></li>
          <li><a href="#/shop" onClick={onClose} style={{ fontSize: 16 }}>New Baby Gift</a></li>
          <li><a href="#/shop" onClick={onClose} style={{ fontSize: 16 }}>Everyday Luxury</a></li>
        </ul>
      </div>
      <div className="mm-section">
        <h5>Help</h5>
        <ul>
          <li><a href="#/size-guide" onClick={onClose} style={{ fontSize: 16 }}>Size Guide</a></li>
          <li><a href="#/faq" onClick={onClose} style={{ fontSize: 16 }}>FAQ</a></li>
          <li><a href="#/shipping" onClick={onClose} style={{ fontSize: 16 }}>Shipping & Returns</a></li>
          <li><a href="#/contact" onClick={onClose} style={{ fontSize: 16 }}>Contact</a></li>
        </ul>
      </div>
    </div>
  );
};

// ===== NAV =====
const Nav = () => {
  const route = useHashRoute();
  const { cart, wishlist } = useShop();
  const [mega, setMega] = React.useState(false);
  const [mob, setMob] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  React.useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setSearch(false); };
    window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn);
  }, []);
  const active = (p) => route === p || (p !== "/" && route.startsWith(p));
  return (
    <>
      <IntlBanner />
      <nav className="nav" onMouseLeave={() => setMega(false)}>
        <div className="nav-inner">
          <button className="hamburger nav-icon" onClick={() => setMob(true)} aria-label="Menu"><Icon name="menu" size={22}/></button>
          <a href="#/" className="nav-logo">
            <img src="assets/filamour-logo.png" alt="" className="mark"/>
            <span>Filamour</span>
          </a>
          <div className="nav-center">
            <a href="#/" className={active("/") && route === "/" ? "active" : ""}>Home</a>
            <a href="#/shop" className={active("/shop") ? "active" : ""} onMouseEnter={() => setMega(true)}>Shop</a>
            <a href="#/our-story" className={active("/our-story") ? "active" : ""}>Our Story</a>
            <a href="#/materials" className={active("/materials") ? "active" : ""}>The Materials</a>
            <a href="#/lookbook" className={active("/lookbook") ? "active" : ""}>Lookbook</a>
            <a href="#/gift-guide" className={active("/gift-guide") ? "active" : ""}>Gift Guide</a>
          </div>
          <div className="nav-right">
            <CurrencyPill />
            <button className="nav-icon" aria-label="Search" onClick={() => setSearch(true)}><Icon name="search" size={18}/></button>
            <a href="#/wishlist" className="nav-icon" aria-label="Wishlist">
              <Icon name={wishlist.length ? "heart-fill" : "heart"} size={18}/>
            </a>
            <a href="#/cart" className="nav-icon" aria-label="Cart">
              <Icon name="bag" size={18}/>
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </a>
          </div>
        </div>
        {mega && <MegaMenu onNav={() => setMega(false)} />}
      </nav>
      {mob && <MobileMenu onClose={() => setMob(false)} />}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
};

// ===== Footer =====
const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="assets/filamour-logo.png" alt="" style={{ width: 48, height: 48, objectFit: "contain", mixBlendMode: "screen", opacity: 0.85 }}/>
            <div>
              <div className="wordmark">Filamour</div>
              <div className="tagline">Thread of Love</div>
            </div>
          </div>
          <p className="blurb">Heirloom children's wear made from GOTS-certified organic cotton and fine muslin. The fabrics we'd choose for a baby of our own, and nothing else.</p>
          <div className="footer-wa"><Icon name="whatsapp" size={16}/> Message us on WhatsApp</div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="#/shop">New Arrivals</a></li>
            <li><a href="#/shop">Best Sellers</a></li>
            <li><a href="#/shop">Christening</a></li>
            <li><a href="#/shop">First Birthday</a></li>
            <li><a href="#/shop">Gift Sets</a></li>
            <li><a href="#/shop">Ready to Ship</a></li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><a href="#/size-guide">Size Guide</a></li>
            <li><a href="#/care-guide">Care Guide</a></li>
            <li><a href="#/faq">FAQ</a></li>
            <li><a href="#/shipping">Shipping & Returns</a></li>
            <li><a href="#/contact">Contact</a></li>
            <li><a href="#/bespoke">Custom Orders</a></li>
            <li><a href="#/journal">Journal</a></li>
            <li><a href="#/dashboard" style={{ color: "var(--gold-soft)" }}>Seller dashboard ↗</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li><a href="#"><Icon name="ig" size={14}/> &nbsp; @filamour</a></li>
            <li><a href="#"><Icon name="fb" size={14}/> &nbsp; filamour</a></li>
            <li><a href="#"><Icon name="tiktok" size={14}/> &nbsp; @filamour</a></li>
          </ul>
          <h4 style={{ marginTop: 28 }}>The occasional letter</h4>
          <form className="footer-email" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your email" type="email" />
            <button type="submit">Subscribe →</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Filamour. Made by hand, made to last.</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Nav, Footer, IntlBanner });
