# yaypi

> API for YayHooray

## Installation & Running

1. Have docker installed
2. `docker-compose up`

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
