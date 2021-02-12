#!/bin/bash
mvn clean install

cp target/codeshare-1.jar app.jar

docker build . -t codeshare-back-image:latest
