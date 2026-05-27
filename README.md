# filamour-frontend

Static storefront + admin dashboard for Filamour. Deploys to Vercel.
Talks to the Railway-hosted API in `../filamour-backend`.

## Layout

```
public/
  Filamour.html      ← customer storefront (replace placeholder)
  Dashboard.html     ← admin dashboard   (replace placeholder)
  css/main.css
  js/
    api.js           ← window.FilamourAPI
    cart.js          ← window.FilamourCart  (localStorage cart)
    checkout.js      ← window.FilamourCheckout
    payments.js      ← window.FilamourPayments (PayHere/Koko/PayPal/Stripe/WhatsApp)
vercel.json          ← URL rewrites (/shop, /product/:slug, /admin, etc.)
```

## Local dev

```bash
npx serve public -l 5173
```

Point the JS at a local backend by adding this **before** `api.js` loads:

```html
<script>
  window.__FILAMOUR_API__     = 'http://localhost:3000';
  window.__FILAMOUR_WHATSAPP__ = '94771234567';
</script>
```

## Deploy to Vercel

1. Push to GitHub.
2. vercel.com → Add New Project → import this repo.
3. Framework preset: **Other**. Output directory: `public`.
4. Add env vars (these are exposed to the browser, so only public keys):
   - `VITE_API_URL` — your Railway URL
   - `VITE_PAYPAL_CLIENT_ID`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_PAYHERE_MERCHANT_ID`
5. Add custom domain `filamour.com` in Project Settings → Domains.

## Replacing the placeholder pages

Drop your real `Filamour.html` / `Dashboard.html` into `public/` over the
stubs. Keep the four `<script>` tags from the placeholder at the bottom of
the body so the cart/checkout/payments helpers stay attached to `window`.
