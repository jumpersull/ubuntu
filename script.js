const input = document.getElementById("command");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    if (cmd === "") return;

    appendLine(`<span class="prompt"><span class="user">user</span>@<span class="host">ubuntu</span>:~$</span> ${cmd}`);
    input.value = "";

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });
      const data = await res.json();

      if (data.output === "\f") {
        output.innerHTML = "";
      } else {
        appendLine(data.output || "No output");
      }
    } catch (err) {
      appendLine("Error: unable to connect to backend.");
    }

    terminal.scrollTop = terminal.scrollHeight;
  }
});

function appendLine(html) {
  const line = document.createElement("div");
  line.innerHTML = html;
  output.appendChild(line);
}
