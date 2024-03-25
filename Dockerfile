FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY ./dist/kursui/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d
WORKDIR /html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]

