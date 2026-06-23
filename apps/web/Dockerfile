FROM node:24-alpine AS dev
WORKDIR /app
RUN apk add --no-cache curl
COPY package.json ./
CMD ["sh", "-lc", "npm install && npm run dev -- --host 0.0.0.0"]

FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080

