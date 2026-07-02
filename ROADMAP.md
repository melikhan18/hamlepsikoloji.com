# Hamle Psikoloji — Web Sitesi Yol Haritası

> Tek merkez kurumsal klinik · Next.js + Headless CMS (Sanity) · Maksimum SEO

## 1. Kararlar (Sabit)

| Konu | Karar |
|------|-------|
| Yapı | Tek merkez / klinik (kendi uzman kadrosu) |
| Teknoloji | Next.js (App Router) + Sanity (Headless CMS) + Tailwind CSS |
| Hizmet hatları | Bireysel · Çift & Aile · Çocuk & Ergen · Online Terapi |
| Öncelik | Maksimum SEO + temiz/sade kullanıcı deneyimi |

## 2. Site Haritası

```
/                         Ana Sayfa
/hizmetler                Hizmetler hub
  /hizmetler/bireysel-terapi
  /hizmetler/cift-ve-aile-terapisi
  /hizmetler/cocuk-ve-ergen-terapisi
  /hizmetler/online-terapi
/ekibimiz                 Ekip listesi
  /ekibimiz/[uzman-slug]  Her uzman ayrı profil (Schema: Person)
/blog                     Blog listesi
  /blog/[yazi-slug]       Yazı (Schema: Article)
/hakkimizda
/sss                      S.S.S. (Schema: FAQPage)
/iletisim                 Form + harita + WhatsApp + telefon
/kvkk  /gizlilik  /cerez-politikasi
```

## 3. Sayfa İçerik Şablonları

**Ana Sayfa:** Hero (net değer önerisi + CTA) → Hizmet kartları → "Nasıl çalışır?" (3-4 adım) → Öne çıkan uzmanlar → Sosyal kanıt (yorum/istatistik) → Blog'dan son yazılar → İletişim/WhatsApp CTA.

**Hizmet sayfası (pillar):** H1 = hizmet adı → kimler için → süreç nasıl işliyor → ilgili uzmanlar → bu hizmetle ilgili blog yazıları (iç link) → SSS bölümü (FAQPage schema) → randevu CTA.

**Uzman profili:** Foto, unvan, uzmanlık alanları, eğitim/sertifika, çalıştığı yöntemler (EMDR/BDT/Şema vb.), randevu CTA. Person schema.

**Blog yazısı:** H1, yayın/güncelleme tarihi, yazar (uzman), içindekiler, iç linkler (ilgili hizmet + yazılar), Article schema.

## 4. SEO Kontrol Listesi

**Teknik**
- [ ] SSG/ISR ile statik HTML (her sayfa kaynak HTML'de tam içerik)
- [ ] Otomatik `sitemap.xml` + `robots.txt`
- [ ] Canonical URL'ler, temiz slug yapısı (Türkçe karaktersiz)
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Görseller WebP/AVIF + `next/image`, font preload
- [ ] Mobil öncelikli, erişilebilir (WCAG AA)

**İçerik / On-page**
- [ ] Her sayfada benzersiz `<title>` + meta description
- [ ] Tek `<h1>`, mantıklı başlık hiyerarşisi
- [ ] OpenGraph + Twitter card meta
- [ ] Topic cluster: hizmet (pillar) ↔ blog (destek) iç linkleme

**Yapısal Veri (JSON-LD)**
- [ ] `MedicalBusiness` / `Psychologist` (site geneli)
- [ ] `LocalBusiness` (adres, NAP, çalışma saatleri)
- [ ] `Person` (her uzman), `Article` (her yazı), `FAQPage` (SSS)
- [ ] `BreadcrumbList`

**Yerel SEO**
- [ ] Google Business Profile kurulumu + NAP tutarlılığı
- [ ] İletişim sayfasında gömülü harita + adres

## 5. Aşamalı Plan

### Faz 0 — Temel
- Marka kimliği: logo, renk paleti (sakin/güven veren tonlar), tipografi, ton
- Proje iskeleti: Next.js + Tailwind + Sanity kurulumu, repo, ortam değişkenleri
- Tasarım sistemi: tipografi ölçeği, buton/kart/form bileşenleri, layout grid

### Faz 1 — Çekirdek Sayfalar
- Ortak layout: header (nav + WhatsApp), footer (NAP + linkler)
- Ana Sayfa
- Hizmetler hub + 4 hizmet sayfası
- İletişim sayfası + randevu formu

### Faz 2 — Güven Katmanı
- Sanity şemaları: Uzman, Hizmet, Blog yazısı, SSS
- Ekibimiz listesi + uzman profil sayfaları
- Hakkımızda + S.S.S.

### Faz 3 — İçerik / SEO Motoru
- Blog altyapısı (liste + yazı + kategori/etiket)
- İlk 8-10 SEO yazısı (anksiyete, depresyon, ilişki, ebeveynlik, online terapi rehberi vb.)
- Tüm JSON-LD şemaları, sitemap, meta otomasyonu

### Faz 4 — Dönüşüm
- Randevu/ön görüşme akışı (form → e-posta/CRM)
- WhatsApp entegrasyonu, telefon click-to-call
- (Opsiyonel) online görüşme/randevu takvimi

### Faz 5 — Cila & Lansman
- Performans turu (Lighthouse), erişilebilirlik denetimi
- Analytics (GA4 / Plausible) + Search Console
- KVKK/çerez onayı, yasal sayfalar
- Canlı yayın + Search Console'a sitemap gönderimi

## 6. Açık Konular (sonraki kararlar)
- Şehir/lokasyon (yerel SEO ve LocalBusiness için gerekli)
- Marka kimliği hazır mı, yoksa sıfırdan mı?
- Uzman sayısı ve içerikleri (foto, bio) hazır mı?
- İçerik (blog yazıları) kim üretecek?
- Domain/hosting (Vercel öneriliyor) ve e-posta altyapısı
