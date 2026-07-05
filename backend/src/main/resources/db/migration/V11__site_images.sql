create table site_images (
    id          bigserial primary key,
    img_key     varchar(100) not null unique,
    label       varchar(255) not null,
    description text,
    url         text,
    updated_at  timestamptz
);

-- Sabit görsel noktaları — mevcut site görselleriyle başlangıç (admin panelden değiştirilir).
insert into site_images (img_key, label, description, url, updated_at) values
(
  'homeHero',
  'Ana sayfa — hero görseli',
  'Ana sayfanın en üstündeki tam ekran arka plan görseli. Önerilen: yatay, en az 1600px genişlik.',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600',
  now()
),
(
  'homeAbout',
  'Ana sayfa — Biz kimiz bölümü',
  'Ana sayfadaki "Biz kimiz?" bölümünün sol tarafındaki büyük görsel. Önerilen: dikey/kare, en az 1400px.',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=1400',
  now()
),
(
  'aboutTop',
  'Hakkımızda — üst görsel',
  'Hakkımızda sayfasının üst bölümündeki görsel. Önerilen: dikey, en az 1000px.',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=1000',
  now()
),
(
  'aboutSecond',
  'Hakkımızda — ikinci görsel',
  'Hakkımızda sayfasında "Size olan sözümüz" yanındaki görsel. Önerilen: dikey, en az 900px.',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=900',
  now()
),
(
  'ctaBanner',
  'Randevu bandı (CTA) — arka plan',
  'Sayfaların altındaki "Hemen arayın / randevu" bandının arka plan görseli. Önerilen: yatay, en az 1600px.',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=1600',
  now()
);
