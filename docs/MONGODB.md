# MongoDB catalog & admin API

Your React site can read **categories** and **products** from **your MongoDB** via the `server/` API. WordPress remains a **fallback** for product lists until you import products into MongoDB.

## 1. Add your connection string

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and set `MONGODB_URI` to the string you will provide (MongoDB Atlas or your own server).

## 2. Install and run the API

```bash
cd server
npm install
npm run dev
```

In another terminal, run the Vite app as usual (`npm run dev` from the repo root).

## 3. Seed categories (one time)

This copies the current category tree from `src/content/productCategories.ts` into MongoDB (with `legacyWcCategoryId` for WooCommerce fallback):

```bash
cd server
npm run seed
```

## 4. Create your first admin user

Only works while the `users` collection is empty:

```bash
curl -X POST http://localhost:3001/api/admin/users/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@altronindia.com","password":"your-secure-password"}'
```

Or set `ADMIN_API_KEY` in `server/.env` and send `X-Admin-Key` on admin routes (no UI yet).

## 5. Admin API (until you build `/admin` UI)

| Action | Method | Path |
|--------|--------|------|
| Login | POST | `/api/admin/login` → `{ token }` |
| Add category | POST | `/api/admin/categories` |
| Update category | PATCH | `/api/admin/categories/:id` |
| Add product | POST | `/api/admin/products` |
| Update product | PATCH | `/api/admin/products/:id` |

Auth: `Authorization: Bearer <token>` from login, **or** `X-Admin-Key: <ADMIN_API_KEY>`.

**Product body example:**

```json
{
  "slug": "axi-ipc-b20w-1820",
  "title": "AXI IPC B20W 1820",
  "excerptHtml": "<p>Short description</p>",
  "contentHtml": "<p>Full description</p>",
  "imageUrl": "https://yoursite.com/uploads/product.jpg",
  "catalogueUrl": "https://yoursite.com/catalogues/b20w.pdf",
  "categoryId": "<MongoDB category _id>",
  "published": true
}
```

## 6. Public API (used by the React app)

- `GET /api/catalog/health` — MongoDB available?
- `GET /api/catalog/tree` — nav + `/products` structure
- `GET /api/products?categoryId=<mongoId>`
- `GET /api/products/:slug`

## 7. Next steps

1. Import existing WooCommerce products into MongoDB (script TBD or manual via admin API).
2. Build a React **Admin** section (`/admin`) that calls the same endpoints with forms and file upload.
3. Store images/PDFs on S3, Cloudinary, or `public/uploads` and save URLs on the product document.

## Collections

| Collection | Purpose |
|------------|---------|
| `categories` | Nested menu (`parent` → ObjectId) |
| `products` | Catalog items linked to `categoryId` |
| `users` | Admin logins |
