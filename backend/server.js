import "./config/config.js";
import express, { json } from "express";
import authRouter from "./routes/authRouter.js";
import session from "express-session";
import authRequired from "./middleware/authRequired.js";
import { RedisStore } from "connect-redis";
import redisClient from "./config/redisClient.js";
import errorMiddlewere from "./middleware/errorMiddleware.js";

const DEFAULT_PORT = process.env.DEFAULT_SERVER_PORT || 3000;

const app = express();

// REDIS STORE FOR SESSION MANAGMENT DEPENDS ON REDIS CLIENT
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "login:",
});

// MIDDLEWERE
app.use(json());
app.use(
  session({
    store: redisStore,
    secret: process.env.SERVER_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// TEST ROUTE
app.get("/", authRequired, async (req, res, next) => {
  const session = req.session;
  console.log(session.user);
  res.send(
    "hello session THIS IS SECRET: " + session.id + JSON.stringify(session)
  );
});

// ROUTES
app.use("/", authRouter);

// ERROR HANDLER
app.use(errorMiddlewere);

app.listen(DEFAULT_PORT, () => {
  console.log("Server running on port:" + DEFAULT_PORT);
});
