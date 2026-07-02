# Hamle Psikoloji — Web Sitesi

İstanbul merkezli psikoloji kliniği için kurumsal web sitesi. **Next.js 16 (App Router) + Tailwind CSS v4**. Maksimum SEO ve sade kullanıcı deneyimi hedeflenmiştir. Yol haritası için bkz. [ROADMAP.md](./ROADMAP.md).

## Çalıştırma

```bash
npm run dev      # geliştirme sunucusu (http://localhost:3000)
npm run build    # production build
npm start        # production sunucusu
```

## Proje yapısı

```
src/
  app/                 Sayfalar (App Router)
    page.tsx           Ana sayfa
    hizmetler/         Hizmet hub + [slug] detay
    ekibimiz/          Ekip listesi + [slug] uzman profili
    blog/              Blog listesi + [slug] yazı
    hakkimizda, sss, iletisim, kvkk, gizlilik, cerez-politikasi
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/          Header, Footer, Cards, ui, ContactForm, JsonLd, Logo ...
  data/                İÇERİK — services.ts, team.ts, posts.ts, faq.ts
  lib/                 site.ts (genel ayarlar), schema.ts (JSON-LD)
```

## İçeriği nereden düzenlersiniz?

| Ne | Dosya |
|----|-------|
| İletişim, adres, telefon, sosyal medya | `src/lib/site.ts` |
| Hizmetler (4 alan) | `src/data/services.ts` |
| Uzmanlar (şu an 2 placeholder) | `src/data/team.ts` |
| Blog yazıları | `src/data/posts.ts` |
| Genel S.S.S. | `src/data/faq.ts` |
| Marka renkleri / fontlar | `src/app/globals.css` |
| Logo | `src/components/Logo.tsx` + `src/app/icon.svg` |

## `[PLACEHOLDER]` doldurulacaklar

- `src/lib/site.ts` → telefon, adres, e-posta, harita konumu (geo), sosyal medya
- `src/data/team.ts` → gerçek uzman adı, unvan, biyografi, eğitim, fotoğraf
- Uzman fotoğrafları: şu an baş harf avatarı kullanılıyor (`Avatar.tsx`). Gerçek foto eklenince `next/image`'a geçilebilir.
- Yasal metinler (KVKK/Gizlilik/Çerez) hukuk danışmanı onayından geçmeli.

## SEO özeti (kurulu olanlar)

- Tüm sayfalar statik prerender (hızlı LCP)
- Sayfa bazlı `title` / `description` / canonical
- JSON-LD: MedicalBusiness/Psychologist, BreadcrumbList, FAQPage, Person, Article
- `sitemap.xml` + `robots.txt` otomatik
- OpenGraph görseli otomatik üretiliyor (`opengraph-image.tsx`)
- `lang="tr"`, semantik başlık hiyerarşisi, mobil öncelikli

## Sonraki adımlar (yapılacaklar)

1. **İçerik:** Gerçek uzman bilgileri, fotoğraflar, iletişim/adres.
2. **Form backend:** `ContactForm.tsx` şu an WhatsApp'a yönlendiriyor. Kalıcı çözüm için bir API route + e-posta servisi (Resend) veya Formspree.
3. **Headless CMS (Sanity):** `data/*` dosyalarındaki içerik Sanity şemalarına taşınarak panelden yönetilebilir hale getirilir.
4. **Analytics:** GA4 / Plausible + Google Search Console + Google Business Profile.
5. **Deploy:** Vercel (önerilen) — domain bağlanır, `site.url` zaten production'a göre ayarlı.
```
