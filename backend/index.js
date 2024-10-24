const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the DB connection file
require("dotenv").config(); // To load the .env file
const ruleRoutes = require("./routes/ruleRoutes");

const app = express();
connectDB();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/rules", ruleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
