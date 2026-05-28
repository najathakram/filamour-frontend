// Filamour sample data
window.FILAMOUR_DATA = {
  products: [
    {
      slug: "marguerite-bishop-dress",
      name: "The Marguerite Bishop Dress",
      desc: "Bishop dress in ivory organic cotton-muslin, gathered through the chest so nothing pulls and nothing pinches",
      category: "Dresses",
      occasion: "Christening & Baptism",
      sizes: ["NB","3M","6M","12M","18M","2T","3T"],
      sizesAvail: ["NB","3M","6M","12M","18M","2T","3T"],
      oos: ["18M"],
      lowStock: { "3M": 2, "6M": 1 },
      priceLKR: 16500,
      avail: { type: "made", days: 8 },
      maker: "Studio 01",
      badge: "Bestseller",
      tone: "ivory",
    },
    {
      slug: "floret-romper",
      name: "The Floret Romper",
      desc: "Soft-yoked romper in organic cotton — the kind of piece you reach for every morning",
      category: "Rompers",
      occasion: "Everyday Luxury",
      sizes: ["NB","3M","6M","12M","18M"],
      sizesAvail: ["NB","3M","6M","12M","18M"],
      oos: [],
      priceLKR: 12000,
      avail: { type: "ready" },
      maker: "Studio 02",
      badge: "New",
      tone: "blush",
    },
    {
      slug: "linen-bloomer-gift-set",
      name: "The Linen-Cotton Gift Set",
      desc: "Top, bloomers and bonnet in organic linen-cotton, packed in a keepsake box and ready to gift",
      category: "Gift Sets",
      occasion: "New Baby Gift",
      sizes: ["NB","3M","6M"],
      sizesAvail: ["NB","3M","6M"],
      oos: [],
      priceLKR: 9500,
      avail: { type: "ready" },
      maker: "Studio 01",
      badge: null,
      tone: "rose",
    },
    {
      slug: "saffron-smocked-set",
      name: "The Saffron Set",
      desc: "Top and bloomer set in saffron organic cotton-muslin — for the photo your family will keep on the wall",
      category: "Sets",
      occasion: "First Birthday",
      sizes: ["12M","18M","2T","3T"],
      sizesAvail: ["12M","18M","2T","3T"],
      oos: ["2T"],
      lowStock: { "12M": 1 },
      priceLKR: 14800,
      avail: { type: "made", days: 10 },
      maker: "Studio 03",
      badge: "Limited",
      tone: "saffron",
    },
    {
      slug: "alba-christening-gown",
      name: "The Alba Christening Gown",
      desc: "Heirloom gown in organic cotton with a hand-finished lace trim, soft enough to sleep in",
      category: "Dresses",
      occasion: "Christening & Baptism",
      sizes: ["NB","3M","6M","12M"],
      sizesAvail: ["NB","3M","6M","12M"],
      oos: [],
      priceLKR: 19500,
      avail: { type: "made", days: 12 },
      maker: "Studio 01",
      badge: "Signature",
      tone: "ivory",
    },
    {
      slug: "rosette-collar-blouse",
      name: "The Rosette Collar Blouse",
      desc: "Collar blouse in fine organic cotton-muslin — light enough for summer, layered easily under everything else",
      category: "Tops",
      occasion: "Family Photoshoot",
      sizes: ["2T","3T","4T","5T"],
      sizesAvail: ["2T","3T","4T","5T"],
      oos: [],
      priceLKR: 10200,
      avail: { type: "ready" },
      maker: "Studio 02",
      badge: null,
      tone: "blush",
    },
    {
      slug: "willow-pinafore",
      name: "The Willow Pinafore",
      desc: "Reversible pinafore in dusty rose organic linen — wears in beautifully, holds shape, no fuss",
      category: "Dresses",
      occasion: "Everyday Luxury",
      sizes: ["12M","18M","2T","3T","4T"],
      sizesAvail: ["12M","18M","2T","3T","4T"],
      oos: [],
      priceLKR: 13400,
      avail: { type: "ready" },
      maker: "Studio 03",
      badge: "New",
      tone: "rose",
    },
    {
      slug: "honeysuckle-day-dress",
      name: "The Honeysuckle Day Dress",
      desc: "Cap-sleeve day dress in organic cotton-muslin — breathes in summer, layers under a cardigan in winter",
      category: "Dresses",
      occasion: "Family Photoshoot",
      sizes: ["6M","12M","18M","2T","3T"],
      sizesAvail: ["6M","12M","18M","2T","3T"],
      oos: ["12M","3T"],
      lowStock: { "18M": 1 },
      priceLKR: 15200,
      avail: { type: "made", days: 8 },
      maker: "Studio 02",
      badge: null,
      tone: "honey",
    },
  ],

  // Kept for backward compat with any code referencing FILAMOUR_DATA.artisans;
  // not surfaced anywhere in the new copy.
  artisans: [],

  occasions: [
    { id: "christening", label: "Christening", icon: "candle" },
    { id: "birthday", label: "First Birthday", icon: "cake" },
    { id: "photoshoot", label: "Family Photoshoot", icon: "camera" },
    { id: "wedding", label: "Wedding", icon: "flower" },
    { id: "gifting", label: "Gifting", icon: "gift" },
    { id: "everyday", label: "Everyday", icon: "sun" },
  ],

  rates: { LKR: 1, GBP: 1/360, USD: 1/295 },
  symbols: { LKR: "LKR ", GBP: "£", USD: "$" },
};

// ===== Admin overrides — merge localStorage edits into the live catalogue =====
// The dashboard at /admin saves product edits into localStorage under
// `filamour.products.overrides`. On boot, we merge them in so the storefront
// reflects admin changes immediately. Acts as a thin in-browser "backend" for
// staging; swap for a real API call when wiring Railway.
(function mergeAdminOverrides() {
  try {
    const overrides = JSON.parse(localStorage.getItem("filamour.products.overrides") || "{}");
    Object.keys(overrides).forEach(slug => {
      const o = overrides[slug];
      const idx = window.FILAMOUR_DATA.products.findIndex(p => p.slug === slug);
      if (o._deleted) {
        if (idx >= 0) window.FILAMOUR_DATA.products.splice(idx, 1);
      } else if (idx >= 0) {
        window.FILAMOUR_DATA.products[idx] = { ...window.FILAMOUR_DATA.products[idx], ...o };
      } else {
        window.FILAMOUR_DATA.products.push(o);
      }
    });
  } catch {}
})();

window.fmtPrice = function(lkr, ccy) {
  const r = window.FILAMOUR_DATA.rates[ccy];
  const sym = window.FILAMOUR_DATA.symbols[ccy];
  const val = lkr * r;
  if (ccy === "LKR") return sym + Math.round(val).toLocaleString();
  return sym + val.toFixed(0);
};
