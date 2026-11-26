const CART_COLORS = [
  ["#ff5c8a", "#c2366a"],
  ["#3fd0c9", "#21918c"],
  ["#ffb454", "#d07f22"],
  ["#9b7bff", "#6648c9"],
  ["#8fd16a", "#5a9a3a"],
];

function cartStyle(i) {
  const [c1, c2] = CART_COLORS[i % CART_COLORS.length];
  return `--c1:${c1};--c2:${c2}`;
}

function renderGames() {
  GameBar.render();
  updateMoreButton();

  $("#gameGrid").innerHTML = ITCH_GAMES.map(gameShowcase).join("");

  for (const show of $$(".gshow")) {
    const screen = $(".main", show);
    const thumbs = $$(".thumbs button", show);
    for (const btn of thumbs) {
      btn.onclick = () => {
        screen.src = btn.dataset.src;
        thumbs.forEach((b) => b.classList.toggle("on", b === btn));
      };
    }
  }
}

function gameShowcase(game, i) {
  const shots = game.shots?.length ? game.shots : [game.cover];
  const meta = [
    [t("mJam"), game.jam],
    [t("mTeam"), game.team?.join(", ")],
    [t("mPlat"), game.platforms?.join(" · ")],
    [t("mEngine"), game.engine],
  ].filter(([, value]) => value);

  const thumbs = shots.length < 2 ? "" : `
    <div class="thumbs">
      ${shots.map((src, k) => `
        <button class="${k === 0 ? "on" : ""}" data-src="${esc(src)}" aria-label="${esc(game.title)} ${k + 1}">
          <img src="${esc(src)}" alt="" loading="lazy" />
        </button>`).join("")}
    </div>`;

  const metaList = !meta.length ? "" : `
    <dl class="gmeta">
      ${meta.map(([label, value]) => `<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join("")}
    </dl>`;

  return `
    <article class="gshow${i % 2 ? " flip" : ""}" id="game-${i}" style="${cartStyle(i)}">
      <div class="gallery">
        <div class="screen"><img class="main" src="${esc(shots[0])}" alt="${esc(game.title)}" loading="lazy" /></div>
        ${thumbs}
        <a class="cart-shell mini" href="${esc(game.url)}" ${NEW_TAB} aria-hidden="true" tabindex="-1">
          <div class="cart-label">
            <div class="shot"><img src="${esc(game.cover)}" alt="" loading="lazy" /></div>
            <div class="cart-title pix">${esc(game.title)}</div>
          </div>
        </a>
      </div>
      <div class="gtext">
        ${game.genre ? `<p class="gkicker pix">${esc(loc(game.genre))}</p>` : ""}
        <h3>${esc(game.title)}</h3>
        <p class="gdesc">${esc(loc(game.desc))}</p>
        ${bulletList(loc(game.features))}
        ${metaList}
        ${tagList(game.tags)}
        <div class="cta">
          <a class="btn primary" href="${esc(game.url)}" ${NEW_TAB}>
            ${icon("play")}${game.browser ? t("playBrowser") : t("play")}${icon("arrow-up-right", "ext")}
          </a>
          ${game.repo ? `<a class="btn" href="${GITHUB_URL}/${esc(game.repo)}" ${NEW_TAB}>${icon("code-xml")}${t("source")}</a>` : ""}
        </div>
      </div>
    </article>`;
}

function updateMoreButton() {
  const open = !$("#gameGrid").hidden;
  const btn = $("#gameMore");
  btn.setAttribute("aria-expanded", open);
  btn.innerHTML = open
    ? esc(t("lessGames")) + icon("chevron-up")
    : esc(t("moreGames")) + icon("chevron-down");
}

function setDetailsOpen(open) {
  const grid = $("#gameGrid");
  grid.hidden = !open;
  updateMoreButton();

  if (open && !reduceMotion) {
    // animasyonu baştan oynatmak için class'ı çıkarıp reflow sonrası geri ekle
    grid.classList.remove("reveal");
    void grid.offsetWidth;
    grid.classList.add("reveal");
  }
}

function openGame(i) {
  setDetailsOpen(true);
  scrollToEl(document.getElementById(`game-${i}`));
}

$("#gameMore").onclick = () => {
  const open = $("#gameGrid").hidden;
  setDetailsOpen(open);
  if (!open) scrollToEl($("#games"));
};


// Oyun bandı. Kendi kendine kayıyor, fare üstündeyken duruyor, sürüklenebiliyor.
// Sonsuz döngü için kart seti birkaç kez kopyalanıyor ve scroll hep
// ilk iki setin arasında tutuluyor (wrap).
const GameBar = (() => {
  const SPEED = 40; // px/sn. pozitif: kartlar sağa akar, negatif: sola

  const bar = $("#gameBar");
  const track = $("#gameTrack");

  let setWidth = 0;
  let paused = false;
  let dragging = false;
  let dragged = false; // sürükleme sonundaki click'i yutmak için
  let started = false;

  function card(game, i, clone) {
    const jam = game.jam ? game.jam.replace(/\s*Game Jam/i, "").slice(0, 18) : "Solo";
    return `
      <button class="gcard" data-i="${i}" style="${cartStyle(i)}"${clone ? ' aria-hidden="true" tabindex="-1"' : ""}>
        <span class="cart-shell">
          <span class="cart-label">
            <span class="shot"><img src="${esc(game.cover)}" alt="${clone ? "" : esc(game.title)}" draggable="false" /></span>
            <span class="cart-title pix">${esc(game.title)}</span>
          </span>
          <span class="cart-foot pix">
            <span>${esc(jam)}</span>
            <span>${t("details")}${icon("arrow-right")}</span>
          </span>
        </span>
        <span class="gcard-genre">${esc(loc(game.genre))}</span>
      </button>`;
  }

  function render() {
    const cards = ITCH_GAMES.map((g, i) => card(g, i, false)).join("");
    const clones = ITCH_GAMES.map((g, i) => card(g, i, true)).join("");

    // önce tek seti koyup genişliğini ölç, ekranı dolduracak kadar kopya ekle
    track.innerHTML = `<div class="gset">${cards}</div>`;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    setWidth = track.firstElementChild.getBoundingClientRect().width + gap;

    const copies = Math.ceil(track.clientWidth / Math.max(setWidth, 1)) + 2;
    track.innerHTML += `<div class="gset" aria-hidden="true">${clones}</div>`.repeat(copies);
    track.scrollLeft = setWidth;

    for (const btn of $$(".gcard", track)) {
      btn.onclick = (e) => {
        if (dragged) return e.preventDefault();
        openGame(+btn.dataset.i);
      };
    }

    if (!started) start();
  }

  function wrap() {
    if (!setWidth) return;
    if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
    else if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
  }

  // scrollLeft tam sayı tuttuğu için küsuratı ayrıca biriktiriyoruz
  let lastTime = 0;
  let carry = 0;

  function tick(now) {
    const dt = Math.min(0.05, (now - (lastTime || now)) / 1000);
    lastTime = now;

    if (!paused && !dragging && !reduceMotion && !document.hidden) {
      carry -= SPEED * dt;
      const px = Math.trunc(carry);
      if (px) {
        track.scrollLeft += px;
        carry -= px;
      }
    }
    wrap();
    requestAnimationFrame(tick);
  }

  function start() {
    started = true;

    bar.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") paused = true;
    });
    bar.addEventListener("pointerleave", () => (paused = false));
    bar.addEventListener("focusin", () => (paused = true));
    bar.addEventListener("focusout", () => (paused = false));
    track.addEventListener("touchstart", () => (paused = true), { passive: true });
    track.addEventListener("touchend", () => setTimeout(() => (paused = false), 2500), { passive: true });

    let startX = 0;
    let startScroll = 0;

    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      dragged = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    });

    addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) {
        dragged = true;
        track.classList.add("dragging");
      }
      track.scrollLeft = startScroll - dx;
      wrap();
      startScroll = track.scrollLeft + dx; // wrap kaydırdıysa başlangıç noktası da kaysın
    });

    addEventListener("pointerup", () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("dragging");
      setTimeout(() => (dragged = false)); // click, pointerup'tan sonra geliyor
    });

    const scrollStep = (dir) => {
      const width = $(".gcard", track)?.offsetWidth || 240;
      track.scrollBy({ left: dir * (width + 22), behavior: reduceMotion ? "auto" : "smooth" });
    };
    $("#gbarPrev").onclick = () => scrollStep(-1);
    $("#gbarNext").onclick = () => scrollStep(1);

    addEventListener("resize", debounce(render, 200));
    requestAnimationFrame(tick);
  }

  return { render };
})();
