import { PLACEHOLDER_PRODUCTS, COLLECTION_IMAGES } from "@/lib/data";
import { notFound } from "next/navigation";
import { CollectionLayout } from "@/components/collection/collection-layout";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collectionProducts = PLACEHOLDER_PRODUCTS.filter(p => p.collection.slug === params.slug);

  // Tagline mapping for placeholder
  const taglines: Record<string, string> = {
    denim: "Built to Last",
    shirts: "Sharp & Refined",
    "t-shirts": "Everyday Essential",
    "casual-wear": "Effortless Style",
    formals: "Command the Room"
  };

  const name = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tagline = taglines[params.slug] || "Premium Collection";
  const image = COLLECTION_IMAGES[params.slug as keyof typeof COLLECTION_IMAGES] || COLLECTION_IMAGES.denim;

  if (collectionProducts.length === 0 && !taglines[params.slug]) {
    return notFound();
  }

  return (
    <CollectionLayout
      initialProducts={collectionProducts}
      heroData={{ name, tagline, image }}
    />
  );
}
