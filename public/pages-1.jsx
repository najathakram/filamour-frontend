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

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <FmImage src={window.IMG.hero} alt="Filamour hero" warm={false} className="hero-bg-img"/>
        <div className="hero-content">
          <img src="assets/filamour-logo.png" alt="Filamour" style={{ width: 110, height: 110, objectFit: "contain", margin: "0 auto 20px", display: "block", mixBlendMode: "screen", opacity: 0.95 }}/>
          <h1>Filamour</h1>
          <div className="gold-line"></div>
          <div className="tagline">Thread of Love</div>
          <div className="hero-cta" style={{ marginTop: 36 }}>
            <Btn variant="ghost" onClick={() => navigate("/shop")}>Shop the Collection</Btn>
          </div>
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
              <div className="sub">The latest from our artisans</div>
            </div>
            <a className="view-all" href="#/shop">View all <Icon name="arrow-right" size={14}/></a>
          </div>
          <div className="grid-4">
            {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* ARTISAN STORY */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <div className="artisan-story">
            <div className="artisan-img">
              <FmImage src={window.IMG.artisanWork} alt="Artisan at work"/>
            </div>
            <div className="artisan-copy">
              <div className="eyebrow gold" style={{ marginBottom: 16 }}>The Craft</div>
              <h2>Made by hand.<br/>Made with love.</h2>
              <p>Every Filamour garment is hand-smocked by a skilled artisan in our workshop in Sri Lanka. Each row of stitching is placed by hand. Each fabric is chosen for how it feels against small skin.</p>
              <div className="artisan-tag">Crafted by Kamala · 22 years of the craft</div>
              <div><a className="link" href="#/artisans">Meet our artisans <Icon name="arrow-right" size={12}/></a></div>
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

      {/* INSTAGRAM */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="left">
              <h2>As worn by little ones</h2>
              <div className="sub">@filamour on Instagram</div>
            </div>
            <a className="view-all" href="#">Follow <Icon name="ig" size={14}/></a>
          </div>
          <div className="ig-grid">
            {window.IMG.ig.map((src, i) => (
              <div key={i} className="ig-tile"><FmImage src={src} alt={`Customer photo ${i+1}`}/></div>
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
          <div className="sub">Hand-smocked pieces, made in small batches</div>
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
