require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const templateRoutes = require("./routes/templateRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/templates", templateRoutes);
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Module Two API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});