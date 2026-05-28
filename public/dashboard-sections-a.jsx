// ===== ORDERS =====
// Localstorage-backed overrides for staging: track status changes, tracking
// numbers, refunds, notes, and timeline events between sessions. When wiring
// Railway, swap persistAdminOrder / readAdminOrders for /api/orders calls.
const ORDERS_KEY = "filamour.orders.overrides";
const readAdminOrders = () => { try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "{}"); } catch { return {}; } };
const writeAdminOrders = (ov) => { try { localStorage.setItem(ORDERS_KEY, JSON.stringify(ov)); } catch {} };
const persistAdminOrder = (id, patch) => {
  const ov = readAdminOrders();
  ov[id] = { ...(ov[id] || {}), ...patch };
  writeAdminOrders(ov);
};
const mergedOrders = () => {
  const ov = readAdminOrders();
  return D.orders.map(o => ({ ...o, ...(ov[o.id] || {}) }));
};
const appendOrderEvent = (id, event) => {
  const ov = readAdminOrders();
  const existing = ov[id] || {};
  const events = [...(existing.events || []), { ...event, at: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) }];
  ov[id] = { ...existing, events };
  writeAdminOrders(ov);
};

// CSV export — kept here so Bespoke + Orders + Customers can reuse it
const downloadCSV = (rows, filename) => {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => esc(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const OrdersSection = () => {
  const [tab, setTab] = React.useState("all");
  const [selected, setSelected] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [bulk, setBulk] = React.useState(new Set());
  const [, force] = React.useReducer(x => x + 1, 0);

  const orders = mergedOrders();
  const filtered = orders.filter(o => {
    const matchesTab = tab === "all" || o.status === tab;
    const matchesQ = !query || [o.id, o.customer, o.method, o.maker].some(s => (s || "").toLowerCase().includes(query.toLowerCase()));
    return matchesTab && matchesQ;
  });

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    production: orders.filter(o => o.status === "production").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  const toggleBulk = (id) => {
    const next = new Set(bulk);
    next.has(id) ? next.delete(id) : next.add(id);
    setBulk(next);
  };
  const allOnPage = filtered.every(o => bulk.has(o.id)) && filtered.length > 0;
  const toggleAll = () => {
    const next = new Set(bulk);
    if (allOnPage) filtered.forEach(o => next.delete(o.id));
    else filtered.forEach(o => next.add(o.id));
    setBulk(next);
  };
  const bulkStatus = (status, label) => {
    bulk.forEach(id => {
      persistAdminOrder(id, { status });
      appendOrderEvent(id, { label });
    });
    setBulk(new Set());
    force();
  };
  const bulkExport = () => {
    const rows = filtered.filter(o => bulk.has(o.id)).map(o => ({
      Order: o.id, Date: o.date, Customer: o.customer, Items: o.items, Total: o.total, Currency: o.ccy, Payment: o.method, Status: o.status, Tracking: o.tracking || "",
    }));
    downloadCSV(rows, `filamour-orders-${Date.now()}.csv`);
  };

  return (
    <>
      <div className="dash-card">
        <div className="tabs">
          {[
            ["all", "All", counts.all],
            ["pending", "Pending", counts.pending],
            ["processing", "Processing", counts.processing],
            ["production", "In production", counts.production],
            ["shipped", "Shipped", counts.shipped],
            ["delivered", "Delivered", counts.delivered],
            ["cancelled", "Cancelled", counts.cancelled],
          ].map(([id, l, n]) => (
            <div key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{l} <span style={{ color: "var(--charcoal-soft)", marginLeft: 6 }}>{n}</span></div>
          ))}
        </div>
        <div className="dash-card-head" style={{ borderBottom: "none" }}>
          <div className="prod-mgr-search" style={{ flex: 1, maxWidth: 320 }}>
            <Icon name="search" size={13} stroke={1.5}/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search orders, customers, SKUs…"/>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => downloadCSV(filtered.map(o => ({ Order: o.id, Date: o.date, Customer: o.customer, Items: o.items, Total: o.total, Status: o.status })), `filamour-orders-${Date.now()}.csv`)}>Export CSV</button>
            <button className="btn btn-primary btn-sm">+ Create order</button>
          </div>
        </div>
        {bulk.size > 0 && (
          <div className="prod-mgr-bulk" style={{ margin: "0 22px 14px" }}>
            <span>{bulk.size} selected</span>
            <button onClick={() => bulkStatus("processing", "Marked processing (bulk)")}>Mark processing</button>
            <button onClick={() => bulkStatus("production", "Sent to production (bulk)")}>To production</button>
            <button onClick={() => bulkStatus("shipped", "Marked shipped (bulk)")}>Mark shipped</button>
            <button onClick={bulkExport}>Export selected</button>
            <button onClick={() => bulkStatus("cancelled", "Cancelled (bulk)")} className="prod-mgr-bulk-del">Cancel</button>
            <button onClick={() => setBulk(new Set())} className="prod-mgr-bulk-cancel">Done</button>
          </div>
        )}
        <div className="dash-card-body" style={{ padding: 0 }}>
          <table className="dash-tbl">
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" checked={allOnPage} onChange={toggleAll}/></th>
                <th>Order</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan="9" style={{ padding: 40, textAlign: "center", color: "var(--charcoal-soft)" }}>No orders match. Adjust your filters.</td></tr>
              )}
              {filtered.map(o => (
                <tr key={o.id} onClick={() => setSelected(o)} style={{ cursor: "pointer" }}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox" checked={bulk.has(o.id)} onChange={() => toggleBulk(o.id)}/></td>
                  <td className="mono strong">{o.id}{o.tracking && <div style={{ fontSize: 10, color: "var(--gold)", fontFamily: "var(--body)", letterSpacing: "0.06em", marginTop: 2 }}>↗ {o.tracking}</div>}</td>
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
      {selected && <OrderDrawer order={selected} onClose={() => { setSelected(null); force(); }}/>}
    </>
  );
};

const OrderDrawer = ({ order, onClose }) => {
  // Pull the latest merged copy so newly-saved overrides show
  const live = mergedOrders().find(o => o.id === order.id) || order;
  const [status, setStatus] = React.useState(live.status);
  const [tracking, setTracking] = React.useState(live.tracking || "");
  const [carrier, setCarrier] = React.useState(live.carrier || "DHL Express");
  const [notes, setNotes] = React.useState(live.notes || "");
  const [refundOpen, setRefundOpen] = React.useState(false);
  const events = live.events || [];

  const setOrderStatus = (s, label) => {
    setStatus(s);
    persistAdminOrder(order.id, { status: s });
    appendOrderEvent(order.id, { label });
  };
  const saveTracking = () => {
    persistAdminOrder(order.id, { tracking, carrier });
    appendOrderEvent(order.id, { label: `Tracking added · ${carrier} ${tracking}` });
    if (status !== "shipped") setOrderStatus("shipped", "Marked shipped");
  };
  const saveNotes = () => {
    persistAdminOrder(order.id, { notes });
    appendOrderEvent(order.id, { label: "Note added" });
  };
  const printInvoice = () => {
    const w = window.open("", "_blank");
    if (!w) { alert("Pop-up blocked. Allow pop-ups to print invoices."); return; }
    w.document.write(`<!doctype html><html><head><title>Invoice ${order.id}</title>
      <style>
        body{font-family:Georgia,serif;color:#2E2926;padding:48px;max-width:680px;margin:0 auto;line-height:1.6}
        h1{font-weight:300;font-size:32px;letter-spacing:-0.01em;margin:0 0 4px}
        .meta{color:#8a857d;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:40px}
        table{width:100%;border-collapse:collapse;margin-top:24px}
        th,td{text-align:left;padding:10px 0;border-bottom:0.5px solid #ddd;font-size:14px}
        th{color:#8a857d;font-weight:400;font-size:11px;letter-spacing:0.12em;text-transform:uppercase}
        .totals td{border:none;padding:4px 0}
        .totals tr:last-child td{border-top:0.5px solid #2E2926;padding-top:12px;margin-top:8px;font-weight:500;font-size:16px}
        .gold{color:#B8924A;letter-spacing:0.18em;font-size:11px;text-transform:uppercase}
      </style></head><body>
      <div class="gold">Filamour</div>
      <h1>Invoice</h1>
      <div class="meta">${order.id} · ${order.date}</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:32px">
        <div><div class="gold">Billed to</div><div style="margin-top:6px">${order.customer}<br/>42 Westbourne Grove<br/>London W11<br/>United Kingdom</div></div>
        <div><div class="gold">Payment</div><div style="margin-top:6px">${order.method}<br/>Status: ${status}</div></div>
      </div>
      <table><thead><tr><th>Piece</th><th>Size</th><th>Qty</th><th style="text-align:right">Price</th></tr></thead>
      <tbody>${Array.from({length: order.items}).map((_,i)=>`
        <tr><td>${["The Marguerite Bishop Dress","The Floret Romper","The Linen Gift Set"][i%3]}</td><td>${["12M","6M","NB"][i%3]}</td><td>1</td><td style="text-align:right">${fmtLKR(order.total/order.items)}</td></tr>`).join("")}
      </tbody></table>
      <table class="totals" style="margin-top:24px;width:280px;margin-left:auto">
        <tr><td>Subtotal</td><td style="text-align:right">${fmtLKR(order.total - 800)}</td></tr>
        <tr><td>Shipping</td><td style="text-align:right">LKR 800</td></tr>
        <tr><td>Total</td><td style="text-align:right">${fmtLKR(order.total)}</td></tr>
      </table>
      <div style="margin-top:60px;color:#8a857d;font-size:11px;text-align:center;letter-spacing:0.14em;text-transform:uppercase">Thank you — kept for you, with care</div>
      <script>window.onload = () => window.print();</script></body></html>`);
    w.document.close();
  };

  const nextActions = {
    pending: { next: "processing", label: "Mark processing" },
    processing: { next: "production", label: "Send to production" },
    production: { next: "shipped", label: "Mark shipped" },
    shipped: { next: "delivered", label: "Mark delivered" },
  };
  const action = nextActions[status];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal prod-editor" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>Order {order.id}</h2>
            <div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>{order.date} · {order.customer}</div>
          </div>
          <button onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatusPill s={status}/>
            <div className="dash-pill">{order.method}</div>
            <div className="dash-pill">Maker · {order.maker || order.artisan}</div>
            {live.tracking && <div className="dash-pill" style={{ background: "rgba(184,146,74,0.12)", color: "var(--gold)", borderColor: "rgba(184,146,74,0.3)" }}>↗ {live.carrier || "DHL"} · {live.tracking}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h4 className="eyebrow" style={{ marginBottom: 12 }}>Items</h4>
              <div style={{ border: "0.5px solid var(--line)", borderRadius: 4 }}>
                {Array.from({ length: order.items }).map((_, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 12, padding: 12, alignItems: "center", borderBottom: i < order.items - 1 ? "0.5px solid var(--line)" : "none" }}>
                    <div style={{ aspectRatio: "3/4", background: "linear-gradient(160deg,#efe1d8,#c4a49a)", borderRadius: 2 }}/>
                    <div>
                      <div style={{ fontFamily: "var(--display)", fontSize: 14 }}>{["Marguerite Bishop", "Floret Romper", "Linen Set"][i % 3]}</div>
                      <div style={{ fontSize: 11, color: "var(--charcoal-soft)", marginTop: 2 }}>Size · {["12M","6M","NB"][i % 3]} · Qty 1</div>
                    </div>
                    <div style={{ fontSize: 12 }}>{fmtLKR(order.total / order.items)}</div>
                  </div>
                ))}
              </div>

              <h4 className="eyebrow" style={{ marginTop: 24, marginBottom: 8 }}>Shipping address</h4>
              <div style={{ fontSize: 13, color: "var(--charcoal-soft)", lineHeight: 1.7 }}>
                {order.customer}<br/>
                42 Westbourne Grove<br/>
                London W11<br/>
                United Kingdom
              </div>
            </div>
            <div>
              <h4 className="eyebrow" style={{ marginBottom: 8 }}>Summary</h4>
              <div style={{ fontSize: 13, padding: 14, background: "var(--ivory)", borderRadius: 4 }}>
                <Row k="Subtotal" v={fmtLKR(order.total - 800)}/>
                <Row k="Shipping" v="LKR 800"/>
                <div style={{ borderTop: "0.5px solid var(--line)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 400 }}><span>Total</span><span>{fmtLKR(order.total)}</span></div>
              </div>

              {(status === "production" || status === "shipped") && (
                <div style={{ marginTop: 22 }}>
                  <h4 className="eyebrow" style={{ marginBottom: 8 }}>Tracking</h4>
                  <div style={{ display: "flex", gap: 6 }}>
                    <select className="form-select" value={carrier} onChange={e => setCarrier(e.target.value)} style={{ width: 140 }}>
                      <option>DHL Express</option>
                      <option>FedEx</option>
                      <option>UPS</option>
                      <option>Royal Mail</option>
                      <option>Aramex</option>
                    </select>
                    <input className="form-input" placeholder="Tracking number" value={tracking} onChange={e => setTracking(e.target.value)}/>
                    <button className="btn btn-primary btn-sm" onClick={saveTracking} disabled={!tracking.trim()}>Save</button>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 22 }}>
                <h4 className="eyebrow" style={{ marginBottom: 8 }}>Internal notes</h4>
                <textarea className="form-text" rows="3" placeholder="Notes for the studio — won't be visible to the customer." value={notes} onChange={e => setNotes(e.target.value)} onBlur={saveNotes}/>
              </div>
            </div>
          </div>

          <h4 className="eyebrow" style={{ marginTop: 28, marginBottom: 12 }}>Timeline</h4>
          <div style={{ borderLeft: "0.5px solid var(--gold)", paddingLeft: 16 }}>
            {[
              ["Order placed", order.date, true],
              ["Payment captured", order.date, true],
              ["Assigned to " + (order.maker || order.artisan), order.date, status !== "pending"],
              ["Production complete", "—", ["shipped","delivered"].includes(status)],
              ["Shipped" + (live.tracking ? ` via ${live.carrier || "DHL"}` : ""), "—", ["shipped","delivered"].includes(status)],
              ["Delivered", "—", status === "delivered"],
              ...(status === "cancelled" ? [["Cancelled", "—", true]] : []),
            ].map(([t, d, done], i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "6px 0", fontSize: 13, color: done ? "var(--charcoal)" : "var(--charcoal-soft)" }}>
                <Icon name={done ? "check" : "chev-right"} size={14} stroke={1.6}/>
                <div style={{ flex: 1 }}>{t}</div>
                <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{d}</div>
              </div>
            ))}
            {events.map((ev, i) => (
              <div key={`e${i}`} style={{ display: "flex", gap: 12, padding: "6px 0", fontSize: 13, color: "var(--gold)" }}>
                <Icon name="check" size={14} stroke={1.6}/>
                <div style={{ flex: 1 }}>{ev.label}</div>
                <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{ev.at}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-secondary btn-sm" onClick={printInvoice} style={{ marginRight: "auto" }}>Print invoice</button>
          {status !== "cancelled" && status !== "refunded" && <button className="btn btn-secondary btn-sm" style={{ color: "#a85a3f", borderColor: "#a85a3f" }} onClick={() => setRefundOpen(true)}>Refund</button>}
          {status !== "cancelled" && status !== "delivered" && status !== "refunded" && <button className="btn btn-secondary btn-sm" onClick={() => { if (confirm("Cancel this order?")) setOrderStatus("cancelled", "Order cancelled"); }}>Cancel order</button>}
          {action && <button className="btn btn-primary btn-sm" onClick={() => setOrderStatus(action.next, action.label)}>{action.label}</button>}
          {status === "delivered" && <span style={{ fontSize: 12, color: "var(--charcoal-soft)", padding: "8px 12px" }}>Order delivered ✓</span>}
        </div>
        {refundOpen && <RefundModal order={order} onClose={() => setRefundOpen(false)} onConfirm={(amt, reason) => { persistAdminOrder(order.id, { status: "refunded", refundAmount: amt, refundReason: reason }); appendOrderEvent(order.id, { label: `Refunded ${fmtLKR(amt)} · ${reason}` }); setRefundOpen(false); setStatus("refunded"); }}/>}
      </div>
    </div>
  );
};

const RefundModal = ({ order, onClose, onConfirm }) => {
  const [amount, setAmount] = React.useState(order.total);
  const [reason, setReason] = React.useState("Customer request");
  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div className="modal" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div><h2 style={{ fontSize: 22 }}>Issue refund</h2><div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>Order {order.id} · {fmtLKR(order.total)}</div></div><button onClick={onClose}><Icon name="x" size={18}/></button></div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="span-2"><label className="form-label">Amount · LKR</label><input className="form-input" type="number" value={amount} onChange={e => setAmount(Math.min(order.total, Math.max(0, Number(e.target.value) || 0)))} max={order.total}/><div className="form-help">Maximum refundable · {fmtLKR(order.total)}</div></div>
            <div className="span-2"><label className="form-label">Reason</label><select className="form-select" value={reason} onChange={e => setReason(e.target.value)}><option>Customer request</option><option>Wrong size shipped</option><option>Damaged in transit</option><option>Not as described</option><option>Late delivery</option><option>Other</option></select></div>
          </div>
          <div style={{ marginTop: 16, padding: 12, background: "rgba(168,90,63,0.08)", border: "0.5px solid rgba(168,90,63,0.2)", borderRadius: 4, fontSize: 12, color: "#a85a3f", lineHeight: 1.55 }}>This will refund <strong>{fmtLKR(amount)}</strong> via the original payment method. It can take 5–10 business days to appear on the customer's statement.</div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" style={{ background: "#a85a3f" }} onClick={() => onConfirm(amount, reason)}>Confirm refund</button>
        </div>
      </div>
    </div>
  );
};

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
// Localstorage-backed CRUD over window.FILAMOUR_DATA.products.
// Acts as the "backend" for staging — when you wire Railway, swap the
// persistAdmin() and removeAdmin() helpers for fetch calls to /api/products.
const ADMIN_KEY = "filamour.products.overrides";
const readAdminOverrides = () => { try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}"); } catch { return {}; } };
const writeAdminOverrides = (ov) => { try { localStorage.setItem(ADMIN_KEY, JSON.stringify(ov)); } catch {} };
const persistAdminProduct = (slug, patch) => {
  const ov = readAdminOverrides();
  ov[slug] = { ...(ov[slug] || {}), ...patch };
  writeAdminOverrides(ov);
  // Reflect on the live catalogue immediately
  const idx = window.FILAMOUR_DATA.products.findIndex(p => p.slug === slug);
  if (idx >= 0) {
    window.FILAMOUR_DATA.products[idx] = { ...window.FILAMOUR_DATA.products[idx], ...patch };
  } else {
    window.FILAMOUR_DATA.products.push({ ...patch, slug });
  }
};
const removeAdminProduct = (slug) => {
  const ov = readAdminOverrides();
  ov[slug] = { _deleted: true };
  writeAdminOverrides(ov);
  const idx = window.FILAMOUR_DATA.products.findIndex(p => p.slug === slug);
  if (idx >= 0) window.FILAMOUR_DATA.products.splice(idx, 1);
};

const ProductsSection = () => {
  const [edit, setEdit] = React.useState(null);
  const [products, setProducts] = React.useState(() => [...window.FILAMOUR_DATA.products]);
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [selected, setSelected] = React.useState(new Set());

  const refresh = () => setProducts([...window.FILAMOUR_DATA.products]);

  const filtered = products.filter(p => {
    const matchesQ = !query || [p.name, p.category, p.occasion, p.slug].some(s => (s || "").toLowerCase().includes(query.toLowerCase()));
    const status = p.status || "active";
    const matchesS = statusFilter === "all" || status === statusFilter;
    return matchesQ && matchesS;
  });

  const counts = {
    active: products.filter(p => (p.status || "active") === "active").length,
    draft: products.filter(p => p.status === "draft").length,
    archived: products.filter(p => p.status === "archived").length,
  };

  const toggleSelected = (slug) => {
    const next = new Set(selected);
    next.has(slug) ? next.delete(slug) : next.add(slug);
    setSelected(next);
  };
  const allOnPage = filtered.every(p => selected.has(p.slug)) && filtered.length > 0;
  const toggleAll = () => {
    const next = new Set(selected);
    if (allOnPage) filtered.forEach(p => next.delete(p.slug));
    else filtered.forEach(p => next.add(p.slug));
    setSelected(next);
  };
  const bulkSetStatus = (status) => {
    selected.forEach(slug => persistAdminProduct(slug, { status }));
    setSelected(new Set());
    refresh();
  };
  const bulkDelete = () => {
    if (!confirm(`Delete ${selected.size} ${selected.size === 1 ? "piece" : "pieces"}? This can't be undone (from staging).`)) return;
    selected.forEach(slug => removeAdminProduct(slug));
    setSelected(new Set());
    refresh();
  };

  const newProduct = () => {
    const slug = "new-piece-" + Math.random().toString(36).slice(2, 7);
    setEdit({
      slug, name: "", desc: "", category: "Dresses", occasion: "Everyday Luxury",
      sizes: ["NB","3M","6M","12M","18M"], sizesAvail: ["NB","3M","6M","12M","18M"],
      oos: [], lowStock: {}, priceLKR: 12000, avail: { type: "ready" },
      maker: "Studio 01", badge: null, tone: "ivory", status: "draft",
      _new: true,
    });
  };

  return (
    <>
      <div className="prod-mgr-bar">
        <div className="prod-mgr-pills">
          {[
            ["all", `All · ${products.length}`],
            ["active", `Active · ${counts.active}`],
            ["draft", `Draft · ${counts.draft}`],
            ["archived", `Archived · ${counts.archived}`],
          ].map(([id, label]) => (
            <button key={id} className={`prod-mgr-pill ${statusFilter === id ? "active" : ""}`} onClick={() => setStatusFilter(id)}>{label}</button>
          ))}
        </div>
        <div className="prod-mgr-actions">
          <div className="prod-mgr-search">
            <Icon name="search" size={13} stroke={1.5}/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products…"/>
          </div>
          <button className="btn btn-secondary btn-sm">Export</button>
          <button className="btn btn-primary btn-sm" onClick={newProduct}>+ New product</button>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="prod-mgr-bulk">
          <span>{selected.size} selected</span>
          <button onClick={() => bulkSetStatus("active")}>Activate</button>
          <button onClick={() => bulkSetStatus("draft")}>Move to draft</button>
          <button onClick={() => bulkSetStatus("archived")}>Archive</button>
          <button onClick={bulkDelete} className="prod-mgr-bulk-del">Delete</button>
          <button onClick={() => setSelected(new Set())} className="prod-mgr-bulk-cancel">Cancel</button>
        </div>
      )}

      <div className="dash-card">
        <table className="dash-tbl">
          <thead>
            <tr>
              <th style={{ width: 32 }}><input type="checkbox" checked={allOnPage} onChange={toggleAll}/></th>
              <th>Piece</th><th>Category</th><th>Price</th><th>Sizes</th><th>Availability</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="8" style={{ padding: 40, textAlign: "center", color: "var(--charcoal-soft)" }}>No products match. Adjust your search or create a new one.</td></tr>
            )}
            {filtered.map(p => {
              const status = p.status || "active";
              const oosCount = (p.oos || []).length;
              const inStockSizes = (p.sizes || []).length - oosCount;
              const productThumb = window.productImg(p.slug, 0);
              return (
                <tr key={p.slug} onClick={() => setEdit(p)} style={{ cursor: "pointer" }}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox" checked={selected.has(p.slug)} onChange={() => toggleSelected(p.slug)}/></td>
                  <td>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div className="prod-mgr-thumb" style={{ backgroundImage: `url(${productThumb})` }}/>
                      <div>
                        <div className="strong">{p.name || "(no name)"}</div>
                        <div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>SKU · {p.slug.toUpperCase().slice(0, 14)}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>{fmtLKR(p.priceLKR)}</td>
                  <td style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{inStockSizes}/{(p.sizes || []).length} sizes</td>
                  <td>{p.avail?.type === "ready" ? <span className="status success">Ready · ships in 2d</span> : <span className="status warn">Made · {p.avail?.days || 10}d</span>}</td>
                  <td>
                    <button
                      className={`prod-status-pill prod-status-${status}`}
                      onClick={(e) => { e.stopPropagation(); const next = status === "active" ? "draft" : status === "draft" ? "archived" : "active"; persistAdminProduct(p.slug, { status: next }); refresh(); }}
                      title="Click to cycle status"
                    >{status.charAt(0).toUpperCase() + status.slice(1)}</button>
                  </td>
                  <td><Icon name="chev-right" size={14}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {edit && <ProductEditor product={edit} onClose={() => setEdit(null)} onSaved={refresh}/>}
    </>
  );
};

const ProductEditor = ({ product, onClose, onSaved }) => {
  const [tab, setTab] = React.useState("details");
  const isNew = !!product._new;
  const [draft, setDraft] = React.useState(() => ({
    slug: product.slug,
    name: product.name || "",
    desc: product.desc || "",
    longDesc: product.longDesc || "A softly-gathered bishop dress cut from natural cotton-muslin, with a high yoke that sits gently above the collarbones and gives at the chest as your baby breathes.",
    category: product.category || "Dresses",
    occasion: product.occasion || "Everyday Luxury",
    tone: product.tone || "ivory",
    maker: product.maker || product.artisan || "Studio 01",
    badge: product.badge || "",
    status: product.status || "active",
    priceLKR: product.priceLKR || 12000,
    compareAt: product.compareAt || 0,
    cost: product.cost || Math.round((product.priceLKR || 12000) * 0.42),
    sizes: product.sizes || ["NB","3M","6M","12M","18M"],
    oos: product.oos || [],
    stockBySize: product.stockBySize || Object.fromEntries((product.sizes || []).map(s => [s, product.oos?.includes(s) ? 0 : 4])),
    lowStockAlert: product.lowStockAlert || 2,
    availType: product.avail?.type || "ready",
    availDays: product.avail?.days || 8,
    images: product.images || [],
    seoTitle: product.seoTitle || "",
    seoDesc: product.seoDesc || "",
    tags: product.tags || [],
  }));

  const setField = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const margin = draft.priceLKR > 0 ? Math.round(((draft.priceLKR - draft.cost) / draft.priceLKR) * 100) : 0;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    Promise.all(files.map(f => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); }))).then(dataUris => {
      setField("images", [...draft.images, ...dataUris].slice(0, 8));
    });
    e.target.value = ""; // allow re-uploading the same file
  };

  const removeImage = (idx) => setField("images", draft.images.filter((_, i) => i !== idx));
  const moveImage = (idx, dir) => {
    const next = [...draft.images];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setField("images", next);
  };

  const updateSize = (s, key, val) => {
    if (key === "qty") {
      const stock = { ...draft.stockBySize, [s]: val };
      const oos = val === 0 ? [...new Set([...draft.oos, s])] : draft.oos.filter(x => x !== s);
      setDraft(d => ({ ...d, stockBySize: stock, oos }));
    }
  };
  const addSize = (sz) => {
    if (!sz || draft.sizes.includes(sz)) return;
    setDraft(d => ({ ...d, sizes: [...d.sizes, sz], stockBySize: { ...d.stockBySize, [sz]: 0 }, oos: [...d.oos, sz] }));
  };
  const removeSize = (sz) => {
    setDraft(d => ({
      ...d,
      sizes: d.sizes.filter(s => s !== sz),
      oos: d.oos.filter(s => s !== sz),
      stockBySize: Object.fromEntries(Object.entries(d.stockBySize).filter(([k]) => k !== sz)),
    }));
  };

  const save = () => {
    if (!draft.name.trim()) { alert("Give your piece a name first."); return; }
    // Auto-generate slug for new products from the name if still placeholder
    const finalSlug = (isNew && draft.slug.startsWith("new-piece-"))
      ? draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || draft.slug
      : draft.slug;

    const patch = {
      slug: finalSlug,
      name: draft.name,
      desc: draft.desc,
      longDesc: draft.longDesc,
      category: draft.category,
      occasion: draft.occasion,
      tone: draft.tone,
      maker: draft.maker,
      badge: draft.badge || null,
      status: draft.status,
      priceLKR: Number(draft.priceLKR) || 0,
      compareAt: Number(draft.compareAt) || 0,
      cost: Number(draft.cost) || 0,
      sizes: draft.sizes,
      oos: draft.oos,
      stockBySize: draft.stockBySize,
      lowStock: Object.fromEntries(Object.entries(draft.stockBySize).filter(([s, q]) => q > 0 && q <= draft.lowStockAlert)),
      lowStockAlert: Number(draft.lowStockAlert) || 0,
      avail: { type: draft.availType, days: Number(draft.availDays) || 8 },
      images: draft.images,
      seoTitle: draft.seoTitle,
      seoDesc: draft.seoDesc,
      tags: draft.tags,
    };
    persistAdminProduct(finalSlug, patch);
    if (onSaved) onSaved();
    onClose();
  };

  const del = () => {
    if (!confirm(`Delete "${draft.name || "this piece"}"? This can't be undone (from staging).`)) return;
    removeAdminProduct(draft.slug);
    if (onSaved) onSaved();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal prod-editor" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>{isNew ? "New product" : draft.name || "Untitled piece"}</h2>
            <div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>
              {isNew ? "Add a new piece to the catalogue" : `SKU · ${draft.slug.toUpperCase()}`}
              {" · "}<span className={`prod-status-pill prod-status-${draft.status}`} style={{ marginLeft: 6 }}>{draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}</span>
            </div>
          </div>
          <button onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="tabs" style={{ padding: "0 24px" }}>
          {["details","photos","pricing","inventory","variants","seo"].map(t => (
            <div key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ textTransform: "capitalize" }}>{t}</div>
          ))}
        </div>
        <div className="modal-body">
          {tab === "details" && (
            <div className="form-grid">
              <div className="span-2"><label className="form-label">Name *</label><input className="form-input" value={draft.name} onChange={e => setField("name", e.target.value)} placeholder="The Marguerite Bishop Dress"/></div>
              <div className="span-2"><label className="form-label">Short description</label><input className="form-input" value={draft.desc} onChange={e => setField("desc", e.target.value)} placeholder="One line that captures it"/></div>
              <div className="span-2"><label className="form-label">Long description</label><textarea className="form-text" rows="5" value={draft.longDesc} onChange={e => setField("longDesc", e.target.value)}/></div>
              <div><label className="form-label">Category</label><select className="form-select" value={draft.category} onChange={e => setField("category", e.target.value)}><option>Dresses</option><option>Rompers</option><option>Sets</option><option>Tops</option><option>Gift Sets</option><option>Bloomers</option><option>Outerwear</option></select></div>
              <div><label className="form-label">Occasion</label><select className="form-select" value={draft.occasion} onChange={e => setField("occasion", e.target.value)}><option>Christening & Baptism</option><option>First Birthday</option><option>Family Photoshoot</option><option>Wedding Guest</option><option>New Baby Gift</option><option>Everyday Luxury</option><option>Eid & Festive</option></select></div>
              <div><label className="form-label">Colourway / tone</label><select className="form-select" value={draft.tone} onChange={e => setField("tone", e.target.value)}><option value="ivory">Ivory</option><option value="blush">Blush</option><option value="rose">Dusty Rose</option><option value="saffron">Saffron</option><option value="honey">Honey</option></select></div>
              <div><label className="form-label">Assigned maker</label><select className="form-select" value={draft.maker} onChange={e => setField("maker", e.target.value)}>{["Studio 01","Studio 02","Studio 03"].map(a => <option key={a}>{a}</option>)}</select></div>
              <div><label className="form-label">Badge</label><select className="form-select" value={draft.badge} onChange={e => setField("badge", e.target.value)}><option value="">— None —</option><option>New</option><option>Bestseller</option><option>Limited</option><option>Signature</option></select></div>
              <div><label className="form-label">Status</label><select className="form-select" value={draft.status} onChange={e => setField("status", e.target.value)}><option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div>
              <div className="span-2"><label className="form-label">Tags <span style={{ color: "var(--charcoal-soft)", textTransform: "none", letterSpacing: 0 }}>(comma-separated)</span></label><input className="form-input" value={(draft.tags || []).join(", ")} onChange={e => setField("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} placeholder="muslin, organic, hand-finished"/></div>
            </div>
          )}
          {tab === "photos" && (
            <div>
              <div className="form-help" style={{ marginBottom: 14 }}>Recommended · 1500×2000px, soft natural light, ivory or muslin backdrops. First image is the hero on the product card.</div>
              <div className="img-mgr">
                {draft.images.map((src, i) => (
                  <div key={i} className="img-mgr-tile" style={{ backgroundImage: `url(${src})` }}>
                    <div className="img-mgr-overlay">
                      <button onClick={() => moveImage(i, -1)} disabled={i === 0} aria-label="Move left">←</button>
                      <button onClick={() => moveImage(i, 1)} disabled={i === draft.images.length - 1} aria-label="Move right">→</button>
                      <button onClick={() => removeImage(i)} className="img-mgr-del" aria-label="Remove">✕</button>
                    </div>
                    {i === 0 && <div className="img-mgr-hero">HERO</div>}
                  </div>
                ))}
                {draft.images.length < 8 && (
                  <label className="img-mgr-tile img-mgr-add">
                    + Add photo
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }}/>
                  </label>
                )}
              </div>
              {draft.images.length === 0 && <div style={{ marginTop: 16, padding: 16, background: "var(--ivory)", borderRadius: 4, fontSize: 12, color: "var(--charcoal-soft)", lineHeight: 1.6 }}>No photos uploaded yet — the storefront will fall back to the placeholder gallery. Drop a few real shots here to publish to the live site.</div>}
            </div>
          )}
          {tab === "pricing" && (
            <div className="form-grid">
              <div><label className="form-label">Price · LKR</label><input className="form-input" type="number" value={draft.priceLKR} onChange={e => setField("priceLKR", e.target.value)}/></div>
              <div><label className="form-label">Compare-at price · LKR</label><input className="form-input" type="number" value={draft.compareAt} onChange={e => setField("compareAt", e.target.value)} placeholder="Optional"/><div className="form-help">Showing a strikethrough higher price.</div></div>
              <div><label className="form-label">Cost per item · LKR</label><input className="form-input" type="number" value={draft.cost} onChange={e => setField("cost", e.target.value)}/><div className="form-help">For margin reporting — not shown to customers.</div></div>
              <div><label className="form-label">Margin</label><input className="form-input" disabled value={`${margin}% · LKR ${Math.max(0, (Number(draft.priceLKR) || 0) - (Number(draft.cost) || 0)).toLocaleString()}`}/></div>
              <div className="span-2"><label className="form-label">Display in other currencies</label><div style={{ display: "flex", gap: 20, fontSize: 13 }}><div><strong style={{ color: "var(--gold)" }}>£{Math.round((Number(draft.priceLKR) || 0) / 360)}</strong> GBP</div><div><strong style={{ color: "var(--gold)" }}>${Math.round((Number(draft.priceLKR) || 0) / 295)}</strong> USD</div></div></div>
            </div>
          )}
          {tab === "inventory" && (
            <div>
              <div className="form-grid" style={{ marginBottom: 24 }}>
                <div><label className="form-label">Availability</label><select className="form-select" value={draft.availType} onChange={e => setField("availType", e.target.value)}><option value="ready">Ready to ship</option><option value="made">Made to order</option></select></div>
                {draft.availType === "made" && <div><label className="form-label">Production days</label><input className="form-input" type="number" value={draft.availDays} onChange={e => setField("availDays", e.target.value)}/></div>}
                <div><label className="form-label">Low-stock alert at</label><input className="form-input" type="number" value={draft.lowStockAlert} onChange={e => setField("lowStockAlert", e.target.value)}/></div>
              </div>
              <h4 className="eyebrow" style={{ marginBottom: 12 }}>Stock per size</h4>
              <table className="dash-tbl" style={{ border: "0.5px solid var(--line)", borderRadius: 4 }}>
                <thead><tr><th>Size</th><th>SKU</th><th>In stock</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {draft.sizes.map(s => {
                    const qty = draft.stockBySize[s] ?? 0;
                    const isOos = qty === 0;
                    const isLow = !isOos && qty <= draft.lowStockAlert;
                    return (
                      <tr key={s}>
                        <td className="strong">{s}</td>
                        <td className="mono">{draft.slug.toUpperCase().slice(0,8)}-{s}</td>
                        <td><input className="form-input" type="number" min="0" value={qty} onChange={e => updateSize(s, "qty", Math.max(0, Number(e.target.value) || 0))} style={{ width: 90 }}/></td>
                        <td>{isOos ? <span className="status warn">Sold out</span> : isLow ? <span className="status warn">Low ({qty})</span> : <span className="status success">In stock</span>}</td>
                        <td><button className="btn-icon" onClick={() => removeSize(s)} title="Remove size">✕</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                {["NB","3M","6M","9M","12M","18M","24M","2T","3T","4T","5T"].filter(sz => !draft.sizes.includes(sz)).map(sz => (
                  <button key={sz} className="btn btn-secondary btn-sm" onClick={() => addSize(sz)}>+ {sz}</button>
                ))}
              </div>
            </div>
          )}
          {tab === "variants" && (
            <div>
              <div className="form-help" style={{ marginBottom: 14 }}>Colourways are derived from the piece's tone. Set the tone in <strong>Details</strong>; the storefront shows three on-tone swatches automatically.</div>
              <div style={{ display: "flex", gap: 18, padding: 24, background: "var(--ivory)", borderRadius: 4 }}>
                <div className="prod-colour-chip" style={{ width: 48, height: 48, background: { ivory: "#F5EFE6", blush: "#E8D5CE", rose: "#C4A49A", saffron: "#B8924A", honey: "#D6B584" }[draft.tone] || "#F5EFE6", borderColor: draft.tone === "ivory" ? "var(--line)" : "transparent" }}/>
                <div>
                  <div className="strong" style={{ fontSize: 18, fontFamily: "var(--display)" }}>{draft.tone.charAt(0).toUpperCase() + draft.tone.slice(1)}</div>
                  <div style={{ fontSize: 12, color: "var(--charcoal-soft)", marginTop: 6 }}>Set in Details → Colourway / tone</div>
                </div>
              </div>
            </div>
          )}
          {tab === "seo" && (
            <div>
              <div className="form-grid">
                <div className="span-2"><label className="form-label">Meta title</label><input className="form-input" value={draft.seoTitle} onChange={e => setField("seoTitle", e.target.value)} placeholder={`${draft.name || "Piece name"} · Filamour`} maxLength={60}/><div className="form-counter">{(draft.seoTitle || "").length} / 60</div></div>
                <div className="span-2"><label className="form-label">Meta description</label><textarea className="form-text" rows="3" value={draft.seoDesc} onChange={e => setField("seoDesc", e.target.value)} placeholder={`${draft.desc}. Natural fiber, made by hand.`} maxLength={160}/><div className="form-counter">{(draft.seoDesc || "").length} / 160</div></div>
                <div className="span-2"><label className="form-label">URL handle</label><input className="form-input" value={draft.slug} onChange={e => setField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}/></div>
              </div>
              <h4 className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>Google preview</h4>
              <div className="preview-card">
                <div className="url">filamour.com › product › {draft.slug}</div>
                <div className="ttl">{draft.seoTitle || `${draft.name || "New piece"} · Filamour`}</div>
                <div className="desc">{draft.seoDesc || `${draft.desc || "A new Filamour piece"}. Natural fiber, made by hand.`}</div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-foot">
          {!isNew && <button className="btn btn-secondary btn-sm" style={{ color: "#a85a3f", borderColor: "#a85a3f", marginRight: "auto" }} onClick={del}>Delete</button>}
          <a href={`#/product/${draft.slug}`} target="_blank" className="btn btn-secondary btn-sm">Preview on site ↗</a>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={save}>{isNew ? "Create piece" : "Save changes"}</button>
        </div>
      </div>
    </div>
  );
};

// ===== CUSTOMERS =====
// Customer notes + tier overrides persisted to localStorage
const CUST_KEY = "filamour.customers.overrides";
const readAdminCustomers = () => { try { return JSON.parse(localStorage.getItem(CUST_KEY) || "{}"); } catch { return {}; } };
const persistAdminCustomer = (id, patch) => {
  const ov = readAdminCustomers();
  ov[id] = { ...(ov[id] || {}), ...patch };
  try { localStorage.setItem(CUST_KEY, JSON.stringify(ov)); } catch {}
};
const mergedCustomers = () => {
  const ov = readAdminCustomers();
  return D.customers.map(c => ({ ...c, ...(ov[c.id] || {}) }));
};

const CustomersSection = () => {
  const [query, setQuery] = React.useState("");
  const [tierFilter, setTierFilter] = React.useState("all");
  const [selected, setSelected] = React.useState(null);
  const [, force] = React.useReducer(x => x + 1, 0);

  const customers = mergedCustomers();
  const filtered = customers.filter(c => {
    const matchesQ = !query || [c.name, c.email, c.country].some(s => (s || "").toLowerCase().includes(query.toLowerCase()));
    const matchesT = tierFilter === "all" || c.tier === tierFilter;
    return matchesQ && matchesT;
  });

  const exportCSV = () => downloadCSV(filtered.map(c => ({ Name: c.name, Email: c.email, Country: c.country, Orders: c.orders, LifetimeValue: c.spent, Tier: c.tier })), `filamour-customers-${Date.now()}.csv`);

  return (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <KPI label="Customers" value={customers.length.toString()} delta={8.2} spark={[12,14,16,18,20,22,24,28,32,30,36,42]}/>
        <KPI label="VIP & loyal" value={customers.filter(c => c.tier === "VIP" || c.tier === "Loyal").length.toString()} delta={12.0} spark={[4,5,6,6,7,8,9,10,11,12,13,14]}/>
        <KPI label="New · 30d" value={customers.filter(c => c.tier === "New").length.toString()} delta={-3.2} spark={[6,5,4,5,4,3,4,5,4,5,4,4]}/>
        <KPI label="Repeat rate" value="38%" delta={2.4} spark={[34,35,35,36,36,37,37,37,38,38,38,38]}/>
      </div>

      <div className="prod-mgr-bar">
        <div className="prod-mgr-pills">
          {[["all","All"],["VIP","VIP"],["Loyal","Loyal"],["Returning","Returning"],["New","New"]].map(([id, label]) => (
            <button key={id} className={`prod-mgr-pill ${tierFilter === id ? "active" : ""}`} onClick={() => setTierFilter(id)}>{label}</button>
          ))}
        </div>
        <div className="prod-mgr-actions">
          <div className="prod-mgr-search">
            <Icon name="search" size={13} stroke={1.5}/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, email, country…"/>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={exportCSV}>Export</button>
          <button className="btn btn-primary btn-sm">Email segment</button>
        </div>
      </div>

      <div className="dash-card">
        <table className="dash-tbl">
          <thead><tr><th>Name</th><th>Email</th><th>Country</th><th>Orders</th><th>Lifetime value</th><th>Tier</th><th></th></tr></thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="7" style={{ padding: 40, textAlign: "center", color: "var(--charcoal-soft)" }}>No customers match.</td></tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} onClick={() => setSelected(c)} style={{ cursor: "pointer" }}>
                <td>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--blush), var(--dusty-rose))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontSize: 14 }}>{c.name[0]}</div>
                    <div><div className="strong">{c.name}</div>{c.note && <div style={{ fontSize: 10, color: "var(--gold)", marginTop: 2 }}>★ Note added</div>}</div>
                  </div>
                </td>
                <td style={{ color: "var(--charcoal-soft)" }}>{c.email}</td>
                <td>{c.country}</td>
                <td>{c.orders}</td>
                <td>{fmtLKR(c.spent)}</td>
                <td><span className={`status ${c.tier === "VIP" ? "warn" : c.tier === "Loyal" ? "success" : c.tier === "New" ? "info" : "neutral"}`}>{c.tier}</span></td>
                <td><Icon name="chev-right" size={14}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && <CustomerDrawer customer={selected} onClose={() => { setSelected(null); force(); }}/>}
    </>
  );
};

const CustomerDrawer = ({ customer, onClose }) => {
  const live = mergedCustomers().find(c => c.id === customer.id) || customer;
  const [tier, setTier] = React.useState(live.tier);
  const [note, setNote] = React.useState(live.note || "");

  // Pull orders for this customer
  const orders = mergedOrders().filter(o => o.customer === customer.name);
  const avgOrder = orders.length > 0 ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0;

  const updateTier = (t) => {
    setTier(t);
    persistAdminCustomer(customer.id, { tier: t });
  };
  const saveNote = () => persistAdminCustomer(customer.id, { note });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal prod-editor" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, var(--blush), var(--dusty-rose))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontSize: 24 }}>{customer.name[0]}</div>
            <div>
              <h2>{customer.name}</h2>
              <div style={{ fontSize: 12, color: "var(--charcoal-soft)" }}>{customer.email} · {customer.country}</div>
            </div>
          </div>
          <button onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
            <div style={{ padding: 14, background: "var(--ivory)", borderRadius: 4 }}><div className="eyebrow" style={{ fontSize: 9 }}>Lifetime value</div><div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 4 }}>{fmtLKR(customer.spent)}</div></div>
            <div style={{ padding: 14, background: "var(--ivory)", borderRadius: 4 }}><div className="eyebrow" style={{ fontSize: 9 }}>Orders</div><div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 4 }}>{customer.orders}</div></div>
            <div style={{ padding: 14, background: "var(--ivory)", borderRadius: 4 }}><div className="eyebrow" style={{ fontSize: 9 }}>Avg order</div><div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 4 }}>{avgOrder ? fmtLKR(avgOrder) : "—"}</div></div>
            <div style={{ padding: 14, background: "var(--ivory)", borderRadius: 4 }}><div className="eyebrow" style={{ fontSize: 9 }}>Tier</div><select className="form-select" value={tier} onChange={e => updateTier(e.target.value)} style={{ marginTop: 4, padding: 4, fontSize: 14, fontFamily: "var(--display)" }}><option>VIP</option><option>Loyal</option><option>Returning</option><option>New</option></select></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div>
              <h4 className="eyebrow" style={{ marginBottom: 12 }}>Order history</h4>
              {orders.length === 0 && <div style={{ padding: 16, background: "var(--ivory)", borderRadius: 4, fontSize: 12, color: "var(--charcoal-soft)" }}>No orders found in the current dataset.</div>}
              {orders.map(o => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid var(--line)", fontSize: 13 }}>
                  <div><div className="mono strong">{o.id}</div><div style={{ fontSize: 11, color: "var(--charcoal-soft)" }}>{o.date}</div></div>
                  <div style={{ textAlign: "right" }}><div>{fmtLKR(o.total)}</div><div style={{ marginTop: 4 }}><StatusPill s={o.status}/></div></div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="eyebrow" style={{ marginBottom: 12 }}>Internal notes</h4>
              <textarea className="form-text" rows="6" placeholder="VIP preferences, sizing notes, gift recipient names — visible to studio only." value={note} onChange={e => setNote(e.target.value)} onBlur={saveNote}/>

              <h4 className="eyebrow" style={{ marginTop: 24, marginBottom: 12 }}>Default address</h4>
              <div style={{ padding: 14, background: "var(--ivory)", borderRadius: 4, fontSize: 13, lineHeight: 1.7, color: "var(--charcoal-soft)" }}>
                {customer.name}<br/>
                42 Westbourne Grove<br/>
                London W11<br/>
                {customer.country}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-secondary btn-sm" style={{ marginRight: "auto" }} onClick={() => window.open(`mailto:${customer.email}?subject=A note from Filamour`)}>Email customer</button>
          <a href={`https://wa.me/447000000000?text=Hi%20${encodeURIComponent(customer.name.split(" ")[0])}`} target="_blank" className="btn btn-secondary btn-sm">WhatsApp</a>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { OrdersSection, BespokeSection, ProductsSection, ProductEditor, CustomersSection, OrderDrawer, CustomerDrawer, RefundModal, mergedOrders, mergedCustomers, persistAdminOrder, downloadCSV });
