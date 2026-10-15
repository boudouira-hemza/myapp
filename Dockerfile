FROM node:24-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

RUN mkdir -p /app/storage \
    && chown -R node:node /app/storage

USER node

EXPOSE 3000

CMD ["node", "index.js"]
