# yaypi

> API for YayHooray

## Setup Instructions

### Locally

If you have your own mongodb service running, and wish to run node directly on your host machine, install with

```bash
./install.sh
```

Set up the node environment and run the server with

```bash
./run-dev.sh
```

### Docker

Or use docker to start up a mongodb instance and run the service with supervisor.

```bash
docker-compose up
```

To reach a shell inside the container, use

```bash
npm run docker
```

At which point you can `npm run watch` or simply `node .`.


### Routes

Ping
```
GET /v1/ping
```
Auth
```
POST /v1/auth/login { username, password }
```
Threads
```
GET /v1/threads { page, pageSize, sortBy, sortDir: ['asc','desc'] }
GET /v1/threads/:threadid { page, pageSize }
```
