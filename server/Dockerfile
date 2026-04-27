

# ---------- Stage 2: Setup Backend ----------
FROM node:20-alpine

WORKDIR /app

# Copy backend
COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]