FROM node:12.16.1

# for cleanly waiting on mongodb
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

# for managing a running mongodb instance
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
	&& apt-get update \
	&& apt-get install apt-transport-https \
	&& echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list \
 	&& apt-get update \
 	&& apt-get install mongodb-org-tools \
 	&& apt-get autoremove && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npm install -g supervisor

WORKDIR /opt/api
COPY . .
RUN ./install.sh

EXPOSE 3030
CMD /wait && ./run-dev.sh
