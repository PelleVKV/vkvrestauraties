# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built React app to the Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx will listen
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
