import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serve frontend

let commands = {
  help: "Available commands: help, about, date, clear",
  about: "Ubuntu-style web terminal — simulated environment",
  date: new Date().toString(),
};

app.post("/api/run", (req, res) => {
  const cmd = req.body.command.trim().toLowerCase();

  if (cmd === "clear") {
    return res.json({ output: "\f" });
  }

  const output = commands[cmd] || `Command not found: ${cmd}`;
  res.json({ output });
});

app.post("/api/add", (req, res) => {
  const { command, response } = req.body;
  commands[command.toLowerCase()] = response;
  res.json({ message: `Command '${command}' added.` });
});

app.listen(3000, () =>
  console.log("Ubuntu Web Terminal running on http://localhost:3000")
);
