FROM node:18 as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
RUN npm uninstall bcrypt
RUN npm install bcrypt
COPY . .
RUN npm run build

FROM nginx:1.25.1
COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]