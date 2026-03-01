"use client";

import { useState, useMemo } from "react";
import { CollectionHero } from "./collection-components";
import { ModernProductCard } from "./modern-product-card";
import { CollectionSidebar, FilterState } from "./collection-sidebar";
import { SearchBar } from "./search-bar";
import { Filter, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CollectionLayout({
    initialProducts,
    heroData,
    initialCategory,
    allCategories
}: {
    initialProducts: any[];
    heroData: { name: string; tagline: string; image: string };
    initialCategory?: string;
    allCategories?: any[];
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterState>({
        categories: initialCategory ? [initialCategory] : [],
        priceRanges: [],
        sizes: [],
    });

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Extract available sizes from products
    const availableSizes = useMemo(() => {
        const sizes = new Set<string>();
        initialProducts.forEach(p => p.sizes?.forEach((s: string) => sizes.add(s)));
        return Array.from(sizes).sort();
    }, [initialProducts]);

    // Extract available categories
    const availableCategories = useMemo(() => {
        // If allCategories is provided from DB, use it as the base
        if (allCategories) {
            const categoriesWithCounts = allCategories.map(cat => {
                const count = initialProducts.filter(p =>
                    p.product_categories?.some((pc: any) => pc.category?.slug === cat.slug)
                ).length;
                return { name: cat.name, slug: cat.slug, count };
            });

            // Check if there are any products not matching any of the DB categories
            const dbCategorySlugs = allCategories.map(c => c.slug);
            const uncategorizedProducts = initialProducts.filter(p => {
                const productSlugs = p.product_categories?.map((pc: any) => pc.category?.slug) || [];
                return productSlugs.length === 0 || !productSlugs.some((s: string) => dbCategorySlugs.includes(s));
            });

            if (uncategorizedProducts.length > 0) {
                categoriesWithCounts.push({
                    name: 'Uncategorized',
                    slug: 'uncategorized',
                    count: uncategorizedProducts.length
                });
            }

            return categoriesWithCounts;
        }

        // Fallback: derive from products
        const cats = new Map<string, { name: string, count: number }>();
        initialProducts.forEach(p => {
            if (p.collection) {
                const existing = cats.get(p.collection.slug);
                if (existing) {
                    cats.set(p.collection.slug, { ...existing, count: existing.count + 1 });
                } else {
                    cats.set(p.collection.slug, { name: p.collection.name, count: 1 });
                }
            }
        });
        return Array.from(cats.entries()).map(([slug, data]) => ({ slug, ...data }));
    }, [initialProducts, allCategories]);

    // Apply filters and search
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(p => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    p.name.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query) ||
                    p.collection?.name.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Category filter
            if (filters.categories.length > 0) {
                const productCategorySlugs = p.product_categories?.map((pc: any) => pc.category?.slug) || [];
                const matchesCategory = filters.categories.some(slug =>
                    productCategorySlugs.includes(slug) || p.collection?.slug === slug
                );
                if (!matchesCategory) return false;
            }

            // Price filter
            if (filters.priceRanges.length > 0) {
                const price = p.selling_price;
                const matchesPrice = filters.priceRanges.some(range => {
                    if (range === "under-1000") return price < 1000;
                    if (range === "1000-2000") return price >= 1000 && price <= 2000;
                    if (range === "over-2000") return price > 2000;
                    return false;
                });
                if (!matchesPrice) return false;
            }

            // Size filter
            if (filters.sizes.length > 0) {
                if (!p.sizes || !filters.sizes.some((s: string) => p.sizes.includes(s))) {
                    return false;
                }
            }

            return true;
        });
    }, [initialProducts, filters, searchQuery]);

    return (
        <div className="bg-rich-black min-h-screen">
            <CollectionHero {...heroData} />

            <section className="py-16 md:py-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

                    {/* Mobile Search & Filter Toggle */}
                    <div className="lg:hidden flex flex-col gap-6 mb-12 border-b border-dark-border/50 pb-8">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} className="max-w-none" />
                        <div className="flex justify-between items-center">
                            <p className="font-sans text-[10px] uppercase tracking-widest text-muted">
                                {filteredProducts.length} Results
                            </p>
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-white hover:text-gold transition-colors border border-dark-border py-2 px-4 bg-dark-soft"
                            >
                                <Filter className="w-3 h-3" /> Filters
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block w-1/4 max-w-[280px] shrink-0">
                            <CollectionSidebar
                                filters={filters}
                                setFilters={setFilters}
                                availableCategories={availableCategories}
                                availableSizes={availableSizes}
                            />
                        </aside>

                        {/* Product Grid */}
                        <div className="w-full lg:w-3/4">
                            <div className="hidden lg:flex justify-between items-end mb-12 border-b border-dark-border/50 pb-8">
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-display text-2xl text-white">Products</h2>
                                    <p className="font-sans text-[10px] uppercase tracking-widest text-muted">
                                        Showing {filteredProducts.length} Results
                                    </p>
                                </div>
                                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                                    {filteredProducts.map(product => (
                                        <ModernProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-32 text-center flex flex-col items-center gap-6 border border-dark-border bg-dark-soft/30 p-10">
                                    <p className="font-display text-4xl text-white">No products found</p>
                                    <p className="text-muted font-body text-sm max-w-sm">
                                        {searchQuery
                                            ? `No results for "${searchQuery}". Try a different term or clear filters.`
                                            : "We couldn't find any products matching your current filters."}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setFilters({ categories: [], priceRanges: [], sizes: [] });
                                        }}
                                        className="mt-6 border border-gold bg-transparent text-gold hover:bg-gold hover:text-black py-4 px-10 text-xs uppercase tracking-widest transition-all duration-300 font-medium"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 h-full w-[85vw] sm:w-[380px] bg-rich-black z-50 overflow-y-auto border-l border-dark-border lg:hidden flex flex-col"
                        >
                            <div className="p-6 md:p-8 flex justify-between items-center border-b border-dark-border bg-rich-black sticky top-0 z-10">
                                <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-white">Filters</h3>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-muted hover:text-white transition-colors bg-dark-soft p-2">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 flex-1 overflow-y-auto hide-scrollbar">
                                <CollectionSidebar
                                    filters={filters}
                                    setFilters={setFilters}
                                    availableCategories={availableCategories}
                                    availableSizes={availableSizes}
                                />
                            </div>

                            <div className="p-6 md:p-8 border-t border-dark-border bg-rich-black sticky bottom-0">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-gold hover:bg-gold-light text-black py-4 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-gold/20"
                                >
                                    View {filteredProducts.length} Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
