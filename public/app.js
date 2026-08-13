const THEME_KEY = "archimuse-theme";
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
    const response = await fetch("/api/me");
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
    await fetch("/api/logout", { method: "POST" });
  } catch (_error) {
    /* ignore */
  }
  currentUser = null;
  window.location.href = "index.html";
};

const updateNavAuth = () => {
  const topbar = document.querySelector(".topbar");
  const loginLink = document.querySelector('nav a[href="login.html"]');
  let authBar = document.getElementById("authNavBar");
  const guestBurger = document.getElementById("burgerBtn");

  if (!topbar) return;

  if (currentUser) {
    topbar.classList.add("topbar--auth");
    document.body.classList.add("user-logged-in");
    loginLink?.classList.add("hidden");
    guestBurger?.classList.add("hidden");

    if (window.location.pathname.endsWith("login.html")) {
      window.location.replace("profile.html");
      return;
    }

    const nav = topbar.querySelector("nav.main-nav, nav");
    if (nav) nav.classList.add("hidden");

    if (!authBar) {
      authBar = document.createElement("div");
      authBar.id = "authNavBar";
      authBar.className = "auth-nav-bar";
      topbar.insertBefore(authBar, topbar.querySelector(".topbar-right"));
    }

    const pinLabel = currentUser.pinCount != null ? currentUser.pinCount : 0;
    const roleHint = currentUser.isSeller ? "Shitës" : "Klient";

    authBar.innerHTML = `
      <a href="profile.html" class="user-chip user-chip--compact">
        <span class="user-avatar">${escapeHtml(currentUser.initials || currentUser.name?.[0] || "U")}</span>
        <span class="user-chip-text">
          <strong>${escapeHtml(currentUser.name)}</strong>
          <small>${escapeHtml(roleHint)} · ${escapeHtml(pinLabel)} dizajne</small>
        </span>
      </a>
      ${currentUser.isSeller ? '<a href="upload.html" class="auth-upload-btn">+ Ngarko</a>' : '<a href="profile.html#orders" class="auth-upload-btn">Porositë</a>'}
      <button type="button" id="authBurgerBtn" class="auth-burger-btn" aria-label="Hap menunë e llogarisë" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `;

    authBar.classList.remove("hidden");
    updateAccountDrawerContent();
    bindAccountDrawerEvents();

    if (userBadge) {
      userBadge.textContent = currentUser.name;
      userBadge.classList.add("user-badge--auth");
    }
    refreshProfileForm();
  } else {
    topbar.classList.remove("topbar--auth");
    document.body.classList.remove("user-logged-in");
    loginLink?.classList.remove("hidden");
    authBar?.classList.add("hidden");
    guestBurger?.classList.remove("hidden");
    closeAccountDrawer();

    const nav = topbar.querySelector("nav.main-nav, nav");
    if (nav) nav.classList.remove("hidden");

    if (userBadge) {
      userBadge.textContent = "Guest";
      userBadge.classList.remove("user-badge--auth");
    }
  }
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
  const drawer = document.getElementById("accountDrawer");
  const overlay = document.getElementById("accountOverlay");
  const btn = document.getElementById("authBurgerBtn");
  updateAccountDrawerContent();
  drawer?.classList.add("open");
  overlay?.classList.add("open");
  btn?.classList.add("open");
  btn?.setAttribute("aria-expanded", "true");
  document.body.classList.add("account-drawer-open");
};

const updateAccountDrawerContent = () => {
  const drawer = document.getElementById("accountDrawer");
  if (!drawer || !currentUser) return;

  const bioText = currentUser.bio?.trim() || "Shto bio-n tënde";
  const pinCount = currentUser.pinCount ?? 0;
  const savedCount = currentUser.savedCount ?? 0;
  const likedCount = currentUser.likedCount ?? 0;
  const activeTheme = localStorage.getItem(THEME_KEY) || "cream";

  drawer.innerHTML = `
    <div class="account-drawer-header">
      <div class="account-drawer-user">
        <span class="user-avatar user-avatar--lg">${escapeHtml(currentUser.initials || currentUser.name?.[0] || "U")}</span>
        <div>
          <strong>${escapeHtml(currentUser.name)}</strong>
          <p>${escapeHtml(truncate(bioText, 72))}</p>
        </div>
      </div>
      <button type="button" class="account-drawer-close" aria-label="Mbyll">×</button>
    </div>
    <div class="account-drawer-body">
      <div class="drawer-stats">
        <a href="profile.html#my"><span>${pinCount}</span><small>Postime</small></a>
        <a href="profile.html#saved"><span>${savedCount}</span><small>Të ruajtura</small></a>
        <a href="profile.html#liked"><span>${likedCount}</span><small>Të pëlqyera</small></a>
      </div>

      <section class="drawer-section">
        <h4>Eksploro</h4>
        <a href="index.html" class="drawer-link">🏠 Home</a>
        <a href="explore.html" class="drawer-link">🔍 Explore</a>
        <a href="projects.html" class="drawer-link">📐 Projects</a>
      </section>

      <section class="drawer-section">
        <h4>Krijimi</h4>
        <a href="upload.html" class="drawer-link drawer-link--primary">+ Ngarko dizajn</a>
        <a href="upload.html#import" class="drawer-link">📌 Import Pinterest</a>
      </section>

      <section class="drawer-section">
        <h4>Llogaria & cilësimet</h4>
        <a href="profile.html#settings" class="drawer-link">⚙️ Cilësimet & bio</a>
        <a href="saved.html" class="drawer-link">💾 Të ruajtura (${savedCount})</a>
        <a href="profile.html#liked" class="drawer-link">❤️ Të pëlqyera (${likedCount})</a>
        <a href="profile.html#my" class="drawer-link">🖼️ Dizajnet e mia</a>
      </section>

      <section class="drawer-section">
        <h4>Preferencat</h4>
        <div class="drawer-theme-switch">
          <button type="button" class="drawer-theme-btn ${activeTheme === "light" ? "active" : ""}" data-theme="light">Light</button>
          <button type="button" class="drawer-theme-btn ${activeTheme === "cream" ? "active" : ""}" data-theme="cream">Cream</button>
          <button type="button" class="drawer-theme-btn ${activeTheme === "dark" ? "active" : ""}" data-theme="dark">Dark</button>
        </div>
        <label class="drawer-toggle">
          <input type="checkbox" id="drawerVideoBg" ${localStorage.getItem("archimuse-video-bg") !== "off" ? "checked" : ""} />
          <span>Video background</span>
        </label>
        <label class="drawer-toggle">
          <input type="checkbox" id="drawerAutoplay" ${localStorage.getItem("archimuse-autoplay") === "on" ? "checked" : ""} />
          <span>Auto-play preview në modal</span>
        </label>
      </section>

      <button type="button" id="drawerLogout" class="drawer-logout">Dil nga llogaria</button>
    </div>
  `;

  drawer.querySelector(".account-drawer-close")?.addEventListener("click", closeAccountDrawer);
  drawer.querySelector("#drawerLogout")?.addEventListener("click", logoutUser);
  drawer.querySelectorAll(".drawer-link, .drawer-stats a").forEach((link) => {
    link.addEventListener("click", () => closeAccountDrawer());
  });
  drawer.querySelectorAll(".drawer-theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem(THEME_KEY, btn.dataset.theme);
      applyTheme(btn.dataset.theme);
      updateAccountDrawerContent();
    });
  });
  drawer.querySelector("#drawerVideoBg")?.addEventListener("change", (e) => {
    localStorage.setItem("archimuse-video-bg", e.target.checked ? "on" : "off");
    toggleVideoBackground(e.target.checked);
  });
  drawer.querySelector("#drawerAutoplay")?.addEventListener("change", (e) => {
    localStorage.setItem("archimuse-autoplay", e.target.checked ? "on" : "off");
  });
};

const bindAccountDrawerEvents = () => {
  if (accountDrawerBound) return;
  accountDrawerBound = true;

  document.getElementById("accountOverlay")?.addEventListener("click", closeAccountDrawer);

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("#authBurgerBtn");
    if (!btn) return;
    if (btn.classList.contains("open")) closeAccountDrawer();
    else openAccountDrawer();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAccountDrawer();
  });
};

const setupAccountDrawer = () => {
  if (document.getElementById("accountDrawer")) return;

  const overlay = document.createElement("div");
  overlay.id = "accountOverlay";
  overlay.className = "account-overlay";

  const drawer = document.createElement("aside");
  drawer.id = "accountDrawer";
  drawer.className = "account-drawer";
  drawer.setAttribute("aria-label", "Menyja e llogarisë");

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  bindAccountDrawerEvents();
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
  if (document.querySelector(".page-decor")) return;

  const decor = document.createElement("div");
  decor.className = "page-decor";
  decor.setAttribute("aria-hidden", "true");
  decor.innerHTML = `
    <img class="decor-float decor-a" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70" alt="" loading="lazy" />
    <img class="decor-float decor-b" src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=70" alt="" loading="lazy" />
    <img class="decor-float decor-c" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=70" alt="" loading="lazy" />
  `;
  document.body.prepend(decor);

  const main = document.querySelector("main");
  if (main) main.classList.add("page-enter");
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
  if (pin.forSale) return `<span class="pin-badge curated">Në shitje</span>`;
  if (pin.source === "pinterest") return `<span class="pin-badge pinterest">Pinterest</span>`;
  if (pin.source === "curated") return `<span class="pin-badge curated">Studio</span>`;
  return `<span class="pin-badge upload">Upload</span>`;
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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      messageEl.textContent = data.message;
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
  const pinterestLink = pin.sourceUrl
    ? `<a class="pin-source-link" href="${escapeHtml(pin.sourceUrl)}" target="_blank" rel="noopener">View source</a>`
    : "";

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
          <button class="small-btn" data-action="share" data-id="${pin._id}">↗ Share</button>
          ${pin.forSale ? `<button class="small-btn buy-btn" data-action="buy" data-id="${pin._id}" data-title="${encodeURIComponent(pin.title)}" data-price="${escapeHtml(pin.priceLabel || "")}">Blej</button>` : ""}
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
    const response = await fetch(`/api/projects?${params}`);
    const data = await response.json();
    const pins = data.pins || [];

    if (projectsTotalEl) projectsTotalEl.textContent = String(data.total || pins.length);
    if (!append && featuredProjects) {
      const featRes = await fetch("/api/projects?sort=most-viewed&limit=3");
      const featData = await featRes.json();
      renderFeaturedProjects(featData.pins || pins);
    }
    renderProjects(pins, append);
    projectsState.hasMore = Boolean(data.hasMore);
    if (projectsEndHint) {
      projectsEndHint.classList.toggle("hidden", !projectsState.hasMore);
    }
  } catch (_error) {
    if (!append) projectsGrid.innerHTML = "<p class='empty-state'>Nuk u ngarkuan projekte.</p>";
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
    const response = await fetch(`/api/pins${query ? `?${query}` : ""}`);
    const data = await response.json();
    const pins = data.pins || [];

    if (pinsGrid) renderPins(pins, append);
    else if (homeDecorGrid) renderHomeDecor(pins, append);

    feedState.hasMore = Boolean(data.hasMore);
  } catch (_error) {
    if (!append && activeGrid) {
      activeGrid.innerHTML = "<p class='empty-state'>Unable to load designs right now.</p>";
    }
  } finally {
    hideSkeleton();
    feedState.loading = false;
  }
};

const loadMyPins = async () => {
  if (!myPinsGrid && !profileMyGrid) return;
  try {
    const response = await fetch("/api/my-pins");
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
    const response = await fetch("/api/saved-pins");
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
    const response = await fetch("/api/liked-pins");
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
      const response = await fetch("/api/pins", {
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
      const response = await fetch("/api/pins/from-pinterest", {
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

const openPinDetail = async (pinId) => {
  if (!pinDetailModal || !pinDetailContent) return;
  try {
    const [pinRes, commentsRes] = await Promise.all([
      fetch(`/api/pins/${pinId}`),
      fetch(`/api/pins/${pinId}/comments`),
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
        <article class="comment-item">
          <strong>${escapeHtml(c.user?.name || "User")}</strong>
          <p>${escapeHtml(c.text)}</p>
          <small>${new Date(c.createdAt).toLocaleString("sq-AL")}</small>
        </article>`
          )
          .join("")
      : `<p class="empty-state">Ende nuk ka komente. Ji i pari.</p>`;

    pinDetailContent.innerHTML = `
      <img class="detail-image" src="${pin.imageUrl}" alt="${escapeHtml(pin.title)}" />
      <div class="detail-body">
        <div class="pin-meta-top">${sourceBadge(pin)}<span class="pin-category">${escapeHtml(categoryLabel(pin.category))}</span>${priceBadge(pin)}</div>
        <h2>${escapeHtml(pin.title)}</h2>
        <p class="detail-bio">${escapeHtml(pin.bio || "Nuk ka përshkrim për këtë dizajn.")}</p>
        <p class="pin-author">By ${escapeHtml(pin.user?.name || "Studio")} · 👁 ${formatViews(pin.viewCount)} · ↗ ${pin.shareCount || 0}</p>
        <div class="pin-actions">
          <button class="small-btn ${pin.isLiked ? "active" : ""}" data-action="like" data-id="${pin._id}">♥ ${pin.likeCount || 0}</button>
          <button class="small-btn ${pin.isSaved ? "active" : ""}" data-action="save" data-id="${pin._id}">★ ${pin.saveCount || 0}</button>
          <button class="small-btn" data-action="share" data-id="${pin._id}">↗ Share</button>
          ${pin.forSale ? `<button class="btn buy-btn" data-action="buy" data-id="${pin._id}" data-title="${encodeURIComponent(pin.title)}" data-price="${escapeHtml(pin.priceLabel || "")}">Blej tani</button>` : ""}
        </div>
        <div class="comments-box">
          <h3>Komente</h3>
          <div id="commentsList">${commentsMarkup}</div>
          <form id="commentForm" class="comment-form" data-pin-id="${pin._id}">
            <textarea name="text" rows="2" maxlength="800" placeholder="${currentUser ? "Shkruaj një koment…" : "Login për të komentuar"}" ${currentUser ? "required" : "disabled"}></textarea>
            <button class="small-btn" type="submit" ${currentUser ? "" : "disabled"}>Dërgo</button>
          </form>
        </div>
      </div>
    `;
    pinDetailModal.classList.remove("hidden");
    bindCommentForm();
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
      const response = await fetch(`/api/pins/${pinId}/comments`, {
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
  if (currentUser) {
    if (fullName && !fullName.value) fullName.value = currentUser.name || "";
    if (email && !email.value) email.value = currentUser.email || "";
  }
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
      const response = await fetch("/api/orders", {
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
    const response = await fetch(`/api/pins/${pinId}/share`, { method: "POST" });
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
    const response = await fetch("/api/orders/mine");
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
    const response = await fetch("/api/seller/orders");
    const data = await response.json();
    const orders = data.orders || [];
    if (!orders.length) {
      sellerOrdersList.innerHTML = "<p class='empty-state'>Nuk ka kërkesa ende.</p>";
      return;
    }
    sellerOrdersList.innerHTML = orders.map((o) => orderCardMarkup(o, { seller: true })).join("");
    sellerOrdersList.querySelectorAll("[data-order-status]").forEach((select) => {
      select.addEventListener("change", async () => {
        const response = await fetch(`/api/orders/${select.dataset.orderStatus}/status`, {
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
      const response = await fetch(`/api/pins/${editPinId.value}`, {
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
          openOrderModal(pinId, button.dataset.title || "", button.dataset.price || "");
          return;
        }

        if (action === "share") {
          await shareDesign(pinId);
          return;
        }

        if (action === "like" || action === "save") {
          const response = await fetch(`/api/pins/${pinId}/${action}`, { method: "POST" });
          const data = await response.json();
          if (!data.ok) {
            alert(data.message || "Please login first.");
            return;
          }
        }

        if (action === "delete") {
          if (!confirm("Delete this design?")) return;
          const response = await fetch(`/api/pins/${pinId}`, { method: "DELETE" });
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
      const response = await fetch("/api/profile", {
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

initTheme();
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
updateUserBadge().then(async () => {
  refreshProfileForm();
  if (isProjectsPage) {
    projectsState.page = 1;
    projectsState.hasMore = true;
    await loadProjects({ append: false });
  } else {
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
