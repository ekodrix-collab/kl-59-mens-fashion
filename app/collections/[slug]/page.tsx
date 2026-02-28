import { PLACEHOLDER_PRODUCTS, COLLECTION_IMAGES } from "@/lib/data";
import { notFound } from "next/navigation";
import { CollectionLayout } from "@/components/collection/collection-layout";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  // Pass all products so filters can work cross-category
  const allProducts = PLACEHOLDER_PRODUCTS;

  // Check if current slug exists in our data
  const categoryExists = PLACEHOLDER_PRODUCTS.some(p => p.collection.slug === params.slug);

  // Tagline mapping for placeholder
  const taglines: Record<string, string> = {
    denim: "Built to Last",
    shirts: "Sharp & Refined",
    "t-shirts": "Everyday Essential",
    "casual-wear": "Effortless Style",
    formals: "Command the Room",
    pants: "Comfort Meets Style"
  };

  const name = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tagline = taglines[params.slug] || "Premium Collection";
  const image = COLLECTION_IMAGES[params.slug as keyof typeof COLLECTION_IMAGES] || COLLECTION_IMAGES.denim;

  // Only 404 if it's not a known category and has no products
  if (!categoryExists && !taglines[params.slug] && params.slug !== "all") {
    return notFound();
  }

  return (
    <CollectionLayout
      initialProducts={allProducts}
      heroData={{ name, tagline, image }}
      initialCategory={params.slug === "all" ? undefined : params.slug}
    />
  );
}
