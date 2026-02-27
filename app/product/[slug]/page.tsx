import { ProductGallery, ProductInfo } from "@/components/product/product-details";
import { PLACEHOLDER_PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { FeaturedProducts } from "@/components/home/featured-products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PLACEHOLDER_PRODUCTS.find(p => p.slug === params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <main className="pt-24 md:pt-32 bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Gallery */}
          <div className="w-full lg:w-[55%]">
            <ProductGallery images={product.images} />
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[45%]">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-white font-medium">
            You May Also Like
          </h2>
        </div>
        {/* We can reuse FeaturedProducts or just a simple grid */}
        <FeaturedProducts />
      </div>
    </main>
  );
}
