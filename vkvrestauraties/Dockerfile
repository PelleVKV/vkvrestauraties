FROM node:22-alpine AS build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.21-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
