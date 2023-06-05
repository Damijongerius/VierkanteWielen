import express from "express";
import bodyParser from "body-parser";
import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import path from 'path';

export const app = express();
export const port = 3000;

// Create Redis client
const redisClient = new Redis();

// Create Redis store
const RedisStore = new connectRedis(session);
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session middleware
const sessionOptions: SessionOptions = {
  store: RedisStore,
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // Set the session expiration time (e.g., 1 hour)
  },
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, function () {
  console.log("Server running on port " + port);
});