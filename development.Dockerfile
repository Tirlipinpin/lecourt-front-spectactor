FROM node:lts-alpine as runtime
WORKDIR /app

COPY ./package*.json ./
RUN npm i

COPY . .
RUN npm run build

FROM nginx:1.15

COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=runtime \
    /app/build /usr/share/nginx/lecourt