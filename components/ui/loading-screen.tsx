"use client";

import { cn } from "@/lib/utils";

interface LoadingScreenProps {
    className?: string;
    fullScreen?: boolean;
}

export function LoadingScreen({ className, fullScreen = true }: LoadingScreenProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-black transition-opacity duration-500",
                fullScreen ? "fixed inset-0 z-[100] min-h-screen w-full" : "min-h-[400px] w-full",
                className
            )}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                    <span className="font-sans font-black text-2xl text-white animate-pulse">KL</span>
                    <span className="w-8 h-[2px] bg-gold animate-pulse" />
                    <span className="font-sans font-black text-2xl text-white animate-pulse">59</span>
                </div>
                <div className="w-32 h-[1px] bg-white/10 overflow-hidden">
                    <div className="w-full h-full bg-gold animate-loading-bar" />
                </div>
            </div>
        </div>
    );
}
