const fs = require("fs");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { getLastNLines, createTail } = require("./tail.js");

const PORT = 3000;
const logFilePath = path.join(__dirname, "log.txt");
const server = http.createServer((req, res) => {
  if (req.url === "/log") {
    fs.createReadStream(path.join(__dirname, "public", "index.html")).pipe(res);
  } else {
    res.writeHead(500);
    res.end("not found");
  }
});

const io = new Server(server);

createTail(logFilePath, (line) => {
  io.emit("logLine", line);
});
io.on("connection", (socket) => {
  const lastLines = getLastNLines(logFilePath, 10);
  socket.emit("initLog", lastLines);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("connected to PORT");
});
