# Use the official Node.js image as the base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 5173

# Serve the app
CMD ["npm", "run", "preview"]
