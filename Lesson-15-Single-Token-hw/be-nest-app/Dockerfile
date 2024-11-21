FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
RUN npm uninstall bcrypt
RUN npm install bcrypt
COPY . .
RUN npm run build
EXPOSE 3000
