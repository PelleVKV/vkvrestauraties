# Stage 1: Build the application
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
# If your app doesn't require a build step, you can skip this command
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Expose the application port (update this to your app's port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
