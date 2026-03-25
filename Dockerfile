# Development Stage
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV BUILD_STANDALONE='true'

RUN npm run build

# Production Stage
FROM node:22-alpine AS production

WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S deployer -u 1001

# Copy the built artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone/ ./
COPY --from=builder /app/.next/static ./.next/static

# Change ownership to non-root user
RUN chown -R deployer:nodejs /app
USER deployer

# Set the environment variables
ENV NODE_ENV=production

EXPOSE 3000

# not run any command, just keep the container running
CMD ["node", "server.js"]
