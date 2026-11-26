# ygokdogan.dev

Kişisel portfolyom: Unity araçları, itch.io oyunları ve GitHub projeleri.

Düz HTML/CSS/JS, build adımı yok. GitHub Pages'ta yayında.

```
data.js           içerik (profil, oyunlar, projeler, quest'ler, achievement'lar)
css/style.css
js/
  utils.js        küçük yardımcılar
  i18n.js         TR/EN metinler
  sand.js         girişteki kum simülasyonu
  games.js        oyun bandı ve detay vitrinleri
  projects.js     GitHub repoları ve kapalı kaynak projeler
  profile.js      karakter kartı, tech arsenal, quest'ler, achievement'lar
  main.js         başlangıç, iletişim, dil değişimi
assets/icons.svg  Lucide (ISC) + Simple Icons (CC0) ikonları
fallback/         GitHub API limiti dolarsa kullanılan repos.json ve profile.json
```

Yerelde:

```bash
python3 -m http.server 5173
```

Yayınlamadan önce tarayıcı önbelleği için `index.html`'deki `?v=` numaralarını güncelle:

```bash
sed -i '' -E "s#\?v=[0-9]+#?v=$(date +%Y%m%d%H%M)#g" index.html
```
