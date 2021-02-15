#!/bin/bash

docker tag codeshare-front-image docker.stw.tw/codeshare-front-image:latest
docker tag codeshare-back-image docker.stw.tw/codeshare-back-image:latest

docker push docker.stw.tw/codeshare-front-image:latest
docker push docker.stw.tw/codeshare-back-image:latest
