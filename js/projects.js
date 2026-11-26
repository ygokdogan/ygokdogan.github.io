const LANG_COLORS = {
  C: "#a8b9cc",
  "C++": "#f34b7d",
  "C#": "#3fd0c9",
  ShaderLab: "#b48cff",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  GDScript: "#478cbf",
  Java: "#b07219",
};

const langColor = (language) => LANG_COLORS[language] || "#a598bd";

let repoFilter = "all";

async function loadRepos() {
  const api = `https://api.github.com/users/${PROFILE.githubUser}/repos?per_page=100&sort=updated`;
  let data;
  try {
    // API saatte 60 istekle sınırlı, dolarsa yedeğe düş
    data = await fetchJSON(api).catch(() => fetchJSON("fallback/repos.json"));
  } catch {
    repos = "error";
    renderRepos();
    return;
  }

  const own = data.filter((r) =>
    !r.fork && !r.archived && r.name !== PROFILE.githubUser && !HIDDEN_REPOS.includes(r.name));

  repos = [...closedSourceRepos(), ...own.sort(compareRepos)];
  renderCard();
  renderRepos();
}

// vitrini (shots) olmayan kapalı projeler normal repo kartı olarak görünür
function closedSourceRepos() {
  return PRIVATE_PROJECTS.filter((p) => !p.shots?.length).map((p) => ({
    name: p.name,
    html_url: p.url,
    language: p.language,
    description: p.desc,
    pushed_at: p.pushed_at,
    stargazers_count: 0,
    private: true,
  }));
}

// önce REPO_ORDER, sonra son güncellenen; LAST_LANGUAGES'takiler en sonda
function compareRepos(a, b) {
  const rank = (r) => {
    const i = REPO_ORDER.indexOf(r.name);
    return i === -1 ? Infinity : i;
  };
  if (rank(a) !== rank(b)) return rank(a) - rank(b);

  const lastA = LAST_LANGUAGES.includes(a.language);
  const lastB = LAST_LANGUAGES.includes(b.language);
  if (lastA !== lastB) return lastA ? 1 : -1;

  return new Date(b.pushed_at) - new Date(a.pushed_at);
}

function renderFeatured() {
  const projects = PRIVATE_PROJECTS.filter((p) => p.shots?.length);

  $("#featured").innerHTML = projects.map((p, i) => `
    <article class="feature${i % 2 ? " flip" : ""}" id="feat-${esc(p.name)}">
      <div class="feature-text">
        <p class="feature-kicker pix">${t("featured")}</p>
        <h3>${esc(p.name)}</h3>
        <p class="feature-desc">${esc(loc(p.desc))}</p>
        ${bulletList(loc(p.features))}
        ${tagList(p.stack)}
        <div class="cta">
          ${p.url ? `<a class="btn primary" href="${esc(p.url)}" ${NEW_TAB}>${t("openSite")}${icon("arrow-up-right", "ext")}</a>` : ""}
          <span class="badge">${icon("lock")}${t("closed")}</span>
          ${p.status ? `<span class="badge alt">${icon("smartphone")}${esc(loc(p.status))}</span>` : ""}
        </div>
      </div>
      <div class="phones">
        ${p.shots.map((shot) => `
          <figure class="phone">
            <div class="phone-frame"><img src="${esc(shot.src)}" alt="${esc(p.name)}: ${esc(loc(shot.caption))}" loading="lazy" /></div>
            <figcaption>${esc(loc(shot.caption))}</figcaption>
          </figure>`).join("")}
      </div>
    </article>`).join("");
}

function renderRepos() {
  const list = $("#repoList");
  const filters = $("#filters");

  if (repos === null) {
    list.innerHTML = `<p class="muted">${t("loading")}</p>`;
    return;
  }
  if (repos === "error") {
    filters.innerHTML = "";
    list.innerHTML = `<p class="muted">${t("repoError")} <a href="${GITHUB_URL}?tab=repositories">${GITHUB_URL}</a></p>`;
    return;
  }

  const counts = countLanguages(repos);
  const langs = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  filters.innerHTML =
    filterButton("all", t("all"), repos.length) +
    langs.map((l) => filterButton(l, l, counts[l])).join("");

  for (const btn of $$("button", filters)) {
    btn.onclick = () => {
      repoFilter = btn.dataset.lang;
      renderRepos();
    };
  }

  const dateFormat = new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", { month: "short", year: "numeric" });
  const shown = repoFilter === "all" ? repos : repos.filter((r) => r.language === repoFilter);

  // "Tümü"nde ilk proje (REPO_ORDER'ın başı) büyük kart olarak gösteriliyor
  list.innerHTML = shown
    .map((repo, i) => repoCard(repo, dateFormat, repoFilter === "all" && i === 0))
    .join("");
}

function filterButton(value, label, count) {
  const dot = value === "all" ? "" : `<span class="dot" style="background:${langColor(value)}"></span>`;
  const active = value === repoFilter ? "active" : "";
  return `<button class="${active}" data-lang="${esc(value)}">${dot}${esc(label)}<span class="n">${count}</span></button>`;
}

function repoCard(repo, dateFormat, big) {
  const desc = loc(repo.description);
  const tag = repo.html_url ? "a" : "div";
  const link = repo.html_url ? ` href="${esc(repo.html_url)}" ${NEW_TAB}` : "";

  return `
    <${tag} class="repo${big ? " big" : ""}" style="--lc:${langColor(repo.language)}"${link}>
      <div class="repo-top">
        <span class="repo-ic">${icon("book-marked")}</span>
        <h3 class="repo-name">${esc(repo.name)}</h3>
        <span class="repo-go">${icon("arrow-up-right")}</span>
      </div>
      <p class="repo-desc${desc ? "" : " empty"}">${esc(desc || t("noDesc"))}</p>
      <div class="repo-foot">
        ${repo.language ? `<span class="repo-lang"><span class="dot"></span>${esc(repo.language)}</span>` : ""}
        ${repo.stargazers_count ? `<span class="repo-stars">${icon("star")}${repo.stargazers_count}</span>` : ""}
        ${repo.private ? `<span class="badge">${icon("lock")}${t("closed")}</span>` : ""}
        <span class="repo-date">${icon("history")}${dateFormat.format(new Date(repo.pushed_at))}</span>
      </div>
    </${tag}>`;
}
