# Nisja në Netlify (ArchiMuse)

## 1) MongoDB Atlas (e detyrueshme)

1. Hap [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Krijo cluster Free (M0)
3. Database Access → user + password
4. Network Access → `0.0.0.0/0`
5. Kopjo connection string, p.sh.:

```text
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/archimuse?retryWrites=true&w=majority
```

## 2) Lidh repo me Netlify

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
| `MONGO_URI` | Atlas connection string |
| `SESSION_SECRET` | string i gjatë random (32+ karaktere) |
| `NODE_ENV` | `production` |

6. Deploy

## 3) Pas deploy

1. Hap site URL → kontrollo `https://YOUR-SITE.netlify.app/api/health`
2. Duhet: `"database":"connected"`
3. Login shitës (seed):
   - `seller@archimuse.app`
   - `seller123`

## Shënime

- Frontend shërbehet nga `public/`
- API (`/api/*`) shkon te Netlify Function
- Upload-et ruhen si imazhe në MongoDB (data URL) që të funksionojnë në serverless
- Repo: https://github.com/Bleon12/archimuse
