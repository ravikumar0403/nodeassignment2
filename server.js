const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Port = process.env.PORT || 3000;

const dbUrl =
  "mongodb+srv://dbUser:nNgja7GgKLqBNtDT@cluster0.vqyvr.mongodb.net/cricket?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.log(error));

const playerSchema = new mongoose.Schema({
  id: 0,
  playerName: String,
  image: String,
  from: String,
  price: String,
  isPlaying: Boolean,
  description: String,
});

const Players = mongoose.model("Players", playerSchema);

let data = [];

Players.find((err, players) => {
  if (err) return console.error(err);
  data = players;
});

app.set("views", path.join(__dirname) + "\\views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/players/:id", (req, res) => {
  let id = req.params.id - 1;
  if (id < data.length && id >= 0) {
    res.render("player", {
      player: data[id],
    });
  } else {
    res.render("NoMore");
  }
});

app.listen(Port, () => {
  console.log(`server is listening at port ${Port}`);
});
