# 构建前端资源
FROM registry.cn-hangzhou.aliyuncs.com/jrjr/node:22.4.0-alpine3.20 as builder 

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm config set registry https://registry.npmmirror.com
RUN npm ci

COPY . .

RUN npm run build

# 构建后端资源
FROM registry.cn-hangzhou.aliyuncs.com/jrjr/nginx:1.27.0-alpine-slim 

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/conf/nginx.conf /etc/nginx/nginx.conf