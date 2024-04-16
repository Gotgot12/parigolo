#!/bin/sh
echo "window._env_ = {
    BACKEND_PORT: '$BACKEND_PORT',
};" > ./public/env-config.js