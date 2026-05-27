// ===================== CHECKOUT =====================
const CheckoutPage = () => {
  const { cart } = useShop();
  const { ccy } = useCurrency();
  const [step, setStep] = React.useState(1);
  const [done, setDone] = React.useState(false);
  const [shipping, setShipping] = React.useState({ name: "", email: "", phone: "", address: "", city: "Colombo", country: "Sri Lanka", postal: "" });
  const [method, setMethod] = React.useState("card");

  const subtotal = cart.reduce((s, it) => s + (PRODUCTS.find(p => p.slug === it.slug)?.priceLKR || 0), 0);
  const ship = ccy === "LKR" ? (subtotal > 15000 ? 0 : 800) : 0;
  const total = subtotal + ship;

  if (cart.length === 0 && !done) {
    return (
      <div className="page">
        <div className="wrap" style={{ padding: "80px 0", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>Checkout</div>
          <h1 className="h-display" style={{ fontSize: 40 }}>Nothing to check out yet</h1>
          <p style={{ marginTop: 16, color: "var(--charcoal-soft)" }}>Add a piece to your bag to begin.</p>
          <div style={{ marginTop: 28 }}><Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn></div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="page">
        <div className="wrap" style={{ padding: "80px 0", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blush)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
            <Icon name="check" size={28} stroke={1.6}/>
          </div>
          <div className="eyebrow gold" style={{ marginTop: 24 }}>Order received</div>
          <h1 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>Thank you, {shipping.name?.split(" ")[0] || "friend"}.</h1>
          <p style={{ marginTop: 20, color: "var(--charcoal-soft)", fontFamily: "var(--display)", fontStyle: "italic", fontSize: 18 }}>Your order #FM-{Math.floor(Math.random() * 9000 + 1000)} is now with the workshop. We will write to you on WhatsApp within a working day.</p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center" }}>
            <Btn variant="primary" onClick={() => navigate("/")}>Return home</Btn>
            <Btn variant="secondary" onClick={() => navigate("/shop")}>Keep browsing</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="wrap" style={{ padding: "48px 0 96px", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 36, marginBottom: 48 }}>
          {["Information","Delivery","Payment"].map((label, i) => (
            <div key={label} className={`checkout-step ${step >= i+1 ? "active" : ""}`}>
              <div className="n">{i+1}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48 }}>
          <div>
            {step === 1 && (
              <div className="dash-card" style={{ background: "var(--white)" }}>
                <div className="dash-card-head"><h3>Contact & shipping</h3></div>
                <div className="dash-card-body padded">
                  <div className="form-grid">
                    <div className="span-2"><label className="form-label">Full name</label><input className="form-input" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})}/></div>
                    <div><label className="form-label">Email</label><input className="form-input" type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})}/></div>
                    <div><label className="form-label">WhatsApp</label><input className="form-input" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})}/></div>
                    <div className="span-2"><label className="form-label">Address</label><input className="form-input" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})}/></div>
                    <div><label className="form-label">City</label><input className="form-input" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})}/></div>
                    <div><label className="form-label">Postal code</label><input className="form-input" value={shipping.postal} onChange={e => setShipping({...shipping, postal: e.target.value})}/></div>
                    <div className="span-2"><label className="form-label">Country</label>
                      <select className="form-select" value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})}>
                        <option>Sri Lanka</option><option>United Kingdom</option><option>United States</option><option>India</option><option>Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ padding: 22, borderTop: "0.5px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                  <a href="#/cart" className="link" style={{ fontSize: 13, alignSelf: "center", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 3 }}>← Return to cart</a>
                  <Btn variant="primary" onClick={() => setStep(2)}>Continue to delivery</Btn>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="dash-card" style={{ background: "var(--white)" }}>
                <div className="dash-card-head"><h3>Delivery method</h3></div>
                <div className="dash-card-body padded">
                  {[
                    { id: "std", n: "Standard · 2-3 days (Colombo)", p: subtotal > 15000 ? "Free" : "LKR 800" },
                    { id: "ems", n: "EMS International · 7-14 days", p: "from £60" },
                    { id: "dhl", n: "DHL Express · 3-5 days", p: "from £90" },
                  ].map((o, i) => (
                    <label key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, border: "0.5px solid var(--line)", borderRadius: 4, marginBottom: 10, cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <input type="radio" name="ship" defaultChecked={i===0}/>
                        <span style={{ fontSize: 14 }}>{o.n}</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 400 }}>{o.p}</span>
                    </label>
                  ))}
                </div>
                <div style={{ padding: 22, borderTop: "0.5px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                  <button onClick={() => setStep(1)} className="link" style={{ fontSize: 13, alignSelf: "center", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 3 }}>← Back</button>
                  <Btn variant="primary" onClick={() => setStep(3)}>Continue to payment</Btn>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="dash-card" style={{ background: "var(--white)" }}>
                <div className="dash-card-head"><h3>Payment</h3></div>
                <div className="dash-card-body padded">
                  {[
                    { id: "card", t: "Card", d: "Visa, Mastercard, Amex" },
                    { id: "wa",   t: "WhatsApp + bank transfer", d: "Sri Lanka only" },
                    { id: "pp",   t: "PayPal", d: "International" },
                    { id: "cod",  t: "Cash on delivery", d: "Colombo only" },
                  ].map(o => (
                    <label key={o.id} style={{ display: "flex", alignItems: "center", padding: 16, border: "0.5px solid " + (method === o.id ? "var(--gold)" : "var(--line)"), borderRadius: 4, marginBottom: 10, cursor: "pointer", gap: 12 }} onClick={() => setMethod(o.id)}>
                      <input type="radio" name="pay" checked={method === o.id} onChange={() => setMethod(o.id)}/>
                      <div>
                        <div style={{ fontSize: 14 }}>{o.t}</div>
                        <div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>{o.d}</div>
                      </div>
                    </label>
                  ))}
                  {method === "card" && (
                    <div className="form-grid" style={{ marginTop: 16 }}>
                      <div className="span-2"><label className="form-label">Card number</label><input className="form-input" placeholder="•••• •••• •••• ••••"/></div>
                      <div><label className="form-label">Expiry</label><input className="form-input" placeholder="MM / YY"/></div>
                      <div><label className="form-label">CVC</label><input className="form-input" placeholder="•••"/></div>
                    </div>
                  )}
                </div>
                <div style={{ padding: 22, borderTop: "0.5px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                  <button onClick={() => setStep(2)} className="link" style={{ fontSize: 13, alignSelf: "center", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 3 }}>← Back</button>
                  <Btn variant="primary" onClick={() => setDone(true)}>Place order · {window.fmtPrice(total, ccy)}</Btn>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="dash-card" style={{ background: "var(--white)", position: "sticky", top: 100 }}>
              <div className="dash-card-head"><h3>Order summary</h3></div>
              <div className="dash-card-body padded">
                {cart.map(it => {
                  const p = PRODUCTS.find(p => p.slug === it.slug);
                  return (
                    <div key={it.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 14, marginBottom: 14, alignItems: "center" }}>
                      <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
                        <FmImage src={window.productImg(it.slug, 0)} alt={p.name}/>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--display)", fontSize: 15 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "var(--charcoal-soft)", marginTop: 2 }}>Size {it.size}</div>
                      </div>
                      <div style={{ fontSize: 13 }}>{window.fmtPrice(p.priceLKR, ccy)}</div>
                    </div>
                  );
                })}
                <div style={{ borderTop: "0.5px solid var(--line)", marginTop: 16, paddingTop: 16, fontSize: 13 }}>
                  <Row k="Subtotal" v={window.fmtPrice(subtotal, ccy)}/>
                  <Row k="Shipping" v={ship === 0 ? "Free" : window.fmtPrice(ship, ccy)}/>
                  <div style={{ borderTop: "0.5px solid var(--line)", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                    <span>Total</span><span style={{ fontWeight: 400 }}>{window.fmtPrice(total, ccy)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Row = ({ k, v }) => <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span style={{ color: "var(--charcoal-soft)" }}>{k}</span><span>{v}</span></div>;

// ===================== JOURNAL =====================
const JournalPage = () => {
  const articles = [
    { slug: "honeycomb-stitch", title: "Why honeycomb is our favourite stitch", excerpt: "Kamala on the pattern she has worked for twenty-two years.", date: "MAY 2026" },
    { slug: "muslin", title: "On muslin, and what it is for", excerpt: "The fabric we choose for our smallest pieces — and why.", date: "APR 2026" },
    { slug: "workshop", title: "A morning in the workshop", excerpt: "Photographs from one of our quieter days in Colombo.", date: "MAR 2026" },
  ];
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>Journal</div>
          <h1 className="h-display" style={{ fontSize: 52 }}>Letters from the workshop</h1>
        </div>
        <div className="grid-3">
          {articles.map(a => (
            <article key={a.slug} style={{ cursor: "pointer" }}>
              <div style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
                <FmImage src={window.IMG.journal[articles.indexOf(a)]} alt={a.title}/>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="eyebrow muted" style={{ fontSize: 10 }}>{a.date}</div>
                <h2 className="h-display" style={{ fontSize: 26, marginTop: 8 }}>{a.title}</h2>
                <p style={{ marginTop: 10, color: "var(--charcoal-soft)", fontSize: 14 }}>{a.excerpt}</p>
                <a className="link" href="#/journal" style={{ display: "inline-block", marginTop: 12, fontSize: 13, letterSpacing: "0.08em", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 2 }}>Read →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===================== SEARCH OVERLAY =====================
const SearchOverlay = ({ onClose }) => {
  const [q, setQ] = React.useState("");
  React.useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  const matches = q.trim() ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase())) : PRODUCTS.slice(0, 4);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(46,41,38,0.6)", zIndex: 200, animation: "fadeIn 150ms ease-out" }} onClick={onClose}>
      <div style={{ background: "var(--ivory)", padding: "32px 0 48px", animation: "slideUp 200ms ease-out" }} onClick={(e) => e.stopPropagation()}>
        <div className="wrap" style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 12 }}>
            <Icon name="search" size={22}/>
            <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search pieces, occasions, artisans…" style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--display)", fontSize: 28, fontWeight: 300 }}/>
            <button onClick={onClose} style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>Esc · Close</button>
          </div>
          <div style={{ marginTop: 24 }}>
            <div className="eyebrow gold" style={{ marginBottom: 16 }}>{q.trim() ? `${matches.length} matches` : "Popular"}</div>
            <div className="grid-4">
              {matches.slice(0, 4).map(p => <ProductCard key={p.slug} product={p}/>)}
            </div>
            {q.trim() && matches.length === 0 && (
              <div style={{ padding: 48, textAlign: "center", color: "var(--charcoal-soft)" }}>No matches. Try "dress", "romper", or "christening".</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { CheckoutPage, JournalPage, SearchOverlay });
