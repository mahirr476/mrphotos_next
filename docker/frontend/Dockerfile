# docker/frontend/Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Development mode with hot reloading
CMD ["npm", "run", "dev"]