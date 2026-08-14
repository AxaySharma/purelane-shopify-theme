# Purelane Shopify Theme

A highly custom, glassmorphic theme build combining advanced water scene cinematics and custom section arrays for Indian homecare brand Purelane.

## Technology Stack
- **Liquid**: Shopify templating language.
- **CSS**: Custom vanilla layouts scoped and prefixed for isolation.
- **Javascript**: Scroll-driven scene selectors and automatic carousels.
- **Testing**: Playwright visual verification check scripts.

## Getting Started

### Local Development
To serve and preview changes locally using the Shopify CLI tool:
```bash
shopify theme dev
```

### Verification Scripts
Ensure markup structures and layout alignments pass tests before pushing:
```bash
# Verify balancing of HTML tags
node scripts/verify-theme.js

# Verify CSS style rules and bounding box metrics
node scripts/visual-compare.js
```
