"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Types for filters
export type FilterState = {
    categories: string[];
    priceRanges: string[];
    sizes: string[];
};

interface CollectionSidebarProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    availableCategories: { name: string; slug: string; count: number }[];
    availableSizes: string[];
}

const PRICE_RANGES = [
    { id: "under-1000", label: "Under ₹1000", min: 0, max: 999 },
    { id: "1000-2000", label: "₹1000 - ₹2000", min: 1000, max: 2000 },
    { id: "over-2000", label: "Over ₹2000", min: 2001, max: null },
];

export function CollectionSidebar({ filters, setFilters, availableCategories, availableSizes }: CollectionSidebarProps) {
    const toggleFilter = (type: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    return (
        <div className="w-full flex flex-col gap-10 sticky top-24 font-sans">
            {/* Categories */}
            {availableCategories.length > 0 && (
                <FilterSection title="Categories">
                    {availableCategories.map(cat => (
                        <FilterCheckbox
                            key={cat.slug}
                            label={`${cat.name} (${cat.count})`}
                            checked={filters.categories.includes(cat.slug)}
                            onChange={() => toggleFilter("categories", cat.slug)}
                        />
                    ))}
                </FilterSection>
            )}

            {/* Price */}
            <FilterSection title="Price">
                {PRICE_RANGES.map(range => (
                    <FilterCheckbox
                        key={range.id}
                        label={range.label}
                        checked={filters.priceRanges.includes(range.id)}
                        onChange={() => toggleFilter("priceRanges", range.id)}
                    />
                ))}
            </FilterSection>

            {/* Sizes */}
            {availableSizes.length > 0 && (
                <FilterSection title="Size">
                    <div className="grid grid-cols-4 gap-2">
                        {availableSizes.map(size => (
                            <button
                                key={size}
                                onClick={() => toggleFilter("sizes", size)}
                                className={cn(
                                    "py-2.5 text-[11px] font-sans border transition-colors uppercase tracking-wider",
                                    filters.sizes.includes(size)
                                        ? "border-gold bg-gold text-black font-semibold"
                                        : "border-dark-border text-muted hover:border-gold hover:text-gold bg-dark-soft"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* Clear Filters */}
            {(filters.categories.length > 0 || filters.priceRanges.length > 0 || filters.sizes.length > 0) && (
                <button
                    onClick={() => setFilters({ categories: [], priceRanges: [], sizes: [] })}
                    className="text-[11px] uppercase tracking-widest text-muted hover:text-white transition-colors text-left font-medium mt-2"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex flex-col gap-5 border-b border-dark-border/50 pb-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full group"
            >
                <h4 className="font-sans text-xs md:text-sm uppercase tracking-widest text-white group-hover:text-gold transition-colors font-medium">
                    {title}
                </h4>
                <ChevronDown className={cn("w-4 h-4 text-muted transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-4 overflow-hidden"
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex items-center gap-4 cursor-pointer group">
            <div className={cn(
                "w-4 h-4 border flex items-center justify-center transition-colors shrink-0",
                checked ? "bg-gold border-gold" : "border-dark-border bg-dark-soft group-hover:border-gold"
            )}>
                {checked && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
            </div>
            <span className={cn(
                "text-[13px] font-body transition-colors",
                checked ? "text-white font-medium" : "text-muted group-hover:text-white"
            )}>
                {label}
            </span>
        </label>
    );
}
