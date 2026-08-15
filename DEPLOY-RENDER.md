# Deploy ArchiMuse on Render

## 1) Push code to GitHub

Render deploys from GitHub. If the repo is not online yet:

```bash
git add .
git commit -m "Prepare ArchiMuse for Render deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

Do **not** commit `.env`.

## 2) Deploy on Render

### Option A — Blueprint (recommended)

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. **New** → **Blueprint**
3. Connect the GitHub repo
4. Render reads `render.yaml`
5. Deploy

### Option B — Manual Web Service

1. **New** → **Web Service**
2. Connect the repo
3. Settings:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
4. Environment variables:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | long random string (32+ chars) |

Render sets `PORT` automatically.

## 3) After deploy

1. Open the Render URL (e.g. `https://archimuse.onrender.com`)
2. Check `/api/health` → should show `"database": "json-file"`
3. Seller login (seeded on first start):
   - Email: `seller@archimuse.app`
   - Password: `seller123`
4. Change this password after first login / create your own seller account later

## Notes

- Free Render services sleep after inactivity; first request may take ~30–60s
- Uploaded images are stored on the server disk and can be lost on redeploy (ephemeral disk). For production later, use Cloudinary or S3
- Data is stored in `data/store.json` (simple file database, no MongoDB required)
