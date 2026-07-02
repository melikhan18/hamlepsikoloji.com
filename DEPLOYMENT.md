# Hamle Psikoloji — Üretim Kurulum Rehberi

Tek Linux VDS (ör. 4 core / 10 GB RAM, Ubuntu 22.04/24.04) üzerinde:

```
Cloudflare (ücretsiz CDN + SSL)
      │
   Nginx (443/80)
      ├─ hamlepsikoloji.com        → Next.js       (127.0.0.1:3000)
      └─ api.hamlepsikoloji.com     → Spring Boot    (127.0.0.1:8081) + /uploads + /admin
              ├─ PostgreSQL (127.0.0.1:5432, Docker, dışarı KAPALI)
              └─ /opt/hamle/uploads  (kalıcı görseller)
```

Dizin düzeni: repo `/opt/hamle/app`, jar `/opt/hamle/backend/app.jar`, env `/opt/hamle/env/`, görseller `/opt/hamle/uploads`.

---

## 0) Ön koşullar
- Domain: **hamlepsikoloji.com** (Cloudflare'e bağlı öneririm — ücretsiz).
- VDS'in **public IP**'si.
- SSH erişimi (root veya sudo kullanıcı).

## 1) DNS (Cloudflare)
Şu A kayıtlarını **VDS IP'sine** ekle:

| Tip | Ad | İçerik | Proxy |
|-----|----|--------|-------|
| A | `hamlepsikoloji.com` | `<VDS_IP>` | **DNS only** (gri) — certbot için |
| A | `www` | `<VDS_IP>` | DNS only |
| A | `api` | `<VDS_IP>` | DNS only |

> Not: SSL sertifikası alınana kadar (adım 7) proxy'yi **gri (DNS only)** bırak. Sonra turuncuya (Proxied) çevireceğiz.

## 2) Sunucu kurulumu (root)
Repoyu geçici olarak çek ve kurulum script'ini çalıştır:
```bash
sudo apt-get update -y && sudo apt-get install -y git
git clone https://github.com/<KULLANICI>/hamlepsikoloji.com.git /tmp/hamle
sudo bash /tmp/hamle/deploy/setup-server.sh
```
Bu; Java 21, Maven, Node 20, Docker, Nginx, Certbot, ufw firewall'ı kurar; `hamle` kullanıcısı ve `/opt/hamle` dizinlerini oluşturur.

## 3) Repo + ortam değişkenleri (`hamle` kullanıcısı)
```bash
sudo su - hamle
git clone https://github.com/<KULLANICI>/hamlepsikoloji.com.git /opt/hamle/app
cd /opt/hamle/app

# Güçlü sırlar üret
bash deploy/gen-secrets.sh

# Env dosyalarını kopyala ve DOLDUR
cp deploy/env/backend.env.example  /opt/hamle/env/backend.env
cp deploy/env/frontend.env.example /opt/hamle/env/frontend.env
nano /opt/hamle/env/backend.env      # DEGISTIR alanlarını doldur
nano /opt/hamle/env/frontend.env     # REVALIDATE_SECRET backend ile AYNI olsun
chmod 600 /opt/hamle/env/*.env
```
⚠️ **Kritik:** `REVALIDATE_SECRET` iki dosyada **aynı** olmalı; `CORS_ORIGINS` site domainini içermeli.

## 4) PostgreSQL'i başlat (`hamle`)
```bash
cd /opt/hamle/app
docker compose --env-file /opt/hamle/env/backend.env -f deploy/docker-compose.prod.yml up -d
docker ps        # hamle-postgres 'healthy' olmalı
```

## 5) systemd servislerini kur (root)
```bash
sudo cp /opt/hamle/app/deploy/systemd/hamle-backend.service  /etc/systemd/system/
sudo cp /opt/hamle/app/deploy/systemd/hamle-frontend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable hamle-backend hamle-frontend
```

## 6) İlk yayın — derle & başlat (`hamle`)
```bash
cd /opt/hamle/app
bash deploy/deploy.sh
```
Backend jar'ı derler, Flyway ile tabloları oluşturur, frontend'i build eder, iki servisi başlatır.
Kontrol:
```bash
curl -s localhost:8081/api/posts | head -c 100      # backend
curl -s -I localhost:3000 | head -1                 # frontend (200)
```

## 7) Nginx + SSL (root)
```bash
sudo cp /opt/hamle/app/deploy/nginx/hamlepsikoloji.conf /etc/nginx/sites-available/hamlepsikoloji
sudo ln -sf /etc/nginx/sites-available/hamlepsikoloji /etc/nginx/sites-enabled/hamlepsikoloji
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Let's Encrypt sertifikaları (DNS gri/DNS-only iken çalıştır)
sudo certbot --nginx -d hamlepsikoloji.com -d www.hamlepsikoloji.com -d api.hamlepsikoloji.com
```
Certbot 443 bloklarını ve HTTP→HTTPS yönlendirmesini otomatik ekler.

## 8) Cloudflare'i devreye al
- Adım 1'deki üç kaydı **Proxied (turuncu)** yap.
- SSL/TLS → **Full (strict)**.
- (Opsiyonel) Redirect Rule: `www.hamlepsikoloji.com/*` → `https://hamlepsikoloji.com/$1` (301).
- Speed → Brotli açık.

## 9) Gerçek içerik
`https://api.hamlepsikoloji.com/admin` → admin girişi (env'deki kullanıcı/şifre):
- **Ayarlar**: gerçek telefon, e-posta, adres, WhatsApp, harita, saatler, sosyal medya.
- **Ekip**: gerçek uzman bilgileri + fotoğraf.
- **Legal metinler**: hukuk danışmanı onaylı sürümlerle güncelle.

---

## ✅ Yayın sonrası doğrulama
- [ ] `https://hamlepsikoloji.com` açılıyor (SSL yeşil)
- [ ] İletişim formundan talep gönder → panelde **Talepler**'de görünüyor (CORS OK)
- [ ] Admin'den içerik değiştir → sitede ~anında güncelleniyor (revalidation OK)
- [ ] Admin'den görsel yükle → sitede görünüyor
- [ ] `https://hamlepsikoloji.com/sitemap.xml` ve `/robots.txt` doğru
- [ ] `https://api.hamlepsikoloji.com/robots.txt` → `Disallow: /` (api indekslenmiyor)
- [ ] Google Search Console'a ekle + sitemap gönder
- [ ] Lighthouse / PageSpeed / Rich Results testleri

## 🔁 Güncelleme (yeni sürüm yayınlama)
```bash
sudo su - hamle
cd /opt/hamle/app && git pull
bash deploy/deploy.sh
```

## 🛟 Bakım
- **Loglar:** `sudo journalctl -u hamle-backend -f` / `-u hamle-frontend -f`
- **DB yedek (günlük cron önerilir):**
  ```bash
  docker exec hamle-postgres pg_dump -U hamle hamle > /opt/hamle/backup-$(date +%F).sql
  ```
- **Servis durumu:** `sudo systemctl status hamle-backend hamle-frontend`
- **Görseller:** `/opt/hamle/uploads` (yedeklemeye dahil et)

## Notlar
- Backend çökse bile site **fallback** ile (yerel veri) çalışmaya devam eder.
- `next.config.ts` görsel host'u `api.hamlepsikoloji.com` olarak ayarlı.
- Portlar (8081/5432) yalnız localhost'ta; dışarıya sadece 80/443/22 açık.
