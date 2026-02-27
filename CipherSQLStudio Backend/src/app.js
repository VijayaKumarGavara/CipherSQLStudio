require("dotenv").config();
const cors = require("cors");

const express = require("express");
const connectMongo = require("./config/mongo");

const app = express();
app.use(express.json());
app.use(cors());

connectMongo();

app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/query", require("./routes/queryRoutes"));
app.use("/api/hint", require("./routes/hintRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});