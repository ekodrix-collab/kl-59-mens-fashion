"use client";

import { useEffect } from "react";

export function PWARegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // SW registered
          })
          .catch((error) => {
            console.error("SW registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}
