import { createClient } from "redis";

// CREATE REDIS CLIENT WITH HOST AND PORT
let redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect();

// REDIS ERROR HANDLING
redisClient.on("error", (err) => {
  console.error("FATAL Redis error: ", err);
});

export default redisClient;
