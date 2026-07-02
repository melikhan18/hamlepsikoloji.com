# Hamle Psikoloji — CMS Backend (Spring Boot)

İçerik yönetimi için REST API. PostgreSQL + Flyway + JWT güvenlik.

## Çalıştırma (geliştirme)
1. Veritabanını başlatın:
   ```
   docker compose up -d
   ```
2. API'yi başlatın:
   ```
   mvn spring-boot:run
   ```
   API: http://localhost:8080

## Uçlar
- `POST /api/auth/login` — `{ "username": "...", "password": "..." }` → `{ token }`
- Genel (salt-okunur): `GET /api/posts`, `GET /api/posts/{slug}`
- Admin (Bearer token): `GET/POST/PUT/DELETE /api/admin/posts`, `POST /api/admin/uploads` (multipart `file`)
- Görseller: `GET /uploads/{dosya}`

## Varsayılan admin
`admin / admin123` — üretimde `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET` ortam değişkenleriyle değiştirin.

## Ortam değişkenleri
`DB_URL`, `DB_USER`, `DB_PASSWORD`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGINS`, `UPLOADS_DIR`, `UPLOADS_BASE_URL`, `REVALIDATE_URL`, `REVALIDATE_SECRET`

## On-demand revalidation (ön yüz anında güncelleme)
Bir yazı oluşturulduğunda/güncellendiğinde/silindiğinde backend, Next.js'e webhook
atar ve blog ile ilgili sayfalar (ana sayfa, blog liste/detay, ilgili yazılar,
sitemap) **anında** tazelenir — restart/rebuild gerekmez. Ateşle-unut: webhook
başarısız olsa bile kayıt işlemi etkilenmez (ön yüz en geç 5 dk'lık yedek ISR
süresinde kendini günceller).

- `REVALIDATE_URL` — Next.js webhook ucu, ör. `https://hamlepsikoloji.com/api/revalidate`
  (varsayılan `http://localhost:3000/api/revalidate`). Boş bırakılırsa özellik kapanır.
- `REVALIDATE_SECRET` — frontend `.env` içindeki `REVALIDATE_SECRET` ile **AYNI** olmalı.

Frontend tarafı: `src/app/api/revalidate/route.ts` (secret doğrular, `revalidatePath`
ile yolları geçersiz kılar).

## Durum
- ✅ Blog (uçtan uca: API + admin CRUD + görsel yükleme)
- ⏳ Ekip, hizmetler, S.S.S., görüşler, genel ayarlar (aynı kalıpla eklenecek)
