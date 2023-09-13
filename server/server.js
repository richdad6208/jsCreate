import express from "express";
const app = express();
import cors from "cors";
const port = 3000;

app.get("/api", cors(), (req, res) => {
  res.status(200).json({ success: true, name: "jaesung" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
