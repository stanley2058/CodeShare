FROM openjdk:11
WORKDIR /usr/src/app

COPY . .
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-jar","app.jar"]
