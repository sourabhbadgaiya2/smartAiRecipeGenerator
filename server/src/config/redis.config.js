import Redis from "ioredis";
import config from "./env.config.js";

const redisClient = new Redis({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry with max 2s delay
});

redisClient.on("connect", () => console.log(" Redis connected"));
redisClient.on("error", (err) => console.error(" Redis error:", err));
redisClient.on("end", () => console.warn("Redis disconnected"));

process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis connection closed");
  process.exit(0);
});

export default redisClient;
