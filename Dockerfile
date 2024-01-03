FROM node:21.2-alpine3.18
WORKDIR /app
COPY . .
CMD ["npm", "run", "prod"]