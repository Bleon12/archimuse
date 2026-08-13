# Deploy ArchiMuse on Render + MongoDB Atlas

## 1) MongoDB Atlas

1. Create a free account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (Free M0)
3. **Database Access** → Add user (username + password)
4. **Network Access** → Add IP Address → `0.0.0.0/0` (allow from anywhere; needed for Render)
5. **Database** → Connect → Drivers → copy the connection string

Example:

```text
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/archimuse?retryWrites=true&w=majority
```

Replace `USER`, `PASSWORD`, and keep database name `archimuse`.

## 2) Push code to GitHub

Render deploys from GitHub. If the repo is not online yet:

```bash
git add .
git commit -m "Prepare ArchiMuse for Render deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

Do **not** commit `.env`.

## 3) Deploy on Render

### Option A — Blueprint (recommended)

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. **New** → **Blueprint**
3. Connect the GitHub repo
4. Render reads `render.yaml`
5. When asked for `MONGO_URI`, paste your Atlas connection string
6. Deploy

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
| `MONGO_URI` | Atlas connection string |
| `SESSION_SECRET` | long random string (32+ chars) |

Render sets `PORT` automatically.

## 4) After deploy

1. Open the Render URL (e.g. `https://archimuse.onrender.com`)
2. Check `/api/health` → should show `"database": "connected"`
3. Seller login (seeded on first start):
   - Email: `seller@archimuse.app`
   - Password: `seller123`
4. Change this password after first login / create your own seller account later

## Notes

- Free Render services sleep after inactivity; first request may take ~30–60s
- Uploaded images are stored on the server disk and can be lost on redeploy (ephemeral disk). For production later, use Cloudinary or S3
- Local Mongo (`127.0.0.1`) does **not** work on Render — Atlas is required
