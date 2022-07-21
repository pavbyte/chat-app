const express = require("express");
const app = express();
const http = require("http");
const { isObject } = require("util");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const io = new Server(server);

app.get("/", (req, res) => {
  //res.send("<h1>Hello World</h1>");
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(8080, () => {
  console.log("listening on PORT *:5500");
});
