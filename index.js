import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import { Server } from "socket.io";
import http from "http";
import { PictureStream } from "@xdcobra/node-ffmpeg-stream";
import * as mqtt from "mqtt";
import { connect } from "http2";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
  method: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log(`User connected to ${socket.id}`);

  socket.on("hello", (e) => {
    console.log(e);
  });
});

// const pictureStream = new PictureStream();

// const url = process.env.MQTT_HOST;
// let client = mqtt.connect(url);

// client.on("connect", function () {
//   console.log("MQTT connect");
//   const input = {
//     name: "BardiIpCam",
//     url: "rtsp://admin:admin@192.168.237.60:8554/Streaming/Channels/101",
//     fps: 30,
//     ffmpegOptions: {
//       "-vf": "scale=200:160",
//     },
//   };
//   const pstream = pictureStream.startStream(input);

//   pstream
//     .on("data", (data) => {
//       // encode to base64, to show it later in browser
//       const base64 = Buffer.from(data).toString("base64");
//       console.log(base64);

//       // publish
//       client.publish("IPCAM", base64);
//     })
//     .on("error", (error) => {
//       console.log(error);
//     });
// });

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

server.listen(process.env.PORT, () =>
  console.log("Server listening on port " + process.env.PORT)
);
