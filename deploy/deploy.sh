#!/usr/bin/env bash
#
# Hamle Psikoloji — derle & yayınla (tekrar tekrar çalıştırılır).
# 'hamle' kullanıcısı ile, repo kökünde çalıştır:   bash deploy/deploy.sh
#
# Akış: backend jar derle → BACKEND'İ BAŞLAT + sağlık bekle → frontend build
# (içeriği taze ve AYAKTA olan backend'den çeker) → frontend'i başlat.
#
set -euo pipefail

ENV_DIR=/opt/hamle/env
BACKEND_JAR=/opt/hamle/backend/app.jar
API_HEALTH_URL=http://localhost:8081/api/posts
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f "$ENV_DIR/frontend.env" ]]; then
  echo "HATA: $ENV_DIR/frontend.env yok. Önce env dosyalarını doldur (DEPLOYMENT.md)."; exit 1
fi

echo "==> [1/5] Frontend build ortam değişkenleri yükleniyor"
set -a; source "$ENV_DIR/frontend.env"; set +a
# Sunucu içi istekler her zaman localhost'a gitsin (env'de unutulsa bile) —
# public domain üzerinden hairpin/Cloudflare'e takılıp build'in asılmasını önler.
export API_URL_INTERNAL="${API_URL_INTERNAL:-http://localhost:8081}"

echo "==> [2/5] Backend derleniyor (jar)"
( cd backend && mvn -q -DskipTests clean package )
cp backend/target/*.jar "$BACKEND_JAR"

echo "==> [3/5] Backend başlatılıyor ve sağlık bekleniyor"
sudo systemctl restart hamle-backend
ok=""
for i in $(seq 1 60); do
  if curl -sf -o /dev/null "$API_HEALTH_URL"; then ok=1; echo "    backend hazır (${i}s)"; break; fi
  sleep 1
done
if [[ -z "$ok" ]]; then
  echo "HATA: backend ${API_HEALTH_URL} üzerinde 60 sn içinde yanıt vermedi."
  echo "İnceleme için (root): journalctl -u hamle-backend -n 50"
  exit 1
fi

echo "==> [4/5] Frontend derleniyor"
npm ci --include=dev
npm run build

echo "==> [5/5] Frontend başlatılıyor"
sudo systemctl restart hamle-frontend

echo ""
echo "YAYIN TAMAM. Durum:"
systemctl status hamle-backend --no-pager 2>/dev/null | head -5 || true
systemctl status hamle-frontend --no-pager 2>/dev/null | head -5 || true
