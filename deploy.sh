#!/bin/bash
# Load environment variables
dotenv -e .env -- bash -c '

# Rsync only server.js, package.json, and the public folder
rsync -avz --include "server.js" --include "package.json" --include "public/***" --exclude "*" ./ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}

# SSH into the server, install dependencies, and restart the server
ssh ${SERVER_USER}@${SERVER_IP} "
  cd ${SERVER_PATH} && \
  npm install && \
  pm2 restart rally-app || pm2 start server.js --name rally-app
"
'
