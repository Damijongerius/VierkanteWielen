import express from "express";
import bodyParser from "body-parser";
import RedisStore from "connect-redis"
import session, {SessionOptions} from 'express-session';
import {createClient} from "redis"
import path from 'path';

export const app = express();
export const port = 3000;

//Configure redis client
export const redisClient = createClient({ url: 'redis://localhost:6379'});
redisClient.connect().catch(console.error);

// @ts-ignore
export let redisStore = new RedisStore({
  // @ts-ignore
  client: redisClient,
  prefix: "servertje",
})

app.use(
  session({
    secret: 'superSecrete',
    resave: false,
    saveUninitialized: true,
    store: redisStore,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: "blbbblsdf",
  store: redisStore,
}));

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, function () {
  console.log("Server running on port " + port);
});
