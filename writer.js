const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'log.txt');

setInterval(() => {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `Log at ${timestamp}\n`);
    console.log(`Appended: Log at ${timestamp}`);
}, 3000);
