#!/usr/bin/env node

const express = require("express");
const net = require("net");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const webPort = 3000;
const tcpPort = 2137;

const server = http.createServer(app);
const io = socketio(server);

let tcpConnection = null;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("WebSocket Connected");

  socket.on("disconnect", () => {
    console.log("WebSocket Disconnected");
  });

  socket.on("updateInputs", (inputs) => {
    if (!tcpConnection) return;

    console.log(`Recevied ${inputs.toString()} from Websocket`);
    const buf = Buffer.allocUnsafe(8 * 4);

    for (let i = 0; i < inputs.length; ++i) {
      buf.writeDoubleBE(inputs[i], i * 8);
    }

    tcpConnection.write(buf);
  });
});

const tcpServer = net.createServer((socket) => {
  console.log(`TCP Connected`);

  socket.on("close", (err) => {
    tcpConnection = null;
    console.log(`TCP Disconnected`);
  });

  socket.on("data", (data) => {
    io.sockets.emit("response", data.readDoubleBE(0));
  });

  tcpConnection = socket;
});

server.listen(webPort, () =>
  console.log(`Web server running at http://localhost:${webPort}`)
);
tcpServer.listen(tcpPort);
console.log(`TCP listen on 127.0.0.1:${tcpPort}`);
