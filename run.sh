#!/bin/bash
echo "Running backend"
cd /app/backend
ls
nohup bash -c 'npm start' &

echo "Running frontend";
cd /app/frontend;
ls
nohup bash -c 'npm start' &
/bin/bash
