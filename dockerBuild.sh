#!/bin/bash
# to create / build docker image
docker build -t my-app .
#docker build -t directory -f .\src\Dockers\app\DockerFile .

#to run the docker image after created by using the above command
#docker run -d -p 3000:3000 my-app