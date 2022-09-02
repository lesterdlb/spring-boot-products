FROM node:16-alpine3.16 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

RUN yarn build

FROM nginx:1.23-alpine
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]