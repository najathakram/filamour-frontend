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
            <p className="prod-poetic">{product.desc}.</p>
            <div className="gold-rule"/>
            <div className="prod-price">{window.fmtPrice(product.priceLKR, ccy)}</div>
            <div className={`avail-badge ${product.avail.type === "ready" ? "ready" : "made"}`}>
              {product.avail.type === "ready" ? "Ready to ship · within 2 working days" : `Made to order · yours in ${product.avail.days} working days`}
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

            {/* Trust icons — answers "what if it's wrong?" right next to the buy button */}
            <div className="prod-trust">
              <div className="prod-trust-item"><Icon name="check" size={14} stroke={1.6}/><span>Free worldwide shipping over £120</span></div>
              <div className="prod-trust-item"><Icon name="gift" size={14} stroke={1.6}/><span>Wrapped with a handwritten card</span></div>
              <div className="prod-trust-item"><Icon name="heart" size={14} stroke={1.6}/><span>14-day no-questions returns</span></div>
            </div>

            {/* One-line customer reassurance — answers "is this real?" */}
            <blockquote className="prod-quote">
              <span className="qm">"</span>
              Came out of the box softer than I expected. A year on, it's softer still.
              <cite>— Hannah, London</cite>
            </blockquote>

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

    {/* Founder pull-quote, up top — answers question #1 (is this for me) in three seconds */}
    <div className="founder-pull">
      <p className="founder-pull-quote">"If I won't put it on Mira, it doesn't leave the studio."</p>
      <div className="founder-pull-by">Gaika · Founder of Filamour, mother of Mira (3)</div>
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
  const swatches = [
    { name: "Ivory",      hex: "#F5EFE6" },
    { name: "Blush",      hex: "#E8D5CE" },
    { name: "Dusty Rose", hex: "#C4A49A" },
    { name: "Charcoal",   hex: "#2E2926" },
    { name: "Saffron",    hex: "#B8924A" },
    { name: "Sage",       hex: "#A8B0A0" },
  ];

  const uses = [
    { name: "Cotton",  body: "Long-staple, gently woven. The kind that softens with washing instead of giving up." },
    { name: "Muslin",  body: "Open-weave, breathable, the lightest thing we can put against a small chest in summer." },
    { name: "Linen",   body: "For gift sets and warmer-weather pieces. Honest, sturdy, ages into something better." },
  ];

  const avoid = [
    { name: "Synthetic blends",         body: "They feel different at the second wash. We keep the cloth to its own kind." },
    { name: "Wrinkle-release finishes", body: "A chemistry we won't put against newborn skin to save you an iron." },
    { name: "Aggressive bleaching",     body: "We let the natural shades stand. Ivory is ivory, not paper-white." },
  ];

  return (
    <div className="page mat-page">
      {/* 1. EDITORIAL HERO */}
      <section className="mat-hero">
        <div className="wrap mat-hero-inner">
          <div className="mat-hero-copy">
            <div className="eyebrow gold">The Materials</div>
            <h1>The cloth<br/>before the cut.</h1>
            <p>A piece feels like something in a child's hand before it comes from the pattern. So we start there — with what touches the skin, and how it behaves the morning after.</p>
          </div>
          <div className="mat-hero-img">
            <FmImage src="assets/img/macro-muslin.png" alt="Cotton-muslin, macro"/>
          </div>
        </div>
      </section>

      {/* 2. FULL-BLEED FABRIC */}
      <section className="mat-bleed">
        <FmImage src="assets/img/fabric-bleed.png" alt="Stacked cotton-muslin"/>
      </section>
      <div className="wrap"><figcaption className="mat-caption">Organic cotton-muslin. The cloth that has gone against newborn skin for generations, for good reason.</figcaption></div>

      {/* 3. WHAT WE USE / WHAT WE WON'T */}
      <section className="section mat-two-up">
        <div className="wrap">
          <div className="mat-two-grid">
            <div>
              <div className="eyebrow gold" style={{ marginBottom: 16 }}>What we use</div>
              <h2 className="h-display mat-h2">A short list, kept short.</h2>
              <div className="mat-list">
                {uses.map(u => (
                  <div className="mat-item" key={u.name}>
                    <div className="mat-item-name">{u.name}</div>
                    <p>{u.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--dusty-rose)", marginBottom: 16 }}>What we won't</div>
              <h2 className="h-display mat-h2">An equally short list.</h2>
              <div className="mat-list">
                {avoid.map(a => (
                  <div className="mat-item mat-item-no" key={a.name}>
                    <div className="mat-item-name">{a.name}</div>
                    <p>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PALETTE */}
      <section className="section mat-palette-section">
        <div className="wrap">
          <div className="mat-palette-head">
            <div className="eyebrow gold">A quiet palette</div>
            <h2 className="h-display mat-h2-center">Six shades. We keep to them.</h2>
          </div>
          <div className="mat-palette">
            {swatches.map(s => (
              <div className="mat-swatch" key={s.name}>
                <div className="mat-chip" style={{ background: s.hex, borderColor: s.hex === "#F5EFE6" ? "var(--line)" : "transparent" }}/>
                <div className="mat-swatch-name">{s.name}</div>
                <div className="mat-swatch-hex">{s.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOUNDER NOTE */}
      <section className="section mat-founder">
        <div className="wrap">
          <div className="mat-founder-inner">
            <div className="eyebrow gold">A note from the founder</div>
            <p className="mat-founder-quote">
              I started Filamour the year my daughter was born, because I couldn't find what I wanted to put on her. The rule has stayed the same since: if I won't put it on Mira, it doesn't leave the studio. Everything else follows from that.
            </p>
            <svg className="mat-sig" viewBox="0 0 220 70" aria-hidden="true">
              <path d="M10,45 C18,18 32,18 38,38 C42,52 30,58 26,50 C22,42 36,38 50,46 C66,55 80,30 92,30 C104,30 100,52 88,52 C76,52 84,30 100,30 C120,30 116,52 132,50 C148,48 144,30 158,30 C172,30 170,55 184,50 C198,46 200,30 212,30" stroke="var(--charcoal)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            <div className="mat-founder-name">Gaika · Founder</div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL */}
      <section className="section mat-testimonial">
        <div className="wrap">
          <figure>
            <blockquote className="mat-quote">
              <span className="mat-quote-mark">"</span>It came out of the box softer than I expected, and a year later it's softer still. Mine has been worn for a christening and washed a dozen times since. It looks better now than it did the day it arrived.
            </blockquote>
            <figcaption>— Hannah, London. The Marguerite, a year on.</figcaption>
          </figure>
        </div>
      </section>

      {/* 7. AS IT ARRIVES / AS IT'S WORN */}
      <section className="section mat-aspair">
        <div className="wrap">
          <div className="mat-pair-grid">
            <figure className="mat-pair-fig">
              <div className="mat-pair-img">
                <FmImage src="assets/img/piece-aslay.png" alt="The Marguerite, laid out"/>
              </div>
              <figcaption>As it's worn.</figcaption>
            </figure>
            <figure className="mat-pair-fig">
              <div className="mat-pair-img">
                <FmImage src="assets/img/folded-stack.png" alt="The Marguerite, folded"/>
              </div>
              <figcaption>As it arrives.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 8. SOFT CTA */}
      <section className="section mat-cta">
        <div className="wrap" style={{ textAlign: "center" }}>
          <Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { ProductPage, OurStoryPage, MaterialsPage, AccordItem });
