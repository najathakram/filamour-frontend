// ===== International banner =====
const IntlBanner = () => {
  const [show, setShow] = React.useState(true);
  const { ccy } = useCurrency();
  if (!show) return null;
  const msg = ccy === "LKR"
    ? "We ship worldwide. Switch to GBP or USD above."
    : "Free worldwide shipping over £120 · 14-day returns · gift-wrapped with a handwritten card.";
  return (
    <div className="intl-banner">
      <span>{msg}</span>
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
  const { user, openAccount, wishlist, cart } = useShop();
  const { ccy, setCcy } = useCurrency();
  React.useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  const go = (path) => { onClose(); navigate(path); };
  return (
    <div className="mob-menu">
      <div className="mm-head">
        <div className="brand-wm" style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <img src="assets/filamour-logo.png" alt="" style={{ width: 32, height: 32, objectFit: "contain", mixBlendMode: "multiply" }}/>
          Filamour
        </div>
        <button onClick={onClose}><Icon name="x" size={22} /></button>
      </div>

      {/* Account state at top — primary handle for repeat visitors */}
      <div className="mm-acct">
        {user ? (
          <button className="mm-acct-row" onClick={() => go("/account")}>
            <span className="mm-acct-name">Hello, {user.name}</span>
            <span className="mm-acct-meta">{user.email}</span>
          </button>
        ) : (
          <button className="mm-acct-row mm-acct-cta" onClick={() => { onClose(); openAccount(); }}>
            <Icon name="user" size={15} stroke={1.6}/>
            <span>Sign in or create account</span>
            <Icon name="chev-right" size={14} stroke={1.6}/>
          </button>
        )}
        <div className="mm-quicklinks">
          <button onClick={() => go("/wishlist")}><Icon name={wishlist.length ? "heart-fill" : "heart"} size={13}/>Wishlist {wishlist.length ? `· ${wishlist.length}` : ""}</button>
          <button onClick={() => go("/cart")}><Icon name="bag" size={13}/>Cart {cart.length ? `· ${cart.length}` : ""}</button>
        </div>
      </div>

      <div className="mm-section">
        <h5>Main</h5>
        <ul>
          <li><a href="#/" onClick={onClose}>Home</a></li>
          <li><a href="#/shop" onClick={onClose}>Shop the collection</a></li>
          <li><a href="#/our-story" onClick={onClose}>Our Story</a></li>
          <li><a href="#/materials" onClick={onClose}>The Materials</a></li>
          <li><a href="#/lookbook" onClick={onClose}>Lookbook</a></li>
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
          <li><a href="#/shop" onClick={onClose} style={{ fontSize: 16 }}>Everyday</a></li>
        </ul>
      </div>
      <div className="mm-section">
        <h5>Help</h5>
        <ul>
          <li><a href="#/size-guide" onClick={onClose} style={{ fontSize: 16 }}>Size Guide</a></li>
          <li><a href="#/faq" onClick={onClose} style={{ fontSize: 16 }}>FAQ</a></li>
          <li><a href="#/shipping" onClick={onClose} style={{ fontSize: 16 }}>Shipping & Returns</a></li>
          <li><a href="#/care-guide" onClick={onClose} style={{ fontSize: 16 }}>Care Guide</a></li>
          <li><a href="#/contact" onClick={onClose} style={{ fontSize: 16 }}>Contact</a></li>
        </ul>
      </div>

      {/* Currency selector inline (avoids a separate tap on the small pill) */}
      <div className="mm-section">
        <h5>Showing prices in</h5>
        <div className="mm-ccy">
          {["GBP","USD","LKR"].map(c => (
            <button key={c} className={`mm-ccy-btn ${ccy === c ? "active" : ""}`} onClick={() => setCcy(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Trust trio — reminded of the promises at the bottom */}
      <div className="mm-trust">
        <div><Icon name="check" size={12} stroke={1.6}/>Free shipping over £120</div>
        <div><Icon name="heart" size={12} stroke={1.6}/>14-day returns</div>
        <div><Icon name="gift" size={12} stroke={1.6}/>Handwritten card</div>
      </div>
    </div>
  );
};

// ===== NAV =====
const Nav = () => {
  const route = useHashRoute();
  const { cart, wishlist, openCart, openAccount, user } = useShop();
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
            {user ? (
              <a href="#/account" className="nav-icon" aria-label="Account" style={{ position: "relative" }}>
                <Icon name="user" size={18}/>
                <span className="user-dot" aria-hidden="true"/>
              </a>
            ) : (
              <button className="nav-icon" aria-label="Account" onClick={openAccount}>
                <Icon name="user" size={18}/>
              </button>
            )}
            <a href="#/wishlist" className="nav-icon" aria-label="Wishlist">
              <Icon name={wishlist.length ? "heart-fill" : "heart"} size={18}/>
            </a>
            <button className="nav-icon" aria-label="Cart" onClick={openCart} style={{ position: "relative" }}>
              <Icon name="bag" size={18}/>
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
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
          <p className="blurb">Heirloom children's wear made from natural fibers — cotton, muslin, linen — kept simple. The cloth we'd choose for a baby of our own, and nothing else.</p>
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
          <h4 style={{ marginTop: 28 }}>Add a child's birthday</h4>
          <p style={{ fontSize: 12, color: "rgba(245,239,230,0.65)", marginTop: 6, marginBottom: 14, lineHeight: 1.6, fontFamily: "var(--body)" }}>We'll write six weeks before — quietly — with a piece in the right size for the day.</p>
          <BirthdayCapture/>
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

// ===== Birthday-calendar capture (footer) =====
const BirthdayCapture = () => {
  const [sent, setSent] = React.useState(false);
  if (sent) {
    return (
      <div className="bday-thanks">
        <Icon name="check" size={14} stroke={1.8}/>
        <span>Thank you. We'll write six weeks before.</span>
      </div>
    );
  }
  return (
    <form className="bday-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input className="bday-input" type="text" placeholder="Child's first name" required/>
      <input className="bday-input" type="date" placeholder="Birthday" required/>
      <input className="bday-input" type="email" placeholder="Your email" required/>
      <button type="submit" className="bday-submit">Add the date →</button>
    </form>
  );
};

Object.assign(window, { Nav, Footer, IntlBanner, BirthdayCapture });
