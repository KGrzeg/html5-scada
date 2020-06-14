#!/usr/bin/env node

const net = require("net");
const readline = require("readline");

const node_ip = "127.0.0.1";
const node_port = 2137;

const rl = readline.createInterface({
  input: process.stdin,
});

var server = net.createServer(function (socket) {
  console.log(`Connected`);

  const send = (text) => {
    const num = parseFloat(text);
    const buf = Buffer.allocUnsafe(8);

    buf.writeDoubleBE(num);
    socket.write(buf);

    // buf.writeDoubleBE(num * 2);
    // socket.write(buf);

    console.log(`>>> ${num}`);
    // console.log(`>>> ${num} ${num * 2}`);
  };

  rl.on("line", send);

  socket.on("close", (err) => {
    rl.removeListener("line", send);
  });
});

server.listen(node_port, node_ip);
console.log(`Listen on ${node_ip}:${node_port}`);
