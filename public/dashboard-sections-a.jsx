// ===== ORDERS =====
const OrdersSection = () => {
  const [tab, setTab] = React.useState("all");
  const [selected, setSelected] = React.useState(null);
  const filtered = tab === "all" ? D.orders : D.orders.filter(o => o.status === tab);
  return (
    <>
      <div className="dash-card">
        <div className="tabs">
          {[
            ["all", "All", D.orders.length],
            ["pending", "Pending", D.orders.filter(o => o.status === "pending").length],
            ["processing", "Processing", D.orders.filter(o => o.status === "processing").length],
            ["production", "In production", D.orders.filter(o => o.status === "production").length],
            ["shipped", "Shipped", D.orders.filter(o => o.status === "shipped").length],
            ["delivered", "Delivered", D.orders.filter(o => o.status === "delivered").length],
            ["cancelled", "Cancelled", D.orders.filter(o => o.status === "cancelled").length],
          ].map(([id, l, n]) => (
            <div key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{l} <span style={{ color: "var(--charcoal-soft)", marginLeft: 6 }}>{n}</span></div>
          ))}
        </div>
        <div className="dash-card-head" style={{ borderBottom: "none" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="dash-pill"><Icon name="filter" size={11}/> Filters</div>
            <div className="dash-pill">Date · Last 30 days</div>
            <div className="dash-pill">Status · All</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-secondary btn-sm">Export CSV</button>
            <button className="btn btn-primary btn-sm">+ Create order</button>
          </div>
        </div>
        <div className="dash-card-body" style={{ padding: 0 }}>
          <table className="dash-tbl">
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox"/></th>
                <th>Order</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} onClick={() => setSelected(o)} style={{ cursor: "pointer" }}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox"/></td>
                  <td className="mono strong">{o.id}</td>
                  <td style={{ color: "var(--charcoal-soft)" }}>{o.date}</td>
                  <td><div>{o.customer}</div><div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{o.maker || o.artisan}</div></td>
                  <td>{o.items}</td>
                  <td>{fmtLKR(o.total)}</td>
                  <td>{o.method}</td>
                  <td><StatusPill s={o.status}/></td>
                  <td><Icon name="chev-right" size={14}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selected && <OrderDrawer order={selected} onClose={() => setSelected(null)}/>}
    </>
  );
};

const OrderDrawer = ({ order, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" style={{ maxWidth: 720 }} onClick={e => e.stopPropagation()}>
      <div className="modal-head">
        <div>
          <h2>Order {order.id}</h2>
          <div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>{order.date} · {order.customer}</div>
        </div>
        <button onClick={onClose}><Icon name="x" size={18}/></button>
      </div>
      <div className="modal-body">
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <StatusPill s={order.status}/>
          <div className="dash-pill">{order.method}</div>
          <div className="dash-pill">Maker · {order.maker || order.artisan}</div>
        </div>

        <h4 className="eyebrow" style={{ marginBottom: 12 }}>Items</h4>
        <div style={{ border: "0.5px solid var(--line)", borderRadius: 4 }}>
          {Array.from({ length: order.items }).map((_, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 14, padding: 14, alignItems: "center", borderBottom: i < order.items - 1 ? "0.5px solid var(--line)" : "none" }}>
              <div style={{ aspectRatio: "3/4", background: "linear-gradient(160deg,#efe1d8,#c4a49a)" }}/>
              <div>
                <div style={{ fontFamily: "var(--display)", fontSize: 16 }}>{["Marguerite Bishop Dress", "Floret Romper", "Linen Bloomer Gift Set"][i % 3]}</div>
                <div style={{ fontSize: 11, color: "var(--charcoal-soft)", marginTop: 2 }}>Size · {["12M","6M","NB"][i % 3]} · Qty 1</div>
              </div>
              <div style={{ fontSize: 13 }}>{fmtLKR(order.total / order.items)}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          <div>
            <h4 className="eyebrow" style={{ marginBottom: 8 }}>Shipping</h4>
            <div style={{ fontSize: 13, color: "var(--charcoal-soft)", lineHeight: 1.7 }}>
              {order.customer}<br/>
              42 Westbourne Grove<br/>
              London W11<br/>
              United Kingdom
            </div>
          </div>
          <div>
            <h4 className="eyebrow" style={{ marginBottom: 8 }}>Summary</h4>
            <div style={{ fontSize: 13 }}>
              <Row k="Subtotal" v={fmtLKR(order.total - 800)}/>
              <Row k="Shipping" v="LKR 800"/>
              <div style={{ borderTop: "0.5px solid var(--line)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 400 }}><span>Total</span><span>{fmtLKR(order.total)}</span></div>
            </div>
          </div>
        </div>

        <h4 className="eyebrow" style={{ marginTop: 28, marginBottom: 12 }}>Timeline</h4>
        <div style={{ borderLeft: "0.5px solid var(--gold)", paddingLeft: 16 }}>
          {[
            ["Order placed", order.date, true],
            ["Payment captured", order.date, true],
            ["Assigned to " + (order.maker || order.artisan), order.date, order.status !== "pending"],
            ["Production complete", "—", ["shipped","delivered"].includes(order.status)],
            ["Shipped via DHL", "—", ["shipped","delivered"].includes(order.status)],
            ["Delivered", "—", order.status === "delivered"],
          ].map(([t, d, done], i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "6px 0", fontSize: 13, color: done ? "var(--charcoal)" : "var(--charcoal-soft)" }}>
              <Icon name={done ? "check" : "chev-right"} size={14} stroke={1.6}/>
              <div style={{ flex: 1 }}>{t}</div>
              <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn btn-secondary btn-sm">Print invoice</button>
        <button className="btn btn-secondary btn-sm">Refund</button>
        <button className="btn btn-primary btn-sm">Mark shipped</button>
      </div>
    </div>
  </div>
);

// ===== BESPOKE =====
const BespokeSection = () => (
  <div className="dash-card">
    <div className="dash-card-head">
      <div><h3>Bespoke queue</h3><div className="sub">Custom orders awaiting quote, production, or shipment</div></div>
      <button className="btn btn-primary btn-sm">+ Add manually</button>
    </div>
    <table className="dash-tbl">
      <thead><tr><th>Request</th><th>Customer</th><th>Child</th><th>Occasion</th><th>Need by</th><th>Status</th><th></th></tr></thead>
      <tbody>
        {D.bespokeRequests.map(r => (
          <tr key={r.id}>
            <td className="mono strong">{r.id}<div style={{ fontSize: 11, color: "var(--charcoal-soft)", fontFamily: "var(--body)" }}>{r.date}</div></td>
            <td>{r.customer}</td>
            <td>{r.child}</td>
            <td>{r.occasion}</td>
            <td>{r.needBy}</td>
            <td><StatusPill s={r.status}/></td>
            <td style={{ display: "flex", gap: 4 }}>
              <button className="btn-icon" title="Open WhatsApp"><Icon name="whatsapp" size={13}/></button>
              <button className="btn-icon"><Icon name="chev-right" size={13}/></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ===== PRODUCTS =====
const ProductsSection = () => {
  const [edit, setEdit] = React.useState(null);
  const [products, setProducts] = React.useState(PRODUCTS);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="dash-pill"><Icon name="check" size={11}/> {products.length} pieces</div>
          <div className="dash-pill">Active · 7</div>
          <div className="dash-pill">Draft · 1</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary btn-sm">Import</button>
          <button className="btn btn-primary btn-sm" onClick={() => setEdit({ name: "", priceLKR: 0, sizes: [], category: "Dresses" })}>+ New product</button>
        </div>
      </div>

      <div className="dash-card">
        <table className="dash-tbl">
          <thead>
            <tr>
              <th style={{ width: 32 }}><input type="checkbox"/></th>
              <th>Piece</th><th>Category</th><th>Maker</th><th>Price</th><th>Sizes</th><th>Stock</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.slug} onClick={() => setEdit(p)} style={{ cursor: "pointer" }}>
                <td onClick={e => e.stopPropagation()}><input type="checkbox"/></td>
                <td>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 48, background: "linear-gradient(160deg,#efe1d8,#c4a49a)" }}/>
                    <div>
                      <div className="strong">{p.name}</div>
                      <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>SKU · {p.slug.toUpperCase().slice(0, 12)}</div>
                    </div>
                  </div>
                </td>
                <td>{p.category}</td>
                <td>{p.maker || p.artisan}</td>
                <td>{fmtLKR(p.priceLKR)}</td>
                <td style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{p.sizes.join(", ")}</td>
                <td>{p.avail.type === "ready" ? <span className="status success">In stock</span> : <span className="status warn">Made to order</span>}</td>
                <td>{p.badge ? <span className="dash-pill" style={{ background: "var(--ivory)", color: "var(--gold)" }}>{p.badge}</span> : <span style={{ color: "var(--charcoal-soft)", fontSize: 12 }}>—</span>}</td>
                <td><Icon name="chev-right" size={14}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {edit && <ProductEditor product={edit} onClose={() => setEdit(null)}/>}
    </>
  );
};

const ProductEditor = ({ product, onClose }) => {
  const [tab, setTab] = React.useState("details");
  const isNew = !product.slug;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 880 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>{isNew ? "New product" : product.name}</h2>
            <div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>{isNew ? "Add a new piece to the catalogue" : `SKU · ${product.slug?.toUpperCase()}`}</div>
          </div>
          <button onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="tabs" style={{ padding: "0 24px" }}>
          {["details","photos","pricing","inventory","seo"].map(t => (
            <div key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ textTransform: "capitalize" }}>{t}</div>
          ))}
        </div>
        <div className="modal-body">
          {tab === "details" && (
            <div className="form-grid">
              <div className="span-2"><label className="form-label">Name</label><input className="form-input" defaultValue={product.name}/></div>
              <div className="span-2"><label className="form-label">Short description</label><input className="form-input" defaultValue={product.desc}/></div>
              <div className="span-2"><label className="form-label">Full description</label><textarea className="form-text" rows="4" defaultValue="A softly-gathered bishop dress cut from natural cotton-muslin, with a high yoke that sits gently above the collarbones and gives at the chest as your baby breathes."/></div>
              <div><label className="form-label">Category</label><select className="form-select" defaultValue={product.category}><option>Dresses</option><option>Rompers</option><option>Sets</option><option>Tops</option><option>Gift Sets</option></select></div>
              <div><label className="form-label">Occasion</label><select className="form-select" defaultValue={product.occasion}><option>Christening & Baptism</option><option>First Birthday</option><option>Family Photoshoot</option><option>Everyday Luxury</option></select></div>
              <div><label className="form-label">Assigned maker</label><select className="form-select" defaultValue={product.maker || product.artisan}>{D.customers && ["Studio 01","Studio 02","Studio 03"].map(a => <option key={a}>{a}</option>)}</select></div>
              <div><label className="form-label">Badge</label><select className="form-select" defaultValue={product.badge || ""}><option value="">— None —</option><option>New</option><option>Bestseller</option><option>Limited</option><option>Signature</option></select></div>
            </div>
          )}
          {tab === "photos" && (
            <div>
              <div className="form-help" style={{ marginBottom: 12 }}>Recommended · 1500×2000px, soft natural light, ivory or muslin backdrops.</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <div className="dash-img-tile" style={{ background: "linear-gradient(160deg,#efe1d8,#c4a49a)", color: "rgba(46,41,38,0.5)" }}>Front</div>
                <div className="dash-img-tile" style={{ background: "linear-gradient(160deg,#e6cfc1,#c4a49a)", color: "rgba(46,41,38,0.5)" }}>Detail</div>
                <div className="dash-img-tile" style={{ background: "linear-gradient(160deg,#ecdcd2,#cba8a0)", color: "rgba(46,41,38,0.5)" }}>Back</div>
                <div className="dash-img-tile add">+ Add photo</div>
              </div>
            </div>
          )}
          {tab === "pricing" && (
            <div className="form-grid">
              <div><label className="form-label">Price · LKR</label><input className="form-input" type="number" defaultValue={product.priceLKR}/></div>
              <div><label className="form-label">Compare-at price</label><input className="form-input" type="number" placeholder="Optional"/></div>
              <div><label className="form-label">Cost per item</label><input className="form-input" type="number" defaultValue="6800"/><div className="form-help">For margin reporting only — not shown to customers.</div></div>
              <div><label className="form-label">Margin</label><input className="form-input" disabled value="58.8% · LKR 9,700"/></div>
              <div className="span-2"><label className="form-label">Tax class</label><select className="form-select"><option>Standard · 15%</option><option>Reduced · 8%</option><option>Exempt</option></select></div>
            </div>
          )}
          {tab === "inventory" && (
            <div>
              <div className="form-grid" style={{ marginBottom: 20 }}>
                <div><label className="form-label">Availability</label><select className="form-select" defaultValue={product.avail?.type}><option value="ready">Ready to ship</option><option value="made">Made to order</option></select></div>
                <div><label className="form-label">Production days (made-to-order)</label><input className="form-input" type="number" defaultValue={product.avail?.days || 10}/></div>
              </div>
              <h4 className="eyebrow" style={{ marginBottom: 12 }}>Stock per size</h4>
              <table className="dash-tbl" style={{ border: "0.5px solid var(--line)", borderRadius: 4 }}>
                <thead><tr><th>Size</th><th>SKU</th><th>In stock</th><th>Low-stock alert</th></tr></thead>
                <tbody>
                  {(product.sizes || ["NB","3M","6M","12M","18M"]).map(s => (
                    <tr key={s}>
                      <td className="strong">{s}</td>
                      <td className="mono">{product.slug?.toUpperCase().slice(0,8) || "NEW"}-{s}</td>
                      <td><input className="form-input" type="number" defaultValue={Math.floor(Math.random()*8)} style={{ width: 80 }}/></td>
                      <td><input className="form-input" type="number" defaultValue="2" style={{ width: 80 }}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "seo" && (
            <div>
              <div className="form-grid">
                <div className="span-2"><label className="form-label">Meta title</label><input className="form-input" defaultValue={`${product.name} · Filamour`} maxLength={60}/><div className="form-counter">0 / 60</div></div>
                <div className="span-2"><label className="form-label">Meta description</label><textarea className="form-text" rows="3" maxLength={160} defaultValue={`${product.desc}. Natural fiber, made by hand.`}/><div className="form-counter">0 / 160</div></div>
                <div className="span-2"><label className="form-label">URL handle</label><input className="form-input" defaultValue={`/product/${product.slug || "new-piece"}`}/></div>
              </div>
              <h4 className="eyebrow" style={{ marginTop: 20, marginBottom: 10 }}>Google preview</h4>
              <div className="preview-card">
                <div className="url">filamour.com › product › {product.slug || "new-piece"}</div>
                <div className="ttl">{product.name || "New piece"} · Filamour</div>
                <div className="desc">{product.desc || "A new Filamour piece."}. Natural fiber, made by hand.</div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-foot">
          {!isNew && <button className="btn btn-secondary btn-sm" style={{ color: "#a85a3f", borderColor: "#a85a3f", marginRight: "auto" }}>Archive</button>}
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Save {isNew ? "& publish" : "changes"}</button>
        </div>
      </div>
    </div>
  );
};

// ===== CUSTOMERS =====
const CustomersSection = () => (
  <>
    <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
      <KPI label="Customers" value="384" delta={8.2} spark={[12,14,16,18,20,22,24,28,32,30,36,42]}/>
      <KPI label="VIP & loyal" value="58" delta={12.0} spark={[4,5,6,6,7,8,9,10,11,12,13,14]}/>
      <KPI label="New · 30d" value="42" delta={-3.2} spark={[6,5,4,5,4,3,4,5,4,5,4,4]}/>
      <KPI label="Repeat rate" value="38%" delta={2.4} spark={[34,35,35,36,36,37,37,37,38,38,38,38]}/>
    </div>
    <div className="dash-card">
      <div className="dash-card-head">
        <h3>All customers</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">Email segment</button>
        </div>
      </div>
      <table className="dash-tbl">
        <thead><tr><th>Name</th><th>Email</th><th>Country</th><th>Orders</th><th>Lifetime value</th><th>Tier</th></tr></thead>
        <tbody>
          {D.customers.map(c => (
            <tr key={c.id}>
              <td>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--blush), var(--dusty-rose))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontSize: 14 }}>{c.name[0]}</div>
                  <div className="strong">{c.name}</div>
                </div>
              </td>
              <td style={{ color: "var(--charcoal-soft)" }}>{c.email}</td>
              <td>{c.country}</td>
              <td>{c.orders}</td>
              <td>{fmtLKR(c.spent)}</td>
              <td><span className={`status ${c.tier === "VIP" ? "warn" : c.tier === "Loyal" ? "success" : c.tier === "New" ? "info" : "neutral"}`}>{c.tier}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

Object.assign(window, { OrdersSection, BespokeSection, ProductsSection, ProductEditor, CustomersSection, OrderDrawer });
