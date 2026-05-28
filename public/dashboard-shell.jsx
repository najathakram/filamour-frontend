const D = window.DASH_DATA;
const fmtLKR = (n) => "LKR " + Math.round(n).toLocaleString();

// ===== SECTIONS REGISTRY (split across files) =====
const DASH_SECTIONS = [
  { group: "Trade", items: [
    { id: "overview",   label: "Overview",  icon: "sun" },
    { id: "orders",     label: "Orders",    icon: "bag",    badge: 4 },
    { id: "bespoke",    label: "Bespoke",   icon: "needle", badge: 2 },
    { id: "products",   label: "Products",  icon: "flower" },
    { id: "customers",  label: "Customers", icon: "heart" },
  ]},
  { group: "Money", items: [
    { id: "payments",   label: "Payments",  icon: "check" },
    { id: "payouts",    label: "Payouts",   icon: "arrow-right" },
  ]},
  { group: "Production", items: [
    { id: "artisans",   label: "Makers",    icon: "leaf" },
    { id: "reviews",    label: "Reviews",   icon: "star" },
  ]},
  { group: "Storefront", items: [
    { id: "seo",        label: "SEO & Meta",icon: "search" },
    { id: "marketing",  label: "Marketing", icon: "gift" },
    { id: "settings",   label: "Settings",  icon: "filter" },
  ]},
];

// ===== Shell =====
const Dashboard = ({ route }) => {
  const seg = route.split("/")[2] || "overview";
  const setSeg = (id) => navigate("/dashboard/" + id);
  return (
    <div className="dash-shell" data-screen-label="Dashboard">
      <DashSide active={seg} onPick={setSeg}/>
      <div className="dash-main">
        <DashHeader seg={seg}/>
        <div className="dash-body">
          <DashSection seg={seg}/>
        </div>
      </div>
    </div>
  );
};

const DashSide = ({ active, onPick }) => (
  <aside className="dash-side">
    <div className="dash-brand">
      <a href="#/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="assets/filamour-logo.png" alt="" style={{ width: 38, height: 38, objectFit: "contain", mixBlendMode: "screen", opacity: 0.9, flexShrink: 0 }}/>
        <div>
          <div className="wm">Filamour</div>
          <div className="role">Seller dashboard</div>
        </div>
      </a>
    </div>
    <nav className="dash-nav">
      {DASH_SECTIONS.map(g => (
        <div className="dash-nav-group" key={g.group}>
          <h6>{g.group}</h6>
          {g.items.map(it => (
            <div key={it.id} className={`dash-nav-item ${active === it.id ? "active" : ""}`} onClick={() => onPick(it.id)}>
              <Icon name={it.icon} size={16} stroke={1.4}/>
              <span>{it.label}</span>
              {it.badge && <span className="badge">{it.badge}</span>}
            </div>
          ))}
        </div>
      ))}
    </nav>
    <div className="dash-side-foot">
      <div className="dash-user">
        <div className="avatar">F</div>
        <div className="info">
          <div className="nm">Filamour Studio</div>
          <div className="em">studio@filamour.com</div>
        </div>
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <a href="#/" className="dash-pill" style={{ background: "rgba(245,239,230,0.06)", color: "var(--ivory)", borderColor: "rgba(245,239,230,0.18)" }}>View store ↗</a>
      </div>
    </div>
  </aside>
);

const SECTION_TITLES = {
  overview: { t: "Overview", s: "Tuesday, 26 May 2026 · last 30 days" },
  orders: { t: "Orders", s: "Manage fulfilment, status and shipments" },
  bespoke: { t: "Bespoke requests", s: "Custom orders queue" },
  products: { t: "Products", s: "Catalogue, stock, photography" },
  customers: { t: "Customers", s: "Buyers, loyalty and segments" },
  payments: { t: "Payments", s: "Transactions, fees, refunds" },
  payouts: { t: "Payouts", s: "Transfers to your bank account" },
  artisans: { t: "Makers", s: "Production team and assignments" },
  reviews: { t: "Reviews", s: "Customer feedback moderation" },
  seo: { t: "SEO & Metadata", s: "Search, social previews, sitemap" },
  marketing: { t: "Marketing", s: "Promo codes, banners, email" },
  settings: { t: "Settings", s: "Shipping, currency, store info" },
};

const DashHeader = ({ seg }) => {
  const meta = SECTION_TITLES[seg] || SECTION_TITLES.overview;
  return (
    <div className="dash-header">
      <div>
        <h1>{meta.t}</h1>
        <div className="sub">{meta.s}</div>
      </div>
      <div className="dash-header-actions">
        <div className="dash-search">
          <Icon name="search" size={14} stroke={1.5}/>
          <input placeholder="Search orders, customers, SKUs…"/>
          <span className="kbd">⌘K</span>
        </div>
        <button className="btn-icon" aria-label="Notifications" style={{ position: "relative" }}>
          <Icon name="heart" size={14} stroke={1.4}/>
          <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, background: "var(--gold)", borderRadius: "50%" }}/>
        </button>
        <button className="btn btn-primary btn-sm">+ New product</button>
      </div>
    </div>
  );
};

const DashSection = ({ seg }) => {
  switch (seg) {
    case "overview":  return <Overview/>;
    case "orders":    return <OrdersSection/>;
    case "bespoke":   return <BespokeSection/>;
    case "products":  return <ProductsSection/>;
    case "customers": return <CustomersSection/>;
    case "payments":  return <PaymentsSection/>;
    case "payouts":   return <PayoutsSection/>;
    case "artisans":  return <ArtisansSection/>;
    case "reviews":   return <ReviewsSection/>;
    case "seo":       return <SeoSection/>;
    case "marketing": return <MarketingSection/>;
    case "settings":  return <SettingsSection/>;
    default: return <Overview/>;
  }
};

// ===== KPI sparkline =====
const Sparkline = ({ data, w = 100, h = 28, color = "var(--gold)" }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return [x, y];
  });
  const d = "M " + pts.map(([x,y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
  return (
    <svg width={w} height={h} className="spark">
      <path d={d} stroke={color} strokeWidth="1.4" fill="none"/>
      <path d={d + ` L ${w} ${h} L 0 ${h} Z`} fill={color} opacity="0.08"/>
    </svg>
  );
};

const KPI = ({ label, value, delta, spark }) => (
  <div className="kpi">
    <div className="lbl">{label}</div>
    <div className="val">{value}</div>
    <div className={`delta ${delta >= 0 ? "up" : "down"}`}>
      {delta >= 0 ? "↑" : "↓"} {Math.abs(delta).toFixed(1)}% <span style={{ color: "var(--charcoal-soft)", marginLeft: 4 }}>vs prev 30d</span>
    </div>
    {spark && <Sparkline data={spark}/>}
  </div>
);

// ===== OVERVIEW =====
const Overview = () => {
  const k = D.kpis;
  return (
    <>
      <div className="kpi-grid">
        <KPI label="Revenue · 30d" value={fmtLKR(k.revenue.value)} delta={k.revenue.delta} spark={k.revenue.spark}/>
        <KPI label="Orders · 30d" value={k.orders.value} delta={k.orders.delta} spark={k.orders.spark}/>
        <KPI label="Avg order value" value={fmtLKR(k.aov.value)} delta={k.aov.delta} spark={k.aov.spark}/>
        <KPI label="Bespoke queue" value={k.bespoke.value} delta={k.bespoke.delta} spark={k.bespoke.spark}/>
      </div>

      <div className="dash-row">
        <div className="dash-card">
          <div className="dash-card-head">
            <div><h3>Revenue · last 12 weeks</h3><div className="sub">LKR, including shipping</div></div>
            <div className="seg">
              <button className="active">Weekly</button>
              <button>Monthly</button>
            </div>
          </div>
          <div className="dash-card-body padded">
            <div className="chart-bars">
              {[58,72,64,88,76,92,84,108,96,124,118,142].map((v, i) => (
                <div key={i} className="bar" style={{ height: `${v/142*100}%` }}>
                  <span className="lbl">W{i+1}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div><span className="dot" style={{ background: "var(--gold)" }}/>Revenue (LKR ’000)</div>
              <div style={{ marginLeft: "auto", color: "var(--charcoal)" }}>Peak · W12 · LKR 142,000</div>
            </div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head"><h3>Sales by channel</h3></div>
          <div className="dash-card-body padded" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Donut data={D.channels} total="100%"/>
            <div style={{ flex: 1 }}>
              {D.channels.map(c => (
                <div key={c.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid var(--line)", fontSize: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, background: c.color, borderRadius: 2, display: "inline-block" }}/> {c.name}
                  </div>
                  <span>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dash-row" style={{ marginTop: 24 }}>
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>Recent orders</h3>
            <a className="link" href="#/dashboard/orders" style={{ fontSize: 12, letterSpacing: "0.08em", borderBottom: "0.5px solid var(--charcoal)", paddingBottom: 2 }}>View all →</a>
          </div>
          <div className="dash-card-body">
            <table className="dash-tbl">
              <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {D.orders.slice(0, 5).map(o => (
                  <tr key={o.id}>
                    <td className="mono strong">{o.id}<div style={{ fontSize: 11, color: "var(--charcoal-soft)", fontFamily: "var(--body)" }}>{o.date}</div></td>
                    <td>{o.customer}</td>
                    <td>{fmtLKR(o.total)}</td>
                    <td><StatusPill s={o.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card-head"><h3>Top pieces · 30d</h3></div>
          <div className="dash-card-body">
            {D.topProducts.map((p, i) => (
              <div key={p.name} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, padding: "14px 22px", borderBottom: "0.5px solid var(--line)", alignItems: "center" }}>
                <div style={{ width: 36, height: 36, background: "linear-gradient(160deg,#efe1d8,#c4a49a)" }}/>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 15 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{p.units} units</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 400 }}>{fmtLKR(p.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: 24 }}>
        <div className="dash-card-head"><h3>Production · today</h3></div>
        <div className="dash-card-body padded">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { artisan: "Studio 01", queue: 6, today: "Marguerite Bishop · size 12M", days: 4 },
              { artisan: "Studio 02", queue: 4, today: "Floret Romper · size 6M",     days: 2 },
              { artisan: "Studio 03", queue: 3, today: "Saffron Set · size 18M",      days: 5 },
            ].map(a => (
              <div key={a.artisan} style={{ padding: 16, background: "var(--ivory)", borderRadius: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--blush), var(--dusty-rose))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontSize: 17 }}>{a.artisan.split(" ").map(w=>w[0]).join("")}</div>
                  <div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 17 }}>{a.artisan}</div>
                    <div className="eyebrow" style={{ fontSize: 10 }}>{a.queue} in queue</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "var(--charcoal-soft)" }}>Working on</div>
                <div style={{ fontSize: 14, fontFamily: "var(--display)", marginTop: 4 }}>{a.today}</div>
                <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 8 }}>{a.days} days remaining</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Donut = ({ data, total }) => {
  let acc = 0;
  const r = 56, c = 70, sw = 18;
  return (
    <svg className="donut" viewBox="0 0 140 140">
      {data.map((d, i) => {
        const frac = d.value / 100;
        const dash = frac * 2 * Math.PI * r;
        const rest = 2 * Math.PI * r - dash;
        const offset = -acc * 2 * Math.PI * r;
        acc += frac;
        return <circle key={i} cx={c} cy={c} r={r} fill="none" stroke={d.color} strokeWidth={sw} strokeDasharray={`${dash} ${rest}`} strokeDashoffset={offset} transform={`rotate(-90 ${c} ${c})`}/>;
      })}
      <text x={c} y={c+8} textAnchor="middle" fill="var(--charcoal)">{total}</text>
    </svg>
  );
};

// ===== STATUS PILL =====
const STATUS_MAP = {
  pending: ["warn", "Pending"],
  processing: ["info", "Processing"],
  production: ["warn", "In production"],
  shipped: ["info", "Shipped"],
  delivered: ["success", "Delivered"],
  cancelled: ["danger", "Cancelled"],
  refunded: ["danger", "Refunded"],
  captured: ["success", "Captured"],
  paid: ["success", "Paid"],
  active: ["success", "Active"],
  expired: ["neutral", "Expired"],
  approved: ["success", "Approved"],
  "awaiting-quote": ["warn", "Awaiting quote"],
  "in-production": ["info", "In production"],
  confirmed: ["info", "Confirmed"],
  completed: ["success", "Completed"],
};
const StatusPill = ({ s }) => {
  const [c, l] = STATUS_MAP[s] || ["neutral", s];
  return <span className={`status ${c}`}>{l}</span>;
};

Object.assign(window, { Dashboard, fmtLKR, Sparkline, KPI, Donut, StatusPill });
