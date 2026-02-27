"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}

    >
      {children}
    </ReactLenis>
  );
}
