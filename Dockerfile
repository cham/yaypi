FROM node:12.16.1

# so we can cleanly wait for other services
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

RUN npm install -g supervisor

WORKDIR /opt/api
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/api/node_modules/.bin:$PATH

WORKDIR /opt/api/app

COPY . .

EXPOSE 3030
CMD /wait && supervisor --quiet --watch . --extensions js -- index.js
