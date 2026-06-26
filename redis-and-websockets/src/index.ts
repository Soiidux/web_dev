import express from "express";
import axios from "axios";
import { Redis } from "ioredis";
import http from "http";
import { Server } from "socket.io";

const app = express(); //Express server


const redis = new Redis({ host: "localhost", port: 6379 });
const publisher = new Redis({ host: "localhost", port: 6379 });
const subscriber = new Redis({ host: "localhost", port: 6379 });

const PORT = process.env.PORT ?? 8000;

const httpServer = http.createServer(app); // HTTP Server (Mounting express server on http server)

const io = new Server(); //Socket server
io.attach(httpServer); //Socket server attached to HTTP server

redis.setnx('state', JSON.stringify(new Array(100).fill(false)));

app.use(express.static("./public"));
// app.use(async function (req, res, next) {
//   const key = 'rate-limit';
//   const value = await redis.get(key);
//   if (value === null) {
//     await redis.set(key, 0);
//     await redis.expire(key, 60);
//   }
//   if (Number(value) > 10) {
//     return res.status(429).json({ error: 'Too many requests' });
//   }
//   await redis.incr(key);
//   next();
// })


app.get("/", (req, res) => {
  return res.json({
    status:"success"
  })
})

app.get("/books", async (req, res) => {
  const response = await axios.get("https://api.freeapi.app/api/v1/public/books");
  return res.json(response.data);
})

app.get("/books/total", async (req, res) => {
  const totalPageCount = await redis.get("totalPageCount");
  if (totalPageCount) {
    console.log("Cache hit: totalPageCount =", totalPageCount);
    return res.json({
      totalPageCount: totalPageCount
    });
  }
  console.log("Cache miss");
  const response = await axios.get("https://api.freeapi.app/api/v1/public/books");
  const total = response.data?.data?.data?.reduce((acc: number, curr: any) => acc + curr.volumeInfo.pageCount, 0)
  await redis.set("totalPageCount", total);
  return res.json({
    totalPageCount:total
  });
})


app.get('/state', async (req, res) => {
  const state = await redis.get('state');
  const parsedState = await JSON.parse(state!);
  return res.json({state:parsedState});
})


subscriber.subscribe('server:broker');
subscriber.on('message', async (channel, message) => {
  const { event, data } = await JSON.parse(message);
  io.emit(event, data);
})

io.on('connection', (socket) => {
  console.log("Socket connected: ", socket.id);
  socket.on("checkbox-update", async (data) => {
    const state = await redis.get('state');
    const parsedState = await JSON.parse(state!);
    parsedState[data.index] = data.value;
    await redis.set('state', JSON.stringify(parsedState));
    await publisher.publish('server:broker', JSON.stringify({ event: 'checkbox-update', data }));
  })
})

httpServer.listen(PORT, () => console.log(`HTTP Server running on PORT : ${PORT}`));