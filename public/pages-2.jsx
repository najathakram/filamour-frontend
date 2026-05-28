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
                <p><strong>Fabric:</strong> 100% GOTS-certified organic cotton-muslin, double-layered through the bodice for shape and softness. <strong>Closure:</strong> three covered buttons at the back, sized large enough for adult fingers in a hurry. <strong>Care:</strong> machine wash cool on a delicate cycle, hang to dry, warm iron if you like. It will be softer in three months than the day it arrived.</p>
                <p><strong>Availability:</strong> {product.avail.type === "ready" ? "in stock, ships within 2 working days." : `made to order — ${product.avail.days} working days, then shipped.`}</p>
              </AccordItem>
              <AccordItem id="materials" open={accord} onToggle={setAccord} title="Why this fabric, for your baby">
                <p><strong>GOTS-certified organic cotton.</strong> Grown without pesticides — important, because conventional cotton is one of the most chemically-treated crops on earth, and traces of those chemicals can linger in the fibers that sit against your baby's skin.</p>
                <p><strong>A loose, breathable weave.</strong> Air moves through it, so your baby doesn't overheat. Synthetic blends (polyester, acrylic) trap heat against the body and can leave the skin clammy after an hour of wear. Muslin does the opposite — it cools as it breathes.</p>
                <p><strong>Softer with every wash.</strong> Natural cotton softens; synthetics pill and roughen. The piece you buy today will feel kinder against the skin in six months than it did when it arrived.</p>
                <p><strong>What you won't find:</strong> optical brighteners, formaldehyde finishes, azo dyes, or anti-wrinkle treatments. <a href="#/materials" className="link">More on our materials →</a></p>
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
    <p>We make every Filamour piece from one of two fabrics. <strong>GOTS-certified organic cotton-muslin</strong> for the warmth of summer and the layers of every other season — breathable, light, gentler with every wash. <strong>Heavyweight organic cotton</strong> for our pinafores, jackets, and the structured pieces. That's the whole list. No polyester blends, no chemical "easy-care" finishes, no surprises against the skin.</p>
    <h2>The promise</h2>
    <p>Every piece is checked twice — once at the sewing table, once by a person whose only job that day is to make sure nothing leaves with a loose thread, a rough seam, or a button that wouldn't survive a determined two-year-old. Then it's folded, wrapped, and sent. That is what luxury for babies should actually mean: not a price tag, but a fabric you'd be glad to find against your own skin.</p>
    <div style={{ textAlign: "center", marginTop: 64 }}>
      <Btn variant="primary" onClick={() => navigate("/materials")}>Read more on our materials</Btn>
    </div>
  </div>
);

// ===================== MATERIALS =====================
const MaterialsPage = () => {
  const used = [
    {
      title: "GOTS-certified organic cotton",
      cert: "GOTS · OEKO-TEX Standard 100",
      use: "Our day dresses, sets, layettes, pinafores.",
      why: "Grown without synthetic pesticides, processed without chlorine bleach or formaldehyde finishes. The full chain — field, mill, dye-house — is audited, so what reaches your baby is the cotton, and only the cotton.",
      feel: "Soft from the first wash, softer after the tenth. Holds shape, breathes, and doesn't pill the way blends do.",
    },
    {
      title: "Fine cotton-muslin",
      cert: "Organic · loose-weave · undyed or low-impact dyed",
      use: "Our bishop dresses, rompers, summer pieces.",
      why: "Loose-woven, so air moves through it. A baby's body temperature rises and falls faster than yours — they need something that breathes, not something that traps heat against the skin.",
      feel: "Barely-there weight, drapes like a whisper, gets softer every time it's washed. The fabric your grandmother put against newborn skin, for good reason.",
    },
  ];

  const avoided = [
    { name: "Polyester, acrylic, nylon blends", reason: "Plastic-based fibers. Trap heat against the body, shed microplastics in the wash, can leave skin clammy and irritated after an hour of wear. Common in fast-fashion baby clothes." },
    { name: "Conventional (non-organic) cotton", reason: "One of the most pesticide-treated crops in the world. Residues can remain in the fibers — not what you want against thin newborn skin." },
    { name: "Bamboo viscose / rayon", reason: "Marketed as natural; chemically processed into fiber using sodium hydroxide and carbon disulfide. The finished thread is technically a regenerated cellulose, not a plant fiber. We don't use it." },
    { name: "Anti-wrinkle, easy-care, stain-release finishes", reason: "Usually formaldehyde-based or PFC-based. Designed to make laundry easy for adults; not designed for what sits against a baby's face when they sleep." },
    { name: "Optical brighteners and azo dyes", reason: "Brighteners make whites look extra-white by reflecting UV. Some azo dyes break down into compounds you really don't want in skin contact. Common in mass-market children's wear, banned in the EU at certain levels, never used in ours." },
  ];

  return (
    <div className="page">
      <div className="wrap" style={{ padding: "72px 0 96px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto 64px", textAlign: "center" }}>
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>The Materials</div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 52, lineHeight: 1.1 }}>What's against the skin matters</h1>
          <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontWeight: 300, fontSize: 20, marginTop: 20, color: "var(--charcoal-soft)" }}>A baby's skin is up to 30% thinner than yours. It absorbs more. It reacts faster. We chose Filamour's two fabrics with that in mind — and ruled almost everything else out.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, marginBottom: 88 }}>
          {used.map((m, i) => (
            <div key={m.title} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center", background: "var(--white)", padding: 48 }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <FmImage src={window.IMG.artisanPortraits[i] || window.IMG.artisanWork} alt={m.title}/>
              </div>
              <div>
                <div className="eyebrow gold">What we use no. 0{i+1}</div>
                <h2 style={{ fontFamily: "var(--display)", fontWeight: 400, fontSize: 38, marginTop: 8 }}>{m.title}</h2>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginTop: 8 }}>{m.cert}</div>
                <p style={{ marginTop: 24 }}><strong>Where you'll find it:</strong> {m.use}</p>
                <p style={{ marginTop: 12 }}><strong>Why we chose it:</strong> {m.why}</p>
                <p style={{ marginTop: 12 }}><strong>How it feels:</strong> {m.feel}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 880, margin: "0 auto", background: "var(--white)", padding: "56px 48px" }}>
          <div className="eyebrow gold" style={{ marginBottom: 16, textAlign: "center" }}>What you won't find in a Filamour piece</div>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 36, textAlign: "center", lineHeight: 1.15 }}>The list of things we ruled out is longer than the list of things we use</h2>
          <div style={{ marginTop: 48, display: "grid", gap: 28 }}>
            {avoided.map(a => (
              <div key={a.name} style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, paddingBottom: 24, borderBottom: "0.5px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--charcoal)" }}>{a.name}</div>
                <div style={{ color: "var(--charcoal-soft)", lineHeight: 1.7 }}>{a.reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 780, margin: "72px auto 0", textAlign: "center" }}>
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>How we check</div>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 36, lineHeight: 1.15 }}>Every batch, every piece, every seam</h2>
          <p style={{ marginTop: 20, color: "var(--charcoal-soft)", lineHeight: 1.8 }}>Each new batch of fabric is washed at 40°C and inspected for shrinkage, colour hold, and how it feels against the inside of the wrist after a full 24 hours. Every finished piece is felt for seam roughness before it's folded. We'd rather scrap a piece than ship one we wouldn't put on a baby we love.</p>
          <div style={{ marginTop: 40 }}>
            <Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ProductPage, OurStoryPage, MaterialsPage, AccordItem });
