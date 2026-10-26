#!/bin/sh
# dist/ klasörünü gh-pages dalına gönderir (GitHub Pages bu daldan yayınlar).
set -e
cd "$(dirname "$0")/.."
[ -d dist ] || { echo "Önce 'npm run build' çalıştır."; exit 1; }
REMOTE=$(git remote get-url origin)
TMP=$(mktemp -d)
cp -R dist/. "$TMP"
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$OLDPWD" config user.name || echo deploy)" \
    -c user.email="$(git -C "$OLDPWD" config user.email || echo deploy@localhost)" \
    commit -q -m "Yayın: $(date '+%Y-%m-%d %H:%M')"
git push -q -f "$REMOTE" gh-pages
cd - >/dev/null
rm -rf "$TMP"
echo "Yayınlandı → gh-pages"
