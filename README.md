# yaypi

> API for YayHooray

## Setup Instructions

### Locally

If you have your own mongodb service running, and wish to run node directly on your host machine, install with

```bash
./install.sh
```

Run the server with

```bash
./run-dev.sh
```

### Docker

Alternatively, `docker-compose up` provides both a mongo and a node container that uses `supervisor --watch` to run this API server.

You can also reach a shell inside the node container with `npm run docker`. `./install.sh` and `./run-dev.sh` work from there as well.

Mongo will take a moment to come up on first run.


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
