FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT=4000
VOLUME [ "/src" ]
EXPOSE $PORT
RUN npx prisma migrate dev --name init
CMD [ "npm", "run", "start" ]
