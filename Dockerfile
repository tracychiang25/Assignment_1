# stage 1- Client side
FROM node:18-alpine AS build
WORKDIR /app
COPY Client/package-lock.json Client/package.json .
RUN npm install
COPY Client/ .
RUN npm run build

# stage 2- Server side
FROM node:18-alpine
WORKDIR /app
# install FFmpeg
RUN apk add --no-cache ffmpeg 
COPY API/package-lock.json API/package.json .
RUN npm install
COPY API/ .

COPY --from=build /app/build ./public

CMD ["node","bin/www"]
EXPOSE 3000
