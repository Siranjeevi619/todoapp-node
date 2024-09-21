const express = require("express");
const router = require("./router/task.router.js");
const connectDB = require("./config/db.js");
const app = express();

const PORT = 9000;
app.use(express.json());
connectDB();
app.use("/task", router);

app.listen(PORT, () => {
  console.log(`server is currently running at ${PORT}`);
});
