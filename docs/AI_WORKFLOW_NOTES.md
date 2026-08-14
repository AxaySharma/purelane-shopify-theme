# Purelane Shopify Theme: AI Workflow Notes

A retrospective documentation of the agentic AI workflow, design failure recovery paths, and optimization processes implemented for the Purelane Shopify Theme.

## Retrospective

- **Schema URL Validation Recovery**: Identified that Shopify schema blocks reject default values for settings of `"type": "url"`. Resolved by removing `"default": "#hash"` fields from settings blocks, shifting link defaults into Liquid template checks using the `| default: ...` filter.
- **Dynamic Block Rendering**: Transitioned block rendering from localized preset defaults to explicit instantiation inside `templates/index.json` to guarantee immediate render capabilities on storefront initializations.
- **Visual Validation Engine**: Expanded a Playwright visual verification script (`scripts/visual-compare.js`) to capture element layouts, element parity check marks, and visibility states, ensuring robust local testing before git pushes.
