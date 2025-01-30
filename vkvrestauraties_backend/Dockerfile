# Stage 1: Set up Node.js environment
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the Node.js application (assumes your app is started with `npm start`)
CMD ["npm", "start"]
