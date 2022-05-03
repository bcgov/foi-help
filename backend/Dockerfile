# TODO: Need to add below?
# docker-remote.artifacts.developer.gov.bc.ca/ 
# docker-remote.artifacts.developer.gov.bc.ca/ 
# FROM docker-remote.artifacts.developer.gov.bc.ca/nodejs:14-ubi8
FROM docker-remote.artifacts.developer.gov.bc.ca/strapi/base
# FROM strapi/base

WORKDIR /my-path

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]