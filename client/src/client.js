const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const { createProxyMiddleware } = require("http-proxy-middleware");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("/todo", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/todo.html"));
});
