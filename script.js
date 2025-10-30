const input = document.getElementById("command");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

// Command storage
let commands = {
  help: "Available commands: help, about, date, clear, motd, info",
  about: "Ubuntu-style web terminal — simulated environment",
  date: new Date().toString(),
  motd: "An Ubuntu-like terminal experience but on the web.",
  info: "Carbon Linux Terminal Command Line Interface (CLTCLI)\nVersion 2.4\nAuthor: jumper"
};

// Command history
let history = [];
let historyIndex = -1;

// Add new command dynamically
function addCommand(name, response) {
  commands[name.toLowerCase()] = response;
}

// Append line to terminal
function appendLine(html) {
  const line = document.createElement("div");
  line.innerHTML = html;
  output.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

// Handle input
input.addEventListener("keydown", (e) => {
  const value = input.value.trim();

  // Handle Enter
  if (e.key === "Enter") {
    if (value === "") return;
    
    appendLine(`<span class="prompt"><span class="user">user</span>@<span class="host">ubuntu</span>:~$</span> ${value}`);
    
    history.push(value);
    historyIndex = history.length;

    input.value = "";

    const cmd = value.toLowerCase();
    if (cmd === "clear") {
      output.innerHTML = "";
    } else if (commands[cmd]) {
      appendLine(commands[cmd]);
    } else {
      appendLine(`Command not found: ${value}`);
    }
  }

  // Handle history navigation
  else if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
  } else if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = "";
    }
    e.preventDefault();
  }

  // Handle tab autocomplete
  else if (e.key === "Tab") {
    e.preventDefault();
    const matches = Object.keys(commands).filter(c => c.startsWith(input.value.toLowerCase()));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      appendLine(matches.join("   "));
    }
  }
});

// Example: adding a command dynamically after page load
addCommand("welcome", "This is a dynamic command added in the browser!");
