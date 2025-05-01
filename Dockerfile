FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE ${PORT}

# development mode
CMD ["node", "ace", "serve", "--watch"]
