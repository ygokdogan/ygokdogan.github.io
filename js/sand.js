// Girişteki kum simülasyonu (particle-lab'daki falling sand'in sade bir hali).
// İsim piksel olarak çiziliyor ve kum için katı zemin görevi görüyor.

const Sand = (() => {
  const hero = $(".hero");
  const canvas = $("#sand");
  const ctx = canvas.getContext("2d");

  // simülasyon küçük bir offscreen canvas'ta, ekrana CELL katı büyütülerek basılıyor
  const off = document.createElement("canvas");
  const offCtx = off.getContext("2d");

  let W = 0, H = 0, CELL = 4, DPR = 1;
  let lastWidth = 0;
  let frame = 0;
  let visible = true;
  let introUntil = 0;
  let userGrains = 0;

  let grid;  // 0: boş, diğerleri palet indeksi
  let solid; // ismin pikselleri
  let base;  // kum olmayan yerlerin rengi (isim + gölge)
  let image, pixels;

  const rgba = (r, g, b, a = 255) => ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;

  function hsl(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return rgba(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255));
  }

  // 64 ton x 4 parlaklık. Kum rengi zamanla bu tonlar arasında dönüyor.
  const PALETTE = new Uint32Array(256);
  for (let i = 1; i < 256; i++) {
    const hue = (38 - (i >> 2) * 5.6 + 720) % 360;
    PALETTE[i] = hsl(hue, 88, 56 + (i & 3) * 6);
  }
  const TEXT = rgba(243, 234, 219);
  const SHADOW = rgba(255, 92, 138);

  function resize() {
    const rect = hero.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return; // sekme arka plandayken boyut 0 gelebiliyor
    if (grid && Math.abs(rect.width - lastWidth) < 2) return; // mobilde adres çubuğu yüzünden sıfırlanmasın
    lastWidth = rect.width;

    CELL = rect.width < 600 ? 3 : 4;
    DPR = Math.min(2, devicePixelRatio || 1);
    W = Math.ceil(rect.width / CELL);
    H = Math.ceil(rect.height / CELL);

    canvas.width = Math.round(rect.width * DPR);
    canvas.height = Math.round(rect.height * DPR);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    off.width = W;
    off.height = H;

    grid = new Uint8Array(W * H);
    solid = new Uint8Array(W * H);
    base = new Uint32Array(W * H);
    image = offCtx.createImageData(W, H);
    pixels = new Uint32Array(image.data.buffer);

    drawName();
  }

  function drawName() {
    const tmp = document.createElement("canvas");
    tmp.width = W;
    tmp.height = H;
    const c = tmp.getContext("2d");
    const font = (size) => `700 ${size}px "Space Grotesk", sans-serif`;

    // 100px'te ölçüp genişliğin %84'ünü kaplayacak boyutu bul
    c.font = font(100);
    let lines = [PROFILE.name];
    let size = Math.floor((100 * W * 0.84) / c.measureText(PROFILE.name).width);

    // dar ekranda tek satır çok küçük kalıyorsa en dengeli yerden ikiye böl
    const words = PROFILE.name.split(" ");
    if (size < 16 && words.length > 1) {
      let best = null;
      for (let k = 1; k < words.length; k++) {
        const split = [words.slice(0, k).join(" "), words.slice(k).join(" ")];
        const width = Math.max(...split.map((l) => c.measureText(l).width));
        if (!best || width < best.width) best = { split, width };
      }
      lines = best.split;
      size = Math.floor((100 * W * 0.86) / best.width);
    }
    size = Math.max(8, Math.min(size, Math.floor(H * 0.2)));

    c.font = font(size);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#fff";
    const lineHeight = size * 1.02;
    const centerY = H * 0.42;
    lines.forEach((line, i) => {
      c.fillText(line, W / 2, centerY + (i - (lines.length - 1) / 2) * lineHeight);
    });

    const alpha = c.getImageData(0, 0, W, H).data;
    let top = H, bottom = 0;
    for (let k = 0; k < W * H; k++) {
      if (alpha[k * 4 + 3] <= 140) continue;
      solid[k] = 1;
      const y = (k / W) | 0;
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }

    // harfler + sağ alta 1 piksellik pembe gölge
    base.fill(0);
    for (let k = 0; k < W * H; k++) {
      if (solid[k]) base[k] = TEXT;
      else if (k > W && solid[k - W - 1]) base[k] = SHADOW;
    }

    // ismin altındaki yazılar CSS'te buna göre konumlanıyor
    hero.style.setProperty("--name-top", `${top * CELL}px`);
    hero.style.setProperty("--name-bottom", `${(bottom + 1) * CELL}px`);
  }

  const isFree = (k) => !grid[k] && !solid[k];

  function step() {
    // her karede tarama yönünü değiştir, yoksa kum hep bir tarafa kayıyor
    const leftToRight = ++frame & 1;

    for (let y = H - 2; y >= 0; y--) {
      for (let i = 0; i < W; i++) {
        const x = leftToRight ? i : W - 1 - i;
        const k = y * W + x;
        const color = grid[k];
        if (!color) continue;

        const below = k + W;
        if (isFree(below)) {
          grid[below] = color;
          grid[k] = 0;
          continue;
        }

        // altı doluysa çaprazlardan birine (rastgele) kaymayı dene
        const d = Math.random() < 0.5 ? -1 : 1;
        for (const dir of [d, -d]) {
          const nx = x + dir;
          if (nx >= 0 && nx < W && isFree(below + dir) && isFree(k + dir)) {
            grid[below + dir] = color;
            grid[k] = 0;
            break;
          }
        }
      }
    }
  }

  function draw() {
    for (let k = 0; k < W * H; k++) pixels[k] = grid[k] ? PALETTE[grid[k]] : base[k];
    offCtx.putImageData(image, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, 0, 0, W * CELL * DPR, H * CELL * DPR);
  }

  function grainColor() {
    const hueStep = Math.floor(performance.now() / 90) % 64;
    return Math.min(255, 1 + ((hueStep << 2) | ((Math.random() * 4) | 0)));
  }

  function spawn(cx, cy, count, radius) {
    let made = 0;
    for (let i = 0; i < count; i++) {
      const x = Math.round(cx + (Math.random() * 2 - 1) * radius);
      const y = Math.round(cy + (Math.random() * 2 - 1) * radius);
      if (x < 0 || x >= W || y < 0 || y >= H) continue;
      const k = y * W + x;
      if (isFree(k)) {
        grid[k] = grainColor();
        made++;
      }
    }
    return made;
  }

  function pour(e, count, radius) {
    if (!grid || e.target.closest("a, button")) return;
    const rect = canvas.getBoundingClientRect();
    userGrains += spawn((e.clientX - rect.left) / CELL, (e.clientY - rect.top) / CELL, count, radius);
    if (userGrains > 400) unlock("achSand");
  }

  function loop() {
    if (!grid) resize();
    if (visible && grid) {
      // açılışta ismin üstüne üç noktadan kum yağıyor
      if (performance.now() < introUntil) {
        for (const fx of [0.28, 0.5, 0.72]) spawn(W * fx, 2, 4, 3);
      }
      step();
      draw();
    }
    requestAnimationFrame(loop);
  }

  function init() {
    resize();
    addEventListener("resize", debounce(resize, 150));
    hero.addEventListener("pointermove", (e) => pour(e, 8, 2));
    hero.addEventListener("pointerdown", (e) => pour(e, 60, 5));

    $("#clearSand").addEventListener("click", () => {
      grid?.fill(0);
      if (userGrains > 400) unlock("achClean");
    });

    new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(hero);

    if (!reduceMotion) introUntil = performance.now() + 2600;
    loop();
  }

  return { init };
})();
