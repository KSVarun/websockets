const http = require("http");
const WebSocketServer = require("websocket").server;

let connection = null;

const httpServer = http.createServer((req, res) =>
  console.log("Request received")
);

const webSocket = new WebSocketServer({ httpServer: httpServer });

httpServer.listen(8081, () => console.log("Listening on port 8081"));

webSocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("Connection is opened"));
  connection.on("close", () => console.log("Connection is closed"));
  connection.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`);
    connection.send(
      `Messaged has been received from server, ${message.utf8Data}`
    );
  });
});
