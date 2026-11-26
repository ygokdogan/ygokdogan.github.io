# ygokdogan.dev

Kişisel portfolyom. Unity için geliştirdiğim araçları, itch.io'daki oyunlarımı ve GitHub projelerimi bir araya topluyor.

**Canlı:** [ygokdogan.dev](https://ygokdogan.dev)

## Öne çıkanlar

- **Kum simülasyonu:** Giriş ekranında isim piksel olarak çiziliyor; fareyle ya da dokunarak üstüne kum dökülebiliyor.
- **Karakter kartı:** GitHub profilinden gelen bilgiler, istatistikler ve tıklanınca o teknolojinin geçtiği projeleri gösteren bir Tech Arsenal.
- **Oyun bandı:** Kendi kendine kayan, sürüklenebilen kartuşlar ve her oyun için detaylı bir vitrin.
- **Projeler:** GitHub repoları API'den canlı çekiliyor; kapalı kaynak projeler telefon ekran görüntüleriyle vitrinde.
- **TR / EN** dil desteği.

## Teknik

Düz HTML, CSS ve JavaScript. Framework ya da build adımı yok, GitHub Pages üzerinde yayında.

```
data.js           içerik: profil, oyunlar, projeler, quest'ler, achievement'lar
css/style.css
js/
  utils.js        küçük yardımcılar
  i18n.js         TR/EN metinler
  sand.js         kum simülasyonu
  games.js        oyun bandı ve detay vitrinleri
  projects.js     GitHub repoları ve kapalı kaynak projeler
  profile.js      karakter kartı, tech arsenal, quest'ler, achievement'lar
  main.js         başlangıç, iletişim, dil değişimi
assets/           görseller, favicon ve ikonlar
fallback/         GitHub API limiti dolduğunda kullanılan yedek veriler
```

## Teşekkürler

- İkonlar: [Lucide](https://lucide.dev) (ISC) ve [Simple Icons](https://simpleicons.org) (CC0)
- Fontlar: Pixelify Sans, Space Grotesk ve JetBrains Mono ([Google Fonts](https://fonts.google.com))
