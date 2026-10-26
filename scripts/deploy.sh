#!/bin/sh
# dist/ klasörünü gh-pages dalına yeni bir commit olarak gönderir (GitHub Pages bu daldan yayınlar).
# Geçmiş korunur; zorla push (force) kullanılmaz.
set -e
cd "$(dirname "$0")/.."
[ -d dist ] || { echo "Önce 'npm run build' çalıştır."; exit 1; }
WT=$(mktemp -d)
if git fetch -q origin gh-pages 2>/dev/null; then
  git worktree add -q -B gh-pages "$WT" FETCH_HEAD
else
  git worktree add -q --detach "$WT"
  git -C "$WT" checkout -q --orphan gh-pages
fi
git -C "$WT" rm -rqf --ignore-unmatch . >/dev/null
cp -R dist/. "$WT"
git -C "$WT" add -A
if git -C "$WT" diff --cached --quiet; then
  echo "Değişiklik yok, yayın zaten güncel."
else
  git -C "$WT" commit -q -m "Yayın: $(date '+%Y-%m-%d %H:%M')"
  git -C "$WT" push -q -u origin gh-pages
  echo "Yayınlandı → gh-pages"
fi
git worktree remove --force "$WT"
