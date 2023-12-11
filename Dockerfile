FROM node
RUN apt update && apt install wait-for-it -y

WORKDIR /app
COPY package*.json ./

# remove -f and fix jpegtran-bin issue
RUN npm install --production -f
RUN npm install -g @nestjs/cli

COPY . /app
RUN npm run build

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]