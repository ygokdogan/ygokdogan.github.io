// ============================================================
//  Sitenin mantığı. İçerik için data.js'i düzenle.
// ============================================================

const I18N = {
  tr: {
    navAbout: "Hakkımda", navGames: "Oyunlar", navCode: "Projeler", navContact: "İletişim", seeGames: "Oyunlarımı oyna",
    hint: "fareyi gezdir, kum dök", hintTouch: "ekrana dokun, kum dök", clear: "kumu temizle",
    class: "Sınıf:", stGames: "oyun", stRepos: "repo", stLangs: "dil", stFollowers: "takipçi", stJams: "jam", stStars: "yıldız", inventory: "ENVANTER", secProfile: "KARAKTER PROFİLİ", secStats: "İSTATİSTİKLER", secArsenal: "TEKNOLOJİ CEPHANELİĞİ", arsenalHint: "projeleri gör", secQuests: "AKTİF GÖREVLER", secAch: "BAŞARIMLAR", usedIn: "{n} projede kullanıldı", noUse: "Henüz yayında bir projede yok.", tGame: "oyun", tRepo: "repo", tApp: "uygulama", allRepos: "tüm repolarda", joinedWith: "{g} ile katıldı", close: "Kapat", since: "GitHub'da {y}'ten beri", repoCount: "{n} repo",
    gamesTitle: "itch.io'daki oyunlarım", moreGames: "Tüm oyunları detaylı gör", lessGames: "Detayları gizle", details: "detay", codeTitle: "GitHub projelerim",
    loading: "Yükleniyor…", all: "Tümü", play: "Oyna", playBrowser: "Tarayıcıda oyna", mJam: "Jam", mTeam: "Takım", mPlat: "Platform", mEngine: "Motor", source: "Kaynak",
    noDesc: "Açıklama yok.", pinned: "öne çıkan", closed: "kapalı kaynak", featured: "ÖNE ÇIKAN PROJE", openSite: "Siteyi aç",
    repoError: "Projeler şu an yüklenemedi. Hepsi GitHub'da:", copy: "Adresi kopyala", copied: "Kopyalandı", contactText: "Bir proje, jam takımı ya da sadece merhaba demek için bana ulaşabilirsin.", title: "Portfolyo",
    achSand: ["Kum Sanatçısı", "İlk kum yığınını döktün."],
    achLang: ["Poliglot", "Dili değiştirdin."],
    achClean: ["Temizlikçi", "Bütün emeğini sildin."],
    unlocked: "BAŞARIM AÇILDI",
  },
  en: {
    navAbout: "About", navGames: "Games", navCode: "Projects", navContact: "Contact", seeGames: "Play my games",
    hint: "move your mouse to pour sand", hintTouch: "tap the screen to pour sand", clear: "clear sand",
    class: "Class:", stGames: "games", stRepos: "repos", stLangs: "languages", stFollowers: "followers", stJams: "jams", stStars: "stars", inventory: "INVENTORY", secProfile: "CHARACTER PROFILE", secStats: "STATS", secArsenal: "TECH ARSENAL", arsenalHint: "see projects", secQuests: "CURRENT QUESTS", secAch: "ACHIEVEMENTS", usedIn: "used in {n} projects", noUse: "Not in a published project yet.", tGame: "game", tRepo: "repo", tApp: "app", allRepos: "in every repo", joinedWith: "entered with {g}", close: "Close", since: "on GitHub since {y}", repoCount: "{n} repos",
    gamesTitle: "Games on itch.io", moreGames: "See all games in detail", lessGames: "Hide details", details: "details", codeTitle: "GitHub projects",
    loading: "Loading…", all: "All", play: "Play", playBrowser: "Play in browser", mJam: "Jam", mTeam: "Team", mPlat: "Platforms", mEngine: "Engine", source: "Source",
    noDesc: "No description.", pinned: "featured", closed: "closed source", featured: "FEATURED PROJECT", openSite: "Open the site",
    repoError: "Couldn't load projects right now. They're all on GitHub:", copy: "Copy address", copied: "Copied", contactText: "Reach out for a project, a jam team, or just to say hi.", title: "Portfolio",
    achSand: ["Sand Artist", "You poured your first sand pile."],
    achLang: ["Polyglot", "You switched the language."],
    achClean: ["Janitor", "You wiped away all your hard work."],
    unlocked: "ACHIEVEMENT UNLOCKED",
  },
};

const LANG_COLORS = {
  C: "#a8b9cc", "C++": "#f34b7d", "C#": "#3fd0c9", ShaderLab: "#b48cff",
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", GDScript: "#478cbf", Java: "#b07219",
};
// Kartuş gövde renkleri (sırayla)
const CART_COLORS = [["#ff5c8a", "#c2366a"], ["#3fd0c9", "#21918c"], ["#ffb454", "#d07f22"], ["#9b7bff", "#6648c9"], ["#8fd16a", "#5a9a3a"]];

let lang = localStorage.getItem("lang") || (navigator.language.startsWith("tr") ? "tr" : "en");
let repos = null;
const PRIVATE = typeof PRIVATE_PROJECTS !== "undefined" ? PRIVATE_PROJECTS : [];
let repoFilter = "all";
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (s) => document.querySelector(s);
const t = (k) => I18N[lang][k];
// Lucide simgesi (index.html içindeki sprite'tan)
const ic = (n, cls = "") => `<svg class="ic${cls ? " " + cls : ""}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ghUrl = `https://github.com/${PROFILE.githubUser}`;
const itchUrl = `https://${PROFILE.itchUser}.itch.io`;

// ---------------- Başarımlar ----------------
const earned = new Set(JSON.parse(sessionStorage.getItem("ach") || "[]"));
function achieve(key) {
  if (earned.has(key)) return;
  earned.add(key);
  sessionStorage.setItem("ach", JSON.stringify([...earned]));
  const [title, desc] = t(key);
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="trophy">${ic("trophy")}</span><div><b>${t("unlocked")}: ${esc(title)}</b><span>${esc(desc)}</span></div>`;
  $("#toasts").appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

// ---------------- Statik içerik ----------------
function renderStatic() {
  document.documentElement.lang = lang;
  document.title = `${PROFILE.name} — ${t("title")}`;
  const touch = matchMedia("(pointer: coarse)").matches;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    let key = el.dataset.i18n, icon = el.dataset.ic;
    if (key === "hint" && touch) { key = "hintTouch"; icon = "hand"; }
    el.innerHTML = (icon ? ic(icon) : "") + esc(t(key));
  });
  $("#langBtn").textContent = lang === "tr" ? "EN" : "TR";

  $("#name").textContent = PROFILE.name;
  $("#role").textContent = PROFILE.role[lang];
  $("#tagline").textContent = PROFILE.tagline?.[lang] ?? "";
  $("#tagline").hidden = !PROFILE.tagline;
  $("#ghBtn").href = ghUrl;
  $("#itchBtn").href = itchUrl;
  $("#aboutText").innerHTML = PROFILE.about[lang].map((p) => `<p>${esc(p)}</p>`).join("");
  renderCard();
  $("#year").textContent = new Date().getFullYear();
  $("#footName").textContent = PROFILE.name;

  $("#contactLinks").innerHTML = [
    PROFILE.email && `<span class="mailbox"><a class="btn brand" href="mailto:${esc(PROFILE.email)}">${ic("mail")}${esc(PROFILE.email)}</a><button class="btn copy" id="copyMail" title="${t("copy")}" aria-label="${t("copy")}">${ic("copy")}</button></span>`,
    `<a class="btn" href="${ghUrl}" target="_blank" rel="noopener">${ic("brand-github", "brand")}GitHub${ic("arrow-up-right", "ext")}</a>`,
    `<a class="btn" href="${itchUrl}" target="_blank" rel="noopener">${ic("brand-itch", "brand")}itch.io${ic("arrow-up-right", "ext")}</a>`,
    PROFILE.linkedin && `<a class="btn" href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">${ic("brand-linkedin", "brand")}LinkedIn${ic("arrow-up-right", "ext")}</a>`,
  ].filter(Boolean).join("");
  const cm = $("#copyMail");
  if (cm) cm.onclick = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); cm.innerHTML = ic("check"); cm.title = t("copied"); }
    catch { location.href = `mailto:${PROFILE.email}`; }
    setTimeout(() => { cm.innerHTML = ic("copy"); cm.title = t("copy"); }, 1600);
  };

  renderGames();
  renderFeatured();
  renderRepos();
  onScroll();
}

function renderGames() {
  GameBar.render();
  $("#gameMore").innerHTML = $("#gameGrid").hidden ? esc(t("moreGames")) + ic("chevron-down") : esc(t("lessGames")) + ic("chevron-up");
  $("#gameGrid").innerHTML = ITCH_GAMES.map((g, i) => {
    const [c1, c2] = CART_COLORS[i % CART_COLORS.length];
    const shots = g.shots?.length ? g.shots : [g.cover];
    const meta = [
      g.jam && [t("mJam"), esc(g.jam)],
      g.team && [t("mTeam"), g.team.map(esc).join(", ")],
      g.platforms && [t("mPlat"), g.platforms.map(esc).join(" · ")],
      g.engine && [t("mEngine"), esc(g.engine)],
    ].filter(Boolean);
    return `
    <article class="gshow${i % 2 ? " flip" : ""}" id="game-${i}" style="--c1:${c1};--c2:${c2}">
      <div class="gallery">
        <div class="screen"><img class="main" src="${esc(shots[0])}" alt="${esc(g.title)}" loading="lazy" /></div>
        ${shots.length > 1 ? `<div class="thumbs">${shots.map((src, k) =>
          `<button class="${k ? "" : "on"}" data-src="${esc(src)}" aria-label="${esc(g.title)} ${k + 1}"><img src="${esc(src)}" alt="" loading="lazy" /></button>`).join("")}</div>` : ""}
        <a class="cart-shell mini" href="${esc(g.url)}" target="_blank" rel="noopener" aria-hidden="true" tabindex="-1">
          <div class="cart-label">
            <div class="shot"><img src="${esc(g.cover)}" alt="" loading="lazy" /></div>
            <div class="cart-title pix">${esc(g.title)}</div>
          </div>
        </a>
      </div>
      <div class="gtext">
        ${g.genre ? `<p class="gkicker pix">${esc(g.genre[lang])}</p>` : ""}
        <h3>${esc(g.title)}</h3>
        <p class="gdesc">${esc(g.desc?.[lang] ?? "")}</p>
        ${g.features ? `<ul class="feature-list">${g.features[lang].map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        ${meta.length ? `<dl class="gmeta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>` : ""}
        <div class="tags">${(g.tags || []).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        <div class="cta">
          <a class="btn primary" href="${esc(g.url)}" target="_blank" rel="noopener">${ic("play")}${g.browser ? t("playBrowser") : t("play")}${ic("arrow-up-right", "ext")}</a>
          ${g.repo ? `<a class="btn" href="${ghUrl}/${esc(g.repo)}" target="_blank" rel="noopener">${ic("code-xml")}${esc(t("source"))}</a>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");

  // Galeri: küçük resme tıklayınca büyük ekranda göster
  document.querySelectorAll(".gshow").forEach((el) => {
    const main = el.querySelector(".main");
    el.querySelectorAll(".thumbs button").forEach((b) => (b.onclick = () => {
      main.src = b.dataset.src;
      el.querySelectorAll(".thumbs button").forEach((x) => x.classList.toggle("on", x === b));
    }));
  });
}


// ============================================================
//  Oyun bandı: kendiliğinden kayar, fare üstündeyken durur,
//  sürükleyerek / trackpad / oklarla elle kaydırılabilir.
// ============================================================
const GameBar = (() => {
  const DIRECTION = 1;   // 1: kartlar sağa doğru akar, -1: sola doğru akar
  const SPEED = 40;      // piksel / saniye
  const bar = $("#gameBar"), track = $("#gameTrack");
  let setWidth = 0, paused = false, dragging = false, moved = false, last = 0, started = false;

  const card = (g, i, clone) => {
    const [c1, c2] = CART_COLORS[i % CART_COLORS.length];
    return `
    <button class="gcard" data-i="${i}" ${clone ? 'aria-hidden="true" tabindex="-1"' : ""} style="--c1:${c1};--c2:${c2}">
      <span class="cart-shell">
        <span class="cart-label">
          <span class="shot"><img src="${esc(g.cover)}" alt="${clone ? "" : esc(g.title)}" draggable="false" /></span>
          <span class="cart-title pix">${esc(g.title)}</span>
        </span>
        <span class="cart-foot pix"><span>${esc(g.jam ? g.jam.replace(/\s*Game Jam/i, "").slice(0, 18) : "Solo")}</span><span>${esc(t("details"))}${ic("arrow-right")}</span></span>
      </span>
      <span class="gcard-genre">${esc(g.genre?.[lang] ?? "")}</span>
    </button>`;
  };

  function render() {
    const one = ITCH_GAMES.map((g, i) => card(g, i, false)).join("");
    track.innerHTML = `<div class="gset">${one}</div>`;
    const first = track.firstElementChild;
    setWidth = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    // Görünümü dolduracak + kesintisiz döngü için yeterince kopya
    // [kopya][orijinal aralık][kopyalar...]: kaydırma hep 1. ve 2. küme arasında tutulur
    const copies = Math.ceil(track.clientWidth / Math.max(setWidth, 1)) + 3;
    const clone = ITCH_GAMES.map((g, i) => card(g, i, true)).join("");
    track.innerHTML = `<div class="gset">${one}</div>` + Array.from({ length: copies - 1 }, () => `<div class="gset" aria-hidden="true">${clone}</div>`).join("");
    track.scrollLeft = setWidth;
    track.querySelectorAll(".gcard").forEach((b) => (b.onclick = (e) => {
      if (moved) { e.preventDefault(); return; }
      openDetails(+b.dataset.i);
    }));
    if (!started) start();
  }

  // Sonsuz döngü: ilk kopyanın genişliği kadar ileri/geri sar
  function wrap() {
    if (!setWidth) return;
    if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
    else if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
  }

  let acc = 0;
  function tick(now) {
    const dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    if (!paused && !dragging && !reduceMotion && !document.hidden) {
      acc += -DIRECTION * SPEED * dt; // sağa akış = scrollLeft azalır
      const step = acc | 0;
      if (step) { track.scrollLeft += step; acc -= step; }
    }
    wrap();
    requestAnimationFrame(tick);
  }

  function start() {
    started = true;
    bar.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") paused = true; });
    bar.addEventListener("pointerleave", () => { paused = false; });
    bar.addEventListener("focusin", () => (paused = true));
    bar.addEventListener("focusout", () => (paused = false));
    track.addEventListener("touchstart", () => { paused = true; }, { passive: true });
    track.addEventListener("touchend", () => setTimeout(() => (paused = false), 2500), { passive: true });

    // Fareyle sürükleyerek kaydırma
    let sx = 0, sl = 0;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
    });
    addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 5) { moved = true; track.classList.add("dragging"); }
      track.scrollLeft = sl - dx;
      wrap(); sl = track.scrollLeft + dx;
    });
    addEventListener("pointerup", () => {
      if (!dragging) return;
      dragging = false; track.classList.remove("dragging");
      setTimeout(() => (moved = false), 0);
    });

    const by = () => (track.querySelector(".gcard")?.getBoundingClientRect().width || 240) + 22;
    $("#gbarPrev").onclick = () => track.scrollBy({ left: -by(), behavior: reduceMotion ? "auto" : "smooth" });
    $("#gbarNext").onclick = () => track.scrollBy({ left: by(), behavior: reduceMotion ? "auto" : "smooth" });

    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(render, 200); });
    requestAnimationFrame(tick);
  }

  return { render };
})();

function setDetails(open) {
  const grid = $("#gameGrid"), btn = $("#gameMore");
  grid.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  btn.innerHTML = open ? esc(t("lessGames")) + ic("chevron-up") : esc(t("moreGames")) + ic("chevron-down");
  if (open && !reduceMotion) { grid.classList.remove("reveal"); void grid.offsetWidth; grid.classList.add("reveal"); }
}
function openDetails(i) {
  setDetails(true);
  const el = document.getElementById(`game-${i}`);
  if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}
$("#gameMore").onclick = () => {
  const open = $("#gameGrid").hidden;
  setDetails(open);
  if (!open) $("#games").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

// ---------------- GitHub ----------------
async function loadRepos() {
  // Önce canlı GitHub API (tarayıcı önbelleğini atlayıp ETag ile doğrular); limit dolarsa (saatte 60 istek) repos.json yedeğine düşer.
  const tryFetch = async (url) => { const r = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(4000) }); if (!r.ok) throw new Error(r.status); return r.json(); };
  try {
    let data;
    try { data = await tryFetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?per_page=100&sort=updated`); }
    catch { data = await tryFetch("repos.json"); }
    const extra = PRIVATE.filter((p) => !p.shots?.length).map((p) => ({
      name: p.name, html_url: p.url, language: p.language, pushed_at: p.pushed_at,
      description: p.desc?.[lang] ?? p.desc, descI18n: p.desc, private: true, stargazers_count: 0,
    }));
    repos = [...extra, ...data
      .filter((r) => !r.fork && !r.archived && !HIDDEN_REPOS.includes(r.name) && r.name !== PROFILE.githubUser)
      .sort((a, b) => {
        const order = typeof REPO_ORDER !== "undefined" ? REPO_ORDER : PINNED_REPOS;
        const last = typeof LAST_LANGUAGES !== "undefined" ? LAST_LANGUAGES : [];
        const oa = order.indexOf(a.name), ob = order.indexOf(b.name);
        if (oa !== -1 || ob !== -1) return (oa === -1 ? 99 : oa) - (ob === -1 ? 99 : ob);
        const la = last.includes(a.language), lb = last.includes(b.language);
        if (la !== lb) return la ? 1 : -1;
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      })];
    renderCard();
  } catch {
    repos = "error";
  }
  renderRepos();
}

function renderFeatured() {
  $("#featured").innerHTML = PRIVATE.filter((p) => p.shots?.length).map((p, i) => `
    <article class="feature${i % 2 ? " flip" : ""}" id="feat-${esc(p.name)}">
      <div class="feature-text">
        <p class="feature-kicker pix">${t("featured")}</p>
        <h3>${esc(p.name)}</h3>
        <p class="feature-desc">${esc(p.desc?.[lang] ?? "")}</p>
        ${p.features ? `<ul class="feature-list">${p.features[lang].map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <div class="tags">${(p.stack || []).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        <div class="cta">
          ${p.url ? `<a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener">${t("openSite")}${ic("arrow-up-right", "ext")}</a>` : ""}
          <span class="q-badge">${ic("lock")}${t("closed")}</span>
          ${p.status ? `<span class="q-badge alt">${ic("smartphone")}${esc(p.status[lang])}</span>` : ""}
        </div>
      </div>
      <div class="phones">
        ${p.shots.map((s) => `
          <figure class="phone">
            <div class="phone-frame"><img src="${esc(s.src)}" alt="${esc(p.name)}: ${esc(s.caption?.[lang] ?? "")}" loading="lazy" /></div>
            <figcaption>${esc(s.caption?.[lang] ?? "")}</figcaption>
          </figure>`).join("")}
      </div>
    </article>`).join("");
}

function renderRepos() {
  const list = $("#repoList"), filters = $("#filters");
  if (repos === null) { list.innerHTML = `<p class="muted">${t("loading")}</p>`; return; }
  if (repos === "error") {
    filters.innerHTML = "";
    list.innerHTML = `<p class="muted">${t("repoError")} <a href="${ghUrl}?tab=repositories" style="color:var(--sand)">${ghUrl}</a></p>`;
    return;
  }
  // Dil filtreleri, her birinde proje sayısıyla
  const counts = {};
  repos.forEach((r) => r.language && (counts[r.language] = (counts[r.language] || 0) + 1));
  const langs = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  filters.innerHTML = ["all", ...langs].map((l) => {
    const n = l === "all" ? repos.length : counts[l];
    const dot = l === "all" ? "" : `<span class="dot" style="background:${LANG_COLORS[l] || "#a598bd"}"></span>`;
    return `<button class="${l === repoFilter ? "active" : ""}" data-l="${esc(l)}">${dot}${l === "all" ? t("all") : esc(l)}<span class="n">${n}</span></button>`;
  }).join("");
  filters.querySelectorAll("button").forEach((b) => (b.onclick = () => { repoFilter = b.dataset.l; renderRepos(); }));

  const fmt = new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", { month: "short", year: "numeric" });
  const shown = repos.filter((r) => repoFilter === "all" || r.language === repoFilter);
  list.innerHTML = shown.map((r, i) => {
    const pinned = r.private || PINNED_REPOS.includes(r.name);
    const desc = r.descI18n ? r.descI18n[lang] : r.description;
    const color = LANG_COLORS[r.language] || "#a598bd";
    const tag = r.html_url ? "a" : "div";
    const big = repoFilter === "all" && pinned && i === 0;
    return `
    <${tag} class="repo${pinned ? " pinned" : ""}${big ? " big" : ""}" style="--lc:${color}"${r.html_url ? ` href="${esc(r.html_url)}" target="_blank" rel="noopener"` : ""}>
      <div class="repo-top">
        <span class="repo-ic">${ic("book-marked")}</span>
        <h3 class="repo-name">${esc(r.name)}</h3>
        ${pinned ? `<span class="repo-pin" title="${t("pinned")}">${ic("pin")}</span>` : ""}
        <span class="repo-go">${ic("arrow-up-right")}</span>
      </div>
      <p class="repo-desc${desc ? "" : " empty"}">${esc(desc || t("noDesc"))}</p>
      <div class="repo-foot">
        ${r.language ? `<span class="repo-lang"><span class="dot"></span>${esc(r.language)}</span>` : ""}
        ${r.stargazers_count ? `<span class="repo-stars">${ic("star")}${r.stargazers_count}</span>` : ""}
        ${r.private ? `<span class="q-badge">${ic("lock")}${t("closed")}</span>` : ""}
        <span class="repo-date">${ic("history")}${fmt.format(new Date(r.pushed_at))}</span>
      </div>
    </${tag}>`;
  }).join("");
}

// ---------------- Piksel avatar ----------------
// ---------------- Karakter kartı (GitHub profilinden) ----------------
let ghProfile = null;

async function loadProfile() {
  const get = async (url) => { const r = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(4000) }); if (!r.ok) throw new Error(r.status); return r.json(); };
  try { ghProfile = await get(`https://api.github.com/users/${PROFILE.githubUser}`); }
  catch { try { ghProfile = await get("profile.json"); } catch { ghProfile = null; } }
  renderCard();
  loadAvatar(ghProfile?.avatar_url ? `${ghProfile.avatar_url}${ghProfile.avatar_url.includes("?") ? "&" : "?"}s=200` : `https://github.com/${PROFILE.githubUser}.png?size=200`);
}

function renderCard() {
  const p = ghProfile;
  const name = p?.name || PROFILE.name;
  $("#charName").textContent = name;
  const login = p?.login || PROFILE.githubUser;
  const year = p?.created_at ? new Date(p.created_at).getFullYear() : null;
  $("#charHandle").href = p?.html_url || ghUrl;
  $("#charHandle").textContent = `@${login}` + (year ? ` · ${t("since").replace("{y}", year)}` : "");
  $("#charClass").textContent = p?.bio || PROFILE.role[lang];
  renderLower();

  const blog = p?.blog ? (p.blog.startsWith("http") ? p.blog : `https://${p.blog}`) : "";
  $("#charMeta").innerHTML = [
    p?.location && `<span>${ic("map-pin")}${esc(p.location)}</span>`,
    p?.company && `<span>${ic("building-2")}${esc(p.company)}</span>`,
    blog && `<a href="${esc(blog)}" target="_blank" rel="noopener">${ic("link")}${esc(p.blog.replace(/^https?:\/\//, ""))}</a>`,
  ].filter(Boolean).join("");
  $("#charMeta").hidden = !$("#charMeta").innerHTML;

  // Diller GitHub repolarından; sayıları repo sayısı
  const pub = Array.isArray(repos) ? repos.filter((r) => !r.private) : [];
  const counts = {};
  pub.forEach((r) => r.language && (counts[r.language] = (counts[r.language] || 0) + 1));
  const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  const jams = ITCH_GAMES.filter((g) => g.jam).length;
  $("#stGames").textContent = ITCH_GAMES.length;
  $("#stJams").textContent = jams;
  $("#stRepos").textContent = pub.length || p?.public_repos || "–";
  $("#stLangs").textContent = langs.filter(([l]) => !(PROFILE.arsenalHide || []).map(norm).includes(norm(l))).length || "–";
  $("#stStars").textContent = pub.length ? pub.reduce((a, r) => a + (r.stargazers_count || 0), 0) : "–";
  $("#stFollowers").textContent = p?.followers ?? "–";
  renderArsenal(langs.map(([l]) => l));
}


// ---------------- Teknoloji cephaneliği ----------------
// Her teknoloji için hangi projelerde kullanıldığı mevcut veriden çıkarılır:
// repo dili/açıklaması, oyun motoru/etiketleri ve private projelerin teknoloji listesi.
let activeTech = null;
const norm = (x) => String(x || "").toLowerCase();
const sameTech = (a, b) => { a = norm(a); b = norm(b); return a === b || a.startsWith(b + " ") || b.startsWith(a + " "); };
const mentions = (text, tech) => {
  const tt = norm(tech);
  if (tt.length <= 2 || /[#+]/.test(tt)) return false; // C, C#, C++ yalnızca dil alanından
  return new RegExp(`(^|[^a-z0-9])${tt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(norm(text));
};

function projectsFor(tech) {
  const out = [], seen = new Set();
  const pub = Array.isArray(repos) ? repos.filter((r) => !r.private) : [];
  ITCH_GAMES.forEach((g, i) => {
    const repo = g.repo && pub.find((r) => r.name === g.repo);
    const hit = sameTech(g.engine, tech) || (norm(tech) === "c#" && norm(g.engine) === "unity") || (g.tags || []).some((x) => sameTech(x, tech)) || (repo && (sameTech(repo.language, tech) || mentions(repo.description, tech)));
    if (hit) { out.push({ type: "game", name: g.title, go: () => openDetails(i) }); if (g.repo) seen.add(g.repo); }
  });
  PRIVATE.forEach((p) => {
    if (sameTech(p.language, tech) || (p.stack || []).some((x) => sameTech(x, tech)))
      out.push({ type: "app", name: p.name, go: () => document.getElementById(`feat-${p.name}`)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }) });
  });
  pub.forEach((r) => {
    if (seen.has(r.name)) return;
    if (norm(tech) === "git" || sameTech(r.language, tech) || mentions(r.description, tech)) out.push({ type: "repo", name: r.name, href: r.html_url });
  });
  return out;
}

function renderArsenal(ghLangs) {
  const extra = [...PRIVATE.flatMap((p) => p.stack || [])];
  const all = [];
  const hide = (PROFILE.arsenalHide || []).map(norm);
  [...ghLangs, ...PROFILE.skills, ...extra].forEach((x) => { if (!hide.includes(norm(x)) && !all.some((y) => sameTech(x, y))) all.push(x); });
  const items = all.map((tech) => ({ tech, list: projectsFor(tech) }))
    .sort((a, b) => (norm(a.tech) === "git") - (norm(b.tech) === "git") || b.list.length - a.list.length); // Git her yerde, en sona
  $("#skills").innerHTML = items.map(({ tech, list }) => `
    <li><button class="tech${norm(tech) === norm(activeTech) ? " on" : ""}" data-t="${esc(tech)}" aria-expanded="${norm(tech) === norm(activeTech)}">
      ${LANG_COLORS[tech] ? `<span class="dot" style="background:${LANG_COLORS[tech]}"></span>` : ""}<span class="tname">${esc(tech)}</span>${list.length ? `<small>×${list.length}</small>` : ""}
    </button></li>`).join("");
  $("#skills").querySelectorAll("button").forEach((b) => (b.onclick = () => {
    activeTech = norm(activeTech) === norm(b.dataset.t) ? null : b.dataset.t;
    renderArsenal(ghLangs);
  }));
  renderTechPanel();
}

function renderTechPanel() {
  const panel = $("#techPanel");
  if (!activeTech) { panel.hidden = true; panel.innerHTML = ""; return; }
  const list = projectsFor(activeTech);
  const icons = { game: "gamepad-2", repo: "book-marked", app: "smartphone" };
  const label = { game: t("tGame"), repo: t("tRepo"), app: t("tApp") };
  panel.hidden = false;
  panel.style.setProperty("--lc", LANG_COLORS[activeTech] || "var(--sand)");
  panel.innerHTML = `
    <div class="tp-head">
      <b>${esc(activeTech)}</b>
      <span class="muted">${list.length ? (norm(activeTech) === "git" ? t("allRepos") : t("usedIn").replace("{n}", list.length)) : ""}</span>
      <button class="tp-close" aria-label="${t("close")}">${ic("x")}</button>
    </div>
    ${list.length ? `<ul class="tp-list">${list.map((x, k) => `
      <li>${x.href
        ? `<a href="${esc(x.href)}" target="_blank" rel="noopener">${ic(icons[x.type])}<span>${esc(x.name)}</span><em>${label[x.type]}</em>${ic("arrow-up-right", "ext")}</a>`
        : `<button data-k="${k}">${ic(icons[x.type])}<span>${esc(x.name)}</span><em>${label[x.type]}</em>${ic("arrow-right", "ext")}</button>`}</li>`).join("")}</ul>`
      : `<p class="muted tp-empty">${t("noUse")}</p>`}`;
  panel.querySelector(".tp-close").onclick = () => { activeTech = null; renderCard(); };
  panel.querySelectorAll("button[data-k]").forEach((b) => (b.onclick = () => list[+b.dataset.k].go()));
}

// ---------------- Aktif görevler & başarımlar ----------------
function renderLower() {
  const quests = typeof QUESTS !== "undefined" ? QUESTS : [];
  $("#questsBox").hidden = !quests.length;
  $("#questList").innerHTML = quests.map((q) => {
    const hasPr = typeof q.progress === "number";
    const pr = hasPr ? Math.max(0, Math.min(100, q.progress)) : 0;
    const tag = q.url ? "a" : "div";
    return `
    <${tag} class="quest-card"${q.url ? ` href="${esc(q.url)}" target="_blank" rel="noopener"` : ""}>
      <div class="qc-head">${ic("package")}<b>${esc(q.title)}</b>${q.status ? `<span class="qc-status">${esc(q.status[lang] ?? q.status)}</span>` : ""}</div>
      ${q.desc ? `<p>${esc(q.desc[lang] ?? q.desc)}</p>` : ""}
      ${hasPr ? `<div class="qc-bar" role="progressbar" aria-valuenow="${pr}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pr}%"></span></div>` : ""}
      <div class="qc-foot"><span class="tags">${(q.tags || []).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</span>${hasPr ? `<span class="pix">${pr}%</span>` : ""}</div>
    </${tag}>`;
  }).join("");

  const year = (s) => (String(s).match(/20\d\d/) || [])[0] || null;
  const fromJams = ITCH_GAMES.map((g, i) => g.jam && { title: g.jam, sub: t("joinedWith").replace("{g}", g.title), year: g.year ? String(g.year) : year(g.jam), go: i }).filter(Boolean);
  const manual = (typeof ACHIEVEMENTS !== "undefined" ? ACHIEVEMENTS : []).map((a) => ({ title: a.title?.[lang] ?? a.title, sub: a.desc?.[lang] ?? a.desc ?? "", year: a.year ? String(a.year) : null, url: a.url, icon: a.icon, featured: true }));
  const achs = [...manual, ...fromJams].sort((a, b) => String(b.year || "0").localeCompare(String(a.year || "0")) || (b.featured === true) - (a.featured === true));
  $("#achBox").hidden = !achs.length;
  $("#achList").innerHTML = achs.map((a, k) => `
    <button class="ach${a.featured ? " featured" : ""}" data-k="${k}">
      <span class="ach-ic">${ic(a.icon || "trophy")}</span>
      <span class="ach-txt"><b>${esc(a.title)}</b><small>${esc(a.sub)}</small></span>
      ${a.year ? `<span class="ach-year pix">${a.year}</span>` : ""}
    </button>`).join("");
  $("#achList").querySelectorAll(".ach").forEach((b) => (b.onclick = () => {
    const a = achs[+b.dataset.k];
    if (a.go !== undefined) openDetails(a.go); else if (a.url) window.open(a.url, "_blank", "noopener");
  }));
  $("#aboutLower").classList.toggle("single", $("#questsBox").hidden || $("#achBox").hidden);
}

function loadAvatar(src) {
  $("#avatar").src = src;
  $("#avatar").alt = ghProfile?.name || PROFILE.name;
  const img = new Image();
  img.onload = () => {
    const small = document.createElement("canvas");
    small.width = small.height = 28;
    small.getContext("2d").drawImage(img, 0, 0, 28, 28);
    const cv = $("#avatarPx"), c = cv.getContext("2d");
    c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, cv.width, cv.height);
    c.drawImage(small, 0, 0, cv.width, cv.height);
  };
  img.src = src;
}

// ---------------- Kaydırma ----------------
function onScroll() {
  $(".nav").classList.toggle("solid", scrollY > innerHeight * 0.6);
}
addEventListener("scroll", onScroll, { passive: true });


// ============================================================
//  Kum simülasyonu (particle-lab'a selam olsun)
//  İsim piksel olarak çizilir ve katı engel gibi davranır.
// ============================================================
const Sand = (() => {
  const hero = $(".hero"), cv = $("#sand"), ctx = cv.getContext("2d");
  const off = document.createElement("canvas"), octx = off.getContext("2d");
  let W = 0, H = 0, CELL = 4, DPR = 1, lastW = 0, frame = 0, visible = true;
  let grid, solid, base, img, buf, userGrains = 0, introUntil = 0;

  const rgba = (r, g, b, a = 255) => ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
  const hsl = (h, s, l) => {
    s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return rgba(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255));
  };
  // Palet: 64 renk tonu × 4 parlaklık
  const PAL = new Uint32Array(256);
  for (let i = 1; i < 256; i++) {
    const step = i >> 2, shade = i & 3;
    PAL[i] = hsl((38 - step * 5.6 + 720) % 360, 88, 56 + shade * 6);
  }
  const TEXT = rgba(243, 234, 219), SHADOW = rgba(255, 92, 138);

  function resize() {
    const r = hero.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return; // sayfa görünmezken (gizli sekme) bekle
    if (Math.abs(r.width - lastW) < 2 && grid) return;
    lastW = r.width;
    CELL = r.width < 600 ? 3 : 4;
    DPR = Math.min(2, devicePixelRatio || 1);
    W = Math.ceil(r.width / CELL); H = Math.ceil(r.height / CELL);
    cv.width = Math.round(r.width * DPR); cv.height = Math.round(r.height * DPR);
    cv.style.width = r.width + "px"; cv.style.height = r.height + "px";
    off.width = W; off.height = H;
    grid = new Uint8Array(W * H); solid = new Uint8Array(W * H); base = new Uint32Array(W * H);
    img = octx.createImageData(W, H); buf = new Uint32Array(img.data.buffer);
    drawName();
  }

  function drawName() {
    const tc = document.createElement("canvas"); tc.width = W; tc.height = H;
    const c = tc.getContext("2d");
    const fam = '"Space Grotesk", sans-serif';
    const words = PROFILE.name.split(" ");
    c.font = `700 100px ${fam}`;
    let lines = [PROFILE.name];
    let fs = Math.floor((100 * W * 0.84) / c.measureText(PROFILE.name).width);
    if (fs < 16 && words.length > 1) { // dar ekranda iki satıra böl
      let best = null;
      for (let k = 1; k < words.length; k++) {
        const ls = [words.slice(0, k).join(" "), words.slice(k).join(" ")];
        const w = Math.max(...ls.map((l) => c.measureText(l).width));
        if (!best || w < best.w) best = { ls, w };
      }
      lines = best.ls;
      fs = Math.floor((100 * W * 0.86) / best.w);
    }
    fs = Math.max(8, Math.min(fs, Math.floor(H * 0.2)));
    c.font = `700 ${fs}px ${fam}`;
    c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = "#fff";
    const lh = fs * 1.02, cy = H * 0.42;
    lines.forEach((l, i) => c.fillText(l, W / 2, cy + (i - (lines.length - 1) / 2) * lh));

    const a = c.getImageData(0, 0, W, H).data;
    let minY = H, maxY = 0;
    for (let k = 0; k < W * H; k++) if (a[k * 4 + 3] > 140) {
      solid[k] = 1;
      const y = (k / W) | 0; if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    // Gölge (+1,+1) ve harf
    base.fill(0);
    for (let k = 0; k < W * H; k++) {
      if (solid[k]) base[k] = TEXT;
      else if (k > W && solid[k - W - 1]) base[k] = SHADOW;
    }
    hero.style.setProperty("--name-top", `${minY * CELL}px`);
    hero.style.setProperty("--name-bottom", `${(maxY + 1) * CELL}px`);
  }

  function step() {
    frame++;
    const ltr = frame & 1;
    for (let y = H - 2; y >= 0; y--) {
      const row = y * W;
      for (let i = 0; i < W; i++) {
        const x = ltr ? i : W - 1 - i;
        const k = row + x, c = grid[k];
        if (!c) continue;
        const b = k + W;
        if (!grid[b] && !solid[b]) { grid[b] = c; grid[k] = 0; continue; }
        const d = Math.random() < 0.5 ? -1 : 1;
        if (x + d >= 0 && x + d < W && !grid[b + d] && !solid[b + d] && !grid[k + d] && !solid[k + d]) { grid[b + d] = c; grid[k] = 0; continue; }
        if (x - d >= 0 && x - d < W && !grid[b - d] && !solid[b - d] && !grid[k - d] && !solid[k - d]) { grid[b - d] = c; grid[k] = 0; }
      }
    }
  }

  function render() {
    for (let k = 0; k < W * H; k++) buf[k] = grid[k] ? PAL[grid[k]] : base[k];
    octx.putImageData(img, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, 0, 0, W * CELL * DPR, H * CELL * DPR);
  }

  const color = () => {
    const step = Math.floor(performance.now() / 90) % 64;
    return Math.min(255, 1 + ((step << 2) | ((Math.random() * 4) | 0)));
  };

  function spawn(cx, cy, n, r) {
    let made = 0;
    for (let i = 0; i < n; i++) {
      const x = Math.round(cx + (Math.random() * 2 - 1) * r), y = Math.round(cy + (Math.random() * 2 - 1) * r);
      if (x < 0 || x >= W || y < 0 || y >= H) continue;
      const k = y * W + x;
      if (!grid[k] && !solid[k]) { grid[k] = color(); made++; }
    }
    return made;
  }

  function fromEvent(e, n, r) {
    if (e.target.closest("a, button")) return;
    const rect = cv.getBoundingClientRect();
    userGrains += spawn((e.clientX - rect.left) / CELL, (e.clientY - rect.top) / CELL, n, r);
    if (userGrains > 400) achieve("achSand");
  }

  function loop() {
    if (!grid) resize();
    if (visible && grid) {
      if (performance.now() < introUntil) { // açılışta isme yağan kum
        [0.28, 0.5, 0.72].forEach((fx) => spawn(W * fx, 2, 4, 3));
      }
      step(); render();
    }
    requestAnimationFrame(loop);
  }

  function init() {
    resize();
    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    hero.addEventListener("pointermove", (e) => fromEvent(e, 8, 2));
    hero.addEventListener("pointerdown", (e) => fromEvent(e, 60, 5));
    $("#clearSand").addEventListener("click", () => { grid.fill(0); if (userGrains > 400) achieve("achClean"); });
    new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(hero);
    if (!reduceMotion) introUntil = performance.now() + 2600;
    if (grid) render();
    loop();
  }
  return { init };
})();

// ---------------- Başlat ----------------
$("#langBtn").onclick = () => {
  lang = lang === "tr" ? "en" : "tr";
  localStorage.setItem("lang", lang);
  renderStatic();
  achieve("achLang");
};

renderStatic();
loadProfile();
loadRepos();
document.fonts.ready.then(() => Sand.init());
