const GITHUB_URL = `https://github.com/${PROFILE.githubUser}`;
const ITCH_URL = `https://${PROFILE.itchUser}.itch.io`;

// null: yükleniyor, "error": alınamadı, yoksa repo listesi
let repos = null;

// dile bağlı olmayan, bir kere doldurulan kısımlar
function setup() {
  $("#name").textContent = PROFILE.name;
  $("#footName").textContent = PROFILE.name;
  $("#year").textContent = new Date().getFullYear();

  $("#ghBtn").href = GITHUB_URL;
  $("#itchBtn").href = ITCH_URL;
  if (PROFILE.linkedin) $("#liBtn").href = PROFILE.linkedin;
  else $("#liBtn").remove();

  $("#langBtn").onclick = () => {
    lang = lang === "tr" ? "en" : "tr";
    localStorage.setItem("lang", lang);
    render();
    unlock("achLang");
  };

  addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

// dil değişince baştan çiziliyor
function render() {
  document.documentElement.lang = lang;
  document.title = `${PROFILE.name} — ${t("title")}`;
  $("#langBtn").textContent = lang === "tr" ? "EN" : "TR";

  for (const el of $$("[data-i18n]")) {
    let key = el.dataset.i18n;
    let ic = el.dataset.ic;
    if (key === "hint" && isTouch) {
      key = "hintTouch";
      ic = "hand";
    }
    el.innerHTML = (ic ? icon(ic) : "") + esc(t(key));
  }

  $("#role").textContent = loc(PROFILE.role);
  $("#tagline").textContent = loc(PROFILE.tagline) ?? "";
  $("#tagline").hidden = !PROFILE.tagline;
  $("#aboutText").innerHTML = loc(PROFILE.about).map((p) => `<p>${esc(p)}</p>`).join("");

  renderCard();
  renderGames();
  renderFeatured();
  renderRepos();
  renderContact();
}

function renderContact() {
  const button = (url, brand, label) =>
    `<a class="btn" href="${esc(url)}" ${NEW_TAB}>${icon("brand-" + brand, "brand")}${label}${icon("arrow-up-right", "ext")}</a>`;

  const links = [];
  if (PROFILE.email) {
    links.push(`
      <span class="mailbox">
        <a class="btn brand" href="mailto:${esc(PROFILE.email)}">${icon("mail")}${esc(PROFILE.email)}</a>
        <button class="btn copy" id="copyMail" title="${t("copy")}" aria-label="${t("copy")}">${icon("copy")}</button>
      </span>`);
  }
  links.push(button(GITHUB_URL, "github", "GitHub"));
  links.push(button(ITCH_URL, "itch", "itch.io"));
  if (PROFILE.linkedin) links.push(button(PROFILE.linkedin, "linkedin", "LinkedIn"));

  $("#contactLinks").innerHTML = links.join("");

  const copyBtn = $("#copyMail");
  if (copyBtn) copyBtn.onclick = () => copyEmail(copyBtn);
}

async function copyEmail(btn) {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    btn.innerHTML = icon("check");
    btn.title = t("copied");
  } catch {
    location.href = `mailto:${PROFILE.email}`;
  }
  setTimeout(() => {
    btn.innerHTML = icon("copy");
    btn.title = t("copy");
  }, 1600);
}

function updateNav() {
  $(".nav").classList.toggle("solid", scrollY > innerHeight * 0.6);
}

// Sitedeki küçük gizli başarımlar (kum dökmek, dil değiştirmek...).
// Oturum boyunca her biri bir kere çıkıyor.
const unlocked = new Set(JSON.parse(sessionStorage.getItem("ach") || "[]"));

function unlock(key) {
  if (unlocked.has(key)) return;
  unlocked.add(key);
  sessionStorage.setItem("ach", JSON.stringify([...unlocked]));

  const [title, desc] = t(key);
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="trophy">${icon("trophy")}</span>
    <div><b>${t("unlocked")}: ${esc(title)}</b><span>${esc(desc)}</span></div>`;
  $("#toasts").append(toast);
  setTimeout(() => toast.remove(), 4200);
}


setup();
render();
loadProfile();
loadRepos();
document.fonts.ready.then(() => Sand.init());
