FROM node:20

# Set the NODE_ENV environment variable to "production" during the build
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
