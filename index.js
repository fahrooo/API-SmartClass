import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import { Server } from "socket.io";
import http from "http";

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
    console.log(e?.message);
  });
});

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
