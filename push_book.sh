git worktree add -f /tmp/book gh-pages
mdbook build
rm -rf /tmp/book/*
cp -rp book/* /tmp/book/
cd /tmp/book
git pull
echo "ike.mahaloz.re" > CNAME
git add -A
git commit -m 'book update'
git push origin gh-pages
cd -