#!/usr/bin/env node

const net = require("net");

const node_ip = "127.0.0.1";
const node_port = 2137;

const server = net.createServer(function (socket) {
  console.log(`Connected`);

  socket.on("data", (data) => {
    console.log(`<<< ${data.readDoubleBE(0)}`);
  });

  socket.pipe(socket);
});

server.listen(node_port, node_ip);
console.log(`Listen on ${node_ip}:${node_port}`);
