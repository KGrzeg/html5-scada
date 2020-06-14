#!/usr/bin/env node

const net = require("net");
//const Buffer = require("Buffer");

const node_ip = "127.0.0.1";
const node_port = 2137;

var server = net.createServer(function (socket) {
  console.log(`Connected`);

  const h = setInterval(() => {
    const num = 4;
    const buf = Buffer.allocUnsafe(8);

    buf.writeDoubleBE(num);
    socket.write(buf);

    buf.writeDoubleBE(num * 2);
    socket.write(buf);

    console.log(`>>> ${num} ${num * 2}`);
  }, 100);

  socket.on("close", (err) => {
    clearInterval(h);
  });

  //socket.pipe(socket);
});

server.listen(node_port, node_ip);
console.log(`Listen on ${node_ip}:${node_port}`);
