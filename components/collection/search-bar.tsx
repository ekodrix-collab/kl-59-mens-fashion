"use client";

import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
    return (
        <div className={cn("relative w-full max-w-md", className)}>
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-gold transition-colors duration-300" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-dark-soft border border-dark-border focus:border-gold px-12 py-3.5 text-sm text-white placeholder:text-subtle transition-all duration-300 outline-none focus:ring-1 focus:ring-gold/20"
                />
                <AnimatePresence>
                    {value && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => onChange("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle bottom underline animation on focus */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-dark-border overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{ x: value ? 0 : "-100%" }}
                    className="w-full h-full bg-gold"
                />
            </div>
        </div>
    );
}
