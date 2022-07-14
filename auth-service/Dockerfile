FROM node:16.15.1

ENV SECRET_HASH=a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

ENV PORT=50051

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["node", "src/server.js"]
