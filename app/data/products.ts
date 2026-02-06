export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  priceId: string;
  image: string;
  description: string;
  materials: string[];
  size: string;
  inStock: boolean;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "oakwarden",
    slug: "oakwarden-wolf-totem",
    name: "Oakwarden Wolf Totem",
    subtitle: "Guardian of the northwind trails",
    price: 180,
    priceId: "price_replace_oakwarden",
    image: "/images/wolf-totem.svg",
    description:
      "Carved from storm-fallen oak, this wolf watches over hearth and hall. The grain was left bold to evoke wind-scoured cliffs.",
    materials: ["White oak", "Beeswax finish"],
    size: "9 in tall",
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "greenleaf",
    slug: "greenleaf-bow",
    name: "Greenleaf Bow",
    subtitle: "A keepsake for steadfast rangers",
    price: 140,
    priceId: "price_replace_greenleaf",
    image: "/images/greenleaf-bow.svg",
    description:
      "A wall-mounted bow relief with leaf filigree and hidden runes. Finished with a mossy wash for a forest-worn patina.",
    materials: ["Ash wood", "Verdigris stain"],
    size: "18 in wide",
    inStock: true,
  },
  {
    id: "riverstone",
    slug: "riverstone-pipe",
    name: "Riverstone Pipe",
    subtitle: "For quiet evenings by the fire",
    price: 95,
    priceId: "price_replace_riverstone",
    image: "/images/riverstone-pipe.svg",
    description:
      "A ceremonial pipe carved with river-knot motifs. Smooth edges and a polished stem make it a comfort to hold.",
    materials: ["Cherry wood", "Walnut stem"],
    size: "6 in long",
    inStock: true,
  },
  {
    id: "starforge",
    slug: "starforge-hammer",
    name: "Starforge Hammer",
    subtitle: "Symbol of craft and oath",
    price: 210,
    priceId: "price_replace_starforge",
    image: "/images/starforge-hammer.svg",
    description:
      "A heroic wall plaque with hammered brass inlay. Each rune is hand-burnished to catch candlelight.",
    materials: ["Black walnut", "Brass inlay"],
    size: "14 in tall",
    inStock: true,
    badge: "Limited",
  },
  {
    id: "lothlorien",
    slug: "lothlorien-leaf-brooch",
    name: "Lothlorien Leaf Brooch",
    subtitle: "Token of the golden wood",
    price: 65,
    priceId: "price_replace_lothlorien",
    image: "/images/leaf-brooch.svg",
    description:
      "A delicate leaf brooch carved thin and sealed with natural oils. Lightweight and luminous.",
    materials: ["Linden wood", "Oil finish"],
    size: "3 in tall",
    inStock: true,
  },
  {
    id: "mirkwood",
    slug: "mirkwood-spider-ward",
    name: "Mirkwood Spider Ward",
    subtitle: "Woven knotwork to keep the dark at bay",
    price: 120,
    priceId: "price_replace_mirkwood",
    image: "/images/spider-ward.svg",
    description:
      "A protective wall talisman with interlaced knotwork. Burnished edges bring the pattern forward.",
    materials: ["Maple", "Charred detailing"],
    size: "8 in wide",
    inStock: true,
  },
];

export const featuredProduct = products[0];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
