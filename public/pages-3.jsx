// ===================== GIFT GUIDE =====================
const GiftGuidePage = () => {
  const newBaby = PRODUCTS.filter(p => p.occasion === "New Baby Gift" || p.sizes.includes("NB")).slice(0, 4);
  const firstBday = PRODUCTS.filter(p => p.sizes.some(s => ["12M","18M"].includes(s))).slice(0, 4);
  const christening = PRODUCTS.filter(p => p.occasion === "Christening & Baptism").concat(PRODUCTS).slice(0, 4);
  const photoshoot = PRODUCTS.filter(p => p.occasion === "Family Photoshoot").concat(PRODUCTS).slice(0, 4);
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 80px 96px" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 80px" }}>
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>The Gift Guide</div>
          <h1 className="h-display" style={{ fontSize: 56, lineHeight: 1.05 }}>The perfect gift,<br/>beautifully made</h1>
          <p className="h-italic" style={{ fontSize: 19, marginTop: 24, color: "var(--charcoal-soft)" }}>Pieces wrapped in tissue and ribbon, with a handwritten card. Choose by milestone, or let us suggest.</p>
        </div>

        <GgSection title="For a new baby" intro="The most precious moments deserve the most beautiful things." products={newBaby} badge="Free gift wrapping on all orders"/>
        <GgSection title="For a first birthday" intro="A milestone occasion. A piece they'll remember in photographs forever." products={firstBday}/>
        <GgSection title="For a christening or baptism" intro="Whites and ivories made for the moment, kept for the album." products={christening}/>
        <GgSection title="For a family photoshoot" intro="Clothing that photographs beautifully — quiet tones, real texture, real cloth." products={photoshoot}/>

        <div className="packaging">
          <div>
            <div className="eyebrow gold" style={{ marginBottom: 12 }}>Packaging</div>
            <h2>Every Filamour order arrives beautifully packaged.</h2>
            <p>Each piece is folded in acid-free tissue, tied with a single antique-gold ribbon, and tucked into our charcoal Filamour box. A handwritten card carries your message. Nothing about it says shipping.</p>
            <div style={{ marginTop: 28 }}><Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn></div>
          </div>
          <div className="packaging-img"><FmImage src={window.IMG.packaging} alt="Packaged Filamour order"/></div>
        </div>
      </div>
    </div>
  );
};

const GgSection = ({ title, intro, products, badge }) => (
  <div className="gg-section">
    <div className="gg-head">
      <div>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      {badge && <div className="gg-badge"><Icon name="gift" size={12}/> {badge}</div>}
    </div>
    <div className="grid-4">
      {products.map(p => <ProductCard key={p.slug + title} product={p}/>)}
    </div>
  </div>
);

// ===================== BESPOKE =====================
const BespokePage = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const { ccy } = useCurrency();
  const fromPrice = ccy === "LKR" ? "LKR 65,000" : ccy === "USD" ? "$220" : "£180";
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px", maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="eyebrow gold" style={{ marginBottom: 14 }}>Bespoke</div>
          <h1 className="h-display" style={{ fontSize: 48 }}>A piece made exactly for your little one</h1>
          <p className="h-italic" style={{ fontSize: 18, marginTop: 22, color: "var(--charcoal-soft)", maxWidth: 580, margin: "22px auto 0" }}>We take a small number of bespoke orders each month. Tell us what you imagine — we'll write back within 24 hours with a sketch, a price, and a date.</p>
        </div>

        {/* How it works — sets expectations, reduces anxiety about a non-standard order */}
        <div className="bespoke-steps">
          {[
            { n: "01", h: "Tell us what you imagine", p: "Fill the form below — occasion, date, colours, any inspiration you've found." },
            { n: "02", h: "We write back within 24 hours", p: "On WhatsApp, with a hand-drawn sketch, a price, and the timeline we can promise." },
            { n: "03", h: "You approve, we make it", p: "Made by hand in 10–14 working days, then wrapped and sent. We send a photo before it ships." },
          ].map(s => (
            <div key={s.n} className="bespoke-step">
              <div className="bespoke-step-n">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bespoke-thanks">
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--blush)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", marginBottom: 18 }}>
              <Icon name="check" size={26} stroke={1.6}/>
            </div>
            <div className="eyebrow gold">Received with care</div>
            <h2 className="h-display" style={{ fontSize: 32, marginTop: 12 }}>Your request is on its way to the studio.</h2>
            <p style={{ marginTop: 16, color: "var(--charcoal-soft)", fontFamily: "var(--display)", fontStyle: "italic", fontSize: 18, maxWidth: 480, margin: "16px auto 0" }}>Gaika will read this herself and write back within 24 hours on WhatsApp. If you don't hear within that, message us — your note may have got lost.</p>
          </div>
        ) : (
          <form className="bespoke-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="bespoke-form-head">
              <div className="eyebrow gold" style={{ marginBottom: 10 }}>The brief</div>
              <h2 className="h-display" style={{ fontSize: 28 }}>Tell us what you imagine</h2>
            </div>
            <div className="bf-grid">
              <Field label="Your name *" name="name"/>
              <Field label="Email *" name="email" type="email"/>
              <Field label="WhatsApp number *" name="wa" placeholder="+44 …"/>
              <Field label="Child's name (optional)" name="child"/>
              <Field label="Size needed *" name="size" placeholder="e.g. 12M"/>
              <Field label="Date needed by *" name="date" type="date"/>
              <Field label="Occasion *" name="occasion" placeholder="Christening, first birthday…" span={2}/>
              <FieldArea label="Preferred colours, fabric, or a piece you've seen elsewhere" name="colours" placeholder="Ivory cotton-muslin, full skirt, hand-embroidered florals…"/>
              <FieldArea label="Anything else we should know" name="details" placeholder="A photograph, a memory, a piece your mother wore…"/>
            </div>
            <div className="bespoke-form-actions">
              <Btn variant="primary">Send your request</Btn>
              <a href="https://wa.me/447000000000" target="_blank" rel="noopener" className="btn btn-wa">
                <Icon name="whatsapp" size={16}/> Or message Gaika directly
              </a>
            </div>
            <div className="bespoke-fineprint">
              <div><Icon name="check" size={13} stroke={1.6}/><span><strong>From {fromPrice}</strong> · pricing depends on the piece, fabric and finish.</span></div>
              <div><Icon name="check" size={13} stroke={1.6}/><span><strong>10–14 working days</strong> production. Wrapped and shipped tracked.</span></div>
              <div><Icon name="check" size={13} stroke={1.6}/><span><strong>Photo before it ships.</strong> Bespoke pieces aren't returnable, so we make sure you're sure.</span></div>
            </div>
          </form>
        )}
      </div>
      <style>{`
        .bespoke-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 56px; }
        @media (max-width: 760px) { .bespoke-steps { grid-template-columns: 1fr; } }
        .bespoke-step { background: var(--white); padding: 28px 26px; border-top: 0.5px solid var(--gold); }
        .bespoke-step-n { font-family: var(--display); font-weight: 300; font-size: 13px; letter-spacing: 0.22em; color: var(--gold); }
        .bespoke-step h3 { font-family: var(--display); font-weight: 400; font-size: 21px; margin-top: 10px; line-height: 1.25; }
        .bespoke-step p { margin-top: 10px; color: var(--charcoal-soft); font-size: 14px; line-height: 1.7; }

        .bespoke-form { background: var(--white); padding: 40px; border: 0.5px solid var(--line); }
        @media (max-width: 640px) { .bespoke-form { padding: 28px 22px; } }
        .bespoke-form-head { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 0.5px solid var(--line); }
        .bf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
        @media (max-width: 640px) { .bf-grid { grid-template-columns: 1fr; } }
        .field label { display: block; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--charcoal-soft); margin-bottom: 8px; }
        .field input, .field textarea { width: 100%; background: var(--ivory); border: 0.5px solid var(--line); padding: 12px 14px; border-radius: 4px; font-size: 15px; font-family: var(--body); }
        .field input:focus, .field textarea:focus { outline: none; border-color: var(--gold); background: var(--white); }
        .field.span-2 { grid-column: 1 / -1; }
        .bespoke-form-actions { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; align-items: center; }
        .bespoke-fineprint { margin-top: 32px; padding: 22px; background: var(--ivory); border-radius: 4px; display: flex; flex-direction: column; gap: 12px; }
        .bespoke-fineprint > div { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.6; color: var(--charcoal); }
        .bespoke-fineprint svg { color: var(--gold); flex-shrink: 0; margin-top: 3px; }
        .bespoke-fineprint strong { font-weight: 400; }

        .bespoke-thanks { background: var(--white); padding: 64px 40px; text-align: center; border: 0.5px solid var(--gold); }
      `}</style>
    </div>
  );
};
const Field = ({ label, name, type = "text", placeholder, span }) => (
  <div className={`field ${span === 2 ? "span-2" : ""}`}>
    <label>{label}</label>
    <input type={type} name={name} placeholder={placeholder || ""}/>
  </div>
);
const FieldArea = ({ label, name, placeholder }) => (
  <div className="field span-2">
    <label>{label}</label>
    <textarea name={name} rows="3" placeholder={placeholder || ""}/>
  </div>
);

// ===================== SIZE GUIDE =====================
const SizeGuidePage = () => {
  const rows = [
    ["NB","0-3 months","38-40","50-52"],
    ["3-6M","3-6 months","40-42","55-58"],
    ["6-12M","6-12 months","42-46","60-65"],
    ["12-18M","12-18 months","46-50","68-72"],
    ["18-24M","18-24 months","50-52","74-78"],
    ["2T","2 years","52-54","82-86"],
    ["3T","3 years","54-56","90-95"],
    ["4T","4 years","56-58","98-103"],
    ["5T","5 years","58-60","106-110"],
  ];
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>Sizing</div>
          <h1 className="h-display" style={{ fontSize: 48 }}>Finding the right fit</h1>
          <p style={{ marginTop: 20, color: "var(--charcoal-soft)" }}>Filamour pieces are cut a touch generous so they grow with your child. If between sizes, size up.</p>
        </div>

        <div style={{ background: "var(--white)", border: "0.5px solid var(--line)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--blush)", textAlign: "left" }}>
                {["Size","Age guide","Chest (cm)","Length (cm)"].map(h => (
                  <th key={h} style={{ padding: "16px 20px", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[0]} style={{ borderTop: "0.5px solid var(--line)" }}>
                  {r.map((c, j) => (
                    <td key={j} style={{ padding: "16px 20px", fontFamily: j === 0 ? "var(--display)" : "inherit", fontSize: j === 0 ? 17 : 14, fontWeight: j === 0 ? 400 : 300 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="h-display" style={{ fontSize: 30, marginTop: 64, marginBottom: 28 }}>How to measure</h2>
        <div className="grid-3">
          {[
            { n: "01", h: "Chest", b: "Measure around the fullest part of the chest, just under the arms. Keep the tape level." },
            { n: "02", h: "Length", b: "From the highest point of the shoulder, straight down to the desired hem. Babies: to mid-calf." },
            { n: "03", h: "When unsure", b: "Always size up. Our pieces are forgiving in the chest and waist, and a child grows quickly." },
          ].map(s => (
            <div key={s.n} style={{ padding: 28, background: "var(--white)", border: "0.5px solid var(--line)" }}>
              <div className="eyebrow gold" style={{ marginBottom: 12 }}>Step {s.n}</div>
              <h3 className="h-display" style={{ fontSize: 22, marginBottom: 10 }}>{s.h}</h3>
              <p style={{ fontSize: 14, color: "var(--charcoal-soft)" }}>{s.b}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: 24, borderLeft: "2px solid var(--gold)", background: "var(--white)", fontStyle: "italic", fontFamily: "var(--display)", fontSize: 17, color: "var(--charcoal-soft)" }}>
          If you are unsure, write to us on WhatsApp — we are happy to advise based on your child's recent measurements.
        </div>
      </div>
    </div>
  );
};

// ===================== FAQ =====================
const FaqPage = () => {
  const cats = [
    { h: "Ordering", qs: [
      ["How do I place an order?", "Add pieces to your cart and check out online with card, PayPal, or Apple Pay. Or message us on WhatsApp and we'll walk you through it."],
      ["Can I order via WhatsApp?", "Yes — tap the green button on any product page. We answer most messages within a working day."],
      ["How long does production take?", "Ready-to-ship pieces leave within 2 working days. Made-to-order pieces take 8–14 working days, then ship."],
      ["Can I request a custom size?", "Yes. Use the Bespoke page to send your child's measurements and we will hand-make to fit."],
    ]},
    { h: "Shipping", qs: [
      ["Do you ship internationally?", "Yes. Worldwide, with tracked and signed-for delivery."],
      ["How long does international shipping take?", "UK & EU: 3–5 days via DHL. North America: 4–7 days via DHL. Rest of world: 7–14 days via EMS. Times exclude the production window for made-to-order pieces."],
      ["What are the shipping costs?", "From GBP 12 within the UK, from GBP 35 to Europe, from GBP 60 elsewhere. Free shipping on orders over GBP 120."],
      ["How do I track my order?", "We send tracking via email and WhatsApp the day your piece ships."],
    ]},
    { h: "Returns", qs: [
      ["What is your returns policy?", "Free returns within 14 days if unworn, with tags attached. Bespoke pieces are not returnable."],
      ["What if my order arrives damaged?", "Send a photo within 48 hours and we will replace it at our cost. Always."],
      ["Can I exchange a size?", "Yes — within 14 days, for any in-stock piece in another size."],
    ]},
    { h: "Materials & care", qs: [
      ["What fabrics do you use?", "Natural fibers only — cotton, muslin, and linen. No synthetic blends, no wrinkle-release or stain-shield finishes."],
      ["Why does fabric choice matter for a baby?", "Babies wear what we give them, all day, against very sensitive skin. Natural fibers breathe; synthetics trap heat. Pure fabrics wear in beautifully; blends pill and stiffen. The cloth makes more difference than the cut."],
      ["Are the colours gentle on sensitive skin?", "We work in a quiet palette — ivory, blush, dusty rose, charcoal, saffron, sage — using gentle dyeing, not aggressive bleaching or high-intensity pigment."],
      ["How do I wash a Filamour piece?", "Machine wash cool on a delicate cycle is fine. Skip fabric softener — natural cotton softens on its own. Hang or lay flat to dry. Warm iron from the reverse if you like a crisp finish."],
    ]},
  ];
  const [open, setOpen] = React.useState({});
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px", maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>Help</div>
          <h1 className="h-display" style={{ fontSize: 48 }}>Frequently asked</h1>
        </div>
        {cats.map(cat => (
          <div key={cat.h} style={{ marginBottom: 48 }}>
            <h2 className="h-display" style={{ fontSize: 26, marginBottom: 16 }}>{cat.h}</h2>
            <div className="accord" style={{ borderTop: "0.5px solid var(--line)" }}>
              {cat.qs.map(([q, a]) => {
                const key = cat.h + q;
                const isOpen = open[key];
                return (
                  <div key={q} className="accord-item">
                    <button className={`accord-trigger ${isOpen ? "open" : ""}`} onClick={() => setOpen(o => ({...o, [key]: !o[key]}))}>
                      <span>{q}</span>
                      <span className="chev"><Icon name="chev-down" size={14} stroke={1.6}/></span>
                    </button>
                    <div className={`accord-content ${isOpen ? "open" : ""}`}><p>{a}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===================== LOOKBOOK =====================
const LookbookPage = () => {
  const tiles = [
    { sz: "tall", l: "Garden · Spring", img: window.IMG.lookbook[0] },
    { sz: "wide", l: "Christening · Indoors", img: window.IMG.lookbook[1] },
    { sz: "sq",   l: "Detail · Honeycomb", img: window.IMG.lookbook[2] },
    { sz: "sq",   l: "First Birthday", img: window.IMG.lookbook[3] },
    { sz: "tall", l: "Family · At home", img: window.IMG.lookbook[4] },
    { sz: "wide", l: "Bishop · Detail", img: window.IMG.lookbook[5] },
  ];
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>Lookbook</div>
          <h1 className="h-display" style={{ fontSize: 52 }}>Spring · 2026</h1>
          <p className="h-italic" style={{ fontSize: 18, marginTop: 18, color: "var(--charcoal-soft)" }}>Photographed in the soft hours of the morning. The way you'll remember them.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "200px", gap: 12 }}>
          {tiles.map((t, i) => {
            const span = t.sz === "tall" ? { gridRow: "span 2", gridColumn: "span 1" } : t.sz === "wide" ? { gridRow: "span 1", gridColumn: "span 2" } : { gridRow: "span 2", gridColumn: "span 2" };
            return (
              <div key={i} style={{ ...span, position: "relative", overflow: "hidden", cursor: "pointer" }}>
                <FmImage src={t.img} alt={t.l}/>
                <div style={{ position: "absolute", bottom: 16, left: 16, color: "var(--ivory)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.95, zIndex: 2, textShadow: "0 1px 4px rgba(46,41,38,0.6)" }}>{t.l}</div>
              </div>
            );
          })}
        </div>
        <style>{`@media (max-width: 640px) { .page > .wrap > div:nth-child(2) { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; } }`}</style>
      </div>
    </div>
  );
};

// ===================== CART =====================
const CartPage = () => {
  const { cart, ccy } = { ...useShop(), ...useCurrency() };
  const { ccy: c } = useCurrency();
  const items = useShop().cart;
  const subtotal = items.reduce((sum, it) => sum + (PRODUCTS.find(p => p.slug === it.slug)?.priceLKR || 0), 0);
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px", maxWidth: 1080, margin: "0 auto" }}>
        <div className="eyebrow gold" style={{ marginBottom: 12 }}>Your bag</div>
        <h1 className="h-display" style={{ fontSize: 44 }}>Cart</h1>
        {items.length === 0 ? (
          <div style={{ background: "var(--white)", padding: 80, textAlign: "center", marginTop: 32, border: "0.5px solid var(--line)" }}>
            <Icon name="bag" size={32} stroke={1.2}/>
            <h2 className="h-display" style={{ fontSize: 26, marginTop: 16 }}>Your bag is empty</h2>
            <p style={{ color: "var(--charcoal-soft)", marginTop: 8 }}>Each piece is made by hand from organic cotton. Browse the collection to begin.</p>
            <div style={{ marginTop: 28 }}><Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn></div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48, marginTop: 32 }}>
            <div>
              {items.map((it, i) => {
                const p = PRODUCTS.find(p => p.slug === it.slug);
                return (
                  <div key={it.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 20, padding: "24px 0", borderBottom: "0.5px solid var(--line)" }}>
                    <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
                      <FmImage src={window.productImg(it.slug, 0)} alt={p.name}/>
                    </div>
                    <div>
                      <div className="h-display" style={{ fontSize: 19 }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: "var(--dusty-rose)", marginTop: 4 }}>{p.desc}</div>
                      <div style={{ fontSize: 12, marginTop: 12, letterSpacing: "0.08em", color: "var(--charcoal-soft)" }}>SIZE · {it.size}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>{window.fmtPrice(p.priceLKR, c)}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "var(--white)", padding: 32, border: "0.5px solid var(--line)", height: "fit-content", position: "sticky", top: 100 }}>
              <h3 className="eyebrow">Order summary</h3>

              {/* Free-shipping progress — loss aversion + visible incentive */}
              {(() => {
                // Free-shipping threshold in display currency
                const threshold = c === "LKR" ? 43200 : c === "USD" ? 150 : 120; // ≈ £120
                const symbol = c === "LKR" ? "LKR " : c === "USD" ? "$" : "£";
                const subtotalDisp = c === "LKR" ? subtotal : subtotal * window.FILAMOUR_DATA.rates[c];
                const remaining = Math.max(0, threshold - subtotalDisp);
                const pct = Math.min(100, (subtotalDisp / threshold) * 100);
                const fmtAmt = (n) => c === "LKR" ? symbol + Math.round(n).toLocaleString() : symbol + n.toFixed(0);
                return (
                  <div className="ship-nudge">
                    {remaining > 0 ? (
                      <div className="ship-nudge-msg">
                        <Icon name="gift" size={13} stroke={1.6}/>
                        <span>You're <strong>{fmtAmt(remaining)}</strong> away from free worldwide shipping.</span>
                      </div>
                    ) : (
                      <div className="ship-nudge-msg ship-nudge-won">
                        <Icon name="check" size={13} stroke={1.8}/>
                        <span>Free worldwide shipping unlocked.</span>
                      </div>
                    )}
                    <div className="ship-nudge-bar"><div className="ship-nudge-fill" style={{ width: `${pct}%` }}/></div>
                  </div>
                );
              })()}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 14 }}><span>Subtotal</span><span>{window.fmtPrice(subtotal, c)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 14, color: "var(--charcoal-soft)" }}><span>Shipping</span><span>Calculated at checkout</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 16, borderTop: "0.5px solid var(--line)", fontSize: 17 }}><span>Total</span><span>{window.fmtPrice(subtotal, c)}</span></div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                <Btn variant="primary" block onClick={() => navigate("/checkout")}>Continue to checkout</Btn>
                <a href="https://wa.me/447000000000" target="_blank" rel="noopener" className="btn btn-wa btn-block"><Icon name="whatsapp" size={16}/> Checkout via WhatsApp</a>
              </div>

              {/* Trust micro-reassurance under the buttons */}
              <div className="cart-reassure">
                <div><Icon name="heart" size={12} stroke={1.6}/> 14-day returns</div>
                <div><Icon name="gift" size={12} stroke={1.6}/> Handwritten card</div>
                <div><Icon name="check" size={12} stroke={1.6}/> Tracked delivery</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===================== WISHLIST =====================
const WishlistPage = () => {
  const { wishlist } = useShop();
  const items = PRODUCTS.filter(p => wishlist.includes(p.slug));
  return (
    <div className="page">
      <div className="wrap" style={{ padding: "64px 0 96px" }}>
        <div className="eyebrow gold" style={{ marginBottom: 12 }}>Saved</div>
        <h1 className="h-display" style={{ fontSize: 44 }}>Wishlist</h1>
        {items.length === 0 ? (
          <div style={{ background: "var(--white)", padding: 80, textAlign: "center", marginTop: 32, border: "0.5px solid var(--line)" }}>
            <Icon name="heart" size={32} stroke={1.2}/>
            <h2 className="h-display" style={{ fontSize: 26, marginTop: 16 }}>No pieces saved yet</h2>
            <p style={{ color: "var(--charcoal-soft)", marginTop: 8 }}>Tap the heart on any piece to save it for later.</p>
            <div style={{ marginTop: 28 }}><Btn variant="primary" onClick={() => navigate("/shop")}>Browse the collection</Btn></div>
          </div>
        ) : (
          <div className="grid-4" style={{ marginTop: 32 }}>
            {items.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ===================== SIMPLE STUB PAGES =====================
const SimplePage = ({ title, eyebrow, children }) => (
  <div className="page editorial">
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="eyebrow gold" style={{ marginBottom: 12 }}>{eyebrow}</div>
      <h1 className="h-display" style={{ fontSize: 48 }}>{title}</h1>
    </div>
    {children}
  </div>
);

const CareGuidePage = () => (
  <SimplePage eyebrow="Care" title="Caring for your Filamour piece">
    <p className="lead">Organic cotton is tougher than it looks. With small kindnesses, your Filamour piece will outlast its first wearer — and very probably the next.</p>
    <h2>Washing</h2>
    <p>Machine wash cool on a delicate cycle is fine. Use a gentle, fragrance-free detergent. Skip the fabric softener — natural cotton softens on its own, and softeners coat the fibers in a way that dulls them over time. If your washing machine is on the older side, a mesh bag protects the smocking from snagging.</p>
    <h2>Drying</h2>
    <p>Hang to dry, or lay flat on a clean towel — never tumble dry. Heat sets shrinkage and distorts the gathered stitches.</p>
    <h2>Ironing</h2>
    <p>Warm iron on the reverse, avoiding the smocked panel itself. A light steaming brings the drape back without crushing the texture.</p>
    <h2>Storage</h2>
    <p>Fold the smocking face-up, layered with acid-free tissue. Avoid sharp creases through the embroidery, and a sachet of cedar keeps natural fibers fresh.</p>
  </SimplePage>
);

const ShippingPage = () => (
  <SimplePage eyebrow="Shipping & Returns" title="Getting it to you">
    <p className="lead">We ship worldwide. Every order is packaged in our charcoal box with tissue, ribbon, and a handwritten card.</p>
    <h2>United Kingdom</h2>
    <p>Tracked & signed-for delivery via Royal Mail or DHL, from GBP 12. 2–4 working days. Free shipping on orders over GBP 120.</p>
    <h2>Europe</h2>
    <p>Tracked DHL Express, from GBP 35. 3–5 working days. Free shipping on orders over GBP 120.</p>
    <h2>United States, Canada, Australia</h2>
    <p>DHL Express, from GBP 60. 4–7 working days. Free shipping on orders over GBP 120. Local duties are calculated at checkout where applicable.</p>
    <h2>Rest of world</h2>
    <p>EMS tracked, from GBP 60. 7–14 working days. Times exclude the production window for made-to-order pieces.</p>
    <h2>Returns</h2>
    <p>Free returns within 14 days, on unworn pieces with tags attached. Bespoke pieces are not returnable. If anything arrives damaged, send us a photo on WhatsApp within 48 hours and we'll replace it at our cost.</p>
  </SimplePage>
);

const ContactPage = () => (
  <div className="page">
    <div className="wrap" style={{ padding: "64px 0 96px", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="eyebrow gold" style={{ marginBottom: 12 }}>Contact</div>
        <h1 className="h-display" style={{ fontSize: 48 }}>Write to us</h1>
        <p style={{ marginTop: 16, color: "var(--charcoal-soft)" }}>The fastest way to reach the workshop is on WhatsApp. We reply within a working day.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
        <div style={{ padding: 32, background: "var(--white)", border: "0.5px solid var(--line)", textAlign: "center" }}>
          <Icon name="whatsapp" size={28} stroke={1.4}/>
          <div className="eyebrow gold" style={{ marginTop: 14 }}>WhatsApp</div>
          <div className="h-display" style={{ fontSize: 22, marginTop: 6 }}>+94 77 000 0000</div>
          <a href="https://wa.me/447000000000" target="_blank" rel="noopener" className="btn btn-wa" style={{ marginTop: 18 }}>Open chat</a>
        </div>
        <div style={{ padding: 32, background: "var(--white)", border: "0.5px solid var(--line)", textAlign: "center" }}>
          <Icon name="ig" size={28} stroke={1.4}/>
          <div className="eyebrow gold" style={{ marginTop: 14 }}>Instagram</div>
          <div className="h-display" style={{ fontSize: 22, marginTop: 6 }}>@filamour</div>
          <a href="#" className="btn btn-secondary" style={{ marginTop: 18 }}>Follow</a>
        </div>
      </div>
      <form style={{ background: "var(--white)", padding: 32, border: "0.5px solid var(--line)" }} onSubmit={(e) => e.preventDefault()}>
        <h3 className="h-display" style={{ fontSize: 24, marginBottom: 24 }}>Or send a note</h3>
        <div className="bf-grid">
          <Field label="Your name" name="name"/>
          <Field label="Email" name="email" type="email"/>
          <FieldArea label="Message" name="msg"/>
        </div>
        <div style={{ marginTop: 24 }}><Btn variant="primary">Send</Btn></div>
      </form>
    </div>
  </div>
);

Object.assign(window, { GiftGuidePage, BespokePage, SizeGuidePage, FaqPage, LookbookPage, CartPage, WishlistPage, CareGuidePage, ShippingPage, ContactPage });
