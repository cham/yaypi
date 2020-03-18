# yaypi

> API for YayHooray

## Installation

```bash
./install.sh
```

## Running the server

```bash
./run-dev.sh
```

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
