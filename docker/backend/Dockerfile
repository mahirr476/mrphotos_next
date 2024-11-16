# docker/backend/Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Prisma setup
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

EXPOSE 3001

# Use nodemon for hot reloading
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]