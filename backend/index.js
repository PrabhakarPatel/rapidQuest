const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes.js");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connection established");
}

app.use(express.json());
app.use("/api", videoRoutes);

app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Success",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on  Port " + process.env.PORT);
});
