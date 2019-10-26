# Stash previous commits
git stash
git checkout develop

# Build site
stack exec blog-de-prog clean
stack exec blog-de-prog build

# Switch to master branch
git fetch --all
git checkout master

# Overwrite previous build
cp -a _site/. .

# Push files to Master branch
git add -A
git commit -m "Publishing"
git push

# Back to development
git checkout develop
git stash pop
