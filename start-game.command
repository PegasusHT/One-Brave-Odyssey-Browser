#!/bin/zsh
cd "$(dirname "$0")"
clear
OBO_LAN_IP="$(ipconfig getifaddr en0)"
echo "One Brave Odyssey local server"
echo ""
echo "On this Mac: http://localhost:4173"
echo "On your phone: http://${OBO_LAN_IP:-your-mac-ip}:4173"
echo ""
echo "Keep this window open while playing. Press Control-C to stop."
echo ""
npm start
