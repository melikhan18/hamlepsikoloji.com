#!/usr/bin/env bash
#
# Hamle Psikoloji — derle & yayınla (tekrar tekrar çalıştırılır).
# 'hamle' kullanıcısı ile, repo kökünde çalıştır:   bash deploy/deploy.sh
#
# Yaptığı: backend jar derler → /opt/hamle/backend/app.jar, frontend build eder,
# iki systemd servisini yeniden başlatır.
#
set -euo pipefail

ENV_DIR=/opt/hamle/env
BACKEND_JAR=/opt/hamle/backend/app.jar
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f "$ENV_DIR/frontend.env" ]]; then
  echo "HATA: $ENV_DIR/frontend.env yok. Önce env dosyalarını doldur (DEPLOYMENT.md)."; exit 1
fi

echo "==> [1/4] Frontend build ortam değişkenleri yükleniyor (NEXT_PUBLIC_*)"
set -a; source "$ENV_DIR/frontend.env"; set +a

echo "==> [2/4] Backend derleniyor (jar)"
( cd backend && mvn -q -DskipTests clean package )
cp backend/target/*.jar "$BACKEND_JAR"

echo "==> [3/4] Frontend derleniyor"
npm ci
npm run build

echo "==> [4/4] Servisler yeniden başlatılıyor"
sudo systemctl restart hamle-backend
sudo systemctl restart hamle-frontend

echo ""
echo "YAYIN TAMAM. Durum:"
sudo systemctl status hamle-backend --no-pager | head -5 || true
sudo systemctl status hamle-frontend --no-pager | head -5 || true
