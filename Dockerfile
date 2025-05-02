# Use the official Node.js LTS image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files first (for efficient Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on (default NestJS GraphQL port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
