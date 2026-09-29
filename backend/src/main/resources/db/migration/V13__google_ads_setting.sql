-- Google Ads etiket kimliği (AW-...) artık koda gömülü değil, SEO → Analytics panelinden yönetilir.
-- Boş bırakılırsa etiket yüklenmez. Mevcut canlı değer taşınır ki deploy sonrası ölçüm kesilmesin.
alter table site_settings add column google_ads_id varchar(50);

update site_settings set google_ads_id = 'AW-11280098753' where id = 1;
