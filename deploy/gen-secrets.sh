#!/usr/bin/env bash
#
# Güçlü sırlar üretir. Çıktıyı env dosyalarına yapıştır.
# ÖNEMLİ: REVALIDATE_SECRET hem backend.env hem frontend.env içinde AYNI olmalı.
#
set -euo pipefail

echo "# ---- Üretilen sırlar (env dosyalarına yerleştir) ----"
echo "DB_PASSWORD=$(openssl rand -hex 16)"
echo "JWT_SECRET=$(openssl rand -hex 32)"
echo "ADMIN_PASSWORD=$(openssl rand -base64 15 | tr -d '/+=' )"
REV="$(openssl rand -hex 24)"
echo "REVALIDATE_SECRET=$REV     # <-- bu değeri backend.env VE frontend.env içine AYNI yaz"
