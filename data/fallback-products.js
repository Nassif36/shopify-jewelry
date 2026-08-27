const image = (id, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=88`;

export const fallbackProducts = [
  {
    id: "gid://demo/1",
    handle: "celeste-dome-ring",
    title: "Celeste Dome Ring",
    description:
      "A softly sculpted dome ring, polished by hand to catch the light from every angle.",
    price: 128,
    compareAtPrice: 148,
    currency: "USD",
    images: [
      image("1605100804763-247f67b3557e"),
      image("1611652022419-a9419f74343d")
    ],
    variants: [
      { id: "v1-6", title: "6 / Gold", available: true, price: 128, selectedOptions: { Size: "6", Material: "Gold" } },
      { id: "v1-7", title: "7 / Gold", available: true, price: 128, selectedOptions: { Size: "7", Material: "Gold" } },
      { id: "v1-8", title: "8 / Gold", available: false, price: 128, selectedOptions: { Size: "8", Material: "Gold" } }
    ],
    options: [
      { name: "Size", values: ["6", "7", "8"] },
      { name: "Material", values: ["Gold"] }
    ],
    available: true,
    tags: ["bestseller", "gold"],
    vendor: "Maison Lune",
    productType: "Rings",
    collection: "rings"
  },
  {
    id: "gid://demo/2",
    handle: "aurelia-pearl-drops",
    title: "Aurelia Pearl Drops",
    description:
      "Luminous freshwater pearls suspended from slender vermeil hooks. Each pair is naturally unique.",
    price: 96,
    compareAtPrice: null,
    currency: "USD",
    images: [
      image("1535632066927-ab7c9ab60908"),
      image("1599643478518-a784e5dc4c8f")
    ],
    variants: [{ id: "v2", title: "Default", available: true, price: 96, selectedOptions: {} }],
    options: [],
    available: true,
    tags: ["new", "pearl"],
    vendor: "Maison Lune",
    productType: "Earrings",
    collection: "earrings"
  },
  {
    id: "gid://demo/3",
    handle: "solstice-chain",
    title: "Solstice Chain",
    description:
      "A fluid chain with a quiet glow, designed to rest just below the collarbone.",
    price: 164,
    compareAtPrice: null,
    currency: "USD",
    images: [
      image("1599643477877-530eb83abc8e"),
      image("1617038260897-41a1f14a8ca0")
    ],
    variants: [
      { id: "v3-16", title: "16 in", available: true, price: 164, selectedOptions: { Length: "16 in" } },
      { id: "v3-18", title: "18 in", available: true, price: 170, selectedOptions: { Length: "18 in" } }
    ],
    options: [{ name: "Length", values: ["16 in", "18 in"] }],
    available: true,
    tags: ["bestseller"],
    vendor: "Maison Lune",
    productType: "Necklaces",
    collection: "necklaces"
  },
  {
    id: "gid://demo/4",
    handle: "flora-signette",
    title: "Flora Signette",
    description:
      "A petite botanical signet, inspired by pressed flowers found between old book pages.",
    price: 118,
    compareAtPrice: null,
    currency: "USD",
    images: [
      image("1603561596112-db1d5d140b8c"),
      image("1602173574767-37ac01994b2a")
    ],
    variants: [
      { id: "v4-6", title: "6", available: true, price: 118, selectedOptions: { Size: "6" } },
      { id: "v4-7", title: "7", available: true, price: 118, selectedOptions: { Size: "7" } },
      { id: "v4-8", title: "8", available: true, price: 118, selectedOptions: { Size: "8" } }
    ],
    options: [{ name: "Size", values: ["6", "7", "8"] }],
    available: true,
    tags: ["new"],
    vendor: "Maison Lune",
    productType: "Rings",
    collection: "rings"
  },
  {
    id: "gid://demo/5",
    handle: "mira-cuff",
    title: "Mira Cuff",
    description:
      "An open cuff with organic lines, shaped to stack beautifully or stand alone.",
    price: 142,
    compareAtPrice: 168,
    currency: "USD",
    images: [
      image("1573408301185-9146fe634ad0"),
      image("1611591437281-460bfbe1220a")
    ],
    variants: [
      { id: "v5-g", title: "Gold", available: true, price: 142, selectedOptions: { Material: "Gold" } },
      { id: "v5-s", title: "Silver", available: true, price: 132, selectedOptions: { Material: "Silver" } }
    ],
    options: [{ name: "Material", values: ["Gold", "Silver"] }],
    available: true,
    tags: ["sale"],
    vendor: "Maison Lune",
    productType: "Bracelets",
    collection: "bracelets"
  },
  {
    id: "gid://demo/6",
    handle: "luna-medallion",
    title: "Luna Medallion",
    description:
      "A softly textured medallion engraved with a crescent moon and set on a delicate chain.",
    price: 186,
    compareAtPrice: null,
    currency: "USD",
    images: [
      image("1602751584552-8ba73aad10e1"),
      image("1515562141207-7a88fb7ce338")
    ],
    variants: [{ id: "v6", title: "Default", available: true, price: 186, selectedOptions: {} }],
    options: [],
    available: true,
    tags: ["new"],
    vendor: "Maison Lune",
    productType: "Necklaces",
    collection: "necklaces"
  },
  {
    id: "gid://demo/7",
    handle: "petal-hoops",
    title: "Petal Hoops",
    description:
      "Everyday hoops with a subtle petal profile, lightweight enough to wear from morning to evening.",
    price: 88,
    compareAtPrice: null,
    currency: "USD",
    images: [
      image("1635767798638-3e25273a8236"),
      image("1627293509201-cd0c780043e6")
    ],
    variants: [
      { id: "v7-g", title: "Gold", available: true, price: 88, selectedOptions: { Material: "Gold" } },
      { id: "v7-s", title: "Silver", available: true, price: 82, selectedOptions: { Material: "Silver" } }
    ],
    options: [{ name: "Material", values: ["Gold", "Silver"] }],
    available: true,
    tags: ["bestseller"],
    vendor: "Maison Lune",
    productType: "Earrings",
    collection: "earrings"
  },
  {
    id: "gid://demo/8",
    handle: "seraphine-tennis-bracelet",
    title: "Séraphine Tennis Bracelet",
    description:
      "A fine line of hand-set stones with a champagne glow and an heirloom-inspired clasp.",
    price: 248,
    compareAtPrice: null,
    currency: "USD",
    images: [
      image("1619119069152-a2b331eb392a"),
      image("1611085583191-a3b181a88401")
    ],
    variants: [
      { id: "v8-65", title: "6.5 in", available: true, price: 248, selectedOptions: { Length: "6.5 in" } },
      { id: "v8-7", title: "7 in", available: true, price: 248, selectedOptions: { Length: "7 in" } }
    ],
    options: [{ name: "Length", values: ["6.5 in", "7 in"] }],
    available: true,
    tags: ["limited"],
    vendor: "Maison Lune",
    productType: "Bracelets",
    collection: "bracelets"
  }
];

export const collectionEditorial = [
  { handle: "rings", title: "Rings", eyebrow: "Sculptural forms", image: image("1605100804763-247f67b3557e", 1600) },
  { handle: "necklaces", title: "Necklaces", eyebrow: "Close to the heart", image: image("1599643477877-530eb83abc8e", 1600) },
  { handle: "earrings", title: "Earrings", eyebrow: "A little light", image: image("1535632066927-ab7c9ab60908", 1600) },
  { handle: "bracelets", title: "Bracelets", eyebrow: "Quiet statements", image: image("1573408301185-9146fe634ad0", 1600) }
];
