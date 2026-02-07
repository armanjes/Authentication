import dotenv from "dotenv";
dotenv.config();

const requiredENV = [
  "PORT",
  "MONGODB_COMPASS_URI",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIREY",
  "NODE_ENV",
];

for (const key of requiredENV) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
}

const env = {
  PORT: process.env.PORT,
  MONGODB_COMPASS_URI: process.env.MONGODB_COMPASS_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIREY: process.env.ACCESS_TOKEN_EXPIREY,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;
