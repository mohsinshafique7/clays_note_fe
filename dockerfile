
# Use Node.js LTS version as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install both dependencies and devDependencies
RUN npm install
# Copy application source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application in development mode with hot-reloading
CMD ["npm", "run", "dev"]