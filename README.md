# Lauviere — Shopify Theme

Custom Shopify Online Store 2.0 theme for Lauviere: anti-tarnish, waterproof,
18k gold-plated jewellery and handmade quilted bags.

Ported from the original static prototype (preserved in `prototype/`).

## Structure

- `layout/theme.liquid` — page shell: fonts, CSS/JS, header/footer groups, cart drawer
- `sections/` — homepage sections (hero, values, collection cards, featured collections, banner, story, testimonials, newsletter) and main templates for product/collection/cart/page/search/blog/404
- `snippets/product-card.liquid` — product card used across all grids; falls back to gold line-art SVG when a product has no photo
- `snippets/cart-drawer.liquid` — slide-out cart, powered by the Shopify AJAX Cart API (`assets/theme.js`)
- `templates/*.json` — Online Store 2.0 JSON templates
- `config/settings_schema.json` — theme settings (free shipping threshold)

## Install

1. Zip the theme: `zip -r lauviere-theme.zip layout assets snippets sections templates config locales`
2. Shopify admin → Online Store → Themes → Add theme → Upload zip
3. Set navigation menus (main-menu, footer) in admin → Navigation
4. In the theme editor, assign a collection to each "Featured collection" and "Collection card" section
5. The cart drawer free-shipping message threshold is in Theme settings → Shipping — keep it in sync with your real shipping rates

## Notes

- Product photos: products without images show a placeholder SVG, so the store works before photography is ready.
- Testimonials section ships empty — add real customer reviews as blocks in the theme editor.
- The prototype's fake purchase-notification toast was intentionally not ported: fabricated social proof on a live store misleads customers and violates consumer-protection rules in most markets (including the ACCC in Australia).
