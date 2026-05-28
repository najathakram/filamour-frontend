const { products: PRODUCTS, artisans: ARTISANS, occasions: OCCASIONS } = window.FILAMOUR_DATA;

// ===================== HOMEPAGE =====================
const HomePage = () => {
  const { ccy } = useCurrency();
  const occasionCards = [
    { title: "Christening & Baptism", tag: "Heirloom whites", img: window.IMG.occasion.christening },
    { title: "First Birthday", tag: "Once in a lifetime", img: window.IMG.occasion.birthday },
    { title: "Family Photoshoot", tag: "Made to photograph", img: window.IMG.occasion.photoshoot },
    { title: "Wedding Guest", tag: "Quiet luxury", img: window.IMG.occasion.wedding },
    { title: "New Baby Gift", tag: "For the smallest arrivals", img: window.IMG.occasion.newbaby },
    { title: "Eid & Festive", tag: "Saffron & gold", img: window.IMG.occasion.eid },
  ];

  const heroPiece = PRODUCTS.find(p => p.slug === "marguerite-bishop-dress") || PRODUCTS[0];

  return (
    <div className="page">
      {/* SPLIT HERO: product + benefit + dual CTA */}
      <section className="hero hero-split">
        <div className="wrap hero-split-inner">
          <div className="hero-split-copy">
            <img src="assets/filamour-logo.png" alt="" className="hero-mark"/>
            <div className="eyebrow gold">Filamour</div>
            <h1 className="hero-h1">For the moments<br/>you'll remember,<br/><em>in cloth she can sleep in.</em></h1>
            <p className="hero-sub">Heirloom children's wear in natural cotton, muslin and linen — made by hand, in small batches.</p>
            <div className="hero-cta-row">
              <Btn variant="primary" onClick={() => navigate("/shop")}>Shop the collection</Btn>
              <Btn variant="secondary" onClick={() => navigate("/our-story")}>Read our story</Btn>
            </div>
          </div>
          <div className="hero-split-img">
            <FmImage src={window.productImg(heroPiece.slug, 0)} alt={heroPiece.name}/>
          </div>
        </div>
      </section>

      {/* TRUST BAND — answers question #6 (am I safe to spend) before she scrolls further */}
      <section className="trust-band">
        <div className="wrap trust-band-inner">
          <div className="trust-item"><Icon name="check" size={14} stroke={1.6}/><span>Worldwide shipping · free over £120</span></div>
          <div className="trust-item"><Icon name="gift" size={14} stroke={1.6}/><span>Gift-wrapped with a handwritten card</span></div>
          <div className="trust-item"><Icon name="heart" size={14} stroke={1.6}/><span>14-day no-questions returns</span></div>
          <div className="trust-item"><Icon name="whatsapp" size={14} stroke={1.6}/><span>Reply within a working day on WhatsApp</span></div>
        </div>
      </section>

      {/* OCCASION BAR */}
      <section className="occ-bar">
        <div className="occ-bar-inner">
          {OCCASIONS.map(o => <OccChip key={o.id} occ={o} onClick={() => navigate("/shop")} />)}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="left">
              <h2>New Arrivals</h2>
              <div className="sub">Made in small batches. When they're gone, they're gone.</div>
            </div>
            <a className="view-all" href="#/shop">View all <Icon name="arrow-right" size={14}/></a>
          </div>
          <div className="grid-4">
            {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* MATERIALS STORY */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <div className="artisan-story">
            <div className="artisan-img">
              <FmImage src={window.IMG.artisanWork} alt="Folded organic cotton-muslin"/>
            </div>
            <div className="artisan-copy">
              <div className="eyebrow gold" style={{ marginBottom: 16 }}>The cloth before the cut</div>
              <h2>Natural fibers,<br/>kept simple.</h2>
              <p>Cotton, linen, and muslin — the same family of cloth grandmothers have put against newborn skin for generations. No synthetic blends, no wrinkle-release finishes, no anti-microbial sprays. Just well-made cloth that softens with every wash.</p>
              <div className="artisan-tag">Natural fiber · gentle dyes · no added finishes</div>
              <div><a className="link" href="#/materials">How we think about fabric <Icon name="arrow-right" size={12}/></a></div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="left">
              <h2>Shop by Occasion</h2>
              <div className="sub">Pieces made for the moments that matter</div>
            </div>
          </div>
          <div className="occ-grid">
            {occasionCards.map(o => (
              <div key={o.title} className="occ-card" onClick={() => navigate("/shop")}>
                <FmImage src={o.img} alt={o.title}/>
                <div className="label">
                  <div>{o.title}</div>
                  <span className="eyebrow">{o.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROMISE */}
      <section className="promise">
        <div className="wrap">
          <div className="promise-grid">
            <div className="promise-col">
              <div className="icon"><Icon name="needle" size={32} stroke={1.2} /></div>
              <h3>Handcrafted</h3>
              <p>Every stitch placed by hand. Every piece checked before it leaves our workshop.</p>
            </div>
            <div className="promise-col">
              <div className="icon"><Icon name="leaf" size={32} stroke={1.2} /></div>
              <h3>Premium Materials</h3>
              <p>Organic cotton and fine muslin, chosen for softness against small skin.</p>
            </div>
            <div className="promise-col">
              <div className="icon"><Icon name="heart" size={32} stroke={1.2} /></div>
              <h3>Made with Love</h3>
              <p>Each piece carries the story of the hands that made it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL BAND — single anchor quote with country signal */}
      <section className="home-testi">
        <div className="wrap home-testi-inner">
          <div className="eyebrow gold" style={{ marginBottom: 14 }}>From mothers, in their own words</div>
          <blockquote>
            <span className="quote-mark">"</span>
            It came out of the box softer than I expected, and a year later it's softer still. It looks better now than the day it arrived.
          </blockquote>
          <figcaption>— Hannah · London · The Marguerite, a year on</figcaption>
          <div className="home-testi-meta">Shipped to 14 countries · 4.9 average rating · returning customers since 2024</div>
        </div>
      </section>

      {/* AS WORN — replaces empty IG grid with product shots until real UGC arrives */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="left">
              <h2>As worn by little ones</h2>
              <div className="sub">Customer photos · share yours @filamour</div>
            </div>
            <a className="view-all" href="#">Follow on Instagram <Icon name="ig" size={14}/></a>
          </div>
          <div className="ig-grid">
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <div key={p.slug} className="ig-tile" onClick={() => navigate(`/product/${p.slug}`)} style={{ cursor: "pointer" }}>
                <FmImage src={window.productImg(p.slug, i % 2)} alt={p.name}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ===================== SHOP PAGE =====================
const ShopPage = () => {
  const [sizes, setSizes] = React.useState([]);
  const [occs, setOccs] = React.useState([]);
  const [avail, setAvail] = React.useState("all");
  const [sort, setSort] = React.useState("Newest");

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  let filtered = PRODUCTS;
  if (sizes.length) filtered = filtered.filter(p => p.sizes.some(s => sizes.includes(s)));
  if (occs.length) filtered = filtered.filter(p => occs.includes(p.occasion));
  if (avail === "ready") filtered = filtered.filter(p => p.avail.type === "ready");
  if (avail === "made") filtered = filtered.filter(p => p.avail.type === "made");
  if (sort === "Price Low-High") filtered = [...filtered].sort((a,b) => a.priceLKR - b.priceLKR);
  if (sort === "Price High-Low") filtered = [...filtered].sort((a,b) => b.priceLKR - a.priceLKR);

  const clearAll = () => { setSizes([]); setOccs([]); setAvail("all"); };
  const activeCount = sizes.length + occs.length + (avail !== "all" ? 1 : 0);

  return (
    <div className="page">
      <div className="wrap">
        <div className="shop-head">
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>The Collection</div>
          <h1>Shop</h1>
          <div className="sub">Made by hand, in small batches</div>
        </div>

        <div className="shop-layout">
          <aside className="shop-filters">
            {activeCount > 0 && (
              <div style={{ marginBottom: 8 }}>
                <button className="filter-clear" onClick={clearAll}>Clear all filters</button>
              </div>
            )}
            <FilterGroup title="Size" open>
              <div className="filter-options">
                {["NB","3M","6M","12M","18M","24M","2T","3T","4T","5T"].map(s => (
                  <label key={s}><input type="checkbox" checked={sizes.includes(s)} onChange={() => toggle(sizes, setSizes, s)}/> {s}</label>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup title="Occasion" open>
              <div className="filter-options">
                {["Christening & Baptism","First Birthday","Family Photoshoot","Wedding Guest","New Baby Gift","Everyday Luxury","Eid & Festive"].map(o => (
                  <label key={o}><input type="checkbox" checked={occs.includes(o)} onChange={() => toggle(occs, setOccs, o)}/> {o}</label>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup title="Availability" open>
              <div className="filter-options">
                {[["all","All"],["ready","Ready to Ship"],["made","Made to Order"]].map(([v,l]) => (
                  <label key={v}><input type="radio" name="avail" checked={avail===v} onChange={() => setAvail(v)}/> {l}</label>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup title="Price">
              <div style={{ fontSize: 13, color: "var(--charcoal-soft)", marginTop: 8 }}>LKR 0 — LKR 25,000</div>
              <input type="range" min="0" max="25000" defaultValue="25000" style={{ width: "100%", marginTop: 12, accentColor: "var(--charcoal)" }}/>
            </FilterGroup>
          </aside>

          <div>
            <div className="shop-toolbar">
              <div className="count">Showing {filtered.length} of {PRODUCTS.length} pieces</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button className="mob-filter-btn"><Icon name="filter" size={14}/> Filter & Sort</button>
                <select className="shop-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Newest</option>
                  <option>Best Sellers</option>
                  <option>Price Low-High</option>
                  <option>Price High-Low</option>
                </select>
              </div>
            </div>
            {activeCount > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {sizes.map(s => <ActiveChip key={s} label={`Size ${s}`} onClear={() => toggle(sizes, setSizes, s)} />)}
                {occs.map(o => <ActiveChip key={o} label={o} onClear={() => toggle(occs, setOccs, o)} />)}
                {avail !== "all" && <ActiveChip label={avail === "ready" ? "Ready to Ship" : "Made to Order"} onClear={() => setAvail("all")} />}
              </div>
            )}
            <div className="grid-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {filtered.map(p => <ProductCard key={p.slug} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 80, color: "var(--charcoal-soft)" }}>
                <div className="h-italic" style={{ fontSize: 22 }}>No pieces match those filters yet.</div>
                <button className="filter-clear" style={{ marginTop: 16 }} onClick={clearAll}>Clear filters</button>
              </div>
            )}
            <div className="load-more-wrap">
              <Btn variant="secondary">Load more</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ title, children, open: o0 = false }) => {
  const [open, setOpen] = React.useState(o0);
  return (
    <div className="filter-group">
      <h5 onClick={() => setOpen(!open)}>{title}<Icon name="chev-down" size={12} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }} stroke={1.6}/></h5>
      {open && children}
    </div>
  );
};

const ActiveChip = ({ label, onClear }) => (
  <button className="chip" style={{ padding: "6px 10px 6px 14px", fontSize: 12 }} onClick={onClear}>
    {label} <Icon name="x" size={10} stroke={1.8}/>
  </button>
);

Object.assign(window, { HomePage, ShopPage, FilterGroup, ActiveChip });
