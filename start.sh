#!/usr/bin/env bash
set -e
# Start script used by some Railway buildpacks/Railpack if they search for start.sh
cd backend
npm install --production
npm start
