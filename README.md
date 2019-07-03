# NS8 Coding Challenge

## Description
This project was created using NestJS. <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest Logo" /></a>

The following NestJS configurations were used:

+ Server framework: **Express**
+ Authentication framework: **Passport**
+ Authentication Strategy: **JwtStrategy**

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage
### Register User
**POST /user/register**

Creates a user as well as creates an event of type = 'REGISTER'

```
curl -i \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{"email": "test@test.com", "password": "password", "phone": "555-555-5555"}' \
     http://localhost:3000/user/register
```
Successful response:
```
{
    "success": true,
    "id": "5d1cdae30811c62a4be9ce42",
    "email": "test@test.com"
}
```
Duplicate user response:
```
{
    "status": 409,
    "error": "User with this email already exists"
}
```

### Login
**POST /auth/login**

Authenticates a user as well as creates an event of type = 'LOGIN'
```
curl -i \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{"email": "test@test.com", "password": "password"}' \
     http://localhost:3000/auth/login
```
Successful response:
```
{
    "token": <token>,
    "id": <id>
}
```
Invalid email or password response:
```
{
    "status": 401,
    "error": "Email or password is invalid"
}
```

### Get Events for all users
**GET /user/event**

Guarded endpoint which requires a token returned from login.
```
curl -i \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token> \
     -X GET \
     http://localhost:3000/event
```
Successful response:
```
[
    {
        "_id": <eventId>,
        "type": <eventType>,
        "user": <userId>,
        "created": <createDate>,
        "__v": 0
    },
    ...
]
```

### Get Events for single user
**GET /user/\<userId>/events**

Guarded endpoint which requires a token returned from login.
```
curl -i \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token> \
     -X GET \
     http://localhost:3000/user/<userId>/events
```
Successful response:
```
{
    "_id": <userId>,
    "events": [
        {
            "_id": <eventId>,
            "type": <eventType>,
            "user": <userId>,
            "created": <createDate>,
            "__v": 0
        },
        ...
    ]
}
```

### Get Events all events for the last day
**GET /user/event/lastday**

Guarded endpoint which requires a token returned from login.
```
curl -i \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token> \
     -X GET \
     http://localhost:3000/user/event/lastday
```
Successful response:
```
[
    {
        "_id": <eventId>,
        "type": <eventType>,
        "user": <userId>,
        "created": <createDate>,
        "__v": 0
    },
    ...
]
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
