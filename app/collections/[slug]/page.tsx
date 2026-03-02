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
  let processedProducts = allProducts?.map(product => {
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

  // Process combo offers into mock product elements
  const comboOffersAsProducts = offers?.filter(o => o.offer_type === 'combo' && o.is_active).map(offer => {
    const totalMrp = offer.combo_items?.reduce((sum, item) => sum + ((item.product?.mrp || 0) * item.quantity), 0) || offer.combo_price || 0;
    const comboPrice = offer.combo_price || 0;
    const discountPercent = totalMrp > 0 ? Math.round((1 - (comboPrice / totalMrp)) * 100) : 0;

    const defaultImages = offer.combo_items?.filter(ci => ci.product?.images?.[0]).map(ci => ci.product!.images[0]) || [];
    const images = offer.banner_image ? [offer.banner_image] : defaultImages;

    return {
      id: offer.id,
      name: offer.title,
      slug: `combo/${offer.id}`,
      description: offer.description,
      mrp: totalMrp,
      selling_price: comboPrice,
      discount_percent: discountPercent,
      sizes: [],
      colors: [],
      color_images: {},
      images: images,
      is_featured: false,
      is_new_arrival: false,
      is_on_offer: true,
      is_published: true,
      created_at: offer.created_at,
      updated_at: offer.created_at,
      collection: { name: 'Combo Offers', slug: 'combo', image: null },
      is_combo: true,
      combo_items: offer.combo_items,
      active_offer: undefined,
    }
  }) || [];

  processedProducts = [...processedProducts, ...comboOffersAsProducts];

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
