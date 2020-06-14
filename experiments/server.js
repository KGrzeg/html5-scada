#!/usr/bin/env node

const net = require("net");
const readline = require("readline");

const node_ip = "127.0.0.1";
const node_port = 2137;

let [u, Kp, Ti, Td] = Array(4).fill(0);

const rl = readline.createInterface({
  input: process.stdin,
});
const input_re = /([\d\.\-]+)\s([\d\.\-]+)\s([\d\.\-]+)\s([\d\.\-]+)/;

var server = net.createServer(function (socket) {
  console.log(`Connected`);

  const send = (text) => {
    const nums = input_re.exec(text);
    [u, Kp, Ti, Td] = nums.slice(1).map(parseFloat);

    const buf = Buffer.allocUnsafe(8 * 4);

    buf.writeDoubleBE(u, 0);
    buf.writeDoubleBE(Kp, 8);
    buf.writeDoubleBE(Ti, 16);
    buf.writeDoubleBE(Td, 24);

    socket.write(buf);
    console.log(`>>> ${[u, Kp, Ti, Td].toString()}`);
  };

  rl.on("line", send);

  socket.on("close", (err) => {
    rl.removeListener("line", send);
  });
});

server.listen(node_port, node_ip);
console.log(`Listen on ${node_ip}:${node_port}`);
