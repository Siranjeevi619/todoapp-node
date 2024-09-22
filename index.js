const express = require("express");
const router = require("./router/task.router.js");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
connectDB();
app.use("/task", router);

app.listen(PORT, () => {
  console.log(`Server is currently running at http://localhost:${PORT}`);
});
