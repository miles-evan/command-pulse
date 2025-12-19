FROM node:20.17.0

ENV NODE_ENV=production
ENV PORT=8080
WORKDIR /app

RUN apt-get update && apt-get install -y curl
RUN curl -o /usr/local/share/ca-certificates/global-bundle.pem \
  https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/global-bundle.pem

COPY package*.json ./
RUN npm ci --omit=dev

COPY dist ./dist

EXPOSE 8080

CMD ["npm", "start"]
