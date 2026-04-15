# ---------- Stage 1: Build Frontend ----------
FROM node:20-alpine AS client-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# ---------- Stage 2: Setup Backend ----------
FROM node:20-alpine

WORKDIR /app

# Copy backend
COPY server/package*.json ./server/
RUN cd server && npm ci

COPY server ./server

# Copy frontend build into backend (serve static)
COPY --from=client-build /app/client/dist ./server/public

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "server.js"]