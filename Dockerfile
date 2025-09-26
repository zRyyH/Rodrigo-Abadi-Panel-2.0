# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install --production=false

# Copia o código e faz build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app

# Instala apenas dependências de produção
COPY package*.json ./
RUN npm install --production

# Copia build e public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Porta padrão do Next.js
EXPOSE 3000

# Comando de produção
CMD ["npm", "start"]
