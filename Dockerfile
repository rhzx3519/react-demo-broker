FROM --platform=linux/amd64 nginx:stable-alpine3.17

COPY build/ /usr/share/nginx/html
EXPOSE 8080
