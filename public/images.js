// Filamour image registry — local procedural mockups
// neutral palette, garment silhouettes, editorial flat-lays (no children)

const P = (name) => `assets/img/${name}.png`;

window.IMG = {
  // Editorial heroes
  hero:          P("hero"),
  ourStoryHero:  P("fabric-wide"),
  artisansHero:  P("artisan-work"),

  // Artisan story (home section 4)
  artisanWork:   P("artisan-work"),

  // Shop by occasion (6)
  occasion: {
    christening: P("prod-alba-1"),
    birthday:    P("prod-saffron-1"),
    photoshoot:  P("prod-honeysuckle-1"),
    wedding:     P("prod-rosette-1"),
    newbaby:     P("prod-linen-set-1"),
    eid:         P("folded-stack"),
  },

  // Artisan portraits (3) — abstract craft compositions
  artisanPortraits: [
    P("artisan-work"),
    P("prod-marguerite-2"),
    P("detail-buttons"),
  ],

  // Lookbook (6 mixed)
  lookbook: [
    P("prod-marguerite-1"),
    P("fabric-wide"),
    P("prod-marguerite-2"),
    P("folded-stack"),
    P("prod-alba-1"),
    P("packaging"),
  ],

  // Instagram grid (6 squares)
  ig: [
    P("folded-stack"),
    P("detail-buttons"),
    P("floral"),
    P("prod-floret-2"),
    P("prod-marguerite-2"),
    P("packaging"),
  ],

  // Journal articles
  journal: [
    P("prod-marguerite-2"),
    P("fabric-wide"),
    P("artisan-work"),
  ],

  // Gift Guide packaging
  packaging: P("packaging"),

  // Product photography — per slug, 4 angles each
  products: {
    "marguerite-bishop-dress": [P("prod-marguerite-1"), P("prod-marguerite-2"), P("detail-buttons"), P("floral")],
    "floret-romper":           [P("prod-floret-1"),     P("prod-floret-2"),     P("detail-buttons"), P("packaging")],
    "linen-bloomer-gift-set":  [P("prod-linen-set-1"),  P("packaging"),         P("prod-marguerite-2"), P("floral")],
    "saffron-smocked-set":     [P("prod-saffron-1"),    P("prod-marguerite-2"), P("detail-buttons"), P("folded-stack")],
    "alba-christening-gown":   [P("prod-alba-1"),       P("prod-marguerite-2"), P("detail-buttons"), P("packaging")],
    "rosette-collar-blouse":   [P("prod-rosette-1"),    P("detail-buttons"),    P("prod-marguerite-2"), P("floral")],
    "willow-pinafore":         [P("prod-willow-1"),     P("prod-marguerite-2"), P("detail-buttons"), P("floral")],
    "honeysuckle-day-dress":   [P("prod-honeysuckle-1"),P("prod-marguerite-2"), P("detail-buttons"), P("floral")],
  },
};

window.productImg = function(slug, idx = 0) {
  // 1) Admin-uploaded overrides win (stored as data: URIs in localStorage)
  try {
    const ov = JSON.parse(localStorage.getItem("filamour.products.overrides") || "{}");
    const imgs = ov[slug] && ov[slug].images;
    if (imgs && imgs.length) return imgs[idx % imgs.length];
  } catch {}
  const list = window.IMG.products[slug] || window.IMG.products["marguerite-bishop-dress"];
  return list[idx % list.length];
};
