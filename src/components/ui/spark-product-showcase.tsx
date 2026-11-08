import SneakerProductHero from './sneaker-product-hero';
import type { Product, ProductShelfProps } from './skincare-product-shelf';

// Use the supplied component's choreography with the existing catalogue and cart.
const tones = [
  ['#e78308', '#f1a14b'], ['#63218b', '#aa82cc'],
  ['#073763', '#6b97c7'], ['#e55e36', '#ee937e'],
];
export function SparkProductShowcase({products, onAdd, className}: ProductShelfProps) {
  if (!products.length) return null;
  const variants = products.map((product: Product, i: number) => ({
    name: product.name, src: product.image,
    swatch: tones[i % tones.length][0], tint: tones[i % tones.length][1], product,
    gallery: [
      {src: product.image, label: `${product.name} — product photograph`},
      {src: product.image, label: `${product.name} — label close-up`, zoom: 1.5, focus: [0.5, 0.45] as [number, number]},
      {src: product.image, label: `${product.name} — packaging detail`, zoom: 1.8, focus: [0.5, 0.7] as [number, number]},
    ],
  }));
  return <div className={`spark-showcase ${className ?? ''}`}>
    <SneakerProductHero key={products.map(p => p.slug).join(',')}
      variants={variants} sizes={[{label:'1'},{label:'2'},{label:'3'}]}
      currency="₹" rating={0} reviews={0} height="min(750px, 85svh)"
      likeColor="#63218b" toast="Added to your cart"
      onAddToCart={({variant, size}) => {
        const selected = products.find(p => p.slug === variant.product?.slug);
        if (selected && selected.price != null && !selected.coming) onAdd(selected, Number(size));
      }}/>
  </div>;
}
