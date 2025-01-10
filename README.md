# Express.js Auth Example

## About

A simple authetification example in express.js using express-session.
The project is dockerized in a single docker-compose file for quick and easy development.

One command starts :

- API server
- PostgreSQL DB
- Redis (for storing sessions)

## Usage

> Make sure you have Docker installed!

> Configure .env as well as docker-compose.yaml file

> Make sure to configure .env file ,use .env.example for guide.

Run:

```js
docker compose up
```

## Routes

- /create-user

  > Creates new user in DB, requires username and password, password in hashed with bcrypt

- /login

  > if valid stores userId in session

- /logout

  > destroys user session

- /check-user
  > returns userId or null if session not valid

### Additional Features:

- global error handling via ApiError class and custom error middleware
