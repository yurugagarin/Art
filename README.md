# Momentum

Motivasyonun düştüğünde açıp bakacağın kişisel söz uygulaması. Tam ekran yaz fotoğrafları, üstünde seni harekete geçiren sözler, favoriler ve kendi yazdığın notlar.

## Neler var?

- **Akış:** Her gün farklı sırayla gelen 150'den fazla söz.
  - **Sağa kaydır:** Söz akışta kalır, ileride yine karşına çıkar.
  - **Sola kaydır:** Söz bir daha gösterilmez. Yanlışlıkla yaptıysan çıkan bildirimdeki **Geri al**'a ya da kartın sağındaki geri okuna bas. Akıştan çıkardıklarını **Favoriler** sayfasının altından tek tek ya da hepsini birden geri getirebilirsin.
  - Bilgisayarda: → tekrar gör, ← bir daha gösterme, Backspace geri al.
  - **İki kez dokun:** Söz favorilere eklenir (kalp animasyonuyla).
  - **Bir kez dokun:** Menüler gizlenir, sadece fotoğraf ve söz kalır. Tekrar dokununca geri gelir.
  - Sağdaki düğmeler: geri al, favori, paylaş, **fotoğrafı değiştir**.
  - Üstteki kategoriler: kendi kategorilerin, Spor & Güç, Disiplin, Kendine Hatırlat, Yaz Ruhu, Bilgelik, Benim.
  - Sıradaki kartların fotoğrafları önceden indirilir; kaydırınca arkadaki fotoğraf anında hazırdır.
- **Favoriler:** Pinterest tarzı ızgarada favori sözlerin. Birine dokununca tam ekran açılır.
- **Yaz:** Kendi sözünü ekle. Örneğin "O gömleği giydiğinde nasıl hissettiğini hatırla" ya da birinin sana söylediği bir cümle. Kimin söylediğini, kategoriyi ve fotoğrafı seçebilirsin. **Kendi fotoğrafını da telefonundan yükleyebilirsin.**
- **Kendi kategorilerin:** Yaz ekranında **+ Yeni kategori** ile ad ve simge seçerek kategori oluştur (örneğin "🏋️ Salon"). Akışın üstünde kendi sekmesi olur. Kategorilerini aynı ekranın altından düzenleyip silebilirsin; silinen kategorideki sözler "Kendine Hatırlat"a taşınır.
- **Yedek:** Yaz sekmesinin en altında yedek alma ve geri yükleme düğmeleri var. Senin sözlerin ve fotoğrafların sadece telefonunda saklanır, bir sunucuya gönderilmez.

## Telefona uygulama gibi ekleme

1. Uygulamanın adresini telefonda aç (GitHub Pages adresi aşağıda).
2. **iPhone (Safari):** Paylaş düğmesi → **Ana Ekrana Ekle**.
   **Android (Chrome):** ⋮ menüsü → **Ana ekrana ekle** / **Uygulamayı yükle**.
3. Ana ekrandaki **Momentum** ikonundan açtığında tam ekran, uygulama gibi çalışır. Bir kez açtıktan sonra internet olmadan da açılır. Daha önce gördüğün fotoğraflar telefonda önbelleğe alınır.

> Uygulamayı eski adıyla (Kıvılcım) ana ekrana eklediysen, eski ikonu silip sayfayı yeniden **Ana Ekrana Ekle** ile eklersen yeni ad ve logo görünür. Favorilerin ve sözlerin kaybolmaz.

## GitHub Pages ile yayınlama

Site, `gh-pages` dalından yayınlanır.

1. GitHub'da repo → **Settings → Pages**.
2. **Source:** *Deploy from a branch*, **Branch:** `gh-pages` / `(root)` → **Save**.
3. Bir iki dakika sonra adres: `https://yurugagarin.github.io/Art/`

> Not: Ücretsiz GitHub hesabında Pages yalnızca **public** (herkese açık) repolarda çalışır. Repo private ise önce Settings → General → *Change visibility* ile public yapman gerekir (ya da GitHub Pro). Repoda yalnızca uygulamanın kodu ve hazır sözler var. Senin eklediğin sözler ve fotoğraflar telefonda kalır, repoya girmez.

Güncelleme yayınlamak için:

```bash
npm install
npm run deploy   # derler ve dist/ klasörünü gh-pages dalına gönderir
```

## Bilgisayarda çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # üretim derlemesi (dist/)
npm run preview  # derlenmiş hali yerelde dene
```

## Hazır söz ekleme / değiştirme

Sözler `src/data/quotes.ts` dosyasında duruyor:

```ts
{ id: 's37', cat: 'spor', text: 'Practice makes perfect.', tr: 'Pratik, mükemmelleştirir.', author: 'İngiliz atasözü' },
{ id: 'h33', cat: 'hatirlat', text: 'Bugün de geldin. Bu yeter.' },
```

- `id`: Benzersiz olmalı (favoriler buna göre tutulur).
- `cat`: `spor` | `disiplin` | `hatirlat` | `yaz` | `bilgelik`
- `text`: Sözün kendisi. İngilizceyse `tr` alanına Türkçesini yaz.
- `author`, `note`: İsteğe bağlı. Sözün kime ait olduğu kesin değilse `note: '… atfedilir'` yaz.

## Fotoğraflar

Hazır fotoğraflar `src/data/photos.ts` dosyasında. [Unsplash](https://unsplash.com) bağlantıları olarak duruyorlar (ücretsiz kullanım lisansı). Yeni bir fotoğraf eklemek için Unsplash'te fotoğrafı açıp adresindeki `photo-…` kimliğini kopyala:

```ts
unsplash('1507525428034-b723cf961d3e', 'deniz'),
```

Temalar: `yaz`, `deniz`, `gunbatimi`, `doga`, `spor`, `arkadas`. Her kategori kendine uygun temalardan fotoğraf alır. Yüklenemeyen bir fotoğraf olursa uygulama onu otomatik atlar. Fotoğraf yüklenene kadar temaya uygun bir renk geçişi görünür.

## Teknik

React + TypeScript + Vite, kaydırma animasyonları için [Motion](https://motion.dev), yazı tipleri Fraunces ve Plus Jakarta Sans (uygulamanın içinde, internet gerekmez). Veriler `localStorage` ve `IndexedDB`'de tutulur. Service worker (`public/sw.js`) çevrimdışı açılışı ve fotoğraf önbelleğini sağlar.
