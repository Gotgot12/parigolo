#!/bin/sh
echo "window._env_ = {
    BACKEND_PORT: '$BACKEND_PORT',
};" > /usr/share/nginx/html/env-config.js