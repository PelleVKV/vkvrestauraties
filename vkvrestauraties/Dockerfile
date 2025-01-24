# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React app using a lightweight web server
FROM nginx:stable-alpine

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom nginx.conf file to the correct location
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for the web server (Cloud Run expects this port)
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
