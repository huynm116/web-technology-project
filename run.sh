#!/bin/bash
echo "Running backend"
cd /app/backend
nohup bash -c 'npm start' &

echo "Running frontend"
cd /app/frontend
nohup bash -c 'npm start' &;