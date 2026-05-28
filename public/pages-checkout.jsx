// ===================== CHECKOUT =====================
const CheckoutPage = () => {
  const { cart } = useShop();
  const { ccy } = useCurrency();
  const [step, setStep] = React.useState(1);
  const [done, setDone] = React.useState(false);
  const [shipping, setShipping] = React.useState({ name: "", email: "", phone: "", address: "", city: "", country: "United Kingdom", postal: "" });
  const [method, setMethod] = React.useState("card");
  const [gift, setGift] = React.useState({ on: false, recipName: "", recipAddress: "", recipCity: "", recipPostal: "", recipCountry: "United Kingdom", message: "", hidePrices: true });

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
    const orderNo = "FM-" + Math.floor(Math.random() * 9000 + 1000);
    const firstName = shipping.name?.split(" ")[0] || "friend";
    return (
      <div className="page">
        <div className="wrap" style={{ padding: "80px 0", textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blush)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
            <Icon name="check" size={28} stroke={1.6}/>
          </div>
          <div className="eyebrow gold" style={{ marginTop: 24 }}>Order received</div>
          <h1 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>Thank you, {firstName}.</h1>
          <p style={{ marginTop: 20, color: "var(--charcoal-soft)", fontFamily: "var(--display)", fontStyle: "italic", fontSize: 18 }}>Your order <strong>{orderNo}</strong> is now with the studio. We'll write to you on WhatsApp within a working day.</p>

          {/* The photo-before-ship promise. Sets up delight, opens a WhatsApp channel. */}
          <div className="conf-promise">
            <div className="eyebrow gold" style={{ marginBottom: 14 }}>What happens next</div>
            <ul>
              <li><span className="conf-step">1</span><div><strong>You'll get an email</strong> with the order details in the next few minutes.</div></li>
              <li><span className="conf-step">2</span><div><strong>We'll send you a photo</strong> of your piece, folded and wrapped, on WhatsApp — before it ships.</div></li>
              <li><span className="conf-step">3</span><div><strong>Tracking lands in your inbox</strong> the moment the parcel leaves the studio.</div></li>
              <li><span className="conf-step">4</span><div><strong>If anything is not right when it arrives,</strong> message Gaika directly. We'll make it right.</div></li>
            </ul>
          </div>

          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn variant="primary" onClick={() => navigate("/")}>Return home</Btn>
            <Btn variant="secondary" onClick={() => navigate("/shop")}>Keep browsing</Btn>
          </div>
          <p style={{ marginTop: 24, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>Order {orderNo} · Confirmation sent to {shipping.email || "your email"}</p>
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

                {/* Gift mode toggle */}
                <div className="gift-toggle-row">
                  <div className="gift-toggle-copy">
                    <div className="gift-toggle-head"><Icon name="gift" size={15} stroke={1.5}/><strong>This is a gift</strong></div>
                    <div className="gift-toggle-sub">We'll hide the price slip, add your card message by hand, and send the confirmation to you — not them.</div>
                  </div>
                  <button type="button" role="switch" aria-checked={gift.on} className={`gift-toggle-switch ${gift.on ? "on" : ""}`} onClick={() => setGift({ ...gift, on: !gift.on })}/>
                </div>

                <div className="dash-card-body padded">
                  <div className="eyebrow gold" style={{ marginBottom: 14 }}>{gift.on ? "Your details (for the receipt)" : "Contact & shipping"}</div>
                  <div className="form-grid">
                    <div className="span-2"><label className="form-label">{gift.on ? "Your full name" : "Full name"}</label><input className="form-input" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})}/></div>
                    <div><label className="form-label">{gift.on ? "Your email" : "Email"}</label><input className="form-input" type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})}/></div>
                    <div><label className="form-label">WhatsApp</label><input className="form-input" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})}/></div>
                    {!gift.on && (
                      <>
                        <div className="span-2"><label className="form-label">Address</label><input className="form-input" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})}/></div>
                        <div><label className="form-label">City</label><input className="form-input" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})}/></div>
                        <div><label className="form-label">Postal code</label><input className="form-input" value={shipping.postal} onChange={e => setShipping({...shipping, postal: e.target.value})}/></div>
                        <div className="span-2"><label className="form-label">Country</label>
                          <select className="form-select" value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})}>
                            <option>United Kingdom</option><option>United States</option><option>Canada</option><option>Australia</option><option>Ireland</option><option>Germany</option><option>France</option><option>Netherlands</option><option>United Arab Emirates</option><option>Singapore</option><option>India</option><option>Other</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  {gift.on && (
                    <div className="gift-recip">
                      <div className="eyebrow gold" style={{ marginBottom: 14 }}>Send the piece to</div>
                      <div className="form-grid">
                        <div className="span-2"><label className="form-label">Recipient's name</label><input className="form-input" value={gift.recipName} onChange={e => setGift({...gift, recipName: e.target.value})}/></div>
                        <div className="span-2"><label className="form-label">Their address</label><input className="form-input" value={gift.recipAddress} onChange={e => setGift({...gift, recipAddress: e.target.value})}/></div>
                        <div><label className="form-label">City</label><input className="form-input" value={gift.recipCity} onChange={e => setGift({...gift, recipCity: e.target.value})}/></div>
                        <div><label className="form-label">Postal code</label><input className="form-input" value={gift.recipPostal} onChange={e => setGift({...gift, recipPostal: e.target.value})}/></div>
                        <div className="span-2"><label className="form-label">Country</label>
                          <select className="form-select" value={gift.recipCountry} onChange={e => setGift({...gift, recipCountry: e.target.value})}>
                            <option>United Kingdom</option><option>United States</option><option>Canada</option><option>Australia</option><option>Ireland</option><option>Germany</option><option>France</option><option>Netherlands</option><option>United Arab Emirates</option><option>Singapore</option><option>India</option><option>Other</option>
                          </select>
                        </div>
                        <div className="span-2">
                          <label className="form-label">Your card message <span style={{ color: "var(--charcoal-soft)", textTransform: "none", letterSpacing: 0 }}>(handwritten on a Filamour card)</span></label>
                          <textarea className="form-text" rows="3" maxLength={240} placeholder="For Mira, on her first birthday. With all our love." value={gift.message} onChange={e => setGift({...gift, message: e.target.value})}/>
                          <div className="form-counter">{gift.message.length} / 240</div>
                        </div>
                        <div className="span-2">
                          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--charcoal)", cursor: "pointer" }}>
                            <input type="checkbox" checked={gift.hidePrices} onChange={e => setGift({...gift, hidePrices: e.target.checked})}/>
                            Hide the price slip from the parcel. <span style={{ color: "var(--charcoal-soft)" }}>(We always do this for gifts by default.)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
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
                    { id: "uk",  n: "United Kingdom · 2-4 working days · tracked",       p: "£12 (free over £120)" },
                    { id: "dhl", n: "International DHL Express · 3-7 working days",        p: "from £35" },
                    { id: "ems", n: "International EMS · 7-14 working days · tracked",     p: "from £60" },
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
                    { id: "card", t: "Card", d: "Visa, Mastercard, Amex, Apple Pay, Google Pay" },
                    { id: "pp",   t: "PayPal", d: "Buyer protection, worldwide" },
                    { id: "wa",   t: "WhatsApp + bank transfer", d: "Message us and we'll send instructions" },
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
    { slug: "fabric-test", title: "What we test before a fabric makes the cut", excerpt: "The shrinkage check, the 24-hour skin test, and the seam-roughness pass.", date: "MAR 2026" },
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
            <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search pieces, occasions, materials…" style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--display)", fontSize: 28, fontWeight: 300 }}/>
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
