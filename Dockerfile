FROM node
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
EXPOSE 80
CMD ["npm", "run", "build"]