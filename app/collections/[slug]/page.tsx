"use client";
import { notFound } from "next/navigation";
import { CollectionLayout } from "@/components/collection/collection-layout";
import { useProducts } from "@/hooks/use-products";
import { useOffers } from "@/hooks/use-offers";
import { Loader2 } from "lucide-react";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { productsQuery } = useProducts({ categorySlug: params.slug });
  const { offersQuery } = useOffers();

  const { data: products, isLoading: productsLoading } = productsQuery;
  const { data: offers, isLoading: offersLoading } = offersQuery;

  if (productsLoading || offersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    // If it's a valid slug but has no products, we can still show the layout or 404
    // Checking if any product has this category slug (Supabase filter handles this)
    if (params.slug !== "all") {
      // We could also check if the category exists in the DB here
    }
  }

  // Process products to include offers and ensure collection metadata
  const productsWithOffers = products?.map(product => {
    const activeOffer = offers?.find(o => o.offer_type === 'product_offer' && o.product_id === product.id && o.is_active);
    const category = product.product_categories?.find(pc => pc.category?.slug === params.slug)?.category
      || product.product_categories?.[0]?.category
      || { name: 'Uncategorized', slug: 'uncategorized', image: null };

    return {
      ...product,
      active_offer: activeOffer,
      collection: category
    };
  }) || [];

  // Get category metadata from the first product or fetch separately 
  // For now, we derive name from slug or first product
  const currentCategory = productsWithOffers[0]?.collection;
  const name = currentCategory?.name || params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const image = currentCategory?.image || "/images/collections/placeholder.jpg";
  const tagline = "Premium Selection"; // Could be a DB field later

  return (
    <CollectionLayout
      initialProducts={productsWithOffers}
      heroData={{ name, tagline, image }}
      initialCategory={params.slug}
    />
  );
}
