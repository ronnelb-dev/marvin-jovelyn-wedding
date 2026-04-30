const { spawn } = require("node:child_process");
const path = require("node:path");

const requirePath = path
  .join(__dirname, "fix-node-localstorage.cjs")
  .replace(/\\/g, "/");
const existingNodeOptions = process.env.NODE_OPTIONS?.trim();
const requireOption = `--require=${requirePath}`;

process.env.NODE_OPTIONS = existingNodeOptions
  ? `${requireOption} ${existingNodeOptions}`
  : requireOption;

const child = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "dev", "--turbopack"],
  {
    cwd: path.join(__dirname, ".."),
    env: process.env,
    stdio: "inherit",
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
