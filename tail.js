const fs = require("fs");

function getLastNLines(filePath, n) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    return lines.slice(-n);
  } catch (err) {
    console.log("errr", err);
    return [];
  }
}
function createTail(filePath, onNewLine) {
  let fileSize = fs.statSync(filePath).size;
  let leftover = "";

  fs.watch(filePath, (event) => {
    if (event === "change") {
      const newSize = fs.statSync(filePath).size;
      if (newSize > fileSize) {
        const stream = fs.createReadStream(filePath, {
          start: fileSize,
          end: newSize,
          encoding: "utf8",
        });
        stream.on("data", (chunk) => {
          const lines = (leftover + chunk).split("\n");
          leftover = lines.pop();
          lines.forEach((line) => {
            if (line.trim() !== "") onNewLine(line);
          });
        });
        stream.on("end", () => {
          fileSize = newSize;
        });
      }
    }
  });
}
module.exports = { getLastNLines, createTail };
