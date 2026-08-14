# Purelane Shopify Theme: Build Notes

This document provides a technical comparison between the original static HTML prototype (`reference/purelane-homepage.html`) and the compiled, production-ready Shopify theme architecture.

## Comparison & Design Parity

| Feature Component | Prototype Limitation | Production Theme Implementation |
| :--- | :--- | :--- |
| **Product Catalogs** | Hardcoded text and flat HTML assets | Shopify standard Product schema rendering dynamic variants, pricing, and images. |
| **Grid Sizing** | Unconstrained layout values | Normalized `.shot` bounding frames at exactly `150px` height with uniform image containment styles. |
| **Visual Cinematics** | Hardcoded water effect filters | SVG `feTurbulence` filter variables bound under dynamic scroll offset controls. |
| **Accessibility (a11y)** | Missing keyboard controls and roles | Standard interactive keyboard routing, label escape tags, and paused animation modes for `prefers-reduced-motion`. |
| **Performance** | Massive unoptimized image blocks | High performance lazy loading, image containment dimensions, and minimized styles. |
