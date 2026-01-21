const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// MONGODB
mongoose
  .connect("mongodb://127.0.0.1:27017/auraplan")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
