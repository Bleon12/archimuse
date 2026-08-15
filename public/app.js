const THEME_KEY = "archimuse-theme";
const LANG_KEY = "archimuse-lang";

const I18N = {
  en: {
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.gallery": "Gallery",
    "nav.saved": "Saved",
    "nav.login": "Login",
    "nav.profile": "Profile",
    "home.eyebrow": "Design studio & sales",
    "home.lead": "Browse our designs, like, save, share and buy. Apply for online or cash payment — requests start as pending.",
    "home.ctaShop": "View shop",
    "home.ctaGallery": "Gallery",
    "home.saleTitle": "Designs for sale",
    "home.saleSub": "Open any card to like, comment, share or buy.",
    "home.loading": "Loading designs…",
    "home.empty": "No designs yet. Showing demo catalog.",
    "shop.title": "Design shop",
    "shop.sub": "Browse, like, save, share and buy studio designs.",
    "shop.search": "Search by title or bio…",
    "shop.filter": "Filter",
    "gallery.eyebrow": "Curated collection",
    "gallery.title": "Architecture gallery",
    "gallery.lead": "Featured studio designs ranked by views, likes and trend.",
    "gallery.designs": "designs",
    "gallery.end": "End of gallery",
    "saved.title": "Saved designs",
    "saved.sub": "Your bookmarked studio designs.",
    "saved.empty": "No saved designs yet.",
    "login.title": "Account",
    "login.sub": "Login or register to save designs and place orders.",
    "login.tabLogin": "Login",
    "login.tabRegister": "Register",
    "login.name": "Name",
    "login.password": "Password",
    "profile.title": "My profile",
    "profile.settings": "Settings",
    "profile.orders": "Orders",
    "profile.ordersSub": "Status: pending, confirmed, completed or cancelled.",
    "profile.my": "My designs",
    "profile.liked": "Liked",
    "profile.sellerOrders": "Customer requests",
    "profile.upload": "Upload design",
    "profile.logout": "Logout",
    "profile.save": "Save profile",
    "upload.title": "Upload design for sale",
    "upload.sub": "Seller account only. Set a price and publish to the shop.",
    "upload.designTitle": "Design title",
    "upload.bio": "Description",
    "upload.category": "Category",
    "upload.price": "Price",
    "upload.currency": "Currency",
    "upload.forSale": "For sale",
    "upload.image": "Image",
    "upload.drop": "Drop image here or click to choose",
    "upload.submit": "Upload design",
    "upload.edit": "Edit design",
    "upload.cancel": "Cancel",
    "card.buy": "Buy",
    "card.share": "Share",
    "detail.comments": "Comments",
    "detail.buyNow": "Buy now",
    "detail.noBio": "No description for this design.",
    "detail.commentPh": "Write a comment…",
    "detail.loginComment": "Login to comment",
    "detail.send": "Send",
    "order.title": "Buy request",
    "order.submit": "Send request",
    "forSale": "For sale",
    "admin.title": "Admin panel",
    "admin.sub": "Add designs, manage catalog, and review buy requests from clients.",
    "admin.tabOrders": "Buy requests",
    "admin.tabDesigns": "All designs",
    "admin.tabUpload": "Add design",
    "admin.refresh": "Refresh",
    "admin.gate": "Admin login required.",
    "admin.noOrders": "No buy requests yet.",
    "account.menu": "My account",
    "account.data": "Your account data",
    "account.orders": "My buy requests",
    "buy.needLogin": "Please login to send a buy request to the admin.",
  },
  sq: {
    "nav.home": "Ballina",
    "nav.shop": "Dyqani",
    "nav.gallery": "Galeria",
    "nav.saved": "Të ruajtura",
    "nav.login": "Hyr",
    "nav.profile": "Profili",
    "home.eyebrow": "Studio dizajni & shitje",
    "home.lead": "Shiko dizajnet, pëlqe, ruaj, ndaj dhe blej. Apliko për pagesë online ose cash — kërkesa fillon si në pritje.",
    "home.ctaShop": "Shiko dyqanin",
    "home.ctaGallery": "Galeria",
    "home.saleTitle": "Dizajne në shitje",
    "home.saleSub": "Hap çdo kartë për like, koment, share ose blerje.",
    "home.loading": "Duke ngarkuar dizajnet…",
    "home.empty": "Ende nuk ka dizajne. Po shfaqet katalogu demo.",
    "shop.title": "Dyqani i dizajneve",
    "shop.sub": "Shiko, pëlqe, ruaj, ndaj dhe blej dizajnet e studios.",
    "shop.search": "Kërko sipas titullit ose bio-s…",
    "shop.filter": "Filtro",
    "gallery.eyebrow": "Koleksion i kuruar",
    "gallery.title": "Galeria e arkitekturës",
    "gallery.lead": "Dizajnet e studios sipas shikimeve, pëlqimeve dhe trendit.",
    "gallery.designs": "dizajne",
    "gallery.end": "Fundi i galerisë",
    "saved.title": "Dizajne të ruajtura",
    "saved.sub": "Dizajnet që ke ruajtur.",
    "saved.empty": "Nuk ke ende dizajne të ruajtura.",
    "login.title": "Llogaria",
    "login.sub": "Hyr ose regjistrohu për të ruajtur dhe porositur.",
    "login.tabLogin": "Hyr",
    "login.tabRegister": "Regjistrohu",
    "login.name": "Emri",
    "login.password": "Fjalëkalimi",
    "profile.title": "Profili im",
    "profile.settings": "Cilësimet",
    "profile.orders": "Porositë",
    "profile.ordersSub": "Statusi: në pritje, e konfirmuar, e përfunduar ose e anuluar.",
    "profile.my": "Dizajnet e mia",
    "profile.liked": "Të pëlqyera",
    "profile.sellerOrders": "Kërkesat e klientëve",
    "profile.upload": "Ngarko dizajn",
    "profile.logout": "Dil",
    "profile.save": "Ruaj profilin",
    "upload.title": "Ngarko dizajn për shitje",
    "upload.sub": "Vetëm llogaria e shitësit. Vendos çmim dhe publiko.",
    "upload.designTitle": "Titulli i dizajnit",
    "upload.bio": "Përshkrimi",
    "upload.category": "Kategoria",
    "upload.price": "Çmimi",
    "upload.currency": "Monedha",
    "upload.forSale": "Në shitje",
    "upload.image": "Imazhi",
    "upload.drop": "Lësho imazhin këtu ose kliko",
    "upload.submit": "Ngarko dizajnin",
    "upload.edit": "Ndrysho dizajnin",
    "upload.cancel": "Anulo",
    "card.buy": "Blej",
    "card.share": "Ndaj",
    "detail.comments": "Komente",
    "detail.buyNow": "Blej tani",
    "detail.noBio": "Nuk ka përshkrim për këtë dizajn.",
    "detail.commentPh": "Shkruaj një koment…",
    "detail.loginComment": "Hyr për të komentuar",
    "detail.send": "Dërgo",
    "order.title": "Kërkesë blerjeje",
    "order.submit": "Dërgo kërkesën",
    "forSale": "Në shitje",
    "admin.title": "Paneli admin",
    "admin.sub": "Shto dizajne, menaxho katalogun dhe shiko kërkesat e blerjes.",
    "admin.tabOrders": "Kërkesat e blerjes",
    "admin.tabDesigns": "Të gjitha dizajnet",
    "admin.tabUpload": "Shto dizajn",
    "admin.refresh": "Rifresko",
    "admin.gate": "Duhet login si admin.",
    "admin.noOrders": "Nuk ka ende kërkesa blerjeje.",
    "account.menu": "Llogaria ime",
    "account.data": "Të dhënat e llogarisë",
    "account.orders": "Kërkesat e mia",
    "buy.needLogin": "Hyr në llogari për të dërguar kërkesën e blerjes te admini.",
  },
};

const apiFetch = (input, init = {}) =>
  fetch(input, {
    credentials: "include",
    ...init,
  });

const FALLBACK_DESIGNS = [
  {
    _id: "demo-1",
    title: "Monolith House",
    bio: "Minimal geometry with strong daylight and clean volumes.",
    category: "minimal",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 180,
    currency: "EUR",
    priceLabel: "€180.00",
    likeCount: 42,
    saveCount: 18,
    viewCount: 920,
    shareCount: 6,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-2",
    title: "Cliff Pavilion",
    bio: "Glass and stone blend into the horizon.",
    category: "landscape",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 240,
    currency: "EUR",
    priceLabel: "€240.00",
    likeCount: 67,
    saveCount: 29,
    viewCount: 1400,
    shareCount: 11,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-3",
    title: "Urban Void",
    bio: "Dark steel aesthetics with floating light corridors.",
    category: "brutalist",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 210,
    currency: "EUR",
    priceLabel: "€210.00",
    likeCount: 55,
    saveCount: 21,
    viewCount: 1105,
    shareCount: 8,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-4",
    title: "Cream Atrium",
    bio: "Elegant interior layers with sculpted natural light.",
    category: "interior",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 160,
    currency: "EUR",
    priceLabel: "€160.00",
    likeCount: 38,
    saveCount: 14,
    viewCount: 780,
    shareCount: 4,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-5",
    title: "Azure Villa",
    bio: "Pool-centered villa with panoramic glass walls.",
    category: "modern",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 320,
    currency: "EUR",
    priceLabel: "€320.00",
    likeCount: 91,
    saveCount: 44,
    viewCount: 2100,
    shareCount: 19,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-6",
    title: "Glass Nest",
    bio: "Transparent social spaces with a warm white palette.",
    category: "modern",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 195,
    currency: "EUR",
    priceLabel: "€195.00",
    likeCount: 48,
    saveCount: 20,
    viewCount: 990,
    shareCount: 7,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-7",
    title: "Forest Retreat",
    bio: "Timber residence elevated among pine canopies.",
    category: "landscape",
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8c97d814b1?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 275,
    currency: "EUR",
    priceLabel: "€275.00",
    likeCount: 73,
    saveCount: 31,
    viewCount: 1560,
    shareCount: 12,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
  {
    _id: "demo-8",
    title: "Skyline Penthouse",
    bio: "Luxury penthouse with a city panorama terrace.",
    category: "futuristic",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    forSale: true,
    price: 410,
    currency: "EUR",
    priceLabel: "€410.00",
    likeCount: 120,
    saveCount: 58,
    viewCount: 2800,
    shareCount: 25,
    user: { name: "ArchiMuse Studio" },
    source: "curated",
    isLiked: false,
    isSaved: false,
  },
];

let currentLang = localStorage.getItem(LANG_KEY) || "en";

const t = (key) => I18N[currentLang]?.[key] || I18N.en[key] || key;

const applyLanguage = (lang) => {
  currentLang = lang === "sq" ? "sq" : "en";
  localStorage.setItem(LANG_KEY, currentLang);
  document.documentElement.lang = currentLang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.setAttribute("placeholder", t(key));
  });
};

const setupLanguage = () => {
  applyLanguage(currentLang);
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
};

const modeButtons = document.querySelectorAll(".mode-btn");
const userBadge = document.getElementById("userBadge");
const pinsGrid = document.getElementById("pinsGrid");
const homeDecorGrid = document.getElementById("homeDecorGrid");
const projectsGrid = document.getElementById("projectsGrid");
const featuredProjects = document.getElementById("featuredProjects");
const projectCategoryFilter = document.getElementById("projectCategoryFilter");
const projectsTotalEl = document.getElementById("projectsTotal");
const projectsEndHint = document.getElementById("projectsEndHint");
const isProjectsPage = document.body.classList.contains("projects-page");
const myPinsGrid = document.getElementById("myPinsGrid");
const savedPinsGrid = document.getElementById("savedPinsGrid");
const profileMyGrid = document.getElementById("profileMyGrid");
const profileSavedGrid = document.getElementById("profileSavedGrid");
const profileLikedGrid = document.getElementById("profileLikedGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const feedSkeleton = document.getElementById("feedSkeleton");
const editModal = document.getElementById("editModal");
const editPinForm = document.getElementById("editPinForm");
const editPinId = document.getElementById("editPinId");
const editTitle = document.getElementById("editTitle");
const editBio = document.getElementById("editBio");
const editCategory = document.getElementById("editCategory");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const pinDetailModal = document.getElementById("pinDetailModal");
const pinDetailContent = document.getElementById("pinDetailContent");
const closeDetailBtn = document.getElementById("closeDetailBtn");
const profileOrdersList = document.getElementById("profileOrdersList");
const sellerOrdersList = document.getElementById("sellerOrdersList");
const profileOrdersPanel = document.getElementById("profileOrdersPanel");
const sellerOrdersPanel = document.getElementById("sellerOrdersPanel");
let currentUser = null;
let activeDetailPin = null;
let usingFallbackCatalog = false;

const feedState = {
  page: 1,
  limit: 24,
  loading: false,
  hasMore: true,
};

const projectsState = {
  page: 1,
  limit: 20,
  sort: "trending",
  category: "all",
  loading: false,
  hasMore: true,
};

const applyTheme = (theme) => {
  document.body.classList.remove("theme-light", "theme-cream", "theme-dark");
  document.body.classList.add(`theme-${theme}`);
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === theme);
  });
};

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "cream";
  applyTheme(savedTheme);
  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = button.dataset.theme;
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  });
};

const updateUserBadge = async () => {
  try {
    const response = await apiFetch("/api/me");
    const data = await response.json();
    currentUser = data.user || null;
    if (userBadge) {
      userBadge.textContent = data.user ? `Hi, ${data.user.name}` : "Guest";
    }
    updateNavAuth();
  } catch (_error) {
    currentUser = null;
    if (userBadge) userBadge.textContent = "Guest";
    updateNavAuth();
  }
};

const logoutUser = async () => {
  try {
    await apiFetch("/api/logout", { method: "POST" });
  } catch (_error) {
    /* ignore */
  }
  currentUser = null;
  window.location.href = "index.html";
};

const updateNavAuth = () => {
  const loginLink = document.querySelector('nav a[href="login.html"], nav a[href="profile.html"][data-i18n="nav.login"], nav a[data-nav-auth]');
  const nav = document.querySelector("nav.main-nav, nav[data-nav], nav");

  if (nav && currentUser?.isAdmin && !nav.querySelector('a[href="admin.html"]')) {
    const adminLink = document.createElement("a");
    adminLink.href = "admin.html";
    adminLink.textContent = "Admin";
    nav.insertBefore(adminLink, nav.lastElementChild);
  }

  if (loginLink) {
    if (currentUser) {
      loginLink.href = "profile.html";
      loginLink.textContent = t("nav.profile");
      loginLink.setAttribute("data-i18n", "nav.profile");
      loginLink.classList.toggle("active", /profile\.html/.test(window.location.pathname));
    } else {
      loginLink.href = "login.html";
      loginLink.textContent = t("nav.login");
      loginLink.setAttribute("data-i18n", "nav.login");
      loginLink.classList.toggle("active", /login\.html/.test(window.location.pathname));
    }
  }

  if (window.location.pathname.endsWith("login.html") && currentUser) {
    window.location.replace("profile.html");
    return;
  }

  ensureAccountMenuButton();

  if (userBadge) {
    if (currentUser) {
      userBadge.textContent = currentUser.name;
      userBadge.classList.add("user-badge--auth");
      userBadge.href = "profile.html";
    } else {
      userBadge.textContent = "Guest";
      userBadge.classList.remove("user-badge--auth");
      userBadge.href = "login.html";
    }
  }

  document.querySelectorAll(".seller-only, .admin-only").forEach((el) => {
    el.classList.toggle("hidden", !(currentUser && currentUser.isAdmin));
  });

  if (currentUser) {
    updateAccountDrawerContent();
    bindAccountDrawerEvents();
  } else {
    closeAccountDrawer();
  }

  refreshProfileForm();
  if (document.body.classList.contains("admin-page")) setupAdminPanel();
};

const ensureAccountMenuButton = () => {
  const right = document.querySelector(".topbar-right");
  if (!right) return;
  let btn = document.getElementById("accountMenuBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "accountMenuBtn";
    btn.type = "button";
    btn.className = "account-menu-btn";
    btn.setAttribute("aria-label", "Account menu");
    btn.textContent = "☰";
    right.insertBefore(btn, right.firstChild);
  }
  btn.classList.toggle("hidden", !currentUser);
};

let accountDrawerBound = false;

const closeAccountDrawer = () => {
  const drawer = document.getElementById("accountDrawer");
  const overlay = document.getElementById("accountOverlay");
  const btn = document.getElementById("authBurgerBtn");
  drawer?.classList.remove("open");
  overlay?.classList.remove("open");
  btn?.classList.remove("open");
  btn?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("account-drawer-open");
};

const openAccountDrawer = () => {
  ensureAccountDrawerExists();
  const drawer = document.getElementById("accountDrawer");
  const overlay = document.getElementById("accountOverlay");
  const btn = document.getElementById("accountMenuBtn");
  updateAccountDrawerContent();
  drawer?.classList.add("open");
  overlay?.classList.add("open");
  btn?.classList.add("open");
  btn?.setAttribute("aria-expanded", "true");
  document.body.classList.add("account-drawer-open");
};

const ensureAccountDrawerExists = () => {
  if (document.getElementById("accountDrawer")) return;
  const overlay = document.createElement("div");
  overlay.id = "accountOverlay";
  overlay.className = "account-overlay";
  const drawer = document.createElement("aside");
  drawer.id = "accountDrawer";
  drawer.className = "account-drawer";
  drawer.setAttribute("aria-label", "Account menu");
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
};

const setupAccountDrawer = () => {
  ensureAccountDrawerExists();
  bindAccountDrawerEvents();
};

const updateAccountDrawerContent = () => {
  const drawer = document.getElementById("accountDrawer");
  if (!drawer || !currentUser) return;

  const roleLabel =
    currentUser.role === "admin"
      ? "Admin"
      : currentUser.isSeller
        ? currentLang === "sq"
          ? "Shitës"
          : "Seller"
        : currentLang === "sq"
          ? "Klient"
          : "Client";
  const joined = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString(currentLang === "sq" ? "sq-AL" : "en-US")
    : "—";

  drawer.innerHTML = `
    <div class="account-drawer-header">
      <div class="account-drawer-user">
        <span class="user-avatar user-avatar--lg">${escapeHtml(currentUser.initials || currentUser.name?.[0] || "U")}</span>
        <div>
          <strong>${escapeHtml(currentUser.name)}</strong>
          <p>${escapeHtml(roleLabel)}</p>
        </div>
      </div>
      <button type="button" class="account-drawer-close" aria-label="Close">×</button>
    </div>
    <div class="account-drawer-body">
      <section class="drawer-section">
        <h4>${escapeHtml(t("account.data"))}</h4>
        <table class="account-data-table">
          <tbody>
            <tr><th>${currentLang === "sq" ? "Emri" : "Name"}</th><td>${escapeHtml(currentUser.name || "—")}</td></tr>
            <tr><th>Email</th><td>${escapeHtml(currentUser.email || "—")}</td></tr>
            <tr><th>Bio</th><td>${escapeHtml(currentUser.bio || "—")}</td></tr>
            <tr><th>${currentLang === "sq" ? "Roli" : "Role"}</th><td>${escapeHtml(roleLabel)}</td></tr>
            <tr><th>${currentLang === "sq" ? "Porosi" : "Orders"}</th><td>${currentUser.orderCount ?? 0}</td></tr>
            <tr><th>${currentLang === "sq" ? "Të ruajtura" : "Saved"}</th><td>${currentUser.savedCount ?? 0}</td></tr>
            <tr><th>${currentLang === "sq" ? "Të pëlqyera" : "Liked"}</th><td>${currentUser.likedCount ?? 0}</td></tr>
            <tr><th>${currentLang === "sq" ? "Anëtar nga" : "Joined"}</th><td>${escapeHtml(joined)}</td></tr>
          </tbody>
        </table>
      </section>

      <section class="drawer-section">
        <h4>${currentLang === "sq" ? "Lidhje të shpejta" : "Quick links"}</h4>
        <a href="profile.html#orders" class="drawer-link">${escapeHtml(t("account.orders"))}</a>
        <a href="saved.html" class="drawer-link">${escapeHtml(t("nav.saved"))}</a>
        <a href="profile.html#settings" class="drawer-link">${escapeHtml(t("profile.settings"))}</a>
        ${currentUser.isAdmin ? '<a href="admin.html" class="drawer-link drawer-link--primary">Admin panel</a>' : ""}
        ${currentUser.isAdmin ? `<a href="upload.html" class="drawer-link">${escapeHtml(t("profile.upload"))}</a>` : ""}
      </section>

      <button type="button" id="drawerLogout" class="drawer-logout">${escapeHtml(t("profile.logout"))}</button>
    </div>
  `;

  drawer.querySelector(".account-drawer-close")?.addEventListener("click", closeAccountDrawer);
  drawer.querySelector("#drawerLogout")?.addEventListener("click", logoutUser);
  drawer.querySelectorAll(".drawer-link").forEach((link) => {
    link.addEventListener("click", () => closeAccountDrawer());
  });
};

const bindAccountDrawerEvents = () => {
  if (accountDrawerBound) return;
  accountDrawerBound = true;

  document.getElementById("accountOverlay")?.addEventListener("click", closeAccountDrawer);

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("#accountMenuBtn, #authBurgerBtn");
    if (!btn) return;
    if (!currentUser) {
      window.location.href = "login.html";
      return;
    }
    const drawer = document.getElementById("accountDrawer");
    if (drawer?.classList.contains("open")) closeAccountDrawer();
    else openAccountDrawer();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAccountDrawer();
  });
};

const toggleVideoBackground = (enabled) => {
  const wrap = document.getElementById("siteVideoBg");
  if (!wrap) return;
  wrap.classList.toggle("hidden", !enabled);
  const video = wrap.querySelector("video");
  if (video) {
    if (enabled) video.play().catch(() => {});
    else video.pause();
  }
};

const setupVideoBackground = () => {
  if (document.getElementById("siteVideoBg")) return;

  const enabled = localStorage.getItem("archimuse-video-bg") !== "off";
  const wrap = document.createElement("div");
  wrap.id = "siteVideoBg";
  wrap.className = `site-video-bg${enabled ? "" : " hidden"}`;
  wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = `
    <video autoplay muted loop playsinline poster="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80">
      <source src="https://cdn.coverr.co/videos/coverr-modern-glass-building-4638/1080p.mp4" type="video/mp4" />
      <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_24fps.mp4" type="video/mp4" />
    </video>
    <div class="site-video-overlay"></div>
  `;
  document.body.prepend(wrap);

  const video = wrap.querySelector("video");
  if (video && enabled) {
    video.play().catch(() => {});
  }
};

const setupBurgerMenu = () => {
  const topbar = document.querySelector(".topbar");
  const nav = topbar?.querySelector("nav");
  if (!topbar || !nav || document.getElementById("burgerBtn")) return;

  nav.classList.add("main-nav");

  const burger = document.createElement("button");
  burger.id = "burgerBtn";
  burger.className = "burger-btn";
  burger.type = "button";
  burger.setAttribute("aria-label", "Open menu");
  burger.setAttribute("aria-expanded", "false");
  burger.innerHTML = "<span></span><span></span><span></span>";

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.id = "navOverlay";

  topbar.insertBefore(burger, nav);
  document.body.appendChild(overlay);

  const openMenu = () => {
    burger.classList.add("open");
    nav.classList.add("open");
    overlay.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    burger.classList.remove("open");
    nav.classList.remove("open");
    overlay.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  burger.addEventListener("click", () => {
    if (burger.classList.contains("open")) closeMenu();
    else openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });
};

const setupPageDecor = () => {
  // Keep pages clean — no floating decorative overlays.
};

const escapeHtml = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const truncate = (text, max = 120) => {
  const value = String(text || "").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}…`;
};

const categoryLabel = (category) => {
  const labels = {
    modern: "Modern",
    minimal: "Minimal",
    brutalist: "Brutalist",
    interior: "Interior",
    landscape: "Landscape",
    futuristic: "Futuristic",
    general: "General",
  };
  return labels[category] || category;
};

const sourceBadge = (pin) => {
  if (pin.forSale !== false) return `<span class="pin-badge curated">${escapeHtml(t("forSale"))}</span>`;
  return `<span class="pin-badge upload">Studio</span>`;
};

const priceBadge = (pin) => {
  if (!pin.forSale) return "";
  return `<span class="pin-price">${escapeHtml(pin.priceLabel || `${pin.price || 0} ${pin.currency || "EUR"}`)}</span>`;
};

const showSkeleton = (count = 6, append = false) => {
  if (!feedSkeleton) return;
  const markup = Array.from({ length: count })
    .map(
      () => `
      <article class="pin-card skeleton-card">
        <div class="skeleton-image"></div>
        <div class="pin-meta">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </article>
    `
    )
    .join("");

  if (!append) {
    feedSkeleton.innerHTML = markup;
  } else {
    feedSkeleton.insertAdjacentHTML("beforeend", markup);
  }
  feedSkeleton.classList.remove("hidden");
};

const hideSkeleton = () => {
  if (!feedSkeleton) return;
  feedSkeleton.classList.add("hidden");
};

const setupAuthForm = () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const nameFieldWrap = document.getElementById("nameFieldWrap");
  const nameInput = document.getElementById("name");
  const submitBtn = document.getElementById("authSubmitBtn");
  const messageEl = document.getElementById("loginMessage");
  let authMode = "login";

  const switchMode = (mode) => {
    authMode = mode;
    const isRegister = mode === "register";
    loginTab.classList.toggle("active", !isRegister);
    registerTab.classList.toggle("active", isRegister);
    nameFieldWrap.classList.toggle("hidden", !isRegister);
    nameInput.required = isRegister;
    submitBtn.textContent = isRegister ? "Register" : "Login";
  };

  loginTab?.addEventListener("click", () => switchMode("login"));
  registerTab?.addEventListener("click", () => switchMode("register"));

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    try {
      const endpoint = authMode === "register" ? "/api/register" : "/api/login";
      const response = await apiFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_error) {
        messageEl.textContent =
          currentLang === "sq"
            ? "Serveri nuk u përgjigj. Kontrollo deploy-in/API në Netlify."
            : "Server did not respond. Check your Netlify API deployment.";
        messageEl.style.color = "#a02727";
        return;
      }
      messageEl.textContent = data.message || (data.ok ? "OK" : "Login failed");
      messageEl.style.color = data.ok ? "#137b26" : "#a02727";
      if (data.ok) {
        await updateUserBadge();
        loginForm.reset();
        if (authMode === "register") switchMode("login");
        else window.location.href = "profile.html";
      }
    } catch (_error) {
      messageEl.textContent = "Network error. Please try again.";
      messageEl.style.color = "#a02727";
    }
  });
};

const pinCardMarkup = (pin, options = {}) => {
  const layout = options.masonry ? "pin-card masonry-pin animate-card" : "pin-card animate-card";
  const editable = options.editable
    ? `<button class="small-btn" data-action="edit" data-id="${pin._id}" data-title="${encodeURIComponent(pin.title)}" data-bio="${encodeURIComponent(pin.bio || "")}" data-category="${encodeURIComponent(pin.category || "general")}">Edit</button>`
    : "";
  const deletable = options.deletable
    ? `<button class="small-btn danger" data-action="delete" data-id="${pin._id}">Delete</button>`
    : "";
  const bioPreview = pin.bio ? `<p class="pin-bio">${escapeHtml(truncate(pin.bio, 100))}</p>` : "";

  return `
    <article class="${layout}" data-pin-id="${pin._id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(pin.title)}">
      <div class="pin-image-wrap">
        <img src="${pin.imageUrl}" alt="${escapeHtml(pin.title)}" loading="lazy" />
        <div class="pin-overlay">
          <h3>${escapeHtml(pin.title)}</h3>
          ${bioPreview}
          ${priceBadge(pin)}
        </div>
      </div>
      <div class="pin-meta">
        <div class="pin-meta-top">
          ${sourceBadge(pin)}
          <span class="pin-category">${escapeHtml(categoryLabel(pin.category))}</span>
          ${priceBadge(pin)}
        </div>
        <h3>${escapeHtml(pin.title)}</h3>
        ${bioPreview}
        <p class="pin-author">By ${escapeHtml(pin.user?.name || "Studio")}</p>
        <div class="pin-actions">
          <button class="small-btn ${pin.isLiked ? "active" : ""}" data-action="like" data-id="${pin._id}">
            ♥ ${pin.likeCount || 0}
          </button>
          <button class="small-btn ${pin.isSaved ? "active" : ""}" data-action="save" data-id="${pin._id}">
            ★ ${pin.saveCount || 0}
          </button>
          <button class="small-btn" data-action="share" data-id="${pin._id}">↗ ${escapeHtml(t("card.share"))}</button>
          ${pin.forSale !== false ? `<button class="small-btn buy-btn" data-action="buy" data-id="${pin._id}" data-title="${encodeURIComponent(pin.title)}" data-price="${escapeHtml(pin.priceLabel || "")}">${escapeHtml(t("card.buy"))}</button>` : ""}
          ${editable}
          ${deletable}
        </div>
      </div>
    </article>
  `;
};

const formatViews = (count) => {
  const n = Number(count) || 0;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const projectCardMarkup = (pin, index = 0) => {
  const delay = Math.min(index * 0.06, 0.6);
  const isHot = (pin.viewCount || 0) > 600;
  return `
    <article class="project-card animate-card" data-pin-id="${pin._id}" tabindex="0" role="button" style="--delay:${delay}s">
      <div class="project-image">
        <img src="${pin.imageUrl}" alt="${escapeHtml(pin.title)}" loading="lazy" />
        <div class="project-shine"></div>
        ${isHot ? '<span class="project-hot">Trending</span>' : ""}
        <div class="project-float-stats">
          <span>👁 ${formatViews(pin.viewCount)}</span>
          <span>♥ ${pin.likeCount || 0}</span>
        </div>
      </div>
      <div class="project-body">
        <div class="project-meta-row">
          ${sourceBadge(pin)}
          <span class="project-category">${escapeHtml(categoryLabel(pin.category))}</span>
        </div>
        <h3>${escapeHtml(pin.title)}</h3>
        <p>${escapeHtml(truncate(pin.bio || "Architecture concept with refined spatial composition.", 110))}</p>
        <div class="project-footer">
          <span class="project-views">${formatViews(pin.viewCount)} shikime</span>
          ${pin.sourceUrl ? `<a class="project-pinterest" href="${escapeHtml(pin.sourceUrl)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Pinterest →</a>` : ""}
        </div>
      </div>
    </article>
  `;
};

const featuredCardMarkup = (pin, rank) => `
  <article class="featured-card animate-card" data-pin-id="${pin._id}" tabindex="0" role="button" style="--delay:${rank * 0.1}s">
    <span class="featured-rank">#${rank + 1}</span>
    <img src="${pin.imageUrl}" alt="${escapeHtml(pin.title)}" loading="lazy" />
    <div class="featured-overlay">
      <span class="pin-badge pinterest">Pinterest</span>
      <h3>${escapeHtml(pin.title)}</h3>
      <p>👁 ${formatViews(pin.viewCount)} · ♥ ${pin.likeCount || 0}</p>
    </div>
  </article>
`;

const renderIntoGrid = (grid, pins, emptyMessage, options = {}) => {
  if (!grid) return;
  if (!pins.length) {
    grid.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    return;
  }
  grid.innerHTML = pins.map((pin) => pinCardMarkup(pin, options)).join("");
};

const renderPins = (pins, append = false) => {
  if (!pinsGrid) return;
  if (!pins.length && !append) {
    pinsGrid.innerHTML = "<p class='empty-state'>No designs found for this filter.</p>";
    return;
  }
  const markup = pins.map((pin) => pinCardMarkup(pin, { masonry: true })).join("");
  if (append) {
    pinsGrid.insertAdjacentHTML("beforeend", markup);
  } else {
    pinsGrid.innerHTML = markup;
  }
  observeAnimatedCards();
};

const renderHomeDecor = (pins, append = false) => {
  if (!homeDecorGrid) return;
  if (!pins.length && !append) {
    homeDecorGrid.innerHTML = "<p class='empty-state'>Loading inspiration…</p>";
    return;
  }
  const markup = pins.map((pin) => pinCardMarkup(pin, { masonry: true })).join("");
  if (append) {
    homeDecorGrid.insertAdjacentHTML("beforeend", markup);
  } else {
    homeDecorGrid.innerHTML = markup;
  }
  observeAnimatedCards();
};

const renderProjects = (pins, append = false) => {
  if (!projectsGrid) return;
  if (!pins.length && !append) {
    projectsGrid.innerHTML = "<p class='empty-state'>Nuk u gjetën projekte.</p>";
    return;
  }
  const startIndex = append ? projectsGrid.querySelectorAll(".project-card").length : 0;
  const markup = pins.map((pin, i) => projectCardMarkup(pin, startIndex + i)).join("");
  if (append) {
    projectsGrid.insertAdjacentHTML("beforeend", markup);
  } else {
    projectsGrid.innerHTML = markup;
  }
  observeAnimatedCards();
};

const renderFeaturedProjects = (pins) => {
  if (!featuredProjects) return;
  const top = [...pins].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 3);
  if (!top.length) {
    featuredProjects.innerHTML = "";
    return;
  }
  featuredProjects.innerHTML = top.map((pin, i) => featuredCardMarkup(pin, i)).join("");
  observeAnimatedCards();
};

const loadProjects = async ({ append = false } = {}) => {
  if (!projectsGrid) return;
  if (projectsState.loading) return;
  projectsState.loading = true;
  if (!append) showSkeleton(8, false);
  else showSkeleton(4, true);

  try {
    const params = new URLSearchParams();
    params.set("sort", projectsState.sort);
    params.set("category", projectsState.category);
    params.set("page", String(projectsState.page));
    params.set("limit", String(projectsState.limit));
    const response = await apiFetch(`/api/projects?${params}`);
    if (!response.ok) throw new Error("api");
    const data = await response.json();
    let pins = data.pins || [];

    if (!pins.length && !append) {
      pins = FALLBACK_DESIGNS;
      if (projectsTotalEl) projectsTotalEl.textContent = String(pins.length);
      renderFeaturedProjects(pins);
      renderProjects(pins, false);
      projectsState.hasMore = false;
    } else {
      if (projectsTotalEl) projectsTotalEl.textContent = String(data.total || pins.length);
      if (!append && featuredProjects) {
        const featRes = await apiFetch("/api/projects?sort=most-viewed&limit=3");
        const featData = await featRes.json();
        renderFeaturedProjects(featData.pins || pins);
      }
      renderProjects(pins, append);
      projectsState.hasMore = Boolean(data.hasMore);
    }
    if (projectsEndHint) {
      projectsEndHint.classList.toggle("hidden", !projectsState.hasMore);
    }
  } catch (_error) {
    if (!append) {
      if (projectsTotalEl) projectsTotalEl.textContent = String(FALLBACK_DESIGNS.length);
      renderFeaturedProjects(FALLBACK_DESIGNS);
      renderProjects(FALLBACK_DESIGNS, false);
      projectsState.hasMore = false;
    }
  } finally {
    hideSkeleton();
    projectsState.loading = false;
  }
};

const renderMyPins = (pins) => {
  renderIntoGrid(myPinsGrid, pins, "You have no designs yet.", { editable: true, deletable: true, masonry: true });
  renderIntoGrid(profileMyGrid, pins, "You have no designs yet.", { editable: true, deletable: true, masonry: true });
};

const renderSavedPins = (pins) => {
  renderIntoGrid(savedPinsGrid, pins, "You do not have saved designs yet.", { masonry: true });
  renderIntoGrid(profileSavedGrid, pins, "You do not have saved designs yet.", { masonry: true });
};

const renderLikedPins = (pins) => {
  renderIntoGrid(profileLikedGrid, pins, "You do not have liked designs yet.", { masonry: true });
};

const loadPins = async ({ append = false, limit, category, sort } = {}) => {
  if (isProjectsPage) return;
  const activeGrid = pinsGrid || homeDecorGrid;
  if (!activeGrid) return;
  if (feedState.loading) return;
  feedState.loading = true;
  if (!append) {
    showSkeleton(activeGrid === pinsGrid ? 6 : 8, false);
  } else {
    showSkeleton(4, true);
  }
  try {
    const params = new URLSearchParams();
    if (searchInput?.value?.trim()) params.set("search", searchInput.value.trim());
    if (categoryFilter?.value) params.set("category", categoryFilter.value);
    if (sortFilter?.value) params.set("sort", sortFilter.value);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    params.set("page", String(feedState.page));
    params.set("limit", String(limit || feedState.limit));
    const query = params.toString();
    const response = await apiFetch(`/api/pins${query ? `?${query}` : ""}`);
    if (!response.ok) throw new Error("api");
    const data = await response.json();
    let pins = data.pins || [];

    if (!pins.length && !append) {
      usingFallbackCatalog = true;
      pins = FALLBACK_DESIGNS;
      feedState.hasMore = false;
    } else {
      usingFallbackCatalog = false;
      feedState.hasMore = Boolean(data.hasMore);
    }

    if (pinsGrid) renderPins(pins, append);
    else if (homeDecorGrid) renderHomeDecor(pins, append);
  } catch (_error) {
    usingFallbackCatalog = true;
    feedState.hasMore = false;
    if (!append && activeGrid) {
      if (pinsGrid) renderPins(FALLBACK_DESIGNS, false);
      else if (homeDecorGrid) renderHomeDecor(FALLBACK_DESIGNS, false);
    }
  } finally {
    hideSkeleton();
    feedState.loading = false;
  }
};

const loadMyPins = async () => {
  if (!myPinsGrid && !profileMyGrid) return;
  try {
    const response = await apiFetch("/api/my-pins");
    const data = await response.json();
    if (!data.ok) {
      if (myPinsGrid) myPinsGrid.innerHTML = "<p class='empty-state'>Login to manage your designs.</p>";
      if (profileMyGrid) profileMyGrid.innerHTML = "<p class='empty-state'>Login to manage your designs.</p>";
      return;
    }
    renderMyPins(data.pins || []);
  } catch (_error) {
    if (myPinsGrid) myPinsGrid.innerHTML = "<p class='empty-state'>Unable to load your designs.</p>";
    if (profileMyGrid) profileMyGrid.innerHTML = "<p class='empty-state'>Unable to load your designs.</p>";
  }
};

const loadSavedPins = async () => {
  if (!savedPinsGrid && !profileSavedGrid) return;
  try {
    const response = await apiFetch("/api/saved-pins");
    const data = await response.json();
    if (!data.ok) {
      if (savedPinsGrid) savedPinsGrid.innerHTML = "<p class='empty-state'>Login first to view saved designs.</p>";
      if (profileSavedGrid) profileSavedGrid.innerHTML = "<p class='empty-state'>Login first to view saved designs.</p>";
      return;
    }
    renderSavedPins(data.pins || []);
  } catch (_error) {
    if (savedPinsGrid) savedPinsGrid.innerHTML = "<p class='empty-state'>Unable to load saved designs.</p>";
    if (profileSavedGrid) profileSavedGrid.innerHTML = "<p class='empty-state'>Unable to load saved designs.</p>";
  }
};

const loadLikedPins = async () => {
  if (!profileLikedGrid) return;
  try {
    const response = await apiFetch("/api/liked-pins");
    const data = await response.json();
    if (!data.ok) {
      profileLikedGrid.innerHTML = "<p class='empty-state'>Login first to view liked designs.</p>";
      return;
    }
    renderLikedPins(data.pins || []);
  } catch (_error) {
    profileLikedGrid.innerHTML = "<p class='empty-state'>Unable to load liked designs.</p>";
  }
};

const setupUploadPreview = () => {
  const fileInput = document.getElementById("pinImage");
  const preview = document.getElementById("uploadPreview");
  const dropzone = document.getElementById("uploadDropzone");
  if (!fileInput || !preview || !dropzone) return;

  const showPreview = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      preview.innerHTML = `<img src="${event.target.result}" alt="Preview" />`;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  };

  fileInput.addEventListener("change", () => {
    if (fileInput.files?.[0]) showPreview(fileInput.files[0]);
  });

  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("dragover");
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;
    showPreview(file);
  });

  dropzone.addEventListener("click", () => fileInput.click());
};

const setupUploadForm = () => {
  const uploadForm = document.getElementById("uploadForm");
  if (!uploadForm) return;

  const messageEl = document.getElementById("uploadMessage");
  const preview = document.getElementById("uploadPreview");

  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(uploadForm);
    const forSaleEl = document.getElementById("pinForSale");
    formData.set("forSale", forSaleEl?.checked ? "true" : "false");

    try {
      const response = await apiFetch("/api/pins", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      messageEl.textContent = data.message;
      messageEl.style.color = data.ok ? "#137b26" : "#a02727";
      if (data.ok) {
        uploadForm.reset();
        if (preview) {
          preview.innerHTML = "";
          preview.classList.add("hidden");
        }
        feedState.page = 1;
        await loadPins({ append: false });
        await loadMyPins();
        await loadSavedPins();
      }
    } catch (_error) {
      messageEl.textContent = "Upload failed. Try again.";
      messageEl.style.color = "#a02727";
    }
  });
};

const setupPinterestImport = () => {
  const form = document.getElementById("pinterestForm");
  if (!form) return;
  const messageEl = document.getElementById("pinterestMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      pinterestUrl: String(formData.get("pinterestUrl") || ""),
      title: String(formData.get("title") || ""),
      bio: String(formData.get("bio") || ""),
      category: String(formData.get("category") || "modern"),
      price: Number(formData.get("price") || 0),
      currency: String(formData.get("currency") || "EUR"),
      forSale: true,
    };

    try {
      const response = await apiFetch("/api/pins/from-pinterest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      messageEl.textContent = data.message;
      messageEl.style.color = data.ok ? "#137b26" : "#a02727";
      if (data.ok) {
        form.reset();
        feedState.page = 1;
        await loadPins({ append: false });
        await loadMyPins();
      }
    } catch (_error) {
      messageEl.textContent = "Import failed. Try again.";
      messageEl.style.color = "#a02727";
    }
  });
};

const setupUploadTabs = () => {
  const tabs = document.querySelectorAll("[data-upload-tab]");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.uploadTab;
      tabs.forEach((btn) => btn.classList.toggle("active", btn === tab));
      document.querySelectorAll("[data-upload-panel]").forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset.uploadPanel !== target);
      });
    });
  });

  if (window.location.hash === "#import") {
    const pinterestTab = document.querySelector('[data-upload-tab="pinterest"]');
    pinterestTab?.click();
  }
};

const setupSearch = () => {
  if (!searchForm) return;
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedState.page = 1;
    feedState.hasMore = true;
    await loadPins({ append: false });
  });

  categoryFilter?.addEventListener("change", async () => {
    feedState.page = 1;
    feedState.hasMore = true;
    await loadPins({ append: false });
  });

  sortFilter?.addEventListener("change", async () => {
    feedState.page = 1;
    feedState.hasMore = true;
    await loadPins({ append: false });
  });
};

const setupInfiniteScroll = () => {
  window.addEventListener("scroll", async () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;

    if (isProjectsPage && projectsGrid) {
      if (!nearBottom || projectsState.loading || !projectsState.hasMore) return;
      projectsState.page += 1;
      await loadProjects({ append: true });
      return;
    }

    if (!pinsGrid && !homeDecorGrid) return;
    if (!nearBottom || feedState.loading || !feedState.hasMore) return;
    feedState.page += 1;
    await loadPins({ append: true });
  });
};

const setupProjectFilters = () => {
  if (!isProjectsPage) return;

  document.querySelectorAll("[data-project-sort]").forEach((chip) => {
    chip.addEventListener("click", async () => {
      document.querySelectorAll("[data-project-sort]").forEach((btn) => btn.classList.remove("active"));
      chip.classList.add("active");
      projectsState.sort = chip.dataset.projectSort;
      projectsState.page = 1;
      projectsState.hasMore = true;
      await loadProjects({ append: false });
    });
  });

  projectCategoryFilter?.addEventListener("change", async () => {
    projectsState.category = projectCategoryFilter.value;
    projectsState.page = 1;
    projectsState.hasMore = true;
    await loadProjects({ append: false });
  });
};

let cardObserver = null;
const observeAnimatedCards = () => {
  if (cardObserver) cardObserver.disconnect();
  cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".animate-card:not(.in-view), .pin-card.animate-card:not(.in-view)").forEach((card) => cardObserver.observe(card));
};

const openEditModal = ({ id, title, bio, category }) => {
  if (!editModal || !editPinForm) return;
  editPinId.value = id;
  editTitle.value = title;
  if (editBio) editBio.value = bio || "";
  editCategory.value = category;
  editModal.classList.remove("hidden");
};

const closeEditModal = () => {
  if (!editModal) return;
  editModal.classList.add("hidden");
};

const renderIgPostDetail = (pin, commentsMarkup) => {
  pinDetailContent.innerHTML = `
    <div class="ig-post">
      <div class="ig-post-media">
        <img src="${pin.imageUrl}" alt="${escapeHtml(pin.title)}" />
      </div>
      <div class="ig-post-side">
        <header class="ig-post-header">
          <span class="user-avatar">${escapeHtml((pin.user?.name || "S")[0])}</span>
          <div>
            <strong>${escapeHtml(pin.user?.name || "ArchiMuse Studio")}</strong>
            <small>${escapeHtml(categoryLabel(pin.category))} · ${escapeHtml(pin.priceLabel || "")}</small>
          </div>
        </header>
        <div class="ig-post-caption">
          <p><strong>${escapeHtml(pin.title)}</strong></p>
          <p>${escapeHtml(pin.bio || t("detail.noBio"))}</p>
        </div>
        <div class="ig-post-actions pin-actions">
          <button class="small-btn ${pin.isLiked ? "active" : ""}" data-action="like" data-id="${pin._id}">♥ ${pin.likeCount || 0}</button>
          <button class="small-btn ${pin.isSaved ? "active" : ""}" data-action="save" data-id="${pin._id}">★ ${pin.saveCount || 0}</button>
          <button class="small-btn" data-action="share" data-id="${pin._id}">↗ ${escapeHtml(t("card.share"))}</button>
          ${
            pin.forSale !== false
              ? `<button class="btn buy-btn" data-action="buy" data-id="${pin._id}" data-title="${encodeURIComponent(pin.title)}" data-price="${escapeHtml(pin.priceLabel || "")}">${escapeHtml(t("detail.buyNow"))}</button>`
              : ""
          }
        </div>
        <p class="ig-post-meta">👁 ${formatViews(pin.viewCount)} · ↗ ${pin.shareCount || 0}</p>
        <div class="ig-comments comments-box">
          <h3>${escapeHtml(t("detail.comments"))}</h3>
          <div id="commentsList" class="ig-comments-list">${commentsMarkup}</div>
          ${
            String(pin._id).startsWith("demo-")
              ? ""
              : `<form id="commentForm" class="comment-form ig-comment-form" data-pin-id="${pin._id}">
                  <textarea name="text" rows="2" maxlength="800" placeholder="${currentUser ? t("detail.commentPh") : t("detail.loginComment")}" ${currentUser ? "required" : "disabled"}></textarea>
                  <button class="small-btn" type="submit" ${currentUser ? "" : "disabled"}>${escapeHtml(t("detail.send"))}</button>
                </form>`
          }
        </div>
      </div>
    </div>
  `;
  pinDetailModal.classList.remove("hidden");
  pinDetailModal.querySelector(".modal-card")?.classList.add("ig-modal");
  bindCommentForm();
};

const openPinDetail = async (pinId) => {
  if (!pinDetailModal || !pinDetailContent) return;

  const demoPin = FALLBACK_DESIGNS.find((p) => p._id === pinId);
  if (demoPin || String(pinId).startsWith("demo-")) {
    const pin = demoPin || FALLBACK_DESIGNS[0];
    activeDetailPin = pin;
    renderIgPostDetail(
      pin,
      `<p class="empty-state">${
        currentLang === "sq"
          ? "Komentet aktivizohen kur katalogu lidhet me serverin."
          : "Comments activate when the shop is connected to the server."
      }</p>`
    );
    return;
  }

  try {
    const [pinRes, commentsRes] = await Promise.all([
      apiFetch(`/api/pins/${pinId}`),
      apiFetch(`/api/pins/${pinId}/comments`),
    ]);
    const data = await pinRes.json();
    const commentsData = await commentsRes.json();
    if (!data.ok || !data.pin) return;
    const pin = data.pin;
    activeDetailPin = pin;
    const comments = commentsData.comments || [];
    const commentsMarkup = comments.length
      ? comments
          .map(
            (c) => `
        <article class="comment-item ig-comment">
          <strong>${escapeHtml(c.user?.name || "User")}</strong>
          <span>${escapeHtml(c.text)}</span>
          <small>${new Date(c.createdAt).toLocaleString(currentLang === "sq" ? "sq-AL" : "en-US")}</small>
        </article>`
          )
          .join("")
      : `<p class="empty-state">${currentLang === "sq" ? "Ende nuk ka komente. Ji i pari." : "No comments yet. Be the first."}</p>`;
    renderIgPostDetail(pin, commentsMarkup);
  } catch (_error) {
    /* ignore */
  }
};

const bindCommentForm = () => {
  const form = document.getElementById("commentForm");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert("Login për të komentuar.");
      return;
    }
    const pinId = form.dataset.pinId;
    const text = new FormData(form).get("text");
    try {
      const response = await apiFetch(`/api/pins/${pinId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!data.ok) {
        alert(data.message || "Komenti dështoi.");
        return;
      }
      await openPinDetail(pinId);
    } catch (_error) {
      alert("Komenti dështoi.");
    }
  });
};

const ensureOrderModal = () => {
  if (document.getElementById("orderModal")) return;
  const modal = document.createElement("div");
  modal.id = "orderModal";
  modal.className = "modal hidden";
  modal.innerHTML = `
    <div class="modal-card order-modal">
      <button id="closeOrderBtn" class="close-btn" type="button" aria-label="Close">×</button>
      <h3>Apliko për blerje</h3>
      <p id="orderDesignLabel" class="page-subtitle"></p>
      <form id="orderForm">
        <input type="hidden" id="orderPinId" name="pinId" />
        <label for="orderFullName">Emri i plotë</label>
        <input id="orderFullName" name="fullName" type="text" required placeholder="Emri dhe mbiemri" />
        <label for="orderEmail">Email</label>
        <input id="orderEmail" name="email" type="email" required placeholder="email@example.com" />
        <label for="orderPhone">Telefon</label>
        <input id="orderPhone" name="phone" type="tel" required placeholder="+383 ..." />
        <label for="orderCity">Qyteti</label>
        <input id="orderCity" name="city" type="text" placeholder="Prishtinë" />
        <label for="orderAddress">Adresa</label>
        <textarea id="orderAddress" name="address" rows="2" required placeholder="Rruga, numri…"></textarea>
        <label for="orderPayment">Mënyra e pagesës</label>
        <select id="orderPayment" name="paymentMethod" required>
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>
        <label for="orderNotes">Shënim (opsional)</label>
        <textarea id="orderNotes" name="notes" rows="2" placeholder="Detaje shtesë për porosinë…"></textarea>
        <button type="submit" class="btn">Dërgo kërkesën</button>
        <p id="orderMessage" class="message"></p>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
};

const openOrderModal = (pinId, title, priceLabel) => {
  if (!currentUser) {
    alert(t("buy.needLogin"));
    window.location.href = "login.html";
    return;
  }
  ensureOrderModal();
  const modal = document.getElementById("orderModal");
  const pinInput = document.getElementById("orderPinId");
  const label = document.getElementById("orderDesignLabel");
  const message = document.getElementById("orderMessage");
  const fullName = document.getElementById("orderFullName");
  const email = document.getElementById("orderEmail");
  if (pinInput) pinInput.value = pinId;
  if (label) label.textContent = `${decodeURIComponent(title || "")}${priceLabel ? ` · ${priceLabel}` : ""}`;
  if (message) message.textContent = "";
  if (fullName) fullName.value = currentUser.name || "";
  if (email) email.value = currentUser.email || "";
  modal.classList.remove("hidden");
};

const closeOrderModal = () => {
  const modal = document.getElementById("orderModal");
  if (modal) modal.classList.add("hidden");
};

const setupOrderModal = () => {
  ensureOrderModal();
  const closeBtn = document.getElementById("closeOrderBtn");
  const modal = document.getElementById("orderModal");
  const form = document.getElementById("orderForm");
  closeBtn?.addEventListener("click", closeOrderModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeOrderModal();
  });
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const messageEl = document.getElementById("orderMessage");
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await apiFetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (messageEl) {
        messageEl.textContent = data.message;
        messageEl.style.color = data.ok ? "#137b26" : "#a02727";
      }
      if (data.ok) {
        form.reset();
        setTimeout(() => {
          closeOrderModal();
          if (currentUser) window.location.href = "profile.html#orders";
        }, 1600);
      }
    } catch (_error) {
      if (messageEl) {
        messageEl.textContent = "Dështoi dërgimi i kërkesës.";
        messageEl.style.color = "#a02727";
      }
    }
  });
};

const shareDesign = async (pinId) => {
  try {
    const response = await apiFetch(`/api/pins/${pinId}/share`, { method: "POST" });
    const data = await response.json();
    if (!data.ok) {
      alert(data.message || "Share dështoi.");
      return;
    }
    const url = data.shareUrl || `${window.location.origin}/explore.html?pin=${pinId}`;
    if (navigator.share) {
      await navigator.share({ title: "ArchiMuse Design", url });
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      alert("Linku u kopjua. Mund ta ndash kudo.");
    } else {
      prompt("Kopjo linkun:", url);
    }
    if (pinDetailModal && !pinDetailModal.classList.contains("hidden")) {
      await openPinDetail(pinId);
    }
  } catch (_error) {
    /* user cancelled share */
  }
};

const orderCardMarkup = (order, { seller = false } = {}) => `
  <article class="order-card status-${escapeHtml(order.status)}">
    <div class="order-card-main">
      ${order.pin?.imageUrl ? `<img src="${escapeHtml(order.pin.imageUrl)}" alt="" />` : ""}
      <div>
        <h3>${escapeHtml(order.designTitle || order.pin?.title || "Dizajn")}</h3>
        <p>${escapeHtml(order.fullName)} · ${escapeHtml(order.email)} · ${escapeHtml(order.phone)}</p>
        <p>${escapeHtml(order.address)}${order.city ? `, ${escapeHtml(order.city)}` : ""}</p>
        <p>Pagesa: <strong>${escapeHtml(order.paymentLabel)}</strong> · ${escapeHtml(order.priceLabel)}</p>
        <span class="order-status">${escapeHtml(order.statusLabel)}</span>
        <small>${new Date(order.createdAt).toLocaleString("sq-AL")}</small>
      </div>
    </div>
    ${
      seller
        ? `<div class="order-status-actions">
            <select data-order-status="${order._id}">
              <option value="pending" ${order.status === "pending" ? "selected" : ""}>Në pritje</option>
              <option value="confirmed" ${order.status === "confirmed" ? "selected" : ""}>E konfirmuar</option>
              <option value="completed" ${order.status === "completed" ? "selected" : ""}>E përfunduar</option>
              <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>E anuluar</option>
            </select>
          </div>`
        : ""
    }
  </article>
`;

const loadMyOrders = async () => {
  if (!profileOrdersList) return;
  if (!currentUser) {
    profileOrdersList.innerHTML = "<p class='empty-state'>Login për të parë porositë.</p>";
    return;
  }
  try {
    const response = await apiFetch("/api/orders/mine");
    const data = await response.json();
    const orders = data.orders || [];
    if (!orders.length) {
      profileOrdersList.innerHTML = "<p class='empty-state'>Nuk ke ende kërkesa blerjeje.</p>";
      return;
    }
    profileOrdersList.innerHTML = orders.map((o) => orderCardMarkup(o)).join("");
  } catch (_error) {
    profileOrdersList.innerHTML = "<p class='empty-state'>Nuk u ngarkuan porositë.</p>";
  }
};

const loadSellerOrders = async () => {
  if (!sellerOrdersList) return;
  if (!currentUser?.isSeller) {
    sellerOrdersList.innerHTML = "<p class='empty-state'>Vetëm shitësi sheh këto kërkesa.</p>";
    return;
  }
  try {
    const response = await apiFetch("/api/seller/orders");
    const data = await response.json();
    const orders = data.orders || [];
    if (!orders.length) {
      sellerOrdersList.innerHTML = "<p class='empty-state'>Nuk ka kërkesa ende.</p>";
      return;
    }
    sellerOrdersList.innerHTML = orders.map((o) => orderCardMarkup(o, { seller: true })).join("");
    sellerOrdersList.querySelectorAll("[data-order-status]").forEach((select) => {
      select.addEventListener("change", async () => {
        const response = await apiFetch(`/api/orders/${select.dataset.orderStatus}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: select.value }),
        });
        const data = await response.json();
        alert(data.message || (data.ok ? "U përditësua." : "Dështoi."));
        if (data.ok) await loadSellerOrders();
      });
    });
  } catch (_error) {
    sellerOrdersList.innerHTML = "<p class='empty-state'>Nuk u ngarkuan kërkesat.</p>";
  }
};

const closePinDetail = () => {
  if (!pinDetailModal) return;
  pinDetailModal.classList.add("hidden");
  activeDetailPin = null;
};

const setupEditModal = () => {
  if (!editPinForm || !cancelEditBtn) return;
  cancelEditBtn.addEventListener("click", closeEditModal);
  editModal?.addEventListener("click", (event) => {
    if (event.target === editModal) closeEditModal();
  });

  editPinForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await apiFetch(`/api/pins/${editPinId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.value.trim(),
          bio: editBio?.value?.trim() || "",
          category: editCategory.value,
          price: Number(document.getElementById("editPrice")?.value || 0),
        }),
      });
      const data = await response.json();
      if (!data.ok) {
        alert(data.message || "Update failed.");
        return;
      }
      closeEditModal();
      feedState.page = 1;
      await loadPins({ append: false });
      await loadMyPins();
      await loadSavedPins();
    } catch (_error) {
      alert("Update failed. Try again.");
    }
  });
};

const setupPinDetailModal = () => {
  closeDetailBtn?.addEventListener("click", closePinDetail);
  pinDetailModal?.addEventListener("click", (event) => {
    if (event.target === pinDetailModal) closePinDetail();
  });
};

const setupPinActions = () => {
  const handleAction = async (event) => {
    const button = event.target.closest("button[data-action]");
    if (button) {
      event.stopPropagation();
      const action = button.dataset.action;
      const pinId = button.dataset.id;
      if (!action || !pinId) return;

      try {
        if (action === "buy") {
          if (!currentUser) {
            alert(t("buy.needLogin"));
            window.location.href = "login.html";
            return;
          }
          if (String(pinId).startsWith("demo-")) {
            alert(
              currentLang === "sq"
                ? "Ky është katalog demo. Lidhe API-n me databazën për porosi reale."
                : "This is a demo catalog item. Connect the API to your database for real orders."
            );
            return;
          }
          openOrderModal(pinId, button.dataset.title || "", button.dataset.price || "");
          return;
        }

        if (action === "share") {
          if (String(pinId).startsWith("demo-")) {
            const url = `${window.location.origin}/explore.html`;
            if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
            alert(currentLang === "sq" ? "Linku i dyqanit u kopjua." : "Shop link copied.");
            return;
          }
          await shareDesign(pinId);
          return;
        }

        if ((action === "like" || action === "save") && String(pinId).startsWith("demo-")) {
          alert(
            currentLang === "sq"
              ? "Like/Save aktivizohen kur katalogu lidhet me serverin."
              : "Like/Save activate when the shop is connected to the server."
          );
          return;
        }

        if (action === "like" || action === "save") {
          const response = await apiFetch(`/api/pins/${pinId}/${action}`, { method: "POST" });
          const data = await response.json();
          if (!data.ok) {
            alert(data.message || "Please login first.");
            return;
          }
        }

        if (action === "delete") {
          if (!confirm("Delete this design?")) return;
          const response = await apiFetch(`/api/pins/${pinId}`, { method: "DELETE" });
          const data = await response.json();
          if (!data.ok) {
            alert(data.message || "Delete failed.");
            return;
          }
        }

        if (action === "edit") {
          const oldTitle = decodeURIComponent(button.dataset.title || "");
          const oldBio = decodeURIComponent(button.dataset.bio || "");
          const oldCategory = decodeURIComponent(button.dataset.category || "general");
          openEditModal({ id: pinId, title: oldTitle, bio: oldBio, category: oldCategory });
          return;
        }
      } catch (_error) {
        alert("Action failed. Try again.");
        return;
      }

      feedState.page = 1;
      await loadPins({ append: false });
      await loadMyPins();
      await loadSavedPins();
      await loadLikedPins();
      if (pinDetailModal && !pinDetailModal.classList.contains("hidden")) {
        await openPinDetail(pinId);
      }
      return;
    }

    const card = event.target.closest("[data-pin-id]");
    if (!card || event.target.closest("a")) return;
    openPinDetail(card.dataset.pinId);
  };

  document.addEventListener("click", handleAction);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-pin-id]");
    if (!card) return;
    event.preventDefault();
    openPinDetail(card.dataset.pinId);
  });
};

const refreshProfileForm = () => {
  if (!currentUser) return;
  const nameInput = document.getElementById("profileName");
  const bioInput = document.getElementById("profileBio");
  const statsEl = document.getElementById("profileStats");
  const avatarEl = document.getElementById("profileAvatar");
  if (nameInput) nameInput.value = currentUser.name || "";
  if (bioInput) bioInput.value = currentUser.bio || "";
  if (statsEl) {
    statsEl.textContent = `${currentUser.orderCount || 0} porosi · ${currentUser.savedCount || 0} të ruajtura · ${currentUser.likedCount || 0} të pëlqyera`;
  }
  if (avatarEl) avatarEl.textContent = currentUser.initials || "U";
  document.querySelectorAll(".seller-only").forEach((el) => {
    el.classList.toggle("hidden", !currentUser.isSeller);
  });
  const gate = document.getElementById("sellerGateMessage");
  if (gate) {
    if (!currentUser) {
      gate.classList.remove("hidden");
      gate.textContent = "Login si shitës për të ngarkuar dizajne.";
    } else if (!currentUser.isSeller) {
      gate.classList.remove("hidden");
      gate.textContent =
        "Kjo faqe është për shitësin. Klientët mund të shohin, like, save, share dhe të blejnë nga katalogu. Llogaria demo: seller@archimuse.app / seller123";
    } else {
      gate.classList.add("hidden");
    }
  }
};

const setupProfileBio = () => {
  const form = document.getElementById("profileBioForm");
  if (!form) return;

  const nameInput = document.getElementById("profileName");
  const bioInput = document.getElementById("profileBio");
  const messageEl = document.getElementById("profileMessage");
  const videoPref = document.getElementById("profileVideoBg");
  const notifPref = document.getElementById("profileEmailNotif");

  if (videoPref) {
    videoPref.checked = localStorage.getItem("archimuse-video-bg") !== "off";
    videoPref.addEventListener("change", (e) => {
      localStorage.setItem("archimuse-video-bg", e.target.checked ? "on" : "off");
      toggleVideoBackground(e.target.checked);
    });
  }

  if (notifPref) {
    notifPref.checked = localStorage.getItem("archimuse-notifications") === "on";
    notifPref.addEventListener("change", (e) => {
      localStorage.setItem("archimuse-notifications", e.target.checked ? "on" : "off");
    });
  }

  refreshProfileForm();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await apiFetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput?.value?.trim(),
          bio: bioInput?.value?.trim(),
        }),
      });
      const data = await response.json();
      messageEl.textContent = data.message;
      messageEl.style.color = data.ok ? "#137b26" : "#a02727";
      if (data.ok) {
        currentUser = data.user;
        updateNavAuth();
        refreshProfileForm();
      }
    } catch (_error) {
      messageEl.textContent = "Failed to save profile.";
      messageEl.style.color = "#a02727";
    }
  });
};

const setupProfileTabs = () => {
  const tabButtons = document.querySelectorAll("[data-profile-tab]");
  if (!tabButtons.length) return;

  const settingsPanel = document.getElementById("profileSettingsPanel");
  const tabMap = {
    my: profileMyGrid,
    saved: profileSavedGrid,
    liked: profileLikedGrid,
    orders: profileOrdersPanel,
    "seller-orders": sellerOrdersPanel,
  };

  const activateTab = (tab) => {
    tabButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.profileTab === tab));
    if (settingsPanel) settingsPanel.classList.toggle("hidden", tab !== "settings");
    Object.entries(tabMap).forEach(([key, section]) => {
      if (!section) return;
      section.classList.toggle("hidden", key !== tab);
    });
    if (tab === "orders") loadMyOrders();
    if (tab === "seller-orders") loadSellerOrders();
    window.location.hash = tab;
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.profileTab));
  });

  const hash = window.location.hash.replace("#", "");
  const allowed = ["settings", "my", "saved", "liked", "orders", "seller-orders"];
  activateTab(allowed.includes(hash) ? hash : "settings");
};

let adminPanelReady = false;
const setupAdminPanel = () => {
  if (!document.body.classList.contains("admin-page")) return;
  const gate = document.getElementById("adminGate");
  const ordersList = document.getElementById("adminOrdersList");
  const designsList = document.getElementById("adminDesignsList");

  if (!currentUser?.isAdmin) {
    if (gate) {
      gate.classList.remove("hidden");
      gate.textContent =
        currentLang === "sq"
          ? "Hyr si admin: admin@archimuse.app / admin123"
          : "Login as admin: admin@archimuse.app / admin123";
    }
    if (ordersList) ordersList.innerHTML = `<p class="empty-state">${t("admin.gate")}</p>`;
    return;
  }
  if (gate) gate.classList.add("hidden");

  const showTab = (tab) => {
    document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.adminTab === tab);
    });
    document.getElementById("adminOrdersPanel")?.classList.toggle("hidden", tab !== "orders");
    document.getElementById("adminDesignsPanel")?.classList.toggle("hidden", tab !== "designs");
    document.getElementById("adminUploadPanel")?.classList.toggle("hidden", tab !== "upload");
    if (tab === "orders") loadAdminOrders();
    if (tab === "designs") loadAdminDesigns();
  };

  if (!adminPanelReady) {
    adminPanelReady = true;
    document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
      btn.addEventListener("click", () => showTab(btn.dataset.adminTab));
    });
    document.getElementById("refreshAdminOrders")?.addEventListener("click", loadAdminOrders);
    document.getElementById("adminOrderFilter")?.addEventListener("change", loadAdminOrders);
  }

  showTab("orders");
};

const loadAdminOrders = async () => {
  const list = document.getElementById("adminOrdersList");
  if (!list) return;
  const status = document.getElementById("adminOrderFilter")?.value || "all";
  try {
    const response = await apiFetch(`/api/admin/orders?status=${encodeURIComponent(status)}`);
    const data = await response.json();
    if (!data.ok) {
      list.innerHTML = `<p class="empty-state">${escapeHtml(data.message || t("admin.gate"))}</p>`;
      return;
    }
    const orders = data.orders || [];
    if (!orders.length) {
      list.innerHTML = `<p class="empty-state">${t("admin.noOrders")}</p>`;
      return;
    }
    list.innerHTML = orders.map((o) => orderCardMarkup(o, { seller: true })).join("");
    list.querySelectorAll("[data-order-status]").forEach((select) => {
      select.addEventListener("change", async () => {
        const res = await apiFetch(`/api/orders/${select.dataset.orderStatus}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: select.value }),
        });
        const payload = await res.json();
        alert(payload.message || (payload.ok ? "Updated" : "Failed"));
        if (payload.ok) loadAdminOrders();
      });
    });
  } catch (_error) {
    list.innerHTML = `<p class="empty-state">${t("admin.gate")}</p>`;
  }
};

const loadAdminDesigns = async () => {
  const wrap = document.getElementById("adminDesignsList");
  if (!wrap) return;
  try {
    const response = await apiFetch("/api/admin/designs");
    const data = await response.json();
    const pins = data.pins || [];
    if (!pins.length) {
      wrap.innerHTML = `<p class="empty-state">${currentLang === "sq" ? "Nuk ka dizajne." : "No designs yet."}</p>`;
      return;
    }
    wrap.innerHTML = `
      <table class="admin-designs-table">
        <thead>
          <tr>
            <th>Design</th>
            <th>Price</th>
            <th>Sale</th>
            <th>Stats</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${pins
            .map(
              (pin) => `
            <tr>
              <td>
                <div class="admin-design-cell">
                  <img src="${escapeHtml(pin.imageUrl)}" alt="" />
                  <div>
                    <strong>${escapeHtml(pin.title)}</strong>
                    <small>${escapeHtml(pin.category)}</small>
                  </div>
                </div>
              </td>
              <td>${escapeHtml(pin.priceLabel || "—")}</td>
              <td>${pin.forSale !== false ? "Yes" : "No"}</td>
              <td>♥ ${pin.likeCount || 0} · ★ ${pin.saveCount || 0}</td>
              <td>
                <button class="small-btn" data-action="open" data-id="${pin._id}">Open</button>
                <button class="small-btn danger" data-action="delete" data-id="${pin._id}">Delete</button>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
    wrap.querySelectorAll('button[data-action="open"]').forEach((btn) => {
      btn.addEventListener("click", () => openPinDetail(btn.dataset.id));
    });
    wrap.querySelectorAll('button[data-action="delete"]').forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm(currentLang === "sq" ? "Fshi këtë dizajn?" : "Delete this design?")) return;
        const res = await apiFetch(`/api/pins/${btn.dataset.id}`, { method: "DELETE" });
        const payload = await res.json();
        alert(payload.message || (payload.ok ? "Deleted" : "Failed"));
        if (payload.ok) loadAdminDesigns();
      });
    });
  } catch (_error) {
    wrap.innerHTML = `<p class="empty-state">${t("admin.gate")}</p>`;
  }
};

initTheme();
setupLanguage();
setupVideoBackground();
setupAccountDrawer();
setupBurgerMenu();
setupPageDecor();
setupSearch();
setupProjectFilters();
setupInfiniteScroll();
setupEditModal();
setupPinDetailModal();
setupOrderModal();
setupPinActions();
setupProfileTabs();
setupProfileBio();
setupAuthForm();
setupUploadForm();
setupPinterestImport();
setupUploadTabs();
setupUploadPreview();
document.getElementById("profileLogoutBtn")?.addEventListener("click", logoutUser);
updateUserBadge().then(async () => {
  refreshProfileForm();
  applyLanguage(currentLang);
  if (isProjectsPage) {
    projectsState.page = 1;
    projectsState.hasMore = true;
    await loadProjects({ append: false });
  } else if (!document.body.classList.contains("admin-page")) {
    feedState.page = 1;
    feedState.hasMore = true;
    feedState.limit = 24;
    await loadPins({ append: false });
  }
  await loadMyPins();
  await loadSavedPins();
  await loadLikedPins();
  const deepPin = new URLSearchParams(window.location.search).get("pin");
  if (deepPin) await openPinDetail(deepPin);
});
