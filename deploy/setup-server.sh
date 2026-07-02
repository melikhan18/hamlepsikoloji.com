#!/usr/bin/env bash
#
# Hamle Psikoloji — sunucu İLK kurulum (Ubuntu 22.04 / 24.04).
# ROOT olarak çalıştır:   sudo bash deploy/setup-server.sh
#
# Kurulanlar: Java 21 + Maven, Node.js 20, Docker, Nginx + Certbot, ufw firewall,
# 'hamle' uygulama kullanıcısı ve /opt/hamle dizinleri.
#
set -euo pipefail

APP_USER=hamle
APP_HOME=/opt/hamle

if [[ $EUID -ne 0 ]]; then echo "Bu script root ile çalıştırılmalı (sudo)."; exit 1; fi

echo "==> [1/8] Paketler güncelleniyor"
apt-get update -y

echo "==> [2/8] Temel araçlar"
apt-get install -y curl git ufw ca-certificates gnupg openssl

echo "==> [3/8] Java 21 + Maven (backend)"
apt-get install -y openjdk-21-jdk maven

echo "==> [4/8] Node.js 20 (frontend)"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> [5/8] Docker (PostgreSQL için)"
if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi
systemctl enable docker

echo "==> [6/8] Nginx + Certbot (SSL)"
apt-get install -y nginx certbot python3-certbot-nginx

echo "==> [7/8] Firewall (ufw): sadece SSH + HTTP + HTTPS"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> [8/8] Uygulama kullanıcısı ve dizinler"
if ! id "$APP_USER" >/dev/null 2>&1; then
  useradd --system --create-home --home-dir "$APP_HOME" --shell /bin/bash "$APP_USER"
fi
usermod -aG docker "$APP_USER"
mkdir -p "$APP_HOME"/{app,backend,env,uploads}
chown -R "$APP_USER:$APP_USER" "$APP_HOME"

# deploy.sh'in şifresiz systemctl restart yapabilmesi için sınırlı sudo yetkisi
cat > /etc/sudoers.d/hamle <<'SUDO'
hamle ALL=(root) NOPASSWD: /usr/bin/systemctl restart hamle-backend, /usr/bin/systemctl restart hamle-frontend, /usr/bin/systemctl status hamle-backend, /usr/bin/systemctl status hamle-frontend
SUDO
chmod 440 /etc/sudoers.d/hamle

echo ""
echo "KURULUM TAMAM."
echo "Sıradaki adımlar için: DEPLOYMENT.md → 'Kurulum adımları' bölümü."
echo "Özet: su - hamle → repo klonla → env doldur → postgres başlat → systemd kur → deploy.sh → nginx + certbot."
