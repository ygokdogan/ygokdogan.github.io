// "Hakkımda" bölümündeki karakter kartı: GitHub profili, istatistikler,
// tech arsenal, quest'ler ve achievement'lar.

let ghProfile = null;
let activeTech = null;

async function loadProfile() {
  try {
    ghProfile = await fetchJSON(`https://api.github.com/users/${PROFILE.githubUser}`)
      .catch(() => fetchJSON("fallback/profile.json"));
  } catch {
    ghProfile = null;
  }
  renderCard();

  const avatar = ghProfile?.avatar_url;
  loadAvatar(avatar
    ? `${avatar}${avatar.includes("?") ? "&" : "?"}s=200`
    : `${GITHUB_URL}.png?size=200`);
}

// Avatar 28x28'e küçültülüp tekrar büyütülünce pikselli hali çıkıyor.
// Asıl fotoğraf üstüne gelince görünüyor (CSS).
function loadAvatar(src) {
  const photo = $("#avatar");
  photo.src = src;
  photo.alt = ghProfile?.name || PROFILE.name;

  const img = new Image();
  img.onload = () => {
    const small = document.createElement("canvas");
    small.width = small.height = 28;
    small.getContext("2d").drawImage(img, 0, 0, 28, 28);

    const canvas = $("#avatarPx");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(small, 0, 0, canvas.width, canvas.height);
  };
  img.src = src;
}

function renderCard() {
  const p = ghProfile;
  const since = p?.created_at ? ` · ${t("since", { y: new Date(p.created_at).getFullYear() })}` : "";

  $("#charName").textContent = p?.name || PROFILE.name;
  $("#charHandle").href = p?.html_url || GITHUB_URL;
  $("#charHandle").textContent = `@${p?.login || PROFILE.githubUser}${since}`;
  $("#charClass").textContent = p?.bio || loc(PROFILE.role);

  const blog = p?.blog && (p.blog.startsWith("http") ? p.blog : `https://${p.blog}`);
  const meta = $("#charMeta");
  meta.innerHTML = [
    p?.location && `<span>${icon("map-pin")}${esc(p.location)}</span>`,
    p?.company && `<span>${icon("building-2")}${esc(p.company)}</span>`,
    blog && `<a href="${esc(blog)}" ${NEW_TAB}>${icon("link")}${esc(p.blog.replace(/^https?:\/\//, ""))}</a>`,
  ].filter(Boolean).join("");
  meta.hidden = !meta.innerHTML;

  renderStats();
  renderArsenal();
  renderQuests();
  renderAchievements();

  const oneBox = $("#questsBox").hidden || $("#achBox").hidden;
  $("#aboutLower").classList.toggle("single", oneBox);
}

const publicRepos = () => (Array.isArray(repos) ? repos.filter((r) => !r.private) : []);

function githubLanguages() {
  const counts = countLanguages(publicRepos());
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

function renderStats() {
  const pub = publicRepos();
  const stars = pub.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const langCount = githubLanguages().filter((l) => !isHiddenTech(l)).length;

  $("#stGames").textContent = ITCH_GAMES.length;
  $("#stJams").textContent = ITCH_GAMES.filter((g) => g.jam).length;
  $("#stRepos").textContent = pub.length || ghProfile?.public_repos || "–";
  $("#stLangs").textContent = langCount || "–";
  $("#stStars").textContent = pub.length ? stars : "–";
  $("#stFollowers").textContent = ghProfile?.followers ?? "–";
}


// Tech arsenal. Bir teknolojinin hangi projelerde geçtiği eldeki veriden
// çıkarılıyor: repo dili ve açıklaması, oyunların engine/tag'leri,
// kapalı projelerin stack listesi.

const norm = (s) => String(s || "").toLowerCase();
const isHiddenTech = (tech) => (PROFILE.arsenalHide || []).some((h) => norm(h) === norm(tech));

// "Unity" ile "Unity 6" aynı sayılsın
function sameTech(a, b) {
  a = norm(a);
  b = norm(b);
  return a === b || a.startsWith(b + " ") || b.startsWith(a + " ");
}

// Açıklamada geçiyor mu? C, C#, C++ gibi kısa isimler her yerde
// eşleşeceği için onlara sadece dil alanından bakılıyor.
function mentions(text, tech) {
  const name = norm(tech);
  if (name.length <= 2 || /[#+]/.test(name)) return false;
  const pattern = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${pattern}([^a-z0-9]|$)`).test(norm(text));
}

function projectsFor(tech) {
  const found = [];
  const coveredRepos = new Set();
  const pub = publicRepos();

  ITCH_GAMES.forEach((game, i) => {
    const repo = game.repo && pub.find((r) => r.name === game.repo);
    const uses =
      sameTech(game.engine, tech) ||
      (norm(tech) === "c#" && norm(game.engine) === "unity") ||
      (game.tags || []).some((tag) => sameTech(tag, tech)) ||
      (repo && (sameTech(repo.language, tech) || mentions(repo.description, tech)));

    if (uses) {
      found.push({ type: "game", name: game.title, open: () => openGame(i) });
      if (game.repo) coveredRepos.add(game.repo); // oyunun reposunu ayrıca listeleme
    }
  });

  for (const p of PRIVATE_PROJECTS) {
    if (sameTech(p.language, tech) || (p.stack || []).some((s) => sameTech(s, tech))) {
      found.push({ type: "app", name: p.name, open: () => scrollToEl(document.getElementById(`feat-${p.name}`)) });
    }
  }

  for (const repo of pub) {
    if (coveredRepos.has(repo.name)) continue;
    if (norm(tech) === "git" || sameTech(repo.language, tech) || mentions(repo.description, tech)) {
      found.push({ type: "repo", name: repo.name, href: repo.html_url });
    }
  }

  return found;
}

function renderArsenal() {
  const candidates = [
    ...githubLanguages(),
    ...PROFILE.skills,
    ...PRIVATE_PROJECTS.flatMap((p) => p.stack || []),
  ];
  const techs = [];
  for (const tech of candidates) {
    if (!isHiddenTech(tech) && !techs.some((x) => sameTech(x, tech))) techs.push(tech);
  }

  // en çok kullanılan önde, Git zaten her repoda olduğu için en sonda
  const isGit = (tech) => norm(tech) === "git";
  const items = techs
    .map((tech) => ({ tech, count: projectsFor(tech).length }))
    .sort((a, b) => isGit(a.tech) - isGit(b.tech) || b.count - a.count);

  const list = $("#skills");
  list.innerHTML = items.map(({ tech, count }) => {
    const on = norm(tech) === norm(activeTech);
    const dot = LANG_COLORS[tech] ? `<span class="dot" style="background:${LANG_COLORS[tech]}"></span>` : "";
    return `
      <li>
        <button class="tech${on ? " on" : ""}" data-tech="${esc(tech)}" aria-expanded="${on}">
          ${dot}<span class="tname">${esc(tech)}</span>${count ? `<small>×${count}</small>` : ""}
        </button>
      </li>`;
  }).join("");

  for (const btn of $$("button", list)) {
    btn.onclick = () => {
      const tech = btn.dataset.tech;
      activeTech = norm(activeTech) === norm(tech) ? null : tech;
      renderArsenal();
    };
  }

  renderTechPanel();
}

const ITEM_TYPES = {
  game: { icon: "gamepad-2", label: "tGame" },
  repo: { icon: "book-marked", label: "tRepo" },
  app: { icon: "smartphone", label: "tApp" },
};

function renderTechPanel() {
  const panel = $("#techPanel");
  panel.hidden = !activeTech;
  if (!activeTech) {
    panel.innerHTML = "";
    return;
  }

  const projects = projectsFor(activeTech);
  let summary = "";
  if (projects.length) summary = norm(activeTech) === "git" ? t("allRepos") : t("usedIn", { n: projects.length });

  const item = (project, k) => {
    const type = ITEM_TYPES[project.type];
    const content = `${icon(type.icon)}<span>${esc(project.name)}</span><em>${t(type.label)}</em>`;
    return project.href
      ? `<li><a href="${esc(project.href)}" ${NEW_TAB}>${content}${icon("arrow-up-right", "ext")}</a></li>`
      : `<li><button data-k="${k}">${content}${icon("arrow-right", "ext")}</button></li>`;
  };

  panel.style.setProperty("--lc", LANG_COLORS[activeTech] || "var(--sand)");
  panel.innerHTML = `
    <div class="tp-head">
      <b>${esc(activeTech)}</b>
      <span class="muted">${summary}</span>
      <button class="tp-close" aria-label="${t("close")}">${icon("x")}</button>
    </div>
    ${projects.length
      ? `<ul class="tp-list">${projects.map(item).join("")}</ul>`
      : `<p class="muted tp-empty">${t("noUse")}</p>`}`;

  $(".tp-close", panel).onclick = () => {
    activeTech = null;
    renderArsenal();
  };
  for (const btn of $$("button[data-k]", panel)) {
    btn.onclick = () => projects[+btn.dataset.k].open();
  }
}


function renderQuests() {
  $("#questsBox").hidden = !QUESTS.length;

  $("#questList").innerHTML = QUESTS.map((q) => {
    const hasProgress = typeof q.progress === "number";
    const progress = Math.max(0, Math.min(100, q.progress || 0));
    const tag = q.url ? "a" : "div";
    const link = q.url ? ` href="${esc(q.url)}" ${NEW_TAB}` : "";

    return `
      <${tag} class="quest-card"${link}>
        <div class="qc-head">
          ${icon("package")}<b>${esc(q.title)}</b>
          ${q.status ? `<span class="qc-status">${esc(loc(q.status))}</span>` : ""}
        </div>
        ${q.desc ? `<p>${esc(loc(q.desc))}</p>` : ""}
        ${hasProgress ? `
          <div class="qc-bar" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
            <span style="width:${progress}%"></span>
          </div>` : ""}
        <div class="qc-foot">
          ${tagList(q.tags)}
          ${hasProgress ? `<span class="pix">${progress}%</span>` : ""}
        </div>
      </${tag}>`;
  }).join("");
}

function renderAchievements() {
  const yearIn = (text) => String(text).match(/20\d\d/)?.[0];

  const manual = ACHIEVEMENTS.map((a) => ({
    title: loc(a.title),
    desc: loc(a.desc),
    year: a.year && String(a.year),
    icon: a.icon,
    url: a.url,
    featured: true,
  }));

  // jam'ler oyunların bilgisinden geliyor
  const jams = [];
  ITCH_GAMES.forEach((game, i) => {
    if (!game.jam) return;
    jams.push({
      title: game.jam,
      desc: t("joinedWith", { g: game.title }),
      year: game.year ? String(game.year) : yearIn(game.jam),
      open: () => openGame(i),
    });
  });

  // yeniden eskiye. sort stable olduğu için aynı yılda elle eklenenler önde kalıyor
  const all = [...manual, ...jams].sort((a, b) => (b.year || "0").localeCompare(a.year || "0"));

  $("#achBox").hidden = !all.length;
  const list = $("#achList");
  list.innerHTML = all.map((a, k) => `
    <button class="ach${a.featured ? " featured" : ""}" data-k="${k}">
      <span class="ach-ic">${icon(a.icon || "trophy")}</span>
      <span class="ach-txt"><b>${esc(a.title)}</b><small>${esc(a.desc)}</small></span>
      ${a.year ? `<span class="ach-year pix">${a.year}</span>` : ""}
    </button>`).join("");

  for (const btn of $$(".ach", list)) {
    const a = all[+btn.dataset.k];
    btn.onclick = () => {
      if (a.open) a.open();
      else if (a.url) window.open(a.url, "_blank", "noopener");
    };
  }
}
