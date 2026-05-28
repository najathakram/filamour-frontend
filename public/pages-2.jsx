// ===================== PRODUCT PAGE =====================
const ProductPage = ({ slug }) => {
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const { ccy } = useCurrency();
  const { addToCart, toggleWish, wishlist } = useShop();
  const [activeImg, setActiveImg] = React.useState(0);
  const [size, setSize] = React.useState(product.sizes.find(s => !product.oos.includes(s)) || product.sizes[0]);
  const [accord, setAccord] = React.useState("piece");
  const [gift, setGift] = React.useState(false);
  const [giftMsg, setGiftMsg] = React.useState("");
  const saved = wishlist.includes(product.slug);

  const onAdd = () => addToCart(product.slug, size);
  const waMsg = encodeURIComponent(`Hi, I would like to order a ${product.name} in size ${size}. Can you confirm availability and payment details? Thank you.`);

  const related = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="page">
      <div className="wrap prod-page">
        <div className="crumb">
          <a href="#/">Home</a><span className="sep">/</span>
          <a href="#/shop">Shop</a><span className="sep">/</span>
          <a href="#/shop">{product.category}</a><span className="sep">/</span>
          <span>{product.name}</span>
        </div>

        <div className="prod-layout">
          {/* Gallery */}
          <div className="prod-gallery">
            <div className="prod-thumbs">
              {[0,1,2,3].map(i => (
                <div key={i} className={`prod-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                  <FmImage src={window.productImg(product.slug, i)} alt={`${product.name} view ${i+1}`}/>
                </div>
              ))}
            </div>
            <div className="prod-main-img">
              <FmImage src={window.productImg(product.slug, activeImg)} alt={product.name}/>
            </div>
          </div>

          {/* Info */}
          <div className="prod-info">
            <h1>{product.name}</h1>
            <div className="gold-rule"/>
            <div className="prod-price">{window.fmtPrice(product.priceLKR, ccy)}</div>
            <div className={`avail-badge ${product.avail.type === "ready" ? "ready" : "made"}`}>
              {product.avail.type === "ready" ? "Ready to ship" : `Made to order · ${product.avail.days} working days`}
            </div>

            <div className="prod-section">
              <div className="prod-section-label">
                <span>Select size</span>
                <a className="link" href="#/size-guide">Size guide</a>
              </div>
              <div className="size-row">
                {product.sizes.map(s => (
                  <button key={s} className={`size-pill ${size === s ? "active" : ""} ${product.oos.includes(s) ? "oos" : ""}`} onClick={() => !product.oos.includes(s) && setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="prod-actions">
              <Btn variant="primary" block onClick={onAdd}>Add to cart · {window.fmtPrice(product.priceLKR, ccy)}</Btn>
              <Btn variant="secondary" block onClick={() => toggleWish(product.slug)}>
                <Icon name={saved ? "heart-fill" : "heart"} size={15}/> {saved ? "Saved to wishlist" : "Add to wishlist"}
              </Btn>
              <a href={`https://wa.me/447000000000?text=${waMsg}`} target="_blank" rel="noopener" className="btn btn-wa btn-block">
                <Icon name="whatsapp" size={16}/> Order via WhatsApp
              </a>
            </div>

            <div className="accord">
              <AccordItem id="piece" open={accord} onToggle={setAccord} title="The Piece">
                <p>A softly-gathered bishop silhouette cut from cotton-muslin, with a high yoke that sits gently above the collarbones and never pulls. The smocked panel gives at the chest as your baby breathes — no waistband, no elastic dig.</p>
                <p><strong>Fabric:</strong> 100% organic cotton-muslin, double-layered through the bodice for shape and softness. <strong>Closure:</strong> three covered buttons at the back, sized large enough for adult fingers in a hurry. <strong>Care:</strong> machine wash cool on a delicate cycle, hang to dry, warm iron if you like. It will be softer in three months than the day it arrived.</p>
                <p><strong>Availability:</strong> {product.avail.type === "ready" ? "in stock, ships within 2 working days." : `made to order — ${product.avail.days} working days, then shipped.`}</p>
              </AccordItem>
              <AccordItem id="materials" open={accord} onToggle={setAccord} title="The cloth, and why it feels the way it does">
                <p><strong>Natural fiber, kept pure.</strong> Cotton, muslin, linen — no synthetic blends. Pure cotton wears in beautifully, drapes against a small body, and breathes. Blended fabrics do the opposite: they stiffen, trap heat, and rub.</p>
                <p><strong>Soft, getting softer.</strong> The first wash takes off the loom finish. The next ten teach the fabric what it wants to be. By the time your child has worn it through a season, it'll feel kinder than it did the day it arrived.</p>
                <p><strong>No added chemistry.</strong> We skip wrinkle-release sprays, stain-shields, and anti-microbial finishes. These coat the cloth in things designed for an adult's laundry basket — not for what sits against a baby's face when they sleep.</p>
                <p><a href="#/materials" className="link">How we think about fabric →</a></p>
              </AccordItem>
              <AccordItem id="delivery" open={accord} onToggle={setAccord} title="Delivery & Returns">
                <p><strong>Worldwide shipping</strong> with tracked, signed-for delivery. UK & EU: 3-5 days via DHL. North America: 4-7 days via DHL. Rest of world: 7-14 days via EMS.</p>
                <p><strong>Returns:</strong> free returns within 14 days if unworn, with tags attached. We want you to be sure.</p>
                <p><strong>Gift orders:</strong> we'll never include a receipt or price. Just the piece, the card, and the wrapping.</p>
              </AccordItem>
            </div>

            <div className="gift-wrap">
              <div className="head">
                <h5><Icon name="gift" size={16} stroke={1.4}/> Gift this piece</h5>
                <button className={`toggle ${gift ? "on" : ""}`} onClick={() => setGift(!gift)} aria-label="Toggle gift wrap"/>
              </div>
              {gift && (
                <>
                  <textarea placeholder="A short message for the recipient…" value={giftMsg} onChange={(e) => setGiftMsg(e.target.value)}/>
                  <div className="note">Your message will be handwritten on a Filamour card.</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        <section style={{ marginTop: 96 }}>
          <div className="section-head">
            <div className="left">
              <h2 style={{ fontSize: 32 }}>You may also like</h2>
            </div>
          </div>
          <div className="grid-4">
            {related.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        </section>

        {/* As worn */}
        <section style={{ marginTop: 96 }}>
          <div className="section-head">
            <div className="left">
              <h2 style={{ fontSize: 32 }}>As worn</h2>
              <div className="sub">Shared with permission · @filamour</div>
            </div>
          </div>
          <div className="grid-4">
            {[0,1,2,3].map(i => (
              <div key={i}>
                <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                  <FmImage src={window.IMG.ig[i]} alt="Customer photo"/>
                </div>
                <div style={{ fontSize: 11, color: "var(--dusty-rose)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10 }}>Shared with permission</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const AccordItem = ({ id, open, onToggle, title, children }) => {
  const isOpen = open === id;
  return (
    <div className="accord-item">
      <button className={`accord-trigger ${isOpen ? "open" : ""}`} onClick={() => onToggle(isOpen ? null : id)}>
        <span>{title}</span>
        <span className="chev"><Icon name="chev-down" size={14} stroke={1.6}/></span>
      </button>
      <div className={`accord-content ${isOpen ? "open" : ""}`}>{children}</div>
    </div>
  );
};

// ===================== OUR STORY =====================
const OurStoryPage = () => (
  <div className="page editorial">
    <div className="editorial-hero">
      <FmImage src={window.IMG.ourStoryHero} alt="Filamour piece, softly folded"/>
      <h1>For the way they should feel</h1>
    </div>
    <div className="eyebrow gold" style={{ marginBottom: 12 }}>Our Story</div>
    <p className="lead">Filamour began the night a new mother held up two baby dresses in a high street shop and realised one was a glossy-finish polyester and the other had been sprayed with a wrinkle-release chemical. Neither was going on her daughter.</p>
    <h2>Why we exist</h2>
    <p>Babies wear what we give them. They can't tell us the synthetic blend is making them sweat, or that the seam is rubbing the back of the neck raw, or that the "soft cotton" hangtag was attached to a fabric chemically treated with a finish you wouldn't put on your own pillow. We started Filamour because the people making the smallest, most-loved clothes deserve the most honest fabric and the most careful sewing.</p>
    <h2>What we obsess over</h2>
    <p>The hand of the fabric. The drape on a small body. How a seam sits behind the knee when your baby is sitting on the floor. Whether the natural cotton came from a field that was sprayed with something that shouldn't be against newborn skin. Whether the dye held in the wash. Whether the buttons are sewn on tightly enough that you'll never find one in a mouth.</p>
    <div className="fullwidth-img"><FmImage src={window.IMG.artisanPortraits[1]} alt="Soft cotton-muslin, folded"/></div>
    <h2>The materials, only two</h2>
    <p>We make every Filamour piece from a small family of natural fibers — organic cotton, muslin, and linen. Light, breathable cloth for summer and layering; heavier weights for pinafores and jackets. No synthetic blends, no chemical wrinkle-release or stain-shield finishes, no surprises against the skin.</p>
    <h2>The promise</h2>
    <p>Every piece is checked twice — once at the sewing table, once by a person whose only job that day is to make sure nothing leaves with a loose thread, a rough seam, or a button that wouldn't survive a determined two-year-old. Then it's folded, wrapped, and sent. That is what luxury for babies should actually mean: not a price tag, but a fabric you'd be glad to find against your own skin.</p>
    <div style={{ textAlign: "center", marginTop: 64 }}>
      <Btn variant="primary" onClick={() => navigate("/materials")}>Read more on our materials</Btn>
    </div>
  </div>
);

// ===================== MATERIALS =====================
const MaterialsPage = () => {
  const principles = [
    {
      n: "01",
      h: "Natural fibers, kept simple",
      p: "Cotton, linen, and muslin — the same family of cloth grandmothers have put against newborn skin for generations. Soft from the start, softer after every wash. Nothing about the way it's woven is clever. It's just made well.",
    },
    {
      n: "02",
      h: "No synthetic blends",
      p: "Pure cotton wears in, drapes, and breathes. A cotton-polyester blend does the opposite — it stiffens, traps heat, and rubs. We don't blend natural with synthetic, ever. If a piece feels right against the back of your hand, that's why.",
    },
    {
      n: "03",
      h: "No finishes a baby doesn't need",
      p: "We skip the wrinkle-release, the stain-shield, the anti-microbial sprays. Those are chemistries designed to make life easier for the wash basket. They don't make life better for the skin underneath.",
    },
    {
      n: "04",
      h: "A quiet palette",
      p: "Ivory, blush, dusty rose, charcoal, saffron, sage. Tones that come from gentle dyeing, not from aggressive bleaching or high-intensity pigment. They wash kindly, age beautifully, and photograph the way you'll remember the day.",
    },
  ];

  return (
    <div className="page">
      <div className="wrap" style={{ padding: "72px 0 96px" }}>
        {/* HERO */}
        <div style={{ maxWidth: 720, margin: "0 auto 80px", textAlign: "center" }}>
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>The Materials</div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.01em" }}>The cloth before the cut</h1>
          <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontWeight: 300, fontSize: 21, marginTop: 24, color: "var(--charcoal-soft)", lineHeight: 1.5 }}>The way a piece feels in your child's hand, and against their skin all day, comes from the fabric long before it comes from the pattern.</p>
        </div>

        {/* HOW IT FEELS */}
        <div style={{ maxWidth: 760, margin: "0 auto 88px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 24, lineHeight: 1.55, color: "var(--charcoal)" }}>The first thing you'll notice, taking a Filamour piece out of the wrapping, is the hand of the cloth — a little weighty, a little cool, with the easy give that only natural fiber has. A wash or two and it softens further. A year of wear and it's the dress your child reaches for.</p>
        </div>

        {/* PRINCIPLES */}
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
          {principles.map(p => (
            <div key={p.n} style={{ background: "var(--white)", padding: "44px 40px", borderTop: "0.5px solid var(--gold)" }}>
              <div style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 14, letterSpacing: "0.2em", color: "var(--gold)" }}>{p.n}</div>
              <h2 style={{ fontFamily: "var(--display)", fontWeight: 400, fontSize: 28, marginTop: 14, lineHeight: 1.2 }}>{p.h}</h2>
              <p style={{ marginTop: 18, color: "var(--charcoal-soft)", lineHeight: 1.8 }}>{p.p}</p>
            </div>
          ))}
        </div>

        {/* CARE NOTE */}
        <div style={{ maxWidth: 760, margin: "88px auto 0", padding: "48px 40px", borderTop: "0.5px solid var(--line)", borderBottom: "0.5px solid var(--line)", textAlign: "center" }}>
          <div className="eyebrow gold" style={{ marginBottom: 14 }}>Caring for it</div>
          <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontWeight: 300, fontSize: 20, color: "var(--charcoal-soft)", lineHeight: 1.6 }}>Wash cool, skip the fabric softener, dry flat or on the line. Natural cotton looks after itself if you let it.</p>
          <a href="#/care-guide" className="link" style={{ display: "inline-block", marginTop: 18, fontSize: 13, letterSpacing: "0.08em", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 3 }}>Full care guide →</a>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 72 }}>
          <Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ProductPage, OurStoryPage, MaterialsPage, AccordItem });
