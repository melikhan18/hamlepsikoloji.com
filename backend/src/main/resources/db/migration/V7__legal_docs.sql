create table legal_docs (
    id         bigserial primary key,
    slug       varchar(255) not null unique,
    title      varchar(255) not null,
    intro      text,
    sections   jsonb not null default '[]',
    updated_at timestamptz
);

-- Sabit 3 metin — mevcut site içerikleriyle başlangıç (admin panelden düzenlenir).
insert into legal_docs (slug, title, intro, sections, updated_at) values
(
  'kvkk',
  'KVKK Aydınlatma Metni',
  '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla kişisel verilerinizin işlenmesine ilişkin sizi bilgilendirmek isteriz.',
  '[
    {"h":"İşlenen veriler","p":"Ad-soyad, iletişim bilgileri ve randevu talebinizle paylaştığınız bilgiler, yalnızca hizmet sunumu amacıyla işlenir."},
    {"h":"İşleme amaçları","p":"Verileriniz; randevu oluşturma, iletişim kurma ve hizmetin yürütülmesi amaçlarıyla işlenir."},
    {"h":"Haklarınız","p":"KVKK madde 11 kapsamında verilerinize erişme, düzeltme, silme ve işlenmesine itiraz etme haklarına sahipsiniz."}
  ]'::jsonb,
  now()
),
(
  'gizlilik',
  'Gizlilik Politikası',
  'Bu gizlilik politikası, web sitemizi kullanırken bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.',
  '[
    {"h":"Toplanan bilgiler","p":"İletişim formu aracılığıyla paylaştığınız bilgiler ve site kullanımına ilişkin anonim analitik veriler toplanabilir."},
    {"h":"Bilgilerin kullanımı","p":"Bilgileriniz yalnızca size hizmet sunmak, taleplerinizi yanıtlamak ve siteyi iyileştirmek için kullanılır; üçüncü taraflarla pazarlama amacıyla paylaşılmaz."},
    {"h":"Görüşme gizliliği","p":"Terapi görüşmelerinizin içeriği meslek etiği ve gizlilik ilkeleri kapsamında korunur."}
  ]'::jsonb,
  now()
),
(
  'cerez-politikasi',
  'Çerez Politikası',
  'Web sitemiz, deneyiminizi iyileştirmek ve site kullanımını analiz etmek için çerezler kullanabilir.',
  '[
    {"h":"Çerez nedir?","p":"Çerezler, ziyaret ettiğiniz sitelerin cihazınıza kaydettiği küçük metin dosyalarıdır."},
    {"h":"Kullandığımız çerezler","p":"Zorunlu çerezler sitenin çalışması için gereklidir; analitik çerezler ise ziyaretçi davranışını anonim olarak ölçmemize yardımcı olur."},
    {"h":"Çerez tercihleri","p":"Tarayıcı ayarlarınızdan çerezleri her zaman yönetebilir veya silebilirsiniz."}
  ]'::jsonb,
  now()
);
