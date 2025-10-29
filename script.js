const input = document.getElementById("command");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

// All your commands go here
let commands = {
  help: "Available commands: help, about, date, clear",
  about: "Ubuntu-style web terminal — simulated environment",
  date: new Date().toString()
};

// Function to add new commands dynamically
function addCommand(name, response) {
  commands[name.toLowerCase()] = response;
}

// Handle command input
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    if (cmd === "") return;

    appendLine(`<span class="prompt"><span class="user">user</span>@<span class="host">ubuntu</span>:~$</span> ${cmd}`);
    input.value = "";

    const lcCmd = cmd.toLowerCase();

    if (lcCmd === "clear") {
      output.innerHTML = "";
    } else if (commands[lcCmd]) {
      appendLine(commands[lcCmd]);
    } else {
      appendLine(`Command not found: ${cmd}`);
    }

    terminal.scrollTop = terminal.scrollHeight;
  }
});

// Function to append a line to terminal
function appendLine(html) {
  const line = document.createElement("div");
  line.innerHTML = html;
  output.appendChild(line);
}

// Example: adding a new command dynamically
addCommand("motd", "Welcome to the Ubuntu Web Terminal!");
addCommand("info", "Ubuntu Web CLI\nVersion 1.0\nAuthor: Jonathan");
