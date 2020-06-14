#!/usr/bin/env node

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("updateInputs", (inputs) => {
    console.log(inputs);
  });
});

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
