// Minimal Tabler-style outline icons as React components
const Icon = ({ name, size = 20, stroke = 1.4, ...p }) => {
  const paths = {
    search: <><circle cx="10" cy="10" r="7"/><path d="m21 21-6-6"/></>,
    heart: <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1 4 2.5C10.5 6 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/>,
    "heart-fill": <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1 4 2.5C10.5 6 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z" fill="currentColor" stroke="none"/>,
    bag: <><path d="M5 7h14l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    x: <><path d="M6 6l12 12"/><path d="M18 6l-6 6 6 6"/><path d="M6 6l12 12M18 6 6 18"/></>,
    "chev-down": <polyline points="6 9 12 15 18 9" fill="none"/>,
    "chev-right": <polyline points="9 6 15 12 9 18" fill="none"/>,
    "chev-left": <polyline points="15 6 9 12 15 18" fill="none"/>,
    "arrow-right": <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></>,
    needle: <><path d="M3 21l8-8"/><path d="m13 11 8-8"/><circle cx="3" cy="21" r="1.2"/><path d="m14 4 6 6"/></>,
    leaf: <><path d="M5 19c0-9 6-13 14-13 0 8-4 14-13 14"/><path d="M5 19c2-4 5-7 9-9"/></>,
    "heart-line": <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1 4 2.5C10.5 6 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/>,
    candle: <><path d="M9 8h6v12H9z"/><path d="M12 3v3"/><path d="M12 6c-1 1-1 2 0 3 1-1 1-2 0-3z"/></>,
    cake: <><path d="M4 19h16v-7H4z"/><path d="M4 12c0-2 2-3 4-3M12 9c-2 0-4 1-4 3M16 9c-2 0-4 1-4 3M20 12c0-2-2-3-4-3"/><path d="M8 9V6M12 9V5M16 9V6"/></>,
    camera: <><path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></>,
    flower: <><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5V5M12 14.5V19M9.5 12H5M14.5 12H19M14 10l3-3M14 14l3 3M10 14l-3 3M10 10 7 7"/></>,
    gift: <><path d="M3 10h18v4H3z"/><path d="M4 14v7h16v-7"/><path d="M12 7v14"/><path d="M12 7c-2 0-4-1-4-3s2-2 4 0c2-2 4-2 4 0s-2 3-4 3z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></>,
    star: <polygon points="12 3 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9" fill="none"/>,
    filter: <><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></>,
    whatsapp: <><path d="M3 21l1.7-5.2A8 8 0 1 1 8.2 19.3L3 21z"/><path d="M9 9.5c0 3 2 5.5 5 6.5l1.5-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2L9 9.5z" fill="currentColor" stroke="none"/></>,
    "ig": <><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.7" fill="currentColor"/></>,
    "fb": <path d="M14 8h3V5h-3a3 3 0 0 0-3 3v2H8v3h3v8h3v-8h3l1-3h-4V8z"/>,
    tiktok: <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.5 2 2 3.5 4 3.5"/>,
    play: <polygon points="6 4 20 12 6 20" fill="currentColor" stroke="none"/>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    check: <polyline points="5 12 10 17 19 7" fill="none"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...p}>
      {paths[name]}
    </svg>
  );
};

// ===== Brand monogram (FA cursive heart) =====
const Monogram = ({ size = 28, color = "var(--gold)" }) => (
  <svg width={size} height={size * 0.95} viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 12 C 24 16, 24 24, 30 26 C 38 28, 44 24, 44 16 C 44 10, 40 8, 36 10 C 32 12, 30 18, 32 28 L 38 60 C 39 70, 36 78, 30 80 M 24 38 L 50 38 M 50 30 C 56 22, 70 22, 76 32 C 82 42, 78 58, 66 70 C 60 76, 52 82, 46 82 C 42 82, 40 78, 44 72 C 50 64, 60 56, 66 48 C 70 42, 70 36, 64 36 C 58 36, 52 42, 50 50" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// ===== Currency context =====
const CurrencyContext = React.createContext({ ccy: "LKR", setCcy: () => {} });
const useCurrency = () => React.useContext(CurrencyContext);

// ===== Cart / wishlist context =====
const ShopContext = React.createContext(null);
const useShop = () => React.useContext(ShopContext);

const ShopProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);
  const [toasts, setToasts] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);

  const addToast = (msg) => {
    const id = Math.random();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const removeFromCart = (id) => setCart(c => c.filter(it => it.id !== id));

  const addToCart = (slug, size) => {
    setCart(c => [...c, { slug, size, id: Math.random() }]);
    setCartOpen(true);
  };
  const toggleWish = (slug) => {
    setWishlist(w => {
      if (w.includes(slug)) { addToast("Removed from wishlist"); return w.filter(s => s !== slug); }
      addToast("Saved to wishlist"); return [...w, slug];
    });
  };
  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWish, toasts, cartOpen, openCart, closeCart }}>
      {children}
    </ShopContext.Provider>
  );
};

// ===== Router (hash-based) =====
const RouterContext = React.createContext({ route: "/", nav: () => {} });
const useRoute = () => React.useContext(RouterContext);
const navigate = (path) => { window.location.hash = path; };

const useHashRoute = () => {
  const [route, setRoute] = React.useState(() => window.location.hash.replace(/^#/, "") || "/");
  React.useEffect(() => {
    const fn = () => {
      setRoute(window.location.hash.replace(/^#/, "") || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return route;
};

// ===== Toasts UI =====
const ToastStack = () => {
  const { toasts } = useShop();
  return (
    <div className="toast-stack">
      {toasts.map(t => <div key={t.id} className="toast">{t.msg}</div>)}
    </div>
  );
};

// ===== Buttons =====
const Btn = ({ variant = "primary", children, block, ...p }) => (
  <button className={`btn btn-${variant}${block ? " btn-block" : ""}`} {...p}>{children}</button>
);

// ===== Product Card =====
const ProductCard = ({ product }) => {
  const { wishlist, toggleWish } = useShop();
  const { ccy } = useCurrency();
  const saved = wishlist.includes(product.slug);
  const go = () => navigate(`/product/${product.slug}`);
  return (
    <div className="pcard">
      <div className="pcard-img" onClick={go}>
        <FmImage src={window.productImg(product.slug, 0)} alt={product.name} fallback={product.tone === "saffron" ? "linear-gradient(160deg, #d6c4a8, #a89476)" : product.tone === "honey" ? "linear-gradient(160deg, #ddbfa0, #b88f60)" : "linear-gradient(135deg, var(--blush) 0%, #f0dbd2 50%, var(--blush) 100%)"}/>
        {product.badge && <span className="pcard-badge">{product.badge}</span>}
        <button className={`pcard-heart ${saved ? "saved" : ""}`} aria-label="Save to wishlist" onClick={(e) => { e.stopPropagation(); toggleWish(product.slug); }}>
          <Icon name={saved ? "heart-fill" : "heart"} size={16} />
        </button>
      </div>
      <div className="pcard-info" onClick={go}>
        <div className="pcard-name">{product.name}</div>
        <div className="pcard-desc">{product.desc}</div>
        <div className="pcard-price">{window.fmtPrice(product.priceLKR, ccy)}</div>
        <div className="pcard-sizes">Sizes · {product.sizes.join(", ")}</div>
      </div>
    </div>
  );
};

// ===== Occasion chip =====
const OccChip = ({ occ, onClick, active }) => (
  <button className={`chip chip-occasion ${active ? "active" : ""}`} onClick={onClick}>
    <Icon name={occ.icon} size={16} stroke={1.3} />
    <span>{occ.label}</span>
  </button>
);

// ===== Tone-corrected image with gradient fallback =====
const FmImage = ({ src, alt = "", warm = true, vignette = false, fallback, className = "", style = {} }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  return (
    <div className={`fm-img-wrap ${warm ? "warm" : ""} ${vignette ? "fm-vignette" : ""} ${className}`} style={{ background: fallback || "linear-gradient(160deg, var(--blush), var(--dusty-rose))", ...style }}>
      {!failed && (
        <img className={`fm-img ${loaded ? "loaded" : ""}`} src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>
      )}
    </div>
  );
};

// ===== Mini-cart drawer =====
const CartDrawer = () => {
  const { cart, cartOpen, closeCart, removeFromCart, addToCart } = useShop();
  const { ccy } = useCurrency();
  React.useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);
  if (!cartOpen) return null;

  const PRODUCTS = window.FILAMOUR_DATA.products;
  const subtotal = cart.reduce((s, it) => s + (PRODUCTS.find(p => p.slug === it.slug)?.priceLKR || 0), 0);
  const threshold = ccy === "LKR" ? 43200 : ccy === "USD" ? 150 : 120;
  const symbol = ccy === "LKR" ? "LKR " : ccy === "USD" ? "$" : "£";
  const subtotalDisp = ccy === "LKR" ? subtotal : subtotal * window.FILAMOUR_DATA.rates[ccy];
  const remaining = Math.max(0, threshold - subtotalDisp);
  const pct = Math.min(100, (subtotalDisp / threshold) * 100);
  const fmtAmt = (n) => ccy === "LKR" ? symbol + Math.round(n).toLocaleString() : symbol + n.toFixed(0);

  const goCheckout = () => { closeCart(); navigate("/checkout"); };
  const goFullCart = () => { closeCart(); navigate("/cart"); };

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="cart-drawer-head">
          <div>
            <div className="eyebrow gold">Your bag</div>
            <h3 className="h-display" style={{ fontSize: 22, marginTop: 4 }}>{cart.length} {cart.length === 1 ? "piece" : "pieces"}</h3>
          </div>
          <button className="cart-drawer-x" onClick={closeCart} aria-label="Close"><Icon name="x" size={18}/></button>
        </header>

        {cart.length === 0 ? (
          <div className="cart-drawer-empty">
            <Icon name="bag" size={28} stroke={1.2}/>
            <p>Your bag is quiet for now.</p>
            <Btn variant="primary" onClick={() => { closeCart(); navigate("/shop"); }}>Browse the collection</Btn>
          </div>
        ) : (
          <>
            <div className="cart-drawer-ship">
              {remaining > 0 ? (
                <div className="cart-drawer-ship-msg"><Icon name="gift" size={12} stroke={1.6}/><span>You're <strong>{fmtAmt(remaining)}</strong> away from free worldwide shipping.</span></div>
              ) : (
                <div className="cart-drawer-ship-msg won"><Icon name="check" size={12} stroke={1.8}/><span>Free worldwide shipping unlocked.</span></div>
              )}
              <div className="cart-drawer-bar"><div className="cart-drawer-fill" style={{ width: `${pct}%` }}/></div>
            </div>

            <div className="cart-drawer-items">
              {cart.map(it => {
                const p = PRODUCTS.find(pp => pp.slug === it.slug);
                if (!p) return null;
                return (
                  <div key={it.id} className="cart-drawer-item">
                    <div className="cart-drawer-img">
                      <FmImage src={window.productImg(it.slug, 0)} alt={p.name}/>
                    </div>
                    <div className="cart-drawer-meta">
                      <div className="cart-drawer-name">{p.name}</div>
                      <div className="cart-drawer-size">Size · {it.size}</div>
                      <div className="cart-drawer-price">{window.fmtPrice(p.priceLKR, ccy)}</div>
                    </div>
                    <button className="cart-drawer-remove" onClick={() => removeFromCart(it.id)} aria-label="Remove"><Icon name="x" size={12} stroke={1.8}/></button>
                  </div>
                );
              })}

              {/* Often paired with — cross-sell. Pieces not already in the bag, max 2. */}
              {(() => {
                const inBag = new Set(cart.map(c => c.slug));
                const pair = PRODUCTS.filter(p => !inBag.has(p.slug)).slice(0, 2);
                if (!pair.length) return null;
                return (
                  <div className="cart-drawer-pair">
                    <div className="eyebrow gold">Often paired with</div>
                    <div className="cart-drawer-pair-grid">
                      {pair.map(p => {
                        const firstSize = p.sizes.find(s => !p.oos.includes(s)) || p.sizes[0];
                        return (
                          <div key={p.slug} className="cart-drawer-pair-item">
                            <div className="cart-drawer-pair-img" onClick={() => { closeCart(); navigate(`/product/${p.slug}`); }}>
                              <FmImage src={window.productImg(p.slug, 0)} alt={p.name}/>
                            </div>
                            <div className="cart-drawer-pair-name">{p.name}</div>
                            <div className="cart-drawer-pair-price">{window.fmtPrice(p.priceLKR, ccy)}</div>
                            <button className="cart-drawer-pair-add" onClick={() => addToCart(p.slug, firstSize)}>+ Add to bag</button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            <footer className="cart-drawer-foot">
              <div className="cart-drawer-sub"><span>Subtotal</span><span>{window.fmtPrice(subtotal, ccy)}</span></div>
              <div className="cart-drawer-note">Shipping & taxes at checkout · gift-wrapped with a handwritten card</div>
              <div className="cart-drawer-actions">
                <Btn variant="primary" block onClick={goCheckout}>Continue to checkout</Btn>
                <button className="cart-drawer-link" onClick={goFullCart}>View full bag →</button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

Object.assign(window, { Icon, Monogram, CurrencyContext, useCurrency, ShopContext, ShopProvider, useShop, RouterContext, useRoute, useHashRoute, navigate, ToastStack, Btn, ProductCard, OccChip, FmImage, CartDrawer });
