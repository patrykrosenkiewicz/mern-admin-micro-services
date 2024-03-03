FROM node:21-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn cache clean
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "run", "start"]