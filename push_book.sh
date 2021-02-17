git worktree add -f /tmp/book gh-pages
mdbook build
rm -rf /tmp/book/*
cp -rp book/* /tmp/book/
cd /tmp/book
git pull
git add -A
git commit -m 'book update'
git push origin gh-pages
cd -