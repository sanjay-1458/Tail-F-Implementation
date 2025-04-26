# Overview
The tail command, prints the last N number of data of the given input. By default, it prints the last 10 lines of the specified files. If more than one file name is provided then data from each file is preceded by its file name.

# Project Structure
 ## 📄 index.html
  ###  🔍 Logic:
     – Loads Socket.IO client library.
     – Establishes a WebSocket connection to the server at ws://localhost:3000.
     – Listens for two events:
         • "initLog": receives an array of initial log lines.
         • "logLine": receives each new log line in real time.
     – Dynamically appends each line as a new <p> element under the #log container.
  ### 🚀 Use:
     – Open in your browser to see the last 10 lines immediately and live updates as they arrive! 

## 📄 server.js
  ### 🔍 Logic:
     – Creates an HTTP server on port 3000 to serve index.html when /log is requested.
     – Instantiates a Socket.IO server tied to the HTTP server.
     – On client connection:
         • Calls getLastNLines(log.txt, 10) to fetch the last 10 lines.
         • Emits "initLog" with those lines to the connecting client.
     – Registers createTail(log.txt, callback) to watch for file changes:
         • Whenever log.txt grows, reads only the new bytes.
         • Parses the chunk into lines and invokes callback for each non-empty line.
         • Broadcasts each new line via Socket.IO as "logLine".
     – Logs connection/disconnection events to the console for monitoring.
   ### 🚀 Use:
     – Run `node server.js` to start streaming logs to any frontend client that connects! 

## 📄 tail.js
 ###   🔍 Logic:
     – getLastNLines(filePath, n):
         • Reads the entire file synchronously.
         • Splits by newline and returns the last n entries.
         • Gracefully handles errors and returns an empty array if reading fails.
     – createTail(filePath, onNewLine):
         • Tracks the current file size and a leftover buffer for partial lines.
         • Uses fs.watch to detect "change" events.
         • When file size increases:
             ◦ Opens a ReadStream from the old size to the new size.
             ◦ Collects chunks, splits into lines, preserves incomplete trailing text.
             ◦ Calls onNewLine(line) for each complete new line.
         • Updates fileSize after each read.
  ###  🚀 Use:
     – Lightweight, dependency-free core for “tail -f” behavior in Node.js scripts. 

## 📄 writer.js
 ###  🔍 Logic:
     – Defines logFilePath pointing to log.txt in the project root.
     – Uses setInterval to run every 3000ms (3 seconds).
     – On each tick:
         • Generates an ISO timestamp.
         • Appends a new line “Log at <timestamp>” to log.txt.
         • Prints a console message confirming the append.
  ### 🚀 Use:
     – Simulate a live-updating log source without manual editing. Perfect for demos and testing! 

#  How to run
- Run the server.js using `node server.js` and simultaneously run writer.js in different terminal
