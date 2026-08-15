# Nisja në Netlify (ArchiMuse)

## 1) Lidh repo me Netlify

1. Hap [https://app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. Zgjidh GitHub → repo `Bleon12/archimuse`
4. Build settings (zakonisht lexohen nga `netlify.toml`):
   - **Build command:** `npm install`
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
5. **Site configuration → Environment variables** shto:

| Key | Value |
|---|---|
| `SESSION_SECRET` | string i gjatë random (32+ karaktere) |
| `NODE_ENV` | `production` |

6. Deploy

## 2) Pas deploy

1. Hap site URL → kontrollo `https://YOUR-SITE.netlify.app/api/health`
2. Duhet: `"database":"json-file"`
3. Login shitës (seed):
   - `seller@archimuse.app`
   - `seller123`

## Shënime

- Frontend shërbehet nga `public/`
- API (`/api/*`) shkon te Netlify Function
- Databaza ruhet në `data/store.json` (e thjeshtë, pa MongoDB)
- Repo: https://github.com/Bleon12/archimuse
