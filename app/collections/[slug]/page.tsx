"use client";
import { notFound } from "next/navigation";
import { CollectionLayout } from "@/components/collection/collection-layout";
import { useProducts } from "@/hooks/use-products";
import { useOffers } from "@/hooks/use-offers";
import { useCategories } from "@/hooks/use-categories";
import { Loader2 } from "lucide-react";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  // Fetch all products on this page to support sidebar category switching
  // but we'll initialize the layout filters to this specific category
  const { productsQuery } = useProducts();
  const { offersQuery } = useOffers();
  const { categoriesQuery } = useCategories();

  const { data: allProducts, isLoading: productsLoading } = productsQuery;
  const { data: offers, isLoading: offersLoading } = offersQuery;
  const { data: categories, isLoading: categoriesLoading } = categoriesQuery;

  if (productsLoading || offersLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  // Find the specific category for the hero metadata
  const currentCategory = categories?.find(c => c.slug === params.slug);

  if (!currentCategory && params.slug !== "all") {
    // Optionally handle 404 if category slug doesn't exist
    // notFound();
  }

  // Process products to include offers and ensure collection metadata is attached
  const processedProducts = allProducts?.map(product => {
    const activeOffer = offers?.find(o => o.offer_type === 'product_offer' && o.product_id === product.id && o.is_active);

    // Check if this product belongs to the current category slug
    const productCategory = product.product_categories?.find(pc => pc.category?.slug === params.slug)?.category
      || product.product_categories?.[0]?.category
      || { name: 'Uncategorized', slug: 'uncategorized', image: null };

    return {
      ...product,
      active_offer: activeOffer,
      collection: productCategory
    };
  }) || [];

  const name = currentCategory?.name || params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const image = currentCategory?.image || "/images/collections/placeholder.jpg";
  const tagline = "Premium Selection";

  return (
    <CollectionLayout
      initialProducts={processedProducts}
      allCategories={categories}
      heroData={{ name, tagline, image }}
      initialCategory={params.slug}
    />
  );
}
