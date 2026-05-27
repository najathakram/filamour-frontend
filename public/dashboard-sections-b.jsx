// ===== PAYMENTS =====
const PaymentsSection = () => (
  <>
    <div className="kpi-grid">
      <KPI label="Captured · 30d" value={fmtLKR(1842500)} delta={18.4} spark={[40,42,45,50,48,55,60,62,68,70,74,80]}/>
      <KPI label="Fees paid" value={fmtLKR(54200)} delta={-2.1} spark={[60,58,55,54,52,52,51,50,49,48,47,46]}/>
      <KPI label="Refunded" value={fmtLKR(28700)} delta={1.0} spark={[2,1,0,2,1,1,2,3,2,2,3,3]}/>
      <KPI label="Pending" value={fmtLKR(12000)} delta={0} spark={[8,9,7,8,9,8,9,9,10,9,10,10]}/>
    </div>

    <div className="dash-row">
      <div className="dash-card">
        <div className="dash-card-head">
          <h3>Transactions</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-secondary btn-sm">Filter</button>
            <button className="btn btn-secondary btn-sm">Export</button>
          </div>
        </div>
        <table className="dash-tbl">
          <thead><tr><th>Transaction</th><th>Order</th><th>Method</th><th>Gross</th><th>Fee</th><th>Net</th><th>Status</th></tr></thead>
          <tbody>
            {D.payments.map(p => (
              <tr key={p.id}>
                <td className="mono">{p.id}<div style={{ fontSize: 11, color: "var(--charcoal-soft)", fontFamily: "var(--body)" }}>{p.date}</div></td>
                <td className="mono">{p.order}</td>
                <td>{p.method}</td>
                <td>{fmtLKR(p.gross)}</td>
                <td style={{ color: "var(--charcoal-soft)" }}>{p.fee ? fmtLKR(p.fee) : "—"}</td>
                <td className="strong" style={{ color: p.net < 0 ? "#a85a3f" : "var(--charcoal)" }}>{p.net < 0 ? "-" + fmtLKR(Math.abs(p.net)) : fmtLKR(p.net)}</td>
                <td><StatusPill s={p.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dash-card">
        <div className="dash-card-head"><h3>Payment methods</h3></div>
        <div className="dash-card-body">
          {[
            { name: "Stripe · Card", status: "active", id: "Connected · acct_8K2pq", icon: "check" },
            { name: "PayPal", status: "active", id: "filamour@studio.com", icon: "check" },
            { name: "Bank transfer (Sri Lanka)", status: "active", id: "BOC · ****8203", icon: "check" },
            { name: "Cash on delivery", status: "active", id: "Colombo only", icon: "check" },
            { name: "WhatsApp Pay", status: "available", id: "Not connected", icon: "plus" },
          ].map(m => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", padding: "16px 22px", borderBottom: "0.5px solid var(--line)", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 4, background: "var(--ivory)", border: "0.5px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={m.icon === "check" ? "check" : "plus"} size={14} stroke={1.5}/>
              </div>
              <div style={{ flex: 1 }}>
                <div className="strong" style={{ fontSize: 14 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{m.id}</div>
              </div>
              <StatusPill s={m.status === "active" ? "active" : "info"}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ===== PAYOUTS =====
const PayoutsSection = () => (
  <>
    <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      <div className="kpi">
        <div className="lbl">Next payout</div>
        <div className="val">{fmtLKR(425600)}</div>
        <div style={{ fontSize: 12, marginTop: 8, color: "var(--gold)" }}>Scheduled · 03 Jun 2026</div>
        <div style={{ marginTop: 10 }}><button className="btn btn-primary btn-sm">Payout now</button></div>
      </div>
      <KPI label="Available balance" value={fmtLKR(425600)} delta={0} spark={[120,180,240,310,380,425,425,425,425,425,425,425]}/>
      <KPI label="On hold (3-day)" value={fmtLKR(89000)} delta={0} spark={[40,50,60,70,75,80,82,85,87,88,89,89]}/>
    </div>

    <div className="dash-card">
      <div className="dash-card-head"><h3>Payout history</h3></div>
      <table className="dash-tbl">
        <thead><tr><th>Payout</th><th>Date</th><th>Method</th><th>Destination</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {D.payouts.map(p => (
            <tr key={p.id}>
              <td className="mono strong">{p.id}</td>
              <td style={{ color: "var(--charcoal-soft)" }}>{p.date}</td>
              <td>{p.method}</td>
              <td>{p.to}</td>
              <td className="strong">{fmtLKR(p.amount)}</td>
              <td><StatusPill s={p.status}/></td>
              <td><button className="btn-icon"><Icon name="arrow-right" size={13}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="dash-card" style={{ marginTop: 24 }}>
      <div className="dash-card-head"><h3>Bank account</h3></div>
      <div className="dash-card-body padded">
        <div className="form-grid">
          <div><label className="form-label">Account holder</label><input className="form-input" defaultValue="Filamour (Pvt) Ltd."/></div>
          <div><label className="form-label">Bank</label><select className="form-select"><option>Bank of Ceylon</option><option>Commercial Bank</option><option>HSBC</option></select></div>
          <div><label className="form-label">Account number</label><input className="form-input" defaultValue="•••• •••• 8203"/></div>
          <div><label className="form-label">Branch</label><input className="form-input" defaultValue="Colombo Fort"/></div>
          <div className="span-2"><label className="form-label">Payout schedule</label>
            <div style={{ display: "flex", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, padding: 10, border: "0.5px solid var(--gold)", borderRadius: 4, flex: 1 }}><input type="radio" name="sch" defaultChecked/> Twice monthly · 1st & 15th</label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, padding: 10, border: "0.5px solid var(--line)", borderRadius: 4, flex: 1 }}><input type="radio" name="sch"/> Weekly</label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, padding: 10, border: "0.5px solid var(--line)", borderRadius: 4, flex: 1 }}><input type="radio" name="sch"/> Manual</label>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}><Btn variant="primary">Save bank details</Btn></div>
      </div>
    </div>
  </>
);

// ===== ARTISANS =====
const ArtisansSection = () => {
  const team = ARTISANS.map((a, i) => ({
    ...a,
    queue: [6, 4, 3][i],
    monthRev: [284000, 196000, 142000][i],
    onTime: [98, 96, 100][i],
  }));
  return (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <KPI label="Active artisans" value="3" delta={0} spark={[3,3,3,3,3,3,3,3,3,3,3,3]}/>
        <KPI label="In production" value="13" delta={8.0} spark={[8,9,9,10,10,11,11,12,12,12,13,13]}/>
        <KPI label="Avg on-time" value="98%" delta={1.2} spark={[95,96,96,97,97,97,98,98,98,98,98,98]}/>
        <KPI label="Output · 30d" value="42 pieces" delta={6.0} spark={[24,28,30,32,34,36,38,40,40,41,42,42]}/>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h3>Workshop team</h3>
          <button className="btn btn-primary btn-sm">+ Add artisan</button>
        </div>
        <div className="dash-card-body padded">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {team.map(a => (
              <div key={a.name} style={{ border: "0.5px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ aspectRatio: "5/3", background: "linear-gradient(160deg, var(--blush), var(--dusty-rose))" }}/>
                <div style={{ padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 className="h-display" style={{ fontSize: 24 }}>{a.name}</h3>
                    <span style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{a.years}y</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--charcoal-soft)", marginTop: 8, lineHeight: 1.6, minHeight: 60 }}>{a.story.slice(0, 110)}…</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "0.5px solid var(--line)" }}>
                    <div><div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>Queue</div><div style={{ fontFamily: "var(--display)", fontSize: 20 }}>{a.queue}</div></div>
                    <div><div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>On time</div><div style={{ fontFamily: "var(--display)", fontSize: 20 }}>{a.onTime}%</div></div>
                    <div><div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>30d rev.</div><div style={{ fontFamily: "var(--display)", fontSize: 20 }}>{(a.monthRev/1000).toFixed(0)}k</div></div>
                  </div>
                  <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>View pieces</button>
                    <button className="btn-icon"><Icon name="whatsapp" size={13}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ===== REVIEWS =====
const ReviewsSection = () => (
  <>
    <div className="kpi-grid">
      <KPI label="Avg rating" value="4.9 ★" delta={0.1} spark={[4.7,4.7,4.8,4.8,4.8,4.8,4.9,4.9,4.9,4.9,4.9,4.9]}/>
      <KPI label="Total reviews" value="86" delta={14.0} spark={[60,62,64,68,72,75,78,80,82,84,85,86]}/>
      <KPI label="Pending moderation" value="3" delta={0} spark={[2,3,2,3,3,2,3,2,3,3,3,3]}/>
      <KPI label="Photo reviews" value="42%" delta={4.0} spark={[36,38,38,39,40,40,41,41,42,42,42,42]}/>
    </div>

    <div className="dash-card">
      <div className="dash-card-head">
        <h3>All reviews</h3>
        <div className="seg">
          <button className="active">All</button>
          <button>Pending</button>
          <button>Approved</button>
          <button>Hidden</button>
        </div>
      </div>
      <div className="dash-card-body">
        {D.reviews.map(r => (
          <div key={r.id} style={{ padding: "20px 22px", borderBottom: "0.5px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div className="strong">{r.name}</div>
                  <div style={{ color: "var(--gold)", letterSpacing: "0.06em" }}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                  <StatusPill s={r.status}/>
                </div>
                <div style={{ fontSize: 12, color: "var(--charcoal-soft)", marginBottom: 8 }}>On · <span className="strong" style={{ color: "var(--charcoal)" }}>{r.product}</span></div>
                <div style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 16, color: "var(--charcoal-soft)" }}>"{r.body}"</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {r.status === "pending" && <button className="btn btn-primary btn-sm">Approve</button>}
                <button className="btn btn-secondary btn-sm">Reply</button>
                <button className="btn-icon"><Icon name="x" size={13}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ===== SEO =====
const SeoSection = () => {
  const [page, setPage] = React.useState("/");
  const [data, setData] = React.useState(D.seo);
  const cur = data[page];
  const update = (k, v) => setData({ ...data, [page]: { ...data[page], [k]: v } });

  return (
    <>
      <div className="dash-row">
        <div className="dash-card">
          <div className="dash-card-head"><h3>Page metadata</h3><div className="sub">Edit titles & descriptions used by Google and social</div></div>
          <div className="dash-card-body padded">
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Page</label>
              <select className="form-select" value={page} onChange={e => setPage(e.target.value)}>
                {Object.keys(data).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-grid">
              <div className="span-2">
                <label className="form-label">Meta title</label>
                <input className="form-input" value={cur.title} onChange={e => update("title", e.target.value)} maxLength={70}/>
                <div className="form-counter">{cur.title.length} / 60 recommended</div>
              </div>
              <div className="span-2">
                <label className="form-label">Meta description</label>
                <textarea className="form-text" rows="3" value={cur.description} onChange={e => update("description", e.target.value)} maxLength={170}/>
                <div className="form-counter">{cur.description.length} / 160 recommended</div>
              </div>
              <div className="span-2"><label className="form-label">Canonical URL</label><input className="form-input" value={cur.canonical} onChange={e => update("canonical", e.target.value)}/></div>
              <div className="span-2">
                <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" checked={cur.indexable} onChange={e => update("indexable", e.target.checked)}/>
                  Allow search engines to index this page
                </label>
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}><Btn variant="primary">Save metadata</Btn></div>
          </div>
        </div>

        <div>
          <div className="dash-card">
            <div className="dash-card-head"><h3>Search preview</h3></div>
            <div className="dash-card-body padded">
              <h4 className="eyebrow" style={{ marginBottom: 10 }}>Google</h4>
              <div className="preview-card">
                <div className="url">filamour.com{page === "/" ? "" : " › " + page.slice(1).replace(/\//g, " › ")}</div>
                <div className="ttl">{cur.title}</div>
                <div className="desc">{cur.description}</div>
              </div>

              <h4 className="eyebrow" style={{ marginTop: 20, marginBottom: 10 }}>Open Graph (Instagram, FB)</h4>
              <div style={{ border: "0.5px solid var(--line)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ aspectRatio: "1.91/1", background: "linear-gradient(135deg,#d4c0b5,#c4a49a)" }}/>
                <div style={{ padding: 12, background: "var(--white)" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>FILAMOUR.COM</div>
                  <div style={{ fontWeight: 500, fontSize: 14, marginTop: 2 }}>{cur.title}</div>
                  <div style={{ fontSize: 12, color: "var(--charcoal-soft)", marginTop: 4 }}>{cur.description.slice(0, 80)}…</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-row" style={{ marginTop: 24 }}>
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>Sitemap & robots</h3>
            <a className="link" href="#" style={{ fontSize: 12, borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 2 }}>View sitemap.xml</a>
          </div>
          <div className="dash-card-body padded">
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid var(--line)" }}>
              <span style={{ fontSize: 13 }}>sitemap.xml · auto-generated</span><StatusPill s="active"/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid var(--line)" }}>
              <span style={{ fontSize: 13 }}>robots.txt</span><span style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>Allow all</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid var(--line)" }}>
              <span style={{ fontSize: 13 }}>Google Search Console</span><StatusPill s="active"/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
              <span style={{ fontSize: 13 }}>Schema.org · Product, Organization</span><StatusPill s="active"/>
            </div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head"><h3>Tracking & analytics</h3></div>
          <div className="dash-card-body padded">
            <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div><label className="form-label">Google Analytics ID</label><input className="form-input" defaultValue="G-FM3K9P2QXR"/></div>
              <div><label className="form-label">Meta Pixel ID</label><input className="form-input" placeholder="Optional"/></div>
              <div><label className="form-label">TikTok Pixel</label><input className="form-input" placeholder="Optional"/></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ===== MARKETING =====
const MarketingSection = () => (
  <>
    <div className="kpi-grid">
      <KPI label="Email subscribers" value="2,184" delta={12.0} spark={[1800,1820,1860,1900,1940,1980,2020,2060,2100,2140,2160,2184]}/>
      <KPI label="Promo redemptions · 30d" value="58" delta={22.0} spark={[20,24,28,32,36,40,44,48,50,54,56,58]}/>
      <KPI label="Avg open rate" value="42%" delta={3.4} spark={[36,37,38,38,39,40,40,41,42,42,42,42]}/>
      <KPI label="ROAS · paid" value="4.2×" delta={0.6} spark={[2.8,3.0,3.2,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.1,4.2]}/>
    </div>

    <div className="dash-card">
      <div className="dash-card-head">
        <h3>Promo codes</h3>
        <button className="btn btn-primary btn-sm">+ New code</button>
      </div>
      <table className="dash-tbl">
        <thead><tr><th>Code</th><th>Discount</th><th>Uses</th><th>Limit</th><th>Expires</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {D.discounts.map(d => (
            <tr key={d.code}>
              <td className="mono strong">{d.code}</td>
              <td>{d.off}</td>
              <td>{d.uses}</td>
              <td>{d.limit}</td>
              <td>{d.expires}</td>
              <td><StatusPill s={d.status}/></td>
              <td><button className="btn-icon"><Icon name="chev-right" size={13}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="dash-row" style={{ marginTop: 24 }}>
      <div className="dash-card">
        <div className="dash-card-head"><h3>Site banner</h3></div>
        <div className="dash-card-body padded">
          <div className="form-grid">
            <div className="span-2"><label className="form-label">Banner text</label><input className="form-input" defaultValue="We ship worldwide. International orders from GBP 60. Free shipping over GBP 120."/></div>
            <div><label className="form-label">Link</label><input className="form-input" defaultValue="/shipping"/></div>
            <div><label className="form-label">Background</label><select className="form-select"><option>Blush</option><option>Ivory</option><option>Charcoal</option></select></div>
            <div className="span-2"><label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}><input type="checkbox" defaultChecked/> Show on non-LKR currencies only</label></div>
          </div>
          <div style={{ marginTop: 20, padding: 16, background: "var(--blush)", borderRadius: 4, fontSize: 13, textAlign: "center" }}>We ship worldwide. International orders from GBP 60. Free shipping over GBP 120.</div>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head"><h3>Email campaigns</h3></div>
        <div className="dash-card-body">
          {[
            { t: "Spring 2026 lookbook", st: "sent", d: "20 May", r: "44% opens · 12% click" },
            { t: "New Marguerite restock", st: "sent", d: "12 May", r: "51% opens · 18% click" },
            { t: "Eid collection preview", st: "scheduled", d: "01 Jun", r: "Draft ready" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 22px", borderBottom: "0.5px solid var(--line)", gap: 14, alignItems: "center" }}>
              <div>
                <div className="strong" style={{ fontSize: 14 }}>{c.t}</div>
                <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{c.d} · {c.r}</div>
              </div>
              <StatusPill s={c.st === "sent" ? "success" : "info"}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ===== SETTINGS =====
const SettingsSection = () => {
  const [tab, setTab] = React.useState("store");
  return (
    <div className="dash-card">
      <div className="tabs">
        {[["store","Store"],["shipping","Shipping"],["currencies","Currencies"],["tax","Tax"],["team","Team"],["notifications","Notifications"]].map(([id,l]) => (
          <div key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{l}</div>
        ))}
      </div>
      <div className="dash-card-body padded">
        {tab === "store" && (
          <div className="form-grid">
            <div><label className="form-label">Store name</label><input className="form-input" defaultValue="Filamour"/></div>
            <div><label className="form-label">Tagline</label><input className="form-input" defaultValue="Thread of Love"/></div>
            <div><label className="form-label">Business email</label><input className="form-input" defaultValue="studio@filamour.com"/></div>
            <div><label className="form-label">WhatsApp number</label><input className="form-input" defaultValue="+94 77 000 0000"/></div>
            <div className="span-2"><label className="form-label">Workshop address</label><input className="form-input" defaultValue="14/2 Flower Road, Colombo 07, Sri Lanka"/></div>
            <div className="span-2"><label className="form-label">About (footer)</label><textarea className="form-text" rows="3" defaultValue="Heirloom hand-smocked children's wear, crafted by skilled artisans in Sri Lanka from fine muslin and organic cotton."/></div>
          </div>
        )}
        {tab === "shipping" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
              <h4 className="eyebrow">Shipping zones & rates</h4>
              <button className="btn btn-primary btn-sm">+ Add zone</button>
            </div>
            <table className="dash-tbl" style={{ border: "0.5px solid var(--line)", borderRadius: 4 }}>
              <thead><tr><th>Zone</th><th>Region</th><th>Rate</th><th>Free over</th><th>ETA</th><th></th></tr></thead>
              <tbody>
                {D.shippingZones.map(z => (
                  <tr key={z.id}>
                    <td className="strong">{z.name}</td>
                    <td>{z.region}</td>
                    <td>{z.flat}</td>
                    <td style={{ color: "var(--charcoal-soft)" }}>{z.free}</td>
                    <td>{z.eta}</td>
                    <td><button className="btn-icon"><Icon name="chev-right" size={13}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "currencies" && (
          <div>
            <div className="form-help" style={{ marginBottom: 12 }}>Rates are applied on top of the base LKR price. Set "Auto" to use live FX (refreshes daily).</div>
            <table className="dash-tbl" style={{ border: "0.5px solid var(--line)", borderRadius: 4 }}>
              <thead><tr><th>Currency</th><th>Rate (1 LKR =)</th><th>Display</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td className="strong">LKR · Sri Lankan Rupee</td><td>1.00</td><td>LKR 16,500</td><td><StatusPill s="active"/></td></tr>
                <tr><td className="strong">GBP · Pound Sterling</td><td><input className="form-input" defaultValue="0.00278" style={{ width: 100 }}/></td><td>£46</td><td><StatusPill s="active"/></td></tr>
                <tr><td className="strong">USD · US Dollar</td><td><input className="form-input" defaultValue="0.00339" style={{ width: 100 }}/></td><td>$56</td><td><StatusPill s="active"/></td></tr>
                <tr><td className="strong">EUR · Euro</td><td>—</td><td>—</td><td><StatusPill s="neutral"/></td></tr>
              </tbody>
            </table>
          </div>
        )}
        {tab === "tax" && (
          <div className="form-grid">
            <div className="span-2"><label className="form-label">Tax registration number</label><input className="form-input" defaultValue="VAT-LK-114200382"/></div>
            <div><label className="form-label">Default tax rate</label><input className="form-input" defaultValue="15%"/></div>
            <div><label className="form-label">Display</label><select className="form-select"><option>Tax included in price</option><option>Tax shown at checkout</option></select></div>
          </div>
        )}
        {tab === "team" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
              <h4 className="eyebrow">Team access</h4>
              <button className="btn btn-primary btn-sm">+ Invite member</button>
            </div>
            <table className="dash-tbl" style={{ border: "0.5px solid var(--line)" }}>
              <thead><tr><th>Member</th><th>Email</th><th>Role</th><th>Last active</th></tr></thead>
              <tbody>
                <tr><td className="strong">You · Founder</td><td>studio@filamour.com</td><td><span className="status warn">Owner</span></td><td>Now</td></tr>
                <tr><td className="strong">Maya R.</td><td>maya@filamour.com</td><td><span className="status info">Workshop manager</span></td><td>2h ago</td></tr>
                <tr><td className="strong">Asanka P.</td><td>asanka@filamour.com</td><td><span className="status neutral">Fulfilment</span></td><td>Yesterday</td></tr>
              </tbody>
            </table>
          </div>
        )}
        {tab === "notifications" && (
          <div>
            <h4 className="eyebrow" style={{ marginBottom: 14 }}>Email me when…</h4>
            {[
              ["A new order is placed", true],
              ["A bespoke request comes in", true],
              ["A piece runs low on stock", true],
              ["A customer leaves a review", true],
              ["A payment fails", true],
              ["Daily summary at 9am", false],
            ].map(([l, on]) => (
              <label key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "0.5px solid var(--line)" }}>
                <span style={{ fontSize: 14 }}>{l}</span>
                <span className={`toggle ${on ? "on" : ""}`}/>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { PaymentsSection, PayoutsSection, ArtisansSection, ReviewsSection, SeoSection, MarketingSection, SettingsSection });
