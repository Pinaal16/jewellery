# Lauviere — Shopify Theme

Custom Shopify Online Store 2.0 theme for Lauviere — necklaces, earrings
and bracelets.

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
6. The wordmark comes from Theme settings → Brand → Brand name, so it reads "LAUVIERE" regardless of the Shopify store name. Rename the store itself in Shopify admin → Settings → Store details (this also fixes order emails and receipts).

## Claims policy

Nothing in this theme asserts anything about the product. Every default was
written to be safe to publish before a supplier has confirmed anything.

Material and performance claims — gold plating and its carat, anti-tarnish,
waterproof or water resistant, hypoallergenic, nickel free — are enforceable
representations under Australian Consumer Law. Only add them once the supplier
has confirmed them in writing, and keep that confirmation.

The same applies to social proof: star ratings, customer counts and
testimonials must come from real orders. The prototype's fake
purchase-notification toast and its invented statistics were deliberately not
carried over, and the testimonials section ships empty.

## Notes

- Products without images fall back to a gold line-art placeholder, so the
  store looks intentional before photography is ready.
- Fonts come from Shopify's own library via `font_picker`, so they can be
  changed in Theme settings → Typography with no code edit and no external
  font request.
