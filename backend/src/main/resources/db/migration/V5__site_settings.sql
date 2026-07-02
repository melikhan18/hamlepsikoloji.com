create table site_settings (
    id                  bigint primary key,
    phone_display       varchar(100),
    phone               varchar(50),
    whatsapp            varchar(50),
    email               varchar(255),
    address_street      varchar(500),
    address_district    varchar(255),
    address_city        varchar(255),
    address_postal_code varchar(20),
    address_country     varchar(10),
    hours               varchar(255),
    maps_query          varchar(500),
    social_instagram    varchar(500),
    social_linkedin     varchar(500),
    social_youtube      varchar(500),
    updated_at          timestamptz
);

-- Tekil satır (id=1) — mevcut site.ts değerleriyle başlangıç.
insert into site_settings (
    id, phone_display, phone, whatsapp, email,
    address_street, address_district, address_city, address_postal_code, address_country,
    hours, maps_query, social_instagram, social_linkedin, social_youtube, updated_at
) values (
    1, '+90 (212) 000 00 00', '+902120000000', '905000000000', 'info@hamlepsikoloji.com',
    'Caferağa Mah. Örnek Cad. No: 1, Kat 3', 'Kadıköy', 'İstanbul', '34710', 'TR',
    'Pazartesi–Cumartesi 09:00–20:00', 'Hamle Psikoloji Kadıköy İstanbul',
    'https://instagram.com/hamlepsikoloji', 'https://www.linkedin.com/company/hamlepsikoloji', '',
    now()
);
