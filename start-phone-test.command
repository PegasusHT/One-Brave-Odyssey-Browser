#!/bin/zsh
set -e
umask 077
printf '\033]0;One Brave Odyssey — Phone test tunnel\007'
printf '\nOne Brave Odyssey — FREE temporary phone test\n\n'
printf 'Keep the game server running in its other Terminal window.\n'
printf 'Open the https://...trycloudflare.com link printed below on your phone.\n'
printf 'Anyone with that link can access the game while this tunnel runs.\n'
printf 'Press Control-C in THIS window to stop public access.\n'
printf 'No account, paid plan, login, or startup service is used.\n\n'
if ! curl --fail --silent --max-time 3 http://127.0.0.1:4173/ -o /dev/null; then
  printf 'The game server is stopped. Start start-game.command first.\n'
  read 'OBO_CLOSE?Press Return to close. '
  exit 1
fi
exec /opt/homebrew/bin/cloudflared tunnel --no-autoupdate --url http://127.0.0.1:4173 --protocol http2 --logfile /private/tmp/obo-phone-tunnel.log
