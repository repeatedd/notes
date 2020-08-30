const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const notes = require("./routes/api/notes");
const user = require("./routes/api/users");
const auth = require("./routes/api/auth");
const app = express();
const path = require("path");
app.use(express.json());

const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected....."))
  .catch((err) => console.log(err));

app.use("/api/notes", notes);
app.use("/api/user", user);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
