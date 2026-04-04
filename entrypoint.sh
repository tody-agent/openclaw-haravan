#!/bin/bash
set -e

chown -R openclaw:openclaw /data
chmod 700 /data

if [ ! -d /data/.linuxbrew ]; then
  cp -a /home/linuxbrew/.linuxbrew /data/.linuxbrew
fi

rm -rf /home/linuxbrew/.linuxbrew
ln -sfn /data/.linuxbrew /home/linuxbrew/.linuxbrew

# Register plugin at runtime securely to ensure it is always loaded
echo "Registering Haravan Ops plugin at startup..."
# Execute the install via gosu to ensure the right permissions (openclaw user)
gosu openclaw openclaw plugins install -l /app/monorepo/packages/openclaw-haravan-plugin

exec gosu openclaw node src/server.js
