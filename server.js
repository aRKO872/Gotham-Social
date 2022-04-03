const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json({ extended : false }))

connectDB();

app.get("/", (req, res) => {res.send("API is running")});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(5000, () => {
  console.log("Server running at port 5000");
});
