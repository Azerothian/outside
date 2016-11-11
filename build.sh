npm install
gulp
docker build -t azerothian/node-initial .
docker save azerothian/node-initial | gzip > node-initial.tar.gz