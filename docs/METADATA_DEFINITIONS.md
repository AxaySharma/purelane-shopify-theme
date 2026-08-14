# Purelane Shopify Theme: Metadata Definitions

Complete schema specifications mapping the custom metadata extensions defined inside the Shopify storefront theme.

## Metafields

### Product Metafields (`custom`)

| Namespace & Key | Type | Description |
| :--- | :--- | :--- |
| `custom.promo_badge` | `single_line_text_field` | Custom pill label overlaying the product thumbnail image (e.g. "Best seller"). |
| `custom.subtitle` | `single_line_text_field` | Secondary description block clamped directly under the title. |

## Metaobjects

### `combo_item`
- **Fields**:
  - `title` (`single_line_text_field`): Name of the bundle package.
  - `price` (`number_decimal`): Discounted combo price.
  - `items_summary` (`multi_line_text_field`): Narrative block outlining products included.
  - `featured_badge` (`single_line_text_field`): Highlight tag overlay.
