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
  const artisan = ARTISANS.find(a => a.name === product.artisan);

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
              <a href={`https://wa.me/94770000000?text=${waMsg}`} target="_blank" rel="noopener" className="btn btn-wa btn-block">
                <Icon name="whatsapp" size={16}/> Order via WhatsApp
              </a>
            </div>

            <div className="accord">
              <AccordItem id="piece" open={accord} onToggle={setAccord} title="The Piece">
                <p>A hand-smocked bishop dress, cut from soft cotton-muslin with a high yoke and gathered fullness through the body. The smocking panel uses a honeycomb and cable stitch combination, worked entirely by hand over four hours.</p>
                <p><strong>Fabric:</strong> 100% organic cotton-muslin, double-layered through the bodice. <strong>Closure:</strong> three covered buttons at the back. <strong>Care:</strong> hand wash in cool water, lay flat to dry, iron on low.</p>
                <p><strong>Production time:</strong> {product.avail.type === "ready" ? "in stock, ships in 2 working days" : `${product.avail.days} working days from order`}.</p>
              </AccordItem>
              <AccordItem id="artisan" open={accord} onToggle={setAccord} title={`Made by ${product.artisan}`}>
                <div className="artisan-mini">
                  <div className="avatar"/>
                  <div>
                    <div className="name">{artisan?.name}</div>
                    <div className="yr">{artisan?.years} years of the craft</div>
                  </div>
                </div>
                <p style={{ marginTop: 16 }}>{artisan?.story}</p>
                <a href="#/artisans" className="link" style={{ display: "inline-block", marginTop: 8, fontSize: 13, letterSpacing: "0.08em", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 2 }}>Meet all our artisans</a>
              </AccordItem>
              <AccordItem id="delivery" open={accord} onToggle={setAccord} title="Delivery & Returns">
                <p><strong>Sri Lanka:</strong> 2-3 working days in Colombo. Cash on delivery available.</p>
                <p><strong>International:</strong> 7-14 days via EMS, 3-5 days via DHL. Tracked, signed-for shipping.</p>
                <p><strong>Returns:</strong> free returns within 7 days if unworn, with tags attached.</p>
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
      <FmImage src={window.IMG.ourStoryHero} alt="Filamour workshop"/>
      <h1>A story made by hand</h1>
    </div>
    <div className="eyebrow gold" style={{ marginBottom: 12 }}>Our Story</div>
    <p className="lead">Filamour began with a simple question: why is it so hard to find truly beautiful, honestly-made clothing for the smallest people?</p>
    <h2>Why Filamour exists</h2>
    <p>Our founder spent her first months as a new mother searching for garments that felt right — pieces with the softness of muslin, the structure of a proper bishop dress, the quiet beauty of work done by hand. What she found instead was mass-produced sameness, dressed up in the language of luxury.</p>
    <p>So she walked the hill country of Sri Lanka, where her grandmother had learned smocking decades before, and found the artisans who still kept the craft alive. Filamour is built on their hands, their patience, and their patterns.</p>
    <h2>The craft</h2>
    <p>Hand smocking is a centuries-old technique. A row of pleats is gathered into the cloth, then embroidered through by hand, stitch by stitch, in patterns named after the things they resemble — honeycomb, wave, cable, diamond. A finished bishop yoke can take three hours of careful work.</p>
    <div className="fullwidth-img"><FmImage src={window.IMG.artisanPortraits[1]} alt="Smocking detail"/></div>
    <h2>The materials</h2>
    <p>We work with two fabrics only: fine cotton-muslin, woven for breathability and the way it falls; and certified organic cotton, chosen for what it doesn't carry. Both are sourced from family mills, dyed without azo compounds, and tested for what's against the skin.</p>
    <h2>The promise</h2>
    <p>Every Filamour piece is made by someone whose name we know, in a workshop we visit each week. The garment that arrives at your door has been touched, checked, folded, and wrapped by people who care that it is right. That, we think, is what luxury actually means.</p>
    <div style={{ textAlign: "center", marginTop: 64 }}>
      <Btn variant="primary" onClick={() => navigate("/artisans")}>Meet the artisans who make every piece</Btn>
    </div>
  </div>
);

// ===================== ARTISANS =====================
const ArtisansPage = () => (
  <div className="page">
    <div className="wrap artisans-page">
      <div className="artisans-intro">
        <div className="eyebrow gold" style={{ marginBottom: 16 }}>The Workshop</div>
        <h1>The hands behind every piece</h1>
        <p>Our artisans have practiced the craft of hand smocking for decades. Each garment carries their skill and their story.</p>
      </div>

      {ARTISANS.map((a, i) => (
        <div key={a.name} className={`artisan-card ${i % 2 === 1 ? "flip" : ""}`}>
          <div className="portrait">
            <FmImage src={window.IMG.artisanPortraits[i]} alt={`Portrait of ${a.name}`}/>
          </div>
          <div className="artisan-detail">
            <div className="eyebrow gold">Artisan no. 0{i+1}</div>
            <h2 style={{ marginTop: 8 }}>{a.name}</h2>
            <div className="years">{a.years} years of the craft</div>
            <p>{a.story}</p>
            <a className="link" href="#/shop">See her pieces →</a>
          </div>
        </div>
      ))}

      <div style={{ background: "var(--white)", padding: "64px 48px", textAlign: "center", marginTop: 32 }}>
        <div className="eyebrow gold" style={{ marginBottom: 16 }}>Watch the craft</div>
        <h2 className="h-display" style={{ fontSize: 36 }}>Three hours of hand work, in three minutes</h2>
        <div style={{ aspectRatio: "16/9", maxWidth: 900, margin: "40px auto 0", background: "linear-gradient(135deg, #5a4a3c, #2e2926)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ivory)", position: "relative" }}>
          <button style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(245,239,230,0.95)", color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="play" size={26}/>
          </button>
          <div style={{ position: "absolute", bottom: 20, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6 }}>Video · Artisan hand smocking close-up</div>
        </div>
        <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 19, marginTop: 28, color: "var(--charcoal-soft)" }}>Every dress takes three hours of hand work.</p>
      </div>
    </div>
  </div>
);

Object.assign(window, { ProductPage, OurStoryPage, ArtisansPage, AccordItem });
