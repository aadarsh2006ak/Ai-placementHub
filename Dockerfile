# Multi-stage lightweight production Dockerfile
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Install dependencies first for Docker caching
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose API Port
EXPOSE 3000

# Set production environment defaults
ENV NODE_ENV=production
ENV PORT=3000

# Run with non-root user for security
USER node

CMD ["node", "server.js"]
