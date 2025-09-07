# ================================
# Stage 1: Build Angular app
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# ติดตั้ง build tools สำหรับ native dependencies
RUN apk add --no-cache python3 make g++

# ติดตั้ง devDependencies (รวม Angular CLI) สำหรับ build
COPY package*.json ./
RUN npm ci

# copy source code ทั้งหมด
COPY . .

# build Angular app
RUN npx ng build --configuration production

# ================================
# Stage 2: Serve with Nginx
# ================================
FROM nginx:alpine

# ลบไฟล์ html เดิมของ nginx
RUN rm -rf /usr/share/nginx/html/*

# copy Angular build output
COPY --from=builder /app/dist/browser /usr/share/nginx/html

# set permission
RUN chmod -R 755 /usr/share/nginx/html

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
