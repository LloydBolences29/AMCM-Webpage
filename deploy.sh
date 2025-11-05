#!/bin/bash

# ==============================
# On-Prem MERN + Nginx Deployment
# ==============================

echo "Starting deployment..."

# --- FRONTEND ---
echo "Building frontend..."
cd /home/amcmweb/amcm-template/amcm-webpage || exit
npm install
npm run build

echo "Copying frontend build to Nginx..."
sudo rm -rf /var/www/amcm/*
sudo cp -r dist/* /var/www/amcm/

echo "Copying frontend and backend root folder to  195.68.2.130 for production ..."
rsync -avz --delete /home/amcmweb/amcm-template/amcm-webpage/ root@195.68.2.130:/home/amcmweb/amcm-template/amcm-webpage/; rsync -avz --delete --exclude 'uploads/' --exclude '.env' /home/amcmweb/amcm-template/backend/ root@195.68.2.130:/home/amcmweb/amcm-template/backend/


echo "Copying develoment DIST folder to the prod server"
rsync -avz --delete /home/amcmweb/amcm-template/amcm-webpage/dist/ root@195.68.2.130:/var/www/amcm/


# --- NGINX ---
echo "Reloading Nginx..."
sudo systemctl reload nginx


# --- BACKEND ---
echo "Checking backend process..."

cd /home/amcmweb/amcm-template/backend || exit

if pm2 describe backend >/dev/null 2>&1; then
  echo "Backend process found. Restarting..."
  pm2 restart backend
else
  echo "Backend process not found. Starting a new one..."
  pm2 start index.js --name backend
fi

echo "Reload NGINX on 195.68.2.130"
ssh root@195.68.2.130 "systemctl reload nginx"

echo "Restart backend on 195.68.2.130"
ssh root@195.68.2.130 "pm2 restart backend"

echo "Deployment completed successfully!"
