const express = require("express");

const postsRouter = require("./posts/posts-router");
const { post } = require("./posts/posts-router");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Server works</h1>");
});

server.use("/api/posts", postsRouter);

const port = 8000;
server.listen(port, () => {
  console.log("Server is listening on port 8000");
});
