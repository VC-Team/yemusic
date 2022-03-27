#! /bin/bash

docker build . -t vc-yemusic:base

docker-compose up -d

docker rmi $(docker images -f dangling=true -q)
