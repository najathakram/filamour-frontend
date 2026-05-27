// ===== DASHBOARD MOCK DATA =====
window.DASH_DATA = {
  kpis: {
    revenue: { value: 1842500, currency: "LKR", delta: 18.4, spark: [12,18,15,22,28,24,32,36,30,42,38,46] },
    orders: { value: 127, delta: 12.0, spark: [4,6,5,8,7,9,11,10,8,12,9,14] },
    aov: { value: 14507, currency: "LKR", delta: 4.2, spark: [14,13,14,15,14,14,15,15,14,15,14,15] },
    bespoke: { value: 8, delta: 0, spark: [1,0,1,2,1,0,2,1,0,1,1,2] },
  },

  orders: [
    { id: "FM-1042", date: "26 May 2026", customer: "Anjali Perera", items: 2, total: 28500, ccy: "LKR", status: "processing", method: "Card", artisan: "Kamala" },
    { id: "FM-1041", date: "26 May 2026", customer: "Sarah Caldwell", items: 1, total: 19500, ccy: "LKR", status: "production", method: "PayPal", artisan: "Kamala" },
    { id: "FM-1040", date: "25 May 2026", customer: "Nadia Rahim", items: 3, total: 41200, ccy: "LKR", status: "shipped", method: "WhatsApp", artisan: "Priya" },
    { id: "FM-1039", date: "25 May 2026", customer: "Megha Sharma", items: 1, total: 16500, ccy: "LKR", status: "delivered", method: "Card", artisan: "Kamala" },
    { id: "FM-1038", date: "24 May 2026", customer: "Olivia Hart", items: 2, total: 24000, ccy: "LKR", status: "delivered", method: "PayPal", artisan: "Priya" },
    { id: "FM-1037", date: "24 May 2026", customer: "Ruwani Silva", items: 1, total: 12000, ccy: "LKR", status: "pending", method: "Bank transfer", artisan: "Nirmala" },
    { id: "FM-1036", date: "23 May 2026", customer: "Charlotte Wei", items: 4, total: 56400, ccy: "LKR", status: "shipped", method: "Card", artisan: "Kamala" },
    { id: "FM-1035", date: "23 May 2026", customer: "Hiruni Bandara", items: 1, total: 9500, ccy: "LKR", status: "delivered", method: "COD", artisan: "Kamala" },
    { id: "FM-1034", date: "22 May 2026", customer: "Priya Mehta", items: 2, total: 28700, ccy: "LKR", status: "cancelled", method: "Card", artisan: "Priya" },
    { id: "FM-1033", date: "22 May 2026", customer: "Aisha Khan", items: 1, total: 14800, ccy: "LKR", status: "delivered", method: "WhatsApp", artisan: "Nirmala" },
  ],

  bespokeRequests: [
    { id: "BSP-018", date: "26 May", customer: "Tanya Wijesinghe", child: "Mira (8m)", occasion: "Christening", needBy: "12 Jun", status: "awaiting-quote" },
    { id: "BSP-017", date: "25 May", customer: "Emily Park", child: "Twins (3m)", occasion: "Newborn gift", needBy: "20 Jun", status: "in-production" },
    { id: "BSP-016", date: "24 May", customer: "Shanthi Rao", child: "Aarav (24m)", occasion: "First birthday", needBy: "4 Jun", status: "confirmed" },
    { id: "BSP-015", date: "22 May", customer: "Dilini Fernando", child: "Maya (3y)", occasion: "Wedding guest", needBy: "30 May", status: "completed" },
  ],

  customers: [
    { id: 1, name: "Anjali Perera", email: "anjali.p@gmail.com", country: "Sri Lanka", orders: 6, spent: 142000, tier: "Loyal" },
    { id: 2, name: "Sarah Caldwell", email: "sarah.c@hartmail.co.uk", country: "United Kingdom", orders: 3, spent: 58500, tier: "Returning" },
    { id: 3, name: "Charlotte Wei", email: "cwei@stanford.edu", country: "United States", orders: 4, spent: 96000, tier: "Loyal" },
    { id: 4, name: "Nadia Rahim", email: "n.rahim@outlook.com", country: "Sri Lanka", orders: 8, spent: 184500, tier: "VIP" },
    { id: 5, name: "Olivia Hart", email: "olivia@hartstudio.uk", country: "United Kingdom", orders: 2, spent: 38000, tier: "New" },
    { id: 6, name: "Megha Sharma", email: "megha.s@gmail.com", country: "India", orders: 1, spent: 16500, tier: "New" },
  ],

  payments: [
    { id: "txn_8K2pq9", date: "26 May 2026", order: "FM-1042", method: "Stripe · Card", gross: 28500, fee: 950, net: 27550, status: "captured" },
    { id: "txn_8K1mn4", date: "26 May 2026", order: "FM-1041", method: "PayPal", gross: 19500, fee: 780, net: 18720, status: "captured" },
    { id: "txn_8K0xz1", date: "25 May 2026", order: "FM-1040", method: "Bank · WhatsApp", gross: 41200, fee: 0, net: 41200, status: "captured" },
    { id: "txn_8Jvbn7", date: "25 May 2026", order: "FM-1039", method: "Stripe · Card", gross: 16500, fee: 550, net: 15950, status: "captured" },
    { id: "txn_8Juop3", date: "24 May 2026", order: "FM-1038", method: "PayPal", gross: 24000, fee: 960, net: 23040, status: "captured" },
    { id: "txn_8JtaB9", date: "22 May 2026", order: "FM-1034", method: "Stripe · Card", gross: 28700, fee: 957, net: -28700, status: "refunded" },
  ],

  payouts: [
    { id: "po_24", date: "20 May 2026", to: "BOC ****8203", method: "Bank transfer", amount: 642800, status: "paid" },
    { id: "po_23", date: "06 May 2026", date2: true, to: "BOC ****8203", method: "Bank transfer", amount: 580400, status: "paid" },
    { id: "po_22", date: "22 Apr 2026", to: "BOC ****8203", method: "Bank transfer", amount: 712050, status: "paid" },
  ],

  topProducts: [
    { name: "Marguerite Bishop Dress", units: 32, revenue: 528000 },
    { name: "Alba Christening Gown", units: 18, revenue: 351000 },
    { name: "Floret Romper", units: 26, revenue: 312000 },
    { name: "Saffron Smocked Set", units: 14, revenue: 207200 },
    { name: "Linen Bloomer Gift Set", units: 19, revenue: 180500 },
  ],

  channels: [
    { name: "Website (direct)", value: 48, color: "var(--gold)" },
    { name: "WhatsApp", value: 28, color: "var(--dusty-rose)" },
    { name: "Instagram", value: 16, color: "var(--charcoal)" },
    { name: "Referral", value: 8, color: "var(--blush)" },
  ],

  countries: [
    { c: "Sri Lanka", v: 62 }, { c: "United Kingdom", v: 18 }, { c: "United States", v: 10 }, { c: "India", v: 6 }, { c: "Other", v: 4 },
  ],

  seo: {
    "/": { title: "Filamour · Hand-smocked children's wear from Sri Lanka", description: "Heirloom hand-smocked clothing for newborn to T5, crafted in fine muslin and organic cotton by skilled artisans in Sri Lanka.", canonical: "https://filamour.com/", indexable: true },
    "/shop": { title: "Shop · Filamour", description: "The complete Filamour collection of hand-smocked dresses, rompers, gift sets and bespoke pieces.", canonical: "https://filamour.com/shop", indexable: true },
    "/our-story": { title: "Our Story · Filamour", description: "Filamour was founded to bring back the slow, honest craft of hand smocking. Read about the workshop and the artisans who make every piece.", canonical: "https://filamour.com/our-story", indexable: true },
    "/artisans": { title: "The Artisans · Filamour", description: "Meet Kamala, Priya and Nirmala — the artisans behind every Filamour piece. Decades of craft, named by hand.", canonical: "https://filamour.com/artisans", indexable: true },
    "/gift-guide": { title: "Gift Guide · Filamour", description: "Beautifully wrapped, hand-smocked gifts for new babies, first birthdays and christenings. Free gift wrapping on all orders.", canonical: "https://filamour.com/gift-guide", indexable: true },
  },

  shippingZones: [
    { id: 1, name: "Sri Lanka", region: "Domestic", flat: "LKR 800", free: "Over LKR 15,000", eta: "2-5 days" },
    { id: 2, name: "United Kingdom & EU", region: "International", flat: "GBP 60 (EMS)", free: "Over GBP 120", eta: "7-14 days" },
    { id: 3, name: "United States & Canada", region: "International", flat: "USD 75 (EMS)", free: "Over USD 150", eta: "7-14 days" },
    { id: 4, name: "Express (worldwide)", region: "Premium", flat: "From GBP 90 (DHL)", free: "—", eta: "3-5 days" },
  ],

  discounts: [
    { code: "WELCOME10", off: "10% off first order", uses: 184, limit: "—", expires: "—", status: "active" },
    { code: "BABY25", off: "25% off New Baby Gift Sets", uses: 42, limit: 200, expires: "30 Jun 2026", status: "active" },
    { code: "EID2025", off: "15% off Eid collection", uses: 96, limit: 100, expires: "12 Apr 2025", status: "expired" },
  ],

  reviews: [
    { id: 1, name: "Anjali P.", rating: 5, product: "Marguerite Bishop Dress", body: "Impossibly soft. The smocking is exquisite — it photographs beautifully and washes well. We're keeping ours for her sister.", status: "approved" },
    { id: 2, name: "Sarah C.", rating: 5, product: "Alba Christening Gown", body: "Worth every pound. Quality you simply cannot find elsewhere.", status: "approved" },
    { id: 3, name: "Olivia H.", rating: 4, product: "Floret Romper", body: "Beautiful piece. Shipping to the UK took a touch longer than expected.", status: "pending" },
  ],
};
